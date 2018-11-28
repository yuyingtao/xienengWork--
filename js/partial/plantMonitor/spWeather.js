/** 2018/3/6
 * @author: SP0014
 * @description:  单电站页面 天气
 */
define(function () {
    return spWeather;
});
var spWeather = {
    weatherInter: '',//天气 定时器
    plantId: '',//电站id
    domId: 'spMonitorCarousel',//模块中的任意Id
    Render:function(){
        this.plantId = opts.plantId || ''//电站id
        this.getData()
    },
    getData:function(){
        var _this = this;
        //电站实时收益及状态 天气 社会贡献
        weatherInter();
        function weatherInter() {
            if (main.clearInterCharge(_this.weatherInter, _this.domId)) return;
            $.http.POST('/plantInfo/getPlantWeather.do', {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId,
                serviceType:2
            }, function (result) {
                _this.drawWeather(result.body)
            })
        }

        _this.weatherInter = setInterval(weatherInter, 30000);
    },
    //绘制天气数据
    drawWeather: function (data) {
        var date = new Date(data[0].dataTime);
        var week;
        switch (date.getDay()) {
            case 0:
                week = $.getI18n('sp.sunday');
                break;
            case 1:
                week = $.getI18n('sp.monday');
                break;
            case 2:
                week = $.getI18n('sp.tuesday');
                break;
            case 3:
                week = $.getI18n('sp.wednesday');
                break;
            case 4:
                week = $.getI18n('sp.thursday');
                break;
            case 5:
                week = $.getI18n('sp.friday');
                break;
            case 6:
                week = $.getI18n('sp.saturday');
                break
        }
        $('#ps-activeTime').text(date.format('yyyy/MM/dd') + ' ' + week);
        $('.todayWeather').find('img').attr('src', data[0].dayPictureUrl);
        $('.weatherInfo').find('span').eq(0).text(data[0].currentTemperature + '°');
        $('.weatherInfo').find('span').eq(1).text(data[0].weather);
        $('.weatherInfo').find('span').eq(2).text(data[0].temperature + '°');
        $('.tomWeather').eq(0).find('.rgInfo').find('p').eq(0).text(data[1].weather);
        $('.tomWeather').eq(0).find('.rgInfo').find('p').eq(1).text(data[1].temperature + '°');
        $('.tomWeather').eq(0).find('.rgInfo').find('img').attr('src', data[1].dayPictureUrl);
        $('.tomWeather').eq(1).find('.rgInfo').find('p').eq(0).text(data[2].weather);
        $('.tomWeather').eq(1).find('.rgInfo').find('p').eq(1).text(data[2].temperature + '°');
        $('.tomWeather').eq(1).find('.rgInfo').find('img').attr('src', data[2].dayPictureUrl)
    },
};