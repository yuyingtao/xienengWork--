/**
 * Created by SP0015 on 2017/12/25.
 */
/**
 * Created by SP0015 on 2017/12/25.
 */
define(function(){
    return SetEditRender;
});
var SetEditRender = {
    userId:"",
    Icon:"",
    Render: function () {
        //    Todo Main function
        var _this = this;
        //点击编辑按钮跳转
        $("#edit").on("click",function(){
            $(".messList").hide();
            $(".editBox").show()
        });
        //点击取消按钮跳转回来
        $("#cancel").on("click",function () {
            $(".messList").show();
            $(".editBox").hide();
            _this.getInfo(_this)
        });
        //获取用户信息
        this.getInfo(_this);
        //获得焦点取消错误的样式
        $("#newUserName").on("focus",function(){
            $(this).removeClass("rightStyle").removeClass("errStyle")
        });
        $("#newUserTel").on("focus",function(){
            $(this).removeClass("rightStyle").removeClass("errStyle")
        });
        $("#newEmail").on("focus",function(){
            $(this).removeClass("rightStyle").removeClass("errStyle")
        });
        //点击删除头像
        $(".uploadA").on("click",function (event) {
            event.stopPropagation();
            $("#newIcon1").attr("src","images/setting/upload.png");
            $(this).hide();
            $("#up_img").val("")
        });
        $("#save").on("click",function () {
            App.initValidate();
            $('#modifyForm').validate();
            if($("#newUserName").valid()){
                $("#newUserName").addClass("rightStyle")
            }else {
                $("#newUserName").removeClass("rightStyle").addClass("errStyle")
            }
            if($("#newUserTel").valid()){
                $("#newUserTel").addClass("rightStyle")
            }else {
                $("#newUserTel").removeClass("rightStyle").addClass("errStyle")
            }
            if($("#newEmail").val()){
                if($("#newEmail").valid()){
                    $("#newEmail").addClass("rightStyle")
                }else {
                    $("#newEmail").removeClass("rightStyle").addClass("errStyle")
                }
            }
            if(!$('#modifyForm').valid()) return false;
            var newUserName = $("#newUserName").val();
            var newUserTel = $("#newUserTel").val();
            var newLoginId = $("#newLoginId").val();
            var newEmail = $("#newEmail").val();
            $.http.POST('/user/updateUserInfo.do',{tokenId:Cookies.getCook('tokenId'),email:newEmail,loginId:newLoginId,userName:newUserName,userTel:newUserTel,}, function (result) {
                App.warningDialog(result.msg)
                if($("#newIcon1").attr("src")==_this.Icon){
                    _this.getInfo(_this);
                    return false
                }else{
                    _this.uploadImg(_this,["#up_img"],_this.userId)
                }
            })
        });
        //预览图片
        $(".headBox").on("change","input[type =file]",function () {
            var that = this;
            _this.fileUpLoad(that)
        })
    },
    getInfo:function(_this){
        $.http.POST('/user/getUserInfo.do', {tokenId:Cookies.getCook('tokenId')}, function (result) {
            const {body} = result;
            Cookies.setCookByName('userPic', result.body.icon);
            Cookies.setCookByName('userName', result.body.userName);
            $('#settingPageUser').text(Cookies.getCook('userName'));
            var userPic = Cookies.getCook('userPic');
            !!userPic  ? $('.admin img').attr('src',userPic).one('error',function () {
                $('.admin img').attr('src','/images/newMain/admin.png') }) : $('.admin img').attr('src','/images/newMain/admin.png');
            _this.userId = result.body.userId;
            var $oldUserName = $("#oldUserName");
            var $olduserTel = $("#oldUserTel");
            var $oldEmail = $("#oldEmail");
            var $oldIcon = $("#oldIcon");
            var $oldloginId = $("#oldLoginId");
            $oldUserName.html(body.userName);
            $olduserTel.html(body.userTel);
            if(!body.icon){
                $oldIcon.attr("src","/images/setting/head.png");
            }else {
                $oldIcon.attr("src",body.icon);
            }
            if(!body.email){
                $oldEmail.html("--");
            }else {
                $oldEmail.html(body.email);
            }
            $oldloginId.html(body.loginId);

            //编辑页面
            var $newUserName = $("#newUserName");
            var $newIcon = $("#newIcon1");
            var $newUserTel = $("#newUserTel");
            var $newLoginId = $("#newLoginId");
            var $newEmail = $("#newEmail");
            $newUserName.val(body.userName);
            $newUserTel.val(body.userTel);
            $newLoginId.val(body.loginId);
            // $("#newIcon").attr("src",result.body.icon)
            if(!body.icon){
                $newIcon.attr("src","/images/setting/head.png");
            }else {
                $newIcon.attr("src",body.icon);
            }
            if(!body.email){
                $newEmail.val();
            }else {
                $newEmail.val(body.email);
            }
            // loginId.html(body.loginId)
            _this.Icon = body.icon
            $(".messList").show();
            $(".editBox").hide()
        })
    },
    //预览图片
    fileUpLoad:function(_this) {
        var ipt = document.getElementById("up_img");
        var imgCont = document.getElementById("newIcon1");
        var file = _this.files[0];
        var size = Math.round(file.size / 1024 / 1024);
        if (size > 1) {
            alert("图片过大");
            return
        }
        if (!/image\/\w+/.test(file.type)) { //html中已经用accept='image/*'限制上传的是图片了，此处判断可省略
            alert("文件必须为图片！");
            return false;
        }
        if (!FileReader) {
            alert("你的浏览器不支持H5的FileReader");
            ipt.setAttribute("disabled", "disabled");//浏览器不支持禁用input type='file'文件上传标签
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);//将文件读取为Data URL 读取结果放在result中
        fileReader.onload = function (e) {
            imgCont.src = this.result;
        };
        $(".uploadA").show()
    },
    uploadImg:function(_this,ids,userId){
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        $.ajax({
            url:`/user/updateUserIcon.do?imgUrl=${_this.Icon}&tokenId=${Cookies.getCook('tokenId')}&userId=${userId}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                // console.log('result:',result);
                +result.code !== 100 && App.warningDialog(result.msg,1)
                _this.getInfo(_this,result);
            },complete:function () {
                _this.getInfo(_this);
                var file = document.getElementById('up_img');
                // console.log(1,file.value)
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                // console.log(2,file.value)
            }
        });
    }
};