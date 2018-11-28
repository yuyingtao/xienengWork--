/**
 * Created by SP0014 on 2018/1/16.
 * 设备管理-摄像头
 */
define(function(){
    return cameraRender;
});
var cameraRender = {
    cameraTable:"",//表格
    modifyCamTep:"",//修改摄像头时弹窗
    modifyOrgTep:"",//修改时组织弹窗
    modifyCurOrgId: "",//修改摄像头时切换当前orgId
    modifyCurPlantId:"",//修改时当前电站ID
    modifyCameraId:"",//修改摄像头时摄像头的id
    modifyCameraOrgName:"",//修改时组织名称
    addCamTep:"",//新增摄像头弹窗
    addOrgTep:"",//新增时组织弹窗选择组织
    addCurOrgId: "",//新增摄像头时切换当前orgId
    addCameraOrgName:"",//修改时组织名称
    addPlantId:"",
    data:"",//表格数据
    obj:{
        cameraName:"",//摄像头名称
        manufacture:"",//厂商名称
        orgId:"",//组织id
        plantId:"",//电站Id
        tokenId:Cookies.getCook('tokenId'),
    },
    Render:function () {
        var _this = this;
        _this.ztreeShow(_this,'/plantInfo/getPlantTreeByOrg.do');
        _this.getData(_this,_this.obj);
        //新增摄像头
        $("#addCam").on("click",function () {
            _this.addCamTep = App.dialog({
                id: "addCamFrom" ,
                title: $.getI18n('addCamera'),
                width: 900,
                height: 220,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:`
                        <form id="addCamFrom1">
                            <div class="modifyCamFromLe">
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camName')}<span>:</span></label>
                                    <div class="eachInput">
                                        <input type="text" name="1" id="addCameraName"/>
                                    </div>
                                </div>
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camSn')}<span>:</span></label>
                                    <div class="eachInput">
                                        <input i18nOnly="placeholder" i18n="${$.getI18n('sureNotChange')}" placeholder="${$.getI18n('sureNotChange')}" type="text" name="2" id="addCameraSN" required/>
                                    </div>
                                </div>
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camModel')}<span>:</span></label>
                                    <div class="eachInput">
                                        <select name="" id="addCameraModel">                                            
                                        </select>
                                    </div>
                                </div> 
                            </div> 
                            <div class="modifyFromMd"></div>
                            <div class="modifyFromRg">                            
                            <div class="eachRow">
                                <label for="">${$.getI18n('orgName')}<span>:</span></label>
                                <div class="eachInput">
                                    <input type="text" name="3" id="addOrgName" required/>
                                </div>
                            </div> 
                            <div class="eachRow">
                                <label for="">${$.getI18n('plantName')}<span>:</span></label>
                                <div class="eachInput">
                                    <select name="" id="addPlantId">   
                                    </select>
                                </div>
                            </div>  
                        </div>
                        </form>    
                    `,
                openEvent: function () {
                    _this.getCaModelList($("#addCameraModel"));
                    $("#addCamFrom1").validate();
                    App.initValidate()
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'qrAddCam'}]
            });
            $("#addOrgName").on("focus",function () {
                _this.addOrgTep = App.dialog({
                    id: "addCamOrgZtreeTep" ,
                    title: $.getI18n('chooseOrgName'),
                    width: 450,
                    height: 600,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:`
                            <div id="addCamOrgZtree" class="ztree"></div>   
                        `,
                    openEvent: function () {
                        //获取组织信息
                        _this.addztreeShow(_this,"addCamOrgZtree")
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,click:changCurOrgId }]
                });
                function changCurOrgId () {
                    $("#addOrgName").val(_this.addCameraOrgName);
                    $("#addOrgName").attr("_id",_this.addCurOrgId);
                    _this.getPlantIdofOrg4Camera(_this,$("#addPlantId"))
                }
            });
            $("#addPlantId").on("change",function () {
                _this.addPlantId = $(this).val()
            });
            $("#qrAddCam").on("click",function () {
                if(!$('#addCamFrom1').valid()) return false;
                $.http.POST('/device/addCamera.do',
                    {
                        tokenId:Cookies.getCook('tokenId'),
                        modelId:$("#addCameraModel").val(),
                        cameraName:$("#addCameraName").val(),
                        cameraSN:$("#addCameraSN").val(),
                        orgId:$("#addOrgName").attr("_id"),
                        plantId:_this.addPlantId
                    }, function (result) {
                        App.warningDialog(result.msg);
                        _this.cameraTable._fnDraw()
                    })
            })
        });
        //删除用户按钮
        $("#deleteCam").unbind().on("click",function () {
            let ids;
            let deleteArr =[];
            $("#cameraTable tbody tr").each(function () {
                if($(this).find("img").attr("src")=="images/repImages/rect1.png"){
                    let row = $("table#cameraTable tr").index($(this));
                    let cruId = _this.data[row-1].cameraId;
                    deleteArr.push(cruId)
                }
            });
            ids = deleteArr.join(",");
            if(!deleteArr.length){
                App.alert($.getI18n('Please select the device to delete'));
                return false
            }
            _this.deleteUser = App.dialog({
                id: "deleteUser" ,
                title: $.getI18n('camera'),
                width: 300,
                height: 100,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:$.getI18n('sureDeleteDevice'),
                openEvent: function () {

                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'qrDeleteUser'}]
            });
            $("#qrDeleteUser").on("click",function () {
                // console.log(ids)
                $.http.POST('/device/delCamera.do',{tokenId:Cookies.getCook('tokenId'), cameraIds:ids,}, function (result) {
                    App.warningDialog(result.msg);
                    _this.cameraTable._fnDraw()
                })
            })
        });
        //模糊查询
        $("#searchCam").on("click",function () {
            // console.log("in")
            _this.obj.cameraName = $(".equipmentName").val();
            _this.obj.manufacture = $(".manufacturerName").val();
            _this.getData(_this,_this.obj)
            // console.log($("#statusSelect").val(),$("#roleOption").val())
            // console.log($("#statusSelect").val())
            // _this.renderDataTable(_this,_this.orgId,$("#contentInput").val(),$("#roleOption").val(),$("#statusSelect").val())
        })
    },
    //加载树
    ztreeShow:function (_this,url) {
        var treeNode;
        var that = this;
        $.http.POST(url,{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            // console.log(result)
            //_this.getZtree(result.body.id)
            _this.obj.orgId = result.body[0].id;
            _this.getData(_this,_this.obj);
            $.fn.zTree.init($("#ztree"), setting, treeNode);
            //下面三行是设置加载时默认选中根节点
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            var nodes = zTree.getNodes()[0];
            zTree.selectNode(nodes);
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
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                fontCss: getFontCss,
                nameIsHTML: true,
                showLine: true
            }
        };
        //点击搜索按钮进行模糊搜索
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
            // console.log(1111,treeNode)
            if(treeNode.isPlant == true){
                _this.obj.plantId = treeNode.id;
                _this.obj.orgId = ""
            }else {
                _this.obj.orgId = treeNode.id;
                _this.obj.plantId = ""
            }
            _this.getData(_this,_this.obj)
        }
    },
    //修改摄像头信息时加载的树
    modifyAddztreeShow:function (_this,idName) {
        var treeNode;
        $.http.POST("/org/getOrgTree.do",{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            // console.log(result)
            $.fn.zTree.init($(`#${idName}`), setting, treeNode);
            //下面三行是设置加载时默认选中根节点
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            var nodes = zTree.getNodes()[0];
            zTree.selectNode(nodes);
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
            // view: {
            //     addHoverDom: addHoverDom,
            //     removeHoverDom: removeHoverDom,
            //     fontCss: getFont,
            //     nameIsHTML: true,
            //     showLine: true
            // }
        };
        function setFontCss(treeId, treeNode) {
            return treeNode.level == 0 ? {color:"#333","font-size":"20px"} : {};
        }
        function getFont(treeId, node) {
            return node.font ? node.font : {};
        }
        //节点点击事件
        var log, className = "dark";
        function beforeClick(treeId, treeNode, clickFlag) {
            _this.modifyCurOrgId = treeNode.id;
            _this.modifyCameraOrgName = treeNode.name
        }
    },
    //新增摄像头信息时加载的树
    addztreeShow:function (_this,idName) {
        var treeNode;
        $.http.POST("/org/getOrgTree.do",{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            // console.log(result)
            $.fn.zTree.init($(`#${idName}`), setting, treeNode);
            //下面三行是设置加载时默认选中根节点
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            var nodes = zTree.getNodes()[0];
            zTree.selectNode(nodes);
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
            // view: {
            //     addHoverDom: addHoverDom,
            //     removeHoverDom: removeHoverDom,
            //     fontCss: getFont,
            //     nameIsHTML: true,
            //     showLine: true
            // }
        };
        function setFontCss(treeId, treeNode) {
            return treeNode.level == 0 ? {color:"#333","font-size":"20px"} : {};
        }
        function getFont(treeId, node) {
            return node.font ? node.font : {};
        }
        //节点点击事件
        var log, className = "dark";
        function beforeClick(treeId, treeNode, clickFlag) {
            _this.addCurOrgId = treeNode.id;
            _this.addCameraOrgName = treeNode.name
        }
    },
    //获取表格数据
    getData:function(_this,obj){
        var that = _this;
        if(_this.cameraTable){
            $("#cameraTable tbody").off('click');
            _this.cameraTable.fnClearTable(false);
            _this.cameraTable.fnDestroy()
        }
        var columns = [
                {
                    "sClass": "text-center",
                    "data": "roleName",
                    "render": function (data, type, full, meta) {
                        return '<img class="checkImg" src="images/repImages/rect.png">';
                    },
                    "bSortable": false,
                },
                { data: "cameraName",title:$.getI18n('deviceName'),render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "cameraSN",title:$.getI18n('sn'),render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "manufacture",title:$.getI18n('manufacture'),render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "cameraModel" ,title:$.getI18n('model'),render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "orgName",title:$.getI18n('orgName'),render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "plantName",title:$.getI18n('plantName'),render:function (data, type, full, meta) {
                    return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
                }},
                { data: "status",title:$.getI18n('status'),render:function(data){
                    if(data==1){
                        return '<span style="color:#29AD00">'+$.getI18n('online')+'</span>'
                    }else if(data==0){
                        return '<span style="color: #FF0E26">'+$.getI18n('offline')+'</span>'
                    }else {
                        return '<span style="color: #666666">'+$.getI18n('unconnected')+'</span>'
                    }
                }},

            ];
        if(!!window.systemRole['cameraManageEdit']){
            columns.push(
                {data:"cameraId",title:$.getI18n('operate'),render:function(data){
                    return `<a class='modify operationBtn modifyCam' style="margin-right:10px;background:rgba(48,166,250,0.5);" _id= ${data}>${$.getI18n('modify')}</a> 
                            <a class='modify operationBtn'  style="background: rgba(41,173,0,0.5); " id='previewCam' _id= ${data}>${$.getI18n('preview')}</a> `
                }
                })
        }else{
            columns.push(
                {data:"cameraId",title:$.getI18n('operate'),render:function(data){
                    return `<a class='modify operationBtn'  style="background: rgba(41,173,0,0.5); " id='previewCam' _id= ${data}>${$.getI18n('preview')}</a> `
                }
                })
        }
        _this.cameraTable = $('#cameraTable').dataTable({
            ajax:{
                type:'POST',
                url:'/device/getCameraList.do',
                //data:obj,
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                data:function(d){
                    d.orgId=obj.orgId;
                    d.cameraName=obj.cameraName;//摄像头名称 模糊查询
                    d.manufacture=obj.manufacture; // 厂商条件
                    d.plantId = obj.plantId;
                    // d.status = obj.status;
                    d.tokenId = obj.tokenId;
                    // d.manufacturer = obj.manufacturer
                    // console.log('d',d)
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    // console.log(json.body);
                    _this.data = json.body.data;
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    //json.data = json.body.data
                    // console.log(json)
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort:false,
            bInfo:false,
            pageLength: 10,
            retrieve: true,
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
            columns: columns,
            columnDefs: [
                { "width": "5%", "targets": 0 },
                { "width": "10%", "targets": 1 },
                { "width": "10%", "targets": 2 },
                { "width": "10%", "targets": 3 },
                { "width": "8%", "targets": 4},
                { "width": "10%", "targets": 5 },
                { "width": "10%", "targets": 6 },
                { "width": "10%", "targets": 7 },
                {
                    // targets用于指定操作的列，从第0列开始，-1为最后一列
                    // return后边是我们希望在指定列填入的按钮代码
                    "width": "20%",
                    "targets": 8,
                    // "render": function ( data, type, full, meta ) {
                    //     return `<a class='modify' id='modify'_id= ${data}>修改</a> <a class='modify' id='preview'_id= ${data}>预览</a> `
                    // }
                }
            ],
            headerCallback: function( thead, data, start, end, display ) {
                checkAll()
            },
        });
        //checkAll选择全部
        function checkAll() {
            $(".checkall").unbind().on("click",function () {
                if($(this).attr("src") == "images/repImages/rect1.png"){
                    $(this).attr("src" , "images/repImages/rect.png");
                    $(".checkImg").attr("src" , "images/repImages/rect.png")
                }else {
                    $(this).attr("src" , "images/repImages/rect1.png");
                    $(".checkImg").attr("src" , "images/repImages/rect1.png")
                }
            })
        }
        //修改信息
        $("#cameraTable tbody").on("click",".modifyCam",function (event) {
            event.stopPropagation();
            let row = $("table#cameraTable tr").index($(this).closest("tr"));
            if(Cookies.getCook('roleId')==4){
                _this.modifyCamTep = App.dialog({
                    id: "modifyCamFrom" ,
                    title: $.getI18n('modifyCam'),
                    width: 900,
                    height: 180,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:`
                            <from id="modifyCamFrom">
                            <div class="modifyCamFromLe">
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camName')}<span>:</span></label>
                                    <div class="eachInput">
                                        <input type="text" id="modifyCameraName" name="cameraName">
                                    </div>
                                </div>
                                <div class="eachRow ">
                                    <label for="">${$.getI18n('camSn')}<span>:</span></label>
                                    <div class="eachInput modifyCameraSNBox">
                                        <input type="text" disabled="disabled" id="modifyCameraSN" name="cameraSN">
                                    </div>
                                </div>
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camModel')}<span>:</span></label>
                                    <div class="eachInput">
                                    <select name="" id="modifyCameraModel"></select>
                                        <!--<input type="text" id="modifyCameraModel" name="cameraModel">-->
                                    </div>
                                </div>                                                 
                            </div> 
                            <div class="modifyFromMd"></div>
                            <div class="modifyFromRg">                                
                                <div class="eachRow">
                                    <label for="">${$.getI18n('orgName')}<span>:</span></label>
                                    <div class="eachInput">
                                        <input type="text" id="modifyOrgName" name="orgName">
                                    </div>
                                </div> 
                                <div class="eachRow">
                                    <label for="">${$.getI18n('plantName')}<span>:</span></label>
                                    <div class="eachInput">
                                        <select name="" id="modifyPlant"></select>
                                    </div>
                                </div>
                            </div>
                            </from>    
                        `,
                    openEvent: function () {
                        // console.log(_this.data[row-1])
                        _this.modifyCameraId = _this.data[row-1].cameraId;
                        $("#modifyOrgName").attr("_id",_this.data[row-1].orgId);
                        //表格赋值
                        $("#modifyCamFrom").setForm(_this.data[row-1]);
                        //设置当前行绑定plantId和orgId
                        _this.modifyCurOrgId = _this.data[row-1].orgId;
                        _this.modifyCurPlantId = _this.data[row-1].plantId;
                        //获取摄像头型号
                        _this.getCaModelList($("#modifyCameraModel"));
                        //获取当前组织下的电站
                        _this.plantIdofOrg4Camera(_this,$("#modifyPlant"))
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'qrSavemodify'}]
                });
                //修改组织
                $("#modifyOrgName").on("focus",function () {
                    _this.modifyOrgTep = App.dialog({
                        id: "modifyCamOrgZtreeTep" ,
                        title: $.getI18n('orgName'),
                        width: 450,
                        height: 600,
                        maxWidth: document.documentElement.clientWidth - 40,
                        maxHeight: document.documentElement.clientHeight - 42,
                        appendTo: 'body',
                        backdrop: false,
                        modal: true,
                        keyboard: true,
                        content:`
                            <div id="modifyCamOrgZtree" class="ztree"></div>   
                        `,
                        openEvent: function () {
                            //获取组织信息
                            _this.modifyAddztreeShow(_this,"modifyCamOrgZtree")
                        },
                        closeEvent: null,
                        isdrag: true,
                        buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,click:changCurOrgId }]
                    });
                    function changCurOrgId () {
                        $("#modifyOrgName").val(_this.modifyCameraOrgName);
                        $("#modifyOrgName").attr("_id",_this.modifyCurOrgId);
                        _this.plantIdofOrg4Camera(_this,$("#modifyPlant"))
                    }
                });
                $("#modifyPlant").on("change",function () {
                    _this.modifyCurPlantId = $(this).val()
                });
                $("#qrSavemodify").on("click",function () {
                    $.http.POST('/device/updateCamera.do',
                        {
                            tokenId:Cookies.getCook('tokenId'),
                            cameraId:_this.modifyCameraId,
                            cameraModelId:$("#modifyCameraModel").val(),
                            cameraName:$("#modifyCameraName").val(),
                            cameraSN:$("#modifyCameraSN").val(),
                            orgId:$("#modifyOrgName").attr("_id"),
                            plantId:_this.modifyCurPlantId,
                        }, function (result) {
                            App.warningDialog(result.msg);
                            _this.cameraTable._fnDraw()
                        })
                })
            }else{
                _this.modifyCamTep = App.dialog({
                    id: "modifyCamFrom" ,
                    title: $.getI18n('modifyCam'),
                    width: 900,
                    height: 180,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:`
                            <from id="modifyCamFrom1">
                            <div class="modifyCamFromLe">
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camName')}<span>:</span></label>
                                    <div class="eachInput">
                                        <input type="text" id="modifyCameraName1" name="cameraName">
                                    </div>
                                </div>
                                <div class="eachRow ">
                                    <label for="">${$.getI18n('camSn')}<span>:</span></label>
                                    <div class="eachInput modifyCameraSNBox disabledDiv">
                                        <input type="text" disabled="disabled" id="modifyCameraSN" name="cameraSN">
                                    </div>
                                </div>
                                <div class="eachRow">
                                    <label for="">${$.getI18n('camModel')}<span>:</span></label>
                                    <div class="eachInput disabledDiv">
                                    <select name="" id="modifyCameraModel1" disabled></select>
                                        <!--<input type="text" id="modifyCameraModel" name="cameraModel">-->
                                    </div>
                                </div>                                                 
                            </div> 
                            <div class="modifyFromMd"></div>
                            <div class="modifyFromRg">                                
                                <div class="eachRow">
                                    <label for="">${$.getI18n('orgName')}<span>:</span></label>
                                    <div class="eachInput disabledDiv">
                                        <input type="text" id="modifyOrgName1" name="orgName" disabled>
                                    </div>
                                </div> 
                                <div class="eachRow">
                                    <label for="">${$.getI18n('plantName')}<span>:</span></label>
                                    <div class="eachInput">
                                        <select name="" id="modifyPlant1"></select>
                                    </div>
                                </div>
                            </div>
                            </from>    
                        `,
                    openEvent: function () {
                        // console.log(_this.data[row-1])
                        _this.modifyCameraId = _this.data[row-1].cameraId;
                        $("#modifyOrgName1").attr("_id",_this.data[row-1].orgId);
                        //表格赋值
                        $("#modifyCamFrom1").setForm(_this.data[row-1]);
                        //设置当前行绑定plantId和orgId
                        _this.modifyCurOrgId = _this.data[row-1].orgId;
                        _this.modifyCurPlantId = _this.data[row-1].plantId;
                        //获取摄像头型号
                        _this.getCaModelList($("#modifyCameraModel1"));
                        //获取当前组织下的电站
                        _this.plantIdofOrg4Camera(_this,$("#modifyPlant1"))
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'qrSavemodify'}]
                });
                $("#qrSavemodify").on("click",function () {
                    $.http.POST('/device/updateCamera.do',
                        {
                            tokenId:Cookies.getCook('tokenId'),
                            cameraId:_this.modifyCameraId,
                            cameraModelId:$("#modifyCameraModel1").val(),
                            cameraName:$("#modifyCameraName1").val(),
                            cameraSN:$("#modifyCameraSN").val(),
                            orgId:$("#modifyOrgName1").attr("_id"),
                            plantId:_this.modifyCurPlantId,
                        }, function (result) {
                            App.warningDialog(result.msg);
                            _this.cameraTable._fnDraw()
                        })
                })
            }

        });
        //预览
        $("#cameraTable tbody").on("click","#previewCam",function (event) {
            event.stopPropagation();
            let row = $("table#cameraTable tr").index($(this).closest("tr"));
            that.cameraWin(_this.data[row-1])
        });
        //单行点击选中当前行
        $("#cameraTable tbody ").on("click",'tr', function () {
            $(".checkall").attr("src" , "images/repImages/rect.png");
            var curImg = $(this).find("img").eq(0);
            if(curImg.attr("src")=="images/repImages/rect1.png"){
                curImg.attr("src","images/repImages/rect.png")
            }else {
                curImg.attr("src","images/repImages/rect1.png")
            }
        })
    },
    //获取摄像头型号
    getCaModelList:function(select){
        $.http.POST("/device/getCaModelList.do",{tokenId:Cookies.getCook('tokenId')}, function (result) {
            // console.log(result)
            const {data} = result.body;
            let opEl = data.map(function (item) {
                return `<option value="${item.modelId}">${item.modelName}</option>`
            }).join("");
            select.html(opEl)
        })
    },
    //修改时获取当前组织下的电站列表
    plantIdofOrg4Camera:function (_this,select) {
        $.http.POST("/device/plantIdofOrg4Camera.do",{tokenId:Cookies.getCook('tokenId'),orgId:_this.modifyCurOrgId}, function (result) {
            // console.log(result)
            const {data} = result.body;
            let opEl = data.map(function (item) {
                return `<option value="${item.id}">${item.plantName}</option>`
            }).join("");
            select.html(opEl)
        })
    },
    //新增时获取当前组织下的电站列表
    getPlantIdofOrg4Camera:function (_this,select) {
        $.http.POST("/device/plantIdofOrg4Camera.do",{tokenId:Cookies.getCook('tokenId'),orgId:_this.addCurOrgId}, function (result) {
            // console.log(result)
            select.empty();
            const {data} = result.body;
            let opEl = data.map(function (item) {
                return `<option value="${item.id}">${item.plantName}</option>`
            });
            select.append($("<option value=''>"+$.getI18n('newPlantNot')+"</option>")).append(opEl)
        })
    },
    cameraWin:function (obj) {
        var _this = this;
        var str = '<div class="camerapop" id="LiveWin">\n' +
            '    <div class="cameraWin">\n' +
            '        <a class="closebtn" id="cawin-close"><img src="/images/largeScreen/close_1.png"></a>\n' +
            '        <div class="top-tit">'+obj.plantName+'('+'<span id="cameraName">'+obj.cameraName+'</span>'+')'+'</div>\n' +
            '        <div class="c-main">\n' +
            '            <div class="floatBox" style="display: "><a class="toHis" id="toHis"></a></div>\n' +
            '            <div id="videoMain" class="videoMain">\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="b-toolbar"><div class="toolBarCon"><a class="switchSource" id="vedio1">'+$.getI18n('fluent')+'</a><a class="switchSource on" id="vedio2">'+$.getI18n('definition')+'</a><!--<a class="switchScreen" id="switchScreen"></a>--></div></div>\n' +
            '    </div>\n' +
            '</div>';
        $('#sysBody').append(str);
        $('#cawin-close').unbind().on('click',function () {
            $('#LiveWin').remove();
        });

        $.http.POST('/device/getLiveHLS.do',{tokenId:Cookies.getCook('tokenId'),id:obj.cameraId},function (res) {
            $('#vedio1').attr('attrhlssrc',res.body.hls.replace(/\.hd/,''));
            $('#vedio1').attr('attrrtmpsrc',res.body.rtmp.replace(/\.hd/,''));
            $('#vedio2').attr('attrhlssrc',res.body.hls);
            $('#vedio2').attr('attrrtmpsrc',res.body.rtmp);
            $('#videoMain').html(
                '<video id="mapPlayer" poster="/images/cameraLoading.gif" autoplay controls playsInline webkit-playsinline>\n' +
                '                <source id="rtmpUrl" src="'+res.body.rtmp+'" />\n' +
                '                <source id="hlsUrl" src="'+res.body.hls+'" type="application/x-mpegURL" />\n' +
                '            </video>'
            );
            $('#mapPlayer').show();

            var player = new EZUIPlayer('mapPlayer');

            player.on('error', function(){
                console.log('error');
            });
            player.on('play', function(){
                console.log('play');
            });
            player.on('pause', function(){
                console.log('pause');
            });
            //流畅
            $('#vedio1').unbind().on('click',function () {
                $('.toolBarCon a').removeClass('on');
                $(this).addClass('on');
                $('#mapPlayer').hide();

                $('#videoMain').html(
                    '<video id="mapPlayer" poster="/images/cameraLoading.gif" autoplay controls playsInline webkit-playsinline>\n' +
                    '                <source id="rtmpUrl" src="'+$(this).attr('attrrtmpsrc')+'" />\n' +
                    '                <source id="hlsUrl" src="'+$(this).attr('attrhlssrc')+'" type="application/x-mpegURL" />\n' +
                    '            </video>'
                );
                var player = new EZUIPlayer('mapPlayer');

                player.on('error', function(){
                    console.log('error');
                });
                player.on('play', function(){
                    console.log('play');
                });
                player.on('pause', function(){
                    console.log('pause');
                });
                $('#mapPlayer').show()
            });
            //高清
            $('#vedio2').unbind().on('click',function () {
                $('.toolBarCon a').removeClass('on');
                $(this).addClass('on');
                $('#mapPlayer').hide();

                $('#videoMain').html(
                    '<video id="mapPlayer" poster="/images/cameraLoading.gif" autoplay controls playsInline webkit-playsinline>\n' +
                    '                <source id="rtmpUrl" src="'+$(this).attr('attrrtmpsrc')+'" />\n' +
                    '                <source id="hlsUrl" src="'+$(this).attr('attrhlssrc')+'" type="application/x-mpegURL" />\n' +
                    '            </video>'
                );
                var player = new EZUIPlayer('mapPlayer');

                player.on('error', function(){
                    console.log('error');
                });
                player.on('play', function(){
                    console.log('play');
                });
                player.on('pause', function(){
                    console.log('pause');
                });
                $('#mapPlayer').show()
            })
        });
        $('#toHis').on('click',function () {
            if(!(!!window.ActiveXObject || "ActiveXObject" in window)){
                App.alert($.getI18n('screen.tipUseIE'));
                return
            }

            $('#LiveWin').remove();
            _this.cameraHisWin(obj)
        })
    },

    cameraHisWin: function (obj) {

        var _this = this;
        var opt = obj.cameraInfo;
        $('#LiveWin').length && $('#LiveWin').remove();
        var str = '<div class="camerapop" id="videoHisWin">\n' +
            '    <div class="cameraWin" id="cameraHisWin">\n' +
            '        <a class="closebtn" id="cawin-close"><img src="/images/largeScreen/close_1.png"></a>\n' +
            '        <div class="top-tit">'+obj.name+'('+'<span id="cameraName">'+obj.setCameraName+'</span>'+')'+'</div>\n' +
            '    <div style="width:100%;height: 85%">\n' +
            '            <div class="floatBox"><a class="toHis" id="toLive" ></a></div>\n' +
            '        <object classid="clsid:54FC7795-1014-4BF6-8BA3-500C61EC1A05" id="EZUIKit" name="EZUIKit" style="z-index:10;width: 85%;height: 90%"><param name="wmode" value="opaque" /></object>\n' +
            '        <div class="progressBar"><div class="VideoSplitLine" id="VideoSplitLine"></div><div class="progressMain"><div class="progressCon" id="progressCon"></div></div></div>\n' +
            '            <div class="timePic"><img src="/images/time.png" alt=""></div>\n' +
            '    </div>\n' +
            '    <div class="videoHisList" id="hisTimeList">\n' +
            '            '+$.getI18n('date')+'：\n' +
            '        </div><div class="screenSet"><img onclick="SynpowerCamera.toEnlarge()" id="enlarge" src="/images/all.png" alt=""><img style="display: none" onclick="SynpowerCamera.toShrunk()" id="shrunk" src="/images/all2.png" alt=""></div>\n' +
            '       \n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>';
        $('#sysBody').append(str);
        $('#cawin-close').unbind().on('click', function () {
            try{
                SynpowerCamera.StopPlay()
            }catch (e){

                App.warningDialog(e);
            }
            $('#videoHisWin').remove();
        });
        $('#toLive').on('click',function () {
            $('#cawin-close').click();
            _this.cameraWin(obj)
        });
        /*if (objCard.object==null) {
            alert("CardAccessor插件未安装！");
        }
        else{
            alert("已检测到CardAccessor插件！");
        }*/
        /* var yourActiveXObject = document.getElementById('EZUIKit');
         if(typeof(yourActiveXObject) === 'undefined' || yourActiveXObject === null){
             alert('Unable to load ActiveX');
             // return;
         }else
         yourActiveXObject.addEventListener('PluginEventHandler', PluginEventHandler);*/
        // $('#objWin').append('<object classid="clsid:54FC7795-1014-4BF6-8BA3-500C61EC1A05" id="EZUIKit" width="1000" height="360" name="EZUIKit"></object>')

        SynpowerCamera.init({
            AppKey: opt.appKey,
            AccessToken: opt.accessToken,
            Url: 'ezopen://open.ys7.com/' + opt.cameraInfos[0].sn + '/1.rec',
            SN: obj.setSN
        })


    }
};