/**
 * Created by SP0014 on 2018/1/16.
 * 设备管理-逆变器
 */
define(function(){
    return inverterDevice;
});
var inverterDevice = {
    inverterDeviceTable:'',  //逆变器表格数据
    YCTable:'',  //弹窗表格
    YKTable:'',  //弹窗表格
    YxTable:'',  //弹窗表格
    moduleTable:'',  //组串信号标识弹窗表格
    deviceTypeTable:'',  //设备型号标识弹窗表格
    zcObj:'',  //组串信息
    inverterObj:'',  //逆变器信息
    moduleId:'',  //编辑组串信息时的id
    modelFlag:false,//设备型号标识是否更改标识
    maxRoute:'',//组串最大输入路数
    Render:function(){
        var that = this;
        that.ztreeShow('/plantInfo/getPlantTreeByOrg.do');
        //点击搜索按钮
        $('a.searchDevice').unbind().on('click',function(){
            var deviceName = $('input[name="deviceName"]').val();
            var manufacturer = $('input[name="manufacturer"]').val();
            var status = $('select[name="status"]').val();
            that.getData({plantId:that.plantId,deviceName:deviceName,status:status,tokenId:Cookies.getCook('tokenId'),manufacturer:manufacturer,orgId:that.orgId})
        })
    },
    //加载树
    ztreeShow:function (url) {
        var treeNode;
        var that = this;
        $.http.POST(url,{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            $.fn.zTree.init($("#ztree"), setting, treeNode);
            //下面三行是设置加载时默认选中根节点
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            var nodes = zTree.getNodes()[0];
            zTree.selectNode(nodes);
            $('.rightInfo_device .deviceHead1').show();
            $('.noData').hide();
            $('.inverterDeviceTable').show();
            that.orgId = nodes.id;
            that.getData({plantId:'',deviceName:'',status:'',tokenId:Cookies.getCook('tokenId'),orgId:nodes.id,manufacturer:''})
        });
        var IDMark_A = "_a";
        var setting = {
            isSimpleData : true,              //数据是否采用简单 Array 格式，默认false
            treeNodeKey : "id",               //在isSimpleData格式下，当前节点id属性
            treeNodeParentKey : "pId",        //在isSimpleData格式下，当前节点的父节点id属性
            showLine : true,                  //是否显示节点间的连线
            checkable : true,               //每个节点上是否显示 CheckBox
            callback: {
                beforeClick: beforeClick,
            },
            async:{
                enable : true
            },
            view: {
                fontCss: getFontCss,
                nameIsHTML: true,
                showLine: true
            }
        };
        function getFontCss(treeId, treeNode) {
            return (!!treeNode.highlight==false) ? {color:"#333", "font-weight":"normal"}:{color:"#01B1ED", "font-weight":"bold"}
        }
        //ztree模糊查询
        $("#searchOrgPlant").unbind().on("click",function () {
            if($("#key").val()){
                var zTree = $.fn.zTree.getZTreeObj("ztree");
                var value = $("#key").val();
                var keyType = "name";
                var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                updateNodes(true,nodeList); //更新节点
            }
        });
        $("#key").unbind().on("keydown",function (e) {
            $.fn.zTree.getZTreeObj("ztree").expandAll(false);
            if($("#key").val()){
                if(e.keyCode == 13){
                    var zTree = $.fn.zTree.getZTreeObj("ztree");
                    var value = $("#key").val();
                    var keyType = "name";
                    var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                    updateNodes(true,nodeList); //更新节点
                }
            }
        });
        function updateNodes(highlight,nodeList) {
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            //获取所有节点 并设置highlight 为false 并updateNode 每一个 让上次搜索过的变成普通节点
            var node = zTree.getNodes();
            zTree.transformToArray(node).map(function (item) {
                item.highlight = false;
                zTree.updateNode(item);
            });
            for( var i=0, l=nodeList.length; i<l; i++) {
                nodeList[i].highlight = highlight; //高亮显示搜索到的节点(highlight是自己设置的一个属性)
                zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
                zTree.updateNode(nodeList[i]); //更新节点数据，主要用于该节点显示属性的更新
            }
        }
        //节点点击事件
        var log, className = "dark";
        function beforeClick(treeId, treeNode, clickFlag) {
            $('.rightInfo_device .deviceHead1').show();
            $('.noData').hide();
            $('.inverterDeviceTable').show();
            //判断最终节点是否选择了电站
            if(treeNode.isPlant==true){
                that.plantId = treeNode.id;
                that.plantName = treeNode.name;
                that.org = treeNode.getParentNode().name;
                that.orgId = treeNode.getParentNode().id;
                that.getData({plantId:treeNode.id,deviceName:'',status:'',tokenId:Cookies.getCook('tokenId'),orgId:treeNode.getParentNode().id,manufacturer:''})
            }else{
                that.plantId = '';
                that.plantName = '';
                that.org = treeNode.name;
                that.orgId = treeNode.id;
                that.getData({plantId:'',deviceName:'',status:'',tokenId:Cookies.getCook('tokenId'),orgId:treeNode.id,manufacturer:''})
            }


        }
    },
    //获取表格数据
    getData:function(obj){
        if(this.inverterDeviceTable){
            this.inverterDeviceTable.fnClearTable(false);
            this.inverterDeviceTable.fnDestroy()
        }
        var columns =  [
            { data: "deviceName",title:$.getI18n('deviceName'),width:'10%',render:function(data){
                return '<div class="td-noWrap-interver" title="'+data+'">'+data+'</div>'
            }},
            { data: "sn",title:$.getI18n('sn'),width:'10%',render:function(data){
                return '<div class="td-noWrap-interver" title="'+data+'">'+data+'</div>'
            }},
            { data: "manufacturer",title:$.getI18n('manufacturer'),width:'8%'},
            { data: "model" ,title:$.getI18n('model'),render:function(data){
                return '<div class="td-noWrap-interver" title="'+data+'">'+data+'</div>'
            }},
            { data: "power",title:$.getI18n('power'),width:'10%'},
            { data: "orgName",title:$.getI18n('orgName'),render:function(data){
                return '<div class="td-noWrap-interver" title="'+data+'">'+data+'</div>'
            }},
            { data: "plantName",title:$.getI18n('plantName'),render:function(data){
                return '<div class="td-noWrap-interver" title="'+data+'">'+data+'</div>'
            }},
            { data: "connTime",title:$.getI18n('accessTime'),width:'12%',render:function(data){
                return '<div class="td-noWrap-time" title="'+data+'">'+data+'</div>'
            }},
            { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                if(data==1){
                    return '<span style="color:#29AD00">'+$.getI18n('enable')+'</span>'
                }else{
                    return '<span>'+$.getI18n('noEnable')+'</span>'
                }
            }}
        ];
        if(!!window.systemRole['inverterManageEdit']){
            columns.push(
                {data:'typeId',title:$.getI18n('operate'),render:function(data){
                    return '<a style="width: 50px;display: inline-block;background:rgba(48,166,250,.5);color: #fff;height: 26px;line-height: 26px;text-align: center;" class="modifyInverter" data-id="'+data+'">编辑</a>'
                }})
        }
        this.inverterDeviceTable = $('#inverterDeviceTable').dataTable({
            ajax:{
                type:'POST',
                url:'/device/getInverterList.do',
                //data:obj,
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                data:function(d){
                    d.deviceName=obj.deviceName;
                    d.plantId = obj.plantId;
                    d.status = obj.status;
                    d.tokenId = obj.tokenId;
                    d.orgId = obj.orgId;
                    d.manufacturer = obj.manufacturer;
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    Number(json.code) == 103 && App.alert(json.msg);
                    // !json.body ? (json.body={data:[],recordsTotal:0,recordsFiltered:0, draw:1}): (json.recordsTotal = json.body.recordsTotal, json.recordsFiltered = json.body.recordsFiltered);
                    !json.body ? (json.body={data:[],recordsTotal:0,recordsFiltered:0, draw:1},json.recordsTotal = 0, json.recordsFiltered = 0,json.body.data=[]): (json.recordsTotal = json.body.recordsTotal, json.recordsFiltered = json.body.recordsFiltered);
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort:false,
            bInfo:false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
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
            columns:columns,
        });
        var that = this;
        //查询出详情
        $("#inverterDeviceTable tbody ").off('click').on('click','tr a.modifyInverter',function(e){
            var index = $(this).parent('td').parent('tr').index();
            var data = that.inverterDeviceTable.api(true).row( index).data();
            var id = data.deviceId;
            if(Cookies.getCook('roleId')==4){
                var detailTable = App.dialog({
                    title: $.getI18n('inverterDetail'),
                    width: 900,
                    height: 800,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:that.inverterDetail() ,
                    openEvent: function () {
                        //查询出组串信息并赋值
                        var tdHtml = '';
                        $('.zcTable tbody').empty();
                        $.http.POST('/device/getModuleInfo.do',{deviceId:id,tokenId:Cookies.getCook('tokenId')},function(res){
                            if(res.body.data.length > 0){
                                // that.moduleId = res.body.data[0].moduleId
                                $.each(res.body.data,function(i,val){
                                    tdHtml += '            <tr>\n' +
                                        '                <td><input type="text" name="pvName" value="'+val.pvName+'" style="width: 60px" readonly></td>\n' +
                                        '                <td  title="'+val.moduleNum+'" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum" value="'+val.moduleNum+'" style="width: 150px" ></td>\n' +
                                        '                <td><input type="text" name="manufacturer" value="'+val.manufacturer+'" style="width: 80px" readonly></td>\n' +
                                        '                <td><input type="text" name="moduleType" value="'+val.moduleType+'" style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="modulePower" value="'+val.modulePower+'" style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="count" value="'+val.count+'" style="width: 60px"></td>\n' +
                                        '                <td><input type="text" name="DCpower" value="'+val.DCpower+'" style="width: 60px" readonly></td>\n' +
                                        '                <td><input name="pvId" value="'+val.pvId+'" style="display: none"/><input name="moduleId" value="'+val.moduleId+'" style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                        '            </tr>\n'
                                });
                                if(res.body.realCount<data.maxRoute){
                                    var addNum = Number(data.maxRoute)- Number(res.body.realCount);
                                    var len =  Number(res.body.realCount);
                                    for(var k = 0; k<addNum;k++){
                                        tdHtml += '            <tr>\n' +
                                            '                <td><input type="text" name="pvName"  style="width: 60px" readonly value="pv'+Number(len+k+1)+'"></td>\n' +
                                            '                <td title="" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum"  style="width: 150px" ></td>\n' +
                                            '                <td><input type="text" name="manufacturer"  style="width: 80px" readonly></td>\n' +
                                            '                <td><input type="text" name="moduleType"  style="width: 60px" readonly></td>\n' +
                                            '                <td><input type="text" name="modulePower" style="width: 60px" readonly></td>\n' +
                                            '                <td><input type="text" name="count"  style="width: 60px"></td>\n' +
                                            '                <td><input type="text" name="DCpower"  style="width: 60px" readonly></td>\n' +
                                            '                <td><input name="pvId" value=""  style="display: none"/><input name="moduleId"  style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                            '            </tr>\n'
                                    }
                                }
                                $('.zcTable tbody').append(tdHtml)
                            }else{
                                //App.alert(res.msg)
                                // tdHtml = '<tr><td colspan="8" align="center">暂无数据</td></tr>'
                                for(var k = 0; k<data.maxRoute;k++){
                                    tdHtml += '            <tr>\n' +
                                        '                <td><input type="text" name="pvName"  style="width: 60px" readonly value="pv'+Number(k+1)+'"></td>\n' +
                                        '                <td title="" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum"  style="width: 150px" ></td>\n' +
                                        '                <td><input type="text" name="manufacturer"  style="width: 80px" readonly></td>\n' +
                                        '                <td><input type="text" name="moduleType"  style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="modulePower" style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="count"  style="width: 60px"></td>\n' +
                                        '                <td><input type="text" name="DCpower"  style="width: 60px" readonly></td>\n' +
                                        '                <td><input name="pvId"  style="display: none"/><input name="moduleId"  style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                        '            </tr>\n'
                                }
                                $('.zcTable tbody').append(tdHtml)
                            }
                            //点击置空按钮，将当前行所有的input值清空
                            $('.zcTable tbody tr td a').unbind().on('click',function(){
                                $(this).parent('td').siblings('td').find('input').not('input[name="pvName"]').val('')
                            });
                            //计算直流功率
                            $('.zcTable tbody tr td').find('input[name="count"]').on('change',function(){
                                var p = $(this).parent('td').parent('tr').find('input[name="modulePower"]').val();
                                var t = $(this).val();
                                var num = p*t/1000;
                                $(this).parent('td').parent('tr').find('input[name="DCpower"]').val(num.toFixed(1))
                            });
                            //根据第一行快速输入
                            $('.fastInput').unbind('click').on('click',function(){
                                if($(this).find('img').attr('src')!='/images/repImages/rect1.png'){
                                    $(this).find('img').attr('src','/images/repImages/rect1.png');
                                    var zcData = [];
                                    $('.zcTable tbody tr:first').each(function(i){
                                        var object = {};
                                        $(this).children('td').each(function(j){
                                            $(this).children().each(function(k){
                                                var name = $(this)[0].name;
                                                object[name] = $(this).val()
                                            })
                                        });
                                        zcData[i]= object
                                    });
                                    $('.zcTable tbody tr').each(function(i){
                                        $(this).children('td').each(function(j){
                                            $(this).children().each(function(k){
                                                var name = $(this)[0].name;
                                                var tt = $(this).val();
                                                if(name == 'pvId' || name=='pvName'){
                                                    tt = tt
                                                }else{
                                                    tt =  zcData[0][name]
                                                }
                                                $(this).val(tt)
                                            })
                                        })
                                    })
                                }else{
                                    $(this).find('img').attr('src','/images/repImages/rect.png')
                                }
                            });
                            //点击组串信息标识 弹窗选择框
                            $('.zcTable tbody tr').find('td.changeModuleNum').unbind().on('click',function(){
                                var curTr = $(this);
                                var detailTable = App.dialog({
                                    title: $.getI18n('zcModelIdentification'),
                                    width: 900,
                                    height:600 ,
                                    maxWidth: document.documentElement.clientWidth - 40,
                                    maxHeight: document.documentElement.clientHeight - 42,
                                    appendTo: 'body',
                                    backdrop: false,
                                    modal: true,
                                    keyboard: true,
                                    content: $that.zcInfoTep(),
                                    openEvent:function(){
                                        //查询出所有的组串信息
                                        // $.http.POST()
                                        $that.getModuleTable({manufacturer:'',modelIdentity:'',power:'',tokenId:Cookies.getCook('tokenId')});
                                        //点击搜索按钮  模糊搜索
                                        $('.sureSearch').on('click',function(){
                                            var manufacturer = $('input[name="manufacturer1"]').val();
                                            var modelIdentity = $('input[name="modelIdentity1"]').val();
                                            var power = $('input[name="power1"]').val();
                                            $that.getModuleTable({manufacturer:manufacturer,modelIdentity:modelIdentity,power:power,tokenId:Cookies.getCook('tokenId')})
                                        })
                                    },
                                    closeEvent: null,
                                    isdrag: true,
                                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                                        //点击保存按钮获取当前值
                                        $.each($('#moduleTable tbody tr'),function(i,val){
                                            if($(this).find('img').attr('src')=='/images/repImages/rect1.png'){
                                                var index = $(this).index();
                                                var data = $that.moduleTable.api(true).row( index).data();
                                                // console.log(data)
                                                // this.zcObj = data
                                                curTr.attr('title',data.moduleIdentity);
                                                curTr.find('input').val(data.moduleIdentity);
                                                curTr.siblings('td').find('input[name="manufacturer"]').val(data.manufacturer);
                                                curTr.siblings('td').find('input[name="moduleType"]').val(data.moduleType);
                                                curTr.siblings('td').find('input[name="modulePower"]').val(data.power);
                                                curTr.siblings('td').find('input[name="moduleId"]').val(data.moduleId);
                                                curTr.siblings('td').find('input[name="count"]').change()
                                            }
                                        })
                                    }}]
                                })
                            })
                        });
                        //查询出设备信息详情  type=1
                        //头部切换
                        $('#devForm').setForm(data);
                        var $that = that;
                        $('.headChange span').unbind().on('click',function(e){
                            $('.headChange span').removeClass('chooseSpan');
                            $(this).addClass('chooseSpan');
                            var type = $(this).data('type');
                            switch (type){
                                case 1:
                                    $('.devInfo').show();

                                    $('.devTables').hide();
                                    break;
                                case 2:
                                    $('.devInfo').hide();
                                    $('.devTables').show();
                                    $('#YCTable').show();
                                    $('#YKTable').hide();
                                    $('#YXTable').hide();
                                    $('#YXTable_paginate').hide();
                                    $('#YKTable_paginate').hide();
                                    $('#YCTable_paginate').show();
                                    $('#YCTable_wrapper').hide();
                                    $('#YKTable_wrapper').hide();
                                    $('#YXTable_wrapper').hide();
                                    $that.getYCTable({deviceId:id,tokenId:Cookies.getCook('tokenId')});
                                    break;
                                case 3:
                                    $('.devInfo').hide();
                                    $('.devTables').show();
                                    $('#YCTable').hide();
                                    $('#YKTable').hide();
                                    $('#YXTable').show();
                                    $('#YCTable_paginate').hide();
                                    $('#YKTable_paginate').hide();
                                    $('#YXTable_paginate').show();
                                    $('#YCTable_wrapper').hide();
                                    $('#YKTable_wrapper').hide();
                                    $('#YXTable_wrapper').hide();
                                    $that.getYXTable({deviceId:id,tokenId:Cookies.getCook('tokenId')});
                                    break;
                                case 4:
                                    $('.devInfo').hide();
                                    $('.devTables').show();
                                    $('#YCTable').hide();
                                    $('#YXTable').hide();
                                    $('#YKTable').show();
                                    $('#YXTable_paginate').hide();
                                    $('#YCTable_paginate').hide();
                                    $('#YKTable_paginate').show();
                                    $('#YCTable_wrapper').hide();
                                    $('#YKTable_wrapper').hide();
                                    $('#YXTable_wrapper').hide();
                                    $that.getYKTable({deviceId:id,tokenId:Cookies.getCook('tokenId')});
                                    break;
                            }
                        });
                        //设备型号标识弹窗更改
                        $('#devForm').unbind().on('click','.changeDeviceIdentity',function(){
                            var changeDeviceIdentity = App.dialog({
                                title: $.getI18n('deviceModelIdentification'),
                                width: 900,
                                height:600 ,
                                maxWidth: document.documentElement.clientWidth - 40,
                                maxHeight: document.documentElement.clientHeight - 42,
                                appendTo: 'body',
                                backdrop: false,
                                modal: true,
                                keyboard: true,
                                content: $that.getDeviceTypeTableTep(),
                                openEvent:function(){
                                    $that.getDeviceTypeTable({plantId:data.plantId,orgId:data.orgId,deviceId:data.deviceId,tokenId:Cookies.getCook('tokenId')})
                                },
                                closeEvent: null,
                                isdrag: true,
                                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                                    // 点击保存按钮获取当前值
                                    $.each($('#deviceTypeTable tbody tr'),function(i,val){
                                        if($(this).find('img').attr('src')=='/images/repImages/rect1.png'){
                                            var index = $(this).index();
                                            var data1 = $that.deviceTypeTable.api(true).row( index).data();
                                            var tdTep = '';
                                            data1.deviceName = $('#devForm').find('input[name="deviceName"]').val();
                                            if(data1.modelId!=data.modelId){
                                                data.modelId = data1.modelId;
                                                data.hasChanged = 1;
                                                $('#devForm').setForm(data1);
                                                that.modelFlag = true;
                                                that.maxRoute = data1.maxRoute;
                                                $('.zcTable tbody').empty();
                                                for(var k = 0; k<data1.maxRoute;k++){
                                                    tdTep += '            <tr>\n' +
                                                        '                <td><input type="text" name="pvName"  style="width: 60px" readonly value="pv'+Number(k+1)+'"></td>\n' +
                                                        '                <td title="" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum"  style="width: 150px" ></td>\n' +
                                                        '                <td><input type="text" name="manufacturer"  style="width: 80px" readonly></td>\n' +
                                                        '                <td><input type="text" name="moduleType"  style="width: 60px" readonly></td>\n' +
                                                        '                <td><input type="text" name="modulePower" style="width: 60px" readonly></td>\n' +
                                                        '                <td><input type="text" name="count"  style="width: 60px"></td>\n' +
                                                        '                <td><input type="text" name="DCpower"  style="width: 60px" readonly></td>\n' +
                                                        '                <td><input name="pvId"  style="display: none"/><input name="moduleId"  style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                                        '            </tr>\n'
                                                }
                                                $('.zcTable tbody').append(tdTep);
                                                //点击置空按钮，将当前行所有的input值清空
                                                $('.zcTable tbody tr td a').unbind().on('click',function(){
                                                    $(this).parent('td').siblings('td').find('input').not('input[name="pvName"]').val('')
                                                });
                                                //计算直流功率
                                                $('.zcTable tbody tr td').find('input[name="count"]').on('change',function(){
                                                    var p = $(this).parent('td').parent('tr').find('input[name="modulePower"]').val();
                                                    var t = $(this).val();
                                                    var num = p*t/1000;
                                                    $(this).parent('td').parent('tr').find('input[name="DCpower"]').val(num.toFixed(1))
                                                });
                                                //选择组串型号标识
                                                $('.zcTable tbody tr').find('td.changeModuleNum').unbind().on('click',function(){
                                                    var curTr = $(this);
                                                    var detailTable = App.dialog({
                                                        title: $.getI18n('zcModelIdentification'),
                                                        width: 900,
                                                        height:600 ,
                                                        maxWidth: document.documentElement.clientWidth - 40,
                                                        maxHeight: document.documentElement.clientHeight - 42,
                                                        appendTo: 'body',
                                                        backdrop: false,
                                                        modal: true,
                                                        keyboard: true,
                                                        content: $that.zcInfoTep(),
                                                        openEvent:function(){
                                                            //查询出所有的组串信息
                                                            // $.http.POST()
                                                            $that.getModuleTable({manufacturer:'',modelIdentity:'',power:'',tokenId:Cookies.getCook('tokenId')});
                                                            //点击搜索按钮  模糊搜索
                                                            $('.sureSearch').on('click',function(){
                                                                var manufacturer = $('input[name="manufacturer1"]').val();
                                                                var modelIdentity = $('input[name="modelIdentity1"]').val();
                                                                var power = $('input[name="power1"]').val();
                                                                $that.getModuleTable({manufacturer:manufacturer,modelIdentity:modelIdentity,power:power,tokenId:Cookies.getCook('tokenId')})
                                                            })
                                                        },
                                                        closeEvent: null,
                                                        isdrag: true,
                                                        buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                                                            //点击保存按钮获取当前值
                                                            $.each($('#moduleTable tbody tr'),function(i,val){
                                                                if($(this).find('img').attr('src')=='/images/repImages/rect1.png'){
                                                                    var index = $(this).index();
                                                                    var data = $that.moduleTable.api(true).row( index).data();
                                                                    curTr.attr('title',data.moduleIdentity);
                                                                    curTr.find('input').val(data.moduleIdentity);
                                                                    curTr.siblings('td').find('input[name="manufacturer"]').val(data.manufacturer);
                                                                    curTr.siblings('td').find('input[name="moduleType"]').val(data.moduleType);
                                                                    curTr.siblings('td').find('input[name="modulePower"]').val(data.power);
                                                                    curTr.siblings('td').find('input[name="moduleId"]').val(data.moduleId);
                                                                    curTr.siblings('td').find('input[name="count"]').change()
                                                                }
                                                            })
                                                        }}]
                                                    })
                                                })
                                            }else{
                                                data.modelId = data1.modelId;
                                                data.hasChanged = 0;
                                                $('#devForm').setForm(data1)
                                            }
                                        }
                                    })
                                }}]
                            })
                        })
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
                });
                //点击保存按钮保存组串信息
                $('#saveOwner').unbind().on('click',function(){
                    var obj = $('#devForm').getForm();
                    //获取每一行的值
                    var tt = [];
                    $('.zcTable tbody tr').each(function(i){
                        var object = 'obj' + (i + 1);
                        object = {};
                        $(this).children('td').each(function(j){
                            $(this).children().each(function(k){
                                var name = $(this)[0].name;
                                object[name] = $(this).val()
                            })
                        });
                        tt[i]= object
                    });
                    obj.data = tt;
                    obj.deviceId = id;
                    obj.tokenId = Cookies.getCook('tokenId');
                    obj.typeId =data.typeId;
                    obj.modelId =data.modelId;
                    obj.hasChanged = data.hasChanged;
                    $.http.POST('/device/updateInEtModue.do',obj,function(res){
                        App.warningDialog(res.msg);
                        that.getData({plantId:that.plantId,deviceName:'',status:'',tokenId:Cookies.getCook('tokenId'),manufacturer:'',orgId:that.orgId})
                    })
                });
                e.stopPropagation()
            }else{
                var detailTable = App.dialog({
                    title: $.getI18n('inverterDetail'),
                    width: 900,
                    height: 800,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:that.inverterDetail1() ,
                    openEvent: function () {
                        //查询出组串信息并赋值
                        var tdHtml = '';
                        $('.zcTable tbody').empty();
                        $.http.POST('/device/getModuleInfo.do',{deviceId:id,tokenId:Cookies.getCook('tokenId')},function(res){
                            if(res.body.data.length > 0){
                                // that.moduleId = res.body.data[0].moduleId
                                $.each(res.body.data,function(i,val){
                                    tdHtml += '            <tr>\n' +
                                        '                <td><input type="text" name="pvName" value="'+val.pvName+'" style="width: 60px" readonly></td>\n' +
                                        '                <td  title="'+val.moduleNum+'" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum" value="'+val.moduleNum+'" style="width: 150px" ></td>\n' +
                                        '                <td><input type="text" name="manufacturer" value="'+val.manufacturer+'" style="width: 80px" readonly></td>\n' +
                                        '                <td><input type="text" name="moduleType" value="'+val.moduleType+'" style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="modulePower" value="'+val.modulePower+'" style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="count" value="'+val.count+'" style="width: 60px"></td>\n' +
                                        '                <td><input type="text" name="DCpower" value="'+val.DCpower+'" style="width: 60px" readonly></td>\n' +
                                        '                <td><input name="pvId" value="'+val.pvId+'" style="display: none"/><input name="moduleId" value="'+val.moduleId+'" style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                        '            </tr>\n'
                                });
                                if(res.body.realCount<data.maxRoute){
                                    var addNum = Number(data.maxRoute)- Number(res.body.realCount);
                                    var len =  Number(res.body.realCount);
                                    for(var k = 0; k<addNum;k++){
                                        tdHtml += '            <tr>\n' +
                                            '                <td><input type="text" name="pvName"  style="width: 60px" readonly value="pv'+Number(len+k+1)+'"></td>\n' +
                                            '                <td title="" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum"  style="width: 150px" ></td>\n' +
                                            '                <td><input type="text" name="manufacturer"  style="width: 80px" readonly></td>\n' +
                                            '                <td><input type="text" name="moduleType"  style="width: 60px" readonly></td>\n' +
                                            '                <td><input type="text" name="modulePower" style="width: 60px" readonly></td>\n' +
                                            '                <td><input type="text" name="count"  style="width: 60px"></td>\n' +
                                            '                <td><input type="text" name="DCpower"  style="width: 60px" readonly></td>\n' +
                                            '                <td><input name="pvId" value=""  style="display: none"/><input name="moduleId"  style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                            '            </tr>\n'
                                    }
                                }
                                $('.zcTable tbody').append(tdHtml)
                            }else{
                                //App.alert(res.msg)
                                // tdHtml = '<tr><td colspan="8" align="center">暂无数据</td></tr>'
                                for(var k = 0; k<data.maxRoute;k++){
                                    tdHtml += '            <tr>\n' +
                                        '                <td><input type="text" name="pvName"  style="width: 60px" readonly value="pv'+Number(k+1)+'"></td>\n' +
                                        '                <td title="" class="changeModuleNum"><input style="cursor:pointer" type="text" name="moduleNum"  style="width: 150px" ></td>\n' +
                                        '                <td><input type="text" name="manufacturer"  style="width: 80px" readonly></td>\n' +
                                        '                <td><input type="text" name="moduleType"  style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="modulePower" style="width: 60px" readonly></td>\n' +
                                        '                <td><input type="text" name="count"  style="width: 60px"></td>\n' +
                                        '                <td><input type="text" name="DCpower"  style="width: 60px" readonly></td>\n' +
                                        '                <td><input name="pvId"  style="display: none"/><input name="moduleId"  style="display: none"/><a style="display: inline-block;background: rgba(255,49,15,.5);color: #fff;padding: 5px 8px;border-radius: 4px ">置空</a></td>\n' +
                                        '            </tr>\n'
                                }
                                $('.zcTable tbody').append(tdHtml)
                            }
                            //点击置空按钮，将当前行所有的input值清空
                            $('.zcTable tbody tr td a').unbind().on('click',function(){
                                $(this).parent('td').siblings('td').find('input').not('input[name="pvName"]').val('')
                            });
                            //计算直流功率
                            $('.zcTable tbody tr td').find('input[name="count"]').on('change',function(){
                                var p = $(this).parent('td').parent('tr').find('input[name="modulePower"]').val();
                                var t = $(this).val();
                                var num = p*t/1000;
                                $(this).parent('td').parent('tr').find('input[name="DCpower"]').val(num.toFixed(1))
                            });
                            //根据第一行快速输入
                            $('.fastInput').unbind('click').on('click',function(){
                                if($(this).find('img').attr('src')!='/images/repImages/rect1.png'){
                                    $(this).find('img').attr('src','/images/repImages/rect1.png');
                                    var zcData = [];
                                    $('.zcTable tbody tr:first').each(function(i){
                                        var object = {};
                                        $(this).children('td').each(function(j){
                                            $(this).children().each(function(k){
                                                var name = $(this)[0].name;
                                                object[name] = $(this).val()
                                            })
                                        });
                                        zcData[i]= object
                                    });
                                    $('.zcTable tbody tr').each(function(i){
                                        $(this).children('td').each(function(j){
                                            $(this).children().each(function(k){
                                                var name = $(this)[0].name;
                                                var tt = $(this).val();
                                                if(name == 'pvId' || name=='pvName'){
                                                    tt = tt
                                                }else{
                                                    tt =  zcData[0][name]
                                                }
                                                $(this).val(tt)
                                            })
                                        })
                                    })
                                }else{
                                    $(this).find('img').attr('src','/images/repImages/rect.png')
                                }
                            });
                            //点击组串信息标识 弹窗选择框
                            $('.zcTable tbody tr').find('td.changeModuleNum').unbind().on('click',function(){
                                var curTr = $(this);
                                var detailTable = App.dialog({
                                    title: $.getI18n('zcModelIdentification'),
                                    width: 900,
                                    height:600 ,
                                    maxWidth: document.documentElement.clientWidth - 40,
                                    maxHeight: document.documentElement.clientHeight - 42,
                                    appendTo: 'body',
                                    backdrop: false,
                                    modal: true,
                                    keyboard: true,
                                    content: $that.zcInfoTep(),
                                    openEvent:function(){
                                        //查询出所有的组串信息
                                        // $.http.POST()
                                        $that.getModuleTable({manufacturer:'',modelIdentity:'',power:'',tokenId:Cookies.getCook('tokenId')});
                                        //点击搜索按钮  模糊搜索
                                        $('.sureSearch').on('click',function(){
                                            var manufacturer = $('input[name="manufacturer1"]').val();
                                            var modelIdentity = $('input[name="modelIdentity1"]').val();
                                            var power = $('input[name="power1"]').val();
                                            $that.getModuleTable({manufacturer:manufacturer,modelIdentity:modelIdentity,power:power,tokenId:Cookies.getCook('tokenId')})
                                        })
                                    },
                                    closeEvent: null,
                                    isdrag: true,
                                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                                        //点击保存按钮获取当前值
                                        $.each($('#moduleTable tbody tr'),function(i,val){
                                            if($(this).find('img').attr('src')=='/images/repImages/rect1.png'){
                                                var index = $(this).index();
                                                var data = $that.moduleTable.api(true).row( index).data();
                                                // console.log(data)
                                                // this.zcObj = data
                                                curTr.attr('title',data.moduleIdentity);
                                                curTr.find('input').val(data.moduleIdentity);
                                                curTr.siblings('td').find('input[name="manufacturer"]').val(data.manufacturer);
                                                curTr.siblings('td').find('input[name="moduleType"]').val(data.moduleType);
                                                curTr.siblings('td').find('input[name="modulePower"]').val(data.power);
                                                curTr.siblings('td').find('input[name="moduleId"]').val(data.moduleId);
                                                curTr.siblings('td').find('input[name="count"]').change()
                                            }
                                        })
                                    }}]
                                })
                            })
                        });
                        //查询出设备信息详情  type=1
                        //头部切换
                        $('#devForm').setForm(data);
                        var $that = that;
                        $('.headChange span').unbind().on('click',function(e){
                            $('.headChange span').removeClass('chooseSpan');
                            $(this).addClass('chooseSpan');
                            var type = $(this).data('type');
                            switch (type){
                                case 1:
                                    $('.devInfo').show();

                                    $('.devTables').hide();
                                    break;
                                case 2:
                                    $('.devInfo').hide();
                                    $('.devTables').show();
                                    $('#YCTable').show();
                                    $('#YKTable').hide();
                                    $('#YXTable').hide();
                                    $('#YXTable_paginate').hide();
                                    $('#YKTable_paginate').hide();
                                    $('#YCTable_paginate').show();
                                    $('#YCTable_wrapper').hide();
                                    $('#YKTable_wrapper').hide();
                                    $('#YXTable_wrapper').hide();
                                    $that.getYCTable({deviceId:id,tokenId:Cookies.getCook('tokenId')});
                                    break;
                                case 3:
                                    $('.devInfo').hide();
                                    $('.devTables').show();
                                    $('#YCTable').hide();
                                    $('#YKTable').hide();
                                    $('#YXTable').show();
                                    $('#YCTable_paginate').hide();
                                    $('#YKTable_paginate').hide();
                                    $('#YXTable_paginate').show();
                                    $('#YCTable_wrapper').hide();
                                    $('#YKTable_wrapper').hide();
                                    $('#YXTable_wrapper').hide();
                                    $that.getYXTable({deviceId:id,tokenId:Cookies.getCook('tokenId')});
                                    break;
                                case 4:
                                    $('.devInfo').hide();
                                    $('.devTables').show();
                                    $('#YCTable').hide();
                                    $('#YXTable').hide();
                                    $('#YKTable').show();
                                    $('#YXTable_paginate').hide();
                                    $('#YCTable_paginate').hide();
                                    $('#YKTable_paginate').show();
                                    $('#YCTable_wrapper').hide();
                                    $('#YKTable_wrapper').hide();
                                    $('#YXTable_wrapper').hide();
                                    $that.getYKTable({deviceId:id,tokenId:Cookies.getCook('tokenId')});
                                    break;
                            }
                        });
                        //设备型号标识弹窗更改
                        $('#devForm').unbind().on('click','.changeDeviceIdentity',function(){
                            var changeDeviceIdentity = App.dialog({
                                title: $.getI18n('deviceModelIdentification'),
                                width: 900,
                                height:600 ,
                                maxWidth: document.documentElement.clientWidth - 40,
                                maxHeight: document.documentElement.clientHeight - 42,
                                appendTo: 'body',
                                backdrop: false,
                                modal: true,
                                keyboard: true,
                                content: $that.getDeviceTypeTableTep(),
                                openEvent:function(){
                                    $that.getDeviceTypeTable({plantId:data.plantId,orgId:data.orgId,deviceId:data.deviceId,tokenId:Cookies.getCook('tokenId')})
                                },
                                closeEvent: null,
                                isdrag: true,
                                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                                    // 点击保存按钮获取当前值
                                    $.each($('#deviceTypeTable tbody tr'),function(i,val){
                                        if($(this).find('img').attr('src')=='/images/repImages/rect1.png'){
                                            var index = $(this).index();
                                            var data1 = $that.deviceTypeTable.api(true).row( index).data();
                                            data1.deviceName = $('#devForm').find('input[name="deviceName"]').val();
                                            data.modelId = data1.modelId;
                                            $('#devForm').setForm(data1)
                                        }
                                    })
                                }}]
                            })
                        })
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
                });
                //点击保存按钮保存组串信息
                $('#saveOwner').unbind().on('click',function(){
                    var obj = $('#devForm').getForm();
                    //获取每一行的值
                    var tt = [];
                    $('.zcTable tbody tr').each(function(i){
                        var object = 'obj' + (i + 1);
                        object = {};
                        $(this).children('td').each(function(j){
                            $(this).children().each(function(k){
                                var name = $(this)[0].name;
                                object[name] = $(this).val()
                            })
                        });
                        tt[i]= object
                    });
                    obj.data = tt;
                    obj.deviceId = id;
                    obj.tokenId = Cookies.getCook('tokenId');
                    obj.typeId =data.typeId;
                    obj.modelId =data.modelId;
                    //console.log('bogwjg',obj)
                    $.http.POST('/device/updateInEtModue.do',obj,function(res){
                        App.warningDialog(res.msg);
                        that.getData({plantId:that.plantId,deviceName:'',status:'',tokenId:Cookies.getCook('tokenId'),manufacturer:'',orgId:that.orgId})
                    })
                });
                e.stopPropagation()
            }

        })
    },
    //详情信息弹窗
    inverterDetail:function(){
        var inverterDetail  = '<div class="inverterDetail">\n' +
            '<div class="headChange"><span class="chooseSpan" data-type="1" >'+$.getI18n("deviceInfo")+'</span><span data-type="2" >'+$.getI18n("ycInfo")+'</span><span data-type="3">'+$.getI18n("yxInfo")+'</span><span data-type="4">'+$.getI18n("ykYtInfo")+'</span></div>'+
            '    <div class="devInfo">\n' +
            '        <div class="jgLine"><span>'+$.getI18n("deviceInfo")+'</span></div>\n' +
            '        <form action="" class="devForm" id="devForm">\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('deviceName')+'<span>:</span></label>\n' +
            '                <input type="text" name="deviceName">\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n("deviceModelIdentification")+'<span>:<span></label>\n' +
            '                <input style="cursor:pointer" class="changeDeviceIdentity" type="text" name="deviceIdentity">\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n("deviceType")+'<span>:</span></label>\n' +
            '                <input type="text" name="deviceType" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('manufacturer')+'<span>:</span></label>\n' +
            '                <input type="text" name="manufacturer" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('model')+'<span>:</span></label>\n' +
            '                <input type="text" name="model" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('power')+'<span>:</span></label>\n' +
            '                <input type="text" name="power" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('efficace')+'<span>:</span></label>\n' +
            '                <input type="text" name="efficace" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('mttpRoute')+'<span>:</span></label>\n' +
            '                <input type="text" name="mttpRoute" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('maxRoute')+'<span>:</span></label>\n' +
            '                <input type="text" name="maxRoute" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('connTime')+'<span>:</span></label>\n' +
            '                <input style="cursor:pointer;background:#fff" type="text" name="connTime" onclick="WdatePicker({readOnly:true})">\n' +
            '            </div>\n' +
            '        </form>\n' +
            '    </div>\n' +
            '    <div class="devTables">\n' +
            '        <table id="YCTable" class="hover stripe">\n' +
            '            \n' +
            '        </table>\n' +
            '        <table id="YXTable" class="hover stripe" style="display: none;">\n' +
            '            \n' +
            '        </table>\n' +
            '        <table id="YKTable" class="hover stripe" style="display: none;">\n' +
            '            \n' +
            '        </table>\n' +
            '    </div>\n' +
            '    <div class="devInfo">\n' +
            '        <div class="jgLine"><span>'+$.getI18n('zcInfo')+'</span></div>\n' +
            '       <p class="fastInput"><img src="/images/repImages/rect.png" alt="">'+$.getI18n('fastInput')+'</p>\n' +
            '      <table class="hover stripe zcTable" style="width:100%">\n' +
            '        <thead>\n' +
            '            <tr>\n' +
            '                <th>'+$.getI18n('zcSn')+'</th>\n' +
            '                <th>'+$.getI18n("zcModelIdentification")+'</th>\n' +
            '                <th>'+$.getI18n("assemblyManu")+'</th>\n' +
            '                <th>'+$.getI18n('assemblyType')+'</th>\n' +
            '                <th>'+$.getI18n("power")+'<b>(W)<b></th>\n' +
            '                <th>'+$.getI18n("number")+'</th>\n' +
            '                <th>'+$.getI18n("zlsrgl")+'<b>(KW)<b></th>\n' +
            '                <th>'+$.getI18n("operate")+'</th>\n' +
            '            </tr>\n' +
            '        </thead>\n' +
            '<tbody>' +
            '</tbody>'+
            '       </table>'+
            '    </div>'+
            '</div>';
        return inverterDetail
    },
    //非sysadmin登录修改弹窗
    inverterDetail1:function(){
        var inverterDetail  = '<div class="inverterDetail">\n' +
            '<div class="headChange"><span class="chooseSpan" data-type="1" >'+$.getI18n("deviceInfo")+'</span><span data-type="2" >'+$.getI18n("ycInfo")+'</span><span data-type="3">'+$.getI18n("yxInfo")+'</span><span data-type="4">'+$.getI18n("ykYtInfo")+'</span></div>'+
            '    <div class="devInfo">\n' +
            '        <div class="jgLine"><span>'+$.getI18n("deviceInfo")+'</span></div>\n' +
            '        <form action="" class="devForm" id="devForm">\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('deviceName')+'<span>:</span></label>\n' +
            '                <input type="text" name="deviceName">\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n("deviceModelIdentification")+'<span>:<span></label>\n' +
            '                <input   type="text" name="deviceIdentity" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n("deviceType")+'<span>:</span></label>\n' +
            '                <input type="text" name="deviceType" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('manufacturer')+'<span>:</span></label>\n' +
            '                <input type="text" name="manufacturer" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('model')+'<span>:</span></label>\n' +
            '                <input type="text" name="model" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('power')+'<span>:</span></label>\n' +
            '                <input type="text" name="power" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('efficace')+'<span>:</span></label>\n' +
            '                <input type="text" name="efficace" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('mttpRoute')+'<span>:</span></label>\n' +
            '                <input type="text" name="mttpRoute" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('maxRoute')+'<span>:</span></label>\n' +
            '                <input type="text" name="maxRoute" disabled>\n' +
            '            </div>\n' +
            '            <div class="formItem">\n' +
            '                <label for="">'+$.getI18n('connTime')+'<span>:</span></label>\n' +
            '                <input style="cursor:pointer;background:#fff" type="text" name="connTime" onclick="WdatePicker({readOnly:true})">\n' +
            '            </div>\n' +
            '        </form>\n' +
            '    </div>\n' +
            '    <div class="devTables">\n' +
            '        <table id="YCTable" class="hover stripe">\n' +
            '            \n' +
            '        </table>\n' +
            '        <table id="YXTable" class="hover stripe" style="display: none;">\n' +
            '            \n' +
            '        </table>\n' +
            '        <table id="YKTable" class="hover stripe" style="display: none;">\n' +
            '            \n' +
            '        </table>\n' +
            '    </div>\n' +
            '    <div class="devInfo">\n' +
            '        <div class="jgLine"><span>'+$.getI18n('zcInfo')+'</span></div>\n' +
            '       <p class="fastInput"><img src="/images/repImages/rect.png" alt="">'+$.getI18n('fastInput')+'</p>\n' +
            '      <table class="hover stripe zcTable" style="width:100%">\n' +
            '        <thead>\n' +
            '            <tr>\n' +
            '                <th>'+$.getI18n('zcSn')+'</th>\n' +
            '                <th>'+$.getI18n("zcModelIdentification")+'</th>\n' +
            '                <th>'+$.getI18n("assemblyManu")+'</th>\n' +
            '                <th>'+$.getI18n('assemblyType')+'</th>\n' +
            '                <th>'+$.getI18n("power")+'<b>(W)<b></th>\n' +
            '                <th>'+$.getI18n("number")+'</th>\n' +
            '                <th>'+$.getI18n("zlsrgl")+'<b>(KW)<b></th>\n' +
            '                <th>'+$.getI18n("operate")+'</th>\n' +
            '            </tr>\n' +
            '        </thead>\n' +
            '<tbody>' +
            '</tbody>'+
            '       </table>'+
            '    </div>'+
            '</div>';
        return inverterDetail
    },
    //获取遥测信息、遥信信息、遥控/遥调信息表格
    getYCTable:function(obj){
        if(this.YCTable){
            this.YCTable.fnClearTable(false);
            this.YCTable.fnDestroy()
        }
        this.YCTable = $('#YCTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getYCList.do',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.deviceId = obj.deviceId;
                    d.tokenId = obj.tokenId;
                    d.draw = 2;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort: false,
            bInfo: false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: true,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
                {data: "signName", title: $.getI18n('signName')},
                {data: "dataGain", title: $.getI18n('dataGain')},
                {data: "unit", title: $.getI18n('unit')},
                {data: "correctionFactor", title: $.getI18n('correctionFactor')},
                {data: "mixValue", title: $.getI18n('mixValue')},
                {data: "maxValue", title: $.getI18n('maxValue')},
                {data: "vueGroup", title: $.getI18n('vueGroup')},
                {data: "imName", title: $.getI18n('imName')},
                {data: "specialProcess", title: $.getI18n('specialProcess')},
            ],
        })
    },
    getYKTable:function(obj){
        if(this.YKTable){
            this.YKTable.fnClearTable(false);
            this.YKTable.fnDestroy()
        }
        this.YKTable = $('#YKTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getYKList.do',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.deviceId = obj.deviceId;
                    d.tokenId = obj.tokenId;
                    d.draw = 4;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            bSort: false,
            bInfo: false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: true,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
                {data: "signName", title: $.getI18n('ykdName')},
                {data: "realType", title: $.getI18n('realType')},
                {data: "statusValue", title: $.getI18n('statusValue')},
                {data: "mixValue", title: $.getI18n('mixValue')},
                {data: "maxValue", title: $.getI18n('maxValue')},
                {data: "dataGain", title: $.getI18n('dataGain')}
            ],
        })
    },
    getYXTable:function(obj){
        if(this.YXTable){
            this.YXTable.fnClearTable(false);
            this.YXTable.fnDestroy()
        }
        this.YXTable = $('#YXTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getYXList.do',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.deviceId = obj.deviceId;
                    d.tokenId = obj.tokenId;
                    d.draw = 3;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort: false,
            bInfo: false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: true,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
                {data: "signalName", title: $.getI18n('signalName')},
                {data: "alarmType", title: $.getI18n('alarmType')},
                {data: "statusValue", title: $.getI18n('signalValue')},
                {data: "statusName", title: $.getI18n('status')},
                {data: "alarmLevel", title: $.getI18n('level')},
                {data: "ycAlarm", title: $.getI18n('ycAlarm')},
                {data: "startBit", title: $.getI18n('startBit')},
                {data: "alarmBitLength", title: $.getI18n('length')},
                {data: "alarmReason", title: $.getI18n('alarmReason')},
                {data: "suggest", title: $.getI18n('suggest')},
                {data: "faultPoint", title: $.getI18n('faultPoint')},
                {data: "visibility", title: $.getI18n('monitor')},
                {data: "push", title: $.getI18n('push')},
            ],
        })
    },
    //头部信息
    headTep:function(){
        var headTep = '    <div class="tabHead">\n' +
            '        <span data-type="1" class="onSpan">'+$.getI18n('deviceInfo')+'</span>\n' +
            '        <span data-type="2">'+$.getI18n('ycInfo')+'</span>\n' +
            '        <span data-type="3">'+$.getI18n('yxInfo')+'</span>\n' +
            '        <span data-type="4">'+$.getI18n('ykYtInfo')+'</span>\n' +
            '    </div>\n';
        return headTep
    },
    //组串信息弹窗模板
    zcInfoTep:function(){
        var zcInfoTep = '<div class="zcTep">\n' +
            '    <div class="searchDiv">\n' +
            '        <span>'+$.getI18n('manufacturer')+'<span>：</span></span>\n' +
            '        <input type="text" name="manufacturer1" i18nOnly="placeholder" i18n="'+$.getI18n('inputManufacturer')+'" placeholder="'+$.getI18n('inputManufacturer')+'">\n' +
            '    </div>\n' +
            '    <div class="searchDiv">\n' +
            '        <span>'+$.getI18n('zcIdentification')+'<span>：</span></span>\n' +
            '        <input type="text" name="modelIdentity1" i18nOnly="placeholder" i18n="'+$.getI18n('inputZcIdentification')+'" placeholder="'+$.getI18n('inputZcIdentification')+'">\n' +
            '    </div>\n' +
            '    <div class="searchDiv">\n' +
            '        <span>'+$.getI18n('zcPower')+'<span>：</span></span>\n' +
            '        <input type="text" name="power1" i18nOnly="placeholder" i18n="'+$.getI18n('inputZcPower')+'" placeholder="'+$.getI18n('inputZcPower')+'">\n' +
            '    </div>\n' +
            '    <div class="sureSearch">\n' +
            '        <a >'+$.getI18n('search')+'</a>\n' +
            '    </div>\n' +
            '<table id="moduleTable" class="hover stripe"></table>';
            '</div>';
        return zcInfoTep
    },
    //查询组串信息模糊搜索
    getModuleTable:function(obj){
        if(this.moduleTable){
            this.moduleTable.fnClearTable(false);
            this.moduleTable.fnDestroy()
        }
        this.moduleTable = $('#moduleTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getModuleInfoforChoice.do',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.tokenId = obj.tokenId;
                    d.manufacturer = obj.manufacturer;
                    d.modelIdentity  = obj.modelIdentity;
                    d.power = obj.power;
                    d.draw = 5;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    // console.log('json',json)
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort: false,
            bInfo: false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: true,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
                {data: "moduleIdentity", title: $.getI18n('deviceModelIdentification')},
                {data: "manufacturer", title: $.getI18n('manufacturer')},
                {data: "moduleType", title: $.getI18n('moduleType')},
                {data: "power", title: $.getI18n('power')},
                {data:'moduleId',title:$.getI18n('operate'),render:function(){
                    return '<img class="getChoice" src="/images/repImages/rect.png">'
                }}
            ],
        });
        //选择组串信号
        $('#moduleTable tbody').unbind().on('click','tr',function(){
            if($(this).find('td .getChoice').attr('src')=='/images/repImages/rect.png'){
                $(this).find('td .getChoice').attr('src','/images/repImages/rect1.png');
                $(this).siblings('tr').find('td img').attr('src','/images/repImages/rect.png')
            }else{
                $(this).find('td .getChoice').attr('src','/images/repImages/rect.png')
            }
        })
    },
    //设备型号标识弹窗表格模板
    getDeviceTypeTableTep:function(){
        var deviceTypeTableTep = '<table id="deviceTypeTable" class="stripe hover"></table>';
        return deviceTypeTableTep
    },
    //设备型号标识表格选择
    getDeviceTypeTable:function(obj){
        if(this.deviceTypeTable){
            this.deviceTypeTable.fnClearTable(false);
            this.deviceTypeTable.fnDestroy()
        }
        this.deviceTypeTable = $('#deviceTypeTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getInverterModelforChoice.do',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.tokenId = obj.tokenId;
                    d.plantId = obj.plantId;
                    d.orgId  = obj.orgId;
                    d.deviceId = obj.deviceId;
                    d.draw = 6;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort: false,
            bInfo: false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: true,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
                {data: "deviceIdentity", title: $.getI18n('deviceModelIdentification')},
                {data: "deviceType", title: $.getI18n('deviceType')},
                {data: "manufacturer", title: $.getI18n('manufacturer')},
                {data: "model", title: $.getI18n('deviceModel')},
                {data: "efficace", title: $.getI18n('efficace')},
                {data: "power", title: $.getI18n('power')},
                {data: "mttpRoute", title: $.getI18n('mttpRoute')},
                {data: "maxRoute", title: $.getI18n('maxRoute')},
                {data: "connTime", title: $.getI18n('connTime')},
                {data:'power',title:$.getI18n('operate'),render:function(){
                    return '<img class="getInverter" src="/images/repImages/rect.png">'
                }}
            ],
        });
        //选择组串信号
        $('#deviceTypeTable tbody').unbind().on('click','tr',function(){
            if($(this).find('td .getInverter').attr('src')=='/images/repImages/rect.png'){
                $(this).find('td .getInverter').attr('src','/images/repImages/rect1.png');
                $(this).siblings('tr').find('td img').attr('src','/images/repImages/rect.png')
            }else{
                $(this).find('td .getInverter').attr('src','/images/repImages/rect.png')
            }
        })
    },
};