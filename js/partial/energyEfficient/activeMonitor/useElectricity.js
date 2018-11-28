/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  用电统计
 * @param:
 */
define(function(){
    return useElectricityPageRender;
});
var useElectricityPageRender = {
    inter:"",
    Render: function () {
        var _this = this
        $('.useElectricityPage.eeitem').css('display','flex')
        this.inter && clearTimeout(_this.inter)
        this.getData()
    },
    getData:function () {
        var _this = this;
        $.http.POST('/energyMonitor/getUseElec.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            _this.inter = setTimeout(useElectricityPageRender.getData,5000)
            useElectricityPageRender.setVal(res.body)
        })
    },
    setVal:function (data) {
        var units = {
            dayElec: 'kilowatt',
            dayElecPrice: 'rmb',
            monthElec: 'kilowatt',
            monthElecPrice: 'rmb',
            yearElec: 'kilowatt',
            yearElecPrice: 'rmb',
        }
        var convertVal
        $.each(data,function (name,value) {
            convertVal = App.ConvertUnit({num:value,unit:units[name]})
            $('#'+name).text(convertVal.num + convertVal.unit)

        })
    },
}