/** 2017/10/19
* @author: kj
* @description:
*/
define(function(){
    return PSDPageRender;
});
var PSDPageRender = {
    dataCurveInter:'',//设备数据曲线定时器
    drawDomInterVal:'',//设备数据、状态 定时器
    tableInterVal:[],//表格 定时器
    tables:[],//表格
    deviceId:'',//设备id
    plantId:$('#singlePlantId').val()||'',//电站id
    domId:'deviceListArea',//模块Id
    tableInter:0,
    tableNoData:0,
    nextBtnFlag:0, //监控下翻按钮重复点击标志
    preBtnFlag:0, //监控上翻按钮重复点击标志
    autoChoose:false, //表格数据渲染完后，自动选择行
    curId:'',//当前选中的行
    curCtrol:0, //当前数据、状态、监控
    Render: function (opts) {
        //    Todo Main function
        var _this = this;
        _this.curId='';
        _this.curCtrol=0;
        _this.singlePlantType = opts.singlePlantType;
        $('.deviceTable table').hide()

        _this.drawDomInterVal && clearInterval(_this.drawDomInterVal)
        _this.dataCurveInter && clearInterval(_this.dataCurveInter)
        _this.plantId = $('#singlePlantId').val()||opts.plantId ;
        $('#deviceSwitch').val(new Date().format("yyyy-MM-dd"));

        $('#nanImg').show();
        _this.getAjax();
    },

    setData: function (datas,pre) {
        $.each(datas, function (name,value) {
            $('#'+pre+name).length && $('#'+pre+name).text(value);
        })
    },
    getAjax: function () {

        var _this = this;
        var tableOpt = this.deviceTableOpt;
        _this.tableInter = 0;
        _this.tableNoData = 0;
        $.each(_this.tableInterVal,function (index,item) {
            !! item && clearTimeout( item);
        })
        _this.tableInterVal = []
        !! _this.drawDomInterVal && clearTimeout( _this.drawDomInterVal);
        for(var item in tableOpt){
            //若为光伏电站，则不显示PCS和BMS
            if(Number(_this.singlePlantType)==1){
                if(item == "pcsDevices"){
                    $('#pcsList').parent('.deviceTable').remove()
                    continue
                }else if(item == "bmsDevices"){
                    $('#bmsList').parent('.deviceTable').remove()
                    continue
                }
            }
            _this.setTableData(tableOpt[item])


        }
        // _this.setContainerInter();
    },
    setTableData:function (options) {
        var _this = this;
        if(devicesTable){
            devicesTable.fnClearTable(false);
            devicesTable.fnDestroy()
        }
        var devicesTable = $("#"+options.id).DataTable({
            ajax: {
                type: "POST",
                url:options.url,
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

                    d.plantId=_this.plantId;
                    d.tokenId=Cookies.getCook('tokenId');

                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    (!json.body.data || !json.body.data.length) && (json.body.data=[]);

                    !!json.body.data.length ? $("#"+options.id).show(): $("#"+options.id).hide();

                    _this.tableInter++;

                    if(!json.body.data || !json.body.data.length){
                        _this.tableNoData++;
                        _this.tableNoData==$('.deviceTable').length && (json.body.data=[],$('#deviceDetail').hide(),$('#nanImg').html('<img class="noData" src="/images/NaN.png" alt="">').show())
                    }

                    return json.body.data

                }
            },
            "rowCallback": function( row, data ) {
                if ( data.id == _this.curId ) {
                    // $('#deviceListArea').find(row).click();
                    $(row).addClass('selected')
                    _this.autoChoose = $(row)
                }
            },
            drawCallback:function () {
                if(!$('#'+_this.domId).length){
                    $.each(_this.tableInterVal,function (index,item) {
                        !! item && clearTimeout( item);
                    })
                    return
                }
                var item = this;
                var len = $('.deviceTable').length


                _this.tableInterVal.push(
                    setTimeout(function(){
                        //随时清除定时器
                        if(_this.tableInterVal.length>100){
                            $.each(_this.tableInterVal,function (index,item) {
                                !! item && clearTimeout( item);
                                _this.tableInterVal.shift()
                                if(_this.tableInterVal.length<101){
                                    return false
                                }
                            })
                        }

                        item.api().ajax.reload();
                    },30000)
                )


                if(_this.tableNoData!==len && _this.tableInter == len && $('#deviceListArea tbody tr').length){
                    // !_this.curId ? $('.deviceListArea table:first-of-type:visible tbody tr').eq(0).click():_this.autoChoose.click();
                    if(!_this.curId){
                        for(var i=0;i<len;i++){
                            var $dom = $('.deviceTable table').eq(i);
                            if($dom.is(":visible")){
                                $dom.find('tbody tr').eq(0).click()
                                _this.curCtrol = 0
                                return
                            }
                        }
                    }else {
                        _this.autoChoose.click();
                    }

                    _this.tableInter = 0;
                    _this.tableNoData = 0
                }

               /* var setInter
                if(!_this.mouseIn){
                    setInter = setTimeout(function () {
                        _this.tableInterVal.push(setInter)
                        item.api().ajax.reload();
                    },3000)
                }*/

               // !_this.curId && $('#deviceListArea tbody tr').eq(0).click()
            },
            pageLength: 6,
            "paging": false,
            "ordering": true,
            rowId: 'id',
            "scrollCollapse": true,
            serverSide: true,  //启用服务器端分页
            searching: false,  //禁用原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language:{
                "sProcessing": $.getI18n('tableLanguage.sProcessing'),
                "sLengthMenu": $.getI18n('tableLanguage.sLengthMenu'),
                "sZeroRecords": $.getI18n('tableLanguage.sZeroRecords'),
                "sInfo": $.getI18n('tableLanguage.sInfo'),
                "sInfoEmpty": $.getI18n('tableLanguage.sInfoEmpty'),
                "sInfoFiltered": $.getI18n('tableLanguage.sInfoFiltered'),
                "sInfoPostFix": $.getI18n('tableLanguage.sInfoPostFix'),
                "sSearch": $.getI18n('tableLanguage.sSearch'),
                "sUrl": $.getI18n('tableLanguage.sUrl'),
                "sEmptyTable": $.getI18n('tableLanguage.sEmptyTable'),
                "sLoadingRecords": $.getI18n('tableLanguage.sLoadingRecords'),
                "sInfoThousands": $.getI18n('tableLanguage.sInfoThousands'),
                "oPaginate": {
                    "sFirst": $.getI18n('tableLanguage.oPaginate.sFirst'),
                    "sPrevious": $.getI18n('tableLanguage.oPaginate.sPrevious'),
                    "sNext": $.getI18n('tableLanguage.oPaginate.sNext'),
                    "sLast": $.getI18n('tableLanguage.oPaginate.sLast'),
                    "sJump": $.getI18n('tableLanguage.oPaginate.sJump')
                },
                "oAria": {
                    "sSortAscending": $.getI18n('tableLanguage.oAria.sSortAscending'),
                    "sSortDescending": $.getI18n('tableLanguage.oAria.sSortDescending')
                }
            },
            columns: options.columns

        });

        $('.deviceTable table thead').off('click').click(function(){
            var $dom = $(this).parent('table').find('tbody')
            $dom.is(':visible') ? $dom.hide(): ($dom.show(),_this.autoChoose.addClass('selected'))
        })
        $("#"+options.id ).unbind().on( 'click', 'tbody tr', function (e) {
           /* if ($(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            } else {
                devicesTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }*/

           var flag = false //行不同选中刷新详情
           !_this.curId && (_this.curId = +devicesTable.row( this ).id(), flag = true)
            if(_this.curId !== +devicesTable.row( this ).id()){
                _this.curCtrol = 0
               _this.curId = +devicesTable.row( this ).id()
               $('#deviceListArea tr').removeClass('selected');
               }else {
                if(flag){
                    _this.curCtrol = 0
                }else {
                    _this.curCtrol = -1
                }
            }
            $(this).addClass('selected');
            _this.tableInter = 0;
            _this.tableNoData = 0;
            /*if(!_this.autoChoose){
                $('#pmSinglecontent .pmSingleDevice').mouseenter()
                $('#pmSinglecontent .pmSingleDevice').unbind("mouseenter mouseleave")
                _this.mouseIn=false
                _this.setContainerInter()
            }*/

            // _this.autoChoose = false

            $('#deviceDetail').hide();
            $('#deviceControl').length && $('#deviceControl,#deviceStatus').hide();
            $('#powerCurve').length && $('#powerCurve').css('visibility','hidden');
            if(!devicesTable.row( this ).data()){
                !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);
                $('#deviceDetail').hide();
                $('#nanImg').html('<img class="noData" src="/images/NaN.png" alt="">').show();
                return
            }
            $('#deviceDetail').show();
            $('#nanImg').hide();
            var deviceId = devicesTable.row( this ).data().id;
            var deviceType = devicesTable.row( this ).data().deviceType;
            !!deviceId&&_this.getDetailAjax({
                deviceId:deviceId,
                deviceType:deviceType,
                type:devicesTable.row( this ).data().type
            });

            // _this.autoChoose && (_this.mouseIn=false);
            e.stopPropagation();
        });


        _this.tables.push(devicesTable);
    },
    //设备列表配置
    deviceTableOpt :{
        //采集器
        collectorDevices:{
            id:'collectorList',
            url:'monitor/getCollectorList.do',
            columns: [
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status",render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }}
            ]
        },
        //组串式逆变器
        inverterDevices:{
            id:'inverterList',
            url:'monitor/getInverterList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "power" },
                { data: "genDay" }
            ]
        },
        //集中式逆变器
        cenInverterDevices:{
            id:'cenInverterList',
            url:'monitor/getCenInverterList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "power" },
                { data: "genDay" }
            ]
        },
        //汇流箱监控
        confBoxDevices:{
            id:'confBoxList',
            url:'monitor/getConfBoxList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "voltage" },
                { data: "elecCurrent" }
            ]
        },
        //PCS
        pcsDevices:{
            id:'pcsList',
            url:'monitor/getPCSList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "power" },
                { data: "doe" }
            ]
        },
        //BMS
        bmsDevices:{
            id:'bmsList',
            url:'monitor/getBMSList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "SOC" },
                { data: "resEle" }
            ]
        },
        //电表
        meterDevices:{
            id:'meterList',
            url:'monitor/getMeterList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "peq" },
                { data: "neq" }
            ]
        },
        //箱变
        bcDevices:{
            id:'bcList',
            url:'monitor/getBoxChangeList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "activePower" },
                { data: "voltage" }
            ]
        },
        //环境检测仪
        edDevices:{
            id:'edList',
            url:'/monitor/getEnviroDetectorList.do',
            columns:[
                {
                    "sClass": "text-center",
                    "data": "id",
                    "width": "30",
                    "render": function (data, type, full, meta) {
                        return '';
                    },
                    "bSortable": false,
                },
                { data: "name",render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'">'+data+'</div>';
                }},
                { data: "itr" }
            ]
        },
    },
    getDetailAjax:function (obj) {
        var _this = this;

        var defaultImg = '/images/pmImages/nophoto.png';
        /*switch (Number(obj.deviceType)){
            case 1:
                defaultImg = '/images/pmImages/inverter.png';
                break;
            case 2:
                defaultImg = '/images/pmImages/inverter.png';
                break;
            case 3:
                defaultImg = '/images/pmImages/ammeter.png';
                break;
            case 5:
                defaultImg = '/images/pmImages/collector.png';
                break;
            case 9:
                defaultImg = '/images/pmImages/pcs.png';
                break;
            case 10:
                defaultImg = '/images/pmImages/bms.png';
                break;
        }}*/
        $('#devPower').show()
        //设备基本信息
        $.http.POST('/monitor/deviceDetail.do',{deviceId:obj.deviceId,tokenId:Cookies.getCook('tokenId')},function (result) {
            if(+obj.deviceType === 11){
                $('#devPower').hide()
            }
            _this.setData(result.body,'sp-');
            var value = result.body.image;
            !!value  ? $('#devImg').attr('src',value).one('error',function () {
                $('#devImg').attr('src',defaultImg) }) : $('#devImg').attr('src',defaultImg)
        });
        _this.deviceId = obj.deviceId;
        _this.deviceDatail(obj);
        _this.dataCurve(obj.deviceType);
        $('#deviceDetail').show();
        obj.deviceType !== 11 && obj.deviceType !== 13 && $('#deviceControl').length && $('#deviceControl').show(); //箱变、环境检测仪
        obj.deviceType !== 11 && $('#powerCurve').length && $('#powerCurve').css('visibility','visible');
        obj.deviceType !== 13 && $('#deviceStatus').length && $('#deviceStatus').show(); //环境检测仪

        $('#deviceSwitchBtn').unbind().on('click',function () {

            // _this.setContainerInter();
            _this.dataCurve(obj.deviceType);
        })
    },
    //数据曲线业务
    dataCurve:function (deviceType) {

        if(+deviceType === 11) {
            $('#powerData').html('');
            return
        }
        (this.curCtrol>=0) && $('#powerData').html('<div style="text-align: center;    margin-top: 109px;">'+$.getI18n('loadding')+'</div>');
        var time = $('#deviceSwitch').val();
        var _this = PSDPageRender;
        if(_this.dataCurveInter)clearInterval(_this.dataCurveInter);
        $.http.POST('/monitor/getPowerCurrentOfDevice.do',{tokenId:Cookies.getCook('tokenId'),deviceId:_this.deviceId,dataTime:time},function (result) {
            _this.statisticsCurve(result.body);
        });

        _this.dataCurveInter = setInterval(function () {
            if(main.clearInterCharge(_this.dataCurveInter,_this.domId))return;
            $.http.POST('/monitor/getPowerCurrentOfDevice.do',{tokenId:Cookies.getCook('tokenId'),deviceId:_this.deviceId,dataTime:time},function (result) {
                _this.statisticsCurve(result.body);
            })
        },300000)
    },
    //设备 指令操作
    deviceDatail: function (obj) {
        var _this = this;

        if(main.clearInterCharge(_this.drawDomInterVal,_this.domId))return;
        // var drawDomInterVal = _this.drawDomInterVal;
        //数据切换
        $('#sp-navBar div').unbind().on('click',function () {
            var $this = $(this);
            _this.curCtrol = $this.index('#sp-navBar div')
            $('#sp-navBar div').removeClass('on');
            $this.addClass('on');
            var thisId = $this.attr('attrId');
            var str = '';
            !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);

            switch (Number(thisId)){
                case 1:
                    drawDataDom();
                     _this.drawDomInterVal = setInterval(function () {
                         if(!$('#dataContain').length) {
                             clearInterval(_this.drawDomInterVal);
                             return
                         }
                         drawDataDom(1);
                     },5000);
                    /*$('.dynamicData').mouseenter(function () {
                        !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);
                    });
                    $('.dynamicData').mouseleave(function () {
                        if(main.clearInterCharge(_this.drawDomInterVal,'deviceDataDetail'))return;
                        !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);
                        _this.drawDomInterVal = setInterval(function () {

                            if(!$('#deviceDataDetail').length) {
                                clearInterval(_this.drawDomInterVal);
                                return
                            }
                            drawDataDom();
                        },5000);
                    });*/
                    function drawDataDom(isInter){
                        if(main.clearInterCharge( _this.drawDomInterVal,_this.domId))return;
                        !isInter && $('#dataContain').html($.getI18n('loadding'));
                        $.http.POST('/monitor/deviceStatus.do',{tokenId:Cookies.getCook('tokenId'),type:0,deviceId:obj.deviceId},function (result) {
                            // _this.setData(result.body)

                            var datas = result.body.showData;
                            if(!datas.length){
                                $('#pre-data,#next-data').hide();

                                if(+result.body.deviceType === 5){
                                    $('#dataContain').html('<div style="display:inline-block;color: #666 ">'+"最后一次数据更新于:&nbsp;"+result.body.curTime+'</div>');
                                }else {
                                    $('#dataContain').html($.getI18n('noData'));
                                }
                                return
                            }

                            if(!$('#id0').length){
                                $('#pre-data,#next-data').hide();
                                drawData()
                            }else{
                                $.each(datas,function (index, item) {
                                    if($('#id'+index)){
                                        $('#id'+index).text(item.value)
                                    }else {
                                        drawData()
                                        return false
                                    }
                                })
                            }
                            function drawData(){

                                $('#dataContain').html('<div class="deviceDataDetail sliders" id="deviceDataDetail"></div>');
                                //电表 BMS 箱变 环境检测仪
                                if(Number(result.body.deviceType) === 3||Number(result.body.deviceType) === 10||Number(result.body.deviceType) === 12||Number(result.body.deviceType) === 13){
                                    var $tr = $('<tr></tr>');
                                    var td = '';
                                    // str = $('<div class="statusData" id="statusData"><table></table></div>');
                                    str = $('<table class="sliderItem data-item"></table>');
                                    $.each(datas,function (index, item) {
                                        var tpl = '<td><label title="{{name}}">{{name}}</label>：<span id="id'+index+'" title="{{value}}" class="type'+obj.type+'">{{value}}</span></td>';
                                        td = Mustache.render(tpl, item);
                                        $tr.append($(td));
                                        if((index+1)%4 === 0){
                                            str.append($tr);
                                            $tr = $('<tr></tr>');
                                        }
                                        if((index+1)%24 === 0){
                                            $('#deviceDataDetail').append(str);
                                            str = $('<table class="sliderItem data-item"></table>');
                                        }
                                    });
                                    $('#deviceDataDetail').append(str);
                                    if(datas.length>24){
                                        $('#pre-data').attr('sliderTo','');
                                        $('#next-data').attr('sliderTo','1');
                                        $('#next-data').show()
                                    }
                                }else{
                                    var zl = datas[0];
                                    var jl = datas[1];
                                    var qt = datas[2];
                                    var lis1=0,lis2=0;
                                    var str=[];


                                    var remainder = 0;

                                    var zlContents = renderItem(zl);
                                    var jlContents = renderItem(jl);
                                    var qtContents = renderItem(qt);

                                    var zls = Math.ceil((zlContents.length)/4);
                                    var jls = Math.ceil(jlContents.length/4);
                                    var qts = Math.ceil(qtContents.length/4);

                                    var $box = $('<div class="box clearfix"></div>');
                                    var tit=zls?$.getI18n('devMonitor.dcInput'):jls?$.getI18n('devMonitor.acOutputGen'):qts?$.getI18n('devMonitor.else'):'';
                                    var $dataItem = $('<div class="data-item"></div>').append('<h2>'+tit+'</h2>');
                                    var sliderItem = $('<div class="sliderItem"></div>');
                                    var isNull=true,x=0;
                                    for(var i=0; i <zls ;i++){
                                        for(var j=remainder; j <4 ;j++){
                                            !!zlContents[x] && $box.append(zlContents[x]);
                                            if(!zlContents[x]){
                                                isNull = false

                                            }
                                            x++
                                        }
                                        $dataItem.append($box);
                                        sliderItem.append($dataItem);
                                        isNull && (remainder = 0,str.push(sliderItem),sliderItem = $('<div class="sliderItem"></div>'),$box = $('<div class="box clearfix"></div>'),$dataItem = $('<div class="data-item"></div>').append('<h2>&nbsp;</h2>'));

                                    }
                                    if(zls!=((zlContents.length)/4) || (zlContents.length)%4 === 0){
                                        $box = $('<div class="box clearfix"></div>');
                                        var tit=jls?$.getI18n('devMonitor.acOutputGen'):qts?$.getI18n('devMonitor.else'):'';
                                        var $dataItem = $('<div class="data-item"></div>').append('<h2>'+tit+'</h2>');
                                        // $dataItem = $('<div class="data-item"></div>').append('<h2>交流输出及发电量</h2>');
                                    }
                                    remainder = (zlContents.length+1)%4==0?4:(zlContents.length+1)%4;
                                    isNull && $('#deviceDataDetail').append(str);


                                    var isNull=true,x = 0;
                                    var start = Math.floor(zlContents.length/4);
                                    var end = Math.ceil(zlContents.length/4+jlContents.length/4);
                                    for(var i=start; i <end ;i++){
                                        for(var j=remainder-1; j <4 ;j++){
                                            !!jlContents[x] && $box.append(jlContents[x]);
                                            if(!jlContents[x]){
                                                isNull = false
                                            }
                                            x++
                                        }
                                        $dataItem.append($box);
                                        sliderItem.append($dataItem);
                                        isNull && (remainder = 1,str.push(sliderItem),sliderItem = $('<div class="sliderItem"></div>'),$box = $('<div class="box clearfix"></div>'),$dataItem = $('<div class="data-item"></div>')).append('<h2>&nbsp;</h2>');
                                    }
                                    if(jls!=((jlContents.length)/4) || (zlContents.length + jlContents.length)%4 === 0){
                                        $box = $('<div class="box clearfix"></div>');
                                        var tit=qts?$.getI18n('devMonitor.else'):'';
                                        var $dataItem = $('<div class="data-item"></div>').append('<h2>'+tit+'</h2>');
                                        // $dataItem = $('<div class="data-item"></div>').append('<h2>其他</h2>');
                                    }
                                    isNull && $('#deviceDataDetail').append(str);
                                    remainder = (zlContents.length+jlContents.length+1)%4 === 0? 4:(zlContents.length+jlContents.length+1)%4;


                                    var isNull=true,x=0;
                                    var start = Math.floor(zlContents.length/4+jlContents.length/4);
                                    var end = Math.ceil(zlContents.length/4+jlContents.length/4+qtContents.length/4);
                                    for(var i=start; i <end ;i++){
                                        for(var j=remainder-1; j <4 ;j++){
                                            !!qtContents[x] && $box.append(qtContents[x]);
                                            if(!qtContents[x]){
                                                isNull = false
                                            }
                                            x++
                                        }
                                        $dataItem.append($box);
                                        sliderItem.append($dataItem);
                                        isNull && (remainder = 1,str.push(sliderItem),sliderItem = $('<div class="sliderItem"></div>'),$box = $('<div class="box clearfix"></div>'),$dataItem = $('<div class="data-item"></div>').append('<h2>&nbsp;</h2>'));
                                    }
                                    isNull && $('#deviceDataDetail').append(str);
                                    if(!App.isInteger(zlContents.length/4+jlContents.length/4+qtContents.length/4)){
                                        str.push(sliderItem);
                                        $('#deviceDataDetail').append(str);
                                    }

                                    if($('.box-item').length>4){
                                        $('#pre-data').attr('sliderTo','');
                                        $('#next-data').attr('sliderTo','1');
                                        $('#next-data').show()
                                    }


                                    function renderItem(datas){
                                        var $boxItem = $('<div class="box-item"></div>');
                                        var datasContents = [];
                                        var len = Math.ceil(datas.length/5);
                                        $.each(datas,function (index, item) {
                                            var tpl = '<p><label title="{{name}}">{{name}}</label>：<span id="id'+index+'" title="{{value}}" class="type'+obj.type+'">{{value}}</span></p>';
                                            rows = Mustache.render(tpl, item);
                                            $boxItem.append($(rows));
                                            if((1+index)%6 === 0){
                                                datasContents.push($boxItem);
                                                if(index>0&& index!==datas.length-1){
                                                    $boxItem = $('<div class="box-item"></div>');
                                                }
                                            }
                                        });
                                        if(!App.isInteger(datas.length/6)){
                                            datasContents.push($boxItem)
                                        }
                                        return datasContents
                                    }


                                }

                                $('.sliderItem').css('width',$('#dataContain').width()+'px');
                                $(window).resize(function() {
                                    $('.sliderItem').css('width',$('#dataContain').width()+'px')
                                });
                            }
                        })
                    }

                    break;
                case 2:
                    drawDom();
                     _this.drawDomInterVal = setInterval(function () {
                         if(!$('#statusData').length) {
                             clearInterval(_this.drawDomInterVal);
                             return
                         }
                         drawDom(1);
                     },5000);
                    /*$('.dynamicData').mouseenter(function () {
                        !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);
                    });
                    $('.dynamicData').mouseleave(function () {
                        if(main.clearInterCharge(_this.drawDomInterVal,'statusData'))return;
                        !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);
                         _this.drawDomInterVal = setInterval(function () {
                             if(!$('#statusData').length) {
                                 clearInterval(_this.drawDomInterVal);
                                 return
                             }
                             drawDom();
                         },5000);
                    });*/
                    function drawDom(isInter) {
                        if(main.clearInterCharge(_this.drawDomInterVal,'dataContain'))return;
                        !isInter && $('#dataContain').html($.getI18n('loadding'));
                        $.http.POST('/monitor/deviceStatus.do', {
                            tokenId: Cookies.getCook('tokenId'),
                            type: 1,
                            deviceId: obj.deviceId
                        }, function (result) {
                            // _this.setData(result.body)
                            var datas = result.body;
                            if(!datas.length){
                                $('#pre-data,#next-data').hide();
                                $('#dataContain').html($.getI18n('noData'));
                                return
                            }
                            if(!$('#idStatu0').length){
                                drawData()
                            }else{
                                $.each(datas,function (index, item) {
                                    if($('#idStatu'+index)){
                                        $('#idStatu'+index).removeClass().addClass('status'+item.value)
                                    }else {
                                        drawData()
                                        return false
                                    }
                                })
                            }
                            function drawData() {

                                var $tr = $('<tr></tr>');
                                var td = '';
                                // str = $('<div class="statusData" id="statusData"><table></table></div>');
                                str = $('<table class="sliderItem"></table>');
                                $('#dataContain').html('<div class="statusData sliders" id="statusData"></div>');
                                $.each(datas, function (index, item) {
                                    tpl = '<td title="{{name}}"><b id="idStatu'+index+'" class="status{{value}}"></b><label style="text-align: left">{{name}}</label></td>';
                                    td = Mustache.render(tpl, item);
                                    $tr.append($(td));
                                    if ((index + 1) % 4 === 0) {
                                        str.append($tr);
                                        $tr = $('<tr></tr>');
                                    }
                                    if ((index + 1) % 24 === 0) {
                                        $('#statusData').append(str);
                                        str = $('<table class="sliderItem"></table>');
                                    }
                                });
                                if(!App.isInteger(datas.length/4)){
                                    var flag = 0;
                                    while((datas.length+flag) % 4){
                                        td = '<td title="&nbsp;"><b ></b><label style="text-align: left">&nbsp;</label></td>';
                                        $tr.append($(td));
                                        flag++
                                    }
                                    str.append($tr);
                                }
                                $('#statusData').append(str);
                                $('.sliderItem').css('width', $('#dataContain').width() + 'px');
                                $(window).resize(function () {
                                    $('.sliderItem').css('width', $('#dataContain').width() + 'px')
                                });
                                $('#pre-data,#next-data').hide();
                                if (datas.length > 24) {
                                    $('#pre-data').attr('sliderTo', '');
                                    $('#next-data').attr('sliderTo', '1');
                                    $('#next-data').show()
                                }
                            }
                        })

                    }
                    break;
                case 3:
                    !! _this.drawDomInterVal && clearInterval( _this.drawDomInterVal);
                    $.http.POST('/monitor/deviceStatus.do',{tokenId:Cookies.getCook('tokenId'),type:2,deviceId:obj.deviceId},function (result) {
                        // _this.setData(result.body)

                        var lis1=0,lis2=0;
                        $('#dataContain').html('<div class="monitorData sliders" id="monitorData"></div>');
                        var datas = result.body.setDatas;
                        var btns = result.body.setBtns;
                        if(!datas.length && !btns.length){
                            $('#pre-data,#next-data').hide();
                            $('#dataContain').html($.getI18n('noData'));
                            return
                        }
                        var btnStr = $('<div class="btns sliderItem"></div>');
                        var mItem = $('<div class="ssr mItem"></div>');
                        var flag = false;
                        if(btns.length == 0 ){
                            lis1 = 1;
                        }else{
                            $.each(btns,function (index, item) {
                                if(item.guid === result.body.ykGuid && item.value === result.body.ykValue){
                                    tpl = '<a name="{{value}}" ykGuid="{{guid}}" tiptitle="{{tipTitle}}" tipcontent="{{tipContent}}" class="exuteBtn on">{{label}}</a>';
                                }else
                                    tpl = '<a name="{{value}}" ykGuid="{{guid}}" tiptitle="{{tipTitle}}" tipcontent="{{tipContent}}" class="exuteBtn">{{label}}</a>';
                                var txt = Mustache.render(tpl, item);
                                mItem.append($(txt));
                                flag = false;
                                if((index+1)%4 === 0){
                                    lis1++;
                                    btnStr.append(mItem);
                                    (index!==btns.length-1) && (mItem = $('<div class="ssr mItem"></div>'));
                                    if(App.isInteger(btns.length/4)){
                                        $('#monitorData').append(btnStr);
                                    }
                                }
                                if((index+1)%8 === 0 && !App.isInteger(btns.length/8)){
                                    $('#monitorData').append(btnStr);
                                    btnStr = $('<div class="btns sliderItem"></div>');
                                    mItem = $('<div class="ssr mItem"></div>');
                                }
                            });
                            if(!App.isInteger(btns.length/8)){
                                if(btns.length%4){
                                    lis1++;
                                    btnStr.append(mItem);
                                }
                                $('#monitorData').append(btnStr);
                            }

                        }

                        if(btns.length > 4){
                            $('.pmSinglePlant-box .fourfirSection .monitorData .ssr').css('width','47%');
                        }

                        (!App.isInteger($(".ssr.mItem").length/2) && datas.length) && btnStr.append($('<div class="splitLine mItem"><img src="/images/pmImages/online_3.png" alt=""></div>'));

                        if(datas.length){
                            var dataSet = $('<div class="dataSet mItem"></div>');
                            $('#monitorData').append(dataSet);
                            var td = '';
                            var li2 = 0;
                            // str = $('<div class="statusData" id="statusData"><table></table></div>');
                            var str = $('<div class="sliderItem"></div>');
                            var flag=false;
                            var btnLen = $('.ssr.mItem').length * 4
                            $.each(datas,function (index, item) {
                                tpl = '<p class="rowSet"><label title="{{label}}">{{label}}</label>：<span class="valueUnit"><input validMin={{validMin}} validMax={{validMax}} title="" name="{{guid}}" value="{{value}}" type="text">&nbsp;{{unit}}</span><a class="exuteBtn">'+$.getI18n('devMonitor.execute')+'</a></p>';
                                td = Mustache.render(tpl, item);
                                dataSet.append($(td));
                                flag=false;

                                if((btnLen+index+1)%4 === 0){
                                    if(index<4 && !App.isInteger($('.ssr.mItem').length/2)){
                                        btnStr.append(dataSet)
                                        dataSet = $('<div class="dataSet mItem"></div>');
                                    }else{
                                        str.append(dataSet);
                                        if(index<(datas.length-1)){
                                            dataSet = $('<div class="dataSet mItem"></div>');
                                        }
                                    }

                                }
                                if(index>4 && (btnLen+index+1)%8 === 0){
                                    $('#monitorData').append(str);
                                    if((btnLen+index+1)<(datas.length+btnLen)){
                                        str = $('<div class="sliderItem"></div>');
                                        dataSet = $('<div class="dataSet mItem"></div>');
                                    }
                                }
                            });
                            if(!App.isInteger((btnLen+datas.length)/8)){
                                str.append(dataSet);
                                $('#monitorData').append(str);
                            }
                        }


                        $('.sliderItem').css('width',$('#dataContain').width()+'px');
                        $(window).resize(function() {
                            $('.sliderItem').css('width',$('#dataContain').width()+'px')
                        });
                        $('#pre-data,#next-data').hide();
                        if(($('.ssr').length + $('.dataSet').length)>2){
                            $('#pre-data').attr('sliderTo','');
                            $('#next-data').attr('sliderTo','1');
                            $('#next-data').show()
                        }

                    //    按钮 事件
                        $('.btns .ssr .exuteBtn').on('click',function () {
                            var $this = $(this);

                            /*if($this.hasClass('on')){
                                return
                            }*/
                            App.dialog({
                                title: $this.attr('tiptitle')||$.getI18n('tips'),
                                width: 300,
                                height: 100,
                                maxWidth: document.documentElement.clientWidth - 40,
                                maxHeight: document.documentElement.clientHeight - 42,
                                appendTo: 'body',
                                backdrop: false,
                                modal: true,
                                keyboard: true,
                                content:$this.attr('tipcontent') || $.getI18n('devMonitor.executeTips'),
                                closeEvent: null,
                                isdrag: true,
                                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true},{text:$.getI18n('devMonitor.execute'),type:'imgNoBtn',clickToClose :true,id:'confirmOpr'}]
                            })
                            $('#confirmOpr').on('click',function () {
                                var sendData = {
                                    tokenId:Cookies.getCook('tokenId'),
                                    signalGuid:$this.attr('ykguid'),
                                    signalName:$this.text(),
                                    value:$this.attr('name')
                                };
                                App.alert($.getI18n('devMonitor.executing'));
                                $.http.POST('/monitor/updateValueOfGuid.do',sendData,function (result) {
                                    $('.modal.fade.show').remove();
                                    App.alert({code:result.code,msg:result.msg},function(){
                                        if(result.code === 100){
                                            $('.btns .ssr .exuteBtn').removeClass('on');
                                            $this.addClass('on');
                                        }
                                    });
                                },true,true)
                            })

                        });
                    //    执行 事件
                        $('.rowSet .exuteBtn').on('click',function () {
                            var $this = $(this);
                            var $input = $this.siblings('input');
                            var val = Number($input.val());
                            var min = Number($input.attr('validMin'));
                            var max = Number($input.attr('validMax'));

                            if(max<val || min>val){
                                App.alert($.getI18n('devMonitor.executeError')+min+' ～ '+max);
                                return;
                            }
                            var sendData = {
                                tokenId:Cookies.getCook('tokenId'),
                                signalGuid:$input.attr('name'),
                                signalName:$this.siblings('label').text(),
                                value:val
                            };
                            App.alert($.getI18n('devMonitor.executing'));
                            $.http.POST('/monitor/updateValueOfGuid.do',sendData,function (result) {
                                $('.modal.fade.show').remove();
                                App.alert({code:result.code,msg:result.msg},function(){
                                    /*$.each(_this.tableInterVal,function (index,item) {
                                        !! item && clearTimeout( item);
                                    })
                                    _this.tableInterVal = []
                                    $.each(_this.tables,function (index,item) {
                                        _this.tableInter = 0;
                                        _this.tableNoData = 0;
                                        item.ajax.reload();

                                    })*/

                                    // _this.setContainerInter();
                                });
                            },true,true)
                        })
                    });break;
            }
        });
        (_this.curCtrol>=0) && $('#sp-navBar div').eq(_this.curCtrol).click();
        var inter = 15;
        var inters = '';
        $('#pre-data').unbind('click').on('click',function (e) {
            if( inters ){
                return
            }
            // _this.nextBtnFlag = 1
            var $this = $(this);
            $('#next-data').attr('sliderTo',Number($this.attr('sliderTo')));
            if(Number($this.attr('sliderTo'))===1){
                $this.hide()
                // $('.sliders').css('left','0px');
            }else {
                $('#pre-data').attr('sliderTo',Number($this.attr('sliderTo'))-1);
            }
            var curLeft = $('.sliders').css('left');
            var toLeft = -$('.sliderItem').width()*(Number($('#next-data').attr('sliderTo'))-1);
            slider(parseFloat(curLeft),parseFloat(toLeft) ,1);
            $('#next-data').show();
            // _this.nextBtnFlag = 0
            e.stopPropagation()
        });

        $('#next-data').unbind('click').on('click',function (e) {
            if( inters ){
                return
            }
            // _this.nextBtnFlag = 1
            var $this = $(this);
            // $('.sliders').css('left',-$('.sliderItem').width()*Number($this.attr('sliderTo')))
            var curLeft = $('.sliders').css('left');
            var toLeft = -$('.sliderItem').width()*(Number($this.attr('sliderTo')));
            slider(parseFloat(curLeft),parseFloat(toLeft) ,0);
            $('#pre-data').attr('sliderTo',Number($this.attr('sliderTo')));
            if(Number($this.attr('sliderTo'))===$('#dataContain .sliderItem').length-1){
                $this.hide()
            }else {
                $('#next-data').attr('sliderTo',1+Number($this.attr('sliderTo')));
            }
            $('#pre-data').show();
            // _this.nextBtnFlag = 0
            e.stopPropagation()
        });
        function slider(curLeft,toLeft,flag) {
            var add = (toLeft - curLeft)/inter;
            if(flag){
                //上翻
                add = (toLeft - curLeft)/inter;
                inters = setInterval(function () {
                    if(curLeft < toLeft){
                        curLeft = curLeft + add;
                        $('.sliders').css('left',curLeft + 'px');
                    }else {
                        $('.sliders').css('left',toLeft + 'px');
                        clearInterval(inters)
                        inters = ''
                    }
                },inter)
            }else {
                //下翻
                add = (curLeft - toLeft)/inter;
                inters = setInterval(function () {
                    if(curLeft > toLeft){
                        curLeft = curLeft - add;
                        $('.sliders').css('left',curLeft + 'px');
                    }else {
                        $('.sliders').css('left',toLeft + 'px');
                        clearInterval(inters)
                        inters = ''
                    }
                },inter)
            }
        }
    },
    //设备列表
    /*singelDevices: function (datas) {
        var _this = this;
        var deviceTable = $("#deviceData").DataTable({
            ajax: {
                type: "POST",
                url:"monitor/singelDevices.do",
                // url:"monitor/singelDevices.do",
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
                    })
                    d.orderName = orderName;

                    d.plantId=_this.plantId;
                    d.tokenId=Cookies.getCook('tokenId');
                    // return d
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    !json.body.data && (json.body.data=[],$('#deviceDetail').hide(),$('#nanImg').show())
                    $('#deviceDetail').show();
                    $('#nanImg').hide()
                    return json.body.data
                }
            },
            "initComplete": function(settings, json) {
                !$('#deviceData .dataTables_empty').length && $('#deviceData tbody tr').eq(0).click()
            },
            pageLength: 18,
            "ordering": true,
            serverSide: true,  //启用服务器端分页
            searching: false,  //禁用原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            "createdRow": function (row, data, index) {
                /!* 设置表格中的内容居中 *!/
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
            columns: [
                { data: "deviceName" },
                { data: "status" ,render:function (data, type, full, meta) {
                    return '<div class="status'+full.type+'"><span></span>'+data+'</div>';
                }},
                { data: "genDay" ,render:function (data, type, full, meta) {
                    return '<div style="color: #1BBD00">' +data+'</div>';
                }},
                { data: "power" ,render:function (data, type, full, meta) {
                    return '<div style="color: #1BBD00">' +data+'</div>';
                }}
            ]

        })

        $('#deviceData').unbind().on( 'click', 'tbody tr', function (e) {
            if ($(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            } else {
                deviceTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

            $('#deviceDetail').hide();
            var deviceId = deviceTable.row( this ).data().deviceId;
            var deviceType = deviceTable.row( this ).data().deviceType;
            !!deviceId&&_this.getDetailAjax({
                deviceId:deviceId,
                deviceType:deviceType,
                type:deviceTable.row( this ).data().type,
            });
            e.stopPropagation();
        } );

        _this.tableInterVal = setInterval(function(){
            if(main.clearInterCharge(_this.tableInterVal,this.domId))return;
            deviceTable.ajax.reload();
        },30000)


    },*/
    statisticsCurve: function (datas) {
        if(main.clearInterCharge(this.dataCurveInter,this.domId))return;
        if(!datas.yData.length){
            $('#powerData').html('<div style="text-align: center;    margin-top: 109px;">'+$.getI18n('noData')+'</div>');
            return
        }else{
            (this.curCtrol>=0) && $('#powerData').html('<div id="powerDataEchart" style="width: 100%;height: 100%;\n' +
                '            clear: both"></div>')
        }
        var yName = datas.yName.split(',')
        var option = {
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
            //             str +=  '<div style="color: #a5e2f9">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span>'+datas.yData[i].unit+'</div>'
            //         }
            //         return str;
            //     }
            //
            // },
            color:['#1bbd00','#1395f6'],
            legend: {
                right: '20',
                itemGap: 40,
                icon: 'line',
                textStyle:{
                    color:'#8A8A8A',
                    fontsize:12
                },
                top:'5.5%',
                right:'25%',
                data:''
            },
            grid: {
                top:'20%',
                bottom:'20%',
                left: '6.8%',
                right: '6.8%'
            },
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine:{
                    show:false,
                },
                axisLabel:{
                    textStyle:{
                        color:'#707070'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#AEE1EE'
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
            yAxis: [{
                name:yName[0],
                type: 'value',
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#ecedf6'],
                        type: 'dashed'
                    }
                },
                axisTick:{
                    show:false,
                    alignWithLabel: true
                },
                axisLabel:{
                    textStyle:{
                        color:'#707070'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#AEE1EE'
                    }
                },
                nameTextStyle:{
                    color:'#707070'
                }
            },{
                name:yName[1],
                type: 'value',
                splitLine:{
                    show:false,
                },
                axisLabel:{
                    textStyle:{
                        color:'#707070'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#AEE1EE'
                    }
                },
                nameTextStyle:{
                    color:'#707070'
                }
            }],
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 100,
                    borderColor:'rgba(204,204,204, .5)',
                    backgroundColor:'rgba(205,205,205, .4)',
                    fillerColor:'rgba(205,205,205, 0.1)',
                    dataBackground:{
                        lineStyle:{
                            color:'rgba(1,39,84, 0.35)',
                        }
                    },

                    handleStyle:{
                        color:'rgba(204,204,204, 0.5)',
                        borderColor:'rgba(204,204,204, 0.5)',
                    },
                    textStyle:{
                        color:'#707070'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 1,
                    end: 35
                }
            ],
            series: []
        };


        var legendData = [];
        var powers = datas.yData;
        var yDatas = [];
        var colors = [['RGBA(27, 189, 0, 0.2)','RGBA(27, 189, 0, 0)'],['RGBA(0, 139, 246, 0.2)','RGBA(0, 139, 246, 0)'],['RGBA(255,132,0, 0.2)','RGBA(255,132,0, 0)'],['RGBA(255,75,253, 0.2)','RGBA(255,75,253, 0)']]
        for(var i = 0 ,len = powers.length;i<len;i++){
            legendData.push(powers[i].name+' ('+powers[i].unit+') ');
            yDatas[i] = powers[i].value;
            option.series.push({
                name:powers[i].name+' ('+powers[i].unit+') ',
                type:'line',
                smooth:true,
                yAxisIndex:i===0?0:1,
                data: powers[i].value,
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
                                color: colors[i][0]
                            }, {
                                offset: 1,
                                color: colors[i][1]
                            }],
                            globalCoord: false
                        },
                    }
                }
            });
        }
        option.legend.data = legendData;
        Echarts.render('powerDataEchart', option);
    }
};