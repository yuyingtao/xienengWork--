/** 2017/11/18
 * @author: kj
 * @description:  单电站页面
 */

define(function () {
    return PMSPageRender;
});
var PMSPageRender = {
    plantId: '',//电站id
    singlePlantType:0, //电站类型
    Render: function (opts) {
        //    Todo Main function
        var _this = this;
        _this.singlePlantType = opts.singlePlantType;
        _this.plantId = opts.plantId;

        switch(Number(_this.singlePlantType)){
            case 1:
                //电站状态
                // $('#spPlantStatus').loadPage('partial/plantMonitor/spStatusCap.html',opts);
                //天气
                // $('.pms-weather').loadPage('partial/plantMonitor/spWeather.html',opts);
                //topo
                $('.palntIndo').loadPage('partial/plantMonitor/spgfTopo.html',opts);
                //实时发电收益
                $('#profitBox').loadPage('partial/plantMonitor/spProfit.html',opts);
                //环境贡献
                $('.spContribution').loadPage('partial/plantMonitor/spContribution.html',opts);
                //静态信息
                $('.capPower').loadPage('partial/plantMonitor/spInfo.html',opts);
                //电站功率
                $('.plantPower').loadPage('partial/plantMonitor/spPower.html',opts);
                //发电量收益统计
                $('.spGenProfit').loadPage('partial/plantMonitor/spGenCount.html',opts);
                break;
            case 2:
                //电站状态
                // $('#spPlantStatus').loadPage('partial/plantMonitor/spStatusCap.html',opts);
                //topo
                $('.palntIndo').loadPage('partial/plantMonitor/spcnTopo.html',opts);
                //实时发电收益
                $('#profitBox').loadPage('partial/plantMonitor/spProfit.html',opts);
                //环境贡献
                $('.spContribution').loadPage('partial/plantMonitor/spContribution.html',opts);
                //静态信息
                $('.capPower').loadPage('partial/plantMonitor/spInfo.html',opts);
                //电站功率
                $('.plantPower').loadPage('partial/plantMonitor/spPower.html',opts);
                //发电量收益统计
                $('.spGenProfit').loadPage('partial/plantMonitor/spGenCount.html',opts);
                break;
            case 3:
                //电站状态
                // $('#spPlantStatus').loadPage('partial/plantMonitor/spStatusCap.html',opts);
                //topo
                $('.palntIndo').loadPage('partial/plantMonitor/spgcTopo.html',opts);
                //实时发电收益
                $('#profitBox').loadPage('partial/plantMonitor/spProfit.html',opts);
                //环境贡献
                $('.spContribution').loadPage('partial/plantMonitor/spContribution.html',opts);
                //静态信息
                $('.capPower').loadPage('partial/plantMonitor/spInfo.html',opts);
                //电站功率
                $('.plantPower').loadPage('partial/plantMonitor/spPower.html',opts);
                //发电量收益统计
                $('.spGenProfit').loadPage('partial/plantMonitor/spGenCount.html',opts);
                break;
        }
    }

};