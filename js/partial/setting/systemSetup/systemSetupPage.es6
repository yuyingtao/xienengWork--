/**
 * Created by SP0015 on 2017/12/25.
 */
/**
 * Created by SP0015 on 2017/12/25.
 */
define(function(){
    return SystemRender;
});
var SystemRender = {
    imgUrl:[],
    newImgUrls:[],
    newImgUrl:"",
    sigleImgUrl:"",
    domainName:"",
    Render: function () {
        //    Todo Main function
        var _this = this;
        // console.log(window.location.href)
        // console.log(window.location.protocol)
        // console.log(window.location.host)
        _this.domainName = window.location.host;
        //获取用户信息
        this.getSystemContent(_this);
        //点击编辑按钮跳转
        $("#edit").unbind().on("click",function(){
            $(".showBox").hide();
            $(".editBox").show()
        });
        //点击取消按钮跳转回来
        $("#cancel").unbind().on("click",function () {
            $(".showBox").show();
            $(".editBox").hide();
            _this.getSystemContent(_this)
        });
        //点击删除头像登录LOGO
        $(".closeBtn").unbind().on("click",function (event) {
            event.stopPropagation();
            $(this).parent('div').hide();
            $("#newIcon").attr("src","images/setting/upload1.png");
            $("#up_img").val("")
        });
        //点击删除图片 登录图片
        $(".uploadA").unbind().on("click",function () {
            $(this).parent().children("img").attr("src","/images/setting/upload1.png");
            $(this).parent().children("input").val("");
            $(this).hide()
        });
        //预览图片
        $(".editLoginImg").unbind().on("change","input[type =file]",function () {
            var that = this;
            _this.fileUpLoad(that,"up_img","newIcon");
            // $(".closeBtn").show()
        });
        //登录图片预览
        $("#upImg4").unbind().on("change",function () {
            var that = this;
            $(".eachImgBox4").css("width","280px").css("height","156px");
            _this.fileUpLoad(that,"upImg4","eachImgBox4");
            // $(this).parent().find(".uploadA").show()
        });
        $("#upImg5").unbind().on("change",function () {
            var that = this;
            //console.log(that)
            $(".eachImgBox5").css("width","280px").css("height","156px");
            _this.fileUpLoad(that,"upImg5","eachImgBox5");
            // $(this).parent().find(".uploadA").show()
        });
        $("#upImg6").unbind().on("change",function () {
            var that = this;
            //console.log(that)
            $(".eachImgBox6").css("width","280px").css("height","156px");
            _this.fileUpLoad(that,"upImg6","eachImgBox6");
            // $(this).parent().find(".uploadA").show()
        });
        //保存修改
        $("#save").unbind().on("click",function () {
            // var up_img =$("#up_img")
            if($("#newIcon").attr("src")==_this.sigleImgUrl){

            }
            else{
                _this.uploadImgSigle(_this,["#up_img"]);
                _this.getSystemContent(_this)
            }
            // //多张上传
            // if($("#eachImgBox4").attr("src")==this.imgUrls[0]&&$("#eachImgBox5").attr("src")==this.imgUrls[1]&&$("#eachImgBox6").attr("src")==this.imgUrls[2]){
            //     this.imgUrl = "";
            //     _this.uploadImg(["#upImg4","#upImg5","#upImg6"],_this)
            // }
            if(_this.imgUrl[0]){
                if($("#eachImgBox4").attr("src")!=_this.imgUrl[0]){
                    _this.newImgUrls.push(_this.imgUrl[0])
                }
            }
            if(_this.imgUrl[1]){
                if($("#eachImgBox5").attr("src")!=_this.imgUrl[1]){
                    _this.newImgUrls.push(_this.imgUrl[1])
                }
            }
            if(_this.imgUrl[2]){
                if($("#eachImgBox6").attr("src")!=_this.imgUrl[2]){
                    _this.newImgUrls.push(_this.imgUrl[2])
                }
            }
            if(_this.newImgUrls.length){
                _this.newImgUrl = _this.newImgUrls.join(";");
                _this.uploadImg(["#upImg4","#upImg5","#upImg6"],_this)
            }else {
                _this.uploadImg(["#upImg4","#upImg5","#upImg6"],_this)
            }
        })
    },
    fileUpLoad:function(_this,upBtn,imgShowBox) {
        var ipt = document.getElementById(upBtn);
        var imgCont = document.getElementById(imgShowBox);
        var file = _this.files[0];
        var size = Math.round(file.size / 1024 / 1024);
        if (size > 1) {
            // console.log('in')
            var picVal = '#'+upBtn;
            $(picVal).val('')
            App.alert("图片过大");
            return
        }
        if (!/image\/\w+/.test(file.type)) { //html中已经用accept='image/*'限制上传的是图片了，此处判断可省略
            App.alert("文件必须为图片！");
            return false;
        }
        if (!FileReader) {
            App.alert("你的浏览器不支持H5的FileReader");
            ipt.setAttribute("disabled", "disabled");//浏览器不支持禁用input type='file'文件上传标签
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);//将文件读取为Data URL 读取结果放在result中
        fileReader.onload = function (e) {
            // var img = '<img src="' + this.result + '"/>';
            imgCont.src = this.result;
            var showClose = '#'+imgShowBox
            if($(showClose).attr('src')!='/images/setting/upload1.png'){
                $(showClose).siblings('div.uploadA').show()
            }
        }
    },
    //获取基本信息
    getSystemContent:function(_this){
        $.http.POST('/system/getSystemContent.do',{tokenId:Cookies.getCook('tokenId'),domainName:_this.domainName}, function (result) {
            // console.log(result)
                //渲染显示页面
                $(".showSysSpanName").html(result.body.systemName);
                if(!result.body.loginLogo){
                    $(".showSysImg").attr("src","/images/setting/systemSetup/cpLog.png")

                }else {
                    $(".showSysImg").attr("src",result.body.loginLogo)
                }
                if(result.body.loginPhoto.length){
                    result.body.loginPhoto.map(function (item,index) {
                        $(`.loginPhoto${index+1}`).attr("src",item)
                    })
                }else {
                    for(let i = 0; i<3;i++){
                        $(`.loginPhoto${i+1}`).attr("src",`images/loginImages/bg${i+1}.jpg`)
                    }
                }
                _this.sigleImgUrl = result.body.loginLogo;
                _this.imgUrl = result.body.loginPhoto;
                //渲染编辑页面
                $(".editSysSpanName").val(result.body.systemName);
                if(!result.body.loginLogo){
                    $("#newIcon").attr("src","/images/setting/systemSetup/cpLog.png")
                    $("#newIcon").siblings('.uploadA').show()
                }else {
                    $("#newIcon").attr("src",result.body.loginLogo)
                }
                if(result.body.loginPhoto.length){
                    result.body.loginPhoto.map(function (item,index) {
                        $(`.eachImgBox${index+4}`).attr("src",item).parent().find(".uploadA").show()
                    });
                }
                if(result.code){
                    $(".showBox").show();
                    $(".editBox").hide()
                }
        })
    },
    //单张上传
    uploadImgSigle:function(_this,ids){
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        $.ajax({
            url:`/system/updateLoginLogo.do?imgUrl=${_this.sigleImgUrl}&tokenId=${Cookies.getCook('tokenId')}&domainName=${_this.domainName}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                // console.log(result)
                _this.getSystemContent(_this);
                $(".showBox").show();
                $(".editBox").hide()
            },complete:function () {
                var file = document.getElementById('up_img');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
            }
        });
    },
    //图片上传多张时
    uploadImg:function(ids,_this){
        // console.log($(ids[0])[0].files[0])
        // console.log(111,_this.newImgUrls)
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        pic.push($(ids[1])[0].files[0]);
        pic.push($(ids[2])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        !!pic[1] ? fd.append('file', pic[1]) : fd.append('file', '');
        !!pic[2] ? fd.append('file', pic[2]) : fd.append('file', '');
        // console.log(fd)
        $.ajax({
            url:`/system/updateLoginPhoto.do?imgUrl=${_this.newImgUrl}&systemName=${$(".editSysSpanName").val()}&tokenId=${Cookies.getCook('tokenId')}&domainName=${_this.domainName}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                App.warningDialog('修改成功');
                _this.getSystemContent(_this)
            },complete:function () {
                _this.newImgUrls.length = 0;
                _this.newImgUrl = "";
                var file1 = document.getElementById('upImg4');
                file1.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                var file2 = document.getElementById('upImg5');
                file2.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                var file3 = document.getElementById('upImg6');
                file3.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
            }
        });
    }
};