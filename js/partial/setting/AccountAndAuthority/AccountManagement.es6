/**
 * Created by SP0015 on 2017/12/29.
 */
define(function(){
    return AccountManagementRender;
});
var AccountManagementRender = {
    addUsr:"",
    modifyInfo:"",
    modifyPassword:"",
    data:'',
    orgId:"",
    plantTable:'',//表格信息
    addOrgId:"",//新增用户时用
    preOrgName:"",//新增用户时使用，
    modifyChooseOrgTreeTem:"",//修改时选择组织树
    addRole:"",//新增用户时用
    addStatue:1,//新增用户的状态
    addUseTel:"0",//新增用户是否启用状态
    modifyUseTel:"",//修改用户是否用电话号码当登录账号时用
    // deleteArr :[],//删除的ids集合
    searchRole:"",//模糊查询用
    Render: function () {
        //    Todo Main function
        var _this = this;
        this.ztreeShow(_this);
        this.renderDataTable(_this);
        //新增用户按钮
        $("#addUser").unbind().on("click",function () {
            $.http.POST('/user/getRoleByOrgId.do',{tokenId:Cookies.getCook('tokenId'), orgId:_this.addOrgId,}, function (result) {
                $("#addUserOption").empty();
                if(result.body){
                    var optionEl = result.body.map(function (item,index) {
                        return `<option value="${item.value}">${item.name}</option>`
                    }).join("");
                    $("#addUserOption").append(optionEl)
                }
                $("#addOrgName").val(_this.preOrgName);//默认添上上级组织名称
                _this.addRole = $("#addUserOption").val()
            });
            //切换角色信息改变roleId
            $("#addUserOption").on("change",function () {
                _this.addRole = $("#addUserOption").val()
            });
            _this.addUsr = App.dialog({
                id: "addUsr" ,
                title: `${$.getI18n('addUser')}`,
                width: 900,
                height: 493,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:_this.addUserTep(),
                openEvent: function () {
                    $('#addUserForm').validate();
                    App.initValidate()
                    //切换角色信息改变roleId
                    $("#addUserOption").on("change",function () {
                        _this.addRole = $("#addUserOption").val()
                        var addUserName = $("#addUserForm #addUserName");
                        var adduserTel =$("#addUserForm #addUserTel");
                        if(_this.addRole==1){
                            addUserName.parent().find("b").css("visibility","hidden");
                            addUserName.removeAttr("required");
                            adduserTel.parent().find("b").css("visibility","hidden");
                            adduserTel.removeAttr("required")
                        }else {
                            addUserName.parent().find("b").css("visibility","visible");
                            addUserName.attr("required","required");
                            adduserTel.parent().find("b").css("visibility","visible");
                            adduserTel.attr("required","required")
                        }
                    })
                    App.initValidate();
                    //点击是否启用组织信息
                    $("#addUserStatus").unbind().on("click",function () {
                        if($(this).attr("src")=="/images/plantManage/enabled.png"){
                            $(this).attr("src","/images/plantManage/notenabled.png");
                            _this.addStatue = 0
                        }else {
                            $(this).attr("src","/images/plantManage/enabled.png");
                            _this.addStatue = 1
                        }
                    });
                    //切换是否使用手机号码当账号
                    $("#addUserUseTel").on("click",function () {
                        if($("#addUserTel").valid()&&$("#addUserTel").val()){
                            if($(this).attr("src")=="/images/setting/noUseTel.png"){
                                $(this).attr("src","/images/setting/useTel.png");
                                _this.addUseTel = "1";
                                $("#addUserLoginId").val($("#addUserTel").val())
                            }else {
                                $(this).attr("src","/images/setting/noUseTel.png");
                                _this.addUseTel = "0";
                            }
                        }else {
                            App.alert(`${$.getI18n("rightPhNum")}`)
                        }

                    });
                    //点击清除当前图片
                    $("#addClose").on("click",function () {
                        $("#addUploadImgBox").attr("src","/images/setting/upload.png");
                        $(this).hide();
                        $("#addUp_img").val("")
                    });
                    //点击预览图片
                    //新增用户时点击上传
                    $("input[type = file]").on("change",function () {
                        var that = this;
                        _this.fileUpLoad(that,"addUp_img","addUploadImgBox")
                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:`${$.getI18n("cancel")}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n("save")}`,type:'imgNoBtn',clickToClose :true,id:'qrAdd'}]
            });
            //确认新增用户按钮
            $("#qrAdd").on("click",function () {
                var addUp_img = $("#addUp_img");
                if(!$('#addUserForm').valid()) return false;
                $.http.POST('/user/insertNewUser.do',
                    {
                        tokenId:Cookies.getCook('tokenId'),
                        email:$("#addUserEmail").val(),
                        loginId: $("#addUserLoginId").val(),
                        orgId: _this.addOrgId,
                        password: hex_md5($("#addUserQrpassword").val()),
                        roleId: _this.addRole,
                        status: _this.addStatue,
                        useTel:_this.addUseTel,
                        userName: $("#addUserName").val(),
                        userTel: $("#addUserTel").val(),
                    }, function (result) {
                        App.warningDialog(result.msg)
                        _this.uploadImg(_this,[addUp_img],result.body.userId,"");
                        _this.addUseTel = 0
                    })
            })
        });
        //删除用户按钮
        $("#delete").on("click",function () {
            let ids;
            let deleteArr = [];
            $("#example tbody tr").each(function () {
                if($(this).find("img").attr("src")=="images/repImages/rect1.png"){
                    let row = $("table#example tr").index($(this));
                    let cruId = _this.data[row-1].id;
                    deleteArr.push(cruId)
                }
            });
            ids = deleteArr.join(",");
            if(!deleteArr.length){
                App.alert(`${$.getI18n('chooseDeleteUserFirst')}`);
                return false
            }
            _this.deleteUser = App.dialog({
                id: "deleteUser" ,
                title: `${$.getI18n('deleteUser')}`,
                width: 300,
                height: 60,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:_this.deleteUserTem(),
                openEvent: function () {

                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:`${$.getI18n('cancel')}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n('sure')}`,type:'imgNoBtn',clickToClose :true,id:'qrDeleteUser'}]
            });
            $("#qrDeleteUser").on("click",function () {
                $.http.POST('/user/updateUserValid.do',{tokenId:Cookies.getCook('tokenId'), ids:ids,}, function (result) {
                    App.warningDialog(result.msg)
                    _this.plantTable._fnDraw();
                    deleteArr.length = 0
                })
            })
        });
        //模糊查询
        $("#search").on("click",function () {
            _this.renderDataTable(_this,_this.orgId,$("#contentInput").val(),$("#roleOption").val(),$("#statusSelect").val())
        })
    },
    ztreeShow:function (_this) {
        var treeNode;
        $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            _this.preOrgName = result.body[0].name;
            _this.addOrgId = result.body[0].id;
            _this.orgId = result.body[0].id;
            _this.getRoleByOrgId(_this.orgId);
            // console.log(result.body[0].id)
            $.fn.zTree.init($("#ztree"), setting, treeNode);
            //下面三行是设置加载时默认选中根节点
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            var nodes = zTree.getNodes()[0];
            zTree.selectNode(nodes);
        });
        var setting = {
            isSimpleData : true,              //数据是否采用简单 Array 格式，默认false
            treeNodeKey : "id",               //在isSimpleData格式下，当前节点id属性
            treeNodeParentKey : "pId",        //在isSimpleData格式下，当前节点的父节点id属性
            showLine : true,                  //是否显示节点间的连线
            checkable : true,               //每个节点上是否显示 CheckBox
            callback: {
                beforeClick: beforeClick,
            },
            view: {
                fontCss: getFontCss,
                nameIsHTML: true,
                showLine: true
            }
        };
        function setFontCss(treeId, treeNode) {
            return treeNode.level == 0 ? {color:"#333","font-size":"20px"} : {};
        }
        function getFont(treeId, node) {
            return node.font ? node.font : {};
        }
        function getFontCss(treeId, treeNode) {
            return (!!treeNode.highlight==false) ? {color:"#333", "font-weight":"normal"}:{color:"#01B1ED", "font-weight":"bold"}
        }
        //ztree模糊查询
        $(".searchBtn").on("click",function () {
            if($("#key").val()){
                var zTree = $.fn.zTree.getZTreeObj("ztree");
                zTree.setting.view.expandSpeed = "";
                $.fn.zTree.getZTreeObj("ztree").expandAll(false);
                zTree.setting.view.expandSpeed = "fast";
                var value = $("#key").val();
                var keyType = "name";
                var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                updateNodes(true,nodeList); //更新节点
            }
        });
        $("#key").on("keydown",function (e) {
            if($("#key").val()){
                if(e.keyCode == 13){
                    var zTree = $.fn.zTree.getZTreeObj("ztree");
                    zTree.setting.view.expandSpeed = "";
                    $.fn.zTree.getZTreeObj("ztree").expandAll(false);
                    zTree.setting.view.expandSpeed = "fast";
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
            // console.log(treeId, treeNode, clickFlag,$("#organizationRi"))
            _this.addOrgId = treeNode.id;//树节点改变 新增用户传的orgId也要改变
            _this.preOrgName = treeNode.name;//树节点改变 新增用户传的上级组织名称也要改变
            // console.log(treeNode)
            _this.orgId = treeNode.id;
            _this.renderDataTable(_this,_this.orgId,"","");
            _this.getRoleByOrgId(treeNode.id)
        }
        $.fn.zTree.init($("#ztree"), setting, treeNode);
    },
    renderDataTable:function (_this,orgId,content,roleId,status) {
        if(_this.plantTable){
            $("#example tbody").off("click");
            _this.plantTable.fnClearTable(false);
            _this.plantTable.fnDestroy()
        }
        var columns =  [
            {
                "sClass": "text-center",
                "data": "roleName",
                "render": function (data, type, full, meta) {
                    return '<img class="checkImg" src="images/repImages/rect.png">';
                },
                "bSortable": false,
            },
            {"data": "roleName",title:`${$.getI18n('accountsRole')}`},
            {"data": "userName",title:`${$.getI18n('eachName')}`,render:function (data, type, full, meta) {
                return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            {"data": "orgName",title:`${$.getI18n('orgName')}`,render:function (data, type, full, meta) {
                return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            {"data": "loginId",title:`${$.getI18n('loginId')}`,render:function (data, type, full, meta) {
                return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            {"data": "userTel",title:`${$.getI18n('phoneNum')}`,render:function (data, type, full, meta) {
                return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            {"data": "email",title:`${$.getI18n('eachEmail')}`,render:function (data, type, full, meta) {
                return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            {
                "data": "status",
                'title':`${$.getI18n('status')}`,
                "render": function (data, type, full, meta) {
                    if(data==1){
                        return '<text style ="color:#29ad00 ">'+$.getI18n('enable')+'</text>';
                    }else {
                        return '<text>'+$.getI18n('noEnable')+'</text>';
                    }
                },
            },
        ];
        if(!!window.systemRole['accountManageEdit']){
            columns.push(
                {
                    "data": "id",'title':`${$.getI18n('operate')}`,render: function ( data, type, full, meta ) {
                    return `<div class="minDiv"><a class='modify' id='modify'_id= ${data}>${$.getI18n('edit')}</a> <a class='modify' id='modifyPassword'_id= ${data}>${$.getI18n('modifyPWD')}</a></div> `
                }

                })
        }
        // console.log('columns',columns)
        _this.plantTable = $('#example').dataTable({
            ajax: {
                type:'POST',
                url:'/user/listUserInfo.do',
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                data:function(d){
                    d.tokenId=Cookies.getCook('tokenId'),
                        d.content = content;
                    d.length = 10;
                    d.roleId = roleId;//option切换角色Id
                    d.orgId = orgId;
                    // d.start = 0;
                    d.status = status;
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    _this.data = json.body.data;
                    // console.log(json.body.data);
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    !json.body.data && (json.body.data=[]);
                    return json.body.data
                }
            },
            // 每页显示三条数据
            // pageLength: 3,
            pageLength: 10,//每页显示条数
            serverSide: true,  //启用服务器端分页
            processing: true,
            Paginate: true,
            stateSave : false,//记住分页
            searching: false,  //禁用原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            bInfo:false,//去掉左下角显示
            bSort:false,//去掉排序功能
            "autoWidth": false,
            // responsive:false,
            createdRow: function (row, data, index) {
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
                { "width": "10%", "targets": 4 },
                { "width": "15%", "targets": 5 },
                { "width": "10%", "targets": 6 },
                { "width": "5%", "targets": 7 },
                { "width": "150px", "targets": 8 }
            ],
            headerCallback: function( thead, data, start, end, display ) {
                checkAll()
            },
            // fnRowCallback:function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //     // singRowClick(nRow,aData, iDisplayIndex, iDisplayIndexFull)
            // },
        });
        //checkAll选择全部
        function checkAll() {
            $(".checkall").on("click",function () {
                if($(this).attr("src") == "images/repImages/rect1.png"){
                    $(this).attr("src" , "images/repImages/rect.png");
                    $(".checkImg").attr("src" , "images/repImages/rect.png")

                }else {
                    $(this).attr("src" , "images/repImages/rect1.png");
                    $(".checkImg").attr("src" , "images/repImages/rect1.png")
                }
            })
        }
        //单行点击选中当前行
        $("#example tbody ").on("click",'tr', function () {
            var curImg = $(this).find("img").eq(0);
            if($(".checkall").attr("src") =="images/repImages/rect1.png"){
                $(".checkall").attr("src","images/repImages/rect.png")
            }
            if(curImg.attr("src")=="images/repImages/rect1.png"){
                curImg.attr("src","images/repImages/rect.png")
            }else {
                curImg.attr("src","images/repImages/rect1.png")
            }
        }),
        //修改按钮
        $("#example tbody").on("click", "#modify", function (event) {
            event.stopPropagation();
            //获取行 row从1开始的 row-1 就是当前行
            let row = $("table#example tr").index($(this).closest("tr"));
            // console.log(_this.data[row-1])
            let cruId = _this.data[row-1].id;
            let curOrgId = _this.data[row-1].orgId;
            let curStatus = _this.data[row-1].status;
            let iconUrl = _this.data[row-1].icon;
            let roleName = _this.data[row-1].roleName;
            let userName = _this.data[row-1].userName;
            let curRoleId;
            // console.log(cruId)
            //弹出修改界面
            _this.modifyInfo = App.dialog({
                id: "modifyInfo" ,
                title:`${$.getI18n('modifyUser')}`,
                width: 900,
                height: 493,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:_this.modifyUserTep(),
                openEvent: function () {
                    //获取角色类型渲染到弹出页面
                    $.http.POST('/user/getRoleByOrgId.do',{tokenId:Cookies.getCook('tokenId'), orgId:curOrgId,}, function (result) {
                        $("#modifyOption").empty();
                        var optionEl = result.body.map(function (item,index) {
                            // console.log(roleName)
                            if(roleName == item.name ){
                                return `<option value="${item.value}" selected="selected">${item.name}</option>`
                            }else {
                                return `<option value="${item.value}">${item.name}</option>`
                            }
                        }).join("");
                        $("#modifyOption").append(optionEl)
                        curRoleId = $("#modifyOption").val();
                        if(curRoleId==1){
                            var modifyUserName = $("#modifyForm #modifyUserName")
                            var userTel =$("#modifyForm #userTel")
                            modifyUserName.parent().find("b").css("visibility","hidden")
                            modifyUserName.removeAttr("required")
                            userTel.parent().find("b").css("visibility","hidden")
                            userTel.removeAttr("required")
                        }
                    });
                    $('#modifyForm').validate();
                    App.initValidate();
                    $("#modifyOption").on("change",function () {
                        curRoleId = $(this).val()
                        var modifyUserName = $("#modifyForm #modifyUserName");
                        var userTel =$("#modifyForm #userTel");
                        if(curRoleId==1){
                            modifyUserName.parent().find("b").css("visibility","hidden");
                            modifyUserName.removeAttr("required");
                            userTel.parent().find("b").css("visibility","hidden");
                            userTel.removeAttr("required")
                        }else {
                            modifyUserName.parent().find("b").css("visibility","visible");
                            modifyUserName.attr("required","required");
                            userTel.parent().find("b").css("visibility","visible");
                            userTel.attr("required","required")
                        }
                    })
                    //判断status的值给是否启用添加图片

                    if(curStatus == 0){
                        $(".statusImg").attr("src","/images/plantManage/notenabled.png")
                    }else {
                        $(".statusImg").attr("src","/images/plantManage/enabled.png")
                    }
                    //给tel email loginName绑上当前id validate验证用
                    // console.log($("#userTel"),$("#userEmail"),$("#userName"))
                    $("#userTel").attr("_id",cruId);
                    $("#userEmail").attr("_id",cruId);
                    $("#userLoginId").attr("_id",cruId);
                    //默认头像设置
                    if(!iconUrl){
                        $("#modifyUploadImgBox").attr("src","/images/plantManage/head.png")
                    }else {
                        $("#modifyUploadImgBox").attr("src",iconUrl)
                    }
                    $(".uploadA").on("click",function () {
                        event.stopPropagation();
                        $(this).hide();
                        $("#modifyUploadImgBox").attr("src","images/setting/upload.png");
                        $("#modifyUp_img").val("")
                    });
                    $(".uploadImgBox").on("change","input[type = file]",function () {
                        var that = this;
                        _this.fileUpLoad(that,"modifyUp_img","modifyUploadImgBox")
                    });
                    //如果默认管理员没有填电话的时候去掉勾选使用电话号码当账号
                    $("#userTel").on("input",function () {
                        if(!$(this).val()){
                            _this.modifyUseTel = 0;
                            $("#modifyIsUseTel").attr("src","/images/repImages/rect.png")
                        }
                    })
                    //切换是否使用手机号当账号
                    $("#modifyIsUseTel").unbind().on("click",function () {
                        if($(this).attr("src")=="/images/repImages/rect1.png"){
                            _this.modifyUseTel = 0;
                            $(this).attr("src","/images/repImages/rect.png")
                        }else {
                            if($("#userTel").valid()&&$("#userTel").val()){
                                if($(this).attr("src")=="/images/repImages/rect1.png"){
                                    _this.modifyUseTel = 0;
                                    $(this).attr("src","/images/repImages/rect.png")
                                }else {
                                    _this.modifyUseTel = 1;
                                    $(this).attr("src","/images/repImages/rect1.png")
                                    $("#userLoginId").val($("#userTel").val())
                                }
                            }else {
                                App.alert(`${$.getI18n("rightPhNum")}`)
                            }
                        }
                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:`${$.getI18n('cancel')}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n('save')}`,type:'imgNoBtn',clickToClose :true,id:'qrSaveUser'}]
            });
            //查询组织树更改组织
            $("#modifyOrgInput").on("focus",function () {
                var ClickCId;
                var ClickName;
                var modifyGetOrgTree = App.dialog({
                    id: "modifyGetOrgTree1" ,
                    title: `${$.getI18n("chooseOrg")}`,
                    width: 400,
                    height: 493,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:_this.modifyChooseOrgTree(),
                    openEvent: function () {
                        $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
                            var treeNode = result.body;
                            $.fn.zTree.init($("#modifyChooseOrgTree"), setting, treeNode);
                        });
                        var setting = {
                            isSimpleData : true,              //数据是否采用简单 Array 格式，默认false
                            treeNodeKey : "id",               //在isSimpleData格式下，当前节点id属性
                            treeNodeParentKey : "pId",        //在isSimpleData格式下，当前节点的父节点id属性
                            showLine : true,                  //是否显示节点间的连线
                            checkable : true,               //每个节点上是否显示 CheckBox
                            callback: {
                                beforeClick: beforeClick,
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
                        function beforeClick(treeId, treeNode, clickFlag) {
                            // console.log(treeId, treeNode, clickFlag,$("#organizationRi"))
                            ClickCId = treeNode.id;
                            ClickName = treeNode.name
                            // console.log(curOrgId)
                        }
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:`${$.getI18n("cancel")}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n("save")}`,type:'imgNoBtn',clickToClose :true,id:'qrmodifyChooseTree'}]
                });
                $("#qrmodifyChooseTree").on("click",function () {
                    curOrgId = ClickCId;
                    $("#modifyOrgInput").val(ClickName)
                })
            });
            //确认修改，保存修改
            $("#qrSaveUser").on("click",function () {
                // console.log(_this)
                var modifyUp_img = $("#modifyUp_img");
                var modifyUploadImgBox = $("#modifyUploadImgBox");
                if(!$('#modifyForm').valid()) return false;
                $.http.POST('/user/udpateUserById.do',{
                    tokenId:Cookies.getCook('tokenId'),
                    orgId:curOrgId,
                    status:curStatus,
                    userId:cruId,
                    roleId:curRoleId,
                    loginId:$("#userLoginId").val(),
                    userName:$("#modifyUserName").val(),
                    userTel:$("#userTel").val(),
                    email:$("#userEmail").val(),
                    useTel:_this.modifyUseTel
                }, function (result) {

                    App.warningDialog(result.msg)
                    if(modifyUploadImgBox.attr("src")==iconUrl){
                        _this.plantTable._fnDraw();
                        return false
                    }
                    else{
                        _this.uploadImg(_this,[modifyUp_img],cruId,iconUrl);
                        _this.plantTable._fnDraw()
                    }

                })
            });
            //给表格赋值
            $("#modifyInfo").setForm(_this.data[row-1]);
            if(_this.data[row-1].email == "--"){
                $("#userEmail").val("")
            }else {
                $("#userEmail").val(_this.data[row-1].email)
            }
            if(_this.data[row-1].userName == "--"){
                $("#modifyUserName").val("")
            }else {
                $("#modifyUserName").val(_this.data[row-1].userName)
            }
            if(_this.data[row-1].userTel == "--"){
                $("#userTel").val("")
            }else {
                $("#userTel").val(_this.data[row-1].userTel)
            }
            if(_this.data[row-1].useTel == "1"){
                _this.modifyUseTel = 1;
                $("#modifyIsUseTel").attr("src","/images/repImages/rect1.png")
            }else {
                _this.modifyUseTel = 0;
                $("#modifyIsUseTel").attr("src","/images/repImages/rect.png")
            }

            //点击切换是否启用图片
            $(".statusImg").on("click",function () {
                if($(this).attr("src")=="/images/plantManage/notenabled.png"){
                    $(this).attr("src","/images/plantManage/enabled.png");
                    curStatus = "1"
                }else {
                    $(this).attr("src","/images/plantManage/notenabled.png")
                    curStatus = "0"
                }
            })

        })
        //修改密码
        $("#example tbody").on("click", "#modifyPassword", function (event) {
            event.stopPropagation()
            var pd
            //获取行 row从1开始的 row-1 就是当前行
            let row = $("table#example tr").index($(this).closest("tr"));
            let userId = _this.data[row-1].id
            // console.log(_this.data[row-1])
            var pwdContent = '<form id="pwdForm1">' +
                '<div class="form-group1">' +
                '<b>*' +
                '</b>'+
                '<label>'+$.getI18n('newPwd')+
                '</label>'+
                '<input name="NewPassword" type="password" class="passwordCheck" id="NewPassword" required/>'+
                '</div>'+
                '<div class="form-group1">' +
                '<b>*' +
                '</b>'+
                '<label>'+$.getI18n('confirmPwd')+
                '</label>'+
                '<input name="repNewPassword" type="password" class="eq1Password" id="repNewPassword"/>'+
                '</div>'+
                '</form>'
            pd = App.dialog({
                title: `${$.getI18n('modifyPWD')}`,
                width: 400,
                height: 250,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:pwdContent ,
                openEvent: function () {
                    $("#pwdForm1").validate()
                    App.initValidate()
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:`${$.getI18n('cancel')}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n('save')}`,type:'imgNoBtn',clickToClose :true,id:'saveModifyPsd'}]
            })
            $('#saveModifyPsd').unbind().on('click',function(){
                // console.log("in")
                if(!$('#pwdForm1').valid()) return false
                $.http.POST('/user/updateDirectPwd.do',
                    {
                        tokenId:Cookies.getCook('tokenId'),
                        NewPassword:hex_md5($("#repNewPassword").val()),
                        userId:userId
                    },function(res){
                        App.warningDialog(res.msg)
                },true,true)
            })
        })
    },
    //新增修改用户信息弹窗模板
    addUserTep:function(){
        //弹窗模板
        this.ownerContent = '<form id="addUserForm" enctype="multipart/form-data">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("orgName")+"</span>：" +
            '</label>'+
            '<input name="orgName" id="addOrgName" disabled="true" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("userName")+"</span>：" +
            '</label>'+
            '<input name="roleName" id="addUserName" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("role")+"</span>：" +
            '</label>'+
            '<select name="role" id="addUserOption">' +
            '<option value="0">'+$.getI18n("all")+'</option>' +
            '</select>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("userTel")+"</span>：" +
            '</label>'+
            '<input name="userTel" id="addUserTel" class=" checkAddRepeatTel mobile" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b style="visibility: hidden">*' +
            '</b>'+
            "<label><span>"+$.getI18n("email")+"</span>：" +
            '</label>'+
            '<input name="email" id="addUserEmail" class="checkAddRepeatEmail" type="email"/>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label><span>'+$.getI18n("sysId")+'</span>：' +
            '</label>'+
            '<input name="loginId" placeholder="" id="addUserLoginId" class="checkAddRepeatLoginId sysTel"required/>'+
            '<span class="sysSpan"><span><img class="useTle"  id="addUserUseTel" src="/images/setting/noUseTel.png" alt=""></span><span>'+$.getI18n("useTel")+'</span></span>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label><span>'+$.getI18n("accPassword")+'</span>：' +
            '</label>'+
            '<input name="password" type="password" id="password"  required class="passwordCheck firPwd"/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label><span>'+$.getI18n("confirmPwd")+'</span>：' +
            '</label>'+
            '<input type="password" required id="addUserQrpassword" class="eqPassword secPwd"/>'+
            '</div>'+
            '<div class="item-group orgStatus">' +
            '<b style="visibility: hidden">*' +
            '</b>'+
            '<label><span>'+$.getI18n("accountStatus")+'</span>：' +
            '</label>'+
            '<i><image id="addUserStatus" src="/images/plantManage/enabled.png" class="statusImg"></image></i>'+
            '</div>'+
            '<div class="item-group userPic">' +
            '<b style="visibility: hidden">*' +
            '</b>'+
            '<label style="position: absolute; top: 0;left: 10px"><span style="color: #333;">'+$.getI18n("userIcon")+'</span>：' +
            '</label>'+
            '<i style="position: absolute;left: 100px;display: inline-block"><div class="uploadImgBox"><image id="addUploadImgBox" src="/images/setting/upload.png"></image><a class="uploadA" id="addClose" style="display: none"><img src="/images/setting/close.png" alt=""></a><input id = "addUp_img" type="file" accept="image/jpeg,image/gif,image/png" /></div><span style="position:absolute;bottom:0"><span>'+$.getI18n("ProposedPictureLengthWidthRatio")+'</span>1:1</span></i>'+
            '</div>'+
            '</div>'+
            '</form>';
        return this.ownerContent
    },
    //修改模板
    modifyUserTep:function(){
        //弹窗模板
        this.ownerContent = '<form id="modifyForm" enctype="multipart/form-data">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("orgName")+"</span>：" +
            '</label>'+
            '<input name="orgName" id="modifyOrgInput" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("userName")+"</span>：" +
            '</label>'+
            '<input name="userName" id="modifyUserName" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("role")+"</span>：" +
            '</label>'+
            '<select name="role"  id="modifyOption">' +
            '</select>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            "<label><span>"+$.getI18n("userTel")+"</span>：" +
            '</label>'+
            '<input name="userTel" id="userTel" class=" checkRepeatTel mobile" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b style="visibility: hidden">*' +
            '</b>'+
            "<label><span>"+$.getI18n("email")+"</span>：" +
            '</label>'+
            '<input name="email" id="userEmail" class="checkRepeatEmail" type="email"/>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label><span>'+$.getI18n("sysId")+'</span>：' +
            '</label>'+
            '<input name="loginId" placeholder="" id="userLoginId" class="checkRepeatLoginId sysTel" required/>'+
            '<span class="sysSpan"><span><img class="useTle"  id="modifyIsUseTel" src="/images/setting/noUseTel.png" alt=""></span><span>'+$.getI18n("useTel")+'</span></span>'+
            '</div>'+
            '<div class="item-group orgStatus">' +
            '<b style="visibility: hidden">*' +
            '</b>'+
            '<label><span>'+$.getI18n("accountStatus")+'</span>：' +
            '</label>'+
            '<i><image  src="" class="statusImg"></image></i>'+
            '</div>'+
            '<div class="item-group userPic">' +
            '<b>' +
            '</b>'+
            '<label style="position: absolute; top: 0;left: 10px"><span style="color: #333;">'+$.getI18n("userIcon")+'</span>：' +
            '</label>'+
            '<i style="position: absolute;left: 100px;"><div class="uploadImgBox"><image id="modifyUploadImgBox" src="/images/plantManage/head.png"></image><a class="uploadA">'+
            '<img src="/images/setting/close.png" alt=""></a>' +
            '<input id = "modifyUp_img" type="file" accept="image/jpeg,image/gif,image/png"/>'+
            '</div><span style="position:absolute;bottom:0;color: #FF0E26"><span>'+$.getI18n("ProposedPictureLengthWidthRatio")+'</span>1:1</span></span></i>'+
            '</div>'+
            '</div>'+
            '</form>';
        return this.ownerContent
    },
    //修改信息选择组织弹窗
    modifyChooseOrgTree:function(){
        this.modifyChooseOrgTreeTem = `
        <div id="modifyChooseOrgTree" class="ztree"></div>
        `
        return this.modifyChooseOrgTreeTem
    },
    // 删除用户模板
    deleteUserTem:function () {
        this.ownerContent = `${$.getI18n('sureDeleteUser')}`
        return this.ownerContent
    },
    //获取角色类型
    getRoleByOrgId:function (orgId) {
        $.http.POST('/user/getRoleAll.do',{tokenId:Cookies.getCook('tokenId'), orgId:orgId,}, function (result) {
            $("#roleOption").empty().append($("<option value=''>"+$.getI18n('all')+"</option>"))
            if(result.body){
                var optionEl = result.body.map(function (item,index) {
                    return `<option value="${item.value}">${item.name}</option>`
                }).join("")
                $("#roleOption").append(optionEl)
            }

        })
    },
    //预览图片
    fileUpLoad:function (_this,upBtn,imgShowBox) {

        var ipt = document.getElementById(upBtn);
        var imgCont = document.getElementById(imgShowBox)
        // console.log(ipt,imgCont)
        var file = _this.files[0];
        // console.log(_this)
        // console.log(file)
        // console.log($("input[type=file]"))
        var size = Math.round(file.size / 1024 / 1024);
        if (size > 1) {
            App.alert("图片过大")
            return
        }
        if (!/image\/\w+/.test(file.type)) { //html中已经用accept='image/*'限制上传的是图片了，此处判断可省略
            App.alert("文件必须为图片！");
            return false;
        }
        if (!FileReader) {
            App.alert("你的浏览器不支持H5的FileReader");
            ipt.setAttribute("disabled", "disabled");//浏览器不支持禁用input type='file'文件上传标签
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);//将文件读取为Data URL 读取结果放在result中
        fileReader.onload = function (e) {
            imgCont.src = this.result;
        };
        $(".uploadA").show()
    },
    //图片上传
    uploadImg:function(_this,ids,userId,iconUrl){
        var pic = [];
        pic.push(ids[0][0].files[0])
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:`/user/uploadUserIcon.do?imgUrl=${iconUrl}&tokenId=${Cookies.getCook('tokenId')}&userId=${userId}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){

            },complete:function () {
                _this.plantTable._fnDraw()
                var file = ids;
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                // console.log(ids,file.value)
            }
        });
    }
};