/*2017/11/9
* @author: lms
* @description:  社会贡献
*/
define(function () {
    return contribution;
});
var contribution = {
    Render:function () {
        this.getcontributionData()
    },
    getcontributionData:function () {
        var _this = this;
        $.http.POST('/screen/contribution.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            //console.log(res)
            _this.contributionDetail(res.body)
        })
    },
    contributionDetail:function (data) {
       $('.flex').find('.flex_center').eq(0).find('b').text(App.convertUnit('kg',data[0].value,6,3).num).end()
           .find('span').text(data[0].name+'('+App.convertUnit('kg',data[0].value,6,3).unit+')').end().end()
           .eq(1).find('b').text(App.ConvertUnit({num:data[1].value,unit:'tree',isInt:true}).num).end()
           .find('span').text(data[1].name+'('+App.ConvertUnit({num:data[1].value,unit:'tree',isInt:true}).unit+')').end().end()
           .eq(2).find('b').text(App.convertUnit('kg',data[2].value,6,3).num).end()
           .find('span').text(data[2].name+'('+App.convertUnit('kg',data[2].value,6,3).unit+')').end().end()
    },
};