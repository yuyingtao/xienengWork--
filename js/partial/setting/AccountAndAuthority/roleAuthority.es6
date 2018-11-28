/**
 * Created by SP0015 on 2018/1/10.
 */
define(function(){
    return RoleRender;
});
var RoleRender = {
    addDialog:'',//新增角色弹窗
    orgId:'',//全局变量新增角色名称 和切换组织再查询时都会用
    roleId:"",
    Css:true,
    authorityIds:[],
    Render: function () {
        var _this = this;
        this.ztreeShow(_this);
        // console.log($(".chk"))
        //点击角色类型切换
        $(".roleList").on("click","li",function () {
            $(".roleList li").each(function () {
                $(this).removeClass("activeLi")
            });
            $(this).addClass("activeLi");
            _this.roleId = $(this).attr("_id");
            _this.getAuthorityZtree(_this,$(this).attr("_id"))
        });
        //首次加载获取是获取根节点 角色类型 第一次可以不传orgId
        _this.getRoleByOrgId(_this);
        //点击新增角色
        $("#addRoleBtn").on("click",function () {
            _this.addDialog = App.dialog({
                id: "modifyInfo" ,
                title: `${$.getI18n("roleAuthMan.addRole")}`,
                width: 300,
                height: 100,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:_this.addRole(),
                openEvent: function () {
                    $("#addRoleForm").validate();
                    App.initValidate()
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:`${$.getI18n("cancel")}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n("save")}`,type:'imgNoBtn',clickToClose :true,id:'qrAddRole'}]
            });
            $("#qrAddRole").on("click",function () {
                if(!$('#addRoleForm').valid()) return false;
                $.http.POST('/role/saveRoleAndRights.do',{
                    tokenId:Cookies.getCook('tokenId'),
                    orgId:_this.orgId,
                    roleName:$("#addRoleInput").val(),
                }, function (result) {
                    App.warningDialog(result.msg)
                    _this.getRoleByOrgId(_this,_this.orgId)
                })
            })
        });
        //点击取消
        $("#cancelModify").on("click",function () {
            _this.getRoleByOrgId(_this)
        });
        //点击保存
        $("#jurisdictionList").on("click","#saveModify",function () {
            var arr =[];
            var arrId = "";
            var treeObj = $.fn.zTree.getZTreeObj("authorityZtree");
            // console.log(treeObj.getCheckedNodes())
            if(!treeObj.getCheckedNodes().length){

            }else {
                treeObj.getCheckedNodes().map(function (item) {
                    arr.push(item.id)
                });
                arrId = arr.unique().join(",")
            }
            $.http.POST('/role/updateRightsByRid.do',{tokenId:Cookies.getCook('tokenId'), roleId:_this.roleId,rights:arrId}, function (result) {
                App.warningDialog(result.msg)
                // _this.getAllRights(result.body[0].value)
            })
        });
        //删除角色
        $("#delete").on("click",function () {
            _this.addDialog = App.dialog({
                id: "modifyInfo" ,
                title: $.getI18n("roleAuthMan.deleteRole"),
                width: 300,
                height: 100,
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
                buttons: [{text:`${$.getI18n("cancel")}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n("sure")}`,type:'imgNoBtn',clickToClose :true,id:'qrDelete'}]
            });
            $("#qrDelete").on("click",function () {
                $.http.POST('/role/updateRoleValid.do',{tokenId:Cookies.getCook('tokenId'),roleId:_this.roleId}, function (result) {
                    // console.log(result)
                    if(result.code == 101){
                        App.warningDialog(result.body,1)
                    }else {
                        App.warningDialog(result.body)
                        _this.getRoleByOrgId(_this,_this.orgId)
                    }
                },true,true)
            })
        });
        //全部收起
        $(".takeUpAll").on("click",function () {
            $.fn.zTree.getZTreeObj("authorityZtree").expandAll(false);
        })
    },
    ztreeShow:function (_this) {
        var treeNode;
        $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
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
        function getFontCss(treeId, treeNode) {
            return (!!treeNode.highlight==false) ? {color:"#333", "font-weight":"normal"}:{color:"#01B1ED", "font-weight":"bold"}
        }
        //ztree模糊查询
        $(".searchBtn2").on("click",function () {
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

        // var zTree;
        //节点点击事件
        var log, className = "dark";
        function beforeClick(treeId, treeNode, clickFlag) {
            // _this.addOrgId = treeNode.id//树节点改变 新增用户传的orgId也要改变
            // _this.preOrgName = treeNode.name//树节点改变 新增用户传的上级组织名称也要改变
            // console.log(treeNode)
            _this.orgId = treeNode.id;
            _this.getRoleByOrgId(_this,_this.orgId)
            // _this.getRoleByOrgId(treeNode.id)
        }
        $.fn.zTree.init($("#ztree"), setting, treeNode);
    },
    getZtree:function (id) {
        var that = this;
        $.http.POST('/org/getOrgInfo.do',{tokenId:Cookies.getCook('tokenId'),orgId:id},function(result){

        })
    },
    //获取角色列表的方法
    getRoleByOrgId:function (_this,orgId) {
        $.http.POST('/user/getRoleByOrgId.do',{tokenId:Cookies.getCook('tokenId'), orgId:orgId,}, function (result) {
            $("#roleList").empty();
            if(result.body){
                let liEl = result.body.map(function (item) {
                    return `<li _id=${item.value}>${item.name}</li>`
                }).join("");
                $("#roleList").append(liEl);
                $("#roleList li").eq(0).addClass("activeLi")
            }
            _this.roleId = result.body[0].value;
            // _this.getAllRights(result.body[0].value)
            _this.getAuthorityZtree(_this,result.body[0].value)
        })
    },
    //addrole模板
    addRole:function(){
        //弹窗模板
        this.ownerContent =
            `
            <div>${$.getI18n("roleAuthMan.addRoleName")}</div>
            <div class="addInput">
            <form action="" id="addRoleForm">
                 <input type="text" id="addRoleInput" required/>
            </form>
            </div>
            
            `;
        return this.ownerContent
    },
    //删除角色模板
    deleteUserTem:function () {
        this.ownerContent = `${$.getI18n("roleAuthMan.qrDeleteRole")}`;
        return this.ownerContent
    },
    //设置树权限列表
    getAuthorityZtree:function (_this,roleId) {
        $.http.POST('/role/getAllRights.do',{tokenId:Cookies.getCook('tokenId'), roleId:roleId,}, function (result) {
            var zNodes = result.body.list;
            if(result.body.showType =="0"){
                $("#saveModify").hide();
                $("#cancelModify").hide()
            }else {
                $("#saveModify").show();
                $("#cancelModify").show()
            }
            var IDMark_A = "_a";
            var setting = {
                view: {
                    showLine: true,
                    showIcon: false,
                    selectedMulti: false,
                    dblClickExpand: false,
                    addDiyDom: addDiyDom,
                    fontCss: getFontCss,
                },
                check: {
                    enable: true

                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeClick: beforeClick,
                    onCheck: zTreeOnCheck
                }
            };
            var code, log, className = "dark";
            function addDiyDom(treeId, treeNode) {
                if (treeNode.parentNode && treeNode.parentNode.id!=2) return;
                var aObj = $("#" + treeNode.tId + IDMark_A);
                var editStr = `<span class='demoIcon' id='diyBtn_${treeNode.id}' title=${treeNode.describeMsg} onfocus='this.blur();'><span class='button icon01'>${treeNode.describeMsg}</span></span>`;
                aObj.append(editStr);
                var btn = $("#diyBtn_"+treeNode.id);
                if (btn) btn.unbind().bind("click", function(){
                });

            }
            function beforeClick(treeId, treeNode, clickFlag) {
                    className = (className === "dark" ? "":"dark");
                    showLog("[ "+getTime()+" beforeCheck ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name );
                    return (treeNode.doCheck !== false);
                    //下面两行设置点击展开收起子列表
                    var zTree = $.fn.zTree.getZTreeObj("authorityZtree");
                    zTree.expandNode(treeNode);
            }
            function getFontCss(treeId, treeNode) {
                return (!!treeNode.highlight==false) ? {color:"#333", "font-weight":"normal"}:{color:"#01B1ED", "font-weight":"bold"}
            }
            function zTreeOnCheck(e, treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj("authorityZtree");
                if(treeNode.editLook == "0"){
                    // console.log("111")
                    if(treeNode.getParentNode()){
                        // console.log(222)
                        for(let i = 0;i<treeNode.getParentNode().children.length;i++){
                            // console.log(treeNode.getParentNode().children[i].checked)
                            if(treeNode.getParentNode().children[i].checked == true){
                                treeNode.checked =true;
                                // console.log(333);
                                treeObj.refresh();
                            }
                        }
                    }
                }
                if(treeNode.getParentNode()){
                    if(treeNode.editLook!="0"){
                        treeNode.getParentNode().children.map(function (item) {
                            // console.log(item.checked);
                            if(item.editLook =="0"){
                                // console.log("in");
                                item.checked = true;
                                treeObj.refresh();
                            }
                        })
                    }
                }
            }
            function showLog(str) {
                if (!log) log = $("#log");
                log.append("<li class='"+className+"'>"+str+"</li>");
                if(log.children("li").length > 6) {
                    log.get(0).removeChild(log.children("li")[0]);
                }
            }
            function getTime() {
                var now= new Date(),
                    h=now.getHours(),
                    m=now.getMinutes(),
                    s=now.getSeconds(),
                    ms=now.getMilliseconds();
                return (h+":"+m+":"+s+ " " +ms);
            }
            var treeObj = $("#authorityZtree");
            $.fn.zTree.init(treeObj, setting, zNodes);
            treeObj.hover(function () {
                    treeObj.addClass("showIcon");
            },
                function() {
                treeObj.removeClass("showIcon");
            });
            //ztree模糊查询
            $(".searchBtn1").on("click",function () {
                if($("#key1").val()){
                    var zTree = $.fn.zTree.getZTreeObj("authorityZtree");
                    zTree.setting.view.expandSpeed = "";
                    $.fn.zTree.getZTreeObj("authorityZtree").expandAll(false);
                    zTree.setting.view.expandSpeed = "fast";
                    var value = $("#key1").val();
                    var keyType = "name";
                    var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                    updateNodes(true,nodeList); //更新节点
                }
            });
            $("#key1").on("keydown",function (e) {
                $(".showAccordLength span").html("--");
                if($("#key1").val()){
                    if(e.keyCode == 13){
                        var zTree = $.fn.zTree.getZTreeObj("authorityZtree");
                        zTree.setting.view.expandSpeed = "";
                        $.fn.zTree.getZTreeObj("authorityZtree").expandAll(false);
                        zTree.setting.view.expandSpeed = "fast";
                        var value = $("#key1").val();
                        var keyType = "name";
                        var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                        updateNodes(true,nodeList); //更新节点
                    }
                }
            });
            function updateNodes(highlight,nodeList) {
                var zTree = $.fn.zTree.getZTreeObj("authorityZtree");
                //获取所有节点 并设置highlight 为false 并updateNode 每一个 让上次搜索过的变成普通节点
                var node = zTree.getNodes();
                zTree.transformToArray(node).map(function (item) {
                    item.highlight = false;
                    zTree.updateNode(item);
                });
                for( var i=0, l=nodeList.length; i<l; i++) {
                    nodeList[i].highlight = highlight; //高亮显示搜索到的节点(highlight是自己设置的一个属性)
                    zTree.updateNode(nodeList[i]); //更新节点数据，主要用于该节点显示属性的更新
                    zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
                }
                // console.log(nodeList.length)
                $(".showAccordLength span").html(nodeList.length)
            }
            // $("#key1").on("focus",function () {
            //     $.fn.zTree.getZTreeObj("authorityZtree").expandAll(false);
            // })
        })
    }
};