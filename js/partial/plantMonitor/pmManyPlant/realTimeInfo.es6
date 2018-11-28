
define(function () {
    return realTimeInfo
});
var realTimeInfo = {
    realInfoInterval:"",
    ToadyInfoInter:"",
    domId:'plantBoxGc',//模块Id
    flag:false,
    Render: function () {
        var _this = this;
        //
        if(Cookies.getCook('plantType')==1){
            $('.gf-plant').show();
            $('.gc-cn-plant').hide();
            _this.getPlantsRealTimeInfo(_this)
        }else{
            $('.gf-plant').hide();
            $('.gc-cn-plant').show();
            _this.getTodayData(_this);
            $('.todayInfoCenter').animate({
                top:'0'
            },1000).css('z-index',98)
        }
    },
    //获取电站实时信息
    getPlantsRealTimeInfo:function(_this){
        //基础信息
        getPlantsRealTimeInfo();
        function getPlantsRealTimeInfo() {
            _this.flag = false;
            if(main.clearInterCharge(_this.realInfoInterval,_this.domId))return;
            $.http.POST('/monitor/getTodayInfo.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
                if(res.code =="100"){
                    _this.flag = true
                }
                if(JSON.stringify(res.body) == "{}"){
                    $(".totalPower").html("--");
                    $(".totalPrice").html("--");
                    _this.drawWeather(res.body.time);
                    return false
                }else {
                    const {body} =res;
                    const genDay = App.convertUnit("kilowatt",body.genDay,6);
                    const profitDay = App.convertUnit("rmb",body.profitDay,6);
                    $(".genDay").html(genDay.num);
                    $(".genDayUnit").html(genDay.unit);
                    $(".profitDay").html(profitDay.num);
                    $(".profitDayUnit").html(profitDay.unit);
                    $(".break").html(body.break);
                    $(".fault").html(body.fault);
                    $(".gen").html(body.gen);
                    $(".standby").html(body.standby);
                    $(".abnormal").html(body.abnormal);
                    _this.drawWeather(body.time)
                }
            },true,true)
        }
        _this.realInfoInterval = setInterval(function () {
            if(_this.flag){
                getPlantsRealTimeInfo()
            }else {
                return false
            }
        },5000);
    },
    //获取当前时间
    drawWeather:function(data){
        var date = new Date(data);
        var week;
        switch (date.getDay()){
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
        $('.nowTime').text(date.format('yyyy年MM月dd日') +' '+ week);
        $('.newNowTime').text(date.format('yyyy年MM月dd日') +' '+ week)
    },
    //光储储能今日信息
    getTodayData:function(_this){
        //基础信息
        getTodayInfo();
        function getTodayInfo() {
            _this.flag = false;
            if(main.clearInterCharge(_this.ToadyInfoInter,_this.domId))return;
            $.http.POST('/monitor/getTodayChargeEle.do',{tokenId:Cookies.getCook('tokenId'),plantType:Cookies.getCook('plantType')},function (res) {
                if(res.code =="100"){
                    _this.flag = true
                }
                if(JSON.stringify(res.body) == "{}"){
                    $(".number").html("--");
                    $(".number1").html("--");
                    _this.drawWeather(res.body.time);
                    return false
                }else {
                    const {body} =res;
                    const genDay = App.convertUnit("kilowatt",body.genDay,6);
                    const charge = App.convertUnit("kilowatt",body.charge,6);
                    const disCharge = App.convertUnit("kilowatt",body.disCharge,6);
                    $(".number").html(genDay.num);
                    $(".number").siblings('b').html(genDay.unit);
                    $(".number1").html(charge.num+'/'+disCharge.num);
                    $(".number1").siblings('b').html(disCharge.unit);
                    $(".break").html(body.break);
                    $(".fault").html(body.fault);
                    $(".gen").html(body.gen);
                    $(".standby").html(body.standby);
                    $('.abnormal').html(body.abnormal);
                    _this.drawWeather(body.time)
                }
            },true,true)
        }
        _this.ToadyInfoInter = setInterval(function () {
            if(_this.flag){
                getTodayInfo()
            }else {
                return false
            }
        },5000);
    },
};