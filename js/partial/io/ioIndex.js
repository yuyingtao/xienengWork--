/** 2017/10/19
* @author: kj
* @description:
*/
define(function(){
    return IOPageRender;
});
var IOPageRender = {
    Render: function () {
        //    Todo Main function
        this.init();
        this.MapUtil();
        // this.AlarmUtil();
    },
    init:function () {
            this.table='';
            this.areaId='';
            this.tableInter=[]; //表格刷新
            this.map='';
            this.curId='';
            this.mapUtil='';
            this.rangeType=1;
            this.LayerCluster='';//聚合点图层
            this.LayerMarkers='';//marker图层
            this.domId='alarmList';//模块Id
    },
    MapUtil: function () {
        var _this = this;
        _this.curId='';
        var domId = 'mapBox';
        var center = [30.629169,104.079373];

        // $('#'+domId).remove()
        require(['MapUtil'], function (MapUtil) {
            _this.mapUtil = MapUtil;
            _this.map = MapUtil.Instance(domId, {
                center: center,
                zoomControl: false,
                attributionControl: false,
                layers: [L.tileLayer.provider('GaoDe.Normal.Map')],
                zoom: 4,
                maxZoom: 18,
                controls: {
                    zoomControl: {
                        show: false
                    },
                    scaleControl: {
                        show: false
                    }
                }
            }).option.map;
            // refreshMap();
            function refreshArea(data){
                data.plantType=Cookies.getCook('plantType')
                $.http.POST('/report/getAreaDistribution.do', data, function (result) {

                    !!_this.LayerCluster && MapUtil.clearMap(_this.LayerCluster);

                    setCurArea(result.body.areaInfo);
                    setCurAreaChildren(result.body.kidsArea,result.body.plantsInfo.location,result.body.areaInfo.id);
                    drawMarker(result.body.plantsInfo);

                })
            }

            //请求获取电站及区域数据
            $('#rootArea').on('click',function () {
                $('#curveBox').html('');
                /*if(_this.table){
                    _this.table.
                }*/
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:'',
                    serviceType:2,
                    plantType:Cookies.getCook('plantType'),
                    type:2
                });
                $('.navigation-item').remove()
            });
            $('#rootArea').click();
            //设置当前区域节点
            function setCurArea(plantArea){
                $('#io-name').text(plantArea.name);
                $('#io-name').attr('sp-id',plantArea.id);
                $('#io-name').attr('sp-fatherId',plantArea.fatherId);
                $('#io-count').text(plantArea.count);
                if(Number(plantArea.fatherId)===0){
                    $('#rootArea').text(plantArea.name);
                    _this.areaId = plantArea.id;
                    _this.AlarmUtil();

                    $('.map-tit').unbind().on('click',function () {
                        $('.map-select-box').fadeToggle();
                    })
                }
            }
            //设置当前区域节点下的子区域
            function setCurAreaChildren(kidsArea,curLoc,fatherId){
                $('#io-table').html('');
                var $tr = $('<tr></tr>');
                var td = '';
                // var _id = curLoc[0].toString().replace('.','-')+(curLoc[1]).toString().replace('.','-');
                str = $('#io-table');
                $.each(kidsArea,function (index, item) {
                    var tpl = '<td><a class="toNextArea" sp-child="{{hasChild}}" sp-id="{{id}}" sp-fatherId="'+fatherId+'"><span class="plantName">{{name}}</span>（{{count}}'+$.getI18n('seat')+'）</a></td>';
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
                    $('#curveBox').html('');
                    if($child === "true"){
                        _this.areaId = $id;
                        _this.rangeType = 1;
                        $('.alarmType').eq(0).click();
                        refreshArea({
                            tokenId:Cookies.getCook('tokenId'),
                            plantType:Cookies.getCook('plantType'),
                            areaId:$id,
                            type:2,
                            serviceType:2
                        });
                        navigation({
                            name:$this.find('.plantName').text(),
                            id:$id,
                            fatherId:$fatherId,
                            isAdd:1
                        })
                    }

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
                        // refreshMap($navItem.data('clusterMsg'))
                        _this.areaId = $navItem.data('clusterMsg').id;
                        _this.rangeType = 1;
                        $('.alarmType').eq(0).click();
                        /*_this.AlarmUtil({
                            areaId:$navItem.data('clusterMsg').id,
                        });*/
                        refreshArea({
                            tokenId:Cookies.getCook('tokenId'),
                            areaId:$navItem.data('clusterMsg').id,
                            type:2,
                            plantType:Cookies.getCook('plantType'),
                            serviceType:2
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

            /*
            *  @description: 绘制marker
            *  @parameter: obj [{*}] 数组对象
            *  <pre>
            *      {<br>
            *          id: '11', // marker的id<br>
            *          name: '中国', // marker的名字<br>
            *          location: [30.40,104.04], // 经纬度<br>
            *      }<br>
            *  </pre>
            * */
            function drawMarker(obj) {

                _this.LayerCluster && MapUtil.clearMap(_this.LayerCluster)
                _this.LayerMarkers && MapUtil.clearMap(_this.LayerMarkers)
                _this.LayerMarkers = MapUtil.createMarkerGroup(_this.map);
                _this.LayerCluster = MapUtil.createMarkerGroup(_this.map);
                var marker;
                var markers=[];

                $.each(obj, function (index, item) {
                        marker = MapUtil.createMarker(item.location,
                            {

                                isDivIcon: true,
                                className: 'plant-icon',
                                html: '<div class="plantIcon" style=""><div sp-id="'+item.id+'" class="plantImg plantIcon'+item.status+' icon-'+ item.location[0].toString().replace('.','-')+(item.location[1]).toString().replace('.','-')+'"></div><label>'+item.name+'</label></div>',
                                tooltip:item.name,
                                // tooltip:item.name,
                                iconSize: [32, 50],
                                riseOnHover:false,
                                events: {
                                    click: function (e) {
                                        var $curDom = $(e.target._icon).find('.plantImg');
                                        $('.plantImg').removeClass('on');
                                        $curDom.addClass('on');
                                        // $('.on').parents('.plant-icon').css('z-index',99999)
                                        $('.plant-icon').removeClass('markerOn');
                                        $('.on').parents('.plant-icon').addClass('markerOn');

                                        _this.areaId = item.id;
                                        _this.rangeType = 2;
                                        $('.alarmType').eq(0).click();
                                        // console.log('[marker]:',$curDom.attr('sp-id'))
                                        // console.log('[marker]:',$curDom.className)
                                    }
                                }
                            }
                        );

                    // MapUtil.addMarker(LayerMarkers, marker)
                    markers.push(marker);
                });
                _this.markers = markers
                _this.LayerCluster = MapUtil.addCluster(_this.LayerCluster,'',markers);
                _this.LayerCluster.on('clusterclick', function (a) {
                    a.layer.zoomToBounds({padding: [20, 20]});
                });
                MapUtil.fitView( _this.LayerCluster);

            }

        });
    },
    AlarmUtil:function () {

        var _this = this;
        var _level = '重要'; //告警等级
        var _serviceType = ''; //1 实时 2 关注
        var _status = ''; //状态

        //实时/关注切换
        $('.alarmType').unbind().on('click',function () {
            // 定时刷新
            !! _this.tableInter && main.clearTimeCharge( _this.tableInter);
            $('.alarmType').removeClass('on');
            $(this).addClass('on');
            if($(this).hasClass('active-alarm')){
                _serviceType = 1
            }else {
                _serviceType = 2
            }
            _level = '重要'; //告警等级
            _status = ''; //状态
            $('#level').val(_level);
            $('#status').val(_status);
            $('#curveBox').html('');
            _this.table && _this.table.api().ajax.reload();
        });
        _this.rangeType = 1;
        $('.alarmType').eq(0).click();

        if(_this.table){
            _this.table.fnClearTable(false);
            _this.table.fnDestroy()
        }
        //渲染表格
        _this.table = $('#alarmList').dataTable({
            ajax:{
                type:'POST',
                url:"/alarm/alarmList.do",
                plantType:Cookies.getCook('plantType'),
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

                    d.level = _level;
                    d.status=_status;
                    d.serviceType = _serviceType;
                    d.areaId = _this.areaId;
                    d.rangeType = _this.rangeType;
                    d.tokenId = Cookies.getCook('tokenId');
                    d.plantType=Cookies.getCook('plantType')

                    // d.tokenId = obj.tokenId;
                    // d.draw = true;
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    setBisec(json.body);
                    !json.body.data && (json.body.data=[]);
                    return json.body.data
                }
            },
            //bDestroy:true,
            "rowCallback": function( row, data ) {
                if ( data.id == _this.curId ) {
                    // $('#deviceListArea').find(row).click();
                    $(row).addClass('selected')
                }
            },
            "headerCallback": function( thead, data, start, end, display ) {
                //定时渲染则不重新绘制下拉
                if(_this.tableInter.length) return
                //等级
                var levelStr=
                    '            <select name="level" id="level" style="width: 48px">\n' +
                    '                <option value="">'+$.getI18n('intelligentOM.level')+'</option>\n' +
                    '                <option value="'+$.getI18n('intelligentOM.import')+'">'+$.getI18n('intelligentOM.import')+'</option>\n' +
                    '                <option value="'+$.getI18n('intelligentOM.general')+'">'+$.getI18n('intelligentOM.general')+'</option>\n' +
                    '                <option value="'+$.getI18n('intelligentOM.prompt')+'">'+$.getI18n('intelligentOM.prompt')+'</option>\n' +
                    '            </select>';
                $(thead).find('th').eq(2).html( levelStr);
                _level && $('#level').val(_level);
                //状态
                var statusStr=
                    '            <select name="status" id="status" style="width: 48px">\n' +
                    '                <option value="">'+$.getI18n('intelligentOM.status')+'</option>\n' +
                    '                <option value="1">'+$.getI18n('intelligentOM.occur')+'</option>\n' +
                    '                <option value="0">'+$.getI18n('intelligentOM.recovery')+'</option>\n' +
                    '            </select>';
                $(thead).find('th').eq(4).html( statusStr);
                _status && $('#status').val(_status);
            //    排序图标
                var orders = [0,1,3];
                $.each(orders,function (index,item) {
                    var $dom = $(thead).find('th').eq(item);
                    $dom.html($dom.text()+'<b class="orderImg"></b>');
                });

                bindSelectEvent();
            },
            pageLength: 13,
            destroy: true,
            rowId: 'id',
            serverSide: true,  //启用服务器端分页
            searching: false,  //禁用原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
                var level = data.alarmLevel;
                var setCol = '#333';
                switch(level){
                    case $.getI18n('intelligentOM.import'):setCol = '#ff0000';break;
                    case $.getI18n('intelligentOM.general'):setCol = '#1BBD00';break;
                    case $.getI18n('intelligentOM.prompt'):setCol = '#333';break;

                }
                $(row).find('td').css('color',setCol)
            },
            drawCallback:function () {
                _this.tableInter.push(setTimeout(function(){
                    main.clearTimeCharge(_this.tableInter)
                    _this.table.fnDraw(false);
                },5000))
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
            columns: [
                { data: "deviceName" ,title:$.getI18n('intelligentOM.devName'),width:'20%',render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "signalName",title:$.getI18n('intelligentOM.faultName'),width:'25%',render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "alarmLevel",title:$.getI18n('intelligentOM.level'),width:'10%'},
                { data: "changeTime",title:$.getI18n('intelligentOM.time'),width:'35%',render:function (data, type, full, meta) {
                    var time = (new Date(Number(data))).format('yyyy-MM-dd HH:mm:ss.S');
                    return '<div class="td-noWrap td-noWrap-time" title="'+time+'">'+time+'</div>'
                }},
                { data: "status" ,title:$.getI18n('intelligentOM.status'),width:'10%',render:function (data, type, full, meta) {

                    if(Number(data)===1){
                        return $.getI18n('intelligentOM.occur')
                    }else if(Number(data)===0){
                        return $.getI18n('intelligentOM.recovery')
                    }else {
                        return '--'
                    }
                }}
            ],
            'columnDefs':[
                {'orderable':false,'targets':2},
                {'orderable':false,'targets':4},
                // {'orderable':false,'targets':9}
            ]
        });

        //点击行事件
        $('#alarmList').on( 'click', 'tbody tr', function (e) {


            var flag = false
            !_this.curId && (_this.curId = _this.table.api().row( this ).data().id, flag = true)
            var data = _this.table.api().row( this ).data();
            if((+data.deviceType)===1||(+data.deviceType)===2){
                $('#curveBox').html('<div class="curveBox">加载中......</div>');
            }else {
                $('#curveBox').html('');
            }

            if(_this.curId !== data.id){
                _this.curId =  data.id
                _this.table.$('tr.selected').removeClass('selected');
                alarmDetail({
                    id:data.id,
                    deviceId:data.deviceId,
                    deviceType:data.deviceType,
                    changeTime:data.changeTime
                });
            }
            if(flag){
                alarmDetail({
                    id:data.id,
                    deviceId:data.deviceId,
                    deviceType:data.deviceType,
                    changeTime:data.changeTime
                });
            }
            $(this).addClass('selected');
            /*$('#deviceDetail').hide();
            var deviceId = deviceTable.row( this ).data().deviceId;
            !!deviceId&&_this.getDetailAjax(deviceId);
            e.stopPropagation();*/
        } );
        // _this.table.api().draw(false)
        function setBisec(datas) {
            $('#sp-todayCount').text(datas.todayCount);
            $('#sp-monthCount').text(datas.monthCount);
            $('#sp-recoveryCount').text(datas.recoveryCount);
            $('#sp-attentionCount').text(datas.attentionCount)
        }
        function bindSelectEvent(){
            $('#level').change(function () {
                _level = $(this).val();
                _this.table && _this.table.api().ajax.reload();
            });
            $('#status').change(function () {
                _status = $(this).val();
                _this.table && _this.table.api().ajax.reload();
            })
        }


    //    地图交互
        function alarmDetail(obj) {

            $.http.POST('/alarm/alarmLine.do', {tokenId:Cookies.getCook('tokenId'),id:obj.id,deviceId:obj.deviceId,changeTime:obj.changeTime,areaId:_this.areaId}, function (result) {
                var datas = result.body;
                // _this.LayerCluster.freezeAtZoom();
                _this.mapUtil.clearMap(_this.LayerCluster)
                _this.mapUtil.addMarkers(_this.LayerMarkers, _this.markers)
                _this.map.setView(datas.location);
                _this.mapUtil.fitView(_this.map);
                $(".plantImg").removeClass('on');
                $('.icon-'+ datas.location[0].toString().replace('.','-')+(datas.location[1]).toString().replace('.','-')).addClass('on');
                $('.plant-icon').removeClass('markerOn');
                $('.on').parents('.plant-icon').addClass('markerOn');
                // console.log('[_this.LayerMarkers.getLatLng(datas.location)]:',_this.LayerMarkers.getLatLng(datas.location))
                // _this.LayerMarkers.getLatLng(datas.location)

                if(Number(obj.deviceType)==1||Number(obj.deviceType)==2) {

                    var str = '<div class="curveBox">\n' +
                        '                <div class="detail-close" id="winClose"><img src="/images/io/colse.png" alt=""></div>\n' +
                        '                <div class="l-curve"><div id="alarmPowerCurve" style="text-align: left;width: 100%;height: 100%"></div></div>\n' +
                        '                <div class="r-Msg">\n' +
                        '                    <p class="msg-row"><span class="labelName" id="io-plantName">--</span><button permission="singlePlantMonView" id="toPlantPage" class="sp-btn">'+$.getI18n('seeDetail')+'</button></p>\n' +
                        '                    <p class="msg-row"><span class="labelName" id="io-deviceName">--</span><button permission="singlePlantMonView" id="toDevicePage" class="sp-btn">'+$.getI18n('seeDetail')+'</button></p>\n' +
                        '                    <p class="msg-row">'+$.getI18n('intelligentOM.curStatus')+'<span class="alarm-status" id="io-currStatus">--</span></p>\n' +
                        '                    <p class="msg-row msg-attention"><button class="sp-btn" id="jsAttention">'+$.getI18n('intelligentOM.attention')+'</button></p>\n' +
                        '                </div>\n' +
                        '            </div>';

                    $('#curveBox').html(str);
                    $('#winClose').on('click', function () {
                        $('#curveBox').html('');
                    });
                    powerCurve(datas); //曲线图
                    $('#io-plantName').attr('sp-plantId', datas.plantId).text(datas.plantName);
                    $('#io-deviceName').attr('sp-plantId', datas.deviceId).text(datas.deviceName);
                    $('#io-currStatus').removeClass('on');
                    if (Number(datas.currStatus)) {
                        $('#io-currStatus').addClass('on').text($.getI18n('intelligentOM.occur'))
                    } else {
                        $('#io-currStatus').text($.getI18n('intelligentOM.recovery'))
                    }
                    if (Number(datas.attention)) {
                        $('#jsAttention').attr('sp-attention', datas.attention).text($.getI18n('intelligentOM.cancelAttention'))
                    } else {
                        $('#jsAttention').attr('sp-attention', datas.attention).text($.getI18n('intelligentOM.attention'))
                    }

                    //    跳转到单电站页
                    $('#toPlantPage').unbind().on('click', function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:datas.singlePlantType,plantId:datas.plantId});
                    });
                    //    跳转到设备页
                    $('#toDevicePage').unbind().on('click', function () {
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:datas.singlePlantType,plantId:datas.plantId}, function () {
                            $('#navTitBar div').eq(1).click()
                        });
                    });
                    //    关注/取消关注 告警

                    $('#jsAttention').unbind().on('click', function () {
                        var $this = $(this);
                        var attention = Number($this.attr('sp-attention'));
                        var attText = '';
                        attention === 0 ? (attention = 1, attText = $.getI18n('intelligentOM.cancelAttention')) : (attention = 0, attText = $.getI18n('intelligentOM.attention'));
                        $.http.POST('/alarm/alarmAttention.do', {
                            tokenId: Cookies.getCook('tokenId'),
                            id: obj.id,
                            type: attention
                        }, function (result) {

                            App.alert({code: result.code, msg: result.msg}, function () {
                                result.code == 100 && $this.attr('sp-attention', attention).text(attText) && _this.table.fnDraw(false);
                            });

                        });
                    })
                }else {
                    $('#curveBox').html('');

                }
            })

        }
    //    曲线图
        function powerCurve(obj) {
            var datas = obj.power;
            // if(main.clearInterCharge(this.dataCurveInter,this.domId))return;
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
                    itemGap: 40,
                    icon: 'line',
                    textStyle:{
                        color:'#8A8A8A',
                        fontsize:12
                    },
                    top:'0',
                    right:'20%',
                    data:''
                },
                grid: {
                    top:'25%',
                    bottom:'23%',
                    left: '10%',
                    right: '10%'
                },
                xAxis: {
                    // name:'日',
                    boundaryGap: false,
                    type: 'category',
                    splitLine:{
                        show:false,
                        lineStyle:{
                            color: ['#efefef'],
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
                            color:'#e6f4f8'
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
                    name:'('+datas.yData[0].unit+')',
                    type: 'value',
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color: ['#efefef'],
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
                            color:'#e6f4f8'
                        }
                    },
                    nameTextStyle:{
                        color:'#333'
                    }
                },{
                    name:'('+datas.yData[1].unit+')',
                    type: 'value',
                    splitLine:{
                        show:false,
                    },
                    axisLabel:{
                        textStyle:{
                            color:'#333'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#e6f4f8'
                        }
                    },
                    nameTextStyle:{
                        color:'#333'
                    }
                }],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: 100,
                        bottom:-5,
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
                            color:'#333'
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
            for(var i = 0 ,len = powers.length;i<len;i++){
                legendData.push(powers[i].name+' ('+powers[i].unit+') ');
                yDatas[i] = powers[i].value;
                option.series.push({
                    name:powers[i].name+' ('+powers[i].unit+') ',
                    type:'line',
                    data: powers[i].value,
                    yAxisIndex:i,
                    showSymbol: false,
                    symbolSize: 1,
                    areaStyle: {
                        normal: {
                            // shadowColor: 'rgba(0, 0, 0, 0.1)',
                            // shadowBlur: 10
                            opacity:0.2
                        }
                    }
                });
                option.yAxis[i].name = powers[i].name +'(' + powers[i].unit+ ')';
            }
            option.series.push({
                name: '',
                type: 'line',

                markLine: {

                    itemStyle: {
                        normal: {
                            borderWidth: 1,

                            lineStyle: {

                                type: 'dash',
                                color: '#ffa35c ',
                                width: 1,
                            },

                            label: {
                                formatter: $.getI18n('intelligentOM.occurTime')+'\n'+obj.changeTime,
                                textStyle: {
                                    fontSize: 10,
                                    color:'#ffa35c',
                                    fontWeight: "bolder",
                                },
                            }
                        },

                    },
                    data: [
                        // {type: 'average', name: '平均值'},
                        [{
                            coord: [obj.changeTime, 0]
                        }, {
                            coord: [obj.changeTime, obj.maxValue]
                        }]
                    ]
                }
            });
            option.legend.data = legendData;
            Echarts.render('alarmPowerCurve', option);
        }
    }
};