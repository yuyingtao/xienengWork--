define(function(){
    return OtherReder;
});
var OtherReder = {
    orgId:"",
    plantAutomaticCalculation:"",
    Render: function () {
        //    Todo Main function
        var _this = this;
        this.ztreeShow(_this);
        //点击编辑按钮跳转
        $("#edit").on("click",function(){
            $(".showBox").hide();
            $(".editBox1").show()
        });
        //点击取消按钮跳转回来
        $("#cancel").on("click",function () {
            _this.getSystemInfo(_this)
        });
        //点击上面空白处 选择单位框消失
        $(".commentBox").on("click",function () {
            $(".chooseTricity").removeClass("showType").addClass("hideType");
            $(".imgShaw").removeClass("showType").addClass("hideType");
            $(".showChoose").attr("style","transform: rotate(180deg)")
        });
        //点击显示隐藏选择单位
        $(".showChoose").on("click",function (event) {
            event.stopPropagation();
            if(_this.plantAutomaticCalculation ==0){
                if($(".chooseTricity").hasClass("hideType")){
                    $(".chooseTricity").removeClass("hideType").addClass("showType");
                    $(".imgShaw").removeClass("hideType").addClass("showType");
                    $(this).attr("style","transform: rotate(180deg)")
                }else {
                    $(".chooseTricity").removeClass("showType").addClass("hideType");
                    $(".imgShaw").removeClass("showType").addClass("hideType");
                    $(this).attr("style","transform: rotate(0deg)")
                }
            }
            // $(this).attr("style","transform: rotate(180deg)")
        });
        //点击切换单位
        $(".chooseCompany").on("click",function () {
            $(".chooseCompany").each(function () {
                $(this).attr("src","/images/repImages/rect.png")
            });
            if($(this).attr("src")=="/images/repImages/rect.png"){
                $(this).attr("src","/images/repImages/rect1.png");
                $(".eidtCompany").html($(this).next("span").html())
            }
        });
        //切换是否自动计算
        $(".autoCalculationBtn").on("click",function () {
            $(".chooseTricity").removeClass("showType").addClass("hideType");
            $(".imgShaw").removeClass("showType").addClass("hideType");
            $(".showChoose").attr("style","transform: rotate(180deg)");
            if(_this.plantAutomaticCalculation == 0){
                $(this).attr("src","/images/setting/rect1.png");
                $(".editElectricity").attr("disabled","disabled");
                _this.plantAutomaticCalculation = 1;
                _this.getAuto(_this)
            }else {
                $(this).attr("src","/images/setting/rect.png");
                $(".editElectricity").removeAttr("disabled");
                _this.plantAutomaticCalculation = 0
            }
        });
        //点击保存
        $("#save").on("click",function () {
            App.initValidate();
            $('#numForm').validate();
            if(!$('#numForm').valid()) return false;
            var flag1 = false,flag2 = false
            $(".roleInput").each(function () {
                var parents = $(this).parents(".showTex")
                if($(this).val()){
                    if(!parents.next(".showTex").find("input").val()){
                        App.alert("请输入"+parents.find("p").text()+"的人数")
                        flag1 = false
                        return false
                    }else {
                        flag1 = true
                    }
                }
            })
            $(".numInput").each(function () {
                var parents = $(this).parents(".showTex")
                if($(this).val()){
                    if(!parents.prev(".showTex").find("input").val()){
                        App.alert("请输入"+parents.prev(".showTex").find("p").text()+"的名称")
                        flag2 = false
                        return false
                    }else {
                        flag2 = true
                    }
                }
            })
            if(flag1&&flag2){
                $.http.POST('/system/updateSystemInfo.do',
                    {
                        tokenId:Cookies.getCook('tokenId'),
                        controlName:$(".editRole1").val(),
                        controlNum:$(".editRole1Num").val(),
                        businessName:$(".editRole2").val(),
                        businessNum:$(".editRole2Num").val(),
                        serviceName:$(".editRole3").val(),
                        serviceNum:$(".editRole3Num").val(),
                        roleName:$(".editRole4").val(),
                        roleNum:$(".editRole4Num").val(),
                        unit:$(".eidtCompany").html(),
                        plantArtificialCapacity:$(".editElectricity").val(),
                        plantAutomaticCalculation:_this.plantAutomaticCalculation,
                        orgId:_this.orgId
                    }, function (result) {
                        App.warningDialog(result.msg);
                        _this.getSystemInfo(_this)
                    })
            }
        })
    },
    ztreeShow:function (_this) {
        var treeNode;
        $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            _this.orgId = result.body[0].id;
            _this.getSystemInfo(_this);
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
            _this.orgId = treeNode.id;
            _this.getSystemInfo(_this);
            $(".showBox").show();
            $(".editBox1").hide()
        }
        $.fn.zTree.init($("#ztree"), setting, treeNode);
    },

    fileUpLoad:function (_this,upBtn,imgShowBox) {

        var ipt = document.getElementById(upBtn);
        var imgCont = document.getElementById(imgShowBox);
        var file = _this.files[0];
        var size = Math.round(file.size / 1024 / 1024);
        if (size > 1) {
            alert("图片过大");
            return
        }
        if (!/image\/\w+/.test(file.type)) { //html中已经用accept='image/*'限制上传的是图片了，此处判断可省略
            alert("文件必须为图片！");
            return false;
        }
        if (!FileReader) {
            alert("你的浏览器不支持H5的FileReader");
            ipt.setAttribute("disabled", "disabled");//浏览器不支持禁用input type='file'文件上传标签
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);//将文件读取为Data URL 读取结果放在result中
        fileReader.onload = function (e) {
            // var img = '<img src="' + this.result + '"/>';
            imgCont.src = this.result;
        }
    },
    //获取其他设置页面信息
    getSystemInfo:function(_this){
        $.http.POST('/system/getSystemInfo.do',{tokenId:Cookies.getCook('tokenId'),orgId:_this.orgId}, function (result) {
            const{body} =result;
            //渲染显示页面
            !!body.plantArtificialCapacity?$(".showeElectricity").html(body.plantArtificialCapacity):$(".showeElectricity").html("--");
            !!body.unit?$(".showCompany").html(body.unit):$(".showCompany").html("--");
            !!body.controlName?$(".showRole1").html(body.controlName):$(".showRole1").html("--");
            !!body.controlNum?$(".showRole1Num").html(body.controlNum):$(".showRole1Num").html("--");
            !!body.businessName?$(".showRole2").html(body.businessName):$(".showRole2").html("--");
            !!body.businessNum?$(".showRole2Num").html(body.businessNum):$(".showRole2Num").html("--");
            !!body.serviceName?$(".showRole3").html(body.serviceName):$(".showRole3").html("--");
            !!body.serviceNum?$(".showRole3Num").html(body.serviceNum):$(".showRole3Num").html("--");
            !!body.roleName?$(".showRole4").html(body.roleName):$(".showRole4").html("--");
            !!body.roleNum?$(".showRole4Num").html(body.roleNum):$(".showRole4Num").html("--");
            //渲染编辑页面
            $(".eidtCompany").html(body.unit);
            $(".editRole1").val(body.controlName);
            $(".editRole1Num").val(body.controlNum);
            $(".editRole2").val(body.businessName);
            $(".editRole2Num").val(body.businessNum);
            $(".editRole3").val(body.serviceName);
            $(".editRole3Num").val(body.serviceNum);
            $(".editRole4").val(body.roleName);
            $(".editRole4Num").val(body.roleNum);
            $(".editElectricity").val(body.plantArtificialCapacity);
            $(".eidtCompany").html(body.unit);
            _this.plantAutomaticCalculation = body.plantAutomaticCalculation;
            if(body.plantAutomaticCalculation ==1){
                $(".autoCalculationBtn").attr("src","/images/setting/rect1.png");
                $(".editElectricity").attr("disabled","disabled")
            }else {
                $(".autoCalculationBtn").attr("src","/images/setting/rect.png");
                $(".editElectricity").removeAttr("disabled");
            }
            $(".showBox").show();
            $(".editBox1").hide()
        })
    },
    getAuto:function (_this) {
        $.http.POST('/system/getAutomaticCalculation.do',{tokenId:Cookies.getCook('tokenId'),orgId:_this.orgId,automaticCalculation:_this.plantAutomaticCalculation}, function (result) {
            const {body} = result;
            $(".editElectricity").val(body.totalCapacity);
            $(".eidtCompany").html(body.unit)
        })
    }
};