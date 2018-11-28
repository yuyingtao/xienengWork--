/** 2017/10/18
 * @author: kj
 * @description:
 */
define(function(){
    return LoginPageRender;
});
var LoginPageRender = {
    domId:'codeMask',
    codeInter:'',
    yzmCode:'',
    verifyCode:'',
    Render: function () {
        //    Todo Main function
        // console.log('this is login page!');
        var that = this;
        $('#loginPage').height(window.screen.height);
        var newUrl = window.location.href.split('/').slice(0,3).join('/')
        if(newUrl != window.URLHREF){
            window.location.href = window.URLHREF
        }
        this.getSysInfo();
        //建立websocket连接
        // this.setWebSoket();
        this.wxLogin();
        // $('.codeDiv').on('click',function () {
        //     that.wxLogin()
        // })
        // that.wxLogin()

        this.verifyCode = new GVerify("getCode");
        // this.getCode()
        //切换扫码登录还是账号登录
        $('.loginTab span').click(function(){
            $('.loginTab span').removeClass('isActive');
            $(this).addClass('isActive');
            if($(this).data('method')=='code'){
                $('.scanLogin').show();
                $('.phoneLogin').hide();
            }else{
                $('.scanLogin').hide();
                $('.phoneLogin').show();
            }
        });
        $('.loginTab span').eq(0).click();
        //获得焦点改变背景图颜色
        $('.idInput').focus(function(){
            $('.errorInfoTxt').hide();
            $('.userIcon').css('background-image','url(/images/loginImages/user1.png)')
        });
        $('.idInput').blur(function(){
            if($('#loginId').val()){
                $('.userIcon').css('background-image','url(/images/loginImages/user1.png)')
            }else{
                $('.userIcon').css('background-image','url(/images/loginImages/user2.png)')
            }
        });
        $('#password').focus(function(){
            $('.errorInfoTxt').hide();
            $('.pwdIcon').css('background-image','url(/images/loginImages/password.png)')
        });
        $('#password').blur(function(){
            if($('#password').val()){
                $('.pwdIcon').css('background-image','url(/images/loginImages/password.png)')
            }else{
                $('.pwdIcon').css('background-image','url(/images/loginImages/password-1.png)')
            }
        });
        $('#yzm').focus(function(){
            $('.errorInfoTxt').hide();
            $('.yzmIcon').css('background-image','url(/images/loginImages/verify_1.png)')
        });
        $('#yzm').blur(function(){
            if($('#yzm').val()){
                $('.yzmIcon').css('background-image','url(/images/loginImages/verify_1.png)')
            }else{
                $('.yzmIcon').css('background-image','url(/images/loginImages/verify_2.png)')
            }
        });
        $('.loginEye').unbind('click').bind('click',function () {
            if($('.loginEye').data('flag') =='1'){
                $('.loginEye').data('flag','2');
                $('.loginEye').css('background-image','url(/images/loginImages/eye1.png)');
                $('#password').attr('type','text')
            }else{
                $('.loginEye').data('flag','1');
                $('.loginEye').css('background-image','url(/images/loginImages/eye2.png)');
                $('#password').attr('type','password')
            }
        });
        window.isLoginPage = true;
        var errorNum = 0;
        var that = this;
        //更换验证码
        $('.changeCode').unbind().on('click',function(){
            that.verifyCode.refresh()
        });
        $('#submitBtn').on('click',function () {
            if(!$.trim($('#loginId').val())){
                App.alert('请输入用户名');
                return;
            }
            if(!$.trim($('#password').val())){
                App.alert('请输入密码');
                return;
            }else {
                $('#password').val($('#password').val());
            }
            var num = sessionStorage.getItem('errorNum');
            if(num>=3){
                $('.yzmDiv').show();
                if(!$.trim($('#yzm').val())){
                    $('.errorInfo .errorInfoTxt').text('操作太频繁,请输入验证码');
                    $('.errorInfoTxt').show();
                    return false;
                }
                var res = that.verifyCode.validate($('#yzm').val());
                if(!res){
                    $('.errorInfo .errorInfoTxt').text('验证码错误，请重新输入');
                    $('.errorInfoTxt').show();
                    that.verifyCode.refresh()
                    return false;
                }
            }
            var datas = $(".loginForm").getForm();
            datas.password = hex_md5(datas.password);
            //登录
            $.http.POST('/login/loginIn.do',datas,function (result) {
                if (parseInt(result.code) === 101) {
                    $('.errorInfo .errorInfoTxt').text(result.msg);
                    $('.errorInfoTxt').show();
                    errorNum++;
                    sessionStorage.setItem('errorNum', errorNum);
                    return
                }
                if(parseInt(result.code) === 100) {
                    sessionStorage.setItem('errorNum', 0);
                    Menu.login(result.body.tokenId, {
                        userName: result.body.userName,
                        loginId: result.body.loginId,
                        roleId: result.body.roleId,
                        id: result.body.id,
                        plantNum: result.body.plantNum,
                        plantId: result.body.plantId
                    }); //权限
                    Cookies.setCookByName('userPic', result.body.iconUrl);
                    Cookies.setCookByName('userType', result.body.userType);//0:企业，1：个人
                    Cookies.setCookByName('plantTypeList', result.body.plantTypeList);//电站类型，1：光伏；2：储能；3：光储  多电站首页tab加载需要
                    $('#logoTxt').text(result.body.logoTxt);
                    Cookies.setCookByName('logoPic', !!result.body.userOrg && result.body.userOrg.systemLogo || '');
                    Cookies.setCookByName('energyEffLogoPic', !!result.body.userOrg && result.body.userOrg.systemLogoEe || '');

                    that.intoSys()
                }
            },true,true)
        });
        //绑定回车事件
        $('#password,#yzm').unbind('keypress').keypress(function (event) {
            var key = event.which;
            if(key==13){
                $('#submitBtn').click();
            }
        });
        //图片轮播
        $('#loginPage').imgtransition({
            speed:5000,  //图片切换时间
            animate:1000 //图片切换过渡时间
        });
    },
    //进入系统
    intoSys:function () {
        //当前企业拥有的电站类型
        var plantTypeList = Cookies.getCook('plantTypeList').split(',')
        var plantNum = Cookies.getCook('plantNum').split(',')
        var plantIds = Cookies.getCook('plantId').split(',')

        if (plantTypeList.indexOf("4") > -1) {  //包含能效电站
            main.loadEnergySys()
        } else {  //不包含能效电站
            if (Number(Cookies.getCook('userType')) === 1) { //个人用户
                var plantNum0 = +plantNum[0] //光伏电站数量
                if (plantNum0 == 1) { //一个电站
                    Cookies.setCookByName('sysType', 1); //sysType: 0：多电站首页；1：单电站首页；2：大屏首页
                    var _id ,_singleType
                    if(plantTypeList.indexOf("1") > -1){
                        _id = plantIds[0]
                        _singleType = 1
                    }else {
                        _id = plantIds[1]
                        _singleType = 2
                    }
                    Cookies.setCookByName('singlePlantInfo', JSON.stringify({
                        plantId: _id,
                        singlePlantType: _singleType
                    }));
                    main.loadSys();
                } else { //无电站或多个电站
                    Cookies.setCookByName('sysType', 0); //sysType: 0：多电站首页；1：单电站首页；2：大屏首页
                    main.loadSys();
                }
            }else{//企业用户
                Cookies.setCookByName('sysType', 0); //sysType: 0：多电站首页；1：单电站首页；2：大屏首页
                main.loadSys();
            }

        }

    },
    getSysInfo:function () {

        $.http.POST('/login/getSysInfo.do',{path:window.URLHREF.split('/')[2]},function (result) {
            var value = result.body.scrollPic[0];
            value = result.body.scrollPic[1];
            !!value  ? $('#loginImages2').attr('src',value).one('error',function () {
                $('#loginImages2').attr('src','/images/loginImages/bg2.jpg') }) : $('#loginImages2').attr('src','/images/loginImages/bg2.jpg');
            value = result.body.scrollPic[2];
            !!value  ? $('#loginImages3').attr('src',value).one('error',function () {
                $('#loginImages3').attr('src','/images/loginImages/bg3.jpg') }) : $('#loginImages3').attr('src','/images/loginImages/bg3.jpg');


            var logoImg = result.body.logoPic;
            !!logoImg ? $('#logoImg').attr('src',logoImg).one('error',function () {
                $('#logoImg').attr('src','/images/logo.png') }) : $('#logoImg').attr('src','/images/logo.png');

            $('#logoTxt').text(result.body.logoTxt);
            Cookies.setCookByName('logoPic',logoImg)
        })
    },
    setWebSoket:function () {
        var _this = this;
        if(main.clearInterCharge(this.codeInter,this.domId))return;
        var uuid = Math.uuid();

        $('#qrCodeImg').html('');
        $('#qrCodeImg').qrcode({
            width: 126,
            height: 126,
            text: App.toUtf8(uuid)
        });
        $('#refreshCode').on('click',function () {
            uuid = Math.uuid();
            $('#qrCodeImg').html('');
            $('#qrCodeImg').qrcode({
                width: 126,
                height: 126,
                text: App.toUtf8(uuid)
            });
            $('#codeMask').hide();
            $('#codeRefresh').hide();


            wsUri ='wss://www.pv.synpowertech.com/webSocketServer.do?sn='+uuid;
            testWebSocket();

            setInterFunc();
        });
        /*var sockjs_url = 'https://192.168.1.162:16666/box-web/webSocketServer.do?sn='+uuid;
        var sockjs = new SockJS(sockjs_url);
        $('#first input').focus();

        var div  = $('#first div');
        var inp  = $('#first input');
        var form = $('#first form');

        var print = function(m, p) {
            p = (p === undefined) ? '' : JSON.stringify(p);
            div.append($("<code>").text(m + ' ' + p));
            div.append($("<br>"));
            div.scrollTop(div.scrollTop()+10000);
        };

        sockjs.onopen    = function()  {print('[*] open', sockjs.protocol);};
        sockjs.onmessage = function(e) {print('[.] message', e.data);};
        sockjs.onclose   = function()  {print('[*] close');};

        form.submit(function() {
            print('[ ] sending', inp.val());
            sockjs.send(inp.val());
            inp.val('');
            return false;
        });*/
        var wsUri =(window.URLHREF.split('/')[0]=='https:'? 'wss://' : 'ws://')+window.URLHREF.split('/')[2]+'/webSocketServer.do?sn='+uuid;
        // var wsUri ='https://192.168.1.162:16666/box-web/webSocketServer.do?sn='+147258;
        var time=120;

        function init() {
            testWebSocket();
        }

        function testWebSocket() {
            websocket = new WebSocket(wsUri);
            websocket.onopen = function(evt) {
                onOpen(evt)
            };
            websocket.onclose = function(evt) {
                onClose(evt)
            };
            websocket.onmessage = function(evt) {
                onMessage(evt)
            };
            websocket.onerror = function(evt) {
                onError(evt)
            };
        }

        function onOpen(evt) {
            writeToScreen("CONNECTED");
            // doSend("WebSocket rocks");

            setInterFunc();

        }

        function onClose(evt) {
            // doSend("我要关闭咯！");
            writeToScreen("DISCONNECTED");
        }

        function setInterFunc(){
            time=120;
            if(main.clearInterCharge(_this.codeInter,_this.domId))return;
            _this.codeInter && clearInterval(_this.codeInter);
            _this.codeInter = setInterval(function () {
                time--;
                if(!time){
                    clearInterval(_this.codeInter);
                    $('#codeMask').hide();
                    $('#codeRefresh').show();
                    closeConnect();
                }
            },1000)
        }

        function onMessage(evt) {
            var res = JSON.parse(evt.data);
            if(Number(res.code)===107){
                setInterFunc();
                $('#codeMask').show();
            }else if(Number(res.code)===100){
                _this.codeInter && clearInterval(_this.codeInter);
                $('#codeRefresh').hide();
                $('#codeMask').show();
                $('#scanRes').text('登陆成功');

                Menu.login(res.body.tokenId,{
                    userName:res.body.userName,
                    loginId:res.body.loginId,
                    roleId:res.body.roleId,
                    id:res.body.id,
                    plantNum:res.body.plantNum,
                    plantId:res.body.plantId,
                }); //权限
                Cookies.setCookByName('userPic', res.body.iconUrl);
                Cookies.setCookByName('userType', res.body.userType);//0:企业，1：个人
                Cookies.setCookByName('plantTypeList', res.body.plantTypeList);//电站类型，1：光伏；2：储能；3：光储  多电站首页tab加载需要

                $('#logoTxt').text(res.body.logoTxt);
                Cookies.setCookByName('logoPic',res.body.userOrg.systemLogo);
                main.loadSys();
                closeConnect();
            }else {
                App.alert(res);
            }

            writeToScreen('<span style="color: blue;">RESPONSE: '+ evt.data+'</span>');
//        websocket.close();
        }

        function closeConnect(evt) {
            websocket.close();
        }

        function onError(evt) {
            writeToScreen('<span style="color: red;">ERROR:</span> '+ evt.data);
        }

        function doSend(message) {
            writeToScreen("SENT: " + message);
            websocket.send(message);
        }

        function writeToScreen(message) {
            console.log(message)
        }

        try {
            init();
        }catch (e){
            console.log(e)
        }
    },
    wxLogin:function () {

        var that = this
        // window.open("https://open.weixin.qq.com/connect/qrconnect?appid=wx99ad9f51c7a56983&redirect_uri=https://www.pv.synpowertech.com/&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect","_blank");

        $('#qrCodeImg').hide()
        try {
            gerWxLogin()
        }catch (err){
            console.log(err)
            setTimeout(function () {
                gerWxLogin()
            },60000)
        }
        function gerWxLogin(){
            new WxLogin({

                id:"qrCodeImg",

                appid: "wx99ad9f51c7a56983",

                scope: "snsapi_login",

                redirect_uri: "https://www.pv.synpowertech.com/",

                state: "",

                style: "",

                href: "https://www.pv.synpowertech.com/css/partial/wxqr.css"

            });
        }

        var getCode = App.getUrlParam("code");
        $('#qrCodeImg').show()
        if(getCode){
            $.http.POST("login/getWxLogin.do",{code:getCode},function (result) {
                if(parseInt(result.code) === 100){
                    Menu.login(result.body.tokenId,{
                        userName:result.body.userName,
                        loginId:result.body.loginId,
                        roleId:result.body.roleId,
                        id:result.body.id,
                        plantNum:result.body.plantNum,
                        plantId:result.body.plantId
                    }); //权限
                    Cookies.setCookByName('userPic', result.body.iconUrl);
                    Cookies.setCookByName('userType', result.body.userType);//0:企业，1：个人
                    Cookies.setCookByName('plantTypeList', result.body.plantTypeList);//电站类型，1：光伏；2：储能；3：光储  多电站首页tab加载需要

                    $('#logoTxt').text(result.body.logoTxt);
                    Cookies.setCookByName('logoPic', !!result.body.userOrg && result.body.userOrg.systemLogo || '');
                    Cookies.setCookByName('energyEffLogoPic', !!result.body.userOrg && result.body.userOrg.systemLogoEe || '');

                    that.intoSys()
                }else {
                    window.location.href=window.URLHREF
                }

            },true,true)
        }
    }
};