/** 2017/10/31
 * @author: kj
 * @description:  公司简介
 */
define(function () {
    return companyInfo;
});
var companyInfo = {
    Render:function () {
        this.getCompanyData()
    },
    getCompanyData:function () {
        var _this = this;
        $.http.POST('/screen/introduction.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            if(!res.body.description){
                res.body.description = "新能源行业领先的新能源管理平台及解决方案供应商,公司注重人才的凝聚培养与技术的研发创新，致力于通过先进的技术，为全球绿色能源的应用和高效管理提供解决方案"
            }


            _this.companyDetail(res.body)
        })
    },
    //截取汉字
    subStr:function (str) {
        var fontS = +$('body').css('fontSize').replace('px','')
        var lh=fontS*2.2

        var hei = Math.round(($('.company-content').height()-$('.companyImg').height()-4*fontS)/lh);
        var len =  hei*($('.company-content').width()-$('.companyImg').width())/13
        if(str.length>len){
            str = str.substring(0,(len-2))+'...'
        }
        return str
    },
    companyDetail:function (data) {

        var value = data.image;
        !!value  ? $('.company-content .companyImg').attr('src',value).one('error',function () {
            $('.company-content .companyImg').attr('src','/images/defaultPlant.png') }) : $('.company-content .companyImg').attr('src','/images/defaultPlant.png')

        $('.company-content').find('h2').text(data.title);
        $('.company-content').find('p.companyWord').text(this.subStr(data.description));
    },
};