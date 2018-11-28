/** 2018/3/6
 * @author: SP0014
 * @description:  单电站页面 发电量 收益等
 */
define(function () {
    return spProfit;
});
var spProfit = {
    profitInter: '',//实时收益发电等 定时器
    cnProfitInter: '',//实时收益发电等 定时器
    gcProfitInter: '',//实时收益发电等 定时器
    plantId: '',//电站id
    domId: 'spMonitorCarousel',//模块中的任意Id
    singlePlantType:1,
    Render: function (opts) {
        var _this = this
        _this.plantId = opts.plantId || ''
        _this.singlePlantType = opts.singlePlantType
        if(_this.singlePlantType==1){
            _this.gfWaterWave()
            _this.getData()
        }else if(_this.singlePlantType==2){
            _this.cnWaterWave()
            _this.getCnData()
        }else{
            _this.gcWaterWave()
            _this.getGcData()
        }
    },
    getData: function () {
        var _this = this
        //电站实时收益
        profitInter();
        function profitInter() {
            if (main.clearInterCharge(_this.profitInter, _this.domId)) return;
            $.http.POST('/monitor/getCurrentIncomeOfPlant.do', {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId
            }, function (result) {
                _this.singleGP(result.body);
            })
        }

        _this.profitInter = setInterval(profitInter, 30000);
    },
    //储能电站数据
    getCnData: function () {
        var _this = this
        //电站实时收益
        cnProfitInter();
        function cnProfitInter() {
            if (main.clearInterCharge(_this.cnProfitInter, _this.domId)) return;
            $.http.POST('/monitor/getSingleEneProfit.do', {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId
            }, function (result) {
                _this.drawCnData(result.body);
            })
        }

        _this.cnProfitInter = setInterval(cnProfitInter, 30000);
    },
    //光储电站数据
    getGcData: function () {
        var _this = this
        //电站实时收益
        gcProfitInter();
        function gcProfitInter() {
            if (main.clearInterCharge(_this.gcProfitInter, _this.domId)) return;
            $.http.POST('/monitor/getSingleOptProfit.do', {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId
            }, function (result) {
                _this.drawGcData(result.body);
            })
        }

        _this.cnProfitInter = setInterval(gcProfitInter, 30000);
    },
    //发电量及收益实时数据  光伏
    singleGP: function (datas) {
        const genDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.genDay,
            len:6,
            split:4,
            isInt:false
        })
        const profitDay = App.ConvertUnit({
            unit:'rmb',
            num:datas.profitDay,
            len:6,
            split:4,
            isInt:false
        })
        const genTotal = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.genTotal,
            len:6,
            split:4,
            isInt:false
        })
        const profitTotal = App.ConvertUnit({
            unit:'rmb',
            num:datas.profitTotal,
            len:6,
            split:4,
            isInt:false
        })
        $('#sp-genDay').text(genDay.num + genDay.unit)
        $('#sp-profitDay').text(profitDay.num + profitDay.unit)
        $('#sp-genTotal').text(genTotal.num + genTotal.unit)
        $('#sp-profitTotal').text(profitTotal.num + profitTotal.unit)

    },
    //发电量及收益实时数据  光储
    drawGcData: function (datas) {
        const genDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.genDay,
            len:6,
            split:4,
            isInt:false
        })
        const profitDay = App.ConvertUnit({
            unit:'rmb',
            num:datas.profitDay,
            len:6,
            split:4,
            isInt:false
        })
        const chargeDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.chargeDay,
            len:5,
            split:4,
            isInt:false
        })
        const dischargeDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.dischargeDay,
            len:5,
            split:4,
            isInt:false
        })
        const profitTotal = App.ConvertUnit({
            unit:'rmb',
            num:datas.profitTotal,
            len:6,
            split:4,
            isInt:false
        })
        $('#sp-gcGenDay').text(genDay.num)
        $('#sp-gcGenDay-unit').html('('+genDay.unit+')')
        $('#sp-gcProfitDay').text(profitDay.num)
        $('#sp-gcProfitDay-unit').html('('+profitDay.unit+')')
        $('#sp-charge-discharge').html(chargeDay.num + '/' + dischargeDay.num)
        $('#sp-charge-discharge-unit').html('('+dischargeDay.unit+')')
        $('#sp-gcProfitTotal').text(profitTotal.num)
        $('#sp-gcProfitTotal-unit').html('('+profitDay.unit+')')

    },
    //发电量及收益实时数据  储能
    drawCnData: function (datas) {
        const dischargeDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.dischargeDay,
            len:6,
            split:4,
            isInt:false
        })
        const profitDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.profitDay,
            len:6,
            split:4,
            isInt:false
        })
        const chargeDay = App.ConvertUnit({
            unit:'kilowatt',
            num:datas.chargeDay,
            len:6,
            split:4,
            isInt:false
        })
        const profitTotal = App.ConvertUnit({
            unit:'rmb',
            num:datas.profitTotal,
            len:6,
            split:4,
            isInt:false
        })
        $('#sp-discharge').text(dischargeDay.num)
        $('#sp-discharge-unit').html('('+dischargeDay.unit+')')
        $('#sp-cnProfit').text(profitDay.num)
        $('#sp-cnProfit-unit').html("("+profitDay.unit+')')
        $('#sp-charge').text(chargeDay.num)
        $('#sp-charge-unit').html("("+chargeDay.unit+')')
        $('#sp-cnProfitTotal').text(profitTotal.num)
        $('#sp-cnProfitTotal-unit').html("("+profitTotal.unit+')')

    },
    //水波图测试
    test: function (id, color) {
        var option = {
            series: [{
                type: 'liquidFill',
                data: [{
                    value: '0.5'
                    // itemStyle: {
                    //     normal: {
                    //         color: 'red'
                    //     }
                    // }
                }],
                color: [color, '#fff'],
                radius: '50%',
                backgroundStyle: {
                    color: '#ededed',
                    // borderColor: 'red',
                    borderWidth: 1,
                    shadowColor: '#fff'
                },
                outline: {
                    show: false
                },
                label: {
                    show: false
                }
            }]
        };
        Echarts.render(id, option);

    },
    //光伏水波图
    gfWaterWave:function(){
        var _this = this;
        $('.gcProfit,.cnProfit').hide();

        $('.gfProfit').show();
        for(var i=1;i<5;i++){
            if($('#test'+i).length) $('#test'+i).remove()
            $('.gfProfit .test'+i).html('<div data-id="test'+i+'" id="test'+i+'"></div>');
        }

        _this.test('test1', '#4AF4A3');
        _this.test('test2', '#FFBC87');
        _this.test('test3', '#88DBFA');
        _this.test('test4', '#FDA6AC')
    },
    //储能水波图
    cnWaterWave:function(){
        var _this = this;
        $('.gfProfit,.gcProfit').hide();
        $('.cnProfit').show();
        _this.test('test-cn1', '#4AF4A3');
        _this.test('test-cn2', '#FFBC87');
        _this.test('test-cn3', '#88DBFA');
        _this.test('test-cn4', '#FDA6AC')
    },
    //光储水波图
    gcWaterWave:function(){
        var _this = this;
        $('.gfProfit,.cnProfit').hide();
        $('.gcProfit').show();
        _this.test('test-gc1', '#4AF4A3');
        _this.test('test-gc2', '#FFBC87');
        _this.test('test-gc3', '#88DBFA');
        _this.test('test-gc4', '#FDA6AC')
    },
};