/**
 * Created by SP0014 on 2018/1/16.
 * 设备管理-设备管理 首页
 */
define(function(){
    return devInvEle;
});
var devInvEle = {
    Render: function () {
        //默认加载按地区分组下的逆变器页面
        $('#deviceTables').loadPage($('.deviceUl li a').eq(0).attr('attr-href'));
        $('.rightInfo_device .deviceUl li').unbind().on('click',function(){
            $.fn.zTree.init($("#ztree"), '', '');
            $('.deviceUl li').removeClass('actLi');
            $(this).addClass('actLi');
            $('#deviceTables').loadPage($(this).children('a').attr('attr-href'));
            var type= $(this).children('a').data('type');
            $('.deviceHead1').hide();
            $('.deviceHead1 input').val('');
            $('.deviceHead1 select').val('');
            $('#key').val('');
            // $('.noData').show()
            if(type=='dau'){
                $('.typeDiv').eq(0).show();
                $('.typeDiv').eq(1).hide();
                $(".statusDiv").eq(0).show();
                $(".statusDiv").eq(1).hide();
                $(".opeDiv").eq(0).show();
                $(".opeDiv").eq(1).hide();
                $('.searchDevice').show();
                $('#deleteDau').show();
                $('#addDau').show()
            }else if(type=='inverter'){
                $('.typeDiv').show();
                $(".opeDiv").eq(0).show();
                $(".opeDiv").eq(1).hide();
                $(".statusDiv").eq(0).show();
                $(".statusDiv").eq(1).hide();
                $('.searchDevice').show();
                $('#deleteDau').hide();
                $('#addDau').hide()
                // $(".deviceHead1").show()
                // $('.typeDiv').eq(1).show()
                // $('#deleteDau').hide()
                // $('#addDau').hide()
                // $('.statusDiv').eq(0).hide()
                // $('.statusDiv').eq(1).show()
                // $(".opeDiv").eq(1).hide()
            }else{
                $(".deviceHead1").show();
                $('.typeDiv').show();
                $(".opeDiv").eq(1).show();
                $(".opeDiv").eq(0).hide();
                $('.statusDiv').hide()
            }
        })
    },

};
