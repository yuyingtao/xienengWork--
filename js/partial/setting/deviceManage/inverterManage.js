/**
 * Created by SP0014 on 2018/1/10.
 * 设备库管理-逆变器
 */
define(function(){
    return interverManage;
});
var interverManage = {
    inverterTable:'', //逆变器表格
    pathUrl:'',   //文件路径
    deviceId:'',
    Render: function () {
        var that = this;
        that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')});
        //点击搜索按钮查询数据
        $('a.searchDevice').unbind().on('click',function(){
            var manufacturer = $('input[name="manufacturer"]').val();
            var model = $('input[name="model"]').val();
            var status = $('select[name="status"]').val();
           // var obj = {manufacturer:manufacturer,model:model,status:status,tokenId:Cookies.getCook('tokenId')}
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
                        window.location = window.URLHREF+"/exports/interverExcelTemplate.do";
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
        //点击新增
        $('a.addDevice').unbind().on('click',function(){
            that.addDevice()
        })
    },
    getData:function(obj){
        if(this.inverterTable){
            $('#inverterTable tbody').off('click');
            $('#inverterTable tbody').off('mouseenter');
            $('#inverterTable tbody').off('mouseleave');
            this.inverterTable.fnClearTable(false);
            this.inverterTable.fnDestroy()
        }
        var columns =  [
            { data: "modelIdentity" ,title:$.getI18n('deviceModelIdentification'),render:function(data){
                return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            { data: "typeName",title:$.getI18n('deviceType'),width:'10%'},
            { data: "manufacturer",title:$.getI18n('manufacturer'),width:'7%'},
            { data: "model",title:$.getI18n('deviceModel'),render:function(data){
            return '<div class="td-noWrap" title="'+data+'">'+data+'</div>'
            }},
            { data: "power" ,title:$.getI18n('ass.power')+'(KW)',width:'8%'},
            { data: "efficiency",title:$.getI18n('efficiency') ,width:'11%'},
            { data: "channels",title:$.getI18n('mttpRoute'),width:'8%'},
            { data: "max" ,title:$.getI18n('maxRoute'),width:'9%'},
            { data: "photo" ,title:$.getI18n('ass.photo'),width:'10%',render:function(data){
                if(data){
                    return '<div class="imgs"><image class="zoomImg" src="'+data+'" style="width: 64px;height:43px;"></image><img class="zoomIcon" src="/images/setting/deviceManage/Zoom.png"  alt=""><div class="bigImg"><a class="closeZoom">×</a><img src="/images/setting/deviceManage/inverter_big.png"  alt=""></div></div>'
                }else{
                    return '<div class="imgs" style="height: 40px"></div>'
                }

            }}
        ];
        //起停用/操作都有
        if(!!window.systemRole['libInverterManageSwitch'] && !!window.systemRole['libInverterManageEdit']){
            columns.push(
                { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                    if(data==1){
                        return '<image src="/images/setting/enabled_1.png" class="statusImg"></image>'
                    }else{
                        return '<image src="/images/setting/notenabled_1.png" class="statusImg"></image>'
                    }
                }},
                {data:'id',"title":$.getI18n('operate'),render:function(data){
                    return '<a style="width: 50px;display: inline-block;background:rgba(48,166,250,.5);color: #fff;height: 26px;line-height: 26px;text-align: center;border-radius: 4px" class="modifyInverter" data-id="'+data+'">编辑</a>'
                }}
                )
            //只有起停用没有操作
        }else if(!!window.systemRole['libInverterManageSwitch'] && !window.systemRole['libInverterManageEdit']) {
            columns.push(
                {
                    data: "status", title: $.getI18n('status'), width: '8%', render: function (data) {
                    if (data == 1) {
                        return '<image src="/images/setting/enabled_1.png" class="statusImg"></image>'
                    } else {
                        return '<image src="/images/setting/notenabled_1.png" class="statusImg"></image>'
                    }
                }
                }
            )
            //只有操作没有起停用
        }else if(!window.systemRole['libInverterManageSwitch'] && !!window.systemRole['libInverterManageEdit']){
            columns.push(
                { data: "status",title:$.getI18n('status'),width:'8%',render:function(data){
                    if(data==1){
                        return '<span style="color:#29AD00">'+$.getI18n('enable')+'</span>'
                    }else{
                        return '<span>'+$.getI18n('noEnable')+'</span>'
                    }
                }},
                {data:'id',"title":$.getI18n('operate'),render:function(data){
                    return '<a style="width: 50px;display: inline-block;background:rgba(48,166,250,.5);color: #fff;height: 26px;line-height: 26px;text-align: center;border-radius: 4px" class="modifyInverter" data-id="'+data+'">编辑</a>'
                }}
            )
            //什么都没有
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
        this.inverterTable = $('#inverterTable').dataTable({
            ajax:{
                type:'POST',
                url:'equipment/listEquipmentInfo.do',
                //data:obj,
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                data:function(d){
                    d.manufacturer=obj.manufacturer;
                    d.model = obj.model;
                    d.status = obj.status;
                    d.tokenId = obj.tokenId;
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
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
            columns:columns
        });
        //点击编辑按钮，执行编辑操作
        var that = this;
        $('#inverterTable tbody').on('click','td a.modifyInverter',function(e){
            var index = $(this).parent('td').parent('tr').index();
            var data = that.inverterTable.api(true).row( index).data();
            var inverter = App.dialog({
                title: $.getI18n('ass.invDetail'),
                width: 900,
                height: 480,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.inverterTep() ,
                openEvent: function () {
                    $('#inverterTep').setForm(data);
                    $('#inverterTep').validate();
                    App.initValidate();
                    if(data.photo){
                        $('#updateImage').attr('src',data.photo);
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
                        // $('#closeImage').show();
                        var _that = this;
                        that.fileUpLoad(_that,$(this).attr('id'),$(this).siblings('img').attr('id'))
                    })

                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
            });
            //获取更改的值并刷新列表
            $('#saveOwner').unbind().on('click',function(){
                var updateImg = $('#updateImg');
                var upData =  $('#inverterTep').getForm();
                //判断是否上传图片
                var photoUrl = $('#updateImage').attr('src');
                upData.deviceType = data.deviceType;
                upData.deviceId = data.id;
                upData.tokenId = Cookies.getCook('tokenId');
                if(!$('#inverterTep').valid()) return false;
                $.http.POST('/equipment/updateEquipmentBasic.do',upData,function(res){
                   // App.alert(res.msg)
                    if(data.photo){
                        if( data.photo != photoUrl ){
                            that.uploadSingleImg(data.photo,[updateImg],data.id,data.deviceType)
                        }else{
                            App.warningDialog(res.msg);
                            that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                        }
                    }else{
                        if(photoUrl!='/images/setting/upload.png'){
                            that.uploadSingleImg(data.photo,[updateImg],data.id,data.deviceType)
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
        $('#inverterTable tbody').on('click','td img.statusImg',function(){
            var index = $(this).parent('td').parent('tr').index();
            var deviceId = that.inverterTable.api(true).row( index).data().id;
            var deviceType = that.inverterTable.api(true).row( index).data().deviceType;
            var status;
            if($(this).attr('src')=='/images/setting/enabled_1.png'){
                $(this).attr('src','/images/setting/notenabled_1.png');
                status=0
            }else{
                $(this).attr('src','/images/setting/enabled_1.png');
                status=1
            }
            //更新状态
            $.http.POST('/equipment/updateStatus.do',{status:status,deviceType:deviceType,deviceId:deviceId,tokenId:Cookies.getCook('tokenId')},function(res){
                App.warningDialog(res.msg)
            })
        });
        //放大镜效果
        $('#inverterTable tbody').on('mouseenter','td .zoomIcon',function(){
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
        $('#inverterTable tbody').on('mouseenter','td div.imgs',function(){
            $('.closeZoom').click()
        }).on('mouseleave',function(){
            $('.closeZoom').click()
        })
    },
    //导入模板
    importTep:function(){
        var importTep='<label for="uploadFile" style="position: relative"><input type="file" id="uploadFile" style="width: 200px;height: 34px;opacity: 0; -ms-filter: \'alpha(opacity=0)\'">'+
            '<span id="pathText" style="position: absolute;width: 200px;height: 36px;border:1px solid #EBEBEB;border-radius: 4px;left: -40px;top:10px;line-height: 36px;color: #666"></span>'+
            '<a style="display:inline-block;width:80px;height:36px;background: #01B1ED;color: white;line-height: 36px;border-radius: 4px;position: absolute;top: 10px;left: 170px" >'+$.getI18n('ass.browse')+'</a></label>'+
            '<a id="downTep" style="color: #01B1ED;height:36px;line-height:36px;display:inline-block;text-decoration: underline;text-decoration-color: #01b1ed;position: relative; left: 60px;top: 14px;">'+$.getI18n('ass.downTemp')+'</a>';
        return importTep
    },
    //上传单张图片
    uploadSingleImg:function(imgUrl,ids,id,deviceType){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:'/equipment/updateEquipmentPhoto.do?imgUrl='+imgUrl+'&tokenId='+Cookies.getCook('tokenId')+'&deviceId='+id+'&deviceType='+deviceType,
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
                    App.warningDialog(result.msg,1);
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
            url:'/equipment/readInterverExcel.do?tokenId='+Cookies.getCook('tokenId'),
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
        window.location = window.URLHREF+"/exports/inverterExport.do?manufacturer="+manufacturer+'&model='+model+"&status="+status;
    },
    //逆变器详情模板
    inverterTep:function(){
        var inverterTep  = '<form id="inverterTep">'+
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
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('ass.power') +'(kW)：'+
            '</label>'+
            '<input name="power" required class="checkNumber"/>'+
            // '<i>&nbsp;&nbsp;KW</i>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('mttpRoute') +'：'+
            '</label>'+
            '<input name="channels" class="checkNumber" required/>'+
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
            '<input name="typeName" type="text" disabled/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('deviceModel') +'：'+
            '</label>'+
            '<input name="model"/>'+
            '</div>'+
            '<div class="item-group orgStatus">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('efficiency')+'：' +
            '</label>'+
            '<input name="efficiency" type="text" class="input checkNumber" i18nOnly="placeholder" i18n="'+$.getI18n('such as decimal')+'" placeholder="'+$.getI18n('such as decimal')+'"/>'+
            '</div>'+
            '<div class="item-group userPic">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('maxRoute')+'：' +
            '</label>'+
            '<input name="max" class="checkNumber" type="text" required/>'+
            '</div>'+
            '</div>'+
            '</form>';
        return inverterTep
    },
    //新增上传单张图片
    addSingleImg:function(ids,id,deviceType){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:'/equipment/updateEquipmentPhoto.do?tokenId='+Cookies.getCook('tokenId')+'&deviceId='+id+'&deviceType='+deviceType,
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
                    App.warningDialog('新增逆变器成功，图片上传失败');
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }
            }
        });
    },
    //新增逆变器模板
    newInverterTep:function(){
        var inverterTep  = '<form id="newInverterTep">'+
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
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('ass.power') +'(kW)：'+
            '</label>'+
            '<input name="power" required class="checkNumber"/>'+
            // '<i>&nbsp;&nbsp;KW</i>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('mttpRoute') +'：'+
            '</label>'+
            '<input name="channels" class="checkNumber" required/>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('devImg') +'：'+
            '</label>'+
            '<span style="color: #FF0E26;width: 280px;display: inline-block;margin-right: 30px;text-align: left;height: 34px;line-height: 34px">'+$.getI18n('suggestImg')+'</span>'+
            '<div class="uploadImgBox"><image id="addImage" src="/images/setting/upload.png"></image>\n'+
            '<img id="closeImage" src="/images/setting/close.png" style="display: none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "addImg" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('deviceType') +'：'+
            '</label>'+
            '<select name="deviceType"><option value="1">'+$.getI18n('CenInver')+'</option><option value="2">'+$.getI18n('zcInver')+'</option></select>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('ass.devStatus') +'：'+
            '</label>'+
            '<i class="imgStatus"><image src="/images/setting/enabled_1.png" class="statusImg"></image></i>'+
            '</div>'+
            '<div class="item-group">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('deviceModel') +'：'+
            '</label>'+
            '<input name="model"/>'+
            '</div>'+
            '<div class="item-group orgStatus">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('efficiency') +'：'+
            '</label>'+
            '<input name="efficiency" type="text" class="input checkNumber" i18nOnly="placeholder" i18n="'+$.getI18n('such as decimal')+'" placeholder="'+$.getI18n('such as decimal')+'"/>'+
            '</div>'+
            '<div class="item-group userPic">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('maxRoute') +'：'+
            '</label>'+
            '<input name="max" type="text" class="checkNumber" required/>'+
            '</div>'+
            '</div>'+
            '</form>';
        return inverterTep
    },
    //新增逆变器
    addDevice:function(){
        var that = this;
        var inverter = App.dialog({
            title: $.getI18n('addInverter'),
            width: 900,
            height: 480,
            maxWidth: document.documentElement.clientWidth - 40,
            maxHeight: document.documentElement.clientHeight - 42,
            appendTo: 'body',
            backdrop: false,
            modal: true,
            keyboard: true,
            content:that.newInverterTep() ,
            openEvent: function () {
                $('#newInverterTep').validate();
                App.initValidate();
                //点击删除更换图片
                $('#closeImage').unbind().on('click',function(){
                    $('#addImage').attr('src','/images/setting/upload.png');
                    $('#addImg').val('');
                    if($('#addImage').attr('src')=='/images/setting/upload.png'){
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
                $('#newInverterTep i.imgStatus .statusImg').unbind().on('click',function(){
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
            var deviceData = $('#newInverterTep').getForm();
            var addImg = $('#addImg');
            if($('#newInverterTep i.imgStatus .statusImg').attr('src')=='/images/setting/enabled_1.png'){
                deviceData.status =1
            }else{
                deviceData.status =0
            }
            deviceData.tokenId = Cookies.getCook('tokenId');
            var img = $('#addImage').attr('src');
            if(!$('#newInverterTep').valid()) return false;
            $.http.POST('/equipment/insertInterver.do',deviceData,function(res){
                that.deviceId = res.body.deviceId;
                if(img!='/images/setting/upload.png'){
                    that.addSingleImg([addImg],that.deviceId,deviceData.deviceType)
                }else{
                    App.warningDialog(res.msg);
                    that.getData({manufacturer:'',model:'',status:'',tokenId:Cookies.getCook('tokenId')})
                }
            })
        })
    }
};
