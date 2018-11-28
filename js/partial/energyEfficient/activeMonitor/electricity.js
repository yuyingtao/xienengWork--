/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  月峰谷电量统计
 * @param:
 */
define(function(){
    return electricityPageRender;
});
var electricityPageRender = {
    inter:'',
    Render: function () {
        var _this = this
        $('.electricityPage.eeitem').css('display','flex')
        this.inter && clearTimeout(_this.inter)

        var nowDate = new Date()
        this.initDom()
        $('#statisticalSwitch').val(nowDate.format('yyyy-MM'))
        this.getAjax()
        this.timeSwicth()
    },
    initDom:function () {
        var hei = 250
        var marT = 0

        if(document.body.clientWidth>1499){
            hei = 250
            marT = 0
        }else if(document.body.clientWidth>1365){
            hei = 200
            marT = 20
        }else {
            hei = 180
            marT = 45
        }
        $('#statisticalContent').html('<div id="statisticalKpi" class="statistical" style="display: block;width: 100%;height:'+hei+'px;margin-top: '+marT+'px"></div>')
    },
    timeSwicth:function () {
        var _this = this
        $('#statisticalSwitchBtn').unbind('click').on('click',function(){
            clearTimeout( _this.inter)
            _this.initDom()
            _this.getAjax()
        })
    },
    getAjax:function () {
        var _this = this
        var names = ['平时用电','谷时用电','尖时用电','峰时用电']
        var data = []
        $.http.POST('/energyMonitor/getElecKPI.do',{tokenId:Cookies.getCook('tokenId'),time:$('#statisticalSwitch').val()},function (result) {
            _this.inter = setTimeout(electricityPageRender.getAjax,5000)
            $.each(result.body,function (index,item) {
                (+item.value) && data.push({name:names[item.name],value:item.value,unit:item.unit})
                if(index === 3){
                    electricityPageRender.drawKpi(data)
                }
            })
        })
    },
    drawKpi:function(data){
        if(!data.length){
            $('#statisticalContent').html('<div class="noDataDraw" style="">暂无数据...</div>')
            return
        }
        var fontS = (+$('body').css('fontSize').replace('px',''))
        var colorList =['#228c38', '#1a57b2', '#b04b07', '#af8108'];
        var colorListSub =['rgba(35,143,56,.5)', 'rgba(26,87,178,.5)', 'rgba(176,75,7,.5)', 'rgba(175,129,8,.5)'];
        var _radius = 105
        if(document.body.clientWidth<1500){
            _radius = 90
        }
        var labelStyle = {
            width:120,
            color: '#ffffff',
            lineHeight: 30,
            align:'center',
            fontSize: fontS,
            height: 30,
            borderRadius: 15
        }
        var labelSubStyle = {
            color: '#ffffff',
            align:'center',
            fontSize: fontS,
            borderRadius: 15,
            padding:[2,10],
            lineHeight: 18,
            height: 18
        }

        var len1 = 10
        var len2 = 50
        if(document.body.clientWidth<1600){
            len1 = 10
            len2 = 20
        }
        var labels={}
        if(document.body.clientWidth<1200){
            labels = {
                normal: {
                    formatter: function(params){
                        return params.name+'\n'+params.value+params.data.unit+'('+params.percent+'%)  '
                    }
                }
            }
        }else {

            labels =  {
                normal: {
                    formatter: function(params){
                        // return '{b|'+params.name+'}\n'+params.value+'度({per|'+params.percent+'%})  '
                        var str = ''
                        switch(params.name){
                            case '平时用电':str = '{a|'+params.name+'}\n\n{pera|'+params.value+params.data.unit+' ('+params.percent+'%)}';break;
                            case '谷时用电':str = '{b|'+params.name+'}\n\n{perb|'+params.value+params.data.unit+' ('+params.percent+'%)}';break;
                            case '尖时用电':str = '{c|'+params.name+'}\n\n{perc|'+params.value+params.data.unit+' ('+params.percent+'%)}';break;
                            case '峰时用电':str = '{d|'+params.name+'}\n\n{perd|'+params.value+params.data.unit+' ('+params.percent+'%)}';break;
                        }
                        return str
                    },
                    rich: {
                        a: $.extend({
                            backgroundColor: {image: '/images/energyEfficient/activeMonitor/icon1.png'}
                        },labelStyle),
                            b: $.extend({
                            backgroundColor: {image: '/images/energyEfficient/activeMonitor/icon4.png'}
                        },labelStyle),
                            c: $.extend({
                            backgroundColor: {image: '/images/energyEfficient/activeMonitor/icon3.png'}
                        },labelStyle),
                            d: $.extend({
                            backgroundColor: {image: '/images/energyEfficient/activeMonitor/icon2.png'}
                        },labelStyle),
                            pera: $.extend({
                            backgroundColor: colorListSub[0]
                        },labelSubStyle),
                            perb: $.extend({
                            backgroundColor: colorListSub[1]
                        },labelSubStyle),
                            perc: $.extend({
                            backgroundColor: colorListSub[2]
                        },labelSubStyle),
                            perd: $.extend({
                            backgroundColor: colorListSub[3]
                        },labelSubStyle)
                    }
                }
            }
        }
        var option = {
            /*tooltip: {
                trigger: 'item',
                formatter: "{b}: {c}度 ({d}%)"
            },*/
            tooltip: {
                show: true,
                trigger: 'item',
                notShowXPoint:true,
                textStyle:{
                    color:'#333'
                },
                backgroundColor:'#fff',
                formatter: "{b}: {c} ({d}%)"
            },
            noUseToolTipStyle:true,
            series: [
                {
                    type:'pie',
                    radius: ['14%', '65%'],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    clockwise :false,
                    z:10,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                return colorList[params.dataIndex]
                            },
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    label: labels,
                    labelLine: {
                        normal: {
                            length: len1,
                            length2: len2,
                            lineStyle:{
                                width:1
                            }
                        }
                    },
                    data:data
                },
                // 边框的设置
                {
                    radius: ['14%', '20%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    clockwise :false,
                    z:11,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    animation: false,
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(6,22,50,.3)'
                        }
                    },
                    data:data
                },
                // 中心的圆圈
                {
                    radius: ["74%", "74.5%"],
                    center: ['50%', '50%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        itemStyle: {
                            normal: {
                                color: '#5A96FF',
                            }
                        }
                    }],
                    animation: false
                }
            ]
        };
        Echarts.render('statisticalKpi', option);
    }
}