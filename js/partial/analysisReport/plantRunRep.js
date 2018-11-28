/** 2017/12/14
 * @author: SP0014
 * @description: 电站运行报表
 */
define(function(){
    return runRepRender;
});
var runRepRender = {
    plantId:$('#plantId').val(),
    reportTable:'',
    Render: function () {
        //    Todo Main function
        this.searchPlant();
        this.changeDim();
        this.initTime();
        this.getPlant();
        var that = this;
        $('.sureTime').unbind().on('click',function(){
            var dimension = $('nav.dimenSwi span.activeSpan').data('dimension');
            var range = $('#dimenTime').val();
            var id = $('#plantId').val();
            if(id){
                $('#nanImg').hide();
                $('.lineBox,.repTable').show();
                that.getData({dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:id});
                that.runDatatable({dimension:dimension,plantId:id,range:range,tokenId:Cookies.getCook('tokenId')});
            }else{
                $('#nanImg').show();
                $('.lineBox,.repTable').hide();
                App.alert('请选择电站')
            }

        });
        $('#export').unbind().on('click',function(){
            that.exportRep()
        });
        //维度切换直接展现数据
        $('.dimenSwi')

    },
    getData:function(obj){
        var that = this;
        $.http.POST('/report/runReportLine.do',obj,function (res) {
            that.drawLine(res.body)
        })
    },
    getPlant:function(){
        $.http.POST('/report/fuzzySearchPlant.do',{tokenId:Cookies.getCook('tokenId'),plantName:''},function(res){
            if(res.body.length){
                var plantName = res.body[0].plantName;
                var id = res.body[0].plantId;
                $('#plantId').val(id);
                $("#plantName").data('id',id).val(plantName);
                //渲染默认电站
                $('#plantName').length && $('.sureTime').click();
            }else{

            }
        })
    },
    //搜索
    searchPlant:function () {
        var that = this;
        $('.leftBar input').bind('input propertychange',function(){
            var _that = that;
            var plantName = $('#plantName').val();
            $.http.POST('/report/fuzzySearchPlant.do',{tokenId:Cookies.getCook('tokenId'),plantName:plantName},function(res){
                var $that = _that;
                if(res.body.length!=0){
                    $('.plantContain').show();
                    var html ='';
                    $.each(res.body,function(i,val){
                        html+='<a data-id="'+val.plantId+'" data-time="'+val.valueTime+'">'+val.plantName+'</a>'
                    });
                    $('.plantContain .pnContainer').html(html);
                    //点击a选中
                    $('.plantContain .pnContainer a').on('click',function(){
                        $('#plantName').val($(this).text());
                        $('.plantContain').hide();
                        var time = $(this).data('time');
                        var id = $(this).data('id');
                        var dimension = $('.dimenSwi .activeSpan').data('dimension');
                        var range = $('#dimenTime').val();
                        $('#plantId').val(id);
                        $('#limit').val(time);
                        // $that.runDatatable({dimension:dimension,plantId:id,range:range,tokenId:Cookies.getCook('tokenId')}); //报表表格数据
                        // $that.getData({dimension:dimension,plantId:id,range:range,tokenId:Cookies.getCook('tokenId')}); //折线图数据
                    });

                    $('body').unbind('click').on('click',function () {
                        // $('.plantContain .searchBtn').unbind('click').on('click',function () {
                        //     alert(1)
                        //     return
                        // })
                        $('.plantContain').hide();
                    })
                }
            })
        })
    },
    drawLine:function(datas){
            var names = [] , units = [],legends = [] ,lineDatas = [];
            for(var i = 0 , len = datas.yData.length; i< len ; i++){
                names.push(datas.yData[i].name);
                units.push(datas.yData[i].unit);
                legends.push(datas.yData[i].name+'('+datas.yData[i].unit+')');
                lineDatas.push(datas.yData[i].value)
            }
            var option = {
                title: {

                },
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        lineStyle: {
                            color: '#006699'
                        }
                    },
                    formatter:function(item){
                        var str = '<div style="color: #a5e2f9">'+item[0].axisValue+'</div>';
                        for(var i = 0 ,len= item.length; i<len ;i++){
                            str +=  '<div style="color: #a5e2f9">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span></div>'
                        }
                        return str;
                    }

                },
                grid: {
                    top:'15%',
                    bottom:'20%',
                    left: '6%'

                },
                legend: {
                    show: true,
                    bottom: '5%',
                    // right: '20%',
                    textStyle:{

                    },
                    selectedMode:false,
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
                    name:legends[2],
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
                series: [{
                    name: names[0],
                    type: 'bar',
                    barWidth: '15%',
                    barBorderRadius: 4,
                    color:'rgba(77,179,251,1)',
                    stack:1,
                    itemStyle: {
                        normal: {

                            barBorderRadius: 4,

                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 1,
                                    color: 'rgba(139,190,35,1)',
                                }, {
                                    offset: 0,
                                    color: 'rgba(139,190,35,.5)',
                                }],
                                globalCoord: false
                            },
                        }
                    },
                    data: lineDatas[0]
                },{
                    name: names[1],
                    type: 'bar',
                    barWidth: '15%',
                    barBorderRadius: 4,
                    color:'rgba(32,90,167,1)',
                    stack:2,
                    itemStyle: {
                        normal: {

                            barBorderRadius: 4,

                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 1,
                                    color: 'rgba(0,132,255,1)',
                                }, {
                                    offset: 0,
                                    color: 'rgba(0,132,255,.5)',
                                }],
                                globalCoord: false
                            },
                        }
                    },
                    data: lineDatas[1]
                }
                ,{
                    name:names[2],
                    type:'line',
                    smooth:true,
                    data:lineDatas[2],
                    yAxisIndex: 1,
                    showSymbol: false,
                    stack:1,
                    symbolSize: 1,
                    symbol:'none',
                    itemStyle:{
                        normal:{
                            color:'rgba(0,160,107,1)'
                        }
                    }
                }]
            };
            Echarts.render('lineContent', option);
        },
    //维度切换
    changeDim:function(){
        var that = this;
        $('.rightBar nav.dimenSwi span').unbind().on('click',function(){
            $('.rightBar nav.dimenSwi span').removeClass('activeSpan');
            $(this).addClass('activeSpan');
            $('#dimenTime').val('');
            var limit = $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
            var myDate = new Date();
            var year=myDate.getFullYear();
            var month=myDate.getMonth()+1;
            var id = $('#plantId').val();
            //var day=myDate.getDate();
            switch (limit){
                //case 'day':$('#dimenTime').val(year+'/'+month+'/'+day);break;
                case "month":$('#dimenTime').val(year+'/'+month);break;
                case "year":$('#dimenTime').val(year);break;
            }
            var range = $('#dimenTime').val();
            that.runDatatable({dimension:limit,plantId:id,range:range,tokenId:Cookies.getCook('tokenId')});
            that.getData({dimension:limit,tokenId:Cookies.getCook('tokenId'),range:range,plantId:id})
        })
    },
    //初始化时间控件
    initTime:function(){
        //#F{$dp.$D('%y-%M-%d',{d:-1})}
        var myDate = new Date();
        var year=myDate.getFullYear();
        var month=myDate.getMonth()+1;
        var day=myDate.getDate();
        $('#dimenTime').val(year+'/'+month);
        $('#dimenTime').unbind().on('click',function(){
            var limit = $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
            switch (limit){
                case "month":WdatePicker({dateFmt:'yyyy/M',isShowClear:false,maxDate:'%y-%M'});break;
                case "year":WdatePicker({dateFmt:'yyyy',isShowClear:false,maxDate:'%y'});break;
            }
        })
    },
    //时间改变曲线表格
    // timeChangeLine:function(){
    //     var that = this
    //     var dimension = $('nav.dimenSwi span.activeSpan').data('dimension');
    //     var range = $('#dimenTime').val();
    //     var id = $('#plantId').val()
    //     // that.getData({dimension:dimension,tokenId:Cookies.getCook('tokenId'),range:range,plantId:id})
    //     // that.runDatatable({dimension:dimension,plantId:id,range:range,tokenId:Cookies.getCook('tokenId')});
    //
    // },
    //导出报表
    exportRep:function(){
        var dimension = $('.activeSpan').data('dimension');
        var time = $('#dimenTime').val();
        var plantId = $('#plantId').val();
        window.location = window.URLHREF+"/exports/runReportExport.do?tokenId="+Cookies.getCook('tokenId')+'&dimension='+dimension+"&plantId="+plantId+"&range="+time+"&orderName="+'';
        // $.http.GET('/exports/runReportExport.do?tokenId='+Cookies.getCook('tokenId')+'&dimension='+dimension+'&plantId='+plantId+'&range='+time+'&orderName='+'',function(res){
        //     console.log(res)
        // },false)
    },
    //表格报表数据
    runDatatable:function(obj){
        $('div.plantInfo').show();
        if(this.reportTable){
            this.reportTable.fnClearTable(false);
            this.reportTable.fnDestroy()
        }
        //更新电站基本信息
        $.http.POST('/report/runReportTable.do',obj,function(res){
            var capacity = res.body.capacity;
            var plantName = res.body.plantName;
            $('div.plantInfo span').eq(1).text(plantName).end()
                .eq(3).text(capacity).end()
                .eq(5).text($("#dimenTime").val())
        });
        this.reportTable= $("#reportTable").dataTable({
           ajax:{
               type:'POST',
               url:'/report/runReportTable.do',
               //data:obj,
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
           //bDestroy:true,
           //pageLength: 10,
            "paging": false,
            "scrollY": "370px",
            "scrollCollapse": true,
           serverSide: true,  //启用服务器端分页
           searching: false,  //禁用原生搜索
           //pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
           "createdRow": function (row, data, index) {
               /* 设置表格中的内容对齐方式 */
               $('td', row).attr("class", "text-left");
           },
            bInfo:false,
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
           columns: [
               { data: "time" ,title:'时间'},
               { data: "gen",title:'发电量(kWh)',width:'15%'},
               { data: "income",title:'收益估计量(元)',width:'10%'},
               { data: "plantRank",title:'单kw发电量(kWh)' ,width:'13%'},
               { data: "ppr",title:'等效利用小时数(h)',width:'13%'},
               { data: "coal" ,title:'节约标准煤(kg)',width:'11%'},
               { data: "tree",title:'等效植树(棵)'},
               { data: "co2" ,title:'CO2减排(kg)',width:'11%'}

           ]
       })
    }
};