/** 2017/12/28
 * @author: SP0014
 * @description: 电站信息
 */
define(function(){
    return plantInfo;
});
var plantInfo = {
    ownerInfo:'',//业主信息
    ownerContent:'',//业主弹窗模板
    modifyOwnerContent:'',//业主弹窗修改模板
    plantId:'', //电站id
    plantObj:{},//电站信息
    plantName:'',//电站名字
    org:'', //所属组织
    orgId:'',
    administrative:[],
    imgUrl:'',//原头像路径
    plantImgUrl:[],//原电站图片路径
    userId:'', //业主id
    country:'',//国家
    province:'',//省份
    city:'',//市
    district:'',//区
    loc:'',//具体位置经纬度
    locInfo:'',//具体位置名字
    typeUrl:1,//是组织分组还是地区分组  默认按组织分组
    ownerPhoneNum:"",//新增业主时候输入电话弹窗模板
    phoneInfo:"",//新增业主时候输入电话弹窗
    ownerHas:"",//业主已存在弹窗
    cannot:"",//企业账号禁止创建业主弹窗信息
    addUserId:"",//新增业主当业主已存在时 列为当前单站业主时 传的id
    inputTel:"",//校验的电话号码
    addrMarker:"",//位置信息定位标注
    Render:function(){
        //this.getPlantInfo()
        var that = this;
        that.addNewOwner();
        that.modifyPlant();
        that.ztreeShow('/plantInfo/getPlantTreeByOrg.do');
        //点击地图查看地理位置
        $('#plantLocation').unbind().on('click',function(){
            that.staticLocation(that.plantObj)
        });
        //查看电价
        $('#lookPrice').unbind().on('click',function(){
            // let priceVal = $('select[name="plantPrice"]').val()
            let priceInfos = App.dialog({
                title: '电价详情',
                width: 500,
                height: 500,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.priceDetail() ,
                openEvent:function(){
                    $.http.POST('/plantInfo/getPlantPriceDetail.do',{id:that.plantObj.priceId,tokenId:Cookies.getCook('tokenId')},function(res){
                        var th = ''
                        $.each(res.body,function(ind,value){
                            th+='<tr>'+
                                '<td style="text-indent: 30px">'+Number(ind+1)+'</td>'+
                                '<td>'+value.time+'</td>'+
                                '<td>'+value.pos+'</td>'+
                                '<td>'+value.neg+'</td>';
                        })
                        $('table.priceDetail').append(th)
                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner',click:function(){
                }}]
            })
        })
        //组织、地区分组切换
        $('.leftTab .tab span').unbind().on('click',function(){
            $('.leftTab .tab span').removeClass('activeSpan');
            $(this).addClass('activeSpan');
            $('#key').val('');
            if($(this).data('type')==1){
                $('.infoContent').hide();
                $('.noData').show();
                $('.addPlant').hide();
                that.typeUrl=1;
                that.ztreeShow('/plantInfo/getPlantTreeByOrg.do')
            }else{
                that.ztreeShow('/plantInfo/getPlantTreeByArea.do');
                that.typeUrl=2;
                $('.infoContent').hide();
                $('.addPlant').hide();
                $('.noData').show()
            }
        })
    },
    //获取电站基本信息和业主信息
    getPlantInfo:function(obj){
        var that = this;
        $.http.POST('/plantInfo/getPlantInfo.do',obj,function(res){
            that.plantObj = res.body.plantInfo;
            that.drawTable(res.body.plantInfo.user);
            that.drawPlant(res.body.plantInfo)
        })
    },
    //绘制业主表格
    drawTable:function(datas){
        var html = '';
        var that = this;
        $('#ownerTable tbody').empty();
        if(datas.length>0){
            $.each(datas,function(i,val){
                html+='<tr>'+
                    '<td style="text-indent: 30px">'+Number(i+1)+'</td>'+
                    '<td>'+val.loginId+'</td>'+
                    '<td>'+val.userName+'</td>'+
                    '<td>'+val.userTel+'</td>';
                //'<td><a class="modifyOwner" data-id="'+val.userId+'">修改</a><a class="modifyPwd" data-id="'+val.userId+'">修改密码</a><a class="deleteOwner" data-id="'+val.userId+'">删除</a></td>'+
                //'</tr>'
                if(!!window.systemRole['plantOwnerManageEdit'] && !window.systemRole['plantOwnerManageDelete']){
                    html+='<td><a class="modifyOwner" data-id="'+val.userId+'" >'+$.getI18n('modify')+'</a><a class="modifyPwd" data-id="'+val.userId+'">'+$.getI18n('modifyPWD')+'</a></td></tr>'
                }else if(!!window.systemRole['plantOwnerManageDelete'] &&!window.systemRole['plantOwnerManageEdit']){
                    html+='<td><a class="modifyPwd" data-id="'+val.userId+'">'+$.getI18n('modifyPWD')+'</a><a class="deleteOwner" data-id="'+val.userId+'">'+$.getI18n('delete')+'</a></td></tr>'
                }else if(!!window.systemRole['plantOwnerManageEdit'] &&!!window.systemRole['plantOwnerManageDelete'] ){
                    html+='<td><a class="modifyOwner" data-id="'+val.userId+'">'+$.getI18n('modify')+'</a><a class="modifyPwd" data-id="'+val.userId+'">'+$.getI18n('modifyPWD')+'</a><a class="deleteOwner" data-id="'+val.userId+'">'+$.getI18n('delete')+'</a></td></tr>'
                }else{
                    html+='<td><a class="modifyPwd" data-id="'+val.userId+'">'+$.getI18n('modifyPWD')+'</a></td></tr>'
                }
            });
            $('#ownerTable tbody').append(html);
            //点击修改弹出修改模态框
            $('#ownerTable tbody tr td a.modifyOwner').unbind().on('click',function(){
                var userId = $(this).data('id');
                //that.imgUrl =
                that.ownerInfo = App.dialog({
                    title: $.getI18n('modifyOwner'),
                    width: 900,
                    height: 400,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:that.modifyTep(),
                    openEvent: function () {
                        $('#modifyOwner').validate();
                        App.initValidate();
                        //获取出原数据并赋值
                        $.http.POST('/user/selectUserInfo.do',{userId:userId,tokenId:Cookies.getCook('tokenId')},function (res) {
                            $("#modifyOwner").setForm(res.body);
                            that.imgUrl = res.body.icon;
                            that.userId = userId;
                            $('#modifyOwner input[name="userTel"]').attr('_id',userId);
                            $('#modifyOwner input[name="loginId"]').attr('_id',userId);
                            $('#modifyOwner input[name="email"]').attr('_id',userId);
                            //console.log(res)
                            //'<img id="closeImageOwner" src="/images/setting/close.png" style="display:none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
                            if(res.body.icon){
                                $('#modifyUploadOwnerImg').attr('src',res.body.icon);
                                $('#closeImageOwner1').show()
                            }
                            if(res.body.status==1){
                                $('.statusImg').attr('src','/images/setting/plantManage/enabled.png')
                            }else{
                                $('.statusImg').attr('src','/images/setting/plantManage/notenabled.png')
                            }
                            //系统账号是否使用手机号码判断
                            if(res.body.useTel==true){
                                $('span.sysSpan').find('label').removeClass('notReact').addClass('onReact')
                            }
                        });
                        $('input[name="plantId"]').val(that.plantName);
                        $('input[name="org"]').val(that.org);
                        //图片预览
                        $("input[type = file]").on("change",function () {
                            var _that = this;
                            // $('#closeImageOwner1').show();
                            that.fileUpLoad(_that,"modifyUpOwnerImg","modifyUploadOwnerImg")
                        });
                        //点击删除更换图片
                        $('#closeImageOwner1').unbind().on('click',function(){
                            $('#modifyUploadOwnerImg').attr('src','/images/setting/upload.png');
                            $('#modifyUpOwnerImg').val('');
                            if($('#modifyUploadOwnerImg').attr('src')=='/images/setting/upload.png'){
                                $('#closeImageOwner1').hide()
                            }
                        });
                        $('input[name="org"],input[name="plantId"]').attr('readonly',true).css('border','none');
                        $('select[name="role"]').attr('disabled',true);
                        //账号状态切换
                        $('.statusImg').unbind().on('click',function(){
                            if($(this).attr('src')=='/images/setting/plantManage/enabled.png'){
                                $(this).attr('src','/images/setting/plantManage/notenabled.png')
                            }else{
                                $(this).attr('src','/images/setting/plantManage/enabled.png')
                            }
                        });
                        //是否使用手机号切换
                        $('span.sysSpan').unbind().on('click',function(){
                            if($(this).children('label').hasClass('onReact')){
                                $(this).children('label').removeClass('onReact').addClass('notReact');
                                $('#modifyOwner input[name="loginId"]').val('')
                            }else{
                                $(this).children('label').removeClass('notReact').addClass('onReact');
                                $('#modifyOwner input[name="loginId"]').val($('#modifyOwner input[name="userTel"]').val())
                            }
                        })
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
                });
                //点击保存按钮调修改接口
                $('#saveOwner').unbind().on('click',function(e){
                    var modifyUpOwnerImg = $('#modifyUpOwnerImg');
                    var data = $('#modifyOwner').getForm();
                    if($('.statusImg').attr('src')=='/images/setting/plantManage/enabled.png'){
                        data['status']=1
                    }else{
                        data['status']=0
                    }
                    if($('span.sysSpan').children('label').hasClass('onReact')){
                        data['useTel']= true
                    }else{
                        data['useTel']= false
                    }
                    data.userId = userId;
                    data.tokenId = Cookies.getCook('tokenId');
                    data.id = Cookies.getCook('id');
                    data.plantId = that.plantId;
                    data.org = that.orgId;
                    //console.log('that',that.userId)
                    if(!$('#modifyOwner').valid()) return false;
                    $.http.POST('/plantInfo/updatePlantUser.do',data,function(res){
                        //判断是否修改了图片以及是否有原图片
                        if(that.imgUrl){
                            if($('#modifyUploadOwnerImg').attr('src') !=that.imgUrl ){
                                that.uploadSingleImg(that,[modifyUpOwnerImg])
                            }else{
                                App.warningDialog(res.msg)
                                $.http.POST('/plantInfo/getPlantInfo.do',{plantId:that.plantId,tokenId:Cookies.getCook('tokenId')},function (res) {
                                    that.drawTable(res.body.plantInfo.user)
                                })
                            }
                        }else{
                            if($('#modifyUploadOwnerImg').attr('src') !='/images/setting/upload.png' ){
                                that.uploadSingleImg(that,[modifyUpOwnerImg])
                            }else{
                                App.warningDialog(res.msg)
                                $.http.POST('/plantInfo/getPlantInfo.do',{plantId:that.plantId,tokenId:Cookies.getCook('tokenId')},function (res) {
                                    that.drawTable(res.body.plantInfo.user)
                                })
                            }
                        }

                        $('#cancelOwner').click();
                        $('#ownerTable tbody').empty()

                    });
                    e.stopPropagation()
                })
            });
            //删除业主信息
            $('#ownerTable tbody tr td a.deleteOwner').unbind().on('click',function(){
                var id = $(this).data('id');
                //var $this = $(this).parent('td').parent('tr')
                App.confirm({
                    type: "confirm",
                    title:$.getI18n('tips'),
                    msg: $.getI18n('sureDeleteOwner'),
                    buttons:[
                        {
                            id: 'okId',
                            type: 'submit cus-img-btn cus-ib-start',
                            text:  $.getI18n('sure'),
                            clickToClose: true,
                            click: function () {
                                $.http.POST('/plantInfo/deletePlantUser.do',{id:id,tokenId:Cookies.getCook('tokenId')},function (res) {
                                    App.warningDialog(res.msg)
                                    //$this.remove()
                                    $('#ownerTable tbody').empty();
                                    $.http.POST('/plantInfo/getPlantInfo.do',{plantId:that.plantId,tokenId:Cookies.getCook('tokenId')},function (res) {
                                        that.drawTable(res.body.plantInfo.user)
                                    })
                                })
                            }
                        },
                        {
                            id: 'cancelId',
                            type: ' cus-img-btn cus-ib-start',
                            text: $.getI18n('cancel'),
                            clickToClose: true
                        }
                    ]
                },function(){
                    // $.http.POST('/plantInfo/deletePlantUser.do',{id:id,tokenId:Cookies.getCook('tokenId')},function (res) {
                    //     App.alert(res.msg)
                    //     //$this.remove()
                    //     $('#ownerTable tbody').empty()
                    //     $.http.POST('/plantInfo/getPlantInfo.do',{id:id,tokenId:Cookies.getCook('tokenId')},function (res) {
                    //         that.drawTable(res.body.plantInfo.user)
                    //     })
                    // })
                },function(){

                })

            });
            //修改密码
            $('#ownerTable tbody tr td a.modifyPwd').unbind().on('click',function(){
                var userId = $(this).data('id');
                var pd = '';
                var pwdContent = '<form id="pwdForm1">' +
                    // '<div class="form-group1">' +
                    // '<b>*' +
                    // '</b>'+
                    // '<label>原 密 码：' +
                    // '</label>'+
                    // '<input name="OldPassword" type="password" id="OldPassword"/>'+
                    // '<span class="OldPassword">你好</span>'+
                    // '</div>'+
                    '<div class="form-group1">' +
                    '<b>*' +
                    '</b>'+
                    '<label>'+$.getI18n('newPwd')+'' +
                    '</label>'+
                    '<input name="NewPassword" type="password" id="NewPassword"/>'+
                    '<span class="NewPassword">你好</span>'+
                    '</div>'+
                    '<div class="form-group1">' +
                    '<b>*' +
                    '</b>'+
                    '<label>'+$.getI18n('confirmPwd')+'' +
                    '</label>'+
                    '<input name="repNewPassword" type="password" id="repNewPassword"/>'+
                    '<span class="repNewPassword">你好</span>'+
                    '</div>'+
                    '</form>';
                pd = App.dialog({
                    title: $.getI18n('modifyPWD'),
                    width: 400,
                    height: 200,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:pwdContent ,
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
                });
                // $('#OldPassword').unbind().on('blur',function(){
                //     if($.trim($('#OldPassword').val())){
                //         $('.OldPassword').text('请输入原密码').css('visibility','hidden')
                //     }
                // })
                $('#NewPassword').unbind().on('blur',function(){
                    if(!$.trim($('#NewPassword').val())){
                        $('.NewPassword').text($.getI18n('inputOldPwd')).css('visibility','visible')
                    }else{
                        $('.NewPassword').css('visibility','hidden')
                    }
                });
                $('#repNewPassword').unbind().on('blur',function(){
                    if(!$.trim($('#repNewPassword').val())){
                        $('.repNewPassword').text($.getI18n('inputconfPwd')).css('visibility','visible')
                    }else{
                        $('.repNewPassword').css('visibility','hidden')
                    }
                });
                $('#saveOwner').unbind().on('click',function(){
                    if(!$.trim($('#NewPassword').val())){
                        //App.alert('请输入新密码');
                        $('.NewPassword').text($.getI18n('inputOldPwd')).css('visibility','visible');
                        return false;
                    }
                    if(!$.trim($('#repNewPassword').val())){
                        $('.repNewPassword').text($.getI18n('inputconfPwd')).css('visibility','visible');
                        //App.alert('请输入确认新密码');
                        return false;
                    }
                    if($('#NewPassword').val() != $('#repNewPassword').val()){
                        //App.alert('确认新密码与新密码不相等，请重新输入！');
                        $('.repNewPassword').text($.getI18n('difPwd')).css('visibility','visible');
                        return false;
                    }
                    var data = $('#pwdForm1').getForm();
                    $.each(data,function(i,val){
                        data[i]=hex_md5(val)
                    });
                    data.tokenId = Cookies.getCook('tokenId');
                    data.userId = userId;
                    $.http.POST('/user/updateDirectPwd.do',data,function(res){
                        //App.alert(res.msg)
                        if(res.code==101){

                            App.warningDialog(res.msg,1)
                        }else{
                            App.warningDialog(res.msg)
                            $.http.POST('/plantInfo/getPlantInfo.do',{plantId:that.plantId,tokenId:Cookies.getCook('tokenId')},function (res) {
                                that.drawTable(res.body.plantInfo.user)
                            })
                            //$('#exitSys').click()
                        }
                    },true,true)
                })

            })
        }else{
            html='<tr><td colspan="5" style="text-align: center">'+$.getI18n('noData')+'</td></tr>';
            $('#ownerTable tbody').append(html)
        }

    },
    //绘制电站信息数据
    drawPlant:function(datas){
        $('#plantInformation').find('tr').eq(0).find('td').eq(0).find('b').text(datas.plantName);
        $('#plantInformation').find('tr').eq(0).find('td').eq(1).find('b').text(datas.capacity+datas.capUnit);
        $('#plantInformation').find('tr').eq(0).find('td').eq(2).find('b').text(datas.gridConnectedDate);
        $('#plantInformation').find('tr').eq(1).find('td').eq(0).find('b').text(datas.plantAddr);
        $('#plantInformation').find('tr').eq(1).find('td').eq(1).find('b').html(datas.plantTypeA.name + '&nbsp;' +datas.plantTypeB.name);
        $('#plantInformation').find('tr').eq(1).find('td').eq(2).find('b').text(datas.orgName);
        $('#plantInformation').find('tr').eq(2).find('td').eq(0).find('b').text(datas.plantFullAddress);
        $('#plantInformation').find('tr').eq(2).find('td').eq(1).find('b').text(datas.plantPrice);
        $('#plantInformation').find('tr').eq(2).find('td').eq(2).find('b').text(datas.plantArea+'㎡');
        $('#plantInformation').find('tr').eq(3).find('td').eq(0).find('b').text(datas.loaction);
        $('#plantInformation').find('tr').eq(4).find('td').eq(0).find('b').text(datas.plantIntroduction);
        //电站图片绘制
        var divHtml ='' ;
        $('.plantImages').empty();
        ///images/plantImages/1516778892946.jpeg
        if(datas.photo.length>0){
            $.each(datas.photo,function(i,val){
                divHtml+='<div class="ptImg"><img src="'+val+'"></div>'
            });
            $('.plantImages').html(divHtml)
        }
    },
    //新增业主信息弹窗模板
    newOwnerTep:function(){
        //弹窗模板
        this.ownerContent = '<form id="ownerInformation" class="plantForm">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('orgName')+'<span>：</span>' +
            '</label>'+
            '<input name="org" required id="org" readonly/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('username')+'<span>：</span>' +
            '</label>'+
            '<input name="userName" required/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('role')+'<span>：</span>' +
            '</label>'+
            '<input name="role" required readonly value="'+$.getI18n('plantOwner')+'">'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('plantName')+'<span>：</span>' +
            '</label>'+
            '<input name="plantId" required readonly/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('telephone')+'<span>：</span>' +
            '</label>'+
            '<input name="userTel" class="mobile" required readonly/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('email')+'<span>：</span>' +
            '</label>'+
            '<input name="email" type="email" class="checkAddRepeatEmail"/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>' +
            '</b>'+
            '<label style="position: absolute;left: 50px;line-height: 34px">'+$.getI18n('sysId')+'<span>：</span>' +
            '</label>'+
            '<input style="position:absolute;left: 120px;line-height: 34px" name="loginId" i18nOnly="placeholder" i18n="'+$.getI18n("inputTel")+'" placeholder="'+$.getI18n("inputTel")+'" class="sysTel checkAddRepeatTel"/>'+
            '<span class="sysSpan" style="position:absolute;right: 36px;line-height: 34px;top:0;"><label></label>'+$.getI18n('useTel')+'</span>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('accountPwd')+'<span>：</span>' +
            '</label>'+
            '<input name="password" type="password" class="firPwd" class="passwordCheck" required/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('confirmPwd')+'<span>：</span>' +
            '</label>'+
            '<input type="password" class="secPwd passwordCheck" required/>'+
            '</div>'+
            '<div class="item-group-plant orgStatus">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('accountStatus')+'<span>：</span>' +
            '</label>'+
            '<i><image src="/images/setting/plantManage/enabled.png" class="statusImg"></image></i>'+
            '</div>'+
            '<div class="item-group-plant userPic">' +
            '<b>' +
            '</b>'+
            '<label style="position: absolute; top: 0;left: 23px">'+$.getI18n('userImg')+'<span>：</span>' +
            '</label>'+
            '<i style="position: absolute;left: 100px;display: inline-block">'+
            '<div class="uploadImgBox"><image id="addUploadOwnerImg" src="/images/setting/upload.png"></image>\n'+
            '<img id="closeImageOwner" src="/images/setting/close.png" style="display:none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "addOwnerImg" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div>'+
            '<span style="position:absolute;bottom:0">'+$.getI18n('suggestOne')+'</span></i>'+
            '</div>'+
            '</div>'+
            '</form>';
        return this.ownerContent
    },
    //输入业主电话弹窗
    ownerPhoneNumTep:function () {
        this.ownerPhoneNum = `<form id="ownerPhoneNumFrom">
                <div><span>${$.getI18n("ownerTel")}</span><span>:</span> <input  type="text" name="ownerPhoneNum" class="mobile" id="ownerPhoneNum" i18nOnly="placeholder" i18n="${$.getI18n('inputOwnerTel')}" placeholder="${$.getI18n('inputOwnerTel')}" style="display:inline-block;margin-left: 10px;padding: 10px; width:180px; height:36px;border-radius: 4px;border: 1px solid #EBEBEB" required/></div>
        </form>`;
        return this.ownerPhoneNum
    },

    //修改业主弹窗
    modifyTep:function(){
        this.modifyOwnerContent = '<form id="modifyOwner" class="plantForm">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('orgName')+'<span>：</span>' +
            '</label>'+
            '<input name="org" required id="org" readonly/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('username')+'<span>：</span>' +
            '</label>'+
            '<input name="userName" required/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('role')+'<span>：</span>' +
            '</label>'+
            '<input name="role" required readonly>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('plantName')+'<span>：</span>' +
            '</label>'+
            '<input name="plantId" required readonly/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('telephone')+'<span>：</span>' +
            '</label>'+
            '<input name="userTel" class="mobile checkRepeatTel" required/>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group-plant">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('email')+'<span>：</span>' +
            '</label>'+
            '<input name="email" type="email" class="checkRepeatEmail"/>'+
            '</div>'+
            '<div class="item-group-plant" style="margin-bottom: 18px">' +
            '<b>' +
            '</b>'+
            '<label style="position: absolute;left: 28px;line-height: 34px">'+$.getI18n('sysId')+'<span>：</span>>' +
            '</label>'+
            '<input name="loginId" style="position:absolute;left: 100px;line-height: 34px" i18nOnly="placeholder" i18n="'+$.getI18n("inputTel")+'"  placeholder="'+$.getI18n("inputTel")+'" class="sysTel checkRepeatTel"/>'+
            '<span class="sysSpan" style="position:absolute;right: 22px;line-height: 34px;top:0;"><label class="notReact"></label>'+$.getI18n('useTel')+'</span>'+
            '</div>'+
            '<div class="item-group-plant orgStatus">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('accountStatus')+'<span>：</span>' +
            '</label>'+
            '<i><image src="/images/setting/plantManage/enabled.png" class="statusImg"></image></i>'+
            '</div>'+
            '<div class="item-group-plant userPic">' +
            '<b>' +
            '</b>'+
            '<label style="position: absolute; top: 0;left: 23px">'+$.getI18n('userImg')+'<p style="display: inline-block">：</p>' +
            '</label>'+
            '<i style="position: absolute;left: 100px;display: inline-block">'+
            '<div class="uploadImgBox"><image id="modifyUploadOwnerImg" src="/images/setting/upload.png"></image>\n'+
            '<img id="closeImageOwner1" src="/images/setting/close.png" style="display:none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "modifyUpOwnerImg" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div>'+
            '<span style="position:absolute;bottom:0">'+$.getI18n('suggestOne')+'</span></i>'+
            '</div>'+
            '</div>'+
            '</form>';
        return this.modifyOwnerContent
    },
    //新增业主
    addNewOwner:function(){
        var that = this;
        $('#addOwner').unbind().on('click',function(){
                that.phoneInfo = App.dialog({
                    title: $.getI18n('checkOwner'),
                    width: 400,
                    height: 120,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content:that.ownerPhoneNumTep(),
                    openEvent: function () {
                        $('#ownerPhoneNumFrom').validate();
                         App.initValidate()
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'queryNum'}]
                });
            $("#queryNum").on("click",function () {
                if(!$('#ownerPhoneNumFrom').valid()) return false;
                that.inputTel = $("#ownerPhoneNum").val();
                $.http.POST('/plantInfo/getUserType.do',{tokenId:Cookies.getCook('tokenId'),userTel:$("#ownerPhoneNum").val(),pantId:that.plantId},function(res){
                    if(res.body.type == "1"){
                        that.phoneInfo = App.dialog({
                            title: $.getI18n('inputOwnerInfo'),
                            width: 900,
                            height: 400,
                            maxWidth: document.documentElement.clientWidth - 40,
                            maxHeight: document.documentElement.clientHeight - 42,
                            appendTo: 'body',
                            backdrop: false,
                            modal: true,
                            keyboard: true,
                            content:that.newOwnerTep(),
                            openEvent: function () {
                                $('#ownerInformation').validate();
                                 App.initValidate();
                                 //图片预览
                                 $("input[type = file]").on("change",function () {
                                     var _that = this;
                                     // $(this).siblings('img').show();
                                     that.fileUpLoad(_that,"addOwnerImg","addUploadOwnerImg")
                                 });
                                $('input[name="userTel"]').val(that.inputTel);
                                 //点击删除更换图片
                                 $('#closeImageOwner').unbind().on('click',function(){
                                 $('#addUploadOwnerImg').attr('src','/images/setting/upload.png');
                                 $('#addOwnerImg').val('');
                                 if($('#addUploadOwnerImg').attr('src')=='/images/setting/upload.png'){
                                 $('#closeImageOwner').hide()
                                 }
                                 });
                                //是否使用手机号切换
                                $('span.sysSpan').unbind().on('click',function(){
                                    if($(this).children('label').hasClass('onReact')){
                                        $(this).children('label').removeClass('onReact').addClass('notReact');
                                        $('#ownerInformation input[name="loginId"]').val('')
                                    }else{
                                        $(this).children('label').removeClass('notReact').addClass('onReact');
                                        $('#ownerInformation input[name="loginId"]').val($('#ownerInformation input[name="userTel"]').val())
                                    }
                                });
                                //账号状态切换
                                $('.statusImg').unbind().on('click',function(){
                                    if($(this).attr('src')=='/images/setting/plantManage/enabled.png'){
                                        $(this).attr('src','/images/setting/plantManage/notenabled.png')
                                    }else{
                                        $(this).attr('src','/images/setting/plantManage/enabled.png')
                                    }
                                })
                            },
                            closeEvent: null,
                            isdrag: true,
                            buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
                        });
                        $('input[name="plantId"]').val(that.plantName);
                        $('input[name="org"]').val(that.org);
                        //确认密码失去焦点时判断两次是否一致
                        $('.secPwd').unbind().on('blur',function(){
                            var pd1 = $('.firPwd').val();
                            var pd2 = $('.secPwd').val();
                            if(pd1!=pd2){
                                App.alert($.getI18n('difPwd'))
                            }
                        });
                        //点击保存按钮调新增接口
                        $('#saveOwner').unbind().on('click',function(e){
                            var data = $('#ownerInformation').getForm();
                            var addOwnerImg = $('#addOwnerImg');
                            if($('.statusImg').attr('src')=='/images/setting/plantManage/enabled.png'){
                                data['status']=1
                            }else{
                                data['status']=0
                            }
                            if($('span.sysSpan').children('label').hasClass('onReact')){
                                data['useTel']= true
                            }else{
                                data['useTel']= false
                            }
                            data.tokenId = Cookies.getCook('tokenId');
                            data.plantId = that.plantId;
                            data.orgId = that.orgId;
                            data.password = hex_md5(data.password);
                            if(!$('#ownerInformation').valid()) return false;
                            $.http.POST('/plantInfo/insertPlantUser.do',data,function(res){
                                //判断是否上传了图片
                                if($('#addUploadOwnerImg').attr('src') != '/images/setting/upload.png'){
                                    that.userId = res.body.userId;
                                    that.uploadSingleImg(that,[addOwnerImg])
                                }else{
                                    App.warningDialog(res.msg)
                                    that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                                }
                                $('#cancelOwner').click()
                            });
                            e.stopPropagation()
                        })
                    }
                    else if(res.body.type =="2"){
                        that.addUserId = res.body.userId;
                        that.ownerHas = App.dialog({
                            title: $.getI18n('checkOwnerTel'),
                            width: 400,
                            height: 120,
                            maxWidth: document.documentElement.clientWidth - 40,
                            maxHeight: document.documentElement.clientHeight - 42,
                            appendTo: 'body',
                            backdrop: false,
                            modal: true,
                            keyboard: true,
                            content:`<div>${$.getI18n('thisOwnerSetPlant')}</div>  `,
                            openEvent: function () {
                            },
                            closeEvent: null,
                            isdrag: true,
                            buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'qrOwner'}]
                        });
                        $("#qrOwner").on("click",function () {
                            $.http.POST('/plantInfo/insertPlantOwner.do',{tokenId:Cookies.getCook('tokenId'),userId:that.addUserId,plantId:that.plantId},function(res){
                                that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                            })
                        })
                    }else if(res.body.type =="3"){
                        that.cannot = App.dialog({
                            title: $.getI18n('checkOwnerTel'),
                            width: 400,
                            height: 120,
                            maxWidth: document.documentElement.clientWidth - 40,
                            maxHeight: document.documentElement.clientHeight - 42,
                            appendTo: 'body',
                            backdrop: false,
                            modal: true,
                            keyboard: true,
                            content:`<div>${$.getI18n('thisAccountIsNotAllowed')}</div>  `,
                            openEvent: function () {
                            },
                            closeEvent: null,
                            isdrag: true,
                            buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'qrOwnercannot'}]
                        });
                        $("#qrOwnercannot").on("click",function () {

                        })
                    }else {
                        that.cannot = App.dialog({
                            title: $.getI18n('checkOwnerTel'),
                            width: 400,
                            height: 120,
                            maxWidth: document.documentElement.clientWidth - 40,
                            maxHeight: document.documentElement.clientHeight - 42,
                            appendTo: 'body',
                            backdrop: false,
                            modal: true,
                            keyboard: true,
                            content:`<div>${$.getI18n('thisAccountIsOwner')}</div>  `,
                            openEvent: function () {
                            },
                            closeEvent: null,
                            isdrag: true,
                            buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'qrOwnercannot'}]
                        })
                    }
                })
            })
        })
    },
    //修改电站信息
    modifyPlant:function(){
        var plantInfo = '';
            var that = this;
        //var administrative =[];
        var addressObj ;  //地图定位地址信息
        var fullAddr ;  //用户输入的详细地址
        var plantAddr ;  //地址信息
        var latLng ;  //定位的经纬度
        //style="height:34px" style="position:absolute;left:40px;top:8px"  style="position:absolute;left:50px;top:0;line-height:34px"
        var plantContent = '<form id="plantInfoOfPlant" class="plantForm">'+
            '<div class="leftInfo fl">' +
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('plantName')+'<span>：</span>' +
            '</label>'+
            '<input name="plantName" class="checkPlantName" required/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('capacity')+'<span>：</span>' +
            '</label>'+
            '<input class="capacity checkNumber" name="capacity" required>'+
            '<select class="capSelect" name="capUnit">' +
            // '<option value="MW">MW</option>'+
            // '<option value="KW">KW</option>'+
            // '<option value="GW">GW</option>'+
            '</select>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('plantAddress')+'<span>：</span>' +
            '</label>'+
            '<input class="addrInput" name="plantAddr" required readonly>'+
            '<a id="getLocation">'+$.getI18n('mapPosition')+'</a>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('detailedAddress')+'<span>：</span>' +
            '</label>'+
            '<input class="" name="plantFullAddress">'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('location')+'<span>：</span>' +
            '</label>'+
            '<input name="loaction" required readonly/>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('areaCovered')+'<span>：</span>' +
            '</label>'+
            '<input name="plantArea" class="plantArea checkNumber" required/>㎡'+
            '</div>'+
            // '<div class="item-group-plant qyjj">' +
            // '<b>' +
            // '</b>'+
            // '<label>启用简介：' +
            // '</label>'+
            // '<i class="qyi" data-value="1" ><label></label>启用</i>'+
            // '<i class="bi" data-value="0"><label></label>不启用</i>'+
            // '</div>'+
            '<div class="item-group-plant">' +
            '<b>' +
            '</b>'+
            '<label class="ptInfoLabel" style="position: absolute; top: 0;left: 47px">'+$.getI18n('introduction')+'<span>：</span>' +
            '</label>'+
            '<textarea style="position: absolute;left: 125px;resize:none" i18nOnly="placeholder" i18n="'+$.getI18n("inputPlantIntroduction")+'" placeholder="'+$.getI18n("inputPlantIntroduction")+'" name="plantIntroduction"></textarea>'+
            '</div>'+
            '</div>'+
            '<div class="rightInfo fr">' +
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('accessTime')+'<span>：</span>' +
            '</label>'+
            '<input style="cursor:pointer;border:1px solid #ebebeb" class="time" name="gridConnectedDate" onclick="WdatePicker({readOnly:true,dateFmt:\'yyyy-MM-dd\'})" required/>'+
            '<i class="timeLine"></i>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('plantType')+'<span>：</span>' +
            '</label>'+
            '<select class="select1" style="margin-ringht:10px;" name="plantTypeA" required>' +
            '</select>'+
            '<select class="select1" name="plantTypeB" required>' +
            '</select>'+
            '</div>'+
            '<div class="item-group-plant">' +
            '<b>*' +
            '</b>'+
            '<label>'+$.getI18n('price')+'<span style="visibility: hidden">你好</span><span>：</span>' +
            '</label>'+
            // '<input name="plantPrice" class="inPrice" style="width:230px; margin-right:5px;display:none" required/><i class="inPrice" style="display:none;">元/kwh</i>'+
            '<select name="plantPrice" class="priceSee"></select><a class="priceSee" id="priceSee">查看电价规则</a>'+
            '</div>'+
            '<div class="item-group-plant userPic">' +
            '<b>' +
            '</b>'+
            '<label>'+$.getI18n('plantImg')+'<p style="display:inline-block">：</p>' +
            '</label>'+
            '<input style="border:none;color:#FF0E26" value="'+$.getI18n('suggestImg')+'">'+
            // '<i style="position: absolute;left: 100px;display: inline-block">'+
            // '<div class="uploadImgBox"><image id="modifyUploadImgBox" src="/images/setting/upload.png"></image>\n'+
            // '<input id = "modifyUp_img" type="file" accept="image/jpeg,image/gif,image/png" />'+
            // '</div>'+
            // '<span style="position:absolute;bottom:0">建议图片长宽比1:1</span></i>'+
            '</div>'+
            '<div class="item-group-plant plantImg">' +
            '<i style="display: inline-block;width:33%;float:left;">'+
            '<div class="uploadImgBox"><image id="modifyUploadImgBox1" src="/images/setting/upload.png"></image>\n'+
            '<img class="closeImage num1" src="/images/setting/close.png" style="display:none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "modifyUp_img1" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div></i>'+
            '<i style="display: inline-block;width:33%;float:left;">'+
            '<div class="uploadImgBox"><image id="modifyUploadImgBox2" src="/images/setting/upload.png"></image>\n'+
            '<img class="closeImage num2" src="/images/setting/close.png" style="display:none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "modifyUp_img2" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div></i>'+
            '<i style="display: inline-block;width:33%;float:left;">'+
            '<div class="uploadImgBox"><image id="modifyUploadImgBox3" src="/images/setting/upload.png"></image>\n'+
            '<img class="closeImage num3" src="/images/setting/close.png" style="display:none;position: absolute;right: 0;z-index: 100;top: 0;width: 20px;height: 20px;"/>'+
            '<input id = "modifyUp_img3" type="file" accept="image/jpeg,image/gif,image/png" />'+
            '</div></i>'+
            '</div>'+
            '</div>'+
            '</form>';
        $('#modifyPlant-plantManage').unbind().on('click',function(){
            plantInfo = App.dialog({
                title: $.getI18n('modifyPlant'),
                width: 900,
                height: 493,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:plantContent ,
                openEvent: function () {
                    $('#plantInfoOfPlant').validate();
                    App.initValidate();
                    //判断电站类型，根据类型显示电价
                    if(that.plantObj.plantTypeA.value==1){
                        // $('.item-group-plant').find('.inPrice').show()
                        // $('.item-group-plant').find('.priceSee').hide()
                        that.getPriceType({tokenId:Cookies.getCook('tokenId'),plantType:1})
                        $('select[name="plantPrice"]').val(that.plantObj.plantPrice)
                    }else if(that.plantObj.plantTypeA.value==2){
                        // $('.item-group-plant').find('.inPrice').hide()
                        // $('.item-group-plant').find('.priceSee').show()
                        that.getPriceType({tokenId:Cookies.getCook('tokenId'),plantType:2})
                        $('select[name="plantPrice"]').val(that.plantObj.priceId)
                    }
                    //改变电站类型
                    $('select[name="plantTypeA"]').unbind().on('change',function() {
                        let type = $(this).val()
                        that.getPriceType({plantType: type, tokenId: Cookies.getCook('tokenId')})
                    })
                    $('select[name="capUnit"]').val(that.plantObj.capUnit)
                    //查看电价规则
                    $('#priceSee').unbind().on('click',function(){
                        let priceVal = $('select[name="plantPrice"]').val()
                        let priceInfos = App.dialog({
                            title: '电价详情',
                            width: 500,
                            height: 500,
                            maxWidth: document.documentElement.clientWidth - 40,
                            maxHeight: document.documentElement.clientHeight - 42,
                            appendTo: 'body',
                            backdrop: false,
                            modal: true,
                            keyboard: true,
                            content:that.priceDetail() ,
                            openEvent:function(){
                                $.http.POST('/plantInfo/getPlantPriceDetail.do',{id:priceVal,tokenId:Cookies.getCook('tokenId')},function(res){
                                    var th = ''
                                    $.each(res.body,function(ind,value){
                                        th+='<tr>'+
                                            '<td style="text-indent: 30px">'+Number(ind+1)+'</td>'+
                                            '<td>'+value.time+'</td>'+
                                            '<td>'+value.pos+'</td>'+
                                            '<td>'+value.neg+'</td>';
                                    })
                                    $('table.priceDetail').append(th)
                                })
                            },
                            closeEvent: null,
                            isdrag: true,
                            buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner',click:function(){
                            }}]
                        })
                    })
                    //图片上传预览
                    $("input[type = file]").on("change",function () {
                        var _that = this;
                        // $(this).siblings('img').show();
                        that.fileUpLoad(_that,$(this).attr('id'),$(this).siblings('img').attr('id'))
                    });
                    $('.closeImage').unbind().on('click',function(){
                        $(this).siblings('img').attr('src','/images/setting/upload.png');
                        $(this).siblings('input').val('');
                        if($(this).siblings('img').attr('src')=='/images/setting/upload.png'){
                            $(this).hide()
                        }
                    });
                    //地图定位
                    $('#getLocation').unbind().on('click',function(){
                        //var map;
                        var _that = that;
                        var data = _that.plantObj;
                        var location = App.dialog({
                            id:'locationMap1',
                            title: $.getI18n('mapPosition'),
                            width: 1000,
                            height: 600,
                            maxWidth: document.documentElement.clientWidth - 40,
                            maxHeight: document.documentElement.clientHeight - 42,
                            appendTo: 'body',
                            backdrop: false,
                            modal: true,
                            keyboard: true,
                            content:_that.locationMap() ,
                            openEvent: function () {
                                //原有经纬度赋值
                                $('#locInfo p').eq(1).find('input').val(_that.plantObj.plantAddr).attr('readonly',true);
                                $('#locInfo p').eq(0).find('input').val(_that.plantObj.loaction).attr('readonly',true);
                                $('#locInfo p').eq(2).find('input').val(_that.plantObj.plantFullAddress);
                                //腾讯地图传值 纬经度
                                var locMarker = _that.plantObj.loaction.split(',')
                                var center = new qq.maps.LatLng(locMarker[1],locMarker[0]);
                                var qMap = new qq.maps.Map(document.getElementById('map'),{
                                    center: center,
                                    zoom: 13
                                });
                                _that.addrMarker = new qq.maps.Marker({
                                    map:qMap,
                                    position: center
                                });
                                var locCb = {
                                    complete:function(rs){
                                        _that.administrative=[];
                                        _that.administrative.push({
                                            name:rs.detail.addressComponents.district,
                                            value:rs.detail.location.lng+','+rs.detail.location.lat,
                                            level:4
                                        })
                                    }
                                };
                                var geoc= new qq.maps.Geocoder(locCb);
                                var geocoder = new qq.maps.Geocoder({
                                    complete:function(res){
                                        qMap.setCenter(res.detail.location);
                                        if(_that.addrMarker){
                                            _that.addrMarker.setMap(null)
                                        }
                                        _that.addrMarker = new qq.maps.Marker({
                                            map:qMap,
                                            position: res.detail.location
                                        });
                                        var country = res.detail.addressComponents.country;
                                        _that.country = country;
                                        var province = res.detail.addressComponents.province;
                                        _that.province = province;
                                        var city = res.detail.addressComponents.city;
                                        _that.city = city;
                                        var district = res.detail.addressComponents.district;
                                        _that.district = district;
                                        var loc = res.detail.location.lng+','+res.detail.location.lat;
                                        _that.district = loc;
                                        $('#locInfo p').eq(1).find('input').val(country+province+city+district).attr('readonly',true);
                                        $('#locInfo p').eq(0).find('input').val(loc).attr('readonly',true);
                                        $('#locInfo p').eq(2).find('input').val('').attr('placeHolder',$.getI18n('inputFullAddress'));
                                        geoc.getLocation(country+','+province+','+','+city+','+district)
                                    }
                                });
                                qq.maps.event.addListener(
                                    qMap,
                                    'click',
                                    function(e) {
                                        //var loc = e.latLng.lng+","+e.latLng.lat;
                                        var pt=new qq.maps.LatLng(e.latLng.lat,e.latLng.lng);
                                        geocoder.getAddress(pt)
                                    });
                                var geocoder1 = new qq.maps.Geocoder({
                                    complete : function(res){
                                        qMap.setCenter(res.detail.location);
                                        if(_that.addrMarker){
                                            _that.addrMarker.setMap(null)
                                        }
                                        _that.addrMarker = new qq.maps.Marker({
                                            map:qMap,
                                            position: res.detail.location
                                        });
                                        var country = res.detail.addressComponents.country;
                                        _that.country = country;
                                        var province = res.detail.addressComponents.province;
                                        _that.province = province;
                                        var city = res.detail.addressComponents.city;
                                        _that.city = city;
                                        var district = res.detail.addressComponents.district;
                                        _that.district = district;
                                        var loc = res.detail.location.lng+','+res.detail.location.lat;
                                        _that.loc = loc;
                                        $('#locInfo p').eq(1).find('input').val(country+province+city+district).attr('readonly',true);
                                        $('#locInfo p').eq(0).find('input').val(loc).attr('readonly',true);
                                        $('#locInfo p').eq(2).find('input').val('').attr('placeHolder',$.getI18n('inputFullAddress'));
                                        geoc.getLocation(country+','+province+','+','+city+','+district)
                                    }
                                });
                                $("#modifySearchMap").on("click",function () {
                                    var address = document.getElementById("modifyAddress").value;
                                    //通过getLocation();方法获取位置信息值
                                    geocoder1.getLocation(address);
                                });
                                $("#modifyAddress").on("keydown",function (e) {
                                    if(e.keyCode == 13){
                                        var address = document.getElementById("modifyAddress").value;
                                        //通过getLocation();方法获取位置信息值
                                        geocoder1.getLocation(address);
                                    }
                                })

                            },
                            closeEvent: null,
                            isdrag: true,
                            buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelLocation'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'saveLocation'}]
                        });
                        // var qMap = new BMap.Map("map",{enableMapClick:false});
                        // var point = new BMap.Point(104.07,30.67);

                        //点击保存保存经纬度信息
                        $('#saveLocation').unbind().on('click',function(){
                            fullAddr = $('#locInfo p').eq(2).find('input').val();
                            latLng = $('#locInfo p').eq(0).find('input').val();
                            plantAddr = $('#locInfo p').eq(1).find('input').val();
                            $('input[name="plantFullAddress"]').val(fullAddr);
                            $('input[name="loaction"]').val(latLng);
                            $('input[name="plantAddr"]').val(plantAddr);
                            // that.getTxLatLng(that.country,1);
                            // that.getTxLatLng(that.province,2);
                            // that.getTxLatLng(that.city,3)
                            that.getTxLatLng(that.country,that.province,that.city)
                        })

                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner'}]
            });
            $.http.POST('/plantInfo/getPlantInfo.do',{plantId:that.plantId,tokenId:Cookies.getCook('tokenId')},function (res) {
                var op = '';
                var op1 = '';
                $.each(res.body.plantInfo.allTypeA,function(i,val){
                    op+='<option value="'+val.value+'">'+val.name+'</option>'
                });
                $('select[name="plantTypeA"]').html(op);
                $.each(res.body.plantInfo.allTypeB,function(i,val){
                    op1+='<option value="'+val.value+'">'+val.name+'</option>'
                });
                $('select[name="plantTypeB"]').html(op1);
               $("#plantInfoOfPlant").setForm(res.body.plantInfo);
                that.plantImgUrl = res.body.plantInfo.photo;
                //照片赋值
                $('#modifyUploadImgBox1').attr('src',res.body.plantInfo.photo[0]);
                $('#modifyUploadImgBox2').attr('src',res.body.plantInfo.photo[1]);
                $('#modifyUploadImgBox3').attr('src',res.body.plantInfo.photo[2]);
                var length = res.body.plantInfo.photo.length;
                switch (length){
                    case 1 :$('.num1').show();break;
                    case 2 :$('.num1').show();$('.num2').show();break;
                    case 3 :$('.closeImage').show();break;
                }
                $('select[name="plantTypeB"]').val(res.body.plantInfo.plantTypeB.value);
                $('select[name="plantTypeA"]').val(res.body.plantInfo.plantTypeA.value);
                //状态处理
                if(res.body.plantInfo.status==1){
                    $('i.qyi label').addClass('onLabel');
                    $('i.bi label').removeClass('onLabel');
                    $('textarea[name="plantIntroduction"]').show()
                }else{
                    $('i.qyi label').removeClass('onLabel');
                    $('i.bi label').addClass('onLabel');
                    $('textarea[name="plantIntroduction"]').hide()
                }
            });
            //状态判断
            $('.qyjj i').unbind().on('click',function(){
                $('.qyjj i label').removeClass('onLabel');
                var value = $(this).data('value');
                $(this).children('label').addClass('onLabel');
                if(value==1){
                    $('textarea[name="plantIntroduction"]').show()
                }else{
                    $('textarea[name="plantIntroduction"]').hide()
                }
            });
            //点击保存修改接口
            $('#saveOwner').unbind().on('click',function(){
                var obj = $('#plantInfoOfPlant').getForm();
                var changeImg = [];
                var $imgUrl = '';
                var addFlag = false;
                if(!$('#plantInfoOfPlant').valid()) return false;
                //判断哪些图片是修改了的或者新增加的
                if(that.plantImgUrl[0] && that.plantImgUrl[1]==undefined&&that.plantImgUrl[2]==undefined){
                    if($('#modifyUploadImgBox1').attr('src')!=that.plantImgUrl[0]){
                        changeImg.push(that.plantImgUrl[0])
                    }
                    if($('#modifyUploadImgBox2').attr('src')!='/images/setting/upload.png'||$('#modifyUploadImgBox3').attr('src')!='/images/setting/upload.png'){
                        addFlag = true
                    }
                }
                if(that.plantImgUrl[1] &&that.plantImgUrl[2]==undefined){
                    if($('#modifyUploadImgBox2').attr('src')!=that.plantImgUrl[1]){
                        changeImg.push(that.plantImgUrl[1])
                    }
                    if($('#modifyUploadImgBox1').attr('src')!=that.plantImgUrl[0]){
                        changeImg.push(that.plantImgUrl[0])
                    }
                    if($('#modifyUploadImgBox3').attr('src')!='/images/setting/upload.png'){
                        addFlag = true
                    }
                }
                if(that.plantImgUrl[2]){
                    if($('#modifyUploadImgBox2').attr('src')!=that.plantImgUrl[1]){
                        changeImg.push(that.plantImgUrl[1])
                    }
                    if($('#modifyUploadImgBox1').attr('src')!=that.plantImgUrl[0]){
                        changeImg.push(that.plantImgUrl[0])
                    }
                    if($('#modifyUploadImgBox3').attr('src')!=that.plantImgUrl[2]){
                        changeImg.push(that.plantImgUrl[2])
                    }
                }
                if(changeImg.length > 0){
                    $imgUrl = changeImg.join(';')
                }
                var modifyUp_img1 = $('#modifyUp_img1');
                var modifyUp_img2 = $('#modifyUp_img2');
                var modifyUp_img3 = $('#modifyUp_img3');
                //如果地理位置数组只有一个值的话 说明点了取消按钮 并没有重新定位 只有为四个值才是重新定位过后的
                if(that.administrative.length!=4){
                    that.administrative=[]
                }
                obj.administrative = that.administrative;
                obj.id = that.plantId;
                obj.orgId = that.orgId;
                obj.tokenId = Cookies.getCook('tokenId');
                obj.plantFullAddress = $('.item-group-plant input[name="plantFullAddress"]').val();
                var imgUrl1 = $('#modifyUploadImgBox1').attr('src');
                var imgUrl2 = $('#modifyUploadImgBox2').attr('src');
                var imgUrl3 = $('#modifyUploadImgBox3').attr('src');
                //调修改电站接口
                $.http.POST('/plantInfo/updatePlantInfo.do',obj,function(res){
                    //判断是否修改了图片
                    if(that.plantImgUrl.length>0){
                        if($imgUrl!='' || addFlag){
                            that.uploadImg1([modifyUp_img1,modifyUp_img2,modifyUp_img3],that,$imgUrl)
                        }else{
                            App.warningDialog(res.msg)
                            that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                        }
                    }else{
                        if(imgUrl1!='/images/setting/upload.png' || imgUrl2!='/images/setting/upload.png'||imgUrl3!='/images/setting/upload.png'){
                            that.uploadImg1([modifyUp_img1,modifyUp_img2,modifyUp_img3],that,$imgUrl)
                        }else{
                            App.warningDialog(res.msg)
                            that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                        }
                    }

                })

            })
        })
    },
    //组织分组
    ztreeShow:function (url,chooseId) {
        var treeNode;
        var that = this;
        $.fn.zTree.init($("#ztree"), setting,'');
        $.http.POST(url,{tokenId:Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            $.fn.zTree.init($("#ztree1"), setting, treeNode);
            //指定节点选中
            if(chooseId){
                var zTree = $.fn.zTree.getZTreeObj("ztree1");
                var node = zTree.getNodeByParam("id",chooseId);
                zTree.selectNode(node,true);//指定选中ID的节点
                zTree.expandNode(node, true, false);//指定选中ID节点展开
            }

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
        $("#searchOrgPlant").unbind().on("click",function () {
            if($("#key").val()){
                var zTree = $.fn.zTree.getZTreeObj("ztree1");
                var value = $("#key").val();
                var keyType = "name";
                var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                updateNodes(true,nodeList); //更新节点
            }
        });
        $("#key").unbind().on("keydown",function (e) {
            $.fn.zTree.getZTreeObj("ztree1").expandAll(false);
            if($("#key").val()){
                if(e.keyCode == 13){
                    var zTree = $.fn.zTree.getZTreeObj("ztree1");
                    var value = $("#key").val();
                    var keyType = "name";
                    var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                    updateNodes(true,nodeList); //更新节点
                }
            }
        });
        function updateNodes(highlight,nodeList) {
            var zTree = $.fn.zTree.getZTreeObj("ztree1");
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
            //鼠标移入 显示 添加和 删除按钮
            //console.log('tree',treeNode)
            var aObj = $("#" + treeNode.tId + IDMark_A);
            var id ;
            if(treeNode.id.indexOf('.')>-1){
                id = treeNode.id.split('.').join('')
            }else{
                id = treeNode.id
            }
            if ($("#diyBtn_"+id).length>0) return;
            //if(treeNode.check_Child_State=='-1') return
            if(treeNode.isPlant==true) return;
            var editStr = "<span style='width: 24px;' id='diyBtn_space_" +id+ "' >&nbsp;</span><span style='width: 24px;' class='button icon03' id='diyBtn_" +id+ "' title='"+treeNode.name+"' onfocus='this.blur();' permission = 'plantInfoManageNew'></span>";
            aObj.append(editStr);
            Menu.hasElementRight();
            var btn = $("#diyBtn_"+id);//添加按钮
           // var btn1 = $("#diy1Btn_"+treeNode.id);//删除按钮
            //删除按钮<span style='width: 24px;' class='button icon04' id='diy1Btn_" +treeNode.id+ "'title='"+treeNode.name+"' onfocus='this.blur();'></span>
            //鼠标移入 显示 添加和 删除按钮结束

            //添加电站按钮图标
            if(btn) btn.unbind().bind('click',function(){
                $('.addPlant').show();
                $('.noData').hide();
                $('.infoContent').hide();
                $('label.error').hide()
                //清空表單值
                $('#resetForm').trigger('click')
                if(url=='/plantInfo/getPlantTreeByOrg.do'){
                    $('input[name="org"]').val(treeNode.name);
                    that.orgId = treeNode.id
                }else{
                    $('input[name="org"]').val('');
                    that.orgId = treeNode.id
                }
                that.insertPlant()
            })
        }
        //鼠标移出事件 节点自定义图标隐藏
        function removeHoverDom(treeId, treeNode) {
            var id ;
            if(treeNode.id.indexOf('.')>-1){
                id = treeNode.id.split('.').join('')
            }else{
                id = treeNode.id
            }
            $("#diyBtn_"+id).unbind().remove();
            $("#diyBtn_space_" +id).unbind().remove();
        }
        //节点点击事件
        var log, className = "dark";
        function beforeClick(treeId, treeNode, clickFlag) {
            if(treeNode.isPlant==true){
                that.plantId = treeNode.id;
                that.plantName = treeNode.name;
                that.org = treeNode.getParentNode().name;
                that.orgId = treeNode.getParentNode().id;
                that.getPlantInfo({plantId:treeNode.id,tokenId:Cookies.getCook('tokenId')});
                $('.infoContent').show();
                $('.addPlant').hide();
                $('.noData').hide()
            }
        }
    },
    //地理位置弹窗模板--修改电站信息
    locationMap:function(){
        var mapL = '<div id="mapLocation">' +
            '<div id="map" style="width:1000px;height: 600px;position: absolute;left: 0;top: 0;"></div>'+
            '<div id="locInfo" style="z-index: 9999; width: 400px;position: absolute;left: 10px;top:10px;">' +
            '<div style="border: 4px solid rgb(149,218,243);border-radius: 4px;height: 96px">'+
            '<p><i><img src="/images/setting/plantManage/tellurion.png" alt=""></i>'+$.getI18n('location')+'<span>&nbsp;：</span><input/></p>'+
            '<p><i><img src="/images/setting/plantManage/site.png" alt=""></i><span>地<span style="visibility: hidden">你好</span>址</span>：<input/></p>'+
            '</div>'+
            '<div class="jg"></div>'+
            '<p style="background: #fff;color: #666;border: 4px solid rgb(220,218,206);border-radius: 4px"><span style="margin-left: 10px">'+$.getI18n('detailedAddress')+'</span><span>：</span><input style="background: #fff"/></p>'+
            '</div>'+
            '<div style="z-index: 9999; width: 344px;position: absolute;right: 130px;top:10px;background: #fff"><input id="modifyAddress" style="display: inline-block;width: 300px;height: 34px;outline: none;border: none" type="text" i18nOnly="placeholder" i18n="'+$.getI18n("cityAddress")+'" placeholder="'+$.getI18n("cityAddress")+'"> <img id="modifySearchMap" src="/images/newMain/search.png" alt=""></div>'+

            '</div>';
        return mapL;

    },
    //静态地址
    locationMap2:function(){
        var mapL = '<div id="mapLocation">' +
            '<div id="map" style="width:1000px;height: 600px;position: absolute;left: 0;top: 0;"></div>'+
            '<div id="locInfo" style="z-index: 9999; width: 400px;position: absolute;left: 10px;top:10px;">' +
            '<div style="border: 4px solid rgb(149,218,243);border-radius: 4px;height: 96px">'+
            '<p><i><img src="/images/setting/plantManage/tellurion.png" alt=""></i>'+$.getI18n('location')+'<span>&nbsp;：</span><input/></p>'+
            '<p><i><img src="/images/setting/plantManage/site.png" alt=""></i><span>地<span style="visibility: hidden">你好</span>址</span>：<input/></p>'+
            '</div>'+
            '<div class="jg"></div>'+
            '<p style="background: #fff;color: #666;border: 4px solid rgb(220,218,206);border-radius: 4px"><span style="margin-left: 10px">'+$.getI18n('detailedAddress')+'</span><span>：</span><input style="background: #fff"/></p>'+
            '</div>'+
            '</div>';
        return mapL;

    },
    //地理位置弹窗模板--新建电站信息
    locationMap1:function(){
        var mapL = '<div id="mapLocation1">' +
            '<div id="map1" style="width:1000px;height: 600px;position: absolute;left: 0;top: 0;"></div>'+
            '<div id="locInfo1" style="z-index: 9999; width: 400px;position: absolute;left: 10px;top:10px;">' +
            '<div style="border: 4px solid rgb(149,218,243);border-radius: 4px;height: 96px">'+
            '<p><i><img src="/images/setting/plantManage/tellurion.png" alt=""></i>'+$.getI18n('location')+'<span>&nbsp;：</span><input readonly/></p>'+
            '<p><i><img src="/images/setting/plantManage/site.png" alt=""></i><span>地<span style="visibility: hidden">你好</span>址</span>：<input readonly/></p>'+
            '</div>'+
            '<div class="jg"></div>'+
            '<p style="background: #fff;color: #666;border: 4px solid rgb(220,218,206);border-radius: 4px"><span style="margin-left: 10px">'+$.getI18n('detailedAddress')+'</span><span>：</span><input style="background: #fff"/></p>'+
            '</div>'+
             '<div style="z-index: 9999; width: 344px;position: absolute;right: 130px;top:10px;background: #fff"><input id="addAddress" style="display: inline-block;width: 300px;height: 34px;outline: none;border: none" type="text" i18nOnly="placeholder" i18n="'+$.getI18n("cityAddress")+'" placeholder="'+$.getI18n("cityAddress")+'"> <img id="AddSearchMap" src="/images/newMain/search.png" alt=""></div>'+

            '</div>';
        return mapL;

    },
    //定位查看静态信息
    staticLocation:function(data){
        var map ;
        var location = App.dialog({
            id:'locationMap',
            title: $.getI18n('addressMap'),
            width: 1000,
            height: 600,
            maxWidth: document.documentElement.clientWidth - 40,
            maxHeight: document.documentElement.clientHeight - 42,
            appendTo: 'body',
            backdrop: false,
            modal: true,
            keyboard: true,
            content:this.locationMap2() ,
            openEvent: function () {
                require(['MapUtil'],function (MapUtil) {
                    var item = data.loaction.split(',').reverse();
                    !map && (map = MapUtil.Instance('map', {
                        center: item || [],
                        zoomControl: false,
                        attributionControl: false,
                        layers: [L.tileLayer.provider('GaoDe.Normal.Map')],
                        zoom: 18,
                        controls: {
                            zoomControl: {
                                show: false
                            },
                            scaleControl: {
                                show: false
                            }
                        }
                    }).option.map);
                    var _marker = MapUtil.createMarker([item[0],item[1]],
                        {

                            isDivIcon: true,
                            className: 'plant-icon',
                            html: '<div class="plantIcon" style=""><div  class="plantImg plantIcon0"></div></div>',
                            // tooltip:item.name,
                            // tooltip:item.name,
                            iconSize: [32, 50],
                            riseOnHover:false
                        }
                    );
                    MapUtil.addMarker(map,_marker);
                })
            },
            closeEvent: null,
            isdrag: true,
            buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'}]
        });
        $('#locInfo p').eq(0).find('input').val(data.loaction).attr('readonly',true);
        $('#locInfo p').eq(1).find('input').val(data.plantAddr).attr('readonly',true);
        $('#locInfo p').eq(2).find('input').val(data.plantFullAddress).attr('readonly',true)
    },
    //预览图片
    fileUpLoad:function(_this,upBtn,imgShowBox) {
        var that = this;
        var ipt = document.getElementById(upBtn);
        var imgCont = document.getElementById(imgShowBox);
        var file = _this.files[0];
        var size = Math.round(file.size / 1024 / 1024);
        var showClose = "#"+imgShowBox;
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
            if($(showClose).attr('src')!='/images/setting/upload3.png'){
                $(showClose).siblings('img').show()
            }
        }
    },
    //图片上传多张 html在页面上
    uploadImg:function(ids,_this){
        var that = this;
        var pic = [];
        pic.push($(ids[0])[0].files[0]);
        pic.push($(ids[1])[0].files[0]);
        pic.push($(ids[2])[0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        !!pic[1] && fd.append('file', pic[1]);
        !!pic[2] && fd.append('file', pic[2]);
        $.ajax({
            url:'/plantInfo/uploadPlantPhoto.do?plantId='+_this.plantId+'&tokenId='+Cookies.getCook('tokenId'),
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                $('.infoContent').show();
                $('.addPlant').hide();
                $('.noData').hide();
                if(that.typeUrl==1){
                    that.ztreeShow('/plantInfo/getPlantTreeByOrg.do',that.plantId)
                }else{
                    that.ztreeShow('/plantInfo/getPlantTreeByArea.do',that.plantId)
                }
                that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                if(result.code==100){
                    // $('.infoContent').show();
                    // $('.addPlant').hide();
                    // $('.noData').hide();
                    App.warningDialog(result.msg)
                    // if(that.typeUrl==1){
                    //     that.ztreeShow('/plantInfo/getPlantTreeByOrg.do',that.plantId)
                    // }else{
                    //     that.ztreeShow('/plantInfo/getPlantTreeByArea.do',that.plantId)
                    // }
                    // that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                }else{
                    App.warningDialog('电站新增成功，图片上传失败')
                    // $('.infoContent').show();
                    // $('.addPlant').hide();
                    // $('.noData').hide();
                    // if(that.typeUrl==1){
                    //     that.ztreeShow('/plantInfo/getPlantTreeByOrg.do',that.plantId)
                    // }else{
                    //     that.ztreeShow('/plantInfo/getPlantTreeByArea.do',that.plantId)
                    // }
                    // that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                }
            }
        });
    },
    //图片上传多张 html是弹窗
    uploadImg1:function(ids,_this,imgUrl){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        pic.push(ids[1][0].files[0]);
        pic.push(ids[2][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        !!pic[1] && fd.append('file', pic[1]);
        !!pic[2] && fd.append('file', pic[2]);
        $.ajax({
            url:'/plantInfo/uploadPlantPhoto.do?plantId='+_this.plantId+'&tokenId='+Cookies.getCook('tokenId')+'&imgUrl='+imgUrl,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                App.warningDialog(result.msg);
                that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                // if(result.code==100){
                //     App.alert(result.msg);
                //     that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                // }else{
                //     App.alert(result.msg)
                //     that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                // }
            }
        });
    },
    //上传单张头像图片
    uploadSingleImg:function(_this,ids){
        var that = this;
        var pic = [];
        pic.push(ids[0][0].files[0]);
        var fd = new FormData();
        !!pic[0] && fd.append('file', pic[0]);
        $.ajax({
            url:'/user/uploadUserIcon.do?imgUrl='+_this.imgUrl+'&tokenId='+Cookies.getCook('tokenId')+'&userId='+_this.userId,
            type:"post",
            // Form数据
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success:function(result){
                if(result.code==100){
                    App.warningDialog(result.msg)
                    that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                }else{
                    App.warningDialog(result.msg,1)
                    that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')})
                }
            }
        });
    },
    //新建电站
    insertPlant:function(){
        $('#npInfo').validate();
        App.initValidate();
        var that = this;
        that.getAllType();
        that.getPriceType({tokenId:Cookies.getCook('tokenId'),plantType:1})
        //默认光伏电站 输入电价
        // $('#npInfo').find('.inputPrice').show()
        // $('#npInfo').find('.selectPrice').hide()
        // $('#npInfo').find('.seePrice').hide()
        //所属组织获取焦点时，弹出组织选择
        $('.orgDiv input').off('focus').on('focus',function(){
            var orgTree = App.dialog({
                title: $.getI18n('orgName'),
                width: 450,
                height: 600,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.orgTep() ,
                openEvent:function(){
                    //获取组织树
                    var treeNode;
                    //var that = this
                    $.http.POST('/org/getOrgTree.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
                        treeNode = result.body;
                        $.fn.zTree.init($("#orgTree"), setting, treeNode);
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
                        async:{
                            enable : true
                        },
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
                        //判断最终节点是否选择了电站
                        if(treeNode.isPlant==true){

                        }else{
                            that.plantId = '';
                            that.plantName = '';
                            that.org = treeNode.name;
                            that.orgId = treeNode.id
                        }

                    }
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('save'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                    $('input[name="org"]').val(that.org)
                    // $('input[name="plantName"]').val(that.plantName)
                }}]
            });
        });
        //地图定位
        $('#getAddr').unbind().on('click',function(){
            var address = App.dialog({
                title: $.getI18n('mapPosition'),
                width: 1000,
                height: 600,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.locationMap1() ,
                openEvent:function(){
                    //腾讯地图传值 纬经度
                    var _that  = that;
                    var center = new qq.maps.LatLng(39.9,116.3);
                    var qMap = new qq.maps.Map(document.getElementById('map1'),{
                        center: center,
                        zoom: 13
                    });
                    var locCb = {
                        complete:function(rs){
                            // console.log('rs1qq23',rs)
                            that.administrative = [];
                            that.administrative.push({
                                name:rs.detail.addressComponents.district,
                                value:rs.detail.location.lng+','+rs.detail.location.lat,
                                level:4
                            })
                        }
                    };
                    var geoc= new qq.maps.Geocoder(locCb);
                    var geocoder = new qq.maps.Geocoder({
                        complete:function(res){
                            qMap.setCenter(res.detail.location);
                            if(_that.addrMarker){
                                _that.addrMarker.setMap(null)
                            }
                            _that.addrMarker = new qq.maps.Marker({
                                map:qMap,
                                position: res.detail.location
                            });
                            var country = res.detail.addressComponents.country;
                            _that.country = country;
                            var province = res.detail.addressComponents.province;
                            _that.province = province;
                            var city = res.detail.addressComponents.city;
                            _that.city = city;
                            var district = res.detail.addressComponents.district;
                            _that.district = district;
                            var loc = res.detail.location.lng+','+res.detail.location.lat;
                            _that.loc = loc;
                            $('#locInfo1 p').eq(1).find('input').val(country+province+city+district).attr('readonly',true);
                            $('#locInfo1 p').eq(0).find('input').val(loc).attr('readonly',true);
                            $('#locInfo1 p').eq(2).find('input').attr('placeHolder',$.getI18n('inputFullAddress'));
                            geoc.getLocation(country+','+province+','+','+city+','+district)
                        }
                    });
                    qq.maps.event.addListener(
                        qMap,
                        'click',
                        function(e) {
                            //var loc = e.latLng.lng+","+e.latLng.lat;
                            var pt=new qq.maps.LatLng(e.latLng.lat,e.latLng.lng);
                            geocoder.getAddress(pt)
                        });
                    var geocoder1 = new qq.maps.Geocoder({
                        complete : function(res){
                            qMap.setCenter(res.detail.location);
                            if(_that.addrMarker){
                                _that.addrMarker.setMap(null)
                            }
                             _that.addrMarker = new qq.maps.Marker({
                                map:qMap,
                                position: res.detail.location
                            });
                            var country = res.detail.addressComponents.country;
                            _that.country = country;
                            var province = res.detail.addressComponents.province;
                            _that.province = province;
                            var city = res.detail.addressComponents.city;
                            _that.city = city;
                            var district = res.detail.addressComponents.district;
                            _that.district = district;
                            var loc = res.detail.location.lng+','+res.detail.location.lat;
                            _that.loc = loc;
                            $('#locInfo1 p').eq(1).find('input').val(country+province+city+district).attr('readonly',true);
                            $('#locInfo1 p').eq(0).find('input').val(loc).attr('readonly',true);
                            $('#locInfo1 p').eq(2).find('input').val('').attr('placeHolder',$.getI18n('inputFullAddress'));
                            geoc.getLocation(country+','+province+','+','+city+','+district)
                        }
                    });
                    $("#AddSearchMap").on("click",function () {
                        var address = document.getElementById("addAddress").value;
                        //通过getLocation();方法获取位置信息值
                        geocoder1.getLocation(address);
                    });
                    $("#addAddress").on("keydown",function (e) {
                        if(e.keyCode == 13){
                            var address = document.getElementById("addAddress").value;
                            //通过getLocation();方法获取位置信息值
                            geocoder1.getLocation(address);
                        }
                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner'},{text:$.getI18n('sure'),type:'imgNoBtn',clickToClose :true,id:'saveOwner',click:function(){
                    $('.plantItem input[name="loaction"]').val(that.loc);
                    $('.plantItem input[name="plantAddr"]').val(that.country+that.province+that.city+that.district);
                    $('.plantItem input[name="plantFullAddress"]').val($('#locInfo1 p').eq(2).find('input').val());
                    //没有定位就点击保存不做任何操作
                    if(that.country){
                        that.getTxLatLng(that.country,that.province,that.city)
                        // that.getTxLatLng(that.country,1);
                        // that.getTxLatLng(that.province,2);
                        // that.getTxLatLng(that.city,3)
                    }
                }}]
            });
        });
        //图片预览
        $("input[type = file]").on("change",function () {
            var _that = this;
            // if($(this))
            var id = '#'+$(this).siblings('img').attr('id')
            // console.log($(id).attr('src'))
            that.fileUpLoad(_that,$(this).attr('id'),$(this).siblings('img').attr('id'))
            // if($(id).attr('src')!='/images/setting/upload3.png'){
            //     $(this).siblings('img').show();
            // }
        });
        //删除图片
        $('.closeImageHtml').unbind().on('click',function(){
            $(this).siblings('img').attr('src','/images/setting/upload3.png');
            $(this).siblings('input').val('');
            if($(this).siblings('img').attr('src')=='/images/setting/upload3.png'){
                $(this).hide()
            }
        });
        //电站类型改变 电价设置跟着改变 装机容量跟这变
        $('#npInfo select[name="plantTypeA"]').unbind().on('change',function(){
            let type = $(this).val()
            that.getPriceType({plantType:type,tokenId:Cookies.getCook('tokenId')})
            // if(type==1){
            //     $('#npInfo').find('.inputPrice').show()
            //     $('#npInfo').find('.selectPrice').hide()
            //     $('#npInfo').find('.seePrice').hide()
            // }else{
            //     $('#npInfo').find('.inputPrice').hide()
            //     $('#npInfo').find('.selectPrice').show()
            //     $('#npInfo').find('.seePrice').show()
            //     //电价改变 查询出详情
            //     // $('#npInfo select[name="plantPrice"]').unbind().on('change',function(){
            //     //     if($(this).val()==""){
            //     //         App.alert('电价不能为空，请选择')
            //     //     }else{
            //     //         var priceId = $(this).val()
            //     //         let priceInfos = App.dialog({
            //     //             title: '电价详情',
            //     //             width: 500,
            //     //             height: 500,
            //     //             maxWidth: document.documentElement.clientWidth - 40,
            //     //             maxHeight: document.documentElement.clientHeight - 42,
            //     //             appendTo: 'body',
            //     //             backdrop: false,
            //     //             modal: true,
            //     //             keyboard: true,
            //     //             content:that.priceDetail() ,
            //     //             openEvent:function(){
            //     //                 $.http.POST('/plantInfo/getPlantPriceDetail.do',{id:priceId,tokenId:Cookies.getCook('tokenId')},function(res){
            //     //                     var th = ''
            //     //                     $.each(res.body,function(ind,value){
            //     //                         th+='<tr>'+
            //     //                             '<td style="text-indent: 30px">'+Number(ind+1)+'</td>'+
            //     //                             '<td>'+value.time+'</td>'+
            //     //                             '<td>'+value.pos+'</td>'+
            //     //                             '<td>'+value.neg+'</td>';
            //     //                     })
            //     //                     $('table.priceDetail').append(th)
            //     //                 })
            //     //             },
            //     //             closeEvent: null,
            //     //             isdrag: true,
            //     //             buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner',click:function(){
            //     //             }}]
            //     //         })
            //     //     }
            //     // })
            //     //点击查看电价详情 弹窗
            //     $('#seePrice').unbind().on('click',function(){
            //         let priceVal = $('#npInfo select[name="plantPrice"]').val()
            //         let priceInfos = App.dialog({
            //             title: '电价详情',
            //             width: 500,
            //             height: 500,
            //             maxWidth: document.documentElement.clientWidth - 40,
            //             maxHeight: document.documentElement.clientHeight - 42,
            //             appendTo: 'body',
            //             backdrop: false,
            //             modal: true,
            //             keyboard: true,
            //             content:that.priceDetail() ,
            //             openEvent:function(){
            //                 $.http.POST('/plantInfo/getPlantPriceDetail.do',{id:priceVal,tokenId:Cookies.getCook('tokenId')},function(res){
            //                     var th = ''
            //                     $.each(res.body,function(ind,value){
            //                         th+='<tr>'+
            //                             '<td style="text-indent: 30px">'+Number(ind+1)+'</td>'+
            //                             '<td>'+value.time+'</td>'+
            //                             '<td>'+value.pos+'</td>'+
            //                             '<td>'+value.neg+'</td>';
            //                     })
            //                     $('table.priceDetail').append(th)
            //                 })
            //             },
            //             closeEvent: null,
            //             isdrag: true,
            //             buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner',click:function(){
            //             }}]
            //         })
            //     })
            // }
        })
        //查看电价规则
        $('#seePrice').unbind().on('click',function(){
            let priceVal = $('#npInfo select[name="plantPrice"]').val()
            let priceInfos = App.dialog({
                title: '电价详情',
                width: 500,
                height: 500,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content:that.priceDetail() ,
                openEvent:function(){
                    $.http.POST('/plantInfo/getPlantPriceDetail.do',{id:priceVal,tokenId:Cookies.getCook('tokenId')},function(res){
                        var th = ''
                        $.each(res.body,function(ind,value){
                            th+='<tr>'+
                                '<td style="text-indent: 30px">'+Number(ind+1)+'</td>'+
                                '<td>'+value.time+'</td>'+
                                '<td>'+value.pos+'</td>'+
                                '<td>'+value.neg+'</td>';
                        })
                        $('table.priceDetail').append(th)
                    })
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('close'),type:'imgNoBtn',clickToClose :true,id:'cancelOwner',click:function(){
                }}]
            })
        })
        //点击保存按钮  调新增接口
        $('#savePlant').unbind().on('click',function(){
            var newData = $('#npInfo').getForm();
            newData.orgId  = that.orgId;
            newData.tokenId  = Cookies.getCook('tokenId');
            newData.administrative  = that.administrative;
            newData.plantFullAddress  = $('.plantItem input[name="plantFullAddress"]').val();
            if(!$('#npInfo').valid()) return false;
            if(!$.trim($('.plantItem input[name="plantAddr"]').val())){
                App.alert($.getI18n('pleasePosition'));
                return false;
            }
            if(!$.trim($('.plantItem select[name="plantPrice"]').val())){
                App.alert('电价不能为空,请选择');
                return false;
            }
            $.http.POST('/plantInfo/insertPlantInfo.do',newData,function(res){
                //console.log(res)
                that.plantId = res.body.plantId;
                that.plantName = $('#npInfo input[name="plantName"]').val();
                that.org = $('#npInfo input[name="org"]').val();
                if($('#addImgBox1').attr('src')!='/images/setting/upload3.png' || $('#addImgBox2').attr('src')!='/images/setting/upload3.png'||$('#addImgBox3').attr('src')!='/images/setting/upload3.png'){
                    //上传图片
                    that.uploadImg(["#add_img1","#add_img2","#add_img3"],that)
                }else{
                    App.warningDialog(res.msg)
                    //先更新树
                    if(that.typeUrl==1){
                        that.ztreeShow('/plantInfo/getPlantTreeByOrg.do',that.plantId)
                    }else{
                        that.ztreeShow('/plantInfo/getPlantTreeByArea.do',that.plantId)
                    }
                    that.getPlantInfo({plantId:that.plantId,tokenId:Cookies.getCook('tokenId')});
                    $('.infoContent').show();
                    $('.addPlant').hide();
                    $('.noData').hide()
                }
               // that.ztreeShow('/plantInfo/getPlantTreeByOrg.do')
            })
        });
        //点击取消 回到上一个界面
        $('#cancelPlant').unbind().on('click',function(){
            $('.addPlant').hide();
            $('.infoContent').hide();
            $('.noData').show()
        })
    },
    //电站类型
    getAllType:function(){
        var oa = '';
        var ob = '';
        $.http.POST('/plantInfo/getAllPlantType.do',{tokenId:Cookies.getCook('tokenId')},function(res){
            $.each(res.body[0],function(i,val){
                oa+='<option value="'+val.id+'">'+val.name+'</option>'
            });
            $.each(res.body[1],function(i,val){
                ob+='<option value="'+val.id+'">'+val.name+'</option>'
            });
            $('.plantItem select[name="plantTypeA"]').html(oa);
            $('.plantItem select[name="plantTypeB"]').html(ob)
        })
    },
    //电价类型
    getPriceType:function(obj){
        var oa = '';
        var ob='';
        $.http.POST('/plantInfo/getCnPlantPrice.do',obj,function(res){
            $.each(res.body,function(i,val){
                oa+='<option value="'+val.id+'">'+val.name+'</option>'
            });
            $('select[name="plantPrice"]').html(oa);
        })
        if(obj.plantType==1){
            ob='<option value="KW">KW</option>\n' +
                '<option value="MW">MW</option>\n' +
                '<option value="GW">GW</option>'
        }else{
            ob = '<option value="kWh">kWh</option>'+
                '<option value="gWh">gWh</option>'+
                '<option value="gWh">mWh</option>'
        }
        $('select[name="capUnit"]').html(ob);
    },
    //电价详情弹窗模板
    priceDetail:function(){
        var  detailTep = '<table class="priceDetail">\n' +
            '            <thead>\n' +
            '                <tr>\n' +
            '                    <th>序号</th>\n' +
            '                    <th>时间</th>\n' +
            '                    <th>上网电价</th>\n' +
            '                    <th>下网电价</th>\n' +
            '                </tr>\n' +
            '            </thead>\n' +
            '            <tbody>\n' +
            '            \n' +
            '            </tbody>\n' +
            '        </table>'
        return detailTep
    },
    //所属组织弹窗信息
    orgTep:function(){
        var orgTep = '<div id="orgTree" class="ztree"></div>';
        return orgTep
    },
    //获取腾讯经纬度
    getTxLatLng:function(country,province,city){
        var that = this
        $.http.POST('/login/getAddrLocation.do',{addrName:country},function(res){
            that.administrative.push({
                name:res.body.addrName,
                value:res.body.lng+','+res.body.lat,
                level:1
            });
            $.http.POST('/login/getAddrLocation.do',{addrName:province},function(result){
                that.administrative.push({
                    name:result.body.addrName,
                    value:result.body.lng+','+result.body.lat,
                    level:2
                });
                $.http.POST('/login/getAddrLocation.do',{addrName:city},function(result1){
                    that.administrative.push({
                        name:result1.body.addrName,
                        value:result1.body.lng+','+result1.body.lat,
                        level:3
                    });
                })
            })
        })
    }
};