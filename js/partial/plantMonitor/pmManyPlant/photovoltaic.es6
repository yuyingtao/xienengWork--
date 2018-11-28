
define(function () {
    return powerGenCurve
});
var powerGenCurve = {
    limitDate:"",
    md:"",
    Render: function () {
        var _this = this;
        _this.getDMY(_this,Cookies.getCook('plantType'));
        _this.initTime(_this);
        _this.getLimitDate(_this);
        //判断电站类型
        // if(Cookies.getCook('plantType')==0){
        //
        // }
        //搜索
        $(".search_box").on("click",function () {
            _this.getDMY(_this,Cookies.getCook('plantType'))
        });
        //切换时间查询日、月、年
        $(".chooseDimension").on("click",function () {
            $(".chooseDimension").each(function () {
                $(this).removeClass("activeTime")
            });
            $(this).addClass("activeTime");
            //_this.dimension = $(this).attr("data-type")
            $('#dateStart').val("");
            $('#dateEnd').val("");
            _this.getDMY(_this,Cookies.getCook('plantType'))
        });
        //设置时间限定开始时间点击清空结束时间，让开始时间来限定结束时间
        $("#dateStart").on("focus",function () {
            _this.md = new Date();
        })
    },
    //年月日切换 时间搜索数据
    getDMY:function(_this,type){
        if(type==1){
            $.http.POST('/monitor/curveSearch.do',{
                tokenId:Cookies.getCook('tokenId'),
                dimension:$('.activeTime').attr("data-type"),
                startTime:$('#dateStart').val(),
                endTime:$('#dateEnd').val()
            },function (res) {
                if(res.body){
                    _this.powerProfit(res.body);
                    $('#dateStart').val(res.body.start);
                    $('#dateEnd').val(res.body.end)
                    // WdatePicker({el:"dateEnd",readOnly:true,dateFmt:'yyyy-MM-dd',minDate:res.body.start,maxDate:res.body.end,isShowClear:false});
                }else{
                    $('#profitLine1').text($.getI18n('noData')).css({
                        'textAlign':'center',
                        'marginTop':'20px'
                    })
                }

            })
        }else{
            $.http.POST('/monitor/getElectricityProfit.do',{
                tokenId:Cookies.getCook('tokenId'),
                dimension:$('.activeTime').attr("data-type"),
                startTime:$('#dateStart').val(),
                endTime:$('#dateEnd').val()
            },function (res) {
                if(res.body){
                    _this.electricityProfit(res.body);
                    $('#dateStart').val(res.body.start);
                    $('#dateEnd').val(res.body.end)
                    // WdatePicker({el:"dateEnd",readOnly:true,dateFmt:'yyyy-MM-dd',minDate:res.body.start,maxDate:res.body.end,isShowClear:false});
                }else{
                    $('#profitLine1').text($.getI18n('noData')).css({
                        'textAlign':'center',
                        'marginTop':'20px'
                    })
                }

            })
        }
    },
    //获取限制时间
    getLimitDate:function (_this) {
        //限制时间
        $.http.POST('/monitor/curveSearchDate.do',{tokenId:Cookies.getCook('tokenId'),plantType:Cookies.getCook('plantType')},function (res) {
            _this.limitDate = res.body;
        })
    },
    //初始化时间控件
    initTime:function (_this) {
        $('#dateStart').on('click',function () {
            var txt = $('.activeTime').text();
            var limit = _this.limitDate;
            switch (txt){
                case '日':WdatePicker({el:"dateStart",readOnly:true,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateEnd\',{d:-30})}',maxDate:'#F{$dp.$D(\'dateEnd\',{d:-14})||$dp.$DV(\'%y-%M-%d\',{d:-14})}',isShowClear:false});break;
                case '月':WdatePicker({el:"dateStart",readOnly:true,dateFmt:'yyyy-MM',minDate:limit,maxDate:'#F{$dp.$D(\'dateEnd\',{M:-1});}'&&'%y-%M',isShowClear:false});break;
                case '年':WdatePicker({el:"dateStart",readOnly:true,dateFmt:'yyyy',minDate:limit,maxDate:'%y',isShowClear:false});break;
            }
        });
        $('#dateEnd').on('click',function () {
            //var str= limitDateDay1()
            var md=new Date(); //第二个输入框最大值的全局变量
            var $this = $(this);
            var flag = false;
            var Y=$('#dateStart').val().split('-')[0]; //用内置方法获取到选中的年月日
            var M=$('#dateStart').val().split('-')[1];
            var D=$('#dateStart').val().split('-')[2];
            M=parseInt(M,10)-1;
            D=parseInt(D,10)+30;　//字符串的数字转换成int再运算。并且如果超过30天，也能自动处理。
            var d = new Date()
            d.setFullYear(Y,M,D) //设置时间
            var nowDate=new Date();
            if(nowDate<=d){ //现在的时间比较，如果算出来的值大于现在时间，修改全局变量md为现在时间。
                flag = true
            }else{ //全局变量设置为算出来的值得
                flag = false
            }
            var txt = $('.activeTime').text();
            var limit = _this.limitDate;
            switch (txt){
                case '日':WdatePicker({el:"dateEnd",readOnly:true,dateFmt:'yyyy-MM-dd',minDate: '#F{$dp.$D(\'dateStart\',{d:14});}',maxDate:`${flag? "%y-%M-%d":"#F{$dp.$D(\'dateStart\',{d:30})}"}`,isShowClear:false});break;
                case '月':WdatePicker({el:"dateEnd",readOnly:true,dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'dateStart\',{M:1});}'||limit,maxDate:'%y-%M',isShowClear:false});break;
                case '年':WdatePicker({el:"dateEnd",dateFmt:'yyyy',minDate:limit,maxDate:'%y',isShowClear:false,readOnly:true});break;
            }
        })
    },
    //发电量收益曲线
    powerProfit:function(datas){
        if(JSON.stringify(datas) == "{}"){
            $("#profitLine1").empty().html($.getI18n('noData'));
            return false
        }
        var names=[$.getI18n('plantMonitor.electricity')+'（'+datas.unity1+'）',$.getI18n('plantMonitor.profit')+'（'+datas.unity2+'）'];
        var xData = datas.xData,
            yData1 = datas.yData[0].value,
            yData2 = datas.yData[1].value;
        var option = {
            //color:['rgba(139,207,255,1)','rgba(255,206,37,1)'],
            title: {

            },
            // tooltip:{
            //     trigger:'axis',
            //     axisPointer:{
            //         lineStyle: {
            //             color: '#006699'
            //         }
            //     },
            //     formatter:function(item){
            //         //hover 提示信息相关东西
            //         var str = '<div style="color: #a5e2f9">'+item[0].axisValue+'</div>';
            //         for(var i = 0 ,len= item.length; i<len ;i++){
            //             str +=  '<div style="color: #a5e2f9">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span></div>'
            //         }
            //         return str;
            //     }
            //
            // },
            grid: {
                top:'25%',
                bottom:'13%',
                left: '7%',
                right: '7%'
            },
            legend: {
                show: true,
                top: '4%',
                right: '30%',
                // textStyle:{
                //     color:'rgba(0,172,234,1)'
                // },
                selectedMode:true,
                data:names
            },
            xAxis: {
                type: 'category',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#ecedf6'],
                        type: 'solid'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#8A8A8A', //x轴文字颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#b1b2b2'  //x轴线颜色
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
            yAxis: [{
                name:names[0],
                type: 'value',
                splitNumber:5,
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#ecedf6'], //平行于x轴的虚线颜色
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#333' //左边y轴字体颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#b1b2b2'  //左边y轴线颜色
                    }
                },
                nameTextStyle:{
                    color:'#333' //左边title 颜色
                }
            },{
                name:names[1],
                type: 'value',
                splitNumber:5,
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#b1b2b2'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#333'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#b1b2b2'
                    }
                },
                nameTextStyle:{
                    color:'#333'
                }
            }],
            series: [{
                name: names[0],
                type: 'bar',
                barWidth: '10%',
                color:'rgba(139,207,255,1)',
                stack:1,
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
                                color: '#0ABDDD',
                                color: '#0ABDDD',
                            }, {
                                offset: 0,
                                color: '#0ABDDD',
                            }],
                            globalCoord: false
                        },
                    }
                },
                data: yData1
            },
            {
                name:names[1],
                type:'line',
                data:yData2,
                yAxisIndex: 1,
                showSymbol: false,
                stack:2,
                smooth:true,
                symbolSize: 1,
                show: true,
                symbol:'none',
                itemStyle:{
                    normal:{
                        width: 3,
                        color:'#FC5538', //折线颜色
                        shadowColor: '#FC5538',
                        shadowBlur: 10,
                        shadowOffsetY: 30
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
                                color: 'rgba(252,85,56,0.1)',
                            }, {
                                offset: 0.9,
                                color: 'rgba(252,85,56,0)',
                            },
                                {
                                    offset: 1,
                                    color: 'rgba(252,85,56,0)',
                                }],
                            globalCoord: false
                        },
                    }
                } //绘制阴影交集
            }
        ]
        };
        Echarts.render('profitLine1', option);
    },
    //电量收益曲线
    electricityProfit:function(datas){
        if(JSON.stringify(datas) == "{}"){
            $("#profitLine1").empty().html($.getI18n('noData'));
            return false
        }
        var names=[$.getI18n('plantMonitor.electricity')+'（'+datas.unity1+'）',$.getI18n('plantMonitor.profit')+'（'+datas.unity2+'）'];
        var xData = datas.xData;
        var option = {
            title: {

            },
            grid: {
                top:'25%',
                bottom:'13%',
                left: '7%',
                right: '7%'
            },
            legend: {
                show: true,
                top: '4%',
                right: '30%',
                textStyle:{
                    color:'#8A8A8A'
                },
                selectedMode:true,
                data:''
            },
            xAxis: {
                type: 'category',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#f8f8f8'],
                        type: 'solid'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#8A8A8A', //x轴文字颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#f5f5f5'  //x轴线颜色
                    }
                },
                axisTick:{
                    show:false,
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
            yAxis: [{
                name:names[0],
                type: 'value',
                splitNumber:5,
                // max:(Number(datas.maxData1||0)+Number(datas.maxData2||0)).toFixed(3),
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#f8f8f8'], //平行于x轴的虚线颜色
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#8A8A8A' //左边y轴字体颜色
                    }
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'#b1b2b2'  //左边y轴线颜色
                    }
                },
                nameTextStyle:{
                    color:'#8A8A8A' //左边title 颜色
                },
                axisTick:{   //y轴刻度线
                    show:false
                }
            },{
                name:names[1],
                type: 'value',
                splitNumber:5,
                // max:(Number(datas.maxData1||0)+Number(datas.maxData2||0)).toFixed(3),
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#f8f8f8'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#8A8A8A'
                    }
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'f8f8f8'
                    }
                },
                nameTextStyle:{
                    color:'#8A8A8A'
                },
                axisTick:{
                    show:false
                }
            }],
            series:[
                /*[{
                name: names[0],
                type: 'bar',
                barWidth: '10%',
                color:'rgba(139,207,255,1)',
                stack:1,
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
                                color: '#0ABDDD',
                                color: '#0ABDDD',
                            }, {
                                offset: 0,
                                color: '#0ABDDD',
                            }],
                            globalCoord: false
                        },
                    }
                },
                data: yData1
            },{
                name:names[1],
                type:'line',
                data:yData2,
                yAxisIndex: 1,
                showSymbol: false,
                stack:1,
                smooth:true,
                symbolSize: 1,
                show: true,
                symbol:'none',
                itemStyle:{
                    normal:{
                        width: 3,
                        color:'#FC5538', //折线颜色
                        shadowColor: '#FC5538',
                        shadowBlur: 10,
                        shadowOffsetY: 30
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
                                color: '#FFF7F6',
                            }, {
                                offset: 1,
                                color: '#FFF7F6',
                            }],
                            globalCoord: false
                        },
                    }
                } //绘制阴影交集
            }
            */]
        };
        var legendData = [];
        var powers = datas.yData;
        var yDatas = [];
        var color = ['RGBA(34,172,56,1)','RGBA(10,189,221,1)','RGBA(137,87,161,1)','RGBA(252,85,56,1)'];
        for(var i = 0 ,len = powers.length;i<len;i++){
            if(powers[i].name==$.getI18n('plantMonitor.profit')){
                legendData.push(powers[i].name+' ('+datas.unity2+') ')
            }else{
                legendData.push(powers[i].name+' ('+datas.unity1+') ')
            }
            yDatas[i] = powers[i].value;
            if(powers[i].name==$.getI18n('plantMonitor.discharge')){
                option.series.push({
                    name:powers[i].name+' ('+datas.unity1+') ',
                    type:powers[i].type,
                    smooth:true,
                    data: powers[i].value,
                    barWidth: 10,
                    barMaxWidth:20,
                    yAxisIndex:0,
                    showSymbol: false,
                    symbolSize: 1,
                    areaStyle: {
                        normal: {
                            opacity:0.2,

                        }
                    },
                    itemStyle:{
                        normal:{
                            color:color[i] //颜色
                        }
                    }
                })
            }else if(powers[i].name==$.getI18n('plantMonitor.profit')){
                option.series.push({
                    name:powers[i].name+' ('+datas.unity2+') ',
                    type:powers[i].type,
                    smooth:true,
                    data: powers[i].value,
                    yAxisIndex:1,
                    showSymbol: false,
                    symbolSize: 1,
                    areaStyle: {
                        normal: {
                            opacity:0.2,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(252,85,56,0.5)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(252,85,56,0)',
                                }],
                                globalCoord: false
                            },
                        }
                    },
                    itemStyle:{
                        normal:{
                            width: 3,
                            color:'#FC5538', //折线颜色
                            shadowColor: '#FC5538',
                            shadowBlur: 5,
                            shadowOffsetY: 30
                        }
                    },
                })
            }else{
                option.series.push({
                    name:powers[i].name+' ('+datas.unity1+') ',
                    type:powers[i].type,
                    smooth:true,
                    data: powers[i].value,
                    barWidth: 10,
                    barMaxWidth:20,
                    showSymbol: false,
                    symbolSize: 1,
                    areaStyle: {
                        normal: {
                            opacity:0.2
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:color[i] //颜色
                        }
                    },
                })
            }
            // option.yAxis[i].name = powers[i].name +'(' + powers[i].unit+ ')';
        }
        option.legend.data = legendData;
        Echarts.render('profitLine1', option);
    },
};