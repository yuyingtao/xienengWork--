/** 2017/10/31
 * @author: kj
 * @description:  电站规模
 */
define(function () {
    return plantScale;
});
var plantScale = {
    Render:function () {
       this.getPlantCount()
    },
    getPlantCount:function () {
        var _this = this;
        $.http.POST('/screen/getPlantCount.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            if(JSON.stringify(res.body) =="{}"){
                // $("#plantScaleCharts").html("暂无数据")
                $("<p class='noDistribution'>").html("暂无数据").appendTo($("#plantScaleCharts"));
                return false
            }
            _this.drawPie(res.body)
        })
    },
    //渲染饼状图
    drawPie:function (data) {
        $('.scaleUnity').text(data.totalCapacity);
        $('.scaleNum').text(data.totalPlant);
        let datas = data.datas
        let colors = ['RGBA(34,166,131,1)', 'RGBA(34,126,171,1)', 'RGBA(55,145,57,1)', 'RGBA(204,85,23,1)', 'RGBA(240,163,50,1)']
        datas = datas.filter(item => item.value)
        var dataStyle = {
            normal: {
                label: {show:false},
                labelLine: {show:false},
                shadowBlur: 40,
                shadowColor: 'rgba(40, 40, 40, 0.5)',
            }
        };
        var fontS = +$('body').css('fontSize').replace('px','')
        var plantNum = App.ConvertUnit({
            unit:'seat',
            num:data.totalPlant,
            len:4,
            isInt:true,
        })
        var totalCapacity = /MW$/.test(data.totalCapacity) ? parseFloat(+(data.totalCapacity.replace('MW',''))*1000).toFixed(2) : parseFloat(+(data.totalCapacity.replace('KW',''))).toFixed(2)
        var plantCap = App.ConvertUnit({
            unit:'watt',
            num:totalCapacity,
            len:5,
            split:3
        })
        var option = {
            tooltip: {
                show: true,
                trigger: 'item',
                textStyle:{
                   color:'#333'
                },
                formatter: '{b}:  {c}座 ({d}%)'
            },
            legend: {
                orient: 'horizontal',
                bottom: '0%',
                data: ['<10w', '10w-50w', '50w-100w', '100w-500w', '>500w']
            },
            title:{
                text: plantCap.num + plantCap.unit ,
                "x": '49%',
                "y": '42%',
                textAlign: "center",
                textStyle:{
                    width:30,
                    color:'#00ba24',
                    font:fontS*1.285+'px bolder',
                    align:'center'
                },
                subtextStyle:{
                    width:30,
                    color:'#f4d039',
                    fontSize :fontS,
                    align:'center'
                },
                subtext:  plantNum.num + plantNum.unit,
            },
            series: [{
                type: 'pie',
                radius: ['45%', '56%'],
                color: colors,
                silent:true,
                z:2,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        /*color: 'RGB(34,166,131)',
                        label: {show:false},
                        labelLine: {show:false},
                        shadowBlur: 10,
                        shadowColor: 'rgba(255,255,255, 0.7)',*/
                        opacity:0.4
                    }
                },
                data: datas
            },{
                type: 'pie',
                radius: ['40%', '49%'],
                color: ['RGBA(240,163,50,1)', 'RGBA(204,85,23,1)', 'RGBA(55,145,57,1)', 'RGBA(34,126,171,1)', 'RGBA(34,166,131,1)'],
                silent:true,
                z:1,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        /*color: 'RGB(34,166,131)',
                        label: {show:false},
                        labelLine: {show:false},
                        shadowBlur: 10,
                        shadowColor: 'rgba(255,255,255, 0.7)',*/
                        opacity:.3
                    }
                },
                data: datas
            },{
                type: 'pie',
                // roseType: "radius",
                selectedMode: 'single',
                radius: ['50%', '61%'],
                hoverAnimation:false,
                color: ['RGBA(240,163,50,1)', 'RGBA(204,85,23,1)', 'RGBA(55,145,57,1)', 'RGBA(34,126,171,1)', 'RGBA(34,166,131,1)'],
                z:3,
                label: {
                    normal: {
                        formatter: '{b}\n({d}%)',
                        textStyle: {
                            fontSize:0.857*fontS
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        position: 'outside'
                    }
                },
                data: datas
            }]
        };
        Echarts.render('plantScaleCharts', option);
    }
};