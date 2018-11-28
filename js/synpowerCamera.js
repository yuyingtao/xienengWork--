//依赖 moment.js
/***
 * 视频回放
 */
(function () {
    console.log('视频回放');
    var SynpowerCamera = {
        gAppKey: '',				//app key
        gAccessToken: '',				//accesstoken
        gPlaybackSearchRecord: '',		//search record
        AppKey: '',				//app key
        AccessToken: '',				//accesstoken
        SN: '',				//accesstoken
        PlaybackSearchRecord: '',		//search record
        Flag: false,
        curVedioTime: '',

        /*
        * opt={
         AppKey:'f9ee6aeb44e24ae685a838ba7931c6da',
         AccessToken:"at.006tmi860hyu4zp18197923l216exa52-45ezmtwz5v-1sdzhq7-oevxygfbi",
         Url:'ezopen://open.ys7.com/134046139/1.rec'
        * }
        *
        *
        *
        * */
        init: function (opt) {
            var _this = this;
            _this.AppKey = opt.AppKey;
            _this.AccessToken = opt.AccessToken;
            _this.Url = opt.Url;
            _this.SN = opt.SN;
            _this.Flag= false ;
            _this.curVedioTime = moment().format('YYYY-MM-DD');
            _this.TestActiveX();

            var text = '{ \n' +
                ' "AppKey":"'+_this.AppKey+'", \n' +
                ' "AccessToken":"'+_this.AccessToken+'", \n' +
                ' "Url":"'+_this.Url+'?begin=' + moment(_this.curVedioTime).format('YYYYMMDD') + '&end=' + moment(_this.curVedioTime).add('days', 1).format('YYYYMMDD') + '" \n}';
            // var showpanel = document.getElementById("dataPanel"); //获取显示的窗口
            //
            //
            // showpanel.value = text;
            _this.Flag = true;
            opt.Url = _this.Url+'?begin=' + moment(_this.curVedioTime).format('YYYYMMDD') + '&end=' + moment(_this.curVedioTime).add('days', 1).format('YYYYMMDD');
            _this.StartPlay(opt);
            _this.getMediaHis()

        },
        toEnlarge:function () {
            document.getElementById('cameraHisWin').style.width = '100%';
            document.getElementById('cameraHisWin').style.height = '100%';
            document.getElementById('cameraHisWin').style.left = '0';
            document.getElementById('cameraHisWin').style.top = '0';
            document.getElementById('enlarge').style.display = 'none';
            document.getElementById('shrunk').style.display = 'block'
        },
        toShrunk:function () {
            document.getElementById('cameraHisWin').style.width = '1366px';
            document.getElementById('cameraHisWin').style.height = '82%';
            document.getElementById('cameraHisWin').style.left = 'calc((100% - 1366px)/2)';
            document.getElementById('cameraHisWin').style.top = '70px';
            document.getElementById('shrunk').style.display = 'none';
            document.getElementById('enlarge').style.display = 'block'
        },
//http请求
        XMLHTTP: function (url) {
            var _this = this;
            var xmlhttp;

            return loadXMLDoc();
            function loadXMLDoc() {
                xmlhttp = null;
                if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
                    xmlhttp = new XMLHttpRequest();
                }
                else if (window.ActiveXObject) {// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

               /* try {
                    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e1) {
                        xmlhttp = new XMLHttpRequest();
                    }
                }*/


                if (xmlhttp != null) {
                    xmlhttp.onreadystatechange = state_Change;
                    xmlhttp.open("POST", url, false);
                    // xmlhttp.setRequestHeader("Content-Type","application/json")
                    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//缺少这句，后台无法获取参数
                    // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://open.ys7.com");
                    // xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                    // xmlhttp.setRequestHeader("Access-Control-Allow-Headers","x-requested-with,content-type");// 响应头设置

                    /*xmlhttp.send(JSON.stringify({
                        accessToken: 'at.2b24ct6u8tvj9bxx1eigmf358g113p92-3r8jxp0sv6-1a7hm8b-llkaenocm',
                        deviceSerial: '134046139'
                    }));*/
                }
                else {
                    App.ifrAlert("Your browser does not support XMLHTTP.");
                }
            }

            function state_Change() {
                if (xmlhttp.readyState == 4) {// 4 = "loaded"
                    if (xmlhttp.status == 200) {// 200 = "OK"
                        var getSt = moment(JSON.parse(xmlhttp.responseText).data[0].startTime).format('YYYY-MM-DD');
                        _this.setTimeList(getSt)

                    }
                    else {
                        App.ifrAlert("Problem retrieving data:" + xmlhttp.statusText);
                    }
                }
            }
        },


//获取历史视频日期列表
        getMediaHis: function () {
            var _this = this;
            $.http.POST('/device/getVedioByTime.do',{
                tokenId:Cookies.getCook('tokenId'),
                deviceSerial:_this.SN,
                startTime:moment(_this.curVedioTime).add('days',-15).format('YYYYMMDD')
            },function (res) {
                var getSt = moment(Number(res.body[0].startTime)).format('YYYY-MM-DD');
                _this.setTimeList(getSt)
            })
            // var getSt = _this.XMLHTTP('https://open.ys7.com/api/lapp/video/by/time?accessToken=\''+_this.AccessToken+'\'&deviceSerial=\''+_this.SN+'\'&startTime='+moment(_this.curVedioTime).add('days',-7).format('YYYYMMDD'))
            // console.log(getSt)
        },

        setTimeList: function (getSt) {
            var _this = this;
            if (moment(getSt).unix() < moment(_this.curVedioTime).unix()) {
                var i =0;
                while (getSt <= _this.curVedioTime) {
                    var domId = document.getElementById('hisTimeList');
                    var newNode = document.createElement("input");
                    newNode.type = 'button';
                    newNode.value = getSt;
                    newNode.id = 'timeItem'+i;
                    newNode.setAttribute('onclick', 'SynpowerCamera.ChageTime("' + getSt + '","timeItem'+i+'")');
                    domId.appendChild(newNode);
                    getSt = moment(getSt).add('days', 1).format('YYYY-MM-DD');
                    i++
                }
                var items = document.getElementById('hisTimeList').childNodes;
                items[items.length-1].style.color='#FF6C00'
            }else {
                var domId = document.getElementById('hisTimeList');
                var newNode = document.createElement("span");
                newNode.textContent='--';
                domId.appendChild(newNode)
            }
        },

//预览函数
        StartPlay: function (obj) {
            var _this = this;
            gPlaybackSearchRecord = "";
            //得到控件引用
            var playOcx = document.getElementById("EZUIKit");
            if (!playOcx) {
                App.ifrAlert("EZUIKit can't find!");
                return;
            }

            //获取取流参数
            try {
                var streamobj;
                    streamobj = obj
            } catch (e) {
                App.ifrAlert("JSON parser failed.")
            }

            if (!streamobj) {
                App.ifrAlert("Get stream params invalid!");
                return;
            }
            var appkey = streamobj.AppKey;
            var accesstoken = streamobj.AccessToken;
            var ezurl = streamobj.Url;

            //检测取流参数

            if (appkey == "") {
                App.ifrAlert("Appkey is empty!");
                return;
            }
            if (accesstoken == "") {
                App.ifrAlert("Accesstoken is empty!");
                return;
            }
            if (ezurl == "") {
                App.ifrAlert("EzUrl is empty!");
                return;
            }
            //alert(appkey);
            //alert(accesstoken);
            //alert(ezurl);
            //设置appkey
            //判断参数是否初始化过
            if (_this.gAppKey != appkey) {
                var res = playOcx.InitWithAppKey(appkey);
                if (0 != res) {
                    App.ifrAlert("Init appkey Error!");
                    return;
                }
                _this.gAppKey = appkey;
                //alert("Init appkey success.");
            }
            //设置
            if (_this.gAccessToken != accesstoken) {
                var res = playOcx.SetAccessToken(accesstoken);
                if (0 != res) {
                    App.ifrAlert("Init accesstoken Error!");
                    return;
                }
                _this.gAccessToken = accesstoken;
                //alert("Init accesstoken success.");
            }
        /*    $('html>body').append('<script language="javascript" for="EZUIKit"' +
                '        event="PluginEventHandler(lEventType, strErrorCode, lInterErrorCode)">' +
                ' $(function() { alert() })\n' +
                '</script>')*/

            //清理播放结果窗口
            // var showpanel = document.getElementById("showPanel"); //获取显示的窗口
            // showpanel.value = "";
            //开始播放, 播放结果 根据 PluginEventHandler 回调函数
            var res = playOcx.StartPlay(ezurl);
            if (0 != res) {
                App.ifrAlert("startplay failed! check ezurl!");

            }
            //alert("Startplay success.");
        },


        StopPlay: function () {
            //清理播放结果窗口
            // var showpanel = document.getElementById("showPanel"); //获取显示的窗口
            // showpanel.value = "";
            var playOcx = document.getElementById("EZUIKit");//得到控件引用
            var res = playOcx.StopPlay();
            if (0 != res) {
                App.ifrAlert("StopPlay Error！");
            }
        },


        TestActiveX: function () {
            try {
                var ax = new ActiveXObject("EZOPENUIACTIVEXK.EzOpenUIActiveXKCtrl.1");
                bInstall = true;
                //alert("已安装");
            } catch (e) {
                App.ifrAlert($.getI18n('notInstalled'));
            }
        },

//handle message msgtype
        EZUI_MSGID_PLAY_EXCEPTION: 0,			//播放异常
        EZUI_MSGID_PLAY_RECONNECT: 1,			//播放重连
        EZUI_MSGID_PLAY_RECONNECT_EXCEPTION: 2,			//播放重连异常
        EZUI_MSGID_PLAY_START: 3,			//播放开始
        EZUI_MSGID_PLAY_STOP: 4,			//播放停止
        EZUI_MSGID_PLAY_ARCHIVE_END: 5,			//回放结束
        EZUI_MSGID_VOICETALK_START: 16,			//语音对讲开始
        EZUI_MSGID_VOICETALK_STOP: 17,			//语音对讲停止
        EZUI_MSGID_VOICETALK_EXCEPTION: 18,			//语音对讲异常
        EZUI_MSGID_RECORD_FILE: 20,			//查询的录像文件
        EZUI_MSGID_PTZCTRL_SUCCESS: 46,			//云台控制命令发送成功
        EZUI_MSGID_PTZCTRL_FAILED: 47,			//云台控制失败

        EZUI_ERROR_ACCESSTOKEN_EXPIRE: "UE001", 	///< accesstoken异常或失效，需要重新获取accesstoken，并传入到sdk
        EZUI_ERROR_APPKEY_TOKEN_NOT_MATCH: "UE002",     ///< appkey和AccessToken不匹配,建议更换appkey或者AccessToken
        EZUI_ERROR_CHANNEL_NOT_EXIST: "UE004",     ///< 通道不存在，设备参数错误，建议重新获取播放地址
        EZUI_ERROR_DEVICE_NOT_EXIST: "UE005",     ///< 设备不存在，设备参数错误，建议重新获取播放地址
        EZUI_ERROR_PARAM_INVALID: "UE006",     ///< 参数错误，建议重新获取播放地址
        EZUI_ERROR_EZOPEN_URL_INVALID: "UE007",     ///< 播放地址错误,建议重新获取播放地址
        EZUI_ERROR_NO_RESOURCE: "UE101",	    ///< 设备连接数过大，停止其他连接后再试试
        EZUI_ERROR_DEVICE_OFFLINE: "UE102", 	///< 设备不在线，确认设备上线之后重试
        EZUI_ERROR_CONNECT_DEVICE_TIMEOUT: "UE103", 	///< 播放失败，请求连接设备超时，检测设备网路连接是否正常.
        EZUI_ERROR_INNER_VERIFYCODE: "UE104", 	///< 视频验证码错误，建议查看设备上标记的验证码
        EZUI_ERROR_PLAY_FAIL: "UE105", 	///< 视频播放失败
        EZUI_ERROR_TERMINAL_BINDING: "UE106", 	///< 当前账号开启了终端绑定，只允许指定设备登录操作
        EZUI_ERROR_DEVICE_INFO_INVALID: "UE107", 	///< 设备信息异常为空，建议重新获取播放地址
        EZUI_ERROR_VIDEO_RECORD_NOTEXIST: "UE108", 	///< 未查找到录像文件
        EZUI_ERROR_VTDU_NO_RESOURCE: "UE109", 	///< 取流并发路数限制,请升级为企业版.
        EZUI_ERROR_UNSUPPORTED: "UE110", 	///< 设备不支持的清晰度类型, 请根据设备预览能力级选择.


        PluginEventHandler: function (lEventType, strErrorCode, lInterErrorCode) {
            var _this = this;
            // var showpanel = document.getElementById("showPanel"); //获取显示的窗口
            switch (lEventType) {
                case _this.EZUI_MSGID_PLAY_START:		//播放开始
                {
                    var info;
                    if (gPlaybackSearchRecord != "") {
                        info = "回放成功!" + gPlaybackSearchRecord;
                    }
                    else {
                        info = "播放成功!";
                    }
                    // showpanel.value = info;
                    // document.getElementById('startplaybtn').style.display = 'none';
                    // document.getElementById('stopplaybtn').style.display = 'inline-block';
                }
                    break;
                case _this.EZUI_MSGID_PLAY_EXCEPTION:	//播放异常
                {
                    var errinfo;
                    if (strErrorCode == _this.EZUI_ERROR_ACCESSTOKEN_EXPIRE) {
                        errinfo = "accesstoken异常或失效，需要重新获取accesstoken，并传入到sdk";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_APPKEY_TOKEN_NOT_MATCH) {
                        errinfo = "ppkey和AccessToken不匹配,建议更换appkey或者AccessToken";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_CHANNEL_NOT_EXIST) {
                        errinfo = "通道不存在，设备参数错误，建议重新获取播放地址";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_DEVICE_NOT_EXIST) {
                        errinfo = "设备不存在，设备参数错误，建议重新获取播放地址";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_PARAM_INVALID) {
                        errinfo = "参数错误，建议重新获取播放地址";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_EZOPEN_URL_INVALID) {
                        errinfo = "播放地址错误,建议重新获取播放地址";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_NO_RESOURCE) {
                        errinfo = "设备连接数过大，停止其他连接后再试试";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_DEVICE_OFFLINE) {
                        errinfo = "设备不在线，确认设备上线之后重试";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_CONNECT_DEVICE_TIMEOUT) {
                        errinfo = "播放失败，请求连接设备超时，检测设备网路连接是否正常.";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_INNER_VERIFYCODE) {
                        errinfo = "视频验证码错误，建议查看设备上标记的验证码";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_PLAY_FAIL) {
                        errinfo = "视频播放失败";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_TERMINAL_BINDING) {
                        errinfo = "当前账号开启了终端绑定，只允许指定设备登录操作";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_DEVICE_INFO_INVALID) {
                        errinfo = "设备信息异常为空，建议重新获取播放地址";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_VIDEO_RECORD_NOTEXIST) {
                        errinfo = "未查找到录像文件";
                    }
                    else if (strErrorCode ==_this. EZUI_ERROR_VTDU_NO_RESOURCE) {
                        errinfo = "取流并发路数限制,请升级为企业版.";
                    }
                    else if (strErrorCode == _this.EZUI_ERROR_UNSUPPORTED) {
                        errinfo = "设备不支持的清晰度类型, 请根据设备预览能力级选择";
                    }

                    var info = "播放失败," + errinfo + ".错误码:" + strErrorCode + ", 内部错误码:" + lInterErrorCode;
                    // showpanel.value = info;
                }
                    break;
                case _this.EZUI_MSGID_PLAY_STOP:			//播放停止
                {
                    // document.getElementById('startplaybtn').style.display = 'inline-block';
                    // document.getElementById('stopplaybtn').style.display = 'none';
                }
                    break;
                case _this.EZUI_MSGID_RECORD_FILE:		//录像搜索成功
                {
                    gPlaybackSearchRecord = "录像搜索成功:" + strErrorCode;
                    var res = JSON.parse(strErrorCode);
                    var FileSize = res.FileSize;
                    var curDay = _this.curVedioTime;
                    if (FileSize && _this.Flag) {
                        _this.Flag = false;
                        var str = '';
                        var domId = document.getElementById('progressCon');
                        domId.innerHTML = '';
                        var dayStartTime = moment(curDay).unix();
                        var dayEndTime = moment(curDay + ' 23:59:59').unix();
                        /* var vedioSt = new Date(res.FileList[0].StartTime.replace(/-/g,'/')).getTime() / 1000
                         var newNode = document.createElement("span")
                         if(vedioSt === dayStartTime){
                             var st = new Date(res.FileList[0].EndTime.replace(/-/g,'/')).getTime() / 1000 - vedioSt
        //                        str = '<span style="width: '+100*st/86400+'%" class="ctrol"></span>'
                             newNode.className = "ctrol"
                             newNode.style.width = st/86400+'%'
                         }else {
                             var st = vedioSt - dayStartTime
                             newNode.className = "disctrol"
                             newNode.style.width = st/86400+'%'


                         }*/
                        var newNode = "";
                        var nextDay = moment(_this.curVedioTime).add('days', 1).unix();
                        var firTime = moment(res.FileList[0].StartTime).unix();
                        if (firTime > dayStartTime) {
                            var st = firTime - dayStartTime;
                            newNode = document.createElement("span");
                            newNode.className = "disctrol";
                            newNode.style.width = 100 * st / 86400 + '%';
                            domId.appendChild(newNode);
                            dayStartTime = firTime;

                            var VideoSplitLine = document.getElementById('VideoSplitLine');
                            VideoSplitLine.style.left = document.getElementById('progressCon').offsetWidth * st / 86400 -5 +'px'
                        }
//                    alert(nextDay)
                        for (var i = 0; i < FileSize; i++) {
                            var vedioSt = moment(res.FileList[i].StartTime).unix();
                            newNode = document.createElement("span");
                            //                        无视频
                            if(vedioSt !== dayStartTime) {
                                var st = vedioSt - dayStartTime;
                                newNode.className = "disctrol";
                                newNode.style.width = 100 * st / 86400 + '%';

                                newNode.onmouseover = function (event) {
                                    var getXY = _this.getXAndY(event);
                                    console.log('onmouseover',getXY.x);
                                    console.log(document.getElementById('progressCon').offsetWidth);
                                    var newStratTime = getXY.x * 86400 / document.getElementById('progressCon').offsetWidth + moment(curDay).unix();

                                    document.getElementById('progressCon').title = moment(moment.unix(newStratTime)).format('YYYY-MM-DD HH:mm:ss')
                                };
                                domId.appendChild(newNode)
                            }
//                        有视频
                                var st = moment(res.FileList[i].EndTime).unix() - vedioSt;
                                //                        str = '<span style="width: '+100*st/86400+'%" class="ctrol"></span>'
                                if (st < 0) {
                                    st = nextDay - vedioSt
                                }
                                newNode.className = "ctrol";
                                newNode.style.width = 100 * st / 86400 + '%';
                                newNode.onclick = function (event) {
                                    console.log('width:', document.getElementById('progressCon').style.width);
                                    console.log('offsetWidth:', document.getElementById('progressCon').offsetWidth);
                                    var getXY = _this.getXAndY(event);

                                    var VideoSplitLine = document.getElementById('VideoSplitLine');
                                    VideoSplitLine.style.left = getXY.x -5+'px';
                                    var newStratTime = getXY.x * 86400 / document.getElementById('progressCon').offsetWidth + moment(curDay).unix();

                                    _this.StopPlay();
                                    var text = '{ \n' +
                                        ' "AppKey":"'+_this.AppKey+'", \n' +
                                        ' "AccessToken":"'+_this.AccessToken+'", \n' +
                                        ' "Url":"'+_this.Url+'?begin=' + moment(moment.unix(newStratTime)).format('YYYYMMDDHHmmss') + '&end=' + moment(moment(moment.unix(newStratTime)).format('YYYY-MM-DD') + ' 23:59:59').format('YYYYMMDDHHmmss') + '" \n}';
                                    // var showpanel = document.getElementById("dataPanel"); //获取显示的窗口
                                    //
                                    // showpanel.value = text;
                                    _this.StartPlay({
                                        AppKey: _this.AppKey,
                                        AccessToken: _this.AccessToken,
                                        Url: _this.Url+"?begin=" + moment(moment.unix(newStratTime)).format('YYYYMMDDHHmmss') + "&end=" + moment(moment(moment.unix(newStratTime)).format('YYYY-MM-DD') + ' 23:59:59').format('YYYYMMDDHHmmss')
                                    })
                                };
                                newNode.onmouseover = function (event) {
                                    var getXY = _this.getXAndY(event);
                                    console.log('onmouseover',getXY.x);
                                    console.log(document.getElementById('progressCon').offsetWidth);
                                    var newStratTime = getXY.x * 86400 / document.getElementById('progressCon').offsetWidth + moment(curDay).unix();

                                    document.getElementById('progressCon').title = moment(moment.unix(newStratTime)).format('YYYY-MM-DD HH:mm:ss')
                                };

                            domId.appendChild(newNode);

//                      最后一个记录是否是零点
                            if (i === (FileSize - 1)) {
                                newNode = document.createElement("span");
                                var thisdayEndTime = moment(res.FileList[i].EndTime).unix();
                                if (thisdayEndTime < nextDay) {
                                    var st = nextDay - thisdayEndTime;
                                    newNode.className = "disctrol";
                                    newNode.style.width = 100 * st / 86400 + '%'
                                }
                                newNode.onmouseover = function (event) {
                                    var getXY = _this.getXAndY(event);
                                    var newStratTime = getXY.x * 86400 / document.getElementById('progressCon').offsetWidth + moment(curDay).unix();

                                    document.getElementById('progressCon').title = moment(moment.unix(newStratTime)).format('YYYY-MM-DD HH:mm:ss')
                                };
                                domId.appendChild(newNode)
                            }
                            dayStartTime = moment(res.FileList[i].EndTime).unix()
                        }
                    }
                }
                    break;
                case _this.EZUI_MSGID_VOICETALK_START:		//对讲开启
                {
                    var info = "对讲开启成功";
                    // showpanel.value = info;
                    document.getElementById('starttalkbtn').style.display = 'none';
                    document.getElementById('stoptalkbtn').style.display = 'inline-block';
                }
                    break;
                case _this.EZUI_MSGID_VOICETALK_STOP:		//对讲开启
                {
                    var info = "对讲停止成功";
                    // showpanel.value = info;
                    document.getElementById('starttalkbtn').style.display = 'inline-block';
                    document.getElementById('stoptalkbtn').style.display = 'none';
                }
                    break;
                case _this.EZUI_MSGID_PTZCTRL_SUCCESS:		//云台控制成功
                {
                    var info = "云台控制信令发送成功";
                    // showpanel.value = info;
                }
                    break;
                case _this.EZUI_MSGID_PTZCTRL_FAILED:		//云台控制失败
                {
                    var info = "云台控制失败";
                    // showpanel.value = info;
                }
                    break;
                default:
            }

        },


//切换日期
        ChageTime: function (time,domId) {
            var _this= this;
            _this.Flag = true;
            _this.curVedioTime = time;
            var getXY = _this.getXAndY(event);
            var items = document.getElementById('hisTimeList').childNodes;
            for(var i=0;i<items.length;i++){
                items[i].style && (items[i].style.color='#019cec')
            }
            document.getElementById(domId).style.color='#FF6C00';
            var VideoSplitLine = document.getElementById('VideoSplitLine');
            VideoSplitLine.style.left = '-5px';
            _this.StopPlay();
            var text = '{ \n' +
                ' "AppKey":"'+_this.AppKey+'", \n' +
                ' "AccessToken":"'+_this.AccessToken+'", \n' +
                ' "Url":"'+_this.Url+'?begin=' + moment(time).format('YYYYMMDD') + '&end=' + moment(time).add('days', 1).format('YYYYMMDD') + '" \n}';
            // var showpanel = document.getElementById("dataPanel"); //获取显示的窗口
            //
            // showpanel.value = text;
            _this.StartPlay({
                AppKey: _this.AppKey,
                AccessToken: _this.AccessToken,
                Url: _this.Url+"?begin=" + moment(time).format('YYYYMMDD') + "&end=" + moment(time).add('days', 1).format('YYYYMMDD')
            })
        },

//获取鼠标点击区域中的相对位置坐标
        getXAndY: function (event) {
            //鼠标点击的绝对位置
            var _this = this;
            Ev = event || window.event;
            var mousePos = _this.mouseCoords(event);
            var x = mousePos.x;
            var y = mousePos.y;
            console.log("鼠标点击的绝对位置坐标：" + x + "," + y);

            //获取div在body中的绝对位置
            var x1 = document.getElementById('progressCon').getBoundingClientRect().left;
            var y1 = document.getElementById('progressCon').offsetTop;
            console.log("div在body中的绝对位置坐标：" + x1 + "," + y1);

            //鼠标点击位置相对于div的坐标
            console.log('x1:', x1);
            var x2 = x - x1;
            var y2 = y - y1;
            return {x: x2, y: y2};
        },

//获取鼠标点击区域在Html绝对位置坐标
        mouseCoords: function (event) {
            if (event.pageX || event.pageY) {
                console.log('pageX:', event.pageX);
                return {x: event.pageX, y: event.pageY};
            }
            return {
                x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: event.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
    };
    window.SynpowerCamera = SynpowerCamera;

})();