/**
 * Created by SP0014 on 2018/1/10.
 * 设备库管理-逆变器
 */
define(function(){
    return cameraManage;
});
var cameraManage = {
    cameraTable:'', //摄像头表格
    pathUrl:'', //
    Render: function () {
        var that = this;
        that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')});
        //点击搜索按钮查询数据
        $('a.searchDevice').unbind().on('click',function(){
            var manufacturer = $('input[name="manufacturer"]').val();
            var model = $('input[name="model"]').val();
            var status = $('select[name="status"]').val();
            that.getData({manufacturer:manufacturer,model:model,status:status,tokenId:Cookies.getCook('tokenId')})
        });
        //点击导入
        $('a.importDevice').unbind().on('click',function(){
            var im = App.dialog({
                title: $.getI18n('import'),
                width: 400,
                height: 100,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.importTep() ,
                openEvent: function () {
                    //模板下载
                    $('#downTep').unbind().on('click',function(){
                        window.location = window.URLHREF+"/exports/cameraExcelTemplate.do";
                    });
                    //找出文件
                    $('#uploadFile').unbind().on('change',function(){
                        $('#pathText').text('');
                        $('#pathText').text($('#uploadFile').val().split("\\").pop());
                        var oFReader = new FileReader();
                        var file = document.getElementById('uploadFile').files[0];
                        oFReader.readAsDataURL(file);
                        oFReader.onloadend = function(oFRevent){
                            that.pathUrl = oFRevent.target.result
                        }
                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
            });
            //点击保存按钮 传递给后台
            $('#saveOwner').unbind().on('click',function(){
                var uploadFile = $('#uploadFile');
                that.uploadText([uploadFile])
            })

        });
        //点击导出
        $('a.exportDevice').unbind().on('click',function(){
            that.exportDevice()
        });
        $('a.addDevice').unbind().on('click',function(){
            that.addCamera()
        })
    },
    getData:function(obj){
        if(this.cameraTable){
            $('#cameraTable tbody').off('click');
            $('#cameraTable tbody').off('mouseenter');
            $('#cameraTable tbody').off('mouseleave');
            this.cameraTable.fnClearTable(false);
            this.cameraTable.fnDestroy()
        }
        var columns = [
            { data: "modelIdentity" ,title:$.getI18n('deviceModelIdentification'),width:'14%',render:function(data){
                return '<div class="td-noWrap-camera" title="'+data+'">'+data+'</div>'
            }},
            { data: "manufacturer",title:$.getI18n('manufacturer'),width:'7%'},
            { data: "cameraModel",title:$.getI18n('deviceModel'),width:'9%',render:function(data){
                return '<div class="td-noWrap-camera" title="'+data+'">'+data+'</div>'
            }},
            { data: "supportInfra" ,title:$.getI18n('supportInfra'),width:'10%',render:function(data){
                if(data=='0'){
                    return $.getI18n('support')
                }else{
                    return $.getI18n('nonsupport')
                }
            }},
            { data: "guardLevel",title:$.getI18n('guardLevel') ,width:'8%'},
            { data: "cameraResolution",title:$.getI18n('pixel'),width:'8%'},
            { data: "network" ,title:$.getI18n('network'),width:'9%'},
            { data: "maxResolution" ,title:$.getI18n('maxResolution'),width:'9%'},
            { data: "inStorage" ,title:$.getI18n('inStorage'),width:'9%'},
            { data: "cameraPhoto" ,title:$.getI18n('ass.photo'),width:'10%',render:function(data){
                if(data){
                    return '<div class="imgs"><image class="zoomImg" src="'+data+'" style="width: 64px;height:43px;"></image><img class="zoomIcon" src="/images/setting/deviceManage/Zoom.png"  alt=""><div class="bigImg"><a class="closeZoom">×</a><img src="/images/setting/deviceManage/inverter_big.png"  alt=""></div></div>'
                }else{
                    return '<div class="imgs" style="height: 40px"></div>'
                }
            }}
        ];
        if(!!window.systemRole['libCameraManageEdit'] && !!window.systemRole['libCameraManageSwitch']){
            columns.push(
                { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                    if(data==1){
                        return '<image src="/images/setting/enabled_1.png" class="statusImg"></image>'
                    }else{
                        return '<image src="/images/setting/notenabled_1.png" class="statusImg"></image>'
                    }
                }},
                {data:'id',"title":$.getI18n('operate'),width:'8%',render:function(data){
                    return '<a style="width: 50px;display: inline-block;background:rgba(48,166,250,.5);color: #fff;height: 26px;line-height: 26px;text-align: center;" class="modifyCamera" data-id="'+data+'">编辑</a>'
                }
                })
        }else if(!window.systemRole['libCameraManageEdit'] && !!window.systemRole['libCameraManageSwitch']){
            columns.push(
                { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                    if(data==1){
                        return '<image src="/images/setting/enabled_1.png" class="statusImg"></image>'
                    }else{
                        return '<image src="/images/setting/notenabled_1.png" class="statusImg"></image>'
                    }
                }}
            )
        }else if(!!window.systemRole['libCameraManageEdit'] && !window.systemRole['libCameraManageSwitch']){
            columns.push(
                { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                    if(data==1){
                        return '<span style="color:#29AD00">'+$.getI18n('enable')+'</span>'
                    }else{
                        return '<span>'+$.getI18n('noEnable')+'</span>'
                    }
                }},
                {data:'id',"title":$.getI18n('operate'),width:'8%',render:function(data){
                    return '<a style="width: 50px;display: inline-block;background:rgba(48,166,250,.5);color: #fff;height: 26px;line-height: 26px;text-align: center;" class="modifyCamera" data-id="'+data+'">编辑</a>'
                }
                })
        }else{
            columns.push(
                { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                    if(data==1){
                        return '<span style="color:#29AD00">'+$.getI18n('enable')+'</span>'
                    }else{
                        return '<span>'+$.getI18n('noEnable')+'</span>'
                    }
                }}
            )
        }
        this.cameraTable = $('#cameraTable').dataTable({
            ajax:{
                type:'POST',
                url:'/equipment/listCamera.do',
                //data:obj,
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                data:function(d){
                    //d.start = obj.start;
                    d.manufacturer=obj.manufacturer;
                    d.model = obj.model;
                    d.status = obj.status;
                    d.tokenId = obj.tokenId;
                    //d.draw = '';
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    //json.data = json.body.data
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
            columns: columns
        });
        //点击编辑按钮，执行编辑操作
        var that = this;
        $('#cameraTable tbody').on('click','td a.modifyCamera',function(e){
            var index = $(this).parent('td').parent('tr').index();
            var data = that.cameraTable.api(true).row( index).data();
            //alert($(this).data('id'))
            var inverter = App.dialog({
                title: $.getI18n('ass.camDetail'),
                width: 900,
                height: 480,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.cameraTep() ,
                openEvent: function () {
                    $('#cameraTep').setForm(data);
                    $('#cameraTep').validate();
                    App.initValidate();
                    if(data.cameraPhoto){
                        $('#updateImage').attr('src',data.cameraPhoto);
                        $('#closeImage').show()
                    }
                    //点击删除更换图片
                    $('#closeImage').unbind().on('click',function(){
                        $('#updateImage').attr('src','/images/setting/upload.png');
                        $('#updateImg').val('');
                        if($('#updateImage').attr('src')=='/images/setting/upload.png'){
                            $('#closeImage').hide()
                        }
                    });
                    //图片预览
                    $("input[type = file]").on("change",function () {
                        var _that = this;
                        // $('#closeImage').show();
                        that.fileUpLoad(_that,$(this).attr('id'),$(this).siblings('img').attr('id'))
                    })
                    // if(data.supportInfra==0){
                    //     $('input[name=supportInfra]').val('支持')
                    // }else{
                    //     $('input[name=supportInfra]').val('不支持')
                    // }
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
            });
            //获取更改的值并刷新列表
            $('#saveOwner').unbind().on('click',function(){
                var upData =  $('#cameraTep').getForm();
                var updateImg = $('#updateImg');
                //判断是否修改了图片
                var photoUrl = $('#updateImage').attr('src');
                upData.id = data.id;
                upData.tokenId = Cookies.getCook('tokenId');
                // if(upData.supportInfra=='支持'){
                //     upData.supportInfra=1
                // }else{
                //     upData.supportInfra=0
                // }
                if(!$('#cameraTep').valid()) return false;
                $.http.POST('/equipment/updateCambasic.do',upData,function(res){
                    if(data.cameraPhoto){
                        if(data.cameraPhoto!=photoUrl){
                            that.uploadSingleImg(data.cameraPhoto,[updateImg],data.id)
                        }else{
                            App.warningDialog(res.msg);
                            that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                        }
                    }else{
                        if(photoUrl!='/images/setting/upload.png'){
                            that.uploadSingleImg(data.cameraPhoto,[updateImg],data.id)
                        }else{
                            App.warningDialog(res.msg);
                            that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                        }
                    }
                })
            });
            e.stopPropagation()
        });
        // //状态操作
        $('#cameraTable tbody').on('click','td img.statusImg',function(){
            //console.log($(this).parent('td').parent('tr').index())
            var index = $(this).parent('td').parent('tr').index();
            //console.log(that.inverterTable.api(true).row( index).data())
            var deviceId = that.cameraTable.api(true).row( index).data().id;
            var status;
            if($(this).attr('src')=='/images/setting/enabled_1.png'){
                $(this).attr('src','/images/setting/notenabled_1.png');
                status=0
            }else{
                $(this).attr('src','/images/setting/enabled_1.png');
                status=1
            }
            //更新状态
            $.http.POST('/equipment/updateCameraStatus.do',{status:status,deviceId:deviceId,tokenId:Cookies.getCook('tokenId')},function(res){
                App.warningDialog(res.msg)
            })
        });
        //放大镜效果
        $('#cameraTable tbody').on('mouseenter','td .zoomIcon',function(){
            $('.closeZoom').click();
            var img = $(this).siblings('.zoomImg').attr('src');
            $(this).siblings('.bigImg').find('img').attr('src',img);
            $(this).siblings('.bigImg').show();
            //$(this).siblings('.bigImg').fadeIn()
            //关闭放大镜的大图
            $('.closeZoom').unbind('click').on('click',function(){
                $(this).parent('.bigImg').hide()
            })
        }).on('mouseleave',function(){
            $('.closeZoom').click()
        });
        //没有图片也执行关闭操作
        $('#cameraTable tbody').on('mouseenter','td div.imgs',function(){
            $('.closeZoom').click()
        }).on('mouseleave',function(){
            $('.closeZoom').click()
        })
    },
    cameraTep:function(){
        var cameraTep  = '<form id="cameraTep">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('ass.devModelIdent') +'：'+
            '</label>'+
            '<input name="modelIdentity" required id="modelIdentity" />'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('ass.manufacturer') +'：'+
            '</label>'+
            '<input name="manufacturer" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('supportInfra') +'：'+
            '</label>'+
            // '<input name="supportInfra"/>'+
            '<select name="supportInfra">' +
            '<option value="0">'+$.getI18n('support')+'</option>'+
            '<option value="1">'+$.getI18n('nonsupport')+'</option>'+
            '</select>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('pixel') +'(w)：'+
            '</label>'+
            '<input name="cameraResolution"  class=" checkNumber"/>'+
            // '<i>&nbsp;&nbsp;w</i>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('maxResolution') +'：'+
            '</label>'+
            '<input name="maxResolution"/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('devImg') +'：'+
            '</label>'+
            '<span style="color: #FF0E26;width: 280px;display: inline-block;margin-right: 30px;text-align: left;height: 34px;line-height: 34px">'+$.getI18n('suggestImg')+'</span>'+
            '<div class="uploadImgBox"><image id="updateImage" src="/images/setting/upload.png"></image>\n'+
            '<img id="closeImage" src="/images/setting/close.png" style="display: none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "updateImg" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('deviceType') +'：'+
            '</label>'+
            '<input name="typeName" type="text" value="'+$.getI18n('camera')+'" disabled/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('deviceModel') +'：'+
            '</label>'+
            '<input name="cameraModel"/>'+
            '</div>'+
            '<div class="item-group orgStatus">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('guardLevel') +'：'+
            '</label>'+
            '<input name="guardLevel" type="text"/>'+
            '</div>'+
            '<div class="item-group userPic">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('network') +'：'+
            '</label>'+
            '<input name="network" type="text" />'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('inStorage') +'(G)：'+
            '</label>'+
            '<input name="inStorage" type="text" class=" checkNumber"/>'+
            // '<i>&nbsp;&nbsp;G</i>'+
            '</div>'+
            '</div>'+
            '</form>';
        return cameraTep
    },
    //导入模板
    importTep:function(){
        var importTep='<label for="uploadFile" style="position: relative"><input type="file" id="uploadFile" style="width: 200px;height: 34px;opacity: 0; -ms-filter: \'alpha(opacity=0)\'">'+
            '<span id="pathText" style="position: absolute;width: 200px;height: 36px;border:1px solid #EBEBEB;left: -40px;top:10px;line-height: 36px;color: #666"></span>'+
            '<a style="display:inline-block;width:80px;height:36px;background: #01B1ED;color: white;line-height: 36px;position: absolute;top: 10px;left: 170px" >'+$.getI18n('ass.browse')+'</a></label>'+
            '<a id="downTep" style="color: #01B1ED;height:36px;line-height:36px;display:inline-block;text-decoration: underline;text-decoration-color: #01b1ed;position: relative; left: 60px;top: 14px;">'+$.getI18n('ass.downTemp')+'</a>';
        return importTep
    },
    //上传单张图片
    uploadSingleImg:function(imgUrl,ids,id){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:'/equipment/updateCameraPhoto.do?imgUrl='+imgUrl+'&tokenId='+Cookies.getCook('tokenId')+'&deviceId='+id,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                if(result.code==100){
                    App.warningDialog('修改成功');
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }else{
                    App.warningDialog(result.msg);
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }
            }
        });
    },
    //导入文件
    uploadText:function(ids){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:'/equipment/readCameraExcel.do?tokenId='+Cookies.getCook('tokenId'),
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                if(result.code==100){
                    App.warningDialog($.getI18n('importSuccess'));
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }else{
                    App.warningDialog(result.msg,1);
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }
            }
        });
    },
    //预览图片
    fileUpLoad:function(_this,upBtn,imgShowBox) {
        var that = this;
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
            var picVal = '#'+upBtn;
            $(picVal).val('')
            App.alert("你的浏览器不支持H5的FileReader");
            ipt.setAttribute("disabled", "disabled");//浏览器不支持禁用input type='file'文件上传标签
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);//将文件读取为Data URL 读取结果放在result中
        fileReader.onload = function (e) {
            // var img = '<img src="' + this.result + '"/>';
            imgCont.src = this.result;
            var showClose = "#"+imgShowBox;
            if($(showClose).attr('src')!='/images/setting/upload.png'){
                $(showClose).siblings('img').show()
            }
        }
    },
    //导出
    exportDevice:function(){
        var manufacturer = $('input[name="manufacturer"]').val();
        var model = $('input[name="model"]').val();
        var status = $('select[name="status"]').val();
        window.location = window.URLHREF+"/exports/cameraExport.do?manufacturer="+manufacturer+'&model='+model+"&status="+status;
    },
    //新增上传图片
    addSingleImg:function(ids,id){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:'/equipment/updateCameraPhoto.do?tokenId='+Cookies.getCook('tokenId')+'&deviceId='+id,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                if(result.code==100){
                    App.warningDialog('新增成功');
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }else{
                    App.warningDialog('新增摄像头成功,图片上传失败');
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }
            }
        });
    },
    //新增逆变器模板
    newCameraTep:function(){
        var cameraTep  = '<form id="newCameraTep">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('ass.devModelIdent') +'：'+
            '</label>'+
            '<input name="modelIdentity" required id="modelIdentity" />'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('ass.manufacturer') +'：'+
            '</label>'+
            '<input name="manufacturer" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('supportInfra') +'：'+
            '</label>'+
            // '<input name="supportInfra"/>'+
            '<select name="supportInfra">' +
            '<option value="0">'+$.getI18n('support')+'</option>'+
            '<option value="1">'+$.getI18n('nonsupport')+'</option>'+
            '</select>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('pixel') +'(w)：'+
            '</label>'+
            '<input name="cameraResolution"  class=" checkNumber"/>'+
            // '<i>&nbsp;&nbsp;w</i>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('maxResolution') +'：'+
            '</label>'+
            '<input name="maxResolution"/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('devImg') +'：'+
            '</label>'+
            '<span style="color: #FF0E26;width: 280px;display: inline-block;margin-right: 30px;text-align: left;height: 34px;line-height: 34px">'+$.getI18n('suggestImg')+'</span>'+
            '<div class="uploadImgBox"><image id="addCameraImage" src="/images/setting/upload.png"></image>\n'+
            '<img id="closeImage" src="/images/setting/close.png" style="display: none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "addCameraImg" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            // '<div class="item-group">' +
            // '<b>' +
            // '</b>'+
            // '<label>设备类型：' +
            // '</label>'+
            // '<input name="typeName" type="text" value="摄像头" disabled/>'+
            // '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('deviceModel') +'：'+
            '</label>'+
            '<input name="cameraModel" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('ass.devStatus') +'：'+
            '</label>'+
            '<i class="imgStatus"><image src="/images/setting/enabled_1.png" class="statusImg"></image></i>'+
            '</div>'+
            '<div class="item-group orgStatus">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('guardLevel') +'：'+
            '</label>'+
            '<input name="guardLevel" type="text"/>'+
            '</div>'+
            '<div class="item-group userPic">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('network') +'：'+
            '</label>'+
            '<input name="network" type="text" />'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('inStorage') +'(G)：'+
            '</label>'+
            '<input name="inStorage" type="text" class=" checkNumber"/>'+
            // '<i>&nbsp;&nbsp;G</i>'+
            '</div>'+
            '</div>'+
            '</form>';
        return cameraTep
    },
    addCamera:function(){
        var that = this;
        var inverter = App.dialog({
            title: $.getI18n('addCamera'),
            width: 900,
            height: 480,
            maxWidth: document.documentElement.clientWidth - 40,
            maxHeight: document.documentElement.clientHeight - 42,
            appendTo: 'body',
            backdrop: false,
            modal: true,
            keyboard: true,
            content:that.newCameraTep() ,
            openEvent: function () {
                $('#newCameraTep').validate();
                App.initValidate();
                //点击删除更换图片
                $('#closeImage').unbind().on('click',function(){
                    $('#addCameraImage').attr('src','/images/setting/upload.png');
                    $('#addCameraImg').val('');
                    if($('#addCameraImage').attr('src')=='/images/setting/upload.png'){
                        $('#closeImage').hide()
                    }
                });
                //图片预览
                $("input[type = file]").on("change",function () {
                    // $('#closeImage').show();
                    var _that = this;
                    that.fileUpLoad(_that,$(this).attr('id'),$(this).siblings('img').attr('id'))
                });
                //状态切换
                $('#newCameraTep i.imgStatus .statusImg').unbind().on('click',function(){
                    if($(this).attr('src')=='/images/setting/enabled_1.png'){
                        $(this).attr('src','/images/setting/notenabled_1.png')
                    }else{
                        $(this).attr('src','/images/setting/enabled_1.png')
                    }
                })

            },
            closeEvent: null,
            isdrag: true,
            buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
        });
        //点击保存掉新增接口
        $('#saveOwner').unbind('click').on('click',function(){
            var deviceData = $('#newCameraTep').getForm();
            var addImg = $('#addCameraImg');
            if($('#newCameraTep i.imgStatus .statusImg').attr('src')=='/images/setting/enabled_1.png'){
                deviceData.status =1
            }else{
                deviceData.status =0
            }
            deviceData.tokenId = Cookies.getCook('tokenId');
            if(!$('#newCameraTep').valid()) return false;
            var img = $('#addCameraImage').attr('src');
            $.http.POST('/equipment/insertCamera.do',deviceData,function(res){
                that.deviceId = res.body.deviceId;
                if(img!='/images/setting/upload.png'){
                    that.addSingleImg([addImg],that.deviceId)
                }else{
                    App.warningDialog(res.msg);
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }
            })
        })
    }
};
