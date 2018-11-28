/** 2018/3/6
 * @author: SP0014
 * @description:  单电站页面 电站功率模块
 */
define(function () {
    return spPower;
});
var spPower = {
    powerInter: '',//电站功率 定时器
    plantId: '',//电站id
    domId: 'spMonitorCarousel',//模块中的任意Id
    singlePlantType:1,
    Render:function(opts){
        var _this = this;
        _this.getNowDate()
        _this.plantId = opts.plantId || ''
        _this.singlePlantType = opts.singlePlantType;
        if(_this.singlePlantType==1){
            _this.getData( {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId,
                dataTime: ''
            })
        }else{
            _this.getGcCnData( {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId,
                dataTime: ''
            })
        }
        //搜索以往功率
        $('#sureTime').unbind().on('click', function () {
            var dataTime = $('#searchDate').val();
            $('#loadData').show();
            $('#powerKpi').hide();
            if(_this.singlePlantType==1){
                _this.getData( {
                    tokenId: Cookies.getCook('tokenId'),
                    plantId: _this.plantId,
                    dataTime: dataTime
                })
            }else{
                _this.getGcCnData( {
                    tokenId: Cookies.getCook('tokenId'),
                    plantId: _this.plantId,
                    dataTime: dataTime
                })
            }
        })
    },
    getData:function(obj){
        var _this = this;
        //电站功率
       getPowerCountOfPlant();
        function getPowerCountOfPlant() {
            if (main.clearInterCharge(_this.powerInter, _this.domId)) return;
            //光伏
            $.http.POST('/monitor/getPlantPower.do',obj, function (result) {
                $('#loadData').hide();
                $('#powerKpi').show();
                _this.curvePowerKpi(result.body)
            })
        }
        _this.powerInter = setInterval(getPowerCountOfPlant, 300000);
    },
    //光储储能电站功率
    getGcCnData:function(obj){
        var _this = this;
        getPowerCountOfPlant();
        function getPowerCountOfPlant() {
            if (main.clearInterCharge(_this.powerInter, _this.domId)) return;
            //光伏
            $.http.POST('/monitor/getSinglePowerCurve.do', obj, function (result) {
                $('#loadData').hide();
                $('#powerKpi').show();
                _this.singlePower(result.body)
            })
        }
        _this.powerInter = setInterval(getPowerCountOfPlant, 300000);
    },
    //电站当日功率曲线
    curvePowerKpi: function (datas) {
        var xData = datas.xData, yData1 = datas.yData1, yData2 = datas.yData2;
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#ff8400'
                    }
                },
                formatter: function (item) {
                    if (!item[1]) return;
                    var str = '<div style="color: #333;">'+item[0].axisValue+'</div><img style="position: absolute;left: -10px;top:10px" class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAYAAAAW5GZjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQjg1MzFFRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQjg1MzFGRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NERCODUzMUNFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NERCODUzMURFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qIb73AAABN0lEQVR42mL4//8/Az588uRJ8zNnznz9/v37fyYGPODUqVM2TExMO1RUVLg4ODgY8JkYAjTx28ePH//DAAsW0xiBVBM7O3u1qqoqIxcXF1yOBU0hD5BazMvLGwBUyMDCgmoWC5JCSSC1TUxMzEBeXp6BkZERww8sUIUyQOqAtLS0MhDj9DAj0COcQPqkjIyMrpSUFL7AYQAFXZWgoCBBhTDFCbKysgzEAJBiAVZWVqIV737z5g3RimufPHny88ePH4QVm5mZXf3792/WzZs3///69Qu/aqS0UHTx4sX/P3/+/I8LoCee0gsXLvwDOomwYqiGlHPnzv359u0bYcVQDeFnz579+eXLF8KKoRq8gekZRQOhLBV9/vz5fzBPMxChofzatWtgxUxERFzX58+fT759+5YBIMAAY/x/DWAwTZ8AAAAASUVORK5CYII=" alt="">';
                    if (item[1].data != 'null') {
                        str += '<div style="color: #333">' + item[1].seriesName + ': <span style="font-size: 1.3em">' + item[1].data + '</span>' + datas.unit + '</div>'
                    } else {
                        // str +=  '<div style="color: #a5e2f9">'+item[1].seriesName+': <span style="font-size: 1.3em"></span>'+datas.unit+'</div>'
                        str += ''
                    }

                    return str;
                }

            },
            color: ['#1BB716'],
            grid: {
                top: '17%',
                bottom: '25%',
                left: '5%',
                right: '2%'
            },
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#ecedf6'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#b1b2b2'
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                nameTextStyle: {
                    // color:'#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name: $.getI18n('plantMonitor.power')+'(' + datas.unit + ')',
                type: 'value',
                splitNumber: 5,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ecedf6'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#b1b2b2'
                    }
                },
                nameTextStyle: {
                    color: '#333'
                }
            }],

            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 100,
                    borderColor: 'rgba(204,204,204, .5)',
                    backgroundColor: 'rgba(205,205,205, .4)',
                    fillerColor: 'rgba(205,205,205, 0.2)',
                    dataBackground: {
                        lineStyle: {
                            color: 'rgba(1,39,84, 0.35)',
                        }
                    },

                    handleStyle: {
                        color: 'rgba(204,204,204, 0.5)',
                        borderColor: 'rgba(204,204,204, 0.5)',
                    },
                    textStyle: {
                        color: '#333'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 1,
                    end: 99,
                }
            ],
            series: [{
                type: 'line',
                data: yData2,
                showSymbol: false,
                smooth: false,
                symbolSize: 0,
                // yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(153,153,153,1)',
                            type: 'dashed'  //'dotted'虚线 'solid'实线
                        }
                    }
                },
                markLine: {
                    symbolSize: [30, 30],
                    symbol: ['', 'image:///images/pmImages/sun.png'],
                    lineStyle: {
                        normal: {
                            type: 'solid',
                            color: '#ff8400',
                        }
                    },
                    data: [
                        [{
                            coord: [datas.curTime, 0]
                        }, {
                            coord: [datas.curTime, datas.curData2]
                        }
                        ]
                    ]
                }
            }, {
                name: $.getI18n('plantMonitor.power'),
                type: 'line',
                data: yData1,
                showSymbol: false,
                symbolSize: 1,
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
                                color: 'rgba(27,183,22, .2)',
                            }, {
                                offset: 1,
                                color: 'rgba(27,183,22, 0)',
                            }],
                            globalCoord: false
                        },
                    }
                }
            }]
        };

        Echarts.render('powerKpi', option);

    },
    //光储单电站功率
    singlePower:function(datas){
        var xData = datas.xData;
        var option = {
            // tooltip: {
            //     // trigger: 'axis',
            //     // axisPointer: {
            //     //     lineStyle: {
            //     //         color: '#ff8400'
            //     //     }
            //     // },
            //     formatter: function (item) {
            //         if (!item[1]) return;
            //         var str = '<div style="color: #333;">'+item[0].axisValue+'</div><img style="position: absolute;left: -10px;top:30px" class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAYAAAAW5GZjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQjg1MzFFRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQjg1MzFGRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NERCODUzMUNFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NERCODUzMURFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qIb73AAABN0lEQVR42mL4//8/Az588uRJ8zNnznz9/v37fyYGPODUqVM2TExMO1RUVLg4ODgY8JkYAjTx28ePH//DAAsW0xiBVBM7O3u1qqoqIxcXF1yOBU0hD5BazMvLGwBUyMDCgmoWC5JCSSC1TUxMzEBeXp6BkZERww8sUIUyQOqAtLS0MhDj9DAj0COcQPqkjIyMrpSUFL7AYQAFXZWgoCBBhTDFCbKysgzEAJBiAVZWVqIV737z5g3RimufPHny88ePH4QVm5mZXf3792/WzZs3///69Qu/aqS0UHTx4sX/P3/+/I8LoCee0gsXLvwDOomwYqiGlHPnzv359u0bYcVQDeFnz579+eXLF8KKoRq8gekZRQOhLBV9/vz5fzBPMxChofzatWtgxUxERFzX58+fT759+5YBIMAAY/x/DWAwTZ8AAAAASUVORK5CYII=" alt="">';
            //
            //         // if (item[1].data != 'null') {
            //         //     str += '<div style="color: #a5e2f9">' + item[1].seriesName + ': <span style="font-size: 1.3em">' + item[1].data + '</span>' + datas.unit + '</div>'
            //         // } else {
            //         //     // str +=  '<div style="color: #a5e2f9">'+item[1].seriesName+': <span style="font-size: 1.3em"></span>'+datas.unit+'</div>'
            //         //     str += ''
            //         // }
            //         for(var i = 0 ,len= item.length; i<len ;i++){
            //             str +=  '<div style="color: #333">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+datas.unit+'</span></div>'
            //         }
            //         return str;
            //     }
            //
            // },
            // color: ['#1BB716'],
            color: ['#3EB766','#0ABDDD'],
            grid: {
                top: '17%',
                bottom: '25%',
                left: '5%',
                right: '2%'
            },
            legend: {
                show: true,
                top: '4%',
                right: '2%',
                textStyle:{
                    color:'#8A8A8A'
                },
                selectedMode:true,
                data:''
            },
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#f1f1f1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#8A8A8A'
                    }
                },
                axisTick:{
                    show:false,
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#0ABDDD'
                    }
                },
                nameTextStyle: {
                    // color:'#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name: $.getI18n('plantMonitor.power')+'(' + datas.unit + ')',
                type: 'value',
                splitNumber: 5,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#f1f1f1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#8A8A8A'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        color: '#0ABDDD'
                    }
                },
                nameTextStyle: {
                    color: '#8A8A8A'
                }
            }],

            // dataZoom: [
            //     {
            //         type: 'slider',
            //         show: true,
            //         start: 0,
            //         end: 100,
            //         borderColor: 'rgba(204,204,204, .5)',
            //         backgroundColor: 'rgba(205,205,205, .4)',
            //         fillerColor: 'rgba(205,205,205, 0.2)',
            //         dataBackground: {
            //             lineStyle: {
            //                 color: 'rgba(1,39,84, 0.35)',
            //             }
            //         },
            //
            //         handleStyle: {
            //             color: 'rgba(204,204,204, 0.5)',
            //             borderColor: 'rgba(204,204,204, 0.5)',
            //         },
            //         textStyle: {
            //             color: '#333'
            //         }
            //     },
            //     {
            //         type: 'inside',
            //         xAxisIndex: [0],
            //         start: 1,
            //         end: 99,
            //     }
            // ],
            series: []
        };
        var legendData = [];
        var powers = datas.yData;
        var yDatas = [];
        var color = ['RGBA(62, 183, 102, 1)','RGBA(10, 189, 221, 1)'];
        var colors = [['RGBA(62, 183, 102, 0.2)','RGBA(62, 183, 102, 0)'],['RGBA(10, 189, 221, 0.2)','RGBA(10, 189, 221, 0)']]
        for(var i = 0 ,len = powers.length;i<len;i++){
            legendData.push(powers[i].name+'(' + datas.unit + ')');
            yDatas[i] = powers[i].value;
                option.series.push({
                    name:powers[i].name+'(' + datas.unit + ')',
                    type:powers[i].type,
                    smooth:false,
                    data: powers[i].value,
                    showSymbol: true,
                    symbolSize: 7,
                    itemStyle:{
                        normal:{
                            color:color[i] //颜色
                        }
                    },
                    lineStyle:{
                        width:1
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
                                    color: colors[i][0]
                                }, {
                                    offset: 1,
                                    color: colors[i][1]
                                }],
                                globalCoord: false
                            },
                        }
                    }
                })
            // option.yAxis[i].name = powers[i].name +'(' + powers[i].unit+ ')';
        }
        option.legend.data = legendData;
        Echarts.render('powerKpi', option);
    },
    //获取当前系统时间
    getNowDate:function(){
        var date = new Date()
        var myDate = date.format('yyyy-MM-dd');
        $('#searchDate').val(myDate)
    }
};