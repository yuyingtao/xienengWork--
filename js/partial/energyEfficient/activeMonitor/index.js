/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  月峰谷电量统计
 * @param:
 */
define(function(){
    return activeMonitorIndRender;
});
var activeMonitorIndRender = {
    Render: function () {
        $.each($('.loadBox'),function (index,item) {
            $(this).loadPage($(this).attr('attr-href'))
        })
    }
}