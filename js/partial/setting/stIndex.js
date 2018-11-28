/**
 * Created by SP0015 on 2017/12/25.
 */
define(function(){
    return SetIndexRender;
});
var SetIndexRender = {
    Render: function () {
        //    Todo Main function
        //页面加载初始化默认显示权限设置页面
       //$('#setNav').loadPage($("#stNavSwitchBar li a").eq(1).attr('attr-href'));
       //  $('#stNavSwitchBar li a').unbind().on('click',function(){
       //      $('#stNavSwitchBar li').removeClass('active')
       //      $(this).parent('li').addClass('active')
       //      $('#setNav').loadPage($(this).attr('attr-href'));
       //  })
       //  $("#stNavSwitchBar li a").eq(2).click()

        /*$("#mainPageScroll").mCustomScrollbar({
            theme:"3d",
            axis:"yx" // vertical and horizontal scrollbar
        });*/

        var _this = this;

        var logoPic = Cookies.getCook('logoPic');
        !!logoPic  ? $("#toHome img").attr('src',logoPic).one('error',function () {
            $("#toHome img").attr('src','/images/logo.png') }) : $("#toHome img").attr('src','/images/logo.png');
        $("nav ul li").each(function (index) {
            if(index!="0"){
                if($(this).hasClass("activeLi")){
                    $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg2.png");
                    $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                    $(this).css("background-color","#2A353E")
                }
            }else{
                if($(this).hasClass("activeLi")){
                    $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                    $(this).css("background-color","#2A353E")
                }
            }
        });
        $("nav ul li").on("click",function () {
            $('#setNav').loadPage($(this).find('a').attr('attr-href'));
            $("nav ul li").each(function (index) {
                $(this).removeClass("activeLi")
            });
            $(this).addClass("activeLi");
            $("nav ul li").each(function (index) {
                if(index!=0){
                    $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg4.png");
                    $(this).css("background-color","#121E28");
                    if($(this).hasClass("activeLi")){
                        $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg2.png");
                        $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                        $(this).css("background-color","#2A353E");
                        // $("nav ul li").eq(0).children(".next").find("img").attr("src","/images/newMain/nav_bg4.png")
                        $("nav ul li").eq(0).children(".firPer").find("img").attr("src","/images/newMain/nav_bg1.png");
                        $("nav ul li").eq(0).children(".next").find("img").attr("src","/images/newMain/nav_bg4.png");
                        if(index-1 == 0){
                            $("nav ul li").eq(0).children(".next").find("img").attr("src","/images/newMain/nav_bg2.png")
                        }
                    }
                }
                else{
                    $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                    $(this).children(".firPer").find("img").attr("src","/images/newMain/nav_bg5.png");
                    $(this).css("background-color","#121E28");
                    if($(this).hasClass("activeLi")){
                        $(this).css("background-color","#2A353E")
                    }
                }
            })
        });
        $('nav ul li').eq(0).click();
        //hover效果
        $("nav ul li").on("mouseover",function () {
            if($(this).prev("li").hasClass("activeLi")){
                $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg6.png");
                $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                $(this).css("background-color","#2A353E")
            }else if($(this).next("li").hasClass("activeLi")){
                $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg6.png");
                $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg2.png");
                $(this).css("background-color","#2A353E")
            }else if($(this).hasClass("activeLi")){

            }else {
                $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg2.png");
                $(this).css("background-color","#2A353E")
            }
        });
        $("nav ul li").on("mouseleave",function () {
            if($(this).prev("li").hasClass("activeLi")){
                $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg3.png");
                $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg4.png");
                $(this).css("background-color","#121E28")
            }else if($(this).next("li").hasClass("activeLi")){
                $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg2.png");
                $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg4.png");
                $(this).css("background-color","#121E28")
            }else if($(this).hasClass("activeLi")){

            }else {
                $(this).children(".next").find("img").attr("src","/images/newMain/nav_bg4.png");
                $(this).prev("li").children(".next").find("img").attr("src","/images/newMain/nav_bg4.png");
                $(this).css("background-color","#121E28")
            }
        });
        $("nav ul li").eq(0).on("mouseover",function () {
            if(!$(this).hasClass("activeLi")){
                $(this).children(".firPer").find("img").attr("src","/images/newMain/nav_bg5.png")
            }
        });
        $("nav ul li").eq(0).on("mouseleave",function () {
            if(!$(this).hasClass("activeLi")){
                $(this).children(".firPer").find("img").attr("src","/images/newMain/nav_bg1.png")
            }
        });

        $('#toHome').on('click', function () {
            Cookies.setCookByName('defaultLoading', Number(Cookies.getCook("sysType")) === 0 ? 'main' : 'singleSys');
            window.location.href='/'
        });
        //设置用户名字
        $('#settingPageUser').text(Cookies.getCook('userName'));
        var userPic = Cookies.getCook('userPic');
        !!userPic  ? $('.admin img').attr('src',userPic).one('error',function () {
            $('.admin img').attr('src','/images/newMain/admin.png') }) : $('.admin img').attr('src','/images/newMain/admin.png');

        //退出
        $('#exitSys').on('click',function () {
            $.http.POST('/login/loginOut.do',{},function (result) {
                Menu.clearUserRole();
                Cookies.setCookByName('tokenId', '');
                localStorage.setItem('login','');
                window.location.href='/'
            })
        });
        //修改密码
        $('#modifyPwd').unbind().on('click',function(){
            _this.modifyPassword()
        })
    },
    //修改密码
    modifyPassword:function(){
        var pd = '';
        var pwdContent = '<form id="pwdForm">' +
            '<div class="form-group1">' +
            '<b>*' +
            '</b>' +
            '<label>' + $.getI18n('oldPwd') +'：'+
            '</label>' +
            '<input name="OldPassword" type="password" id="OldPassword"/>' +
            '<span class="OldPassword">&nbsp;</span>' +
            '</div>' +
            '<div class="form-group1">' +
            '<b>*' +
            '</b>' +
            '<label>' + $.getI18n('newPwd') +'：'+
            '</label>' +
            '<input name="NewPassword" type="password" id="NewPassword"/>' +
            '<span class="NewPassword">&nbsp;</span>' +
            '</div>' +
            '<div class="form-group1">' +
            '<b>*' +
            '</b>' +
            '<label>' + $.getI18n('confirmPwd') +'：'+
            '</label>' +
            '<input name="repNewPassword" type="password" id="repNewPassword"/>' +
            '<span class="repNewPassword">&nbsp;</span>' +
            '</div>' +
            '</form>';
        pd = App.dialog({
            title: $.getI18n('modifyPWD'),
            width: 450,
            height: 260,
            maxWidth: document.documentElement.clientWidth - 40,
            maxHeight: document.documentElement.clientHeight - 42,
            appendTo: 'body',
            backdrop: false,
            modal: true,
            keyboard: true,
            content:pwdContent ,
            // openEvent: function () {
            //     setEnvent()
            // },
            closeEvent: null,
            isdrag: true,
            buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
        });
        $('#OldPassword').unbind().on('blur', function () {
            if ($.trim($('#OldPassword').val())) {
                $('.OldPassword').text($.getI18n('inputNewPwd')).css('visibility', 'hidden')
            }
        });
        $('#NewPassword').unbind().on('blur', function () {
            if ($.trim($('#NewPassword').val())) {
                $('.NewPassword').text($.getI18n('inputOldPwd')).css('visibility', 'hidden')
            }
        });
        $('#repNewPassword').unbind().on('blur', function () {
            if ($.trim($('#repNewPassword').val())) {
                $('.repNewPassword').text($.getI18n('inputconfPwd')).css('visibility', 'hidden')
            }
        });
        $('#saveOwner').unbind().on('click', function () {
            if (!$.trim($('#OldPassword').val())) {
                $('.OldPassword').text($.getI18n('inputOldPwd')).css('visibility', 'visible');
                return false;
            }
            if (!$.trim($('#NewPassword').val())) {
                //App.alert('请输入新密码');
                $('.NewPassword').text($.getI18n('inputNewPwd')).css('visibility', 'visible');
                return false;
            }
            if (!$.trim($('#repNewPassword').val())) {
                $('.repNewPassword').text($.getI18n('inputconfPwd')).css('visibility', 'visible');
                //App.alert('请输入确认新密码');
                return false;
            }
            if ($('#NewPassword').val() != $('#repNewPassword').val()) {
                //App.alert('确认新密码与新密码不相等，请重新输入！');
                $('.repNewPassword').text($.getI18n('difPwd')).css('visibility', 'visible');
                return false;
            }
            var data = $('#pwdForm').getForm();
            $.each(data, function (i, val) {
                data[i] = hex_md5(val)
            });
            data.tokenId = Cookies.getCook('tokenId');
            data.userId = Cookies.getCook('id');
            $.http.POST('/user/updateUserPwd.do', data, function (res) {
                // App.alert(res.msg)
                if (res.code == 101) {
                    App.alert(res.msg)
                } else {
                    App.alert(res.msg);
                    $('#exitSys').click()
                }
            }, true, true)
        })
    },
};
