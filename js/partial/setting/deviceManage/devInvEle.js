/**
 * Created by SP0014 on 2018/1/10.
 */
define(function(){
    return devInvEle;
});
var devInvEle = {
    Render: function () {
        //默认加载逆变器页面
        //$('#deviceTables').loadPage($('.deviceUl li a').eq(0).attr('attr-href'))
        $('.deviceUl li').unbind().on('click',function(){
            $('.deviceHead1 input').val('');
            $('.deviceHead1 select').val('');
            $('.deviceUl li').removeClass('actLi');
            $(this).addClass('actLi');
            var deviceType = $(this).children('a').data('type');
            var aHtml = '<a class="importDevice" i18n="import">import</a><a class="addDevice" i18n="add">add</a>';
            if(deviceType == 'inverter'){
                if($('.importDevice').length==0){
                    $('.opeDiv').append(aHtml)
                }
                $('.importDevice').attr('permission','libInverterManageImport')
            }else if(deviceType =='assembly'){
                if($('.importDevice').length==0){
                    $('.opeDiv').append(aHtml)
                }
                $('.importDevice').attr('permission','libAssemblyLoggerImport')
            }else{
                if($('.importDevice').length==0){
                    $('.opeDiv').append(aHtml)
                }
                $('.importDevice').attr('permission','libCameraManageImport')
            }
            // console.log($('.importDevice').attr('permission'))
            // console.log($('.importDevice').length)
            Menu.hasElementRight();
            // console.log(deviceType)
            // $('select[name="deviceType"]').val(deviceType)
            $('#deviceTables').loadPage($(this).children('a').attr('attr-href'))
        });
        $('.deviceUl li').eq(0).click()
    },
};
