/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  企业基本信息
 * @param:
 */
define(function(){
    return enterpriseInfoPageRender;
});
var enterpriseInfoPageRender = {
    Render: function () {
        $('.enterpriseInfoPage.eeitem').css('display','flex')
        this.getAjax()
        $('#imgCarousel').carousel({
            interval: 5000
        })
    },
    //截取汉字
    subStr:function (str) {
        var fontS = +$('body').css('fontSize').replace('px','')
        var lh=fontS*2

        var hei = Math.round(168/lh);
        var len =  (hei*($('.enterpriseInfoBox').width()-66)- 66)/14
        if(str.length>len){
            str = str.substring(0,(len-2))+'...'
        }
        return str
    },
    getAjax: function () {
        var _this = this
        $.http.POST('/energyMonitor/getEnterpriseInfo.do',{tokenId:Cookies.getCook('tokenId')},function (result) {
            $.each(result.body,function (name,value) {
                if(name === 'photos'){
                    if(App.isEmptyObject(value))return
                    for(var i = 0 ; i<3 ; i++){
                        if($('#carouselImg'+i).length){
                            !!value[i]  ? $('#carouselImg'+i).attr('src',value[i]).one('error',function () {
                                $(this).attr('src','/images/energyEfficient/activeMonitor/img.png') }) : $('#carouselImg'+i).attr('src','/images/energyEfficient/activeMonitor/img.png')
                        }
                    }
                    /*for(var i=0,len = value.length;i<len;i++){
                        var img = value[i];
                        !!img ? $('#carouselImg'+i).attr('src', img).one('error', function () {
                            $('#carouselImg'+i).attr('src', '/images/energyEfficient/activeMonitor/img.png')
                        }) : $('#carouselImg'+i).attr('src', '/images/energyEfficient/activeMonitor/img.png');
                    }*/
                }else if(name === "description"){

                    $('#'+name).text(_this.subStr(value));
                }else{
                    $('#'+name).text(value)
                }
            })
        })
    }
}