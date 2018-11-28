define(function () {
    return spContribution;
});
var spContribution = {
    contributionInter: '',//环境贡献 定时器
    plantId: '',//电站id
    domId: 'spMonitorCarousel',//模块中的任意Id
    singlePlantType:0,
    Render: function (opts) {
        var _this = this;
        _this.singlePlantType = opts.singlePlantType;
        _this.plantId = opts.plantId || ''//电站id
        // if(_this.singlePlantType==1){
        //     $('.gf-plant-contribution').show();
        //     $('.ele-plant-weather').hide();
        //     _this.getData()
        // }else{
            $('.gf-plant-contribution').hide();
            $('.ele-plant-weather').show();
            _this.getWeatherData()
        // }
    },
    getData: function () {
        var _this = this;
        //电站实时收益及状态 天气 社会贡献
        contributionInter();
        function contributionInter() {
            if (main.clearInterCharge(_this.contributionInter, _this.domId)) return;
            $.http.POST('/monitor/singlePlantDistribution.do', {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId
            }, function (result) {
                _this.contributionDetail(result.body.contribution)
            })
        }
        _this.contributionInter = setInterval(contributionInter, 30000);
    },
    getWeatherData:function(){
        var _this = this;
        //储能光储天气预报
        $.http.POST('/monitor/getWeatherInfo.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.drawWeather(result.body)
        })
    },
    //社会贡献
    contributionDetail: function (data) {
        $('.flex').find('.flex_center').eq(0).find('b').text(App.convertUnit("kg", data[0].value, 6, 3).num).end()
            .find('span').text(data[0].name + '(' + App.convertUnit("kg", data[0].value, 6, 3).unit + ')').end().end()
            .eq(1).find('b').text(App.ConvertUnit({num: data[1].value, unit: 'tree', isInt: true}).num).end()
            .find('span').text(data[1].name + '(' + App.convertUnit("tree", data[1].value).unit + ')').end().end()
            .eq(2).find('b').text(App.convertUnit("kg", data[2].value, 6, 3).num).end()
            .find('span').text(data[2].name + '(' + App.convertUnit("kg", data[2].value, 6, 3).unit + ')').end().end()
    },
    //天气预报
    drawWeather: function (data) {
        var date = new Date(data[0].dataTime);
        var week , bgImg;
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
        //天气背景图片判断
        // switch (data[0].weather){
        //     // case:''
        // }
        var weatherInfo = data[0].dayPictureUrl.split('/')[3]
        // if(weatherInfo.indexOf('yu') && !weatherInfo.indexOf('yun')){
        //     bgImg= '/images/weather/weather_bg3.png'
        // }else if(weatherInfo.indexOf('xue')){
        //     bgImg= '/images/weather/weather_bg2.png'
        // }else if(weatherInfo.indexOf('qing')){
        //     bgImg= '/images/weather/weather_bg.png'
        // }else{
        //     bgImg= '/images/weather/weather_bg1.png'
        // }
        // console.log('weatherInfo',weatherInfo)
        if(weatherInfo=='duoyun.png' || weatherInfo=='qing.png'){
            bgImg= '/images/weather/weather_bg.png'
        }else if(weatherInfo=='baoyu.png' || weatherInfo=='baoyuzhuandabaoyu.png' ||weatherInfo=='dabaoyu.png'||weatherInfo=='dabaoyuzhuantedabaoyu.png'
        ||weatherInfo=='dayu.png' ||weatherInfo=='dayuzhuanbaoyu.png' ||weatherInfo=='dongyu.png' ||weatherInfo=='leizhenyu.png'
        ||weatherInfo=='leizhenyubanyoubingbao.png' ||weatherInfo=='tedabaoyu.png' ||weatherInfo=='xiaoyu.png' ||weatherInfo=='xiaoyuzhuanzhongyu.png'
            || weatherInfo=='zhenyu.png' || weatherInfo=='zhongyu.png'|| weatherInfo=='zhongyuzhuandayu.png'){
            bgImg= '/images/weather/weather_bg3.png'
        }else if(weatherInfo=='baoxue.png' || weatherInfo=='daxue.png' || weatherInfo=='daxuezhuanbaoxue.png' || weatherInfo=='xiaoxue.png' || weatherInfo=='xiaoxuezhuanzhongxue.png'
            || weatherInfo=='yujiaxue.png' ||weatherInfo=='zhenxue.png' ||weatherInfo=='zhongxue.png' ||weatherInfo=='zhongxuezhuandaxue.png'){
            bgImg= '/images/weather/weather_bg2.png'
        }else{
            bgImg= '/images/weather/weather_bg1.png'
        }
        $('.todayTimeWeek').text(date.format('yyyy/MM/dd') + ' ' + week);
        $('.today-weather .weather-img').find('img').attr('src', data[0].dayPictureUrl);
        $('.today-weather').css('background-image','url('+bgImg+')');
        $('.today-weather .tep').text(data[0].currentTemperature + '°');
        $('.today-weather .weather-tep').find('p').eq(0).text(data[0].weather);
        $('.today-weather .weather-tep').find('p').eq(1).text(data[0].temperature + '°');
        $('.tom-after .tomorrow .tomorrow-img').eq(0).find('img').attr('src', data[1].dayPictureUrl);
        $('.tom-after .tomorrow .tomorrow-img').eq(0).find('p').text(data[1].weather);
        $('.tom-after .tomorrow .tomorrow-tep').eq(0).find('p').eq(1).text(data[1].temperature + '°');
        $('.tom-after .tomorrow .tomorrow-img').eq(1).find('img').attr('src', data[2].dayPictureUrl);
        $('.tom-after .tomorrow .tomorrow-img').eq(1).find('p').text(data[2].weather);
        $('.tom-after .tomorrow .tomorrow-tep').eq(1).find('p').eq(1).text(data[2].temperature + '°')
    },
};