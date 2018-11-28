/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  电能质量
 * @param:
 */
define(function(){
    return electricityQPageRender;
});
var electricityQPageRender = {
    Render: function () {
        var _this = this
        inter:"",
        $('.elecQualityPage.eeitem').css('display','flex')
        this.inter && clearTimeout(_this.inter)

        this.initDom()
        /*var wid = $('.kpiContent').width()
        var hei = $('.kpiContent').height()
        $('#gaugeKpi').css({
            'width':wid+'px',
            height:hei+'px'
        })*/

        /*$('#kpiContent').hover(function () {
            $('#ypbTip').stop(true).animate({width:'186px',height:'120px'},400)
        },function () {
            $('#ypbTip').stop(true).animate({width:'0',height:'0'},400)
        })*/
        // this.getAjax()
        this.getData()
    },
    initDom:function () {
        var hei = 250
        if(document.body.clientWidth<1500){
            hei = 200
        }
        if(document.body.clientWidth<1367){
            hei = 180
        }
        $('#kpiContent').html('<div id="gaugeKpi" class="gaugeKpi" style="display: block;width: 100%;height: '+hei+'px"></div>')
    },
    getData:function () {
        var _this = this;
        $.http.POST('/energyMonitor/getElecQualityKPI.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            _this.inter = setTimeout(electricityQPageRender.getData,5000)
            electricityQPageRender.setVal(res.body)
        })
        /*_this.setVal({
            estimateReward: 1235.22,
            forecastFines: 0,
            max: 0.92,
            min: 0.73,
            powerFactor: 0.92,
        })*/
    },
    setVal:function (data) {
        var _this = this
        //预估奖励
        var convertVal1 = App.ConvertUnit({num:data.estimateReward,unit:'rmb'})
        $('#estimateReward').text(convertVal1.num+convertVal1.unit)
        //预估罚款
        var convertVal2 = App.ConvertUnit({num:data.forecastFines,unit:'rmb'})
        $('#forecastFines').text(convertVal2.num+convertVal1.unit)
        $('#qa-max').text(data.max)
        $('#qa-min').text(data.min)
        _this.drawKpi(data.powerFactor)

    },
    drawKpi:function (datas) {

        if(!datas){
            $('#kpiContent').html('<div class="noDataDraw" style="">暂无数据...</div>')
            return
        }
        var fontS = (+$('body').css('fontSize').replace('px',''))*1.285714
        var center1 = ['50%', '64%']
        var center2 = ['50%', '60%']
        var labelOffset = ['-20%', '25%']
        var valOffset = ['40%', '25%']
        var colors = ["#f8d282","#ea7313","#ff5400","#02B22B"]
        var valColor = colors[3]
        if(datas<0.9){
            valColor = colors[2]
        }else if(datas<0.6){
            valColor = colors[1]
        }else if(datas<0.3){
            valColor = colors[0]
        }

        var option = {
            tooltip: {
                backgroundColor:'transparent',
                borderColor :'transparent',
                padding:0,
                formatter: function(){
                    return '<div class="ypbTip" id="ypbTip">\n' +
                        '                <div class="ypbTipContent">1.大于0.9电网公司进行<br>电量质量奖励；<br>2.小于0.9电网公司进行<br>&nbsp;电量质量一定的罚款</div>\n' +
                        '            </div>'
                }
            },
            noUseToolTipStyle:true,
            series: [
                {
                    tooltip:{
                        show:false
                    },
                    "name": 'wrap',
                    "type": 'pie',
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    center:center1,
                    "radius": '70%',
                    "z": -11,
                    "startAngle": -180,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": false
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 87,
                        itemStyle: {
                            normal: {
                                color: "#063194"
                            },
                            emphasis: {
                                color: "#063194"
                            }
                        }
                    },
                        {
                            "value": 87,
                            "name": '1',
                            itemStyle: {
                                normal: {
                                    color: "transparent"
                                }
                            }
                        }]
                },
                {
                    tooltip:{
                        show:false
                    },
                    "name": 'wrap',
                    "type": 'pie',
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    center:center2,
                    "radius": ['8%', '9%'],
                    "z": -10,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": false
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 87,
                        itemStyle: {
                            normal: {
                                color: "#f3cfa7"
                            },
                            emphasis: {
                                color: "#f3cfa7"
                            }
                        }
                    }]
                },
                {
                    tooltip:{
                        show:false
                    },
                    "name": 'wrap',
                    "type": 'pie',
                    "hoverAnimation": false,
                    "legendHoverLink": false,
                    center:center2,
                    "radius": ['0%', '6%'],
                    "z": -9,
                    "label": {
                        "normal": {
                            "show": false,
                            "position": 'center'
                        },
                        "emphasis": {
                            "show": false
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": false
                        }
                    },
                    "data": [{
                        "value": 87,
                        itemStyle: {
                            normal: {
                                color: "#f3cfa7"
                            },
                            emphasis: {
                                color: "#f3cfa7"
                            }
                        }
                    }]
                },
                {
                    tooltip:{
                        show:false
                    },
                    name: '刻度',
                    type: 'gauge',
                    radius: '40%',
                    z:1,
                    min:0,
                    max:1,
                    center:center2,
                    splitNumber: 3, //刻度数量
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 0,
                            color: [[0.299, colors[0]], [0.699, colors[1]], [0.899, colors[2]], [1, colors[3]]]
                        }
                    },//仪表盘轴线
                    axisLabel: {
                        show: false
                    },//刻度标签。
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: 'auto',
                            width: 1.5
                        },
                        length: -10
                    },//刻度样式
                    splitLine: {
                        show: true,
                        length: 0,
                        lineStyle: {
                            color: 'auto',
                            width: 2
                        }
                    },//分隔线样式
                    detail: {
                        show:false
                    },
                    pointer: {
                        show:false
                    }
                },
                {
                    tooltip:{
                        show:true
                    },
                    name: '功率因素:',
                    type: 'gauge',
                    radius: '90%',
                    min:0,
                    max:1,
                    center:center2,
                    data: [{value: datas, name: '功率因素:'}],
                    splitNumber: 10, //刻度数量
                    startAngle: 185,
                    endAngle: -5,
                    z:20,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 0,
                            color: [[0.2, '#FFB820'], [0.8999, '#FF5400'], [1, '#02B22B']]
                        }
                    },//仪表盘轴线
                    axisLabel: {
                        show: true,
                        color:'#fff',
                        distance:20
                    },//刻度标签。
                    axisTick: {
                        splitNumber: 10,
                        show: true,
                        lineStyle: {
                            color: 'auto',
                            width: 1.5
                        },
                        length: -10
                    },//刻度样式
                    splitLine: {
                        show: true,
                        length: -15,
                        lineStyle: {
                            color: 'auto',
                            width: 2.5
                        }
                    },//分隔线样式

                    "itemStyle": {
                        "normal": {
                            "color": "red" //指针颜色
                        }
                    },
                    detail: {
                        formatter:'{value}',
                        fontSize: fontS,
                        color: valColor,
                        offsetCenter: valOffset
                    },
                    title: {
                        offsetCenter: labelOffset, // x, y，单位px
                        fontSize: fontS,
                        color: "#ffffff",
                        show: true
                    },
                    pointer: {
                        show:true,
                        length: '100%',
                        width: 2, //指针粗细
                    }
                }
            ]
        };
        Echarts.render('gaugeKpi', option);

    },
}