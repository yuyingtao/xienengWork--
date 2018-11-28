define(function(){
    return electricityReportRender;
});
var electricityReportRender = {
    plantId:"",//电站id，
    plantName:"",//电站名称
    limitTime:"",//限时时间
    reportTable:"",
    columns:"",
    Render:function(){
        var _this = this;
        //切换年月维度
        this.changeDim(_this);
        //默认加载用户第一个电站
        this.getPlant(_this);
        //模糊搜索加载电站
        $("#plantName").on("input",function (e) {
            _this.getPlants(_this,$("#plantName").val())
            // if($("#plantName").val()){
            //     _this.getPlants(_this,$("#plantName").val())
            // }
        });
        //右边的搜索按钮
        $("#riSearch").on("click",function () {
            var range = $('#dimenTime').val();
            var plantName = $("#plantName").val();
            if(!range){
                App.alert("请先选择时间");
                return false
            }
            if(!plantName){
                App.alert("请先选择电站");
                return false
            }
            var dimension = $('.activeSpan').data('dimension');
            _this.getData(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId});
            _this.runDatatable(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId})

        });
        //左边的搜索按钮
        $("#lfSearch").on("click",function () {
            var dimension = $('.activeSpan').data('dimension');
            var range = $('#dimenTime').val();
            var plantName = $("#plantName").val();
            if(!range){
                App.alert("请先选择时间");
                return false
            }
            if(!plantName){
                App.alert("请先选择电站");
                return false
            }
            _this.getData(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId});
            _this.runDatatable(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId})

        });
        //导出报表
        $('#export').unbind().on('click',function(){
            _this.exportRep(_this)
        })
    },
    //初始化时间控件
    initTime:function(_this){
        //#F{$dp.$D('%y-%M-%d',{d:-1})}
        var myDate = new Date();
        var limitTime = _this.limitTime;
        var year=myDate.getFullYear();
        var month=myDate.getMonth()+1;
        var day=myDate.getDate();
        $('#dimenTime').val(year+'/'+month);
        $('#dimenTime').unbind().on('click',function(){
            var limit = $('.choose-m-y span.activeSpan').data('dimension');
            switch (limit){
                case "month":WdatePicker({el:"dimenTime",minDate:limitTime,dateFmt:'yyyy/M',isShowClear:false,maxDate:'%y-%M'});break;
                case "year":WdatePicker({el:"dimenTime",minDate:limitTime,dateFmt:'yyyy',isShowClear:false,maxDate:'%y'});break;
            }
        })
    },
    //切换年月维度
    changeDim:function(_this){
        var that = this;
        $('.choose-m-y span').unbind().on('click',function(){
            $('.choose-m-y span').removeClass('activeSpan');
            $(this).addClass('activeSpan');
            $('#dimenTime').val('');
            var limit = $('.activeSpan').data('dimension');
            var myDate = new Date();
            var year=myDate.getFullYear();
            var month=myDate.getMonth()+1;
            // var id = $('#plantId').val()
            //var day=myDate.getDate();
            switch (limit){
                //case 'day':$('#dimenTime').val(year+'/'+month+'/'+day);break;
                case "month":$('#dimenTime').val(year+'/'+month);break;
                case "year":$('#dimenTime').val(year);break;
            }
            var range = $('#dimenTime').val();
            that.runDatatable(_this,{dimension:limit,plantId:_this.plantId,range:range,tokenId:Cookies.getCook('tokenId')});
            _this.getData(_this,{dimension:limit,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId})
        })
    },
    //默认获取用户第一个电站名称及Id
    getPlant:function(_this){
        $.http.POST('/report/fuzzySearchPlant.do',{tokenId:Cookies.getCook('tokenId'),plantName:'',storedPlantOnly:1, plantType:Cookies.getCook('plantType')},function(res){
            if(res.body.length){
                var plantName = res.body[0].plantName;
                var id = res.body[0].plantId;
                var limitTime = new Date(parseInt(res.body[0].valueTime));
                var Y = limitTime.getFullYear() + '-';
                var M = (limitTime.getMonth()+1 < 10 ? '0'+(limitTime.getMonth()+1) : limitTime.getMonth()+1) + '-';
                var D = limitTime.getDate() + ' ';
                _this.plantId = id;
                _this.plantName = plantName;
                _this.limitTime = Y+M+D;
                $("#plantName").val(_this.plantName);
                _this.initTime(_this);
                var dimension = $('.activeSpan').data('dimension');
                var range = $('#dimenTime').val();
                _this.getData(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId});
                _this.runDatatable(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId})
            }else{
                $("#plantName").val("暂无电站")
            }
        })
    },
    //左边搜索框模糊搜索电站名称
    getPlants:function (_this,plantName) {
        $(".pnContainer").mCustomScrollbar("destroy");
        $.http.POST('/report/fuzzySearchPlant.do',{tokenId:Cookies.getCook('tokenId'),plantName:plantName,storedPlantOnly:1, plantType:Cookies.getCook('plantType')},function(res){
            $('.plantContain').hide();
            if(res.body.length){
                let pEl = res.body.map(function (item) {
                    return `<a limitTime = ${item.valueTime} _id = ${item.plantId}>${item.plantName}</a>`
                }).join("");
                $('.pnContainer').html(pEl);
                $(".pnContainer").mCustomScrollbar({
                    theme:"3d",
                    axis:"yx" // vertical and horizontal scrollbar
                });
                $('.plantContain').show();
                $('.arrow').show();
                //点击p选中
                $('.pnContainer a').on('click',function(){
                    _this.plantName = $(this).text();
                    _this.plantId = $(this).attr("_id");
                    var limitTime = new Date(parseInt($(this).attr("limitTime")));
                    var Y = limitTime.getFullYear() + '-';
                    var M = (limitTime.getMonth()+1 < 10 ? '0'+(limitTime.getMonth()+1) : limitTime.getMonth()+1) + '-';
                    var D = limitTime.getDate() + ' ';
                    _this.limitTime = Y+M+D;
                    $("#plantName").val(_this.plantName);
                    _this.initTime(_this);
                    var dimension = $('.activeSpan').data('dimension');
                    var range = $('#dimenTime').val();
                    var id = _this.plantId;
                    if(id){
                        $('#nanImg').hide();
                        $('.lineBox,.repTable').show();
                        _this.getData(_this,{dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:_this.plantId});
                        _this.runDatatable(_this,{dimension:dimension,plantId:_this.plantId,range:range,tokenId:Cookies.getCook('tokenId')});
                    }else{
                        $('#nanImg').show();
                        $('.lineBox,.repTable').hide();
                        App.alert('请选择电站')
                    }
                });
                $('body').unbind('click').on('click',function () {
                    $('.plantContain').hide();
                    $('.arrow').hide();
                })
            }
        })
    },
    //获取曲线数据
    getData:function(_this,obj){
        $.http.POST('/report/electricReportLine.do',obj,function (res) {
            _this.drawLine(res.body)
        })
    },
    //绘制曲线
    drawLine:function(datas){
        var names = [] , units = [],legends = ["度","元"] ,lineDatas = [];
        for(var i = 0 , len = datas.yData.length; i< len ; i++){
            names.push(datas.yData[i].name);
            units.push(datas.yData[i].unit);
            // legends.push(datas.yData[i].name+'('+datas.yData[i].unit+')')
            lineDatas.push(datas.yData[i].value)
        }
        var option = {
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
            //         var str = '<div style="color: #a5e2f9">'+item[0].axisValue+'</div>';
            //         for(var i = 0 ,len= item.length; i<len ;i++){
            //             str +=  '<div style="color: #a5e2f9">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span></div>'
            //         }
            //         return str;
            //     }
            //
            // },
            grid: {
                top:'15%',
                bottom:'20%',
                left: '6%'

            },
            legend: {
                show: true,
                bottom: '1%',
                // right: '20%',
                textStyle:{

                },
                data:names
            },
            xAxis: {
                type: 'category',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#ecedf6'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#333', //x轴文字颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#d2d2d2'  //x轴线颜色
                    }
                },
                axisTick:{
                    alignWithLabel:true
                },
                nameTextStyle:{
                    // color:'#a5e2f9'
                },
                data: datas.xData
            },
            // dataZoom:{
            //     show:true
            // },
            yAxis: [{
                name:legends[0],
                type: 'value',
                splitNumber:5,
                // max:(Number(datas.maxData1||0)+Number(datas.maxData2||0)).toFixed(3),
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#eee'], //平行于x轴的虚线颜色
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
                        color:'#d2d2d2'  //y轴线颜色
                    }
                },
                nameTextStyle:{
                    color:'#333'
                }
            },{
                name:legends[1],
                type: 'value',
                splitNumber:5,
                // max:(Number(datas.maxData1||0)+Number(datas.maxData2||0)).toFixed(3),
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#eee'],
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
                        color:'#d2d2d2'
                    }
                },
                nameTextStyle:{
                    color:'#333'
                }
            }],
            series: [
                {
                    name: names[0],
                    type: 'bar',
                    barWidth: '8%',
                    color:'#23AC38',
                    stack:1,
                    z:4,
                    itemStyle: {
                        normal: {
                            // barBorderRadius: 4,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 1,
                                    color: '#23AC38',
                                }, {
                                    offset: 0,
                                    color: '#23AC38',
                                }],
                                globalCoord: false
                            },
                        }
                    },
                    data: lineDatas[0]
                },
                // color:["#23AC38","#0ABDDD","#FC5538"],

                {
                    name: names[1],
                    type: 'bar',
                    barWidth: '8%',
                    // barBorderRadius: 4,圆角属性
                    color:"#0ABDDD",
                    stack:2,
                    z:3,
                    itemStyle: {
                        normal: {
                            // barBorderRadius: 4,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 1,
                                    color:'#0ABDDD',
                                }, {
                                    offset: 0,
                                    color: '#0ABDDD',
                                }],
                                globalCoord: false
                            },
                        }
                    },
                    data: lineDatas[1]
                },
                {
                    name:names[2],
                    type:'bar',
                    barWidth: '8%',
                    smooth:true,
                    data:lineDatas[2],
                    yAxisIndex: 0,
                    showSymbol: false,
                    stack:3,
                    z:2,
                    symbolSize: 1,
                    color:"#657BFF",
                    symbol:'none',
                    itemStyle:{
                        normal:{
                            color:"#657BFF"
                        }
                    },
                },
                {
                    name:names[3],
                    type:'line',
                    data:lineDatas[3],
                    yAxisIndex: 1,
                    showSymbol: false,
                    smooth:true,
                    symbolSize: 1,
                    show: true,
                    symbol:'none',
                    z:2,
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
                                y: 0.5,
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
                },
                {
                    name:names[4],
                    type:'line',
                    data:lineDatas[4],
                    yAxisIndex: 1,
                    showSymbol: false,
                    smooth:true,
                    symbolSize: 1,
                    show: true,
                    z:1,
                    symbol:'none',
                    itemStyle:{
                        normal:{
                            width: 3,
                            color:'#77AE00', //折线颜色
                            shadowColor: '#77AE00',
                            shadowBlur: 1000,
                            shadowOffsetY: 30
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0.5,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(119,174,0,0.1)',
                                }, {
                                    offset: 0.9,
                                    color: 'rgba(119,174,0,0)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(119,174,0,0)',
                                }],
                                globalCoord: false
                            },
                        },
                        shadowBlur:{
                            shadowColor: 'rgba(119,174,0,0.3)',
                            shadowBlur: 1000
                        }
                    } //绘制阴影交集
                },
                {
                    name:names[5],
                    type:'line',
                    data:lineDatas[5],
                    yAxisIndex: 1,
                    showSymbol: false,
                    smooth:true,
                    z:0,
                    symbolSize: 1,
                    show: true,
                    symbol:'none',
                    itemStyle:{
                        normal:{
                            width: 3,
                            color:'#7930FE', //折线颜色
                            shadowColor: '#7930FE',
                            shadowBlur: 10,
                            shadowOffsetY: 30
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0.5,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(121,48,254,0.1)',
                                }, {
                                    offset: 0.9,
                                    color: 'rgba(121,48,254,0)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(121,48,254,0)',
                                }],
                                globalCoord: false
                            },
                        }
                    } //绘制阴影交集
                }
            ]
        };
        Echarts.render('show-curve', option);
    },
    //获取表格数据
    runDatatable:function(_this,obj){
        $('div.plantInfo').show();
        if(_this.reportTable){
            _this.reportTable.fnClearTable(false);
            _this.reportTable.fnDestroy()
            $('#reportTable10').empty();
        }        //更新电站基本信息
        $.http.POST('/report/electricReportTable.do',obj,function(res){
            var capacity = res.body.capacity;
            var plantName = res.body.plantName;
            $('div.plantInfo span').eq(1).text(plantName).end()
                .eq(3).text(capacity).end()
                .eq(5).text($("#dimenTime").val());
            _this.reportTable= $("#reportTable10").dataTable({
                ajax:{
                    type:'POST',
                    url:'/report/electricReportTable.do',
                    // data:obj,
                    dataType : 'json',
                    contentType: 'application/json;charset=utf-8',
                    data:function(d){
                        var orders = d.order;
                        var orderName = [];
                        $.each(orders,function (index, item) {
                            var columns = d.columns;
                            var columnName = columns[Number(item.column)].data;
                            var dir = item.dir;
                            var str = '{"'+columnName+'":"'+dir+'"}';
                            orderName.push(eval("("+str+")"))
                        });
                        d.orderName = orderName;
                        d.dimension = obj.dimension;
                        d.plantId=obj.plantId;
                        d.range = obj.range;
                        d.tokenId = obj.tokenId;
                        d.draw = true;
                        return JSON.stringify(d)
                    },
                    dataSrc: function(json){
                        Number(json.code) == 104 && App.alert(json);
                        json.recordsTotal = json.body.recordsTotal;
                        json.recordsFiltered = json.body.recordsFiltered;
                        !json.body.data && (json.body.data=[]);
                        return json.body.data
                    }
                },
                columns:[
                    {data:"time",title:"时间"},
                    {data:"electriNumUsed",title:"用电量"},
                    {data:"electriNumOff",title:"下网电量"},
                    {data:"electriNumOn",title:"上网电量"},
                    {data:"electriMoneyOff",title:"下网费用"},
                    {data:"electriMoneyOn",title:"上网费用"},
                    {data:"electriMoneyUsed",title:"用电电费"},
                ],
                'drawCallback':function(set){
                    //console.log(set)
                },
                "fnCreatedRow":function(nRow,aData,iDataIndex){

                },
                "headerCallback": function( thead, data, start, end, display ) {
                    //    排序图标
                    var orders = [0,1,2,3,4,5,6,7];
                    $.each(orders,function (index,item) {
                        var $dom = $(thead).find('th').eq(item);
                        $dom.html($dom.text()+'<b class="orderImg"></b>');
                    })
                },
                bDestroy:true,
                pageLength: 10,
                retrieve: true,
                "paging": false,
                "scrollY": "370px",
                "scrollCollapse": true,
                serverSide: true,  //启用服务器端分页
                searching: false,  //禁用原生搜索
                pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
                bInfo:false,


                // bSort:false,
                // bInfo:false,
                // pageLength: 10,
                // serverSide: true,  //启用服务器端分页
                // "processing": true,
                // searching: false,  //原生搜索
                // pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
                // paging:true,
                // bPaginate:true,
                // stateSave : false,//记住分页
                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容对齐方式 */
                    $('td', row).attr("class", "text-left");
                },
                language:{
                    "sProcessing": "处理中...",
                    "sLengthMenu": "",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项",
                    "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页",
                        "sJump": "跳转"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                },
            })
        })
    },
    //导出报表
    exportRep:function(_this){
        var dimension = $('.activeSpan').data('dimension');
        var time = $('#dimenTime').val();
        var plantId = _this.plantId;
        window.location = window.URLHREF+"/exports/eletriRunReportExport.do?tokenId="+Cookies.getCook('tokenId')+'&dimension='+dimension+"&plantId="+plantId+"&range="+time+"&orderName="+'';
        // $.http.GET('/exports/runReportExport.do?tokenId='+Cookies.getCook('tokenId')+'&dimension='+dimension+'&plantId='+plantId+'&range='+time+'&orderName='+'',function(res){
        //     console.log(res)
        // },false)
    },
};