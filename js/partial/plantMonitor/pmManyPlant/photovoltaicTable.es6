
define(function () {
    return photovoltaicTable
});
var photovoltaicTable = {
    plantTable:'',//table
    phoTable:'', //储能表格
    interval3:'',
    tableInter:[],
    tableInterStop : false, //展开详情时，表格不刷新
    zkinterval:'',
    domId:'changeRange',
    Render: function () {
        var _this = this;
        _this.tableInter && main.clearTimeCharge(_this.tableInter)

        var plantType = +Cookies.getCook('plantType')

        switch (plantType){
            case 1:
                _this.getArea();
                $('.tableInfo').show()
                $('.phoTableInfo').hide()
                $('.plantType').hide()
                $('.type2').hide();
                $('.type1').show();
                $('.type3').hide();
                break;
            case 2:
                $('.plantType').hide()
                $('.tableInfo').show()
                $('.phoTableInfo').hide()
                $('.type2').show();
                $('.type1').hide();
                $('.type3').hide();
                _this.getStoPlantTable();
                break;
        }
        //点击区域选择，弹出区域
        $('.chooseArea').unbind('click').on('click',function(){
            $('.map-select-box').show()
        });
        //点击× 隐藏
        $('.closeDialog').unbind('click').on('click',function(){
            $('.map-select-box').hide()
        });
        //清空重置范围
        $('#resetPower').on('click',function(){
            $('#powerStart').val('');
            $('#powerEnd').val('');
            $('#capStart').val('');
            $('#capEnd').val('');
            $('#phoStart').val('');
            $('#phoEnd').val('');
            $('#batStart').val('');
            $('#batEnd').val('')
        });
        //电站类型切换
        $('.plantType span').unbind().on('click',function(){
            !!_this.tableInter && main.clearTimeCharge(_this.tableInter)
            $('.plantType span').removeClass('onType');
            $(this).addClass('onType');
            $('.choosePower input').val('');
            $('.closeDialog').click();
            if($(this).data('type')==2){  //储能电站
                $('.tableInfo').show();
                $('.type2').show();
                $('.phoTableInfo').hide();
                $('.type1').hide();
                $('.type3').hide();
                _this.getStoPlantTable()
            }else if($(this).data('type')==3){  //光储电站
                $('.tableInfo').hide();
                $('.type1').hide();
                $('.type2').hide();
                $('.type3').show();
                $('.phoTableInfo').show();
                _this.getOptStoPlantTable()
            }else{                          //光伏电站
                $('.type3').hide();
                $('.type2').hide();
                $('.type1').show();
                $('.tableInfo').show();
                $('.phoTableInfo').hide();
                _this.getArea()
            }

        })
    },
    /*
     * 新版区域上下转
     * */
    /*光伏电站列表*/
    getArea:function(){
        var _this = this;
        function refreshArea(data){
            $.http.POST('/report/getAreaDistribution.do', data, function (result) {
                setCurArea(result.body.areaInfo);
                setCurAreaChildren(result.body.kidsArea,result.body.areaInfo.id);
            })
        }

        //请求获取电站及区域数据
        $('#rootArea').unbind('click').on('click',function () {
            refreshArea({
                tokenId:Cookies.getCook('tokenId'),
                areaId:'',
                status:'',
                type:2,
                plantType:Cookies.getCook('plantType')
            });
            refreshTable({tokenId:Cookies.getCook('tokenId'),areaId:'',range:',',type:2,condition:''});
            $('.navigation-item').remove()
        });
        $('#rootArea').click();
        //设置当前区域节点
        function setCurArea(plantArea){
            $('#io-name').text(plantArea.name);
            $('#io-name').attr('sp-id',plantArea.id);
            $('#io-name').attr('sp-fatherId',plantArea.fatherId);
            if(Number(plantArea.fatherId)===0){
                $('#rootArea').text(plantArea.name);
                _this.areaId = plantArea.id;
            }
        }
        //设置当前区域节点下的子区域
        function setCurAreaChildren(kidsArea,fatherId){
            $('#io-table').html('');
            var $tr = $('<tr></tr>');
            var td = '';
            // var _id = curLoc[0].toString().replace('.','-')+(curLoc[1]).toString().replace('.','-');
            var str = $('#io-table');
            $.each(kidsArea,function (index, item) {
                var tpl = '<td><a class="toNextArea" sp-child="{{hasChild}}" sp-id="{{id}}" sp-fatherId="'+fatherId+'"><span class="plantName">{{name}}</span></a></td>';
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
                _this.areaId = $id;
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$id,
                    type:2,
                    status:'',
                    plantType:Cookies.getCook('plantType')
                });
                navigation({
                    name:$this.find('.plantName').text(),
                    id:$id,
                    fatherId:$fatherId,
                    isAdd:1
                });
                refreshTable({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$id,
                    range:'',
                    condition:'',
                    type:2
                });
                // }

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
                $navItem.data('clusterMsg',obj);
                $navItem.unbind().on('click',function(){
                    var $this = $(this);
                    obj.isAdd = !1;
                    if(Number($navItem.data('clusterMsg').fatherId) === 0)return;
                    navigation(obj);
                    _this.areaId = $navItem.data('clusterMsg').id;
                    refreshArea({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id,
                        type:2,
                        status:'',
                        plantType:Cookies.getCook('plantType')
                    });
                    refreshTable({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id?$navItem.data('clusterMsg').id:'',
                        range:'',
                        condition:'',
                        type:2
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
        $('#choosePower').unbind('click').on('click',function(){  //当前区域下范围查找
            rangePlant()
        });
        $('.searchPlantInfo').unbind('click').on('click',function(){  //当前区域下范围下查找关键字
            conditionPlant()
        });

        //模糊搜索
        //searchPlant ()
        function searchPlant () {
            // $('#searchInfoBox input').on('focus',function(){
            //     //alert(1)
            //     var plantName = $('#searchInfo').val();
            // })
            $('.searchPlant input').bind('input propertychange',function(){
                var plantName = $('#searchInfo').val();
                $.http.POST('/monitor/fuzzySearchPlant.do',{tokenId:Cookies.getCook('tokenId'),plantName:plantName,plantType:Cookies.getCook('plantType')},function(res){
                    if(res.body.plantList.length!=0){
                        $('.plantContain').show();
                        var html ='';
                        $.each(res.body.plantList,function(i,val){
                            html+='<a data-id="'+val.plantId+'">'+val.plantName+'</a>'
                        });
                        $('.plantContain .pnContainer').html(html);
                        //点击a选中
                        $('.plantContain .pnContainer a').on('click',function(){
                            $('#searchInfo').val($(this).text());
                            $('.plantContain').hide();
                        });

                        $('body').unbind('click').on('click',function () {
                            $('.plantContain .serchBox').unbind('click').on('click',function () {

                            });
                            $('.plantContain').hide();
                        })
                    }
                })
            })
        }
        //表格数据更新
        function refreshTable(obj){
            if(_this.plantTable){
                _this.plantTable.fnClearTable(false);
                _this.plantTable.fnDestroy()
            }
            var _status = ''; //状态
            _this.plantTable = $('#plantTable').dataTable({
                ajax:{
                    type:'POST',
                    url:'/monitor/plantDist.do',
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
                        d.type = obj.type;
                        d.range=obj.range;
                        d.condition = obj.condition;
                        d.areaId = obj.areaId;
                        d.tokenId = obj.tokenId;
                        d.status = _status;
                        return JSON.stringify(d)
                    },
                    dataSrc: function(json){
                        Number(json.code) == 104 && App.alert(json);
                        json.recordsTotal = json.body.recordsTotal;
                        json.recordsFiltered = json.body.recordsFiltered;
                        !json.body.plantsInfo && (json.body.plantsInfo=[]);
                        return json.body.plantsInfo
                    }
                },
                rowId: 'id',
                "headerCallback": function( thead, data, start, end, display ) {
                    //定时渲染则不重新绘制下拉
                    if(_this.tableInter && $('#status').length) return
                    //状态
                    var statusStr=
                        '            <select name="status" id="status">\n' +
                        '                <option value="">'+$.getI18n('status')+'</option>\n' +
                        '                <option value="0">'+$.getI18n('gen')+'</option>\n' +
                        '                <option value="1">'+$.getI18n('standby')+'</option>\n' +
                        '                <option value="2">'+$.getI18n('fault')+'</option>\n' +
                        '                <option value="3">'+$.getI18n('break')+'</option>\n' +
                        '                <option value="4">'+$.getI18n('abnormal')+'</option>\n' +
                        '            </select>';
                    $(thead).find('th').eq(4).html( statusStr);
                    $('#status').change(function (e) {
                        !!_this.tableInter && main.clearTimeCharge(_this.tableInter)
                    })
                    _status && $('#status').val(_status);
                    //    排序图标
                    var orders = [2,6,7];
                    $.each(orders,function (index,item) {
                        var $dom = $(thead).find('th').eq(item);
                        $dom.html($dom.text()+'<b class="orderImg"></b>');
                    });
                    bindSelectEvent();
                },
                'drawCallback':function(set){
                    if(main.clearTimeCharge(_this.tableInter,_this.domId))return;
                    _this.tableInterStop = false
                    _this.tableInter.push(setTimeout(function(){
                        if(_this.tableInterStop)return
                        main.clearTimeCharge(_this.tableInter)
                        _this.plantTable.fnDraw(false);
                    },5000))
                },
                bSort:true,
                bInfo:false,
                pageLength: 10,
                serverSide: true,  //启用服务器端分页
                searching: false,  //原生搜索
                pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
                paging:true,
                bPaginate:true,
                stateSave : false,//记住分页
                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容居中 */
                    $('td', row).attr("class", "text-left");
                },
                language:{
                    "sProcessing": $.getI18n('tableLanguage.sProcessing'),
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
                columns:[
                    { data: "name" ,title:$.getI18n('plantName'),width:'14%',render:function(data,type, full, meta){
                        return '<div class="td-noWrap td-plantName" title="'+data+'">'+'<i><img src="/images/pmImages/arrow_1.png" alt=""></i>'+data+'</div>'
                    }},
                    { data: "addr",title:$.getI18n('address'),width:'12%',render:function (data, type, full, meta) {
                        return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                    }},
                    { data: "capacity",title:$.getI18n('plantMon.capacity')+'(千瓦)',width:'7%'},
                    { data: "weather",title:$.getI18n('screen.weather'),width:'7%',render:function(data){
                        return '<image src="'+data+'" style="width: 30px; height: 30px"></image>'
                    }},
                    { data: "status" ,title:$.getI18n('status'),width:'10%',render:function (data, type, full, meta) {
                        if(data=='0'){
                            return '<i class="cl1"></i><span class="cl1">'+$.getI18n('gen')+'</span>'
                        }else if(data=='1'){
                            return '<i class="cl2"></i><span class="cl2">'+$.getI18n('standby')+'</span>'
                        }else if(data=='2'){
                            return '<i class="cl3"></i><span class="cl3">'+$.getI18n('fault')+'</span>'
                        }else if(data=='3'){
                            return '<i class="cl4"></i><span class="cl4">'+$.getI18n('break')+'</span>'
                        }else{
                            return '<i class="cl5"></i><span class="cl5">'+$.getI18n('abnormal')+'</span>'
                        }
                    }},
                    { data: "genDay",title:$.getI18n('genToday')+'(度)' ,width:'11%'},
                    { data: "genTotal",title:$.getI18n('totalPowerGen')+'(度)',width:'11%'},
                    { data: "ppr" ,title:$.getI18n('ppr')+'(小时)',width:'10%'},
                    { data: "contacts" ,title:$.getI18n('contacts'),width:'9%'},
                    { data: "contectsTel",title:$.getI18n('telephone'),width:'8%'},
                ],
                "order": [
                    // [2, "desc"]
                ],
                'columnDefs':[
                    {
                        'orderable':false,'targets':[0,1,3,4,5,8,9],
                    }
                ]
            });
            function bindSelectEvent(){
                $('#status').change(function () {
                    _status = $(this).val();
                    _this.plantTable &&  _this.plantTable.api().ajax.reload();
                })
            }
            var table = _this.plantTable;
            $('#plantTable tbody tr').unbind('click');
            var ind = -1;

            $('#plantTable').unbind('click').on( 'click', 'tbody tr:not(.appendTr)', function (e) {
                var $this = $(this);
                var _this1 = this;
                var map;
                var index = _this.plantTable.api(true).row( _this1 ).index();
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $(this).find('td').eq(0).find('img').attr('src','/images/pmImages/arrow_1.png');
                    _this.plantTable.api(true).row(index).remove().draw(false)
                } else {
                    !!_this.tableInter && main.clearTimeCharge(_this.tableInter)
                    _this.tableInterStop = true
                    _this.plantTable.$('tr.selected').find('td').eq(0).find('img').attr('src','/images/pmImages/arrow_1.png');
                    $('#plantTable tr.selected').length && $('#plantTable tr.selected').removeClass('selected').siblings('tr.appendTr').remove();
                    $(this).addClass('selected');
                    $(this).find('td').eq(0).find('img').attr('src','/images/pmImages/arrow.png');
                    drawDetail();
                }

                function drawDetail(){
                    var tdHtml = '';
                    tdHtml ='<tr style="width: 100%" class="appendTr '+index+'">\n' +
                        '                <td colspan="12" style="padding-left: 0; line-height: 0">\n' +
                        '                    <div class="plantFoot" style="width: 100%">\n' +
                        '                        <div class="detailBox fl gcDetailBox image-effect-fall-back">\n' +
                        '                            <div class="image-layer"><img src="" alt=""></div>\n' ;
                    if(!!window.systemRole['singlePlantMonView']){
                        tdHtml+='<div class="share-layer"><a class="toSinglePlant">'+$.getI18n('seeDetail')+'</a></div>\n'
                    }
                    tdHtml+= '                        </div>\n' +
                        '                        <div class="locationBox fl gcLocation" id="plantLocation"></div>\n' +
                        '                        <div class="lineBox fl gcLineBox" id="linePowerBox"></div>\n' +
                        '                        <div class="ptBox fr gcPtBox">\n' ;
                    if(!!window.systemRole['deviceControlEdit']){
                        tdHtml+='                            <p class="totalDev"></p>\n' +
                            '                            <p class="devNormal devNormal1  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devFault devNormal1 hd"><i></i><b></b></p>\n' +
                            '                            <p class="devBreak devNormal1 hd"><i></i><b></b></p>\n' +
                            '                            <p class="devStandby devNormal1 hd"><i></i><b></b></p>\n'
                    }else{
                        tdHtml+='                            <p class="totalDev"></p>\n' +
                            '                            <p class="devNormal   hd"><i></i><b></b></p>\n' +
                            '                            <p class="devFault  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devBreak  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devStandby  hd"><i></i><b></b></p>\n'
                    }
                    tdHtml+=
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </td>\n' +
                        '            </tr>';
                    $this.after(tdHtml);
                    // if(!!window.systemRole['singlePlantMonView']){
                    //     var cur = '.'+'appendTr'+index;
                    //     console.log($(cur).find('.share-layer').text())
                    //     var aHtml ='<a class="toSinglePlant">'+$.getI18n('seeDetail')+'</a>\n'
                    //     $(cur).find('.share-layer').html(aHtml)
                    // }
                    var id = _this.plantTable.api(true).row( _this1 ).data().id;
                    var singlePlantType = _this.plantTable.api(true).row( _this1 ).data().singlePlantType;
                    var status = _this.plantTable.api(true).row( _this1 ).data().status;
                    plantInfoById();
                    function plantInfoById() {
                        $.http.POST('/monitor/plantOpen.do?tokenId='+Cookies.getCook('tokenId'),{plantId:id},function (res) {
                            //设备数量
                            var value = res.body[0].image;
                            !!value  ? $('.detailBox img').attr('src',value).one('error',function () {
                                $('.detailBox img').attr('src','/images/defaultPlant.png') }) : $('.detailBox img').attr('src','/images/defaultPlant.png');
                            $('.ptBox .totalDev').text($.getI18n('total')+res.body[0].deviceNum+$.getI18n('platDev'));
                            if(res.body[0].fault){
                                $('.ptBox .devFault').find('b').text($.getI18n('fault')+res.body[0].fault+$.getI18n('platform'));
                                $('.ptBox .devFault').show()
                            }
                            if(res.body[0].break){
                                $('.ptBox .devBreak').find('b').text($.getI18n('break')+res.body[0].break+$.getI18n('platform'));
                                $('.ptBox .devBreak').show()
                            }
                            if(res.body[0].normal){
                                $('.ptBox .devNormal').find('b').text($.getI18n('normal')+res.body[0].normal+$.getI18n('platform'));
                                $('.ptBox .devNormal').show()
                            }
                            if(res.body[0].standby){
                                $('.ptBox .devStandby').find('b').text($.getI18n('standby')+res.body[0].standby+$.getI18n('platform'));
                                $('.ptBox .devStandby').show()
                            }
                            //地址
                            require(['MapUtil'],function (MapUtil) {
                                var item = res.body[0];
                                !map && (map = MapUtil.Instance('plantLocation', {
                                    center: [item.location[0],item.location[1]] || [],
                                    zoomControl: false,
                                    attributionControl: false,
                                    layers: [L.tileLayer.provider('GaoDe.Normal.Map')],
                                    zoom: 12,
                                    controls: {
                                        zoomControl: {
                                            show: false
                                        },
                                        scaleControl: {
                                            show: false
                                        }
                                    }
                                }).option.map);
                                var _marker = MapUtil.createMarker([item.location[0],item.location[1]],
                                    {

                                        isDivIcon: true,
                                        className: 'plant-icon',
                                        html: '<div class="plantIcon" style=""><div sp-id="'+item.id+'" class="plantImg plantIcon'+status+'"></div></div>',
                                        tooltip:item.name,
                                        // tooltip:item.name,
                                        iconSize: [32, 50],
                                        riseOnHover:false
                                    }
                                );
                                MapUtil.addMarker(map,_marker);
                            });
                            // this.linePowerData(res)
                            //功率曲线
                            var datas = res.body[0].powerCurve;
                            linePowerData(datas);
                            // if(main.clearInterCharge(_this.interval3,_this.domId))return;
                            // _this.interval3=setInterval(function(){
                            //     console.log(12415)
                            //     $.http.POST('/monitor/plantOpen.do?tokenId='+Cookies.getCook('tokenId'),{plantId:id},function(res){
                            //         linePowerData(res.body[0].powerCurve)
                            //     })
                            // },1000);
                            function linePowerData (datas) {
                                var xData = datas.xData,yData1=datas.yData1,yData2=datas.yData2;

                                var option = {
                                    tooltip:{
                                        // trigger:'axis',
                                        // axisPointer:{
                                        //     lineStyle: {
                                        //         color: '#ff8400'
                                        //     }
                                        // },
                                        formatter:function(item){
                                            if(!item[1])return;
                                            var str = '<div style="color: #333;">'+item[0].axisValue+'</div><img style="position: absolute;left: -10px;top:10px" class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAYAAAAW5GZjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQjg1MzFFRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQjg1MzFGRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NERCODUzMUNFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NERCODUzMURFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qIb73AAABN0lEQVR42mL4//8/Az588uRJ8zNnznz9/v37fyYGPODUqVM2TExMO1RUVLg4ODgY8JkYAjTx28ePH//DAAsW0xiBVBM7O3u1qqoqIxcXF1yOBU0hD5BazMvLGwBUyMDCgmoWC5JCSSC1TUxMzEBeXp6BkZERww8sUIUyQOqAtLS0MhDj9DAj0COcQPqkjIyMrpSUFL7AYQAFXZWgoCBBhTDFCbKysgzEAJBiAVZWVqIV737z5g3RimufPHny88ePH4QVm5mZXf3792/WzZs3///69Qu/aqS0UHTx4sX/P3/+/I8LoCee0gsXLvwDOomwYqiGlHPnzv359u0bYcVQDeFnz579+eXLF8KKoRq8gekZRQOhLBV9/vz5fzBPMxChofzatWtgxUxERFzX58+fT759+5YBIMAAY/x/DWAwTZ8AAAAASUVORK5CYII=" alt="">';
                                            if(item[1].data!='null'){
                                                str +=  '<div style="color: #333">'+item[1].seriesName+': <span style="font-size: 1.3em">'+item[1].data+'</span>'+datas.unit+'</div>'
                                            }else{
                                                //str +=  '<div style="color: #a5e2f9">'+item[1].seriesName+': <span style="font-size: 1.3em">'+item[1].data+'</span>'+datas.unit+'</div>'
                                                str+=''
                                            }
                                            return str;
                                        }

                                    },
                                    color:['#0bb80b'],
                                    grid: {
                                        top:'17%',
                                        bottom:'15%',
                                        left: '6%',
                                        right: '2%'
                                    },
                                    xAxis: {
                                        // name:'日',
                                        boundaryGap: ['50%', '50%'],
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
                                                color:'#333'
                                            }
                                        },
                                        axisLine:{
                                            lineStyle:{
                                                color:'#b1b2b2'
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
                                    yAxis: [{
                                        name:'功率('+datas.unit+')',
                                        type: 'value',
                                        splitNumber:5,
                                        splitLine:{
                                            show:true,
                                            lineStyle:{
                                                color: ['#ecedf6'],
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
                                        type:'line',
                                        data: yData2,
                                        showSymbol: false,
                                        smooth: false,
                                        symbolSize: 0,
                                        // yAxisIndex: 0,
                                        itemStyle:{
                                            normal:{
                                                lineStyle:{
                                                    width:1,
                                                    color:'rgba(153,153,153,1)',
                                                    type:'dashed'  //'dotted'虚线 'solid'实线
                                                }
                                            }
                                        },
                                        markLine: {
                                            symbolSize:[30,30],
                                            symbol:['','image:///images/pmImages/sun.png'],
                                            lineStyle:{
                                                normal:{
                                                    type:'dashed',
                                                    color:'#ff8400',
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
                                    },{
                                        name:$.getI18n('ass.power'),
                                        type:'line',
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
                                                        color: 'rgba(1,181,1, .2)',
                                                    }, {
                                                        offset: 1,
                                                        color: 'rgba(1,181,1, .2)',
                                                    }],
                                                    globalCoord: false
                                                },
                                            }
                                        }
                                    }]
                                };
                                Echarts.render('linePowerBox', option);
                            }
                        })
                    }

                    $('.toSinglePlant').unbind().on('click',function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id});
                    });
                    $('.devNormal1').unbind().on('click',function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id},function(){
                            $('#navTitBar div').eq(1).click()
                        });
                    })
                }

                // e.stopPropagation();
                // return;
            } );

        }
        //搜索范围
        function rangePlant() {
            var rg = '';
            var rangeStart = $('#powerStart').val();
            var rangeEnd = $('#powerEnd').val();
            rg = rangeStart+','+rangeEnd;
            var con = $('#searchInfo').val();
            var id = $('#io-name').attr('sp-id')?$('#io-name').attr('sp-id'):'';
            refreshTable({range:rg,areaId:id,tokenId:Cookies.getCook('tokenId'),type:2,condition:con})

        }
        function conditionPlant() {
            var con = $('#searchInfo').val();
            var id = $('#io-name').attr('sp-id')?$('#io-name').attr('sp-id'):'';
            var rangeStart = $('#powerStart').val();
            var rangeEnd = $('#powerEnd').val();
            var rg = rangeStart+','+rangeEnd;
            refreshTable({range:rg,areaId:id,condition:con,tokenId:Cookies.getCook('tokenId'),type:2})
        }
    },
    //储能电站获取电站列表
    getStoPlantTable:function(){
        var _this = this;
        function refreshArea(data){
            $.http.POST('/report/getAreaDistribution.do', data, function (result) {
                setCurArea(result.body.areaInfo);
                setCurAreaChildren(result.body.kidsArea,result.body.areaInfo.id);
            })
        }

        //请求获取电站及区域数据
        $('#rootArea').unbind('click').on('click',function () {
            refreshArea({
                tokenId:Cookies.getCook('tokenId'),
                areaId:'',
                status:'',
                type:2,
                plantType:Cookies.getCook('plantType')
            });
            refreshTable({tokenId:Cookies.getCook('tokenId'),areaId:'',range:',',type:2,condition:''});
            $('.navigation-item').remove()
        });
        $('#rootArea').click();
        //设置当前区域节点
        function setCurArea(plantArea){
            $('#io-name').text(plantArea.name);
            $('#io-name').attr('sp-id',plantArea.id);
            $('#io-name').attr('sp-fatherId',plantArea.fatherId);
            if(Number(plantArea.fatherId)===0){
                $('#rootArea').text(plantArea.name);
                _this.areaId = plantArea.id;
            }
        }
        //设置当前区域节点下的子区域
        function setCurAreaChildren(kidsArea,fatherId){
            $('#io-table').html('');
            var $tr = $('<tr></tr>');
            var td = '';
            var str = $('#io-table');
            $.each(kidsArea,function (index, item) {
                var tpl = '<td><a class="toNextArea" sp-child="{{hasChild}}" sp-id="{{id}}" sp-fatherId="'+fatherId+'"><span class="plantName">{{name}}</span></a></td>';
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
                _this.areaId = $id;
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$id,
                    type:2,
                    status:'',
                    plantType:Cookies.getCook('plantType')
                });
                navigation({
                    name:$this.find('.plantName').text(),
                    id:$id,
                    fatherId:$fatherId,
                    isAdd:1
                });
                refreshTable({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$id,
                    range:'',
                    condition:'',
                    type:2
                });
                // }

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
                $navItem.data('clusterMsg',obj);
                $navItem.unbind().on('click',function(){
                    var $this = $(this);
                    obj.isAdd = !1;
                    if(Number($navItem.data('clusterMsg').fatherId) === 0)return;
                    navigation(obj);
                    _this.areaId = $navItem.data('clusterMsg').id;
                    refreshArea({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id,
                        type:2,
                        status:'',
                        plantType:Cookies.getCook('plantType')
                    });
                    refreshTable({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id?$navItem.data('clusterMsg').id:'',
                        range:'',
                        condition:'',
                        type:2
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
        $('#choosePower').unbind('click').on('click',function(){  //当前区域下范围查找
            rangePlant()
        });
        $('.searchPlantInfo').unbind('click').on('click',function(){  //当前区域下范围下查找关键字
            conditionPlant()
        });
        //表格数据更新
        function refreshTable(obj){
            if(_this.plantTable){
                _this.plantTable.fnClearTable(false);
                _this.plantTable.fnDestroy()
            }
            var _status = ''; //状态
            var _plantType = ''; //类型
            _this.plantTable = $("#plantTable").dataTable({
                ajax:{
                    type:'POST',
                    url:'/monitor/getStoList.do',
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
                        d.range = obj.range;
                        d.condition = obj.condition;
                        d.areaId = obj.areaId;
                        d.tokenId = obj.tokenId;
                        d.status = _status;
                        d.plantType = _plantType;
                        return JSON.stringify(d)
                    },
                    dataSrc: function(json){
                        Number(json.code) == 104 && App.alert(json);
                        json.recordsTotal = json.body.recordsTotal;
                        json.recordsFiltered = json.body.recordsFiltered;
                        !json.body.plantsInfo && (json.body.plantsInfo=[]);
                        return json.body.plantsInfo
                    }
                },
                'drawCallback':function(set){
                    if(main.clearTimeCharge(_this.tableInter,_this.domId))return;
                    _this.tableInterStop = false
                    _this.tableInter.push(setTimeout(function(){
                        if(_this.tableInterStop)return
                        main.clearTimeCharge(_this.tableInter)
                        _this.plantTable.fnDraw(false);
                    },5000))
                },
                rowId: 'id',
                "headerCallback": function( thead, data, start, end, display ) {
                    //状态
                    var statusStr=
                        '            <select name="status" id="status">\n' +
                        '                <option value="">'+$.getI18n('status')+'</option>\n' +
                        '                <option value="0">'+$.getI18n('gen')+'</option>\n' +
                        '                <option value="1">'+$.getI18n('standby')+'</option>\n' +
                        '                <option value="2">'+$.getI18n('fault')+'</option>\n' +
                        '                <option value="3">'+$.getI18n('break')+'</option>\n' +
                        '                <option value="4">'+$.getI18n('abnormal')+'</option>\n' +
                        '            </select>';
                    $(thead).find('th').eq(4).html( statusStr);
                    _status && $('#status').val(_status);
                    //电站类型
                    var typeStr=
                        '            <select name="plantType" id="plantType" style="width: 84%">\n' +
                        '                <option value="">类型</option>\n' +
                        // '                <option value="0">分布式</option>\n' +
                        '                <option value="1">工商业电站</option>\n' +
                        '                <option value="2">户用电站</option>\n' +
                        '                <option value="3">扶贫电站</option>\n' +
                        '            </select>';
                    $(thead).find('th').eq(3).html( typeStr);
                    _plantType && $('#plantType').val(_plantType);
                    //    排序图标
                    var orders = [2,6,7,8];
                    $.each(orders,function (index,item) {
                        var $dom = $(thead).find('th').eq(item);
                        $dom.html($dom.text()+'<b class="orderImg"></b>');
                    });
                    bindSelectEvent();
                },
                bSort:true,
                bInfo:false,
                pageLength: 10,
                serverSide: true,  //启用服务器端分页
                searching: false,  //原生搜索
                pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
                paging:true,
                bPaginate:true,
                stateSave : false,//记住分页
                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容居中 */
                    $('td', row).attr("class", "text-left");
                },
                language:{
                    "sProcessing": $.getI18n('tableLanguage.sProcessing'),
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
                columns:[
                    { data: "name" ,title:$.getI18n('plantName'),width:'14%',render:function(data,type, full, meta){
                        return '<div class="td-noWrap td-plantName" title="'+data+'">'+'<i><img src="/images/pmImages/arrow_1.png" alt=""></i>'+data+'</div>'
                    }},
                    { data: "addr",title:$.getI18n('address'),width:'12%',render:function (data, type, full, meta) {
                        return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                    }},
                    { data: "capacity",title:$.getI18n('plantMon.capacity')+'(度)',width:'7%'},
                    { data: "plantType",title:$.getI18n('alarmType'),width:'9%'},
                    { data: "status" ,title:$.getI18n('status'),width:'8%',render:function (data, type, full, meta) {
                        if(data=='0'){
                            return '<i class="cl1"></i><span class="cl1">'+$.getI18n('gen')+'</span>'
                        }else if(data=='1'){
                            return '<i class="cl2"></i><span class="cl2">'+$.getI18n('standby')+'</span>'
                        }else if(data=='2'){
                            return '<i class="cl3"></i><span class="cl3">'+$.getI18n('fault')+'</span>'
                        }else if(data=='3'){
                            return '<i class="cl4"></i><span class="cl4">'+$.getI18n('break')+'</span>'
                        }else{
                            return '<i class="cl5"></i><span class="cl5">'+$.getI18n('abnormal')+'</span>'
                        }
                    }},
                    { data: "weather",title:$.getI18n('screen.weather'),width:'7%',render:function(data){
                        return '<image src="'+data+'" style="width: 30px; height: 30px"></image>'
                    }},
                    { data: "charToday",title:$.getI18n('chargeToday')+'(度)' ,width:'11%'},
                    { data: "disCharToday",title:$.getI18n('dischargeToday')+'(度)',width:'11%'},
                    { data: "soc" ,title:'SOC',width:'10%'},
                    { data: "sysEfficiency" ,title:$.getI18n('sysEfficiency'),width:'9%'},
                ],
                "order": [
                    // [2, "desc"]
                ],
                'columnDefs':[
                    {
                        'orderable':false,'targets':[0,1,3,4,5,9],
                    }
                ]
            });
            function bindSelectEvent(){
                $('#status').change(function () {
                    _status = $(this).val();
                    _this.plantTable &&  _this.plantTable.api().ajax.reload();
                })
                $('#plantType').change(function () {
                    _plantType = $(this).val();
                    _this.plantTable &&  _this.plantTable.api().ajax.reload();
                })
            }
            var table = _this.plantTable;
            $('#plantTable tbody tr').unbind('click');
            $('#plantTable').unbind('click').on( 'click', 'tbody tr:not(.appendTr)', function (e) {
                var $this = $(this);
                var _this1 = this;
                var map;
                var index = _this.plantTable.api(true).row( _this1 ).index();
                if ($(this).hasClass('selected') ) {
                    $(this).removeClass('selected');
                    $(this).find('td').eq(0).find('img').attr('src','/images/pmImages/arrow_1.png');
                    _this.plantTable.api(true).row(index).remove().draw(false)
                } else {
                    !!_this.tableInter && main.clearTimeCharge(_this.tableInter)
                    _this.tableInterStop = true
                    _this.plantTable.$('tr.selected').find('td').eq(0).find('img').attr('src','/images/pmImages/arrow_1.png');
                    $('#plantTable tr.selected').length && $('#plantTable tr.selected').removeClass('selected').siblings('tr.appendTr').remove();
                    $(this).addClass('selected');
                    $(this).find('td').eq(0).find('img').attr('src','/images/pmImages/arrow.png');
                    drawDetail();
                }

                function drawDetail(){
                    var tdHtml = '';
                    var _that = _this;
                    tdHtml ='<tr style="width: 100%" class="appendTr '+index+'">\n' +
                        '                <td colspan="12" style="padding-left: 0; line-height: 0">\n' +
                        '                    <div class="plantFoot" style="width: 100%">\n' +
                        '                        <div class="detailBox fl gcDetailBox image-effect-fall-back">\n' +
                        '                            <div class="image-layer"><img src="" alt=""></div>\n' ;
                    if(!!window.systemRole['singlePlantMonView']){
                        tdHtml+='<div class="share-layer"><a class="toSinglePlant">'+$.getI18n('seeDetail')+'</a></div>\n'
                    }
                    tdHtml+= '                        </div>\n' +
                        '                        <div class="locationBox fl gcLocation" id="plantLocation2"></div>\n' +
                        '                        <div class="lineBox fl gcLineBox" id="linePowerBox2"></div>\n' +
                        '                        <div class="ptBox fr gcPtBox">\n' ;
                    if(!!window.systemRole['deviceControlEdit']){
                        tdHtml+='                            <p class="totalDev"></p>\n' +
                            '                            <p class="devNormal devNormal1  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devFault devNormal1 hd"><i></i><b></b></p>\n' +
                            '                            <p class="devBreak devNormal1 hd"><i></i><b></b></p>\n' +
                            '                            <p class="devStandby devNormal1 hd"><i></i><b></b></p>\n'
                    }else{
                        tdHtml+='                            <p class="totalDev"></p>\n' +
                            '                            <p class="devNormal   hd"><i></i><b></b></p>\n' +
                            '                            <p class="devFault  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devBreak  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devStandby  hd"><i></i><b></b></p>\n'
                    }
                    tdHtml+=
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </td>\n' +
                        '            </tr>';
                    $this.after(tdHtml);
                    var id = _this.plantTable.api(true).row( _this1 ).data().id;
                    var singlePlantType =  _this.plantTable.api(true).row( _this1 ).data().singlePlantType;
                    var status = _this.plantTable.api(true).row( _this1 ).data().status;
                    plantInfoById();
                    function plantInfoById() {
                        $.http.POST('/monitor/getPlantOpen.do?tokenId='+Cookies.getCook('tokenId'),{plantId:id},function (res) {
                            //设备数量
                            var value = res.body[0].image;
                            !!value  ? $('.detailBox img').attr('src',value).one('error',function () {
                                $('.detailBox img').attr('src','/images/defaultPlant.png') }) : $('.detailBox img').attr('src','/images/defaultPlant.png');
                            $('.ptBox .totalDev').text($.getI18n('total')+res.body[0].deviceNum+$.getI18n('platDev'));
                            if(res.body[0].fault){
                                $('.ptBox .devFault').find('b').text($.getI18n('fault')+res.body[0].fault+$.getI18n('platform'));
                                $('.ptBox .devFault').show()
                            }
                            if(res.body[0].break){
                                $('.ptBox .devBreak').find('b').text($.getI18n('break')+res.body[0].break+$.getI18n('platform'));
                                $('.ptBox .devBreak').show()
                            }
                            if(res.body[0].normal){
                                $('.ptBox .devNormal').find('b').text($.getI18n('normal')+res.body[0].normal+$.getI18n('platform'));
                                $('.ptBox .devNormal').show()
                            }
                            if(res.body[0].standby){
                                $('.ptBox .devStandby').find('b').text($.getI18n('standby')+res.body[0].standby+$.getI18n('platform'));
                                $('.ptBox .devStandby').show()
                            }
                            //地址
                            require(['MapUtil'],function (MapUtil) {
                                var item = res.body[0];
                                !map && (map = MapUtil.Instance('plantLocation2', {
                                    center: [item.location[0],item.location[1]] || [],
                                    zoomControl: false,
                                    attributionControl: false,
                                    layers: [L.tileLayer.provider('GaoDe.Normal.Map')],
                                    zoom: 12,
                                    controls: {
                                        zoomControl: {
                                            show: false
                                        },
                                        scaleControl: {
                                            show: false
                                        }
                                    }
                                }).option.map);
                                var _marker = MapUtil.createMarker([item.location[0],item.location[1]],
                                    {

                                        isDivIcon: true,
                                        className: 'plant-icon',
                                        html: '<div class="plantIcon" style=""><div sp-id="'+item.id+'" class="plantImg plantIcon'+status+'"></div></div>',
                                        tooltip:item.name,
                                        // tooltip:item.name,
                                        iconSize: [32, 50],
                                        riseOnHover:false
                                    }
                                );
                                MapUtil.addMarker(map,_marker);
                            });
                            // this.linePowerData(res)
                            //功率曲线
                            var datas = res.body[0].powerCurve;
                            _that.linePowerData(datas,'linePowerBox2');
                            // if(main.clearInterCharge(_that.zkinterval,_that.domId))return;
                            // _that.zkinterval=setInterval(function(){
                            //     // console.log(main.clearInterCharge(_that.zkinterval,_that.domId))
                            //     // console.log(_that.domId)
                            //     $.http.POST('/monitor/getPlantOpen.do?tokenId='+Cookies.getCook('tokenId'),{plantId:id},function(res){
                            //         _that.linePowerData(res.body[0].powerCurve)
                            //     })
                            // },30000)
                        })
                    }

                    $('.toSinglePlant').unbind().on('click',function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id});
                    });
                    $('.devNormal1').unbind().on('click',function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id},function(){
                            $('#navTitBar div').eq(1).click()
                        });
                    })
                }

                // e.stopPropagation();
                // return;
            } );

        }
        //搜索范围
        function rangePlant() {
            var rg = '';
            var rangeStart = $('#capStart').val();
            var rangeEnd = $('#capEnd').val();
            rg = rangeStart+','+rangeEnd;
            var con = $('#searchInfo').val();
            var id = $('#io-name').attr('sp-id')?$('#io-name').attr('sp-id'):'';
            refreshTable({range:rg,areaId:id,tokenId:Cookies.getCook('tokenId'),type:2,condition:con})

        }
        function conditionPlant() {
            var con = $('#searchInfo').val();
            var id = $('#io-name').attr('sp-id')?$('#io-name').attr('sp-id'):'';
            var rangeStart = $('#capStart').val();
            var rangeEnd = $('#capEnd').val();
            var rg = rangeStart+','+rangeEnd;
            refreshTable({range:rg,areaId:id,condition:con,tokenId:Cookies.getCook('tokenId'),type:2})
        }
    },
    //光储电站获取电站列表
    getOptStoPlantTable:function(){
        var _this = this;
        function refreshArea(data){
            $.http.POST('/report/getAreaDistribution.do', data, function (result) {
                setCurArea(result.body.areaInfo);
                setCurAreaChildren(result.body.kidsArea,result.body.areaInfo.id);
            })
        }

        //请求获取电站及区域数据
        $('#rootArea').unbind('click').on('click',function () {
            refreshArea({
                tokenId:Cookies.getCook('tokenId'),
                areaId:'',
                status:'',
                type:2,
                plantType:3
            });
            refreshTable({tokenId:Cookies.getCook('tokenId'),areaId:'',batRange:',',collRange:'',type:2,plantKeyword:''});
            $('.navigation-item').remove()
        });
        $('#rootArea').click();
        //设置当前区域节点
        function setCurArea(plantArea){
            $('#io-name').text(plantArea.name);
            $('#io-name').attr('sp-id',plantArea.id);
            $('#io-name').attr('sp-fatherId',plantArea.fatherId);
            if(Number(plantArea.fatherId)===0){
                $('#rootArea').text(plantArea.name);
                _this.areaId = plantArea.id;
            }
        }
        //设置当前区域节点下的子区域
        function setCurAreaChildren(kidsArea,fatherId){
            $('#io-table').html('');
            var $tr = $('<tr></tr>');
            var td = '';
            // var _id = curLoc[0].toString().replace('.','-')+(curLoc[1]).toString().replace('.','-');
            var str = $('#io-table');
            $.each(kidsArea,function (index, item) {
                var tpl = '<td><a class="toNextArea" sp-child="{{hasChild}}" sp-id="{{id}}" sp-fatherId="'+fatherId+'"><span class="plantName">{{name}}</span></a></td>';
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
                _this.areaId = $id;
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$id,
                    type:2,
                    status:'',
                    plantType:3
                });
                navigation({
                    name:$this.find('.plantName').text(),
                    id:$id,
                    fatherId:$fatherId,
                    isAdd:1
                });
                refreshTable({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$id,
                    batRange:'',
                    collRange:'',
                    plantKeyword:'',
                    type:2
                });
                // }

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
                $navItem.data('clusterMsg',obj);
                $navItem.unbind().on('click',function(){
                    var $this = $(this);
                    obj.isAdd = !1;
                    if(Number($navItem.data('clusterMsg').fatherId) === 0)return;
                    navigation(obj);
                    _this.areaId = $navItem.data('clusterMsg').id;
                    refreshArea({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id,
                        type:2,
                        status:'',
                        plantType:3
                    });
                    refreshTable({
                        tokenId:Cookies.getCook('tokenId'),
                        areaId:$navItem.data('clusterMsg').id?$navItem.data('clusterMsg').id:'',
                        collRange:'',
                        batRange:'',
                        plantKeyword:'',
                        type:2
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
        $('#choosePower').unbind('click').on('click',function(){  //当前区域下范围查找
            rangePlant()
        });
        $('.searchPlantInfo').unbind('click').on('click',function(){  //当前区域下范围下查找关键字
            conditionPlant()
        });
        //表格数据更新
        function refreshTable(obj){
            if(_this.phoTable){
                _this.phoTable.fnClearTable(false);
                _this.phoTable.fnDestroy()
            }
            var _status = ''; //状态
            _this.phoTable = $('#phoTable').dataTable({
                ajax:{
                    type:'POST',
                    url:'/monitor/getOptStoList.do',
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
                        d.batRange=obj.batRange;
                        d.collRange=obj.collRange;
                        d.plantKeyword = obj.plantKeyword;
                        d.areaId = obj.areaId;
                        d.tokenId = obj.tokenId;
                        d.status = _status;
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
                    if(main.clearTimeCharge(_this.tableInter,_this.domId))return;
                    _this.tableInterStop = false
                    _this.tableInter.push(setTimeout(function(){
                        if(_this.tableInterStop)return
                        main.clearTimeCharge(_this.tableInter)
                        _this.plantTable.fnDraw(false);
                    },5000))
                },
                "headerCallback": function( thead, data, start, end, display ) {
                    //状态
                    var statusStr=
                        '            <select name="status" id="status">\n' +
                        '                <option value="">'+$.getI18n('status')+'</option>\n' +
                        '                <option value="0">'+$.getI18n('gen')+'</option>\n' +
                        '                <option value="1">'+$.getI18n('standby')+'</option>\n' +
                        '                <option value="2">'+$.getI18n('fault')+'</option>\n' +
                        '                <option value="3">'+$.getI18n('break')+'</option>\n' +
                        '                <option value="4">'+$.getI18n('abnormal')+'</option>\n' +
                        '            </select>';
                    $(thead).find('th').eq(3).html( statusStr);
                    _status && $('#status').val(_status);
                    //    排序图标
                    var orders = [2,5,6,7,8,9];
                    $.each(orders,function (index,item) {
                        var $dom = $(thead).find('th').eq(item);
                        $dom.html($dom.text()+'<b class="orderImg"></b>');
                    });
                    bindSelectEvent();
                },
                bSort:true,
                bInfo:false,
                pageLength: 10,
                serverSide: true,  //启用服务器端分页
                searching: false,  //原生搜索
                pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
                paging:true,
                bPaginate:true,
                stateSave : false,//记住分页
                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容居中 */
                    $('td', row).attr("class", "text-left");
                },
                language:{
                    "sProcessing": $.getI18n('tableLanguage.sProcessing'),
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
                columns:[
                    { data: "plantName" ,title:$.getI18n('plantName'),width:'12%',render:function(data,type, full, meta){
                        return '<div class="td-noWrap td-plantName" title="'+data+'">'+'<i><img src="/images/pmImages/arrow_1.png" alt=""></i>'+data+'</div>'
                    }},
                    { data: "plantAddr",title:$.getI18n('address'),width:'10%',render:function (data, type, full, meta) {
                        return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                    }},
                    { data: "power",title:$.getI18n('ass.power')+'(兆瓦)',width:'7%'},
                    { data: "status" ,title:$.getI18n('status'),width:'5%',render:function (data, type, full, meta) {
                        if(data=='0'){
                            return '<i class="cl1"></i><span class="cl1">'+$.getI18n('gen')+'</span>'
                        }else if(data=='1'){
                            return '<i class="cl2"></i><span class="cl2">'+$.getI18n('standby')+'</span>'
                        }else if(data=='2'){
                            return '<i class="cl3"></i><span class="cl3">'+$.getI18n('fault')+'</span>'
                        }else if(data=='3'){
                            return '<i class="cl4"></i><span class="cl4">'+$.getI18n('break')+'</span>'
                        }else{
                            return '<i class="cl5"></i><span class="cl5">'+$.getI18n('abnormal')+'</span>'
                        }
                    }},
                    { data: "weather",title:$.getI18n('screen.weather'),width:'7%',render:function(data){
                        return '<image src="'+data+'" style="width: 30px; height: 30px"></image>'
                    }},
                    { data: "genToday",title:$.getI18n('genToday')+'(度)' ,width:'10%'},
                    { data: "charToday",title:$.getI18n('chargeToday')+'(度)' ,width:'10%'},
                    { data: "disCharToday",title:$.getI18n('dischargeToday')+'(度)' ,width:'10%'},
                    { data: "batCapacity",title:$.getI18n('batCapacity')+'(度)',width:'10%'},
                    { data: "soc" ,title:'SOC',width:'5%'},
                    { data: "contact" ,title:$.getI18n('contacts'),width:'8%'},
                    { data: "userTel" ,title:$.getI18n('telephone'),width:'8%'},
                ],
                "order": [
                    // [2, "desc"]
                ],
                'columnDefs':[
                    {
                        'orderable':false,'targets':[0,1,3,4,10,11],
                    }
                ]
            });
            function bindSelectEvent(){
                $('#status').change(function () {
                    _status = $(this).val();
                    _this.phoTable &&  _this.phoTable.api().ajax.reload();
                })
            }
            var table = _this.plantTable;
            $('#phoTable tbody tr').unbind('click');
            var ind = -1;
            $('#phoTable').unbind('click').on( 'click', 'tbody tr:not(.appendTr)', function (e) {
                var $this = $(this);
                var _this1 = this;
                var map;
                var index = _this.phoTable.api(true).row( _this1 ).index();
                if ($(this).hasClass('selected') ) {
                    $(this).removeClass('selected');
                    $(this).find('td').eq(0).find('img').attr('src','/images/pmImages/arrow_1.png');
                    _this.phoTable.api(true).row(index).remove().draw(false)

                } else {
                    !!_this.tableInter && main.clearTimeCharge(_this.tableInter)
                    _this.tableInterStop = true
                    _this.phoTable.$('tr.selected').find('td').eq(0).find('img').attr('src','/images/pmImages/arrow_1.png');
                    $('#phoTable tr.selected').length && $('#phoTable tr.selected').removeClass('selected').siblings('tr.appendTr').remove();
                    $(this).addClass('selected');
                    $(this).find('td').eq(0).find('img').attr('src','/images/pmImages/arrow.png');
                    drawDetail();
                }

                function drawDetail(){
                    var tdHtml = '';
                    var _that = _this;
                    tdHtml ='<tr style="width: 100%" class="appendTr '+index+'">\n' +
                        '                <td colspan="12" style="padding-left: 0; line-height: 0">\n' +
                        '                    <div class="plantFoot" style="width: 100%">\n' +
                        '                        <div class="detailBox fl gcDetailBox image-effect-fall-back">\n' +
                        '                            <div class="image-layer"><img src="" alt=""></div>\n' ;
                    if(!!window.systemRole['singlePlantMonView']){
                        tdHtml+='<div class="share-layer"><a class="toSinglePlant">'+$.getI18n('seeDetail')+'</a></div>\n'
                    }
                    tdHtml+= '                        </div>\n' +
                        '                        <div class="locationBox fl gcLocation" id="plantLocation1"></div>\n' +
                        '                        <div class="lineBox fl gcLineBox" id="linePowerBox1"></div>\n' +
                        '                        <div class="ptBox fr gcPtBox">\n' ;
                    if(!!window.systemRole['deviceControlEdit']){
                        tdHtml+='                            <p class="totalDev"></p>\n' +
                            '                            <p class="devNormal devNormal1  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devFault devNormal1 hd"><i></i><b></b></p>\n' +
                            '                            <p class="devBreak devNormal1 hd"><i></i><b></b></p>\n' +
                            '                            <p class="devStandby devNormal1 hd"><i></i><b></b></p>\n'
                    }else{
                        tdHtml+='                            <p class="totalDev"></p>\n' +
                            '                            <p class="devNormal   hd"><i></i><b></b></p>\n' +
                            '                            <p class="devFault  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devBreak  hd"><i></i><b></b></p>\n' +
                            '                            <p class="devStandby  hd"><i></i><b></b></p>\n'
                    }
                    tdHtml+=
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </td>\n' +
                        '            </tr>';
                    $this.after(tdHtml);
                    // tdHtml ='<tr style="width: 100%" class="appendTr '+index+'">\n' +
                    //     '                <td colspan="12" style="padding-left: 0; line-height: 0">\n' +
                    //     '                    <div class="plantFoot" style="width: 100%">\n' +
                    //     '                        <div class="detailBox fl gcDetailBox image-effect-fall-back">\n' +
                    //     '                            <div class="image-layer"><img src="" alt=""></div>\n' +
                    //     '                            <div class="share-layer"><a class="toSinglePlant">'+$.getI18n('seeDetail')+'</a></div>\n' +
                    //     '                        </div>\n' +
                    //     '                        <div class="locationBox fl gcLocation" id="plantLocation1"></div>\n' +
                    //     '                        <div class="lineBox fl gcLineBox" id="linePowerBox1"></div>\n' +
                    //     '                        <div class="ptBox fr gcPtBox">\n' +
                    //     '                            <p class="totalDev"></p>\n' +
                    //     '                            <p class="devNormal devNormal1  hd"><i></i><b></b></p>\n' +
                    //     '                            <p class="devFault devNormal1 hd"><i></i><b></b></p>\n' +
                    //     '                            <p class="devBreak devNormal1 hd"><i></i><b></b></p>\n' +
                    //     '                            <p class="devStandby devNormal1 hd"><i></i><b></b></p>\n' +
                    //     '                        </div>\n' +
                    //     '                    </div>\n' +
                    //     '                </td>\n' +
                    //     '            </tr>';
                    // $this.after(tdHtml);
                    var id = _this.phoTable.api(true).row( _this1 ).data().id;
                    var singlePlantType = _this.phoTable.api(true).row( _this1 ).data().singlePlantType;
                    var status = _this.phoTable.api(true).row( _this1 ).data().status;
                    plantInfoById();
                    function plantInfoById() {
                        $.http.POST('/monitor/getPlantOpen.do?tokenId='+Cookies.getCook('tokenId'),{plantId:id},function (res) {
                            //设备数量
                            var value = res.body[0].image;
                            !!value  ? $('.detailBox img').attr('src',value).one('error',function () {
                                $('.detailBox img').attr('src','/images/defaultPlant.png') }) : $('.detailBox img').attr('src','/images/defaultPlant.png');
                            $('.ptBox .totalDev').text($.getI18n('total')+res.body[0].deviceNum+$.getI18n('platDev'));
                            if(res.body[0].fault){
                                $('.ptBox .devFault').find('b').text($.getI18n('fault')+res.body[0].fault+$.getI18n('platform'));
                                $('.ptBox .devFault').show()
                            }
                            if(res.body[0].break){
                                $('.ptBox .devBreak').find('b').text($.getI18n('break')+res.body[0].break+$.getI18n('platform'));
                                $('.ptBox .devBreak').show()
                            }
                            if(res.body[0].normal){
                                $('.ptBox .devNormal').find('b').text($.getI18n('normal')+res.body[0].normal+$.getI18n('platform'));
                                $('.ptBox .devNormal').show()
                            }
                            if(res.body[0].standby){
                                $('.ptBox .devStandby').find('b').text($.getI18n('standby')+res.body[0].standby+$.getI18n('platform'));
                                $('.ptBox .devStandby').show()
                            }
                            //地址
                            require(['MapUtil'],function (MapUtil) {
                                var item = res.body[0];
                                !map && (map = MapUtil.Instance('plantLocation1', {
                                    center: [item.location[0],item.location[1]] || [],
                                    zoomControl: false,
                                    attributionControl: false,
                                    layers: [L.tileLayer.provider('GaoDe.Normal.Map')],
                                    zoom: 12,
                                    controls: {
                                        zoomControl: {
                                            show: false
                                        },
                                        scaleControl: {
                                            show: false
                                        }
                                    }
                                }).option.map);
                                var _marker = MapUtil.createMarker([item.location[0],item.location[1]],
                                    {

                                        isDivIcon: true,
                                        className: 'plant-icon',
                                        html: '<div class="plantIcon" style=""><div sp-id="'+item.id+'" class="plantImg plantIcon'+status+'"></div></div>',
                                        tooltip:item.name,
                                        // tooltip:item.name,
                                        iconSize: [32, 50],
                                        riseOnHover:false
                                    }
                                );
                                MapUtil.addMarker(map,_marker);
                            });
                            // this.linePowerData(res)
                            //功率曲线
                            var datas = res.body[0].powerCurve;
                            _that.linePowerData(datas,'linePowerBox1')
                        })
                    }

                    $('.toSinglePlant').unbind().on('click',function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id});
                    });
                    $('.devNormal1').unbind().on('click',function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id},function(){
                            $('#navTitBar div').eq(1).click()
                        });
                    })
                }

                // e.stopPropagation();
                // return;
            } );

        }
        //搜索范围
        function rangePlant() {
            var collRange = '',batRange='';
            var rangeStart = $('#phoStart').val();
            var rangeEnd = $('#phoEnd').val();
            collRange = rangeStart+','+rangeEnd;
            batRange = $('#batStart').val()+','+$('#batEnd').val();
            var con = $('#searchInfo').val();
            var id = $('#io-name').attr('sp-id')?$('#io-name').attr('sp-id'):'';
            refreshTable({collRange:collRange,batRange:batRange,areaId:id,tokenId:Cookies.getCook('tokenId'),type:2,plantKeyword:con})

        }
        function conditionPlant() {
            var collRange = '',batRange='';
            var rangeStart = $('#phoStart').val();
            var rangeEnd = $('#phoEnd').val();
            collRange = rangeStart+','+rangeEnd;
            batRange = $('#batStart').val()+','+$('#batEnd').val();
            var con = $('#searchInfo').val();
            var id = $('#io-name').attr('sp-id')?$('#io-name').attr('sp-id'):'';
            refreshTable({collRange:collRange,batRange:batRange,areaId:id,tokenId:Cookies.getCook('tokenId'),type:2,plantKeyword:con})

        }
    },
    //展开数据曲线
    linePowerData:function (datas,id) {
        var xData = datas.xData;
        var option = {
            // tooltip:{
            //     // trigger:'axis',
            //     // borderWidth:1,
            //     // borderColor:'#444',
            //     // extraCssText: 'box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);',
            //     // padding:[5,10],
            //     // backgroundColor:'#fff',
            //     // axisPointer:{
            //     //     lineStyle: {
            //     //         color: '#006699'
            //     //     }
            //     // },
            //     // formatter:function(item){
            //     //     var str = '<div style="color: #333;">'+item[0].axisValue+'</div><img style="position: absolute;left: -10px;top:30px" class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAYAAAAW5GZjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQjg1MzFFRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQjg1MzFGRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NERCODUzMUNFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NERCODUzMURFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qIb73AAABN0lEQVR42mL4//8/Az588uRJ8zNnznz9/v37fyYGPODUqVM2TExMO1RUVLg4ODgY8JkYAjTx28ePH//DAAsW0xiBVBM7O3u1qqoqIxcXF1yOBU0hD5BazMvLGwBUyMDCgmoWC5JCSSC1TUxMzEBeXp6BkZERww8sUIUyQOqAtLS0MhDj9DAj0COcQPqkjIyMrpSUFL7AYQAFXZWgoCBBhTDFCbKysgzEAJBiAVZWVqIV737z5g3RimufPHny88ePH4QVm5mZXf3792/WzZs3///69Qu/aqS0UHTx4sX/P3/+/I8LoCee0gsXLvwDOomwYqiGlHPnzv359u0bYcVQDeFnz579+eXLF8KKoRq8gekZRQOhLBV9/vz5fzBPMxChofzatWtgxUxERFzX58+fT759+5YBIMAAY/x/DWAwTZ8AAAAASUVORK5CYII=" alt="">';
            //     //     for(var i = 0 ,len= item.length; i<len ;i++){
            //     //         str +=  '<div style="color: #333;">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span>'+datas.unit+'</div>'
            //     //     }
            //     //     return str;
            //     // }
            //
            // },
            legend: {
                itemGap: 5,
                icon: 'line',
                textStyle:{
                    color:'#333',
                    fontSize:12
                },
                top:'5%',
                left:'45%',
                data:''
            },
            color:['RGBA(1, 181, 1, 1)','RGBA(10, 189, 221, 1)','RGBA(252, 85, 56, 1)'],
            grid: {
                top:'20%',
                bottom:'20%',
                left: '6.8%',
                right: '1%'
            },
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#f1f1f1'],
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
                        color:'#1c4c88'
                    }
                },
                axisTick:{
                    show:false,
                    alignWithLabel:true
                },
                nameTextStyle:{
                    color:'#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name:'功率'+'('+datas.yData[0].unit+')',
                type: 'value',
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#f1f1f1'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#333'
                    }
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'#1c4c88'
                    }
                },
                nameTextStyle:{
                    color:'#333'
                },
                axisTick:{
                    show:false
                }
            }],

            // dataZoom: [
            //     {
            //         type: 'slider',
            //         show: true,
            //         xAxisIndex: [0],
            //         start: 0,
            //         end: 100,
            //         borderColor:'rgba(17,58,106, .6)',
            //         backgroundColor:'rgba(5,30,64, .9)',
            //         fillerColor:'rgba(5,30,64, 0.1)',
            //         // dataBackground:'rgba(1,39,84, 0.35)',
            //         handleStyle:{
            //             color:'rgba(0,101,153, 0.35)',
            //             borderColor:'rgba(0,101,153, 0.35)',
            //         },
            //         textStyle:{
            //             color:'rgba(165, 226, 249)'
            //         }
            //     },
            //     {
            //         type: 'inside',
            //         xAxisIndex: [0],
            //         start: 1,
            //         end: 35
            //     }
            // ],
            series: []
        };
        var legendData = [];
        var powers = datas.yData;
        var yDatas = [];
        var unit = [];
        // var colors = ['RGBA(1, 181, 1, 1)','RGBA(10, 189, 221, 1)','RGBA(252, 85, 56, 1)'];
        var colors1=['RGBA(1, 181, 1, 0.2)','RGBA(10, 189, 221, 0.2)','RGBA(252, 85, 56, 0.2)'];
        var colors2=['RGBA(1, 181, 1, 0.2)','RGBA(10, 189, 221, 0.2)','RGBA(252, 85, 56, 0.2)'];
        // color:['RGBA(1, 181, 1, 1)','RGBA(10, 189, 221, 1)','RGBA(252, 85, 56, 1)'],
        for(var i = 0 ,len = powers.length;i<len;i++){
            legendData.push(powers[i].name+' ('+powers[i].unit+') ');
            yDatas[i] = powers[i].value;
            option.series.push({
                name:powers[i].name+' ('+powers[i].unit+') ',
                type:'line',
                data: powers[i].value,
                showSymbol: false,
                symbolSize: 1,
                // color:colors[i],
                areaStyle: {
                    normal: {
                        // shadowColor: 'rgba(0, 0, 0, 0.1)',
                        // shadowBlur: 10
                        // opacity:0.4
                        opacity:0.2,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: colors1[i],
                            }, {
                                offset: 1,
                                color: colors2[i],
                            }],
                            globalCoord: false
                        },
                    }
                }
            });
        }
        option.legend.data = legendData;
        Echarts.render(id, option);
    },
};