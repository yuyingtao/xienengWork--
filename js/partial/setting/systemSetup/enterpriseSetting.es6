/**
 * Created by SP0015 on 2017/12/29.
 */
define(function(){
    return EnterpriseReder;
});
var EnterpriseReder = {
    orgId:"",//组织ID
    logoImgUrl:"",//系统图片地址
    logoImgUrl1:"",//系统图片地址比较用
    bigImgUrl:"",//大屏图片地址
    bigImgUrl1:"",//大屏图片地址
    companyImgUrl:'',//企业宣传图片地址
    companyImgUrl1:[],//企业宣传图片地址
    isComFather:"",//企业宣传图片是否来自father
    orgPhoto:"",//企业图片地址
    orgPhoto1:"",//企业图片地址
    timer:"",
    flag1:false,
    flag2:false,
    flag3:false,
    flag4:false,
    flag5:false,
    Render: function () {
        //    Todo Main function
        var _this = this;
        this.ztreeShow(_this);
        //点击编辑按钮跳转
        $("#edit").unbind().on("click",function(){
            $(".showBox").hide();
            $(".editBox").show()
        });
        //点击取消按钮跳转回来
        $("#cancel").unbind().on("click",function () {
            _this.getSystemBasic(_this,_this.orgId);
            $(".showBox").show();
            $(".editBox").hide()
        });
        //点击删除头像更改系统图像时
        $(".sysLogoCloseBtn").unbind().on("click",function (event) {
            event.stopPropagation();
            $("#sysLogoNewIcon").attr("src","images/setting/upload.png").attr("style","width:41px").attr("style","height:71px");
            $("#up_img").val("");
            $(this).hide()
        });
        //更改系统图片时预览
        $(".sysLogImgBox").unbind().on("change","input[type =file]",function () {
            var that = this;
            _this.fileUpLoad(that,"up_img","sysLogoNewIcon");
            // $(".sysLogoCloseBtn").show()
        });
        //点击删除头像更改大屏图像时
        $(".BigLOGOCloseBtn").unbind().on("click",function (event) {
            event.stopPropagation();
            $("#BigLOGONewIcon").attr("src","images/setting/upload.png").attr("style","width:41px").attr("style","height:71px");
            $("#bigup_img").val("");
            $(this).hide()
        });
        //更改大屏图片时预览
        $(".BigLOGOImgBox").unbind().on("change","input[type =file]",function () {
            var that = this;
            _this.fileUpLoad(that,"bigup_img","BigLOGONewIcon");
            $("#BigLOGONewIcon").css("width:100%;height:auto");
            // $(".BigLOGOCloseBtn").show()
        });
        //点击删除更改企业图片时
        $(".companyLogoCloseBtn").unbind().on("click",function (event) {
            event.stopPropagation();
            $("#companyLogoNewIcon").attr("src","images/setting/upload1.png");
            $("#companyup_img").val("");
            $(this).hide()
        });
        //更改企业图片时预览
        $(".companyLogoImgBox").unbind().on("change","input[type =file]",function () {
            var that = this;
            _this.fileUpLoad(that,"companyup_img","companyLogoNewIcon");
            // $(".companyLogoCloseBtn").show()
        });
        //企业宣传点击X删除图片
        $(".enterUpClose").unbind().on("click",function () {
            // console.log($(this))
            $(this).parent().find(".enterShow").attr("src","/images/setting/upload2.png");
            $(this).parent().find("input").val("");
            $(this).hide()
        });
        //企业宣传预览图片
        $("#enterUp1").unbind().on("change",function () {
            var that = this;
            _this.fileUpLoad(that,"enterUp1","enterShow1");
            // $(this).siblings(".enterUpClose").show()
        });
        $("#enterUp2").unbind().on("change",function () {
            var that = this;
            _this.fileUpLoad(that,"enterUp2","enterShow2");
            // $(this).siblings(".enterUpClose").show()
        });
        $("#enterUp3").unbind().on("change",function () {
            var that = this;
            _this.fileUpLoad(that,"enterUp3","enterShow3");
            // $(this).siblings(".enterUpClose").show()
        });
        //点击保存
        $("#save").unbind().on("click",function () {
            _this.uploadLogoImg(_this,["#up_img"]);
            _this.uploadBigImg(_this,["#bigup_img"]);
            _this.updateOrgPhoto(_this,["#companyup_img"]);
            _this.updateSystemBasic(_this);
            if(_this.companyImgUrl[0]){
                if($("#enterShow1").attr("src")!=_this.companyImgUrl[0]){
                    _this.companyImgUrl1.push(_this.companyImgUrl[0])
                }
            }if(_this.companyImgUrl[1]){
                if($("#enterShow2").attr("src")!=_this.companyImgUrl[1]){
                    _this.companyImgUrl1.push(_this.companyImgUrl[1])
                }
            }
            if(_this.companyImgUrl[2]){
                if($("#enterShow1").attr("src")!=_this.companyImgUrl[2]){
                    _this.companyImgUrl1.push(_this.companyImgUrl[2])
                }
            }
            if(_this.isComFather == true){
                _this.companyImgUrl = "";
                _this.updatePropagandaPhoto(["#enterUp1","#enterUp2","#enterUp3"],_this)
            }else {
                if(!_this.companyImgUrl1.length){
                    _this.companyImgUrl = "";
                    _this.updatePropagandaPhoto(["#enterUp1","#enterUp2","#enterUp3"],_this)
                }else {
                    _this.companyImgUrl = _this.companyImgUrl1.join(";");
                    _this.updatePropagandaPhoto(["#enterUp1","#enterUp2","#enterUp3"],_this)
                }
            }
            _this.timer = setInterval(function () {
                if(_this.flag1&&_this.flag2&&_this.flag3&&_this.flag4&&_this.flag5){
                    App.warningDialog("修改成功");
                    _this.getSystemBasic(_this,_this.orgId)
                }else{
                    App.warningDialog("修改失败",1);
                }
            },1000)
        })
    },
    ztreeShow:function (_this) {
        var treeNode;
        $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            _this.orgId = result.body[0].id;
            $.fn.zTree.init($("#ztree"), setting, treeNode);
            _this.getSystemBasic(_this,result.body[0].id);
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
            _this.orgId = treeNode.id;
            _this.getSystemBasic(_this,_this.orgId)
            // $(".showBox").show()
            // $(".editBox").hide()

        }
        $.fn.zTree.init($("#ztree"), setting, treeNode);
    },
    //预览图片
    fileUpLoad:function (_this,upBtn,imgShowBox) {

        var ipt = document.getElementById(upBtn);
        var imgCont = document.getElementById(imgShowBox);
        var file = _this.files[0];
        var size = Math.round(file.size / 1024 / 1024);
        if (size > 1) {
            var picVal = '#'+upBtn;
            $(picVal).val('')
            App.alert("图片过大");
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
            var showClose = '#'+imgShowBox
            if($(showClose).attr('src')!='/images/setting/upload2.png' && $(showClose).attr('src')!='/images/setting/upload.png' && $(showClose).attr('src')!='/images/setting/upload1.png'){
                $(showClose).siblings('img').show()
            }
        }
    },
    //获取企业信息
    getSystemBasic:function (_this,orgId) {
        $.http.POST('/system/getSystemBasic.do',{tokenId:Cookies.getCook('tokenId'),orgId:orgId}, function (result) {
            //渲染显示页面
            // console.log(result)
            clearInterval(_this.timer);
            _this.flag1 = false;
            _this.flag2 = false;
            _this.flag3 = false;
            _this.flag4 = false;
            _this.flag5 = false;
            //系统名称
            if(!result.body.systemName){
                $("#showSysName").html("--")
            }else {
                $("#showSysName").html(result.body.systemName)
            }
            //系统图片
            if(!result.body.systemLogo){
                $("#showSysLogo").attr("src","/images/setting/systemSetup/cpLog.png")
            }else {
                $("#showSysLogo").attr("src",result.body.systemLogo)
            }
            //大屏图片
            if(!result.body.screenLogo){
                $("#showBigLOGOImg").attr("src","/images/setting/systemSetup/hasbeenconnected.png")
            }else {
                $("#showBigLOGOImg").attr("src",result.body.screenLogo)
            }
            //大屏名称
            if(!result.body.screenName){
                $(".BigName p").html("--")
            }else {
                $(".BigName p").html(result.body.screenName)
            }
            //企业简介
            if(!result.body.orgDesc){
                $(".enterpriseIntroduction p").html("分布式光伏发电特指在用户场地附近建设，运行方式以用户侧自发自用、多余电量上网，且在配电系统平衡调节为特征的光伏发电设施")
            }else {
                $(".enterpriseIntroduction p").html(result.body.orgDesc)
            }
            //企业图片
            if(!result.body.orgPhoto){
                $("#showCompanyLogo").attr("src","/images/setting/systemSetup/cpLog.png")
            }else {
                $("#showCompanyLogo").attr("src",result.body.orgPhoto)
            }
            //企业宣传图片
            if(result.body.propagandaPhoto.length){
                result.body.propagandaPhoto.map(function (item,index) {
                    $(".enterpriseImgs p").find("img").eq(index).attr("src",item)
                })
            }
            //渲染编辑页面
            //系统名称
            if(!result.body.systemName){
                $("#newSysName").html("--")
            }else {
                $("#newSysName").html(result.body.systemName)
            }
            //系统图片
            if(!result.body.systemLogo){
                $("#sysLogoNewIcon").attr("src","/images/setting/systemSetup/cpLog.png")
            }else {
                $("#sysLogoNewIcon").attr("src",result.body.systemLogo)
            }
            //大屏图片
            if(!result.body.screenLogo){
                $("#BigLOGONewIcon").attr("src","/images/setting/systemSetup/hasbeenconnected.png")
            }else {
                $("#BigLOGONewIcon").attr("src",result.body.screenLogo)
            }
            _this.logoImgUrl1 = result.body.systemLogo;
            _this.bigImgUrl1 = result.body.screenLogo;
            _this.orgPhoto1 = result.body.orgPhoto;
            _this.companyImgUrl = result.body.propagandaPhoto;
            // console.log( _this.companyImgUrl)
            _this.isComFather = result.body.propagandaPhotoFather;

            if(result.body.screenLogoFather == true){
                _this.bigImgUrl = ""
            }else {
                _this.bigImgUrl = result.body.screenLogo
            }
            if(result.body.systemLogoFather == true){
                _this.logoImgUrl = ""
            }else {
                _this.logoImgUrl = result.body.systemLogo
            }
            if(result.body.orgPhotoFather == true){
                _this.orgPhoto = ""
            }else {
                _this.orgPhoto = result.body.orgPhotoFather
            }
            //大屏名称
            if(!result.body.screenName){
                $("#newBigScName").val("--")
            }else {
                $("#newBigScName").val(result.body.screenName)
            }
            //企业简介
            if(!result.body.orgDesc){
                $("#newDes").val("分布式光伏发电特指在用户场地附近建设，运行方式以用户侧自发自用、多余电量上网，且在配电系统平衡调节为特征的光伏发电设施")
            }else {
                $("#newDes").val(result.body.orgDesc)
            }
            //企业图片
            if(!result.body.orgPhoto){
                $("#companyLogoNewIcon").attr("src","/images/setting/systemSetup/cpLog.png")
            }else {
                $("#companyLogoNewIcon").attr("src",result.body.orgPhoto)
            }
            //企业宣传图片
            for(let i = 0;i<3;i++){
                if(result.body.propagandaPhoto[i]){
                    $(`#enterShow${i+1}`).attr("src",result.body.propagandaPhoto[i]);
                    $(`#enterShow${i+1}`).next(".enterUpClose").show()
                }else {
                    $(`#enterShow${i+1}`).attr("src","/images/setting/upload2.png");
                    $(`#enterShow${i+1}`).next(".enterUpClose").hide()
                }
            }
            $(".showBox").show();
            $(".editBox").hide();
        })
    },
    //系统logo上传
    uploadLogoImg:function(_this,ids){
       if ($("#sysLogoNewIcon").attr("src")==_this.logoImgUrl1){
           _this.flag1 = true;
           return false
       }
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        $.ajax({
            url:`/system/updateSystemLogo.do?imgUrl=${_this.logoImgUrl}&tokenId=${Cookies.getCook('tokenId')}&orgId=${_this.orgId}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){

            },complete:function () {
                var file = document.getElementById('up_img');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                _this.flag1 = true
            }
        });
    },
    //大屏logo上传
    uploadBigImg:function(_this,ids){
       if ($("#BigLOGONewIcon").attr("src")==_this.bigImgUrl1){
           _this.flag2 = true;
           return false
       }
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        $.ajax({
            url:`/system/updateScreenLogo.do?imgUrl=${_this.bigImgUrl}&tokenId=${Cookies.getCook('tokenId')}&orgId=${_this.orgId}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){

            },complete:function () {
                var file = document.getElementById('bigup_img');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                _this.flag2 = true
            }
        });
    },
    //修改企业信息
    updateSystemBasic:function (_this) {
        $.http.POST('/system/updateSystemBasic.do',
            {
                tokenId:Cookies.getCook('tokenId'),
                orgId:_this.orgId,
                systemName:$(".newSysName").val(),
                screenName:$("#newBigScName").val(),
                orgDesc:$("#newDes").val(),
            }, function (result) {
                // console.log(result)
                _this.flag3 = true
        })
    },
    //修改企业图片
    updateOrgPhoto:function (_this,ids) {
        if ($("#companyLogoNewIcon").attr("src")==_this.orgPhoto1){
            _this.flag4 = true;
            return false
        }
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        $.ajax({
            url:`/system/updateOrgPhoto.do?imgUrl=${_this.orgPhoto}&tokenId=${Cookies.getCook('tokenId')}&orgId=${_this.orgId}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){

            },complete:function () {
                var file = document.getElementById('companyup_img');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                _this.flag4 = true
            }
        });
    },
    //修改宣传图片
    updatePropagandaPhoto:function(ids,_this){
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        pic.push($(ids[1])[0].files[0]);
        pic.push($(ids[2])[0].files[0]);
        var fd = new FormData();
        !!pic[0] ? fd.append('file', pic[0]) : fd.append('file', '');
        !!pic[1] ? fd.append('file', pic[1]) : fd.append('file', '');
        !!pic[2] ? fd.append('file', pic[2]) : fd.append('file', '');
        // console.log(fd)
        $.ajax({
            url:`/system/updatePropagandaPhoto.do?imgUrl=${_this.companyImgUrl}&tokenId=${Cookies.getCook('tokenId')}&orgId=${_this.orgId}`,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                // _this.getSystemBasic(_this,_this.orgId)
            },complete:function () {
                var file1 = document.getElementById('enterUp1');
                file1.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                var file2 = document.getElementById('enterUp2');
                file2.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                var file3 = document.getElementById('enterUp3');
                file3.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                _this.flag5 = true
            }
        });
    }
};