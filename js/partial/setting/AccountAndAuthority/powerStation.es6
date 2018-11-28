/**
 * Created by SP0015 on 2018/1/11.
 */
define(function(){
    return PowerStationRender;
});
var PowerStationRender = {
    addDialog:'',//新增角色弹窗
    orgId:'',//全局变量切换组织时请求当前信息
    arr:[],
    Render: function () {
        var _this = this;
        this.getPlantAscription();
        this.ztreeShow(_this);
        //点击省份区域切换电站 下钻
        $("#regionDetail").unbind().on("click",".kidsArea",function (e) {
            // console.log($(this).unbind())
            $(this).unbind("click");
            $.http.POST('/plantInfo/plantAscription.do',
                {
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$(this).attr("_id"),
                    orgId:_this.orgId,
                    serviceType:"2",
                    type:2,
                }, function (result) {
                    $("#eachPowerStation").empty();
                    $("#regionDetail").empty();
                    //渲染地区中国。。。
                    $("#regionTitle").append($(`<span _id=${result.body.areaInfo.id}>/&nbsp;&nbsp;${result.body.areaInfo.name}</span>`));
                    //渲染地区，四川省。。。
                    var kidsArea =  result.body.kidsArea.map(function(item){
                        return `<span _id=${item.id} class="kidsArea">${item.name}</span>`
                    }).join("");
                    $("#regionDetail").append(kidsArea);
                    //渲染电站
                    var plantsInfo =  result.body.plantsInfo.map(function(item){
                        return ` <span _id=${item.id} _showType = ${item.showType}>
                <img _id=${item.id} class="checkImg" _showType = ${item.showType} src="" alt="">
                    ${item.name}
            </span>`
                    }).join("");
                    $("#eachPowerStation").append(plantsInfo);
                    $(".checkImg").each(function (item) {
                        if($(this).attr("_showtype")==0){
                            $(this).attr("src","images/repImages/rect.png")
                        }else if($(this).attr("_showtype")==1){
                            $(this).attr("src","images/repImages/rect2.png")
                        }else {
                            $(this).attr("src","images/repImages/rect1.png")
                        }
                    })
                    // flag = true
                })
        });
        //点击上钻
        $("#regionTitle").unbind().on("click","span",function () {
            var $this = $(this);
            $.http.POST('/plantInfo/plantAscription.do',
                {
                    tokenId:Cookies.getCook('tokenId'),
                    areaId:$(this).attr("_id"),
                    orgId:_this.orgId,
                    serviceType:"2",
                    type:2,
                }, function (result) {
                    $("#eachPowerStation").empty();
                    $("#regionDetail").empty();
                    //渲染地区中国。。。
                    // $("#regionTitle").append($(`<span _id=${result.body.areaInfo.id}>/&nbsp;&nbsp;${result.body.areaInfo.name}</span>`))
                    $this.nextAll().remove();
                    //渲染地区，四川省。。。
                    var kidsArea =  result.body.kidsArea.map(function(item){
                        return `<span _id=${item.id} class="kidsArea">${item.name}</span>`
                    }).join("");
                    $("#regionDetail").append(kidsArea);
                    //渲染电站
                    var plantsInfo =  result.body.plantsInfo.map(function(item){
                        return ` <span _id=${item.id} _showType = ${item.showType}>
                    <img _id=${item.id} class="checkImg" _showType = ${item.showType} src="" alt="">
                        ${item.name}
                </span>`
                    }).join("");
                    $("#eachPowerStation").append(plantsInfo);
                    $(".checkImg").each(function (item) {
                        if($(this).attr("_showtype")==0){
                            $(this).attr("src","images/repImages/rect.png")
                        }else if($(this).attr("_showtype")==1){
                            $(this).attr("src","images/repImages/rect2.png")
                        }else {
                            $(this).attr("src","images/repImages/rect1.png")
                        }
                    })
                })
        });
        //点击全选
        $("#checkAll").unbind().on("click",function () {
            $(".checkImg").each(function () {
                if($(this).attr("_showType")== "0" ||$(this).attr("_showType")== "2"){
                    $(this).attr("src","images/repImages/rect1.png")
                }
            })
        });
        //点击反选
        $("#checkReverse").unbind().on("click",function () {
            var $this = $(this);
            $(".checkImg").each(function () {
                if($(this).attr("_showType")== "0" ||$(this).attr("_showType")== "2"){
                    if($(this).attr("src") =="images/repImages/rect1.png"){
                        $(this).attr("src","images/repImages/rect.png")
                    }else {
                        $(this).attr("src","images/repImages/rect1.png")
                    }

                }
            })
        });
        //点击每个切换是否选中
        $("#eachPowerStation").unbind().on("click",".checkImg",function () {
            var $this = $(this);
            $("#checkAll").attr("src","images/repImages/rect.png");
            $("#checkReverse").attr("src","images/repImages/rect.png");
            if($this.attr("_showType")!=1){
                if($(this).attr("src")=="images/repImages/rect.png"){
                    $(this).attr("src","images/repImages/rect1.png")
                }else {
                    $(this).attr("src","images/repImages/rect.png")
                }
            }
        });
        //清空选择
        $("#clearCheck").on("click",function () {
            $(".checkImg").each(function () {
                if($(this).attr("_showType")== "0" ||$(this).attr("_showType")== "2"){
                        $(this).attr("src","images/repImages/rect.png")
                }
            })
        });
        //点击保存
        $("#checkSave").unbind().on("click",function () {
            $(".checkImg").each(function () {
                if($(this).attr("src")=="images/repImages/rect1.png"){
                    _this.arr.push($(this).attr("_id"))
                }
            });
            $.http.POST('/plantInfo/insertPlantAscription.do',
                {
                    tokenId:Cookies.getCook('tokenId'),
                    orgId:_this.orgId,
                    plantId:_this.arr.join(",")
                }, function (result) {
                    _this.arr.length = 0;
                    App.warningDialog(result.body)
                    _this.getPlantAscription("",_this.orgId,2)
                })
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
            // _this.addOrgId = treeNode.id//树节点改变 新增用户传的orgId也要改变
            // _this.preOrgName = treeNode.name//树节点改变 新增用户传的上级组织名称也要改变
            // console.log(treeNode)
            _this.orgId = treeNode.id;
            _this.getPlantAscription("",treeNode.id,2)
            // _this.getRoleByOrgId(_this,_this.roleId)
            // _this.getRoleByOrgId(treeNode.id)
        }
        $.fn.zTree.init($("#ztree"), setting, treeNode);
    },
    getZtree:function (id) {
        var that = this;
        $.http.POST('/org/getOrgInfo.do',{tokenId:Cookies.getCook('tokenId'),orgId:id},function(result){
        })
    },
    getPlantAscription:function (areaId,orgId,type) {
        $.http.POST('/plantInfo/plantAscription.do',
            {
                tokenId:Cookies.getCook('tokenId'),
                areaId:areaId,
                orgId:orgId,
                serviceType:"2",
                type:type,
            }, function (result) {
                // console.log(result)
                if(!result.body.kidsArea){
                    $(".chooseRegionBox").empty();
                    $(".modifyJurisdictionBox").html("<img src = '/images/NaN.png'>")
                }
                //渲染地区中国。。。
                $("#regionTitle").children("span").remove();
                $("#regionDetail").empty();
                $("#eachPowerStation").empty();
            $("#regionTitle").append($(`<span _id=${result.body.areaInfo.id}>${result.body.areaInfo.name}</span>`));
                    //渲染地区，四川省。。。
                var kidsArea =  result.body.kidsArea.map(function(item){
                    return `<span _id=${item.id} class="kidsArea">${item.name}</span>`
                }).join("");
                $("#regionDetail").append(kidsArea);
                //渲染电站
                var plantsInfo =  result.body.plantsInfo.map(function(item){
                    return ` <span _id=${item.id} _showType = ${item.showType}>
                    <img _id=${item.id} class="checkImg" _showType = ${item.showType} src="" alt="">
                        ${item.name}
                </span>`
                }).join("");
                $("#eachPowerStation").append(plantsInfo);
                $(".checkImg").each(function (item) {
                    if($(this).attr("_showtype")==0){
                        $(this).attr("src","images/repImages/rect.png")
                    }else if($(this).attr("_showtype")==1){
                        $(this).attr("src","images/repImages/rect2.png")
                    }else {
                        $(this).attr("src","images/repImages/rect1.png")
                    }
                })
        })

    }
};