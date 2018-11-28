/** 2017/10/18 
* @author: kj
* @description: eacharts封装
*/ 
"use strict";
define(['plugins/echarts/echarts.min'],function (echarts) {
    var Echarts = {
        render: function ($id, options) {
            $id = typeof $id =="string" ? document.getElementById($id) : $id;
            // debugger
            if (!$id) return;
            // $.extend(this, echarts);
            var KpiChart = echarts.init($id);
            //type为line时，Y轴值转换
            for(var i=0,len = options.series.length;i<len;i++){
                (options.series[i].type === 'line') && options.series[i].data && (options.series[i].data = options.series[i].data.map(function (item) {
                    if(''+item === 'null'){
                        return '--'
                    }else{
                        return Number(item)
                    }
                }))

            }
            if(!options.noUseToolTipStyle){
                options.tooltip= $.extend({
                    borderWidth:1,
                    borderColor:'#ccc',
                    extraCssText: 'box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);text-align:left',
                    padding:[5,10],
                    trigger:'axis',
                    backgroundColor:'#fff',
                    formatter:function(item){
                        var str = '<div style="color: #333;">'+item[0].axisValue+'</div><img style="position: absolute;left: -10px;top:20px" class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAYAAAAW5GZjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQjg1MzFFRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQjg1MzFGRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NERCODUzMUNFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NERCODUzMURFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qIb73AAABN0lEQVR42mL4//8/Az588uRJ8zNnznz9/v37fyYGPODUqVM2TExMO1RUVLg4ODgY8JkYAjTx28ePH//DAAsW0xiBVBM7O3u1qqoqIxcXF1yOBU0hD5BazMvLGwBUyMDCgmoWC5JCSSC1TUxMzEBeXp6BkZERww8sUIUyQOqAtLS0MhDj9DAj0COcQPqkjIyMrpSUFL7AYQAFXZWgoCBBhTDFCbKysgzEAJBiAVZWVqIV737z5g3RimufPHny88ePH4QVm5mZXf3792/WzZs3///69Qu/aqS0UHTx4sX/P3/+/I8LoCee0gsXLvwDOomwYqiGlHPnzv359u0bYcVQDeFnz579+eXLF8KKoRq8gekZRQOhLBV9/vz5fzBPMxChofzatWtgxUxERFzX58+fT759+5YBIMAAY/x/DWAwTZ8AAAAASUVORK5CYII=" alt="">';
                        for(var i = 0 ,len= item.length; i<len ;i++){
                            var col  =item[i].color
                            if(typeof col !== "string"){
                                col = col.colorStops[0].color
                            }
                            str +=  '<div style="color: #333;"><b style="display: inline-block;vertical-align: middle;background: '+col+';width: 10px;height: 10px;border-radius: 50%;margin-right:3px;"></b>'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span></div>'
                        }
                        return str;
                    }},options.tooltip)
            }
            if(options.series[0].type === 'liquidFill'){
                require(['plugins/echarts/liquidfill.min'],function () {
                    KpiChart.setOption(options,true);
                    return KpiChart;
                })
            }else {
                KpiChart.setOption(options,true);
                this.resize(KpiChart);

                return KpiChart;
            }
        },
        resize: function (KpiChart) {
            $(window).resize(function(){
                KpiChart.resize();
            });
        }
    };
    $.extend(Echarts, echarts);
    window.Echarts = Echarts;
});
