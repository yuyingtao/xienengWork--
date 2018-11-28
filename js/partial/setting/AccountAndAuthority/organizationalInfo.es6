/**
 * Created by SP0015 on 2017/12/26.
 */
define(function(){
    return OrganizationRender;
});
var OrganizationRender = {
    data:"",
    userId:"",
    orgId:"",
    orgStatus:"",
    isOpen:"",//更改是否启用图标，启用为1 不启用为0
    isShow:0,//根据展开的是否为公司来决定是否显示修改密码按钮
    modifyPasUserId:"",//修改密码时候的userId
    Render: function () {
        //    Todo Main function
        var _this = this;
        this.ztreeShow(_this);
        //点击编辑显示编辑页面
        $("#edit").on("click",function () {
            $(".orEdit").show();
            $(".orDetai").hide();
            $("input[name='email']").val("");
            $("input[name='loginId']").val("");
            $("input[name='orgName']").val("");
            $("input[name='userTel']").val("");
            $("form").setForm(_this.data)
        });
        //编辑页面点击返回 显示组织页面
        $("#cancel").on("click",function () {
            $(".orEdit").hide();
            $(".orDetai").show();
            _this.getZtree(_this,_this.orgId);
            $("form").setForm("");
            $("form").setForm(_this.data)
        });
        $("#modifySave").unbind().on("click",function () {
            $('#modifyForm').validate();
            App.initValidate();
            if($('#modifyForm').valid()){
                _this.ModifyInfo(_this.orgId,_this.userId,_this.isOpen,_this);

                $(".orEdit").hide();
                $(".orDetai").show()
            }
        });
        //修改信息时候点击切换是否启用 并更改isOpen的值，
        $("#modifyForm").unbind().on("click",".isOpenImg",function () {
            if($(this).attr("src") == "images/setting/enabled.png"){
                $(this).attr("src","images/setting/notenabled.png");
                _this.isOpen = 0
            }else {
                $(this).attr("src","images/setting/enabled.png");
                _this.isOpen = 1
            }
        });
        //修改密码
        $('#modifyPassword').unbind().on('click',function(){
            // var userId = $(this).data('id')
            var pd = '';
            var pwdContent = '<form id="pwdForm1">' +
                '<div class="form-group1">' +
                '<b>*' +
                '</b>'+
                '<label>'+'<b style="visibility: hidden">占</b>'+$.getI18n("oldPwd")+':'+'<b style="visibility: hidden">&nbsp;</b>' +
                '</label>'+
                '<input name="OldPassword" type="password" id="password" required/>'+
                '</div>'+
                '<div class="form-group1">' +
                '<b>*' +
                '</b>'+
                '<label>'+'<b style="visibility: hidden">占</b>'+$.getI18n("newPwd")+':'+'<b style="visibility: hidden">&nbsp;</b>' +
                '</label>'+
                '<input name="NewPassword" type="password" class="passwordCheck" id="NewPassword" required/>'+
                '</div>'+
                '<div class="form-group1">' +
                '<b>*' +
                '</b>'+
                '<label>'+'<b style="visibility: hidden">&nbsp;</b>'+$.getI18n("confirmPwd")+':'+'<b style="visibility: hidden">&nbsp;</b>' +
                '</label>'+
                '<input name="repNewPassword" type="password" class="eq1Password" id="repNewPassword"/>'+
                '</div>'+
                '</form>';
            pd = App.dialog({
                title:`${$.getI18n("modifyPWD")}` ,
                width: 420,
                height: 250,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:pwdContent ,
                // openEvent: function () {
                //     setEnvent()
                // },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:`${$.getI18n("cancel")}`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:`${$.getI18n("save")}`,type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
            });
            $('#saveOwner').unbind().on('click',function(){
                $('#pwdForm1').validate();
                App.initValidate();
                if(!$('#pwdForm1').valid()) return false;
                //data.userId = Cookies.getCook('id')
                $.http.POST('/user/updateUserPwd.do',
                    {
                        tokenId:Cookies.getCook('tokenId'),
                        NewPassword:hex_md5($("#repNewPassword").val()),
                        OldPassword:hex_md5($("#password").val()),
                        userId:_this.userId,
                    },function(res){
                        App.warningDialog(res.msg)
                },true,true)
            })
            //校验密码

        })

    },
    ztreeShow:function (_this) {
        var treeNode;
        $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            // console.log(result)
            _this.getZtree(_this,result.body.id);
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
                enable:true,
                url:"/org/getOrgTree.do",
            },
            view: {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
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
        //鼠标移入节点事件   节点显示自定义图标 也就是那个添加和删除的图标
        function addHoverDom(treeId, treeNode) {
            // console.log(treeId, treeNode,treeNode.getParentNode().name,treeNode.name)
            var Pname ="";
            var PreName ="";
            if(treeNode.getParentNode()){
                 Pname = treeNode.getParentNode().name;//当前点击节点的父节点的名称
                 PreName = treeNode.getParentNode().name //新增页面默认显示的上级组织名称
            }else {
                PreName = treeNode.name //新增页面默认显示的上级组织名称
            }
            var Cname = treeNode.name;//当前点击节点的名称
            var CpOrgType = 1;
            //鼠标移入 显示 添加和 删除按钮
            if (treeNode.parentNode && treeNode.parentNode.id!=1) return;
            var aObj = $("#" + treeNode.tId + IDMark_A);
            if ($("#diyBtn_"+treeNode.id).length>0) return;
            var editStr = "<span id='diyBtn_space_" +treeNode.id+ "' ></span><span class='button icon03' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();' permission = 'groupInfoNew'></span><span permission = 'groupInfoDelete' class='button icon04' id='diy1Btn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'></span>";
            aObj.append(editStr);
            Menu.hasElementRight();
            var btn = $("#diyBtn_"+treeNode.id);//添加按钮
            var btn1 = $("#diy1Btn_"+treeNode.id);//删除按钮
            //鼠标移入 显示 添加和 删除按钮结束

            //添加组织按钮图标
            if (btn) btn.bind("click", function(){
                var zTree = $.fn.zTree.getZTreeObj("ztree");
                var nodes = zTree.getNodes()[0];
                var rootId = nodes.id;
                var addOrganization='';
                var pid = treeNode.pId;
                var orgId = treeNode.id;
                var orgType = treeNode.orgType;
                var orgStatus = 1;
                // 弹窗 新增组织
                var winContent =`<div class="cpBox" style="display:none;">
                                    <div class='radio'>
                                    <div id="addCpT"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("addSameLvOrg")}</div> 
                                    <div id="addCpX"><img src='/images/setting/rect.png' alt=''>${$.getI18n("addSubLvOrg")}</div>
                                    </div>
                                    <div class="nexRdio">
                                    <div id="addCpB"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("department")}</div> 
                                    <div id="addCpC"><img src='/images/setting/rect.png' alt=''>${$.getI18n("company")}</div>
                                    </div>
                                </div>
                                <div class="dpBox" style="display: none">
                                    <div class='radio'>
                                        <div id="addBT"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("addSameLvDep")}</div> 
                                        <div id="addBX"><img src='/images/setting/rect.png' alt=''>${$.getI18n("addSubLvDep")}</div>
                                    </div>
                                </div>
                                <div class="rootNode" style="display: none">
                                    <div class='radio'>
                                        <div id="addRootBX"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("addSubLvDep")}</div> 
                                        <div id="addRootCX"><img src='/images/setting/rect.png' alt=''>${$.getI18n("addSubLvCom")}</div>
                                    </div>
                                </div>
                                    `;
                addOrganization = App.dialog({
                    id: "changeWin" ,
                    title: $.getI18n("selectionOfTissueTypes"),
                    width: 400,
                    height: 160,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content: winContent,
                    openEvent:function () {
                        CpOrgType =1;
                        if(rootId == orgId){
                            $(".rootNode").show();
                            pid = rootId
                        }else {
                            if(orgType == "0"){
                                $(".cpBox").show()
                            }else {
                                $(".dpBox").show()
                            }
                        }
                    },
                    closeEvent: function () {
                    },
                    isdrag: true,
                    buttons: [{text:$.getI18n("sure"),type:'imgNoBtn',clickToClose :true,click:fn}]
                });
                //弹窗新增组织信息页面
                function fn () {
                    var newOrganization="";
                    // 弹窗
                    var winContent = "<form id='addOrgForm'><div class='orEdit' id='addCP' style='display: none'>" +
                        "<p><span class='messName'>"+$.getI18n('preOrg')+"</span><b style='margin-right: 8px'>:</b><input id='preOrg' value='"+PreName+"' disabled='true' type='text'></p>"+
                        " <p><span class='messName'><span>*</span>"+$.getI18n('orgNames')+"</span><b style='margin-right: 8px'>:</b><input id='orgName' class='addOrgName' type='text'name='1' required/></p>"+
                        "<p><span class='messName'><span>*</span>"+$.getI18n('administratorAccount')+"</span><b style='margin-right: 8px'>:</b><input id='loginId'  class='checkAddRepeatLoginId'type='text' name='2' required/></p>"+
                        "<p><span class='messName'><span>*</span>"+$.getI18n('setPassWord')+"</span><b style='margin-right: 8px'>:</b><input id='password' type='password' class='passwordCheck' name='3' required/></p>"+
                        "<p><span class='messName'><span>*</span>"+$.getI18n('confirmPwd')+"</span><b style='margin-right: 8px'>:</b><input id='rqpassword' type='password' class='eqPassword' name='4' required/></p>"+
                        "<p><span class='messName'>"+$.getI18n('email')+"</span><b style='margin-right: 8px'>:</b><input  id='email' type='email' class='checkAddRepeatEmail' name='5'></p>"+
                        "<p class='phoneNum'><span class='messName'>"+$.getI18n('userTel')+"</span><b style='margin-right: 8px'>:</b><input id='userTel' class='checkAddRepeatTel mobile' type='text'/></p>"+
                        "<p><span class='messName'>"+$.getI18n('orgStatus')+"</span><b style='margin-right: 8px'>:</b><span class='orImg'><img class='addIsOpen'  src='images/setting/enabled.png'></span></p>"+
                        "</div>" +
                        "<div class='orEdit'id='addBM' style='display: none'>" +
                        "<p><span class='messName'>"+$.getI18n('preOrg')+"</span><b style='margin-right: 8px'>:</b><input id='preOrg' value='"+PreName+"' disabled='true' type='text'></p>"+
                        " <p><span class='messName'><span>*</span>"+$.getI18n('orgNames')+"</span><b style='margin-right: 8px'>:</b><input id='BorgName' type='text' required/></p>"+
                        "<p><span class='messName'>"+$.getI18n('orgStatus')+"</span><b style='margin-right: 8px'>:</b><span class='orImg'><img class='addIsOpen'  src='images/setting/enabled.png'></span></p>"+
                        "</div>";
                    "</form>";
                    newOrganization = App.dialog({
                        title: $.getI18n('addOrgInfo'),
                        width: 570,
                        height: 466,
                        maxWidth: document.documentElement.clientWidth - 40,
                        maxHeight: document.documentElement.clientHeight - 42,
                        appendTo: 'body',
                        backdrop: false,
                        modal: true,
                        keyboard: true,
                        content: winContent,
                        openEvent:function () {
                            if(CpOrgType=="0"){
                                $("#addCP").show()
                            }else {
                                $("#addBM").show()
                            }
                            $("#addOrgForm").validate();
                            App.initValidate()
                        },
                        closeEvent: function () {
                        },
                        isdrag: true,
                        buttons: [{text:`${$.getI18n('cancel')}`,type:'addCancel',clickToClose :true,},{text:`${$.getI18n('save')}`,type:'addSave',id:"qrAddOrg",clickToClose :true,}]
                    });
                    //新增组织
                    $(".addIsOpen").on("click",function () {
                        if($(this).attr("src") == "images/setting/enabled.png"){
                            orgStatus = 0;
                            $(this).attr("src","images/setting/notenabled.png")
                        }else {
                            $(this).attr("src","images/setting/enabled.png");
                            orgStatus = 1
                        }
                    });
                    //保存新增组织
                    $("#qrAddOrg").on("click",function () {
                        if(!$('#addOrgForm').valid()) return false;
                        var email = $("#email").val();
                        var orgName = $("#orgName").val()+$("#BorgName").val();
                        var loginId = $("#loginId").val();
                        var password = hex_md5($("#password").val());
                        var userTel = $("#userTel").val();
                        $.http.POST('/org/addOrgInfoByUser.do',{
                            tokenId:Cookies.getCook('tokenId'),
                            orgType:CpOrgType,
                            orgId:orgId,
                            orgName:orgName,
                            email:email,
                            loginId:loginId,
                            password:password,
                            pid:pid,
                            userTel:userTel,
                            orgStatus:orgStatus},function(result){
                            // console.log(_this)
                            _this.ztreeShow(_this);
                            App.warningDialog(result.msg);
                            CpOrgType = 1
                        },function (result) {
                            App.warningDialog(result.body)
                        })
                    });
                    function addOrg () {
                        // console.log($(".addOrgName"),$(".BorgName").val())

                    }
                }
                //新增组织时 模拟单选按钮 切换图片
                $(".radio").find("div").unbind().on("click",function(){
                    $(".radio").find("div").find("img").attr("src",'/images/setting/rect.png');
                    $(this).find("img").attr("src",'/images/setting/rect1.png')
                });
                $(".nexRdio").find("div").unbind().on("click",function(){
                    $(".nexRdio").find("div").find("img").attr("src",'/images/setting/rect.png');
                    $(this).find("img").attr("src",'/images/setting/rect1.png')
                });
                //根据点击新增哪一级组织 更改当前父节点Id
                //节点为公司时
                $(".radio").find("div").eq(0).on("click",function () {
                    pid = treeNode.pId;
                    PreName = Pname
                });
                $(".radio").find("div").eq(1).on("click",function () {
                    pid = treeNode.id;
                    PreName = Cname
                });
                $("#addCpC").on("click",function () {
                    CpOrgType = 0
                });
                $("#addCpB").on("click",function () {
                    CpOrgType = 1

                });
                //节点为部门时
                $("#addBT").on("click",function () {
                    pid = treeNode.pId;
                    PreName = Pname
                });
                $("#addBX").on("click",function () {
                    pid = treeNode.id;
                    PreName = Cname
                });
                //根节点点击时
                $("#addRootBX").on("click",function () {
                    CpOrgType = 1;
                    pid = rootId;
                    PreName = Cname
                });
                $("#addRootCX").on("click",function () {
                    CpOrgType = 0;
                    pid = rootId;
                    PreName = Cname
                })

            });
            //删除组织按钮图标
            if (btn1) btn1.bind("click", function(){
                var deOrg='';
                // 弹窗 删除组织
                var winContent = `<p style='color: red;font-size: 18px'>${$.getI18n('qrDeleteOrg')}</p>`;
                deOrg = App.dialog({
                    id: "changeWin" ,
                    title: `${$.getI18n('delete')}`,
                    width: 400,
                    height: 90,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content: winContent,
                    openEvent:"",
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:`${$.getI18n('confirm')}`,type:'imgNoBtn',clickToClose :true,click:deleteOrg}]
                });
                function deleteOrg(){
                    $.http.POST('/org/deleteOrgInfoByUser.do',
                        {tokenId:Cookies.getCook('tokenId'),orgId:treeNode.id},function(result){
                            _this.ztreeShow(_this);
                            App.warningDialog(result.msg)
                        })
                }
            });
        }
        //鼠标移出事件 节点自定义图标隐藏
        function removeHoverDom(treeId, treeNode) {
            $("#diyBtn_"+treeNode.id).unbind().remove();
            $("#diy1Btn_"+treeNode.id).unbind().remove();
            $("#diyBtn_space_" +treeNode.id).unbind().remove();
            $("#diy1Btn_space_" +treeNode.id).unbind().remove();
        }
        //节点点击事件
        var log, className = "dark";
        function beforeClick(treeId, treeNode, clickFlag) {
            // console.log(treeNode)
            if(treeNode.orgType == "0"){
                $("#modifyPassword").show()
            }else{
                $("#modifyPassword").hide()
            }
            _this.getZtree(_this,treeNode.id);
            $(".orEdit").hide();
            $(".orDetai").show()
        }
    },
    getZtree:function (_this,id) {
        var that = this;
        $.http.POST('/org/getOrgInfo.do',{tokenId:Cookies.getCook('tokenId'),orgId:id},function(result){
            // console.log(result)
            if(result.body.orgType == "1"){
                $(".isShow").hide()
            }else {
                $(".isShow").show()
            }
            $(".orgName").html("");
            $(".orgName").html(result.body.orgName);
            $(".orgCode").html("");
            $(".orgCode").html(result.body.orgCode);
            $(".loginId").html("");
            $(".loginId").html(result.body.loginId);
            $(".email").html("");
            $(".userTel").html("");
            if(!result.body.userTel){
                $(".preUserTel").html("-");
                $(".userTel").html(result.body.userTel)
            }else {
                $(".userTel").html(result.body.userTel);
                $(".preUserTel").html("086")
            }
            if(!result.body.email){
                $(".email").html("--")
            }else {
                $(".email").html(result.body.email)
            }

            if(result.body.status == '0'){
                $(".isUse").html(`${$.getI18n('noEnable')}`);
                $(".isOpenImg").attr("src","images/setting/notenabled.png");
                _this.isOpen = 0
            }else {
                $(".isUse").html(`${$.getI18n('enable')}`);
                $(".isOpenImg").attr("src","images/setting/enabled.png");
                _this.isOpen = 1
            }
            $("#modifyLoginId").attr("_id",result.body.userId);
            $("#modifyEmail").attr("_id",result.body.userId);
            $("#modifyTel").attr("_id",result.body.userId);
            that.data = result.body;
            that.userId = result.body.userId;
            that.orgId = result.body.orgId
        })
    },
    //修改组织信息
    ModifyInfo:function (orgId,userId,isOpen,_this) {
        $.http.POST('/org/updateOrgInfoByUser.do',
            {
                tokenId:Cookies.getCook('tokenId'),
                email:$("input[name='email']").val(),
                loginId:$("input[name='loginId']").val(),
                orgCode:$("input[name='orgCode']").val(),
                orgId:orgId,
                orgName:$("input[name='orgName']").val(),
                orgStatus:isOpen,
                userId:userId,
                userTel:$("input[name='userTel']").val(),
            },function(result){
                if(result.code =="100"){
                    _this.getZtree(_this,_this.orgId);
                    var treeNode;
                    $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
                        treeNode = result.body;
                        $.fn.zTree.init($("#ztree"), setting, treeNode);
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
                            enable:true,
                            url:"/org/getOrgTree.do",
                        },
                        view: {
                            addHoverDom: addHoverDom,
                            removeHoverDom: removeHoverDom,
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
                        return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
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
                            // console.log(nodeList)
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
                                // console.log(nodeList)
                                updateNodes(true,nodeList); //更新节点
                            }
                        }
                    });
                    function updateNodes(highlight,nodeList) {
                        var zTree = $.fn.zTree.getZTreeObj("ztree");
                        for( var i=0, l=nodeList.length; i<l; i++) {
                            nodeList[i].highlight = highlight; //高亮显示搜索到的节点(highlight是自己设置的一个属性)
                            zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
                            zTree.updateNode(nodeList[i]); //更新节点数据，主要用于该节点显示属性的更新
                        }
                    }
                    // $("#key").on("focus",function () {
                    //     var zTree = $.fn.zTree.getZTreeObj("ztree");
                    //     var nodes = zTree.transformToArray(zTree.getNodes());
                    //     for(var i=0;i<nodes.length;i++){
                    //         if(nodes[i].level == 0){
                    //             // console.log(nodes[i].name);
                    //             //根节点展开
                    //             zTree.expandNode(nodes[i],true,true,false)
                    //         }else{
                    //             zTree.expandNode(nodes[i],false,true,false)
                    //         }
                    //     }
                    // });
                    //鼠标移入节点事件   节点显示自定义图标 也就是那个添加和删除的图标
                    function addHoverDom(treeId, treeNode) {
                        // console.log(treeId, treeNode,treeNode.getParentNode().name,treeNode.name)
                        var Pname ="";
                        var PreName ="";
                        if(treeNode.getParentNode()){
                            Pname = treeNode.getParentNode().name;//当前点击节点的父节点的名称
                            PreName = treeNode.getParentNode().name //新增页面默认显示的上级组织名称
                        }else {
                            PreName = treeNode.name //新增页面默认显示的上级组织名称
                        }
                        var Cname = treeNode.name;//当前点击节点的名称
                        var CpOrgType = 1;
                        //鼠标移入 显示 添加和 删除按钮
                        if (treeNode.parentNode && treeNode.parentNode.id!=1) return;
                        var aObj = $("#" + treeNode.tId + IDMark_A);
                        if ($("#diyBtn_"+treeNode.id).length>0) return;
                        var editStr = "<span id='diyBtn_space_" +treeNode.id+ "' ></span><span class='button icon03' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'></span><span class='button icon04' id='diy1Btn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'></span>";
                        aObj.append(editStr);
                        var btn = $("#diyBtn_"+treeNode.id);//添加按钮
                        var btn1 = $("#diy1Btn_"+treeNode.id);//删除按钮
                        //鼠标移入 显示 添加和 删除按钮结束

                        //添加组织按钮图标
                        if (btn) btn.bind("click", function(){
                            var zTree = $.fn.zTree.getZTreeObj("ztree");
                            var nodes = zTree.getNodes()[0];
                            var rootId = nodes.id;
                            var addOrganization='';
                            var pid = treeNode.pId;
                            var orgId = treeNode.id;
                            var orgType = treeNode.orgType;
                            var orgStatus = 1;
                            // 弹窗 新增组织
                            var winContent =`<div class="cpBox" style="display:none;">
                                    <div class='radio'>
                                    <div id="addCpT"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("addSameLvOrg")}</div> 
                                    <div id="addCpX"><img src='/images/setting/rect.png' alt=''>${$.getI18n("addSubLvOrg")}</div>
                                    </div>
                                    <div class="nexRdio">
                                    <div id="addCpB"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("department")}</div> 
                                    <div id="addCpC"><img src='/images/setting/rect.png' alt=''>${$.getI18n("company")}</div>
                                    </div>
                                </div>
                                <div class="dpBox" style="display: none">
                                    <div class='radio'>
                                        <div id="addBT"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("addSameLvDep")}</div> 
                                        <div id="addBX"><img src='/images/setting/rect.png' alt=''>${$.getI18n("addSubLvDep")}</div>
                                    </div>
                                </div>
                                <div class="rootNode" style="display: none">
                                    <div class='radio'>
                                        <div id="addRootBX"><img src='/images/setting/rect1.png' alt=''>${$.getI18n("addSubLvDep")}</div> 
                                        <div id="addRootCX"><img src='/images/setting/rect.png' alt=''>${$.getI18n("addSubLvCom")}</div>
                                    </div>
                                </div>
                                    `;
                            addOrganization = App.dialog({
                                id: "changeWin" ,
                                title:$.getI18n("selectionOfTissueTypes"),
                                width: 400,
                                height: 160,
                                maxWidth: document.documentElement.clientWidth - 40,
                                maxHeight: document.documentElement.clientHeight - 42,
                                appendTo: 'body',
                                backdrop: false,
                                modal: true,
                                keyboard: true,
                                content: winContent,
                                openEvent:function () {
                                    CpOrgType =1;
                                    if(rootId == orgId){
                                        $(".rootNode").show();
                                        pid = rootId
                                    }else {
                                        if(orgType == "0"){
                                            $(".cpBox").show()
                                        }else {
                                            $(".dpBox").show()
                                        }
                                    }
                                },
                                closeEvent: function () {
                                },
                                isdrag: true,
                                buttons: [{text:$.getI18n("sure"),type:'imgNoBtn',clickToClose :true,click:fn}]
                            });
                            //弹窗新增组织信息页面
                            function fn () {
                                var newOrganization="";
                                // 弹窗
                                var winContent = "<form id='addOrgForm'><div class='orEdit' id='addCP' style='display: none'>" +
                                    "<p><span class='messName'>"+$.getI18n('preOrg')+"</span><b style='margin-right: 8px'>:</b><input id='preOrg' value='"+PreName+"' disabled='true' type='text'></p>"+
                                    " <p><span class='messName'><span>*</span>"+$.getI18n('orgNames')+"</span><b style='margin-right: 8px'>:</b><input id='orgName' class='addOrgName' type='text'name='1' required/></p>"+
                                    "<p><span class='messName'><span>*</span>"+$.getI18n('administratorAccount')+"</span><b style='margin-right: 8px'>:</b><input id='loginId'  class='checkAddRepeatLoginId'type='text' name='2' required/></p>"+
                                    "<p><span class='messName'><span>*</span>"+$.getI18n('setPassWord')+"</span><b style='margin-right: 8px'>:</b><input id='password' type='password' class='passwordCheck' name='3' required/></p>"+
                                    "<p><span class='messName'><span>*</span>"+$.getI18n('confirmPwd')+"</span><b style='margin-right: 8px'>:</b><input id='rqpassword' type='password' class='eqPassword' name='4' required/></p>"+
                                    "<p><span class='messName'>"+$.getI18n('email')+"</span><b style='margin-right: 8px'>:</b><input  id='email' type='email' class='checkAddRepeatEmail' name='5'></p>"+
                                    "<p class='phoneNum'><span class='messName'>"+$.getI18n('userTel')+"</span><b style='margin-right: 8px'>:</b><input id='userTel' class='checkAddRepeatTel mobile' type='text'/></p>"+
                                    "<p><span class='messName'>"+$.getI18n('orgStatus')+"</span><b style='margin-right: 8px'>:</b><span class='orImg'><img class='addIsOpen'  src='images/setting/enabled.png'></span></p>"+
                                    "</div>" +
                                    "<div class='orEdit'id='addBM' style='display: none'>" +
                                    "<p><span class='messName'>"+$.getI18n('preOrg')+"</span><b style='margin-right: 8px'>:</b><input id='preOrg' value='"+PreName+"' disabled='true' type='text'></p>"+
                                    " <p><span class='messName'><span>*</span>"+$.getI18n('orgNames')+"</span><b style='margin-right: 8px'>:</b><input id='BorgName' type='text' required/></p>"+
                                    "<p><span class='messName'>"+$.getI18n('orgStatus')+"</span><b style='margin-right: 8px'>:</b><span class='orImg'><img class='addIsOpen'  src='images/setting/enabled.png'></span></p>"+
                                    "</div>";
                                "</form>";
                                newOrganization = App.dialog({
                                    title: $.getI18n('addOrgInfo'),
                                    width: 570,
                                    height: 466,
                                    maxWidth: document.documentElement.clientWidth - 40,
                                    maxHeight: document.documentElement.clientHeight - 42,
                                    appendTo: 'body',
                                    backdrop: false,
                                    modal: true,
                                    keyboard: true,
                                    content: winContent,
                                    openEvent:function () {
                                        if(CpOrgType=="0"){
                                            $("#addCP").show()
                                        }else {
                                            $("#addBM").show()
                                        }
                                        $("#addOrgForm").validate();
                                        App.initValidate()
                                    },
                                    closeEvent: function () {
                                    },
                                    isdrag: true,
                                    buttons: [{text:`${$.getI18n('cancel')}`,type:'addCancel',clickToClose :true,},{text:`${$.getI18n('save')}`,type:'addSave',id:"qrAddOrg",clickToClose :true,}]
                                });
                                //新增组织
                                $(".addIsOpen").on("click",function () {
                                    if($(this).attr("src") == "images/setting/enabled.png"){
                                        orgStatus = 0;
                                        $(this).attr("src","images/setting/notenabled.png")
                                    }else {
                                        $(this).attr("src","images/setting/enabled.png");
                                        orgStatus = 1
                                    }
                                });
                                //保存新增组织
                                $("#qrAddOrg").on("click",function () {
                                    if(!$('#addOrgForm').valid()) return false;
                                    var email = $("#email").val();
                                    var orgName = $("#orgName").val()+$("#BorgName").val();
                                    var loginId = $("#loginId").val();
                                    var password = hex_md5($("#password").val());
                                    var userTel = $("#userTel").val();
                                    $.http.POST('/org/addOrgInfoByUser.do',{
                                        tokenId:Cookies.getCook('tokenId'),
                                        orgType:CpOrgType,
                                        orgId:orgId,
                                        orgName:orgName,
                                        email:email,
                                        loginId:loginId,
                                        password:password,
                                        pid:pid,
                                        userTel:userTel,
                                        orgStatus:orgStatus},function(result){
                                        // console.log(_this)
                                        _this.ztreeShow(_this);
                                        App.warningDialog(result.body);
                                        CpOrgType = 1
                                    })
                                });
                                function addOrg () {
                                    // console.log($(".addOrgName"),$(".BorgName").val())

                                }
                            }
                            //新增组织时 模拟单选按钮 切换图片
                            $(".radio").find("div").unbind().on("click",function(){
                                $(".radio").find("div").find("img").attr("src",'/images/setting/rect.png');
                                $(this).find("img").attr("src",'/images/setting/rect1.png')
                            });
                            $(".nexRdio").find("div").unbind().on("click",function(){
                                $(".nexRdio").find("div").find("img").attr("src",'/images/setting/rect.png');
                                $(this).find("img").attr("src",'/images/setting/rect1.png')
                            });
                            //根据点击新增哪一级组织 更改当前父节点Id
                            //节点为公司时
                            $(".radio").find("div").eq(0).on("click",function () {
                                pid = treeNode.pId;
                                PreName = Pname
                            });
                            $(".radio").find("div").eq(1).on("click",function () {
                                pid = treeNode.id;
                                PreName = Cname
                            });
                            $("#addCpC").on("click",function () {
                                CpOrgType = 0
                            });
                            $("#addCpB").on("click",function () {
                                CpOrgType = 1

                            });
                            //节点为部门时
                            $("#addBT").on("click",function () {
                                pid = treeNode.pId;
                                PreName = Pname
                            });
                            $("#addBX").on("click",function () {
                                pid = treeNode.id;
                                PreName = Cname
                            });
                            //根节点点击时
                            $("#addRootBX").on("click",function () {
                                CpOrgType = 1;
                                pid = rootId;
                                PreName = Cname
                            });
                            $("#addRootCX").on("click",function () {
                                CpOrgType = 0;
                                pid = rootId;
                                PreName = Cname
                            })

                        });
                        //删除组织按钮图标
                        if (btn1) btn1.bind("click", function(){
                            var deOrg='';
                            // 弹窗 删除组织
                            var winContent = "<p style='color: red;font-size: 18px'>你确定要删除吗？</p>";
                            deOrg = App.dialog({
                                id: "changeWin" ,
                                title: `${$.getI18n('delete')}`,
                                width: 400,
                                height: 90,
                                maxWidth: document.documentElement.clientWidth - 40,
                                maxHeight: document.documentElement.clientHeight - 42,
                                appendTo: 'body',
                                backdrop: false,
                                modal: true,
                                keyboard: true,
                                content: winContent,
                                openEvent:"",
                                closeEvent: null,
                                isdrag: true,
                                buttons: [{text:`${$.getI18n('confirm')}`,type:'imgNoBtn',clickToClose :true,click:deleteOrg}]
                            });
                            function deleteOrg(){
                                $.http.POST('/org/deleteOrgInfoByUser.do',
                                    {tokenId:Cookies.getCook('tokenId'),orgId:treeNode.id},function(result){
                                        _this.ztreeShow(_this);
                                        App.warningDialog(result.msg)
                                    })
                            }
                        });
                    }
                    //鼠标移出事件 节点自定义图标隐藏
                    function removeHoverDom(treeId, treeNode) {
                        $("#diyBtn_"+treeNode.id).unbind().remove();
                        $("#diy1Btn_"+treeNode.id).unbind().remove();
                        $("#diyBtn_space_" +treeNode.id).unbind().remove();
                        $("#diy1Btn_space_" +treeNode.id).unbind().remove();
                    }
                    //节点点击事件
                    var log, className = "dark";
                    function beforeClick(treeId, treeNode, clickFlag) {
                        // console.log(treeNode)
                        if(treeNode.orgType == "0"){
                            $("#modifyPassword").show()
                        }else{
                            $("#modifyPassword").hide()
                        }
                        _this.getZtree(_this,treeNode.id);
                        $(".orEdit").hide();
                        $(".orDetai").show()
                    }

                    App.warningDialog(result.msg)
                }
            })
    },
    //删除组织
    deleteOrg:function (id) {
        $.http.POST('/org/deleteOrgInfoByUser.do',
            {tokenId:Cookies.getCook('tokenId'),orgId:id},function(result){
                App.warningDialog(result.body)
            })
    },
    //刷新当前节点
    refreshNode:function () {
        // console.log(111111)
        /*根据 treeId 获取 zTree 对象*/
        var zTree = $.fn.zTree.getZTreeObj("ztree"),
            type = "refresh",
            silent = false,
            /*获取 zTree 当前被选中的节点数据集合*/
            nodes = zTree.getSelectedNodes();
        /*强行异步加载父节点的子节点。[setting.async.enable = true 时有效]*/
        zTree.reAsyncChildNodes(nodes[0], type, silent);
    },
};