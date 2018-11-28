/*2017/11/10
* @author: lms
* @description: 设备分布
*/
define(function () {
    return equipmentDis;
});
var equipmentDis = {
    Render:function () {
        this.getEquipmentDisData()
    },
    getEquipmentDisData:function () {
        var _this = this;
        $.http.POST('/screen/plantDistribution.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            _this.contributionDetail(res.body)
        })
    },
    contributionDetail:function (data) {
        $('.b1').text(App.ConvertUnit({num:data.partCount,unit:'block',isInt:true}).num + App.ConvertUnit({num:data.partCount,unit:'block',isInt:true}).unit);
        //$('.i1').text(data[0].name);
        $('.b2').text(App.ConvertUnit({num:data.inverterCount,unit:'platform',isInt:true}).num + App.ConvertUnit({num:data.inverterCount,unit:'platform',isInt:true}).unit);
        //$('.i2').text(data[1].name);
        $('.b3').text(App.ConvertUnit({num:data.plantArea,unit:'area',isInt:true}).num + App.ConvertUnit({num:data.plantArea,unit:'area',isInt:true}).unit);
        //$('.i3').text(data[2].name);
    },
};