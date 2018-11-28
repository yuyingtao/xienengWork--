/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  用电负荷趋势
 * @param:
 */
define(function(){
    return useElecLoadKPIRender;
});
var useElecLoadKPIRender = {
    inter:'',
    Render: function () {
        var _this = this
        $('.useElecLoadKPI.eeitem').css('display','flex')
        this.inter && clearTimeout(_this.inter)
        //日历搜索
        $('#LoadSwitchBtn').on('click',function(){
            clearTimeout( _this.inter)
            _this.getList()
        })
        _this.initDom()
        this.initTime()
    },
    //初始化时间控件
    initTime:function () {
        let _this = this
        let onDay = 24 * 3600 * 1000
        // 格式化，最大和最小间隔
        let patterns = { name: 'yyyy-MM-dd', min: 20 * onDay, reduce: 0} //日：默认显示15天(reduce)，最多显示30天(min)
        let initNewDate = new Date() //今天的日期
        let initAddmin = initNewDate.pattern(patterns.name)
        let initCurTime = new Date(+initNewDate - patterns.reduce).pattern(patterns.name)
        $('#LoadSwitch1').val(initCurTime)
        $('#LoadSwitch2').val(initAddmin)
        _this.getList()


        let curDate
        $('#LoadSwitch1').on('click',function () {
            curDate = new Date($('#LoadSwitch2').val())  //当前选中的日期
            let addmin, addmax  //日历框的最小值、最大值
            addmin = new Date(+curDate - patterns.min).pattern(patterns.name)
            addmax = new Date(+curDate - patterns.reduce).pattern(patterns.name)
            WdatePicker({el:"LoadSwitch1",readOnly:true,dateFmt:patterns.name,minDate:addmin,maxDate:addmax,isShowClear:false});
        });
        $('#LoadSwitch2').unbind('click').on('click',function () {
            curDate = new Date($('#LoadSwitch1').val())  //当前选中的日期
            let addmin, addmax  //日历框的最小值、最大值
            let newDate = new Date() //今天的日期
            let nNewDate = +newDate
            if (nNewDate < ((+curDate) + patterns.reduce)) { //超过今天，则设置最大为今天
                addmin = newDate.pattern(patterns.name)
            } else {
                addmin = new Date(+curDate + patterns.reduce).pattern(patterns.name)
            }
            if (nNewDate < ((+curDate) + patterns.min)) { //超过今天，则设置最大为今天
                addmax = newDate.pattern(patterns.name)
            } else {
                addmax = new Date(+curDate + patterns.min).pattern(patterns.name)
            }
            WdatePicker({el:"LoadSwitch2",readOnly:true,dateFmt:patterns.name,minDate:addmin,maxDate:addmax,isShowClear:false});
        })
        
    },
    initDom:function () {
        $('#useLoadElecKpi').html('<div id="useLoadKpiEchart" style="width: 100%;height: 100%;"></div>')
    },
    getList:function () {
        var _this=this;
        $.http.POST('/energyMonitor/getElecLoadKpi.do',{
            tokenId:Cookies.getCook('tokenId'),
            dimension:$('#controlLoadBox .on').attr("attr-val"),
            startTime:$('#LoadSwitch1').val(),
            endTime:$('#LoadSwitch2').val()
        },function (res) {
            if(res.body){
                _this.inter = setTimeout(useElecLoadKPIRender.getList,5000)
                useElecLoadKPIRender.drawKPI(res.body);
                $('#LoadSwitch1').val(res.body.start);
                $('#LoadSwitch2').val(res.body.end)
                // WdatePicker({el:"LoadSwitch2",readOnly:true,dateFmt:'yyyy-MM-dd',minDate:res.body.start,maxDate:res.body.end,isShowClear:false});
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
        var names=["有功功率","申报容量","负荷率"];
        var colors=["rgba(79,121,210,.01)","rgba(128,31,189,.01)","rgba(34,157,79,.01)"];
        var colors2=["rgba(79,121,210,.3)","rgba(128,31,189,.3)","rgba(34,157,79,.3)"];
        var colors1=["rgba(79,121,210,1)","rgba(128,31,189,1)","rgba(34,157,79,1)"];
        var xData = datas.xData;

        var legendData = []
        $.each(datas.yData,function(index,item){
            legendData.push(names[item.name]+'('+item.unit+')')
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
                textStyle:{
                    color:'#6394FF',
                    fontsize:12
                },
                top:'5.5%',
                right:'5%',
                data:legendData,
                selectedMode:true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
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
                    name:datas.yData[0].unit,
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
                    name:datas.yData[2].unit,
                    max:datas.yData[2].max>150?datas.yData[2].max:150,
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
            option.series.push({
                name:names[item.name]+'('+item.unit+')',
                type:'line',
                data:item.value,
                yAxisIndex: +item.name === 2 ?1:0,
                showSymbol: false ,
                smooth:true,
                symbolSize: 5,
                show: true,
                symbol:'circle',
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
        })
        Echarts.render('useLoadKpiEchart', option);
    }
}