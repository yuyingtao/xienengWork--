/** 2017/11/22
 * @author: SP0014
 * @description:  多电站
 */
define(function () {
    return manyPlants
});
var manyPlants = {
    interval1:'',     //年月日定时器
    interval2:'',   //电站状态定时器
    interval3:'',  //功率曲线定时器
   // dimension:"day",
    md:"",
    // year :date.getFullYear(),
    // month : date.getMonth()+1,
    // day :date.getDate(),
    Render: function () {
        var _this = this;
        //加载轮播页面
        $("#loadCarousel").loadPage("partial/plantMonitor/pmManyPlant/loadCarousel.html");
        //加载发电量曲线页面(目前是加载的光伏项目的)
        $("#powerGenCurve").loadPage("partial/plantMonitor/pmManyPlant/photovoltaic.html");
        //加载实时信息
        $("#realTimeInfo").loadPage("partial/plantMonitor/pmManyPlant/realTimeInfo.html");
        //加载table
        $("#plantTableInfos").loadPage("partial/plantMonitor/pmManyPlant/photovoltaicTable.html")
    },
};