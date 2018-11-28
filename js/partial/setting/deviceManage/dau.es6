/**
 * Created by SP0014 on 2018/1/16.
 * 设备管理-数据采集器
 */
define(function () {
    return dau;
});
var dau = {
    dauTable: '',//数据采集器表格
    dauDetailTable: '',//数采详情表格
    delId: [], //要删除的设备id
    delIds: [], //要删除的下联设备id
    plantId: '', //电站id
    orgId: '',
    chooseOrg: '', //选中的组织
    chooseOrgId: '', //选中的组织id
    detailTable: '', //数据采集器详情table
    closeOr: true, //是否关闭弹窗
    allName: '',//所有数采型号
    orderFlag: true,
    collType: "",//编辑数采时判断弹窗该显示何种数采信息，自研数采2，畅洋数采1
    maxLength: "",//编辑数采时从后台获取当前数采最大设备数
    Render: function () {
        var that = this;
        that.ztreeShow('/plantInfo/getPlantTreeByOrg.do');
        that.getAllDauName();
        //删除按钮
        $('#deleteDau').unbind().on('click', function () {
            var ids = '';
            that.delId = [];
            $("#dauTable tbody tr").each(function () {
                if ($(this).find("img").attr("src") == "images/repImages/rect1.png") {
                    that.delId.push($(this).find("img").data('id'));
                    $(this).remove()
                }
            });
            ids = that.delId.join(',');
            if (ids == '') {
                App.alert($.getI18n('Please select the device to delete'));
                return
            }
            $.http.POST('/device/deleteCollectors.do', {ids: ids, tokenId: Cookies.getCook('tokenId')}, function (res) {
                App.warningDialog(res.msg)
                that.getData({
                    plantId: that.plantId,
                    deviceName: '',
                    status: '',
                    tokenId: Cookies.getCook('tokenId'),
                    orgId: that.orgId
                })
            })
        });
        //模糊搜索
        $('a.searchDevice').unbind().on('click', function () {
            var deviceName = $('input[name="deviceName"]').val();
            var status = $('select[name="status"]').val();
            that.getData({
                plantId: that.plantId,
                deviceName: deviceName,
                status: status,
                tokenId: Cookies.getCook('tokenId'),
                orgId: that.orgId
            })
        });
        //新增数采按钮
        $('a#addDau').unbind().on('click', function () {
            that.addNewDau()
        })
    },
    getData: function (obj) {
        if (this.dauTable) {
            $("#dauTable tbody ").off('click');
            this.dauTable.fnClearTable(false);
            this.dauTable.fnDestroy()
        }
        var columns = [
            {
                data: "deviceId", "render": function (data, type, full, meta) {
                return '<img class="checkImg" style="width: 16px;height: 16px;" data-id="' + data + '" src="images/repImages/rect.png">';
            }
            },
            {data: "deviceName", title: $.getI18n('deviceName')},
            {data: "modelId", title: $.getI18n('model'), width: '12%'},
            {data: "sn", title: $.getI18n('sn')},
            {
                data: "orgName", title: $.getI18n('orgName'), render: function (data) {
                return '<div class="td-noWrap-dau" title="' + data + '">' + data + '</div>'
            }
            },
            {
                data: "plantName", title: $.getI18n('plantName'), render: function (data) {
                return '<div class="td-noWrap-dau" title="' + data + '">' + data + '</div>'
            }
            },
            {data: "connTime", title: $.getI18n('accessTime')},
            {
                data: "status", title: $.getI18n('status'), render: function (data) {
                if (data == 1) {
                    return '<span style="color:#29AD00">' + $.getI18n('enable') + '</span>'
                } else {
                    return '<span>' + $.getI18n('noEnable') + '</span>'
                }
            }
            }
        ];
        if (!!window.systemRole['dataLoggerEdit']) {
            columns.push(
                {
                    data: 'deviceId', "title": $.getI18n('operate'), render: function (data) {
                    return '<a style="width: 50px;display: inline-block;background:rgba(48,166,250,.5);color: #fff;height: 26px;line-height: 26px;text-align: center;" class="modifyInverter" data-id="' + data + '">' + $.getI18n('modify') + '</a>'
                }
                })
        }
        this.dauTable = $('#dauTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getCollectors.do',
                //data:obj,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.deviceName = obj.deviceName;
                    d.plantId = obj.plantId;
                    d.status = obj.status;
                    d.tokenId = obj.tokenId;
                    d.orgId = obj.orgId;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort: false,
            bInfo: false,
            pageLength: 10,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: true,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
            headerCallback: function (thead, data, start, end, display) {
                checkAll()
            },
        });

        //checkAll选择全部
        function checkAll() {
            $(".checkall").on("click", function () {
                if ($(this).attr("src") == "images/repImages/rect1.png") {
                    $(this).attr("src", "images/repImages/rect.png");
                    $(".checkImg").attr("src", "images/repImages/rect.png")

                } else {
                    $(this).attr("src", "images/repImages/rect1.png");
                    $(".checkImg").attr("src", "images/repImages/rect1.png")
                    // $("#example tbody tr").each(function () {
                    //     let row = $("table#example tr").index($(this));
                    //     let cruId = _this.data[row-1].id
                    //     _this.deleteArr.push(cruId)
                    // })
                    // console.log(_this.deleteArr)
                }
            })
        }

        //单行点击选中当前行
        $("#dauTable tbody ").on("click", 'tr', function (e) {
            var curImg = $(this).find("img").eq(0);
            if (curImg.attr("src") == "images/repImages/rect1.png") {
                curImg.attr("src", "images/repImages/rect.png")
            } else {
                curImg.attr("src", "images/repImages/rect1.png")
            }
            e.stopPropagation()
        });
        //点击编辑按钮，执行编辑操作
        var that = this;
        $('#dauTable tbody').on('click', 'td a.modifyInverter', function (e) {
            var index = $(this).parent('td').parent('tr').index();
            var data = that.dauTable.api(true).row(index).data();
            var id = that.dauTable.api(true).row(index).data().deviceId;
            that.collType = that.dauTable.api(true).row(index).data().sn
            var btns = [{text: $.getI18n('cancel'), type: 'imgNoBtn', clickToClose: true, id: 'cancelOwner'}, {
                text: $.getI18n('save'), type: 'imgNoBtn', id: 'saveOwner', click: function () {
                    var obj = $('#dauForm').getForm();
                    var type = 0
                    that.modifySaveInfo(obj, that, type, id)

                }
            }]
            if (that.collType[3] == 2) {
                btns.push({
                    text: '保存并下发点表', type: 'imgNoBtn', click: function () {
                        var obj = $('#dauForm').getForm();
                        var type = 1
                        that.modifySaveInfo(obj, that, type, id)
                    }
                })
            }
            if (Cookies.getCook('roleId') == 4) {
                var dau = App.dialog({
                    title: $.getI18n('modifyDau'),
                    id: 'modifyDau',
                    width: 900,
                    height: 600,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content: that.dauTep(),
                    openEvent: function () {
                        // $('#dauForm .maxLengthInput').hide()
                        //判断table显示自研信息还是畅洋信息
                        if (that.collType[3] == 2) {
                            $('.addTable  .usePoint').hide()
                            $('.addTable  .devOrder').html("通讯地址")
                        } else {
                            $('.addTable  .serialPort').hide()
                            $('.addTable  .devOrder').html("设备顺序")
                        }
                        //赋值
                        $('#dauForm select[name="topModelId"]').html(that.allName);
                        $('#dauForm').setForm(data);
                        $('#dauForm select[name="topModelId"]').val(data.modelRealId);
                        //根据组织查询出电站
                        $.http.POST('/device/plantIdofOrg4Device.do', {
                            orgId: data.orgId,
                            tokenId: Cookies.getCook('tokenId')
                        }, function (res) {
                            var op1 = '';
                            $.each(res.body.data, function (i, val) {
                                op1 += '<option value="' + val.plantId + '">' + val.plantName + '</option>'
                            });
                            $('.dauDiv select[name="plantId"]').html(op1);
                            $('.dauDiv select[name="plantId"]').val(data.plantId)
                        });
                        //获取原有下联设备信息
                        var th = '';
                        $.http.POST('/device/getDevicesUnderColl.do', {
                            id: id,
                            tokenId: Cookies.getCook('tokenId'),
                            collType: that.collType[3]
                        }, function (res) {
                            if (res.body) {
                                that.maxLength = res.body.maxLength
                                $('#modifyDau').find('input[name="maxLength"]').val(res.body.maxLength)
                                $.each(res.body.data, function (i, val) {
                                    var str = '';
                                    var arr = [];
                                    var id = '#' + 'oldTr' + i;
                                    //设备类型
                                    $.each(res.body.data[i].deviceDefault, function (ind, value) {
                                        if (value.typeId == val.typeId) {
                                            str += '<option value="' + value.typeId + '" selected>' + value.typeName + '</option>'
                                        } else {
                                            str += '<option value="' + value.typeId + '">' + value.typeName + '</option>'
                                        }
                                        arr.push(value.typeId)
                                    });
                                    if (arr.contains(val.typeId)) {

                                    } else {
                                        str += '<option value="' + val.typeId + '" class="dis"  selected>' + val.typeName + '</option>'
                                    }
                                    //设备型号
                                    var str1 = '';
                                    var arr1 = [];
                                    $.each(res.body.data[i].modelDefault, function (ind, value1) {
                                        if (value1.modelId == val.modelId) {
                                            str1 += '<option value="' + value1.modelId + '" selected>' + value1.modelName + '</option>'
                                        } else {
                                            str1 += '<option value="' + value1.modelId + '">' + value1.modelName + '</option>'
                                        }
                                        arr1.push(value1.modelId)
                                    });
                                    if (arr1.contains(val.modelId)) {

                                    } else {
                                        str1 += '<option value="' + val.modelId + '" selected  class="dis">' + val.modelName + '</option>'
                                        // var id1 = '#'+'oldTr'+i
                                    }
                                    //使用点表
                                    var str2 = '';
                                    var arr2 = [];
                                    if (res.body.data[i].modeDefault) {
                                        $.each(res.body.data[i].modeDefault, function (ind, value2) {
                                            if (value2.modeId == val.modeId) {
                                                str2 += '<option value="' + value2.modeId + '" selected>' + value2.modeName + '</option>'
                                            } else {
                                                str2 += '<option value="' + value2.modeId + '">' + value2.modeName + '</option>'
                                            }
                                            arr2.push(value2.modeId)
                                        });
                                        if (arr2.contains(val.modeId)) {

                                        } else {
                                            str2 += '<option value="' + val.modeId + '"  class="dis" selected>' + val.modeName + '</option>'
                                        }
                                    } else {//serialPortId
                                        $.each(res.body.data[i].serialPortDefault, function (ind, value2) {
                                            if (value2.serialPortId == val.serialPortId) {
                                                str2 += '<option value="' + value2.serialPortId + '" selected>' + value2.serialPortName + '</option>'
                                            } else {
                                                str2 += '<option value="' + value2.serialPortId + '">' + value2.serialPortName + '</option>'
                                            }
                                        });
                                    }
                                    th += '<tr id="oldTr' + i + '"><td class="changeCheck"><img class="checkall" src="images/repImages/rect.png" data-id="' + val.deviceId + '" style="width: 16px;height: 16px"></td>' +
                                        '<td><input name="deviceName" value="' + val.deviceName + '" class="hasBorder"/></td>' +
                                        // '<td><input name="typeName" value="'+val.typeName+'"/><input style="display: none" name="modelId" value="'+val.modelId+'"/></td>'+
                                        '<td><select name="typeId">' + str + '</select></td>' +
                                        '<td style="width: 200px"><select name="modelId">' + str1 + '</select></td>' +
                                        '<td><input name="deviceSN" value="' + val.deviceSN + '" class="hasBorder"></td>' +
                                        '<td class="modeSelect"><select name="modeId">' + str2 + '</select></td>' +
                                        '<td class="serialPortSelect"><select name="serialPort">' + str2 + '</select></td>' +
                                        '<td><input style="display: none" name="deviceId" value="' + val.deviceId + '"><input style="display: none" name="typeId1" value="' + val.typeId + '"><input name="subDeviceOrder" value="' + val.subDeviceOrder + '" ></td>' +
                                        '</tr>'
                                });
                                $('.addTable tbody').append(th);
                                if (that.collType[3] == 2) {
                                    $('.addTable tbody .modeSelect').hide()
                                } else {
                                    $('.addTable tbody .serialPortSelect').hide()
                                }
                                // $that.getTrLen('.addTable')
                                //修改信息 级联选择
                                $('tr select[name="typeId"]').unbind().on('change', function (e) {
                                    var $this = $(this);
                                    var _this = $this.parent('td').parent('tr');
                                    var typeId = $(this).val();
                                    $that.getSubModel(_this, typeId);
                                    e.stopPropagation()
                                });
                                $('tr select[name="modeId"]').unbind().on('change', function (e) {
                                    if ($(this).find('option:selected').attr('disabled') == true) {
                                    }
                                    e.stopPropagation()
                                });
                                $('tr select[name="modelId"]').unbind().on('change', function (e) {
                                    var $this = $(this).parent('td').parent('tr');
                                    var typeId = $this.find('select[name="typeId"]').val();
                                    var modelId = $(this).val();
                                    if (that.collType[3] == 1) {
                                        $that.getSubPointTable($this, typeId, modelId);
                                    }
                                    e.stopPropagation()
                                });
                                //切换选中状态
                                $('.addTable tbody tr ').unbind().on('click', 'td.changeCheck', function () {
                                    that.changeRect($(this))
                                })
                            } else {
                                $('#modifyDau').find('input[name="maxLength"]').val(0)
                                App.warningDialog(res.msg)
                            }
                        });
                        var $that = that;
                        var i = 0;
                        //点击新增按钮 增加一行
                        $('#addRow').unbind().on('click', function () {
                            /*if ($('.addTable tbody tr').length >= Number(that.maxLength)) {
                                App.alert(`当前数采最多接入${that.maxLength}个设备`)
                                return false
                            }*/
                            i++;
                            var prevTr = '#' + 'trIndex' + Number(i - 1);
                            if ($(prevTr).find('select[name="typeId"]').val() == '' || $(prevTr).find('input[name="subDeviceOrder"]').val() == '') {
                                App.alert($.getI18n('writeInfoThenAdd'));
                                i--;
                                return
                            }
                            var trLength = $('.addTable tbody tr ').length
                            $('#dauForm input[name="maxLength"]').val(++trLength)
                            var thtml = '';
                            var modifyIndex1 = 0
                            var modifyIndex2 = 0
                            $('.addTable tbody tr td').find("select[name='serialPort']").each(function () {
                                var val = $(this).val()
                                if (val == "串口1") {
                                    modifyIndex1++
                                } else {
                                    modifyIndex2++
                                }
                            })
                            if (modifyIndex1 >= 5) {
                                thtml = '<tr id="trIndex' + i + '">' +
                                    '<td class="changeCheck"><img class="checkall" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                    '<td><input name="deviceName" class="hasBorder"/></td>' +
                                    '<td><select name="typeId"><option value="">' + $.getI18n('pleaseChoose') + '</option></select></td>' +
                                    '<td style="width: 200px"><select name="modelId"><option value="">' + $.getI18n('pleaseChoose') + '</option></select></td>' +
                                    '<td><input name="deviceSN" class="hasBorder"/></td>' +
                                    '<td class="modeSelect1"><select name="modeId">' + $.getI18n('pleaseChoose') + '</select></td>' +
                                    '<td class="serialPortSelect2"><select name="serialPort">' +
                                    '<option value="1">串口1</option>' +
                                    '<option value="2" selected>串口2</option>' +
                                    '</select></td>' +
                                    '<td><input name="subDeviceOrder" i18nOnly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder" /></td>' +
                                    '</tr>';
                            }
                            else {
                                thtml = '<tr id="trIndex' + i + '">' +
                                    '<td class="changeCheck"><img class="checkall" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                    '<td><input name="deviceName" class="hasBorder"/></td>' +
                                    '<td><select name="typeId"><option value="">' + $.getI18n('pleaseChoose') + '</option></select></td>' +
                                    '<td style="width: 200px"><select name="modelId"><option value="">' + $.getI18n('pleaseChoose') + '</option></select></td>' +
                                    '<td><input name="deviceSN" class="hasBorder"/></td>' +
                                    '<td class="modeSelect1"><select name="modeId">' + $.getI18n('pleaseChoose') + '</select></td>' +
                                    '<td class="serialPortSelect2"><select name="serialPort">' +
                                    '<option value="1">串口1</option>' +
                                    '<option value="2">串口2</option>' +
                                    '</select></td>' +
                                    '<td><input name="subDeviceOrder" i18nOnly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder" /></td>' +
                                    '</tr>';
                            }
                            $('.addTable tbody').append(thtml);
                            if (that.collType[3] == 2) {
                                $('.addTable tbody .modeSelect1').remove()

                                if (!$('#saveSPOwner').length) {
                                    $('#modifyDau .modal-footer').append('<button class="btn modal-btn imgNoBtn" id="saveSPOwner" aria-hidden="true">保存并下发点表</button>')
                                    $('#saveSPOwner').unbind('click').on('click', function () {
                                        var obj = $('#dauForm').getForm();
                                        var type = 1 //区分是仅保存还是保存并下发点表
                                        that.saveInfo(obj, that, type)
                                    })
                                }
                            } else {
                                $('#saveSPOwner').length && $('#saveSPOwner').remove()
                                $('.addTable tbody .serialPortSelect2').remove()
                            }
                            var curTr = '#' + 'trIndex' + i;
                            $that.getSubDeviceType($(curTr));
                            $(curTr).find('select[name="typeId"]').unbind().on('change', function (e) {
                                var typeId = $(this).val();
                                $that.getSubModel($(curTr), typeId);
                                // $(curTr).find('select[name="modelId"]').change()
                                e.stopPropagation()
                            });
                            $(curTr).find('select[name="modelId"]').unbind().on('change', function (e) {
                                var typeId = $(curTr).find('select[name="typeId"]').val();
                                var modelId = $(this).val();
                                if (that.collType[3] == 1) {
                                    $that.getSubPointTable($(curTr), typeId, modelId);
                                }
                                e.stopPropagation()
                            });
                            //切换选中状态
                            $('.addTable tbody tr ').unbind().on('click', 'td.changeCheck', function () {
                                that.changeRect($(this))
                            })
                        });
                        //点击全选  选中所有
                        $('.checkAll').unbind().on('click', function (e) {
                            if ($(this).find('img').attr('src') == 'images/repImages/rect1.png') {
                                $(this).find('img').attr('src', 'images/repImages/rect.png');
                                that.canselCheckSub()
                            } else {
                                $(this).find('img').attr('src', 'images/repImages/rect1.png');
                                that.checkAllSub()
                            }

                        });
                        //点击删除按钮删除下联设备
                        $('#delRow').unbind().on('click', function (e) {
                            that.deleteSubDevice()
                        });
                        //修改电站所属组织
                        $('input[name="orgName"]').unbind().on('click', function (e) {
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
                                content: that.orgTep(),
                                openEvent: function () {
                                    //获取组织树
                                    var treeNode;
                                    //var that = this
                                    $.http.POST('/org/getOrgTree.do', {tokenId: Cookies.getCook('tokenId')}, function (result) {
                                        treeNode = result.body;
                                        $.fn.zTree.init($("#orgTree"), setting, treeNode);
                                    });
                                    var setting = {
                                        isSimpleData: true,              //数据是否采用简单 Array 格式，默认false
                                        treeNodeKey: "id",               //在isSimpleData格式下，当前节点id属性
                                        treeNodeParentKey: "pId",        //在isSimpleData格式下，当前节点的父节点id属性
                                        showLine: true,                  //是否显示节点间的连线
                                        checkable: true,               //每个节点上是否显示 CheckBox
                                        callback: {
                                            beforeClick: beforeClick,
                                        },
                                        async: {
                                            enable: true
                                        },
                                    };

                                    function setFontCss(treeId, treeNode) {
                                        return treeNode.level == 0 ? {color: "#333", "font-size": "20px"} : {};
                                    }

                                    function getFont(treeId, node) {
                                        return node.font ? node.font : {};
                                    }

                                    //节点点击事件
                                    var log, className = "dark";

                                    function beforeClick(treeId, treeNode, clickFlag) {
                                        //判断最终节点是否选择了电站
                                        if (treeNode.isPlant == true) {
                                            App.alert('请选择组织')
                                        } else {
                                            that.org = treeNode.name;
                                            that.orgId = treeNode.id;
                                            that.chooseOrg = treeNode.name;
                                            that.chooseOrgId = treeNode.id;
                                            data.orgId = treeNode.id;
                                            $.http.POST('/device/plantIdofOrg4Device.do', {
                                                orgId: treeNode.id,
                                                tokenId: Cookies.getCook('tokenId')
                                            }, function (res) {
                                                var op = '';
                                                $.each(res.body.data, function (i, val) {
                                                    op += '<option value="' + val.plantId + '">' + val.plantName + '</option>'
                                                });
                                                $('.dauDiv select[name="plantId"]').html(op)
                                            })
                                            // that.plantId = ''
                                            // that.plantName = ''
                                            // that.org = treeNode.name
                                            // that.orgId = treeNode.id
                                        }

                                    }
                                },
                                closeEvent: null,
                                isdrag: true,
                                buttons: [{
                                    text: $.getI18n('cancel'),
                                    type: 'imgNoBtn',
                                    clickToClose: true,
                                    id: 'cancelOwner'
                                }, {
                                    text: $.getI18n('save'),
                                    type: 'imgNoBtn',
                                    clickToClose: true,
                                    id: 'saveOwner',
                                    click: function () {
                                        $('input[name="orgName"]').val(that.org);
                                        $('input[name="plantName"]').val(that.plantName)
                                    }
                                }]
                            });
                        })
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: btns
                });
                e.stopPropagation()
            } else {
                var dau = App.dialog({
                    title: $.getI18n('modifyDau'),
                    id: 'modifyDau1',
                    width: 900,
                    height: 600,
                    maxWidth: document.documentElement.clientWidth - 40,
                    maxHeight: document.documentElement.clientHeight - 42,
                    appendTo: 'body',
                    backdrop: false,
                    modal: true,
                    keyboard: true,
                    content: that.dauTep1(),
                    openEvent: function () {
                        //赋值
                        $('#dauForm1 select[name="topModelId"]').html(that.allName);
                        $('#dauForm1').setForm(data);
                        $('#dauForm1 select[name="topModelId"]').val(data.modelRealId);
                        //根据组织查询出电站
                        $.http.POST('/device/plantIdofOrg4Device.do', {
                            orgId: data.orgId,
                            tokenId: Cookies.getCook('tokenId'),
                            collType: that.collType[3]
                        }, function (res) {
                            var op1 = '';
                            $.each(res.body.data, function (i, val) {
                                op1 += '<option value="' + val.plantId + '">' + val.plantName + '</option>'
                            });
                            $('.dauDiv select[name="plantId"]').html(op1)
                            $('.dauDiv select[name="plantId"]').val(data.plantId)
                        });
                        // $('select[name="topModelId"]').val(data.modelId)
                        //$('select[name="deviceName"]').val(data.deviceName)
                        var $that = that;
                        //点击全选  选中所有
                        $('.checkAll').unbind().on('click', function (e) {
                            if ($(this).find('img').attr('src') == 'images/repImages/rect1.png') {
                                $(this).find('img').attr('src', 'images/repImages/rect.png');
                                that.canselCheckSub()
                            } else {
                                $(this).find('img').attr('src', 'images/repImages/rect1.png');
                                that.checkAllSub()
                            }
                        });
                        //获取原有下联设备信息
                        var th = '';
                        $.http.POST('/device/getDevicesUnderColl.do', {
                            id: id,
                            tokenId: Cookies.getCook('tokenId'),
                            collType: that.collType[3]
                        }, function (res) {
                            if (res.body) {
                                $('#modifyDau1').find('input[name="maxLength"]').val(res.body.maxLength)
                                $.each(res.body.data, function (i, val) {
                                    var str = '';
                                    var arr = [];
                                    var id = '#' + 'oldTr' + i;
                                    //设备类型
                                    $.each(res.body.data[i].deviceDefault, function (ind, value) {
                                        if (value.typeId == val.typeId) {
                                            str += '<option value="' + value.typeId + '" selected>' + value.typeName + '</option>'
                                        } else {
                                            str += '<option value="' + value.typeId + '">' + value.typeName + '</option>'
                                        }
                                        arr.push(value.typeId)
                                    });
                                    if (arr.contains(val.typeId)) {

                                    } else {
                                        str += '<option value="' + val.typeId + '" class="dis"  selected>' + val.typeName + '</option>'
                                    }
                                    //设备型号
                                    var str1 = '';
                                    var arr1 = [];
                                    $.each(res.body.data[i].modelDefault, function (ind, value1) {
                                        if (value1.modelId == val.modelId) {
                                            str1 += '<option value="' + value1.modelId + '" selected>' + value1.modelName + '</option>'
                                        } else {
                                            str1 += '<option value="' + value1.modelId + '">' + value1.modelName + '</option>'
                                        }
                                        arr1.push(value1.moduleId)
                                    });
                                    if (arr1.contains(val.modelId)) {
                                        $(id).find('select[name="modelId"]').html(str1);
                                        $(id).find('select[name="modelId"]').val(val.modelId)
                                    } else {
                                        str1 += '<option value="' + val.modelId + '" selected  class="dis">' + val.modelName + '</option>';
                                        // var id1 = '#'+'oldTr'+i
                                        $(id).find('select[name="modelId"]').html(str1);
                                        $(id).find('select[name="modelId"]').val(val.modelId)
                                    }
                                    //使用电表
                                    //使用点表
                                    var str2 = '';
                                    var arr2 = [];
                                    if (res.body.data[i].modeDefault) {
                                        $.each(res.body.data[i].modeDefault, function (ind, value2) {
                                            if (value2.modeId == val.modeId) {
                                                str2 += '<option value="' + value2.modeId + '" selected>' + value2.modeName + '</option>'
                                            } else {
                                                str2 += '<option value="' + value2.modeId + '">' + value2.modeName + '</option>'
                                            }
                                            arr2.push(value2.modeId)
                                        });
                                        if (arr2.contains(val.modeId)) {

                                        } else {
                                            str2 += '<option value="' + val.modeId + '"  class="dis" selected>' + val.modeName + '</option>'
                                        }
                                    } else {//serialPortId
                                        $.each(res.body.data[i].serialPortDefault, function (ind, value2) {
                                            if (value2.serialPortId == val.serialPortId) {
                                                str2 += '<option value="' + value2.serialPortId + '" selected>' + value2.serialPortName + '</option>'
                                            } else {
                                                str2 += '<option value="' + value2.serialPortId + '">' + value2.serialPortName + '</option>'
                                            }
                                        });
                                    }
                                    th += '<tr id="oldTr' + i + '"><td class="changeCheck"><img class="checkall" src="images/repImages/rect.png" data-id="' + val.deviceId + '" style="width: 16px;height: 16px"></td>' +
                                        '<td><input disabled name="deviceName" class="hasBorder" value="' + val.deviceName + '"/></td>' +
                                        // '<td><input name="typeName" value="'+val.typeName+'"/><input style="display: none" name="modelId" value="'+val.modelId+'"/></td>'+
                                        '<td><select name="typeId" disabled>' + str + '</select></td>' +
                                        '<td><select name="modelId" disabled>' + str1 + '</select></td>' +
                                        '<td><input disabled name="deviceSN" class="hasBorder" value="' + val.deviceSN + '"></td>' +
                                        '<td class="modeSelect"><select name="modeId" disabled>' + str2 + '</select></td>' +
                                        '<td class="serialPortSelect"><select name="serialPort" disabled>' + str2 + '</select></td>' +
                                        '<td><input style="display: none" name="deviceId" value="' + val.deviceId + '"><input name="subDeviceOrder" value="' + val.subDeviceOrder + '" readonly></td>' +
                                        '</tr>'
                                });
                                $('.addTable tbody').append(th);
                                if (that.collType[3] == 2) {
                                    $('.addTable tbody .modeSelect').remove()
                                } else {
                                    $('.addTable tbody .serialPortSelect').remove()
                                }
                                $that.getTrLen('.addTable')
                                //修改信息 级联选择
                                $('tr select[name="typeId"]').unbind().on('change', function (e) {
                                    var $this = $(this);
                                    var _this = $this.parent('td').parent('tr');
                                    var typeId = $(this).val();
                                    $that.getSubModel(_this, typeId);
                                    // _this.find('select[name="modelId"]').change()
                                    e.stopPropagation()
                                });
                                $('tr select[name="modelId"]').unbind().on('change', function (e) {
                                    var $this = $(this).parent('td').parent('tr');
                                    var typeId = $this.find('select[name="typeId"]').val();
                                    var modelId = $(this).val();
                                    $that.getSubPointTable($this, typeId, modelId);
                                    e.stopPropagation()
                                });
                                //切换选中状态
                                $('.addTable tbody tr ').unbind().on('click', 'td.changeCheck', function () {
                                    that.changeRect($(this))
                                })
                            } else {
                                $('#modifyDau1').find('input[name="maxLength"]').val(0)
                                App.warningDialog(res.msg, 1)
                            }
                        });
                        //修改电站所属组织
                        $('input[name="orgName"]').unbind().on('click', function (e) {
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
                                content: that.orgTep(),
                                openEvent: function () {
                                    //获取组织树
                                    var treeNode;
                                    //var that = this
                                    $.http.POST('/org/getOrgTree.do', {tokenId: Cookies.getCook('tokenId')}, function (result) {
                                        treeNode = result.body;
                                        $.fn.zTree.init($("#orgTree"), setting, treeNode);
                                    });
                                    var setting = {
                                        isSimpleData: true,              //数据是否采用简单 Array 格式，默认false
                                        treeNodeKey: "id",               //在isSimpleData格式下，当前节点id属性
                                        treeNodeParentKey: "pId",        //在isSimpleData格式下，当前节点的父节点id属性
                                        showLine: true,                  //是否显示节点间的连线
                                        checkable: true,               //每个节点上是否显示 CheckBox
                                        callback: {
                                            beforeClick: beforeClick,
                                        },
                                        async: {
                                            enable: true
                                        },
                                    };

                                    function setFontCss(treeId, treeNode) {
                                        return treeNode.level == 0 ? {color: "#333", "font-size": "20px"} : {};
                                    }

                                    function getFont(treeId, node) {
                                        return node.font ? node.font : {};
                                    }

                                    //节点点击事件
                                    var log, className = "dark";

                                    function beforeClick(treeId, treeNode, clickFlag) {
                                        //判断最终节点是否选择了电站
                                        if (treeNode.isPlant == true) {
                                            App.alert('请选择组织')
                                        } else {
                                            that.org = treeNode.name;
                                            that.orgId = treeNode.id;
                                            that.chooseOrg = treeNode.name;
                                            that.chooseOrgId = treeNode.id;
                                            data.orgId = treeNode.id;
                                            $.http.POST('/device/plantIdofOrg4Device.do', {
                                                orgId: treeNode.id,
                                                tokenId: Cookies.getCook('tokenId')
                                            }, function (res) {
                                                var op = '';
                                                $.each(res.body.data, function (i, val) {
                                                    op += '<option value="' + val.plantId + '">' + val.plantName + '</option>'
                                                });
                                                $('.dauDiv select[name="plantId"]').html(op)
                                            })
                                        }

                                    }
                                },
                                closeEvent: null,
                                isdrag: true,
                                buttons: [{
                                    text: $.getI18n('cancel'),
                                    type: 'imgNoBtn',
                                    clickToClose: true,
                                    id: 'cancelOwner'
                                }, {
                                    text: $.getI18n('save'),
                                    type: 'imgNoBtn',
                                    clickToClose: true,
                                    id: 'saveOwner',
                                    click: function () {
                                        $('input[name="orgName"]').val(that.org);
                                        $('input[name="plantName"]').val(that.plantName)
                                    }
                                }]
                            });
                        });
                    },
                    closeEvent: null,
                    isdrag: true,
                    buttons: [{text: $.getI18n('cancel'), type: 'imgNoBtn', clickToClose: true, id: 'cancelOwner'}, {
                        text: $.getI18n('save'), type: 'imgNoBtn', id: 'saveOwner', click: function () {
                            var obj = $('#dauForm1').getForm();
                            //获取每一行的值
                            var subDevice = [];
                            $('.addTable tbody tr').each(function (i) {
                                var object = 'obj' + (i + 1);
                                object = {};
                                $(this).children('td').each(function (j) {
                                    $(this).children().each(function (k) {
                                        var name = $(this)[0].name;
                                        //非空验证
                                        if (name == 'typeId') {
                                            if ($(this).val() == '' || $(this).val() == undefined) {
                                                App.alert('设备类型不能为空，请选择');
                                                that.orderFlag = false;
                                                return false
                                            } else {
                                                that.orderFlag = true
                                            }
                                        }
                                        if (!that.orderFlag) return false
                                        if (name == 'modelId') {
                                            if ($(this).val() == undefined || $(this).val() == '') {
                                                App.alert('型号不能为空，请选择');
                                                that.orderFlag = false;
                                                return false
                                            } else {
                                                that.orderFlag = true
                                            }
                                        }
                                        if (!that.orderFlag) return false
                                        if (name == 'modeId') {
                                            if ($(this).val() == undefined || $(this).val() == '') {
                                                App.alert('使用点表不能为空，请选择');
                                                that.orderFlag = false;
                                                return false
                                            } else {
                                                that.orderFlag = true
                                            }
                                        }
                                        if (!that.orderFlag) return false
                                        if (name == 'subDeviceOrder') {
                                            if ($(this).val() == '') {
                                                App.alert($.getI18n('devOrderRequired'));
                                                that.orderFlag = false;
                                                return false
                                            } else {
                                                that.orderFlag = true
                                            }
                                        }
                                        if (!that.orderFlag) return false
                                        object[name] = $(this).val()
                                    })
                                });
                                if (!that.orderFlag) return false
                                subDevice[i] = object
                            });
                            //判断是否分配了电站
                            if (obj.plantId) {
                                obj.plantId = obj.plantId
                            } else {
                                obj.plantId = ''
                            }
                            obj.subDevice = subDevice;
                            obj.tokenId = Cookies.getCook('tokenId');
                            obj.orgId = data.orgId;
                            obj.collId = id;
                            obj.collName = obj.deviceName;
                            obj.collSN = obj.sn;
                            obj.modelId = obj.topModelId;
                            obj.deletedIds = that.delIds.join(',');
                            if (!that.orderFlag) return false;
                            $.http.POST('/device/updateCollAndSubDev.do', obj, function (res) {
                                if (res.code == 100) {
                                    $('#modifyDau1').modal("hide");
                                    App.warningDialog(res.msg)
                                    that.getData({
                                        plantId: that.plantId,
                                        deviceName: '',
                                        status: '',
                                        tokenId: Cookies.getCook('tokenId'),
                                        orgId: that.orgId
                                    })
                                } else {
                                    App.warningDialog(res.msg, 1)
                                }
                            }, true, true)
                        }
                    }]
                });
                e.stopPropagation()
            }
        });
        // //状态操作
        // $('#dauTable tbody').on('click','td img.statusImg',function(e){
        //     //console.log($(this).parent('td').parent('tr').index())
        //     var index = $(this).parent('td').parent('tr').index()
        //     //console.log(that.inverterTable.api(true).row( index).data())
        //     var deviceId = that.dauTable.api(true).row( index).data().deviceId;
        //     var status;
        //     if($(this).attr('src')=='/images/setting/enabled_1.png'){
        //         $(this).attr('src','/images/setting/notenabled_1.png')
        //         status=0
        //     }else{
        //         $(this).attr('src','/images/setting/enabled_1.png')
        //         status=1
        //     }
        //     //更新状态
        //     $.http.POST('/device/updateCollector.do',{status:status,deviceId:deviceId,tokenId:Cookies.getCook('tokenId')},function(res){
        //         App.alert(res.msg)
        //     })
        //     e.stopPropagation()
        // });
        //双击查看数据采集器详情
        $("#dauTable tbody ").unbind('dblclick').on('dblclick', 'tr', function (e) {
            var title = $(this).find('td').eq(1).text();
            var id = $(this).find('td').eq(0).find('img').data('id');
            var index = $(this).index();
            var data = that.dauTable.api(true).row(index).data();
            var sn = that.dauTable.api(true).row(index).data().sn
            var detailTable = App.dialog({
                title: title,
                width: 900,
                height: 480,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content: that.detailDauTep(),
                openEvent: function () {
                    var ht = $("#dauDetailTable .detailSer")
                    that.dauDetailTableData({id: id, tokenId: Cookies.getCook('tokenId')}, sn[3]);
                    if (sn[3] == 2) {
                        ht.text("串口号")
                        $("#dauDetailTable .detailOrder").html("通讯地址")
                    }
                    $('#dauDetailForm').setForm(data)
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text: $.getI18n('cancel'), type: 'imgNoBtn', clickToClose: true, id: 'cancelOwner'}]
            });
            e.stopPropagation()
        })
    },
    //新增数据采集器弹窗 sysadmin登录
    dauTep: function () {
        var dauTep = '<form id="dauForm">' +
            '<div class="dauDiv" style="margin-top: 0px"><b>*</b><lable>' + $.getI18n('dauName') + '<span>：</span></label><input name="deviceName" id="" required></div>' +
            '<div class="dauDiv" style="margin-top: 0px"><b>*</b><lable>' + $.getI18n('dauSn') + '<span>：</span></label><input i18nOnly="placeholder" i18n="' + $.getI18n('inputDauSn') + '" placeholder="' + $.getI18n('inputDauSn') + '" name="sn" required/></div>' +
            '<div class="dauDiv" style="margin-top: 0px"><b>*</b><lable>' + $.getI18n('dauModel') + '<span style="visibility: hidden">看</span><span>：</span></label><select name="topModelId" required></select></div>' +
            '<div class="dauDiv"><b>*</b><lable>' + $.getI18n('orgName') + '<span>：</span></label><input i18nOnly="placeholder" i18n="' + $.getI18n('chooseOrgName') + '" placeholder="' + $.getI18n('chooseOrgName') + '" name="orgName" required style="cursor: pointer"/></div>' +
            '<div class="dauDiv"><b style="color: #fff">*</b><lable>' + $.getI18n('plantName') + '<span>：</span></label><select name="plantId" id=""></select></div>' +
            '<div class="dauDiv maxLengthInput"><b>*</b><lable>接入设备数<span>：</span></label><input name="maxLength" class="checkNumber" placeholder="请输入整数" id="" required/></div>' +
            // '<div class="dauDiv"><b>*</b><lable>'+$.getI18n('ass.maxNumber')+'<span>：</span></label><input type="text" class="changeRow"></div>'+
            '</form>' +
            '<div>' +
            '<div class="ownerHead">' +
            '<span>' + $.getI18n('subDevInfo') + '</span>' +
            '<span id="addRow">' + $.getI18n('add') + '</span>' +
            '<span id="delRow">' + $.getI18n('delete') + '</span>' +
            '</div>' +
            '<table style="margin-top: 10px" class="addTable device">' +
            '<thead>' +
            '<tr>' +
            '<th class="checkAll">' +
            '<img class="checkall" src="images/repImages/rect.png" style="width: 16px;height: 16px">' +
            '</th>' +
            '<th>' + $.getI18n('subDev') + '</th>' +
            '<th>' + $.getI18n('deviceType') + '</th>' +
            '<th>' + $.getI18n('model') + '</th>' +
            '<th>' + $.getI18n('devSn') + '</th>' +
            '<th class="usePoint">' + $.getI18n('usePoint') + '</th>' +
            '<th class="serialPort">串口号</th>' +
            '<th class="devOrder">' + $.getI18n('devOrder') + '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody></tbody>' +
            '</table>';
        '</div>';
        return dauTep
    },
    //修改数采弹窗 非sysadmin
    dauTep1: function () {
        var dauTep = '<form id="dauForm1">' +
            '<div class="dauDiv"><b style="color: #fff">*</b><lable>' + $.getI18n('dauName') + '<span>：</span></label><input name="deviceName" id=""></div>' +
            '<div class="dauDiv"><b></b><lable>' + $.getI18n('dauSn') + '<span>：</span></label><input i18nOnly="placeholder" i18n="' + $.getI18n('inputDauSn') + '" placeholder="' + $.getI18n('inputDauSn') + '" name="sn" disabled/></div>' +
            '<div class="dauDiv" ><b></b><lable>' + $.getI18n('dauModel') + '<span>：</span></label><select name="topModelId" disabled></select></div>' +
            '<div class="dauDiv"><b></b><lable>' + $.getI18n('orgName') + '<span>：</span></label><input i18nOnly="placeholder" i18n="' + $.getI18n('chooseOrgName') + '" placeholder="' + $.getI18n('chooseOrgName') + '" name="orgName" disabled style="cursor: pointer"/></div>' +
            '<div class="dauDiv"><b></b><lable>' + $.getI18n('plantName') + '<span>：</span></label><select name="plantId" id="" disabled></select></div>' +
            '<div class="dauDiv maxLengthInput"><lable>接入设备数<span>：</span></label><input name="maxLength" class="checkNumber" placeholder="请输入整数" id="" disabled/></div>' +
            '</form>' +
            '<div>' +
            '<div class="ownerHead">' +
            '<span>' + $.getI18n('subDevInfo') + '</span>' +
            // '<span id="addRow">新增</span>'+
            // '<span id="delRow">删除</span>'+
            '</div>' +
            '<table style="margin-top: 10px" class="addTable device disabledSelect">' +
            '<thead>' +
            '<tr>' +
            '<th class="checkAll">' +
            '<img class="checkall" src="images/repImages/rect.png" style="width: 16px;height: 16px">' +
            '</th>' +
            '<th>' + $.getI18n('subDev') + '</th>' +
            '<th>' + $.getI18n('deviceType') + '</th>' +
            '<th>' + $.getI18n('model') + '</th>' +
            '<th>' + $.getI18n('devSn') + '</th>' +
            '<th>' + $.getI18n('usePoint') + '</th>' +
            '<th>' + $.getI18n('devOrder') + '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody></tbody>' +
            '</table>';
        '</div>';
        return dauTep
    },
    //新增数采
    addNewDau: function () {
        var that = this;
        var dau = App.dialog({
            title: $.getI18n('addDau'),
            id: 'addDauNew',
            width: 900,
            height: 480,
            maxWidth: document.documentElement.clientWidth - 40,
            maxHeight: document.documentElement.clientHeight - 42,
            appendTo: 'body',
            backdrop: false,
            modal: true,
            keyboard: true,
            content: that.dauTep(),
            openEvent: function () {
                $('#dauForm').validate();
                App.initValidate();
                var sn = $('#addDauNew input[name="sn"]')
                var val
                $(sn).on("blur", function () {
                    if (val) {
                        if (val[3] != $(this).val()[3]) {
                            $('.addTable tbody').empty()
                            $('#dauForm input[name="maxLength"]').val("")
                        }
                    }
                    val = $(this).val()
                })
                //可接设备数变化 自动添加行数
                var timeoutId = 0;
                $('#dauForm input[name="maxLength"]').on('input', function () {
                    var _this = $(this)
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function () {
                        if (!_this.valid()) return false
                        var rowNum = _this.val()
                        $('.addTable tbody').empty()
                        var trHtml = ''
                        if (sn.val().length >= 4) {
                            if (sn.val()[3] == 1) {//畅洋数采的情况
                                $('#saveSPOwner').length && $('#saveSPOwner').remove()
                                $("#addDauNew table .serialPort").hide()
                                $("#addDauNew table .usePoint").show()
                                $("#addDauNew table .devOrder").html("设备顺序")
                                for (var n = 0; n < rowNum; n++) {
                                    trHtml += '<tr id="trIndexRow' + n + '">' +
                                        '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                        '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                        '<td class="getTypeName"><select name="typeId"></select></td>' +
                                        '<td style="width: 200px"><select name="modelId"></select></td>' +
                                        '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                        '<td ><select name="modeId"></select></td>' +
                                        '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder" value="' + (n + 1) + '"/></td>' +
                                        '</tr>';
                                }
                                $('.addTable tbody').append(trHtml);
                            } else if (sn.val()[3] == 2) {
                                if (_this.val() > 10) {
                                    _this.val("")
                                    App.alert("请输入小于等于10的整数")
                                    return false
                                }
                                $("#addDauNew table .serialPort").show()
                                $("#addDauNew table .usePoint").hide()
                                $("#addDauNew table .devOrder").html("通讯地址")
                                for (var n = 0; n < rowNum; n++) {
                                    if (n <= 4) {
                                        trHtml += '<tr id="trIndexRow' + n + '">' +
                                            '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                            '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                            '<td class="getTypeName"><select name="typeId"></select></td>' +
                                            '<td style="width: 200px"><select name="modelId"></select></td>' +
                                            '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                            '<td><select name="serialPort">' +
                                            '<option value="1" selected>串口1</option>' +
                                            '<option value="2">串口2</option>' +
                                            '</select></td>' +
                                            // '<td><input name="serialPort" class="hasBorder"/></td>'+
                                            '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder" value="' + (n + 1) + '"/></td>' +
                                            '</tr>';
                                    } else {
                                        trHtml += '<tr id="trIndexRow' + n + '">' +
                                            '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                            '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                            '<td class="getTypeName"><select name="typeId"></select></td>' +
                                            '<td style="width: 200px"><select name="modelId"></select></td>' +
                                            '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                            '<td><select name="serialPort">' +
                                            '<option value="1">串口1</option>' +
                                            '<option value="2" selected>串口2</option>' +
                                            '</select></td>' +
                                            // '<td><input name="serialPort" class="hasBorder"/></td>'+
                                            '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder" value="' + (n - 4) + '"/></td>' +
                                            '</tr>';
                                    }
                                }
                                $('.addTable tbody').append(trHtml);

                                if (!$('#saveSPOwner').length) {
                                    $('#addDauNew .modal-footer').append('<button class="btn modal-btn imgNoBtn" id="saveSPOwner" aria-hidden="true">保存并下发点表</button>')
                                    $('#saveSPOwner').unbind('click').on('click', function () {
                                        var obj = $('#dauForm').getForm();
                                        var type = 1 //区分是仅保存还是保存并下发点表
                                        that.saveInfo(obj, that, type)
                                    })
                                }
                            } else {
                                _this.val("")
                                App.alert("请先输入正确的数采编号")
                            }
                            $that.getDauInfo(1);
                            $('.addTable tbody tr td.getTypeName').unbind().on('click', function () {
                                var curIndex = $(this).parent('tr').index()
                                var curTr1 = '#' + 'trIndexRow' + curIndex;
                                $(curTr1).find('select[name="typeId"]').unbind().on('change', function (e) {
                                    var typeId = $(this).val();
                                    $that.getSubModel($(curTr1), typeId);
                                    // $(curTr1).find('select[name="modelId"]').change()
                                    e.stopPropagation()
                                });
                                $(curTr1).find('select[name="modelId"]').unbind().on('change', function (e) {
                                    var typeId = $(curTr1).find('select[name="typeId"]').val();
                                    var modelId = $(this).val();
                                    $that.getSubPointTable($(curTr1), typeId, modelId);
                                    e.stopPropagation()
                                });
                            })
                            //切换选中状态
                            $('.addTable tbody tr ').unbind().on('click', 'td.changeCheck', function () {
                                that.changeRect($(this))
                            })
                        } else {
                            _this.val("")
                            App.alert("请先输入正确的数采编号")
                        }
                    }, 500)
                })
                //点击新增按钮 增加一行
                var $that = that;
                var i = 0;
                var thtml = '';
                $('#addRow').unbind().on('click', function () {
                    var trLength = $('.addTable tbody tr ').length
                    $('#dauForm input[name="maxLength"]').val(trLength)
                    i = parseInt(Math.random() * 1000000)
                    var flag1 = false
                    var flag2 = false
                    if (sn.val().length >= 4) {
                        if (sn.val()[3] == 1) {//畅洋数采的情况

                            $('#saveSPOwner').length && $('#saveSPOwner').remove()
                            $("#addDauNew table .serialPort").hide()
                            $("#addDauNew table .usePoint").show()
                            $("#addDauNew table .devOrder").html("设备顺序")
                            i++;
                            var prevTr = '#' + 'trIndex' + Number(i - 1);
                            $('.addTable tbody tr ').find('input[name="subDeviceOrder"]').each(function () {
                                if (!$(this).val()) {
                                    flag1 = false
                                    return false
                                } else {
                                    flag1 = true
                                    return true
                                }
                            })
                            $('.addTable tbody tr ').find('select[name="typeId"]').each(function () {
                                if (!$(this).val()) {
                                    flag2 = false
                                    return false
                                } else {
                                    flag2 = true
                                    return true
                                }
                            })
                            if (trLength) {
                                if (!flag1 || !flag2) {
                                    App.alert($.getI18n('writeInfoThenAdd'));
                                    i--;
                                    return
                                }
                            }
                            thtml = '<tr id="trIndex' + i + '">' +
                                '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                '<td><select name="typeId"></select></td>' +
                                '<td style="width: 200px"><select name="modelId"></select></td>' +
                                '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                '<td><select name="modeId"></select></td>' +
                                '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder checkNumber"value="' + (trLength + 1) + '"/></td>' +
                                '</tr>';
                            $('.addTable tbody').append(thtml);
                            $('#dauForm input[name="maxLength"]').val(trLength + 1)

                        } else if (sn.val()[3] == 2) {
                            if (!$('#saveSPOwner').length) {
                                $('#addDauNew .modal-footer').append('<button class="btn modal-btn imgNoBtn" id="saveSPOwner" aria-hidden="true">保存并下发点表</button>')
                                $('#saveSPOwner').unbind('click').on('click', function () {
                                    var obj = $('#dauForm').getForm();
                                    var type = 1 //区分是仅保存还是保存并下发点表
                                    that.saveInfo(obj, that, type)
                                })
                            }
                            /*if ($('#dauForm input[name="maxLength"]').val() >= 10) {
                                App.alert("最多设备数为10个")
                                return false
                            }*/
                            $("#addDauNew table .serialPort").show()
                            $("#addDauNew table .usePoint").hide()
                            $("#addDauNew table .devOrder").html("通讯地址")
                            var index1 = 0
                            var index2 = 0
                            $('.addTable tbody tr ').find('select[name="serialPort"]').each(function (i, val) {
                                if ($(this).val() == "1") {
                                    index1++
                                } else {
                                    index2++
                                }
                            })
                            if (index1 >= 5) {
                                thtml = '<tr id="trIndex' + i + '">' +
                                    '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                    '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                    '<td><select name="typeId"></select></td>' +
                                    '<td style="width: 200px"><select name="modelId"></select></td>' +
                                    '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                    '<td><select name="serialPort">' +
                                    '<option value="1">串口1</option>' +
                                    '<option value="2" selected>串口2</option>' +
                                    '</select></td>' +
                                    '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder checkNumber"value="' + (index2 + 1) + '"/></td>' +
                                    '</tr>';
                            } else if (index2 >= 5) {
                                thtml = '<tr id="trIndex' + i + '">' +
                                    '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                    '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                    '<td><select name="typeId"></select></td>' +
                                    '<td style="width: 200px"><select name="modelId"></select></td>' +
                                    '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                    '<td><select name="serialPort">' +
                                    '<option value="1" selected>串口1</option>' +
                                    '<option value="2">串口2</option>' +
                                    '</select></td>' +
                                    '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder checkNumber"value="' + (index1 + 1) + '"/></td>' +
                                    '</tr>';
                            } else {
                                thtml = '<tr id="trIndex' + i + '">' +
                                    '<td class="changeCheck"><img class="" src="images/repImages/rect.png" style="width: 16px;height: 16px"></td>' +
                                    '<td><input name="subDeviceName" class="hasBorder"/></td>' +
                                    '<td><select name="typeId"></select></td>' +
                                    '<td style="width: 200px"><select name="modelId"></select></td>' +
                                    '<td><input name="subDeviceSN" class="hasBorder"/></td>' +
                                    '<td><select name="serialPort">' +
                                    '<option value="1" selected>串口1</option>' +
                                    '<option value="2">串口2</option>' +
                                    '</select></td>' +
                                    '<td><input name="subDeviceOrder" i18nOyly="placeholder" i18n="' + $.getI18n('required') + '" placeholder="' + $.getI18n('required') + '" class="hasBorder checkNumber"value="' + (index1 + 1) + '"/></td>' +
                                    '</tr>';
                            }
                            $('.addTable tbody').append(thtml);
                            $('#dauForm input[name="maxLength"]').val(trLength + 1)
                        } else {
                            App.alert("请先输入正确的数采编号")
                        }
                        var curTr = '#' + 'trIndex' + i;
                        // $that.getSubDeviceType($(curTr));
                        $that.getDauInfo(0, $(curTr));
                        $(curTr).find('select[name="typeId"]').unbind().on('change', function (e) {
                            var typeId = $(this).val();
                            $that.getSubModel($(curTr), typeId);
                            // $(curTr).find('select[name="modelId"]').change()
                            e.stopPropagation()
                        });
                        $(curTr).find('select[name="modelId"]').unbind().on('change', function (e) {
                            var typeId = $(curTr).find('select[name="typeId"]').val();
                            var modelId = $(this).val();
                            $that.getSubPointTable($(curTr), typeId, modelId);
                            e.stopPropagation()
                        });
                        //切换选中状态
                        $('.addTable tbody tr ').unbind().on('click', 'td.changeCheck', function () {
                            that.changeRect($(this))
                        })
                    } else {
                        App.alert("请先输入正确的数采编号")
                    }
                });
                //点击全选  选中所有
                $('.checkAll').unbind().on('click', function (e) {
                    if ($(this).find('img').attr('src') == 'images/repImages/rect1.png') {
                        $(this).find('img').attr('src', 'images/repImages/rect.png');
                        that.canselCheckSub()
                    } else {
                        $(this).find('img').attr('src', 'images/repImages/rect1.png');
                        that.checkAllSub()
                    }

                });
                //点击删除按钮删除下联设备
                $('#delRow').unbind().on('click', function (e) {
                    that.deleteSubDevice()
                });
                //所属电站 所属组织
                $('input[name="orgName"]').val(that.org);
                that.getPlantByOrg(that.orgId, that.plantId);
                //修改组织弹窗树
                $('input[name="orgName"]').unbind().on('click', function (e) {
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
                        content: that.orgTep(),
                        openEvent: function () {
                            //获取组织树
                            var treeNode;
                            //var that = this
                            $.http.POST('/org/getOrgTree.do', {tokenId: Cookies.getCook('tokenId')}, function (result) {
                                treeNode = result.body;
                                $.fn.zTree.init($("#orgTree"), setting, treeNode);
                            });
                            var setting = {
                                isSimpleData: true,              //数据是否采用简单 Array 格式，默认false
                                treeNodeKey: "id",               //在isSimpleData格式下，当前节点id属性
                                treeNodeParentKey: "pId",        //在isSimpleData格式下，当前节点的父节点id属性
                                showLine: true,                  //是否显示节点间的连线
                                checkable: true,               //每个节点上是否显示 CheckBox
                                callback: {
                                    beforeClick: beforeClick,
                                },
                                async: {
                                    enable: true
                                },
                            };

                            function setFontCss(treeId, treeNode) {
                                return treeNode.level == 0 ? {color: "#333", "font-size": "20px"} : {};
                            }

                            function getFont(treeId, node) {
                                return node.font ? node.font : {};
                            }

                            //节点点击事件
                            var log, className = "dark";

                            function beforeClick(treeId, treeNode, clickFlag) {
                                //判断最终节点是否选择了电站
                                if (treeNode.isPlant == true) {
                                    App.alert('请选择组织')
                                    // that.plantId = treeNode.id
                                    // that.plantName = treeNode.name
                                    // that.org = treeNode.getParentNode().name
                                    // that.orgId = treeNode.getParentNode().id
                                } else {
                                    // console.log(treeNode.id)
                                    that.org = treeNode.name;
                                    that.orgId = treeNode.id;
                                    that.chooseOrg = treeNode.name;
                                    that.chooseOrgId = treeNode.id;
                                    // data.orgId =  treeNode.id
                                    $.http.POST('/device/plantIdofOrg4Device.do', {
                                        orgId: treeNode.id,
                                        tokenId: Cookies.getCook('tokenId')
                                    }, function (res) {
                                        var op = '<option value="">请选择电站</option>';
                                        $.each(res.body.data, function (i, val) {
                                            op += '<option value="' + val.plantId + '">' + val.plantName + '</option>'
                                        });
                                        $('.dauDiv select[name="plantId"]').html(op)
                                    })
                                    // that.plantId = ''
                                    // that.plantName = ''
                                    // that.org = treeNode.name
                                    // that.orgId = treeNode.id
                                }

                            }
                        },
                        closeEvent: null,
                        isdrag: true,
                        buttons: [{
                            text: $.getI18n('cancel'),
                            type: 'imgNoBtn',
                            clickToClose: true,
                            id: 'cancelOwner'
                        }, {
                            text: $.getI18n('save'),
                            type: 'imgNoBtn',
                            clickToClose: true,
                            id: 'saveOwner',
                            click: function () {
                                $('input[name="orgName"]').val(that.org);
                                $('input[name="plantName"]').val(that.plantName)
                            }
                        }]
                    });
                });
                //所属电站获取焦点的时候，如果所属组织为空，则不能填写
                $('input[name="plantName"]').unbind().on('focus', function (e) {
                    if ($('input[name="orgName"]').val() == '') {
                        App.alert('请先选择所属组织')
                    }
                });
                //查询出所有数采名称，并赋值
                $.http.POST('/device/getAllCollNames.do', {tokenId: Cookies.getCook('tokenId')}, function (res) {
                    var op = '';
                    $.each(res.body.data, function (i, val) {
                        op += '<option value="' + val.topModelId + '">' + val.topModelName + '</option>'
                    });
                    $('select[name="topModelId"]').html(op)
                })
            },
            closeEvent: null,
            isdrag: true,
            buttons: [{text: $.getI18n('cancel'), type: 'imgNoBtn', clickToClose: true, id: 'cancelOwner'}, {
                text: $.getI18n('save'), type: 'imgNoBtn', id: 'saveOwner', click: function () {
                    var obj = $('#dauForm').getForm();
                    var type = 0 //区分是仅保存还是保存并下发点表
                    that.saveInfo(obj, that, type)
                }
            }]
        })
    },
    //数采详情弹窗
    detailDauTep: function () {
        var dauDetailTep = '<form id="dauDetailForm">' +
            '<div class="dauDiv"><lable>' + $.getI18n('dauModel') + '<span>：</span></label><input  name="modelId" disabled/></div>' +
            '<div class="dauDiv"><lable>' + $.getI18n('dauSn') + '<span>：</span></label><input  name="sn" disabled/></div>' +
            '<div class="dauDiv" ><lable>' + $.getI18n('dauName') + '<span>：</span></label><input  name="deviceName" disabled/></div>' +
            '<div class="dauDiv"><lable>' + $.getI18n('orgName') + '<span>：</span></label><input name="orgName" disabled/></div>' +
            '<div class="dauDiv"><lable>' + $.getI18n('plantName') + '<span>：</span></label><input type="text" disabled name="plantName"></div>' +
            '<div class="dauDiv maxLengthInput"><lable>接入设备数<span>：</span></label><input name="maxLength" class="checkNumber" id="" disabled/></div>' +
            '</form>' +
            '<div>' +
            '<div class="ownerHead">' +
            '<span>' + $.getI18n('subDevInfo') + '</span>' +
            '</div>' +
            '<table style="margin-top: 10px" class="addTable device" id="dauDetailTable">' +
            '<thead>' +
            '<tr>' +
            '<th>' + $.getI18n('subDev') + '</th>' +
            '<th>' + $.getI18n('deviceType') + '</th>' +
            '<th>' + $.getI18n('model') + '</th>' +
            '<th>' + $.getI18n('devSn') + '</th>' +
            '<th class="detailSer">' + $.getI18n('usePoint') + '</th>' +
            '<th class="detailOrder">' + $.getI18n('devOrder') + '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody></tbody>' +
            '</table>';
        '</div>';
        return dauDetailTep
    },
    //详情弹窗表格数据
    dauDetailTableData: function (obj, snType) {
        if (this.dauDetailTable) {
            this.dauDetailTable.fnClearTable(false);
            this.dauDetailTable.fnDestroy()
        }
        var columns = [
            {data: "deviceName", title: $.getI18n('subDev')},
            {data: "typeName", title: $.getI18n('deviceType')},
            {data: "modelName", title: $.getI18n('model')},
            {data: "deviceSN", title: $.getI18n('devSn')},
            {data: "modeName", title: $.getI18n('usePoint')},
            {data: "subDeviceOrder", title: $.getI18n('devOrder')},
        ]
        if (snType == 2) {
            columns = [
                {data: "deviceName", title: $.getI18n('subDev')},
                {data: "typeName", title: $.getI18n('deviceType')},
                {data: "modelName", title: $.getI18n('model')},
                {data: "deviceSN", title: $.getI18n('devSn')},
                {data: "serialPortId", title: $.getI18n('usePoint')},
                {data: "subDeviceOrder", title: $.getI18n('devOrder')},
            ]
        }
        this.dauDetailTable = $('#dauDetailTable').dataTable({
            ajax: {
                type: 'POST',
                url: '/device/getDevicesUnderColl.do',
                //data:obj,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {
                    d.tokenId = obj.tokenId;
                    d.collType = snType
                    d.id = obj.id;
                    d.draw = 10;
                    return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    $('#dauDetailForm').find('input[name="maxLength"]').val(json.body.maxLength)
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort: false,
            bInfo: false,
            pageLength: 100,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging: false,
            bPaginate: true,
            stateSave: false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language: {
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
        })
    },
    //加载树
    ztreeShow: function (url) {
        var treeNode;
        var that = this;
        $.http.POST(url, {tokenId: Cookies.getCook('tokenId')}, function (result) {
            treeNode = result.body;
            $.fn.zTree.init($("#ztree"), setting, treeNode);
            //下面三行是设置加载时默认选中根节点
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            var nodes = zTree.getNodes()[0];
            zTree.selectNode(nodes);
            $('.rightInfo_device .deviceHead1').show();
            $('.noData').hide();
            $('.dauTable').show();
            that.orgId = nodes.id;
            that.org = nodes.name;
            that.plantId = '';
            that.getData({
                plantId: '',
                deviceName: '',
                status: '',
                tokenId: Cookies.getCook('tokenId'),
                orgId: nodes.id
            })
        });
        var IDMark_A = "_a";
        var setting = {
            isSimpleData: true,              //数据是否采用简单 Array 格式，默认false
            treeNodeKey: "id",               //在isSimpleData格式下，当前节点id属性
            treeNodeParentKey: "pId",        //在isSimpleData格式下，当前节点的父节点id属性
            showLine: true,                  //是否显示节点间的连线
            checkable: true,               //每个节点上是否显示 CheckBox
            callback: {
                beforeClick: beforeClick,
            },
            async: {
                enable: true
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
            return (!!treeNode.highlight == false) ? {color: "#333", "font-weight": "normal"} : {
                color: "#01B1ED",
                "font-weight": "bold"
            }
        }

        //ztree模糊查询
        $("#searchOrgPlant").unbind().on("click", function () {
            if ($("#key").val()) {
                var zTree = $.fn.zTree.getZTreeObj("ztree");
                var value = $("#key").val();
                var keyType = "name";
                var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                updateNodes(true, nodeList); //更新节点
            }
        });
        $("#key").unbind().on("keydown", function (e) {
            $.fn.zTree.getZTreeObj("ztree").expandAll(false);
            if ($("#key").val()) {
                if (e.keyCode == 13) {
                    var zTree = $.fn.zTree.getZTreeObj("ztree");
                    var value = $("#key").val();
                    var keyType = "name";
                    var nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                    updateNodes(true, nodeList); //更新节点
                }
            }
        });

        function updateNodes(highlight, nodeList) {
            var zTree = $.fn.zTree.getZTreeObj("ztree");
            //获取所有节点 并设置highlight 为false 并updateNode 每一个 让上次搜索过的变成普通节点
            var node = zTree.getNodes();
            zTree.transformToArray(node).map(function (item) {
                item.highlight = false;
                zTree.updateNode(item);
            });
            for (var i = 0, l = nodeList.length; i < l; i++) {
                nodeList[i].highlight = highlight; //高亮显示搜索到的节点(highlight是自己设置的一个属性)
                zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
                zTree.updateNode(nodeList[i]); //更新节点数据，主要用于该节点显示属性的更新
            }
        }

        //节点点击事件
        var log, className = "dark";

        function beforeClick(treeId, treeNode, clickFlag) {
            $('.rightInfo_device .deviceHead1').show();
            $('.noData').hide();
            $('.dauTable').show();
            //判断最终节点是否选择了电站
            if (treeNode.isPlant == true) {
                that.plantId = treeNode.id;
                that.plantName = treeNode.name;
                that.org = treeNode.getParentNode().name;
                that.orgId = treeNode.getParentNode().id;
                that.getData({
                    plantId: treeNode.id,
                    deviceName: '',
                    status: '',
                    tokenId: Cookies.getCook('tokenId'),
                    orgId: treeNode.getParentNode().id
                })
            } else {
                that.plantId = '';
                that.plantName = '';
                that.org = treeNode.name;
                that.orgId = treeNode.id;
                that.getData({
                    plantId: '',
                    deviceName: '',
                    status: '',
                    tokenId: Cookies.getCook('tokenId'),
                    orgId: treeNode.id
                })
            }
        }
    },
    //级联选择1  获取设备类型
    getSubDeviceType: function (that) {
        $.http.POST('/device/getDeviceChoiceTree.do', {
            requestType: 0,
            tokenId: Cookies.getCook('tokenId'),
            modelId: '',
            typeId: ''
        }, function (res) {
            var str = '<option value="">' + $.getI18n('pleaseChoose') + '</option>';
            $.each(res.body.data, function (i, val) {
                str += '<option value="' + val.typeId + '">' + val.typeName + '</option>'
            });
            that.find('select[name="typeId"]').html(str)
        })
    },
    //级联选择2  获取设备型号
    getSubModel: function (that, typeId) {
        $.http.POST('/device/getDeviceChoiceTree.do', {
            requestType: 1,
            modelId: '',
            typeId: typeId,
            tokenId: Cookies.getCook('tokenId')
        }, function (res) {
            var str1 = '<option value="">' + $.getI18n('pleaseChoose') + '</option>';
            if (res.body.data.length > 0) {
                $.each(res.body.data, function (i, val) {
                    str1 += '<option value="' + val.modelId + '">' + val.model + '</option>'
                })
            } else {
                str1 = '<option value="">' + $.getI18n('chooseOther') + '</option>';
                that.find('select[name="modeId"]').html('')
            }
            that.find('select[name="modelId"]').html(str1)
        })
    },
    //级联选择3  获取电表
    getSubPointTable: function (that, typeId, modelId) {
        $.http.POST('/device/getDeviceChoiceTree.do', {
            requestType: 2,
            modelId: modelId,
            typeId: typeId,
            tokenId: Cookies.getCook('tokenId')
        }, function (res) {
            var str2 = '<option value="">' + $.getI18n('pleaseChoose') + '</option>';
            if (res.body.data.length > 0) {
                $.each(res.body.data, function (i, val) {
                    str2 += '<option value="' + val.modeId + '">' + val.modeName + '</option>'
                })
            } else {
                str2 = '<option value="">' + $.getI18n('chooseOther') + '</option>'
            }
            that.find('select[name="modeId"]').html(str2)
        })
    },
    //自研数采生成行后自动加载各种信息的第一条
    getDauInfo: function (type, that) {
        $.http.POST('/device/getDeviceChoiceTree.do', {
            requestType: 0,
            tokenId: Cookies.getCook('tokenId'),
            modelId: '',
            typeId: ''
        }, function (res) {
            var str
            var typeId = res.body.data[0].typeId
            var modelId
            $.each(res.body.data, function (i, val) {
                str += '<option value="' + val.typeId + '">' + val.typeName + '</option>'
            });
            if (type == 0) {
                that.find('select[name="typeId"]').html(str)
            } else {
                $('.addTable tbody tr ').find('select[name="typeId"]').html(str)
            }
            $.http.POST('/device/getDeviceChoiceTree.do', {
                requestType: 1,
                modelId: '',
                typeId: typeId,
                tokenId: Cookies.getCook('tokenId')
            }, function (res) {
                modelId = res.body.data[0].modelId
                var str1;
                if (res.body.data.length > 0) {
                    $.each(res.body.data, function (i, val) {
                        str1 += '<option value="' + val.modelId + '">' + val.model + '</option>'
                    })
                } else {
                    str1 = '<option value="">' + $.getI18n('chooseOther') + '</option>';
                    $('.addTable tbody tr ').find('select[name="modeId"]').html('')
                }
                if (type == 0) {
                    that.find('select[name="modelId"]').html(str1)
                } else {
                    $('.addTable tbody tr ').find('select[name="modelId"]').html(str1)
                }
                $.http.POST('/device/getDeviceChoiceTree.do', {
                    requestType: 2,
                    modelId: modelId,
                    typeId: typeId,
                    tokenId: Cookies.getCook('tokenId')
                }, function (res) {
                    var str2;
                    if (res.body.data.length > 0) {
                        $.each(res.body.data, function (i, val) {
                            str2 += '<option value="' + val.modeId + '">' + val.modeName + '</option>'
                        })
                    } else {
                        str2 = '<option value="">' + $.getI18n('chooseOther') + '</option>'
                    }
                    if (type == 0) {
                        that.find('select[name="modeId"]').html(str2)
                    } else {
                        $('.addTable tbody tr ').find('select[name="modeId"]').html(str2)
                    }
                })
            })
        })
    },
    //所属组织弹窗信息
    orgTep: function () {
        var orgTep = '<div id="orgTree" class="ztree"></div>';
        return orgTep
    },
    //删除下联设备
    deleteSubDevice: function () {
        var that = this;
        $.each($('.addTable tbody tr'), function (i, val) {
            if ($(this).find('td').eq(0).find('img').attr('src') == 'images/repImages/rect1.png') {
                that.delIds.push($(this).find('td').eq(0).find('img').data('id'));
                $(this).remove()
            }
        })
        var trLength = $('.addTable tbody tr ').length
        $('#dauForm input[name="maxLength"]').val(trLength)
    },
    //切换选中状态
    changeRect: function (_this) {
        var curImg = _this.find('img').attr('src');
        if (curImg == 'images/repImages/rect.png') {
            _this.find('img').attr('src', 'images/repImages/rect1.png')
        } else {
            _this.find('img').attr('src', 'images/repImages/rect.png')
        }
    },
    //全选下联设备
    checkAllSub: function () {
        $.each($('.addTable tbody tr'), function (i, val) {
            $(this).find('td').eq(0).find('img').attr('src', 'images/repImages/rect1.png')
        })
    },
    //取消全选
    canselCheckSub: function () {
        $.each($('.addTable tbody tr'), function (i, val) {
            $(this).find('td').eq(0).find('img').attr('src', 'images/repImages/rect.png')
        })
    },
    //根据组织查询出电站
    getPlantByOrg: function (orgId, plantId) {
        var op = '';
        $.http.POST('/device/plantIdofOrg4Device.do', {
            orgId: orgId,
            tokenId: Cookies.getCook('tokenId')
        }, function (res) {
            var op = '<option value="">' + $.getI18n('choosePlant') + '</option>';
            $.each(res.body.data, function (i, val) {
                op += '<option value="' + val.plantId + '">' + val.plantName + '</option>'
            });
            $('.dauDiv select[name="plantId"]').html(op);
            if (plantId) {
                $('.dauDiv select[name="plantId"]').val(plantId)
            }
        })
    },
    //查询出所有数采的名称
    getAllDauName: function () {
        //查询出所有数采名称，并赋值
        var that = this;
        $.http.POST('/device/getAllCollNames.do', {tokenId: Cookies.getCook('tokenId')}, function (res) {
            var op = '';
            $.each(res.body.data, function (i, val) {
                op += '<option value="' + val.topModelId + '">' + val.topModelName + '</option>'
            });
            // $('#dauForm select[name="topModelId"]').html(op)
            that.allName = op
        })
    },
    //获取表格tr的长度
    getTrLen: function (className) {
        //className需要获取表格的id或class名
        // $.each($(className).find('tbody tr'),function(i,val){
        //
        // })
        return $(className).find('tbody tr').length
        // console.log('125215236',$(className).find('tbody tr').length)
    },
    //新增数采时保存当前信息
    saveInfo: function (obj, that, type) {
        //获取每一行的值
        var subDevice = [];
        $('.addTable tbody tr').each(function (i) {
            var object = 'obj' + (i + 1);
            object = {};
            $(this).children('td').each(function (j) {
                $(this).children().each(function (k) {
                    var name = $(this)[0].name;
                    //非空验证
                    if (name == 'typeId') {
                        if ($(this).val() == '' || $(this).val() == undefined) {
                            App.alert('设备类型不能为空，请选择');
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    if (name == 'modelId') {
                        if ($(this).val() == undefined || $(this).val() == '') {
                            App.alert('型号不能为空，请选择');
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    if (name == 'modeId') {
                        if ($(this).val() == undefined || $(this).val() == '') {
                            App.alert('使用点表不能为空，请选择');
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    if (name == 'subDeviceOrder') {
                        if ($(this).val() == '') {
                            App.alert($.getI18n('devOrderRequired'));
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    object[name] = $(this).val()
                })
            });
            if (!that.orderFlag) return false
            subDevice[i] = object
        });
        obj.subDevice = subDevice;
        obj.tokenId = Cookies.getCook('tokenId');
        obj.orgId = that.orgId;
        obj.plantId = $('.dauDiv select[name="plantId"]').val();
        // obj.maxNumber =
        if ($('.dauDiv select[name="plantId"]').val() == '') {
            obj.serviceType = 1
        } else {
            obj.serviceType = 2
        }
        if (!that.orderFlag) return false;
        //一个串口最多接入5个设备
        var addEQindex1 = 0
        var addEQindex2 = 0
        var addEQFlag = true
        $('.addTable tbody tr ').find('select[name="serialPort"]').each(function (i, val) {
            if ($(this).val() == "1") {
                addEQindex1++
            } else {
                addEQindex2++
            }
            if ($(this).val() == "1") {
                if (addEQindex1 > 5) {
                    // $(this).find("option[value='2']").attr("selected",true)
                    // $(this).find("option[value='1']").removeAttr("selected")
                    // $(this).val("2")
                    App.alert("串口1下最多接入5个设备")
                    addEQFlag = false
                    return false
                }
            } else {
                if (addEQindex2 > 5) {
                    // $(this).find("option[value='1']").attr("selected",true)
                    // $(this).find("option[value='2']").removeAttr("selected")
                    // $(this).val("1")
                    App.alert("串口2下最多接入5个设备")
                    addEQFlag = false
                    return false
                }
            }
        })
        if (!addEQFlag) return false
        //验证序号是否有重复，分两类第一畅洋数采完全不能重复，自研数采同一个com口不能重复
        var repeatFlag = true
        var sn1 = $('#addDauNew input[name="sn"]')
        if (sn1.val()[3] == 1) {
            $('#addDauNew .addTable tbody tr ').find('input[name="subDeviceOrder"]').each(function () {
                var cruIndex = $('#addDauNew .addTable tbody tr ').find('input[name="subDeviceOrder"]').index($(this))
                var _this = $(this)
                var flag = false
                $('#addDauNew .addTable tbody tr ').find('input[name="subDeviceOrder"]').each(function (index, val) {
                    if (_this.val() == $(this).val()) {
                        if (index != cruIndex) {
                            App.alert(`第${cruIndex + 1}行和第${index + 1}行序号重复请修改`)
                            flag = true
                            return false
                        }
                    }
                })
                if (flag) {
                    repeatFlag = false
                    return false
                }
            })
        } else {
            var arr1 = []
            var arr2 = []
            $('.addTable tbody tr ').find('select[name="serialPort"]').each(function (i, val) {
                if ($(this).val() == "1") {
                    var nextInputVal = $(this).parent().next("td").find("input").val()
                    arr1.push(nextInputVal)
                } else {
                    var nextInputVal = $(this).parent().next("td").find("input").val()
                    arr2.push(nextInputVal)
                }
            })
            for (var i = 0; i < arr1.length; i++) {
                for (var j = i + 1; j < arr1.length; j++) {
                    if (arr1[i] == arr1[j]) {
                        App.alert(`串口1下有序号重复请修改`)
                        repeatFlag = false
                        return false
                    }
                }
            }
            for (var i = 0; i < arr2.length; i++) {
                for (var j = i + 1; j < arr2.length; j++) {
                    if (arr2[i] == arr2[j]) {
                        App.alert(`串口2下有序号重复请修改`)
                        repeatFlag = false
                        return false
                    }
                }
            }
        }
        if (!repeatFlag) return false
        if (!$('#dauForm').valid()) return false;
        $.http.POST('/device/addCollector.do', obj, function (res) {
            if (res.code == 100 && type == 1) {
                obj.insertOrUpdate = 1
                $.http.POST('/device/updatePointTable.do', obj, function (res) {
                    if (res.code == 100) {
                        $('#addDauNew').modal("hide");
                        App.warningDialog(res.msg);
                        that.getData({
                            plantId: that.plantId,
                            deviceName: '',
                            status: '',
                            tokenId: Cookies.getCook('tokenId'),
                            orgId: that.orgId
                        })
                    } else {
                        $('#addDauNew').modal("hide");
                        App.warningDialog(res.msg);
                        that.getData({
                            plantId: that.plantId,
                            deviceName: '',
                            status: '',
                            tokenId: Cookies.getCook('tokenId'),
                            orgId: that.orgId
                        })
                    }
                }, true, true)
            } else if (res.code == 100 && type != 1) {
                $('#addDauNew').modal("hide");
                App.warningDialog(res.msg);
                that.getData({
                    plantId: that.plantId,
                    deviceName: '',
                    status: '',
                    tokenId: Cookies.getCook('tokenId'),
                    orgId: that.orgId
                })
            } else {
                App.warningDialog(res.msg, 1)
            }

        }, true, true)
    },
    //管理员登录修改数采时保存信息
    modifySaveInfo: function (obj, that, type, id) {
        var trLength = $('.addTable tbody tr ').length
        var maxlen = $('#dauForm input[name="maxLength"]').val()
        if(obj.maxLength != trLength){
            App.alert(`【接设备数：${obj.maxLength}】与【下联设备数：${trLength}】不符合，请重新填写信息！`)
            return
        }
        //获取每一行的值
        var subDevice = [];
        $('.addTable tbody tr').each(function (i) {
            var object = 'obj' + (i + 1);
            object = {};
            $(this).children('td').each(function (j) {
                $(this).children().each(function (k) {
                    var name = $(this)[0].name;
                    //非空验证
                    if (name == 'typeId') {
                        if ($(this).val() == '' || $(this).val() == undefined) {
                            App.alert('设备类型不能为空，请选择');
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    if (name == 'modelId') {
                        if ($(this).val() == undefined || $(this).val() == '') {
                            App.alert('型号不能为空，请选择');
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    if (that.collType[3] == 1) {
                        if (name == 'modeId') {
                            if ($(this).val() == undefined || $(this).val() == '') {
                                App.alert('使用点表不能为空，请选择');
                                that.orderFlag = false;
                                return false
                            } else {
                                that.orderFlag = true
                            }
                        }
                        if (!that.orderFlag) return false
                    }
                    if (name == 'subDeviceOrder') {
                        if ($(this).val() == '') {
                            App.alert($.getI18n('devOrderRequired'));
                            that.orderFlag = false;
                            return false
                        } else {
                            that.orderFlag = true
                        }
                    }
                    if (!that.orderFlag) return false
                    object[name] = $(this).val()
                })
            });
            if (!that.orderFlag) return false
            subDevice[i] = object
        });
        if (!that.orderFlag) return false
        //判断一个串口号最多接5个设备
        var maxEQ = true
        if (that.collType[3] == 2) {
            var EQIndex1 = 0
            var EQIndex2 = 0
            $('.addTable tbody tr ').find('select[name="serialPort"]').each(function (i, val) {
                if ($(this).val() == "1") {
                    EQIndex1++
                } else {
                    EQIndex2++
                }
                if ($(this).val() == "1") {
                    if (EQIndex1 > 5) {
                        // $(this).find("option[value='串口2']").attr("selected",true)
                        // $(this).find("option[value='串口1']").removeAttr("selected")
                        // $(this).val("串口2")
                        App.alert("串口1下最多接入5个设备")
                        maxEQ = false
                        return false
                    }
                } else {
                    if (EQIndex2 > 5) {
                        // $(this).find("option[value='串口1']").attr("selected",true)
                        // $(this).find("option[value='串口2']").removeAttr("selected")
                        // $(this).val("串口1")
                        App.alert("串口2下最多接入5个设备")
                        maxEQ = false
                        return false
                    }
                }
            })
        }
        if (!maxEQ) return false
        //验证序号是否有重复，分两类第一畅洋数采完全不能重复，自研数采同一个com口不能重复
        var repeatFlag = true
        if (that.collType[3] == 1) {
            $('.addTable tbody tr ').find('input[name="subDeviceOrder"]').each(function () {
                var cruIndex = $('.addTable tbody tr ').find('input[name="subDeviceOrder"]').index($(this))
                var _this = $(this)
                var flag = false
                $('.addTable tbody tr ').find('input[name="subDeviceOrder"]').each(function (index, val) {
                    if (_this.val() == $(this).val()) {
                        if (index != cruIndex) {
                            App.alert(`${cruIndex + 1}行和${index + 1}行序号重复请修改`)
                            flag = true
                            return false
                        }
                    }
                })
                if (flag) {
                    repeatFlag = false
                    return false
                }
            })
        } else {
            var arr1 = []
            var arr2 = []
            $('.addTable tbody tr ').find('select[name="serialPort"]').each(function (i, val) {
                if ($(this).val() == "1") {
                    var nextInputVal = $(this).parent().next("td").find("input[name='subDeviceOrder']").val()
                    arr1.push(nextInputVal)
                } else {
                    var nextInputVal = $(this).parent().next("td").find("input[name='subDeviceOrder']").val()
                    arr2.push(nextInputVal)
                }
            })
            for (var i = 0; i < arr1.length; i++) {
                for (var j = i + 1; j < arr1.length; j++) {
                    if (arr1[i] == arr1[j]) {
                        App.alert(`串口1有序号重复请修改`)
                        repeatFlag = false
                        return false
                    }
                }
            }
            for (var i = 0; i < arr2.length; i++) {
                for (var j = i + 1; j < arr2.length; j++) {
                    if (arr2[i] == arr2[j]) {
                        App.alert(`串口2有序号重复请修改`)
                        repeatFlag = false
                        return false
                    }
                }
            }
        }
        if (!repeatFlag) return false
        //判断是否分配了电站
        if (obj.plantId) {
            obj.plantId = obj.plantId
        } else {
            obj.plantId = ''
        }
        obj.subDevice = subDevice;
        obj.tokenId = Cookies.getCook('tokenId');
        obj.orgId = that.orgId;
        // obj.plantId = that.plantId
        obj.collId = id;
        obj.collName = obj.deviceName;
        obj.collSN = obj.sn;
        obj.modelId = obj.topModelId;
        obj.deletedIds = that.delIds.join(',');
        // obj.maxLength = that.maxLength
        if (!that.orderFlag) return false;
        $.http.POST('/device/updateCollAndSubDev.do', obj, function (res) {
            that.delIds = []
            if (res.code == 100 && type == 1) {
                obj.insertOrUpdate = 2
                $.http.POST('/device/updatePointTable.do', obj, function (res) {
                    if (res.code == 100) {
                        $('#modifyDau').modal("hide");
                        App.warningDialog(res.msg)
                        that.getData({
                            plantId: that.plantId,
                            deviceName: '',
                            status: '',
                            tokenId: Cookies.getCook('tokenId'),
                            orgId: that.orgId
                        })
                    } else {
                        $('#modifyDau').modal("hide");

                        App.warningDialog(res.msg)
                        that.getData({
                            plantId: that.plantId,
                            deviceName: '',
                            status: '',
                            tokenId: Cookies.getCook('tokenId'),
                            orgId: that.orgId
                        })
                    }
                }, true, true)
            } else if (res.code == 100 && type != 1) {
                $('#modifyDau').modal("hide");
                App.warningDialog(res.msg)
                that.getData({
                    plantId: that.plantId,
                    deviceName: '',
                    status: '',
                    tokenId: Cookies.getCook('tokenId'),
                    orgId: that.orgId
                })
            } else {
                App.warningDialog(res.msg, 1)
            }
        }, true, true)
    }
};