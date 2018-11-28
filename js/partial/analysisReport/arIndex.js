/** 2017/10/19
* @author: kj
* @description:
*/
define(function(){
    return ARPageRender;
});
var ARPageRender = {
    Render: function () {
        //    Todo Main function
        $('#navTitBar div').on('click',function () {
            var $this = $(this);
            $('#navTitBar div').removeClass('on');
            $this.addClass('on');
            $('#repContent').loadPage($this.attr('attr-href'));
        });
        $('#navTitBar div').eq(0).click()
        //判断电站类型 光伏plantType=0时不显示电费报表tab
        if(Cookies.getCook('plantType')==1){
            $("#electricityReportTab").remove()
        }
        /*if(Cookies.getCook('plantType')==2){
            $("#compReportTab").remove()
        }*/
    }
};