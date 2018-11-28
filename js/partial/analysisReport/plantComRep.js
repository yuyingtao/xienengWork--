/** 2017/12/18
/** 2017/12/18
 * @author: SP0014
 * @description: 电站对比报表
 */
define(function(){
    return comRepRender;
});
var comRepRender = {
    reportTable:'',//表格数据
    areaId:'',//电站ID集合
    areaId1:'',//区域ID
    selectedPlant:[],//选中的电站集合
    Render:function(){
        var that = this;
        that.changeDim();
        that.initTime();
        // that.removeSameData(
        //     [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7}],
        //     [{id:6},{id:2},{id:5},{id:3}]
        // )
        //回显数据
        that.reviewPlant({tokenId:Cookies.getCook('tokenId')});
        that.areaChang();
        //导出报表
        $('.export').unbind().on('click',function(){
            that.exportRep()
        });
        //点击确定生成曲线和报表
        $('a#getLineTable').unbind().on('click',function(){
            var dimension= $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
            var range = $('#dimenTime').val();
            $('.lineBox,.repTable').show();
            that.getLineData({areaId:that.areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId'),draw:''});
            that.comDatatable({areaId:that.areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId')})
        })
    },
    //回显数据
    reviewPlant:function (obj) {
        var that = this;
        $('#loadingData').show();
        $('#nanImg').hide();
        $.http.POST('/report/reviewData.do',obj,function(res){
            if(res.body.length > 0){
                var areaIds = res.body;
                var areaId=[];
                if(!areaIds.length){
                    return
                }
                $('#nanImg').hide();
                $('#loadingData').hide();
                $('.lineBox,.repTable').show();
                $.each(areaIds,function (index,item) {
                    areaId.push(item.id)
                });
                areaId = areaId.join(',');
                that.areaId = areaId;
                var dimension= $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
                var range = $('#dimenTime').val();
                that.getLineData({areaId:areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId'),draw:''});
                that.comDatatable({areaId:areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId')})
            }else{
                $('#loadingData').hide();
                $('#nanImg').show();
                that.areaChang()
            }
        })
    },
    //获取曲线数据
    getLineData:function(obj){
        var that = this;
        $.http.POST('/report/runReportsLine.do',obj,function(res){
            that.drawLine(res.body)
        })
    },
    //区域、电站选择
    areaChang:function () {

        var that = this;
        var plantChangeWin='';
        // 弹窗
        var winContent = '\n' +
            '            <div class="changeWin" style="">\n' +
            '                <div class="fl" style="height: 34px;line-height: 34px"><span>'+$.getI18n('report.plantArea')+'</span>：</div>\n' +
            '                <input id="selectPlant" type="text" readonly class="selectPlant">\n' +
            '                <button class="imgBtn comfort setSave" id="setSave" style="margin-left: 10px">'+$.getI18n('report.saveDefault')+'</button>\n' +
            '                <button class="imgBtn comfort" id="setOk">'+$.getI18n('report.getReport')+'</button>\n' +
            '                <div class="map-select-box" style="display:none ">\n' +
            '                    <h2 class="navigation-tit" id="navigationTit">\n' +
            '                        <a class="rootArea" id="rootArea">--</a>\n' +
            '                    </h2>\n' +
            '                    <div class="navigation-box clearfix">\n' +
            '                        <img class="arrow" src="/images/repImages/shadow.png" alt="">\n' +
            '                        <table id="io-table">\n' +
            '                            <tr>\n' +
            '                                <td><a></a></td>\n' +
            '                                <td><a><img src="/images/lodding.gif" style="width: 30px;height: 30px" alt=""></a></td>\n' +
            '                                <td><a></a></td>\n' +
            '                            </tr>\n' +
            '                        </table>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="ue-container" style="display: none">\n' +
            '                    <select multiple="multiple" size="10" name="doublebox" id="plantSelect">\n' +
            '                    </select>\n' +
            '                </div>\n' +
            '            </div>';
        $('#showWin').on('click',function () {
            plantChangeWin = App.dialog({
                id: "changeWin" ,
                title: $.getI18n('report.reportPerson'),
                width: 900,
                height: 493,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content: winContent,
                openEvent: function () {
                    setEnvent()
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true}]
            })
        });
        // 电站
        var plantList='';
        function plantBox(obj,selectedPlant){
            $('#plantSelect').empty();
            $('#plantSelect').doublebox({nonSelectedList:[]});
            plantList = $('#plantSelect').doublebox({
                nonSelectedListLabel: '待选电站',
                selectedListLabel: '已选电站',
                preserveSelectionOnMove: 'moved',
                showFilterInputs: true,
                filterPlaceHolder:'请输入电站名称',
                moveOnSelect: false,
                nonSelectedList:obj,
                selectedList:selectedPlant,
                optionValue:"id",
                optionText:"name",
                doubleMove:true,
            });
            $('.ue-container').show();
            $('.box1 input').attr('placeholder','请输入电站名称');
            $('.box2 input').attr('placeholder','请输入电站名称')
        }

        var _this = this;
        function refreshArea(data){
            $.http.POST('/report/getAreaDistribution.do', data, function (result) {
                setCurArea(result.body.areaInfo);
                setCurAreaChildren(result.body.kidsArea,result.body.plantsInfo.location,result.body.areaInfo.id);
                // plantBox(_this.removeSameData(result.body.plantsInfo,_this.selectedPlant),_this.selectedPlant)
                plantBox(result.body.plantsInfo,[])
            })
        }
        //请求获取电站及区域数据
        function setEnvent(){
            $('#rootArea').on('click',function () {
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:'',
                    type:2,
                    plantType:1,
                    serviceType:2,
                });
                $('.navigation-item').remove()
            });
            //点击确定按钮生成曲线和表格
            $('#setOk,#getLineTable').unbind().on('click',function(){
                var areaValue = $('.selectPlant').val();
                var options = $('#bootstrap-duallistbox-selected-list_doublebox option');
                var vals=[];
                var areaId ;
                if(options.length > 0){
                    _this.selectedPlant=[]
                    $.each(options,function (idex,item) {
                        // console.log($(item).text())
                        _this.selectedPlant.push({
                            id:Number($(item).attr('value')),
                            name:$(item).text()
                        })
                        vals.push($(item).attr('value'));
                    });
                    areaId = vals.join(',');
                    _this.areaId = areaId
                }else{
                    areaId = _this.areaId
                }
                // console.log('areaId',areaId)
                $('div.plantInfo').show();
                var dimension= $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
                var range = $('#dimenTime').val();
                if(!areaId){
                    App.alert($.getI18n('report.choosePlantCompare'));
                    return
                }
                $('.btn.modal-btn.imgNoBtn').click();
                $('#nanImg').hide();
                $('.lineBox,.repTable').show();
                that.getLineData({areaId:areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId'),draw:''});
                that.comDatatable({areaId:areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId')})
            });
            //保存默认
            $("#setSave").unbind().on('click',function(){
                var options = $('#bootstrap-duallistbox-selected-list_doublebox option');
                var vals=[];
                var areaId ;
                if(options){
                    $.each(options,function (idex,item) {
                        vals.push($(item).attr('value'));
                    });
                    areaId = vals.join(',');
                }else{
                    areaId = _this.areaId
                }
                if(!areaId){
                    App.alert($.getI18n('report.choosePlantSave'));
                    return
                }
                $.http.POST('report/saveUserSet.do',{plants:areaId,tokenId:Cookies.getCook('tokenId')},function(res){
                    App.warningDialog(res.msg);
                    $('.btn.modal-btn.imgNoBtn').click();
                })
            });

            $('#rootArea').click();
        }
        //设置当前区域节点
        function setCurArea(plantArea){
            if(Number(plantArea.fatherId)===0){
                $('#rootArea').text(plantArea.name);
                _this.areaId1 = plantArea.id;
                $('#selectPlant').unbind().on('click',function (e) {
                    $('.map-select-box').fadeToggle();
                    e.stopPropagation()
                });

                $('body').unbind('click').on('click',function () {
                    $('.map-select-box').fadeOut();
                })
            }
            $('.selectPlant').val($('#navigationTit').text().replace(/(^\s{5,})|(\s{5,}$)|(\s{5,})/g,""));
        }
        //设置当前区域节点下的子区域
        function setCurAreaChildren(kidsArea,curLoc,fatherId){
            $('#io-table').html('');
            var $tr = $('<tr></tr>');
            var td = '';
            str = $('#io-table');
            $.each(kidsArea,function (index, item) {
                var tpl = '<td><a class="toNextArea" sp-child="{{hasChild}}" sp-id="{{id}}" sp-fatherId="'+fatherId+'"><span class="plantName">{{name}}</span>（{{count}}座）</a></td>';
                td = Mustache.render(tpl, item);
                $tr.append($(td));
                if((index+1)%3 === 0){
                    str.append($tr);
                    $tr = $('<tr></tr>');
                }
            });
            (kidsArea.length%3 !== 0) && str.append($tr);
            //绑定下转
            $('.toNextArea').unbind().on('click',function () {
                var $this = $(this);
                var $id = $this.attr('sp-id');
                var $child = $this.attr('sp-child');
                var $fatherId = $this.attr('sp-fatherId');
                // if($child === "true"){
                    _this.areaId1 = $id;
                    _this.rangeType = 1;
                    $('.alarmType').eq(0).click();
                    refreshArea({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$id,
                        type:2,
                        plantType:1,
                        serviceType:2
                    });
                    navigation({
                        name:$this.find('.plantName').text(),
                        id:$id,
                        fatherId:$fatherId,
                        isAdd:1
                    });
                // }
                $('.selectPlant').val($('#navigationTit').text().replace(/(^\s{5,})|(\s{5,}$)|(\s{5,})/g,""));
                
            })

        }
        //区域导航
        function navigation(obj){
            var _id = obj.id.replace('.','-').replace('.','-');
            if (obj.isAdd) {
                if($('.nav-id-'+obj.id).length){
                    return
                }
                var navA = '<a sp-fatherId="'+obj.fatherId+'" class="navigation-item nav-id-'+_id+'">\/<span class="nav-text">'+obj.name+'</span></a>';
                $('#navigationTit').append(navA);

                var $navItem = $('.nav-id-'+_id);
                // $('#selectPlant').val($('#navigationTit').text());
                $navItem.data('clusterMsg',obj);
                $navItem.unbind().on('click',function(){
                    var $this = $(this);
                    obj.isAdd = !1;
                    if(Number($navItem.data('clusterMsg').fatherId) === 0)return;
                    navigation(obj);
                    // refreshMap($navItem.data('clusterMsg'))
                    _this.areaId1 = $navItem.data('clusterMsg').id;
                    _this.rangeType = 1;
                    $('.alarmType').eq(0).click();
                    refreshArea({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id,
                        type:2,
                        plantType:1,
                        serviceType:2,
                    })
                })
            }else {

                var $item = $('.navigation-item');
                if(!$item.eq($item.length-1).hasClass('nav-id-'+_id)){
                    $item.eq($item.length-1).remove();
                    navigation(obj);
                }
            }
        }
    },
    changeDim:function(){
        var that= this;
        $('.rightBar nav.dimenSwi span').unbind().on('click',function(){
            $('.rightBar nav.dimenSwi span').removeClass('activeSpan');
            $(this).addClass('activeSpan');
            //清空已有的值
            $('#dimenTime').val('');
            var limit = $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
            var myDate = new Date();
            var yesterday = new Date(myDate.setTime(myDate.getTime()-24*60*60*1000));
            var year=yesterday.getFullYear();
            var month=yesterday.getMonth()+1;
            var day=yesterday.getDate();
            var dimension= $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
            switch (limit){
                case 'day':$('#dimenTime').val(year+'/'+month+'/'+day);break;
                case "month":$('#dimenTime').val(year+'/'+month);break;
                case "year":$('#dimenTime').val(year);break;
            }
            var range = $('#dimenTime').val();
            that.getLineData({areaId:that.areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId'),draw:''});
            that.comDatatable({areaId:that.areaId,dimension:dimension,range:range,tokenId:Cookies.getCook('tokenId')})
        })
    },
    //初始化时间
    initTime:function(){
        var myDate = new Date();
        var yesterday = new Date(myDate.setTime(myDate.getTime()-24*60*60*1000));
        //console.log(yesterday.getDate())
        var year=yesterday.getFullYear();
        var month=yesterday.getMonth()+1;
        var day=yesterday.getDate();
       $('#dimenTime').val(year+'/'+month+'/'+day);
       var maxDate = year+'/'+month+'/'+day;
        $('#dimenTime').unbind().on('click',function(){
            var limit = $('.rightBar nav.dimenSwi span.activeSpan').data('dimension');
            switch (limit){
                case 'day':WdatePicker({dateFmt:'yyyy/M/d',readOnly:true,isShowClear:false,maxDate:maxDate});break;
                case "month":WdatePicker({dateFmt:'yyyy/M',readOnly:true,isShowClear:false,maxDate:'%y/%M'});break;
                case "year":WdatePicker({dateFmt:'yyyy',readOnly:true,isShowClear:false,maxDate:'%y'});break;
            }
        })
    },
    //曲线图
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
                bottom: '5%',
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
                        color:'#b1b2b2'  //x轴线颜色
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
                        color: ['#ecedf6'], //平行于x轴的虚线颜色
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
                        color:'#b1b2b2'  //y轴线颜色
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
                barWidth: 10,
                // barBorderRadius: 4,
                color:'rgba(77,179,251,1)',
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
                                color: 'rgba(77,179,251,1)',
                            }, {
                                offset: 0,
                                color: 'rgba(77,179,251,1)',
                            }],
                            globalCoord: false
                        },
                    }
                },
                data: lineDatas[0]
            },{
                name: names[1],
                type: 'bar',
                barWidth: 10,
                // barBorderRadius: 4,
                color:'rgba(32,90,167,1)',
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
                                color: 'rgba(32,90,167,1)',
                            }, {
                                offset: 0,
                                color: 'rgba(32,90,167,1)',
                            }],
                            globalCoord: false
                        },
                    }
                },
                data: lineDatas[1]
            }
                ,{
                    name:names[2],
                    type:'bar',
                    data:lineDatas[2],
                    yAxisIndex: 1,
                    barWidth: 10,
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
    //表格报表数据
    comDatatable:function(obj){
        //组织归属电站地区赋值
        var _this = this
        $.http.POST('/report/runReportsTable.do',obj,function(res){
            var orgName = res.body.orgName;
            var areaName = res.body.areaName;
            var time = $('#dimenTime').val();
            $('div.plantInfo span').eq(1).text(orgName).end()
                .eq(3).text(areaName).end()
                .eq(5).text(time).end()
            if(_this.reportTable){
                _this.reportTable.fnClearTable(false);
                _this.reportTable.fnDestroy()
            }
            _this.reportTable = $("#reportTable").dataTable({
                ajax:{
                    type:'POST',
                    url:'/report/runReportsTable.do',
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
                            // console.log('str',str)
                            orderName.push(eval("("+str+")"))
                        });
                        d.orderName = orderName;
                        d.areaId = obj.areaId;
                        d.range=obj.range;
                        d.dimension = obj.dimension;
                        d.length = obj.length;
                        d.tokenId = obj.tokenId;
                        // d.draw = true;
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
                "headerCallback": function( thead, data, start, end, display ) {
                    //    排序图标
                    var orders = [1,2,3,4,5,6,7,8,9];
                    $.each(orders,function (index,item) {
                        var $dom = $(thead).find('th').eq(item);
                        $dom.html($dom.text()+'<b class="orderImg"></b>');
                    })

                },
                //bDestroy:true,
                //pageLength: 10,
                paging:false,
                "scrollY": "370px",
                "scrollCollapse": true,
                bInfo:false,
                serverSide: true,  //启用服务器端分页
                searching: false,  //禁用原生搜索
                //pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容居中 */
                    $('td', row).attr("class", "text-center");
                },
                language:{
                    "sProcessing": "处理中...",
                    "sLengthMenu": "",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "",
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
                    { data: "name" ,title:$.getI18n('plantName'),width:'15%'},
                    { data: "capacity" ,title:$.getI18n('capacityOfPowerStation')+'(KW)'},
                    { data: "inventerNum" ,title:$.getI18n('report.inverterNum')+'('+$.getI18n('platform')+')'},
                    { data: "gen",title:$.getI18n('screen.generatedEleEnergy')+'(kWh)'},
                    { data: "income",title:$.getI18n('report.profit')+'('+$.getI18n('rmb')+')'},
                    { data: "plantRank",title:$.getI18n('report.genNum')+'(kWh)'},
                    { data: "ppr",title:$.getI18n('report.ppr')+'(h)'},
                    { data: "coal" ,title:$.getI18n('report.coal')+'(kg)'},
                    { data: "tree",title:$.getI18n('report.tree')+'('+$.getI18n('tree')+')'},
                    { data: "co2" ,title:$.getI18n('report.co2')+'(kg)'}
                    // {data:'id',"title":'id',"visible":false},
                    // {data:'location','visible':false}
                ]

            })
        });

    },
    //导出数据报表
    exportRep:function(){
        var dimension = $('.activeSpan').data('dimension');
        var time = $('#dimenTime').val();
        window.location = window.URLHREF+"/exports/runReportsExport.do?tokenId="+Cookies.getCook('tokenId')+'&dimension='+dimension+"&areaId="+this.areaId+"&range="+time+"&orderName="+'';
    },
    //去除数组相同的数据，已选择数据不出现在选择框
    /*removeSameData:function(arr1,arr2){
        var arr3 = arr1.concat(arr2)
        console.log(arr3)
        function obj2key(obj, keys){
            var n = keys.length,
                key = [];
            while(n--){
                key.push(obj[keys[n]]);
            }
            return key.join('|');
        }
        //去重操作
        function uniqeByKeys(array,keys){
            var arr = [];
            var hash = {};
            for (var i = 0, j = array.length; i < j; i++) {
                var k = obj2key(array[i], keys);
                if (!(k in hash)) {
                    hash[k] = true;
                    console.log(array[i])
                    // array.splice(i,1)
                    arr.push(array[i]);
                }
            }
            // arr = array
            return arr ;
        }
        //arr1原数据  arr2要剔除的数据
        // var arr3 =[] //返回的新数组
        // console.log('arr2',arr2)
        // var arr3 = arr1
        // var t = arr1;
        // let arr3 = arr1
        // for(var i=0;i<arr2.length;i++){
        //     if(arr2.length>0){
        //         for(var j = 0; j< arr1.length;j++){
        //             if(arr2[i].id==arr1[j].id){
        //                 console.log('i',i)
        //                 console.log('j',j)
        //                 console.log('arr1[j].id',arr1[j].id)
        //                 console.log('arr2[i].id',arr2[i].id)
        //                 arr3.splice(i,1)
        //                 console.log('arr3',arr3)
        //                 console.log('arr1',arr1)
        //             }
        //         }
        //     }
        //     // console.log('13',arr1)
        // }
        // console.log(arr3)
        // function arrayUnique2(arr, name) {
        //     var hash = {};
        //     return arr.reduce(function (item, next) {
        //         hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        //         return item;
        //     }, []);
        // }
        // arr3=arr1
        console.log('hello',uniqeByKeys(arr3,['id']))
        // return uniqeByKeys(arr3,['id','name'])
    }*/

};