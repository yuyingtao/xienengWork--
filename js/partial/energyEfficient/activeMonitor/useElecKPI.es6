/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  用电量趋势KPI
 * @param:
 */
define(function(){
    return useElecKPIPageRender;
});
var useElecKPIPageRender = {
    inter:'',
    Render: function () {
        var _this = this
        $('.useElecKPIPage.eeitem').css('display','flex')
        this.inter && clearTimeout(_this.inter)
        var _this = this
        _this.initDom()
        this.initTime()
        // this.getList()
        this.timeSwitch()
        //日历搜索
        $('#useElecSwitchBtn').on('click',function(){
            _this.getList()
        })
    },
    //初始化时间控件
    initTime:function () {
        let that = this
        let onDay = 24 * 3600 * 1000
        // 格式化，最大和最小间隔
        let patterns = [
            { name: 'yyyy-MM-dd', min: 30 * onDay, reduce: 15 * onDay ,addLast:''}, //日：默认显示15天(reduce)，最多显示30天(min)
            { name: 'yyyy-MM', min: 12 * 30 * onDay, reduce: 6 * 30 * onDay, addLast: '-01'}, //月：默认显示6个月，最多显示12个月
            { name: 'yyyy', min: 10 * 12 * 30 * onDay, reduce: 5 * 12 * 30 * onDay, addLast: '-01-01'} //年：默认显示5年
        ]
        let curDate
        $('#statisticalSwitch1').on('click',function () {
            let idx = $('#controlBox .on').attr('attr-val');
            curDate = new Date($('#statisticalSwitch2').val() + patterns[idx].addLast)  //当前选中的日期
            let addmin, addmax  //日历框的最小值、最大值
            addmin = new Date(+curDate - patterns[idx].min).pattern(patterns[idx].name)
            addmax = new Date(+curDate - patterns[idx].reduce).pattern(patterns[idx].name)
            WdatePicker({el:"statisticalSwitch1",readOnly:true,dateFmt:patterns[idx].name,minDate:addmin,maxDate:addmax,isShowClear:false});
        });
        $('#statisticalSwitch2').unbind('click').on('click',function () {
            let idx = $('#controlBox .on').attr('attr-val');
            curDate = new Date($('#statisticalSwitch1').val() + patterns[idx].addLast)  //当前选中的日期
            let addmin, addmax  //日历框的最小值、最大值
            let newDate = new Date() //今天的日期
            let nNewDate = +newDate
            if (nNewDate < ((+curDate) + patterns[idx].reduce)) { //超过今天，则设置最大为今天
                addmin = newDate.pattern(patterns[idx].name)
            } else {
                addmin = new Date(+curDate + patterns[idx].reduce).pattern(patterns[idx].name)
            }
            if (nNewDate < ((+curDate) + patterns[idx].min)) { //超过今天，则设置最大为今天
                addmax = newDate.pattern(patterns[idx].name)
            } else {
                addmax = new Date(+curDate + patterns[idx].min).pattern(patterns[idx].name)
            }
            WdatePicker({el:"statisticalSwitch2",readOnly:true,dateFmt:patterns[idx].name,minDate:addmin,maxDate:addmax,isShowClear:false});
        })
    },
    //日月年切换
    timeSwitch:function(){
        var _this = this
        let onDay = 24 * 3600 * 1000
        // 格式化，最大和最小间隔
        let patterns = [
            { name: 'yyyy-MM-dd', min: 30 * onDay, reduce: 15 * onDay ,addLast:''}, //日：默认显示15天(reduce)，最多显示30天(min)
            { name: 'yyyy-MM', min: 12 * 30 * onDay, reduce: 6 * 30 * onDay, addLast: '-01'}, //月：默认显示6个月，最多显示12个月
            { name: 'yyyy', min: 10 * 12 * 30 * onDay, reduce: 5 * 12 * 30 * onDay, addLast: '-01-01'} //年：默认显示5年
        ]
        $('#controlBox a').unbind('click').on('click',function(){
            clearTimeout( _this.inter)
            _this.initDom()
            var $this = $(this);
            $('#controlBox a').removeClass('on')
            $this.addClass('on')
            let idx = $('#controlBox .on').attr('attr-val');
            let initNewDate = new Date() //今天的日期
            let initAddmin = initNewDate.pattern(patterns[idx].name)
            let initCurTime = new Date(+initNewDate - patterns[idx].reduce).pattern(patterns[idx].name)
            $('#statisticalSwitch1').val(initCurTime)
            $('#statisticalSwitch2').val(initAddmin)
            _this.getList()
        })
        $('#controlBox a').eq(0).click()


    },
    initDom:function () {
        $('#useElecKpi').html('<div id="useElecKpiEchart" style="width: 100%;height: 100%;"></div>')
    },
    //获取数据
    getList:function () {
        var _this=this;
        $.http.POST('/energyMonitor/getElecUseKpi.do',{
            tokenId:Cookies.getCook('tokenId'),
            dimension:$('#controlBox .on').attr("attr-val"),
            startTime:$('#statisticalSwitch1').val(),
            endTime:$('#statisticalSwitch2').val()
        },function (res) {
            _this.inter = setTimeout(useElecKPIPageRender.getList,5000)
            if(res.body){
                useElecKPIPageRender.drawKPI(res.body);
                $('#statisticalSwitch1').val(res.body.start);
                $('#statisticalSwitch2').val(res.body.end)
                // WdatePicker({el:"statisticalSwitch2",readOnly:true,dateFmt:'yyyy-MM-dd',minDate:res.body.start,maxDate:res.body.end,isShowClear:false});
            }else{
                $('#useElecKpi').text($.getI18n('noData')).css({
                    'textAlign':'center',
                    'marginTop':'20px'
                })
            }

        })

    },
    drawKPI:function (datas) {
        if(!datas.yData.length){
            $('#useElecKpi').html('<div style="text-align: center;    margin-top: 109px;">'+$.getI18n('noData')+'</div>');
            return
        }
        var names=["用电量","去年同期用电量","用电电费"];
        var colors=["rgba(132,58,255,.01)","rgba(161,101,37,.01)","rgba(34,135,57,.01)"];
        var colors2=["rgba(132,58,255,.5)","rgba(161,101,37,.5)","rgba(34,135,57,.5)"];
        var colors1=["rgba(132,58,255,1)","rgba(161,101,37,1)","rgba(34,135,57,1)"];
        var xData = datas.xData;
        var legendData=[]
        $.each(datas.yData,function(index,item){
            legendData.push({
                name:names[item.name]+'('+item.unit+')',
                icon: +item.name === 0 ? 'rect':'line',
            })
        })
        var option = {
            //color:['rgba(139,207,255,1)','rgba(255,206,37,1)'],
            grid: {
                top:'25%',
                bottom:'13%',
                left: '7%',
                right: '7%'
            },
            legend: {
                itemGap: 40,
                icon: 'line',
                itemWidth: 12,
                itemHeight: 8,
                textStyle:{
                    color:'#6394FF',
                    fontsize:12
                },
                top:'5.5%',
                right:'5%',
                selectedMode:true,
                data:legendData
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                splitLine:{
                    show:false
                },
                axisLabel:{
                    textStyle:{
                        color:'#5B74F3', //x轴文字颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#072150'  //左边y轴线颜色
                    }
                },
                axisTick:{
                    alignWithLabel:true
                },
                nameTextStyle:{
                    // color:'#a5e2f9'
                },
                data: xData
            },
            // dataZoom:{
            //     show:true
            // },
            yAxis: [
                {
                type: 'value',
                splitNumber:5,
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#ecedf6'], //平行于x轴的虚线颜色
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#5B74F3' //左边y轴字体颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#072150'  //左边y轴线颜色
                    }
                },
                nameTextStyle:{
                    color:'#5B74F3' //左边title 颜色
                }
            },{
                name:names[1],
                type: 'value',
                splitNumber:5,
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#072150'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#5B74F3'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#072150'
                    }
                },
                nameTextStyle:{
                    color:'#5B74F3'
                }
            }],
            series: []
        };
        $.each(datas.yData,function(index,item){
            if (!item.value.length)return
            if(+item.name===2 || +item.name===1){
                option.yAxis[1].name = item.unit
                option.series.push({
                    name:names[item.name]+'('+item.unit+')',
                    type:'line',
                    z: index,
                    data:item.value,
                    yAxisIndex: +item.name===1?0:1,
                    showSymbol: true,
                    smooth:true,
                    symbolSize: 8,
                    show: true,
                    symbol:'circle',
                    // symbol:'none',
                    itemStyle:{
                        normal:{
                            width: 3,
                            color:colors1[item.name], //折线颜色
                            shadowColor: colors1[item.name]
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: colors2[item.name],
                                },{
                                    offset: .3,
                                    color: colors[item.name],
                                },
                                    {
                                        offset: 1,
                                        color: colors[item.name],
                                    }],
                                globalCoord: false
                            },
                        }
                    } //绘制阴影交集
                })
            }else {

                option.yAxis[0].name = item.unit
                option.series.push({
                    name: names[item.name]+'('+item.unit+')',
                    type: 'bar',
                    z: index,
                    barWidth:(!!+$('#controlBox .on').attr("attr-val")) ? '15%':'40%',
                    color:colors1[item.name],
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 1,
                                    color: colors1[item.name],
                                }, {
                                    offset: 0,
                                    color: colors1[item.name],
                                }],
                                globalCoord: false
                            },
                        }
                    },
                    data: item.value
                })
            }

        })
        Echarts.render('useElecKpiEchart', option);
    }
}