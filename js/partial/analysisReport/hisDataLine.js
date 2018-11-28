/** 2017/12/18
 * @author: SP0014
 * @description: 历史数据曲线
 */
define(function(){
    return hisDataLineRender;
});
var hisDataLineRender = {
    areaId:'',
    unitArr:[],//数据单位
    Render:function(){
        var that = this;
        this.reviewData();
        this.areaChang();
        this.initTime();
        //that.searchPlant()
        //全选设备
        $('#selectAll').unbind().on('click',function(){
            that.selectAll()
        });
        //取消设备
        $('#cancelSelect').unbind().on('click',function(){
            that.cancelSelect()
        });
        //反选设备
        $('#oppSelect').unbind().on('click',function(){
            that.oppSelect()
        });
        //全选数据
        $('#selectAllData').unbind().on('click',function(){
            that.selectAllData()
        });
        //取消数据
        $('#cancelSelectData').unbind().on('click',function(){
            that.cancelSelectData()
        });
        //反选数据
        $('#oppSelectData').unbind().on('click',function(){
            that.oppSelectData()
        });
        //取消选择
        $('#canSel').unbind().on('click',function(){
            that.canSel()
        });
        //获取选中value值生成曲线
        $('#getLine').unbind().on('click',function(){
            that.getValue()
        });
        //保存默认
        $('#saveLine').unbind().on('click',function(){
            that.saveLine()
        });
        //开始时间限制
        $('#timeStart').unbind('click').on('click',function(){
            WdatePicker({readOnly:true,dateFmt:'yyyy-MM-dd HH:mm',isShowClear:false,maxDate:that.initTime()})
        });
        //结束时间限制
        $('#timeEnd').unbind('click').on('click',function(){
            WdatePicker({readOnly:true,dateFmt:'yyyy-MM-dd HH:mm',maxDate:'#F{$dp.$D(\'timeStart\',{d:1,m:-1})}',minDate:'#F{$dp.$D(\'timeStart\')}',isShowClear:false})
        });
        //开始时间变化 结束时间清空
        $('#timeStart').unbind('focus').on('focus',function(){
            $('#timeEnd').val('')
        })
    },
    openAreaName:function(){
        $('.navBar .areaNames').show()
    },
    //全选
    selectAll:function(){
        $('#deviceForm :checkbox').prop('checked',true);
        $('#deviceForm .items label').removeClass('unChoose').addClass('choose');
        $('#deviceForm #selectAll').prop('checked',true).siblings('label').addClass('choose').removeClass('unChoose');
        $('#deviceForm #oppSelect').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
        $('#deviceForm #cancelSelect').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
    },
    //取消
    cancelSelect:function(){
        $('#deviceForm :checkbox').prop("checked", false);
        $('#deviceForm label').removeClass('choose').addClass('unChoose');
        $('#deviceForm #cancelSelect').prop('checked',true).siblings('label').addClass('choose').removeClass('unChoose');
    },
    //反选
    oppSelect:function(){
        $("#deviceForm label").each(function () {
            //$(this).prop("checked", !$(this).prop("checked"));
            if($(this).hasClass('choose')){
                $(this).removeClass('choose').addClass('unChoose').siblings('input').prop('checked',false);
            }else{
                $(this).removeClass('unChoose').addClass('choose').siblings('input').prop('checked',true);
            }
        });
        $('#deviceForm #oppSelect').prop('checked',true).siblings('label').addClass('choose').removeClass('unChoose');
        $('#deviceForm #selectAll').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
        $('#deviceForm #cancelSelect').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
    },
    //全选数据
    selectAllData:function(){
        $('#dataForm :checkbox').prop('checked',true);
        $('#dataForm label').removeClass('unChoose').addClass('choose');
        $('#dataForm #oppSelectData').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
        $('#dataForm #cancelSelectData').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
    },
    //取消数据
    cancelSelectData:function(){
        $('#dataForm :checkbox').prop("checked", false);
        $('#dataForm label').removeClass('choose').addClass('unChoose');
        $('#dataForm #cancelSelectData').prop('checked',true).siblings('label').addClass('choose').removeClass('unChoose');
    },
    //反选数据
    oppSelectData:function(){
        $("#dataForm label").each(function () {
            if($(this).hasClass('choose')){
                $(this).removeClass('choose').addClass('unChoose').siblings('input').prop('checked',false);
            }else{
                $(this).removeClass('unChoose').addClass('choose').siblings('input').prop('checked',true);
            }
        });
        $('#dataForm #oppSelectData').prop('checked',true).siblings('label').addClass('choose').removeClass('unChoose');
        $('#dataForm #selectAllData').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
        $('#dataForm #cancelSelectData').prop('checked',false).siblings('label').addClass('unChoose').removeClass('choose');
    },
    //取消选择
    canSel:function(){
        $('form :checkbox').prop("checked", false);
        $('form label').removeClass('choose').addClass('unChoose');
    },
    //初始化最大时间
    initTime:function(){
        var myDate = new Date();
        var yesterday = new Date(myDate.setTime(myDate.getTime()-24*60*60*1000));
        var year=yesterday.getFullYear();
        var month=yesterday.getMonth()+1;
        var day=yesterday.getDate();
        var maxDate = year+'/'+month+'/'+day;
        // $('#timeStart').on('click',function(){
        //     WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',isShowClear:false,maxDate:maxDate})
        // })
        // $('#timeEnd').on('click',function(){
        //     WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',maxDate:'#F{$dp.$D(\'timeStart\',{d:1,m:-1})}',minDate:'#F{$dp.$D(\'timeStart\')}',isShowClear:false})
        // })
        return maxDate
    },
    //获取所有选中checkbox的值并生成曲线
    getValue:function(){
        var that = this;
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        $("#deviceForm .items :checkbox:checked").each(function (i) {
            arr1[i] = $(this).val()
        });
        $("#dataForm .items :checkbox:checked").each(function (i) {
            arr2[i] = $(this).val();
            arr3[i] = $(this).data('unit')
        });
        var inventers = arr1.join(',');
        var field = arr2.join(',');
        var startTime = $("#timeStart").val();
        var endTime = $("#timeEnd").val();
        // console.log('arr3',arr3)
        arr4 = arr3.unique();
        //时间不能为空判断
        if(startTime=='' || endTime == '' ){
            App.alert($.getI18n('report.timeIsRequired'));
            return
        }
        //设备不能为空判断
        if(arr1.length ==0){
            App.alert($.getI18n('report.chooseDevice'))
        }
        //数据单位不能为空判断
        if(arr4.length ==0){
            App.alert($.getI18n('report.chooseData'))
        }
        // console.log(arr4.length)
        //数据单位不能超过三个判断
        if(arr4.length > 2){
            App.alert($.getI18n('report.dataMostTwo'))
        }else{
            that.unitArr=arr4
            var obj = {inventers:inventers,field:field,tokenId:Cookies.getCook('tokenId'),startTime:startTime,endTime:endTime};
            $('#loadLine').show();
            $.http.POST('/report/getHistoryLine.do',obj,function(res){
                $('#lineContent1').show();
                $('#loadLine').hide();
                that.drawLine(res.body)
            })
        }

    },
    //搜索
    searchPlant:function () {
        $('.searchBox input').bind('input propertychange',function(){
            // console.log($('.chooseArea span:last').text())
            var id = $('.chooseArea span:last').data('id');
            var plantName = $('#plantName').val();
            $.http.POST('/report/fuzzySearchPlant.do',{areaId:id?id:0,tokenId:Cookies.getCook('tokenId'),plantName:plantName},function(res){
                if(res.body.length!=0){
                    $('.plantContain').show();
                    var html ='';
                    $.each(res.body,function(i,val){
                        html+='<a data-id="'+val.plantId+'" data-time="'+val.valueTime+'">'+val.plantName+'</a>'
                    });
                    $('.plantContain .pnContainer').html(html);
                    //点击a选中
                    $('.plantContain .pnContainer a').on('click',function(){
                        $('#plantName').val($(this).text());
                        $('.plantContain').hide();
                        var time = $(this).data('time');
                        var id = $(this).data('id');
                        $('#plantId').val(id);
                        $('#limit').val(time);
                        //查询逆变器
                        $.http.POST('/report/getDeviceForPlant.do',{plantId:id,tokenId:Cookies.getCook('tokenId')},function(res){
                            if(res.body.length>0){
                                $('#deviceForm').show();
                                var html = '';
                                $.each(res.body,function(i,val){
                                    html+='<div class="formItem">'+
                                        '<span>'+
                                        '<input type="checkbox" name="" value="'+val.id+'">'+
                                        '<label for="" class="unChoose"></label>'+val.name+
                                        '</span>'+
                                        '</div>'
                                });
                                $('#deviceForm fieldset .items').empty();
                                $('#deviceForm fieldset .items').append(html);
                                $('#deviceForm label').unbind().on('click',function(){
                                    if($(this).hasClass('choose')){
                                        $(this).removeClass('choose').addClass('unChoose').siblings('input').prop('checked',false);
                                    }else{
                                        $(this).removeClass('unChoose').addClass('choose').siblings('input').prop('checked',true);
                                    }
                                });
                                //点击确定根据逆变器获取出遥控信号点
                                $('.sureBtn').unbind().on('click',function(){
                                    $('#dataForm').show();
                                    var arr = [];
                                    $("#deviceForm :checkbox:checked").each(function (i) {
                                        arr[i] = $(this).val()
                                    });
                                    var vals = arr.join(',');
                                    $.http.POST('/report/getYXGuidForInventers.do',{inventers:vals,tokenId:Cookies.getCook('tokenId')},function(res){
                                        var dHtml = '';
                                        $.each(res.body,function(i,val){
                                            dHtml+='<div class="formItem">'+
                                                '<span>'+
                                                '<input type="checkbox" name="" value="'+val.field+'">'+
                                                '<label for="" class="unChoose"></label>'+val.fieldLabel+"("+val.unit+")"+
                                                '</span>'+
                                                '</div>'
                                        });
                                        $('#dataForm fieldset .items').empty();
                                        $('#dataForm fieldset .items').append(dHtml);
                                        $('#dataForm label').unbind().on('click',function(){
                                            if($(this).hasClass('choose')){
                                                $(this).removeClass('choose').addClass('unChoose').siblings('input').prop('checked',false);
                                            }else{
                                                $(this).removeClass('unChoose').addClass('choose').siblings('input').prop('checked',true);
                                            }
                                        })
                                    })
                                })
                            }else{
                                App.alert($.getI18n('report.deviceEmpty'))
                            }

                        })

                    });

                    $('body').unbind('click').on('click',function () {
                        // $('.plantContain .searchBtn').unbind('click').on('click',function () {
                        //     alert(1)
                        //     return
                        // })
                        $('.plantContain').hide();
                    })
                }
            })
        })
    },
    //历史数据曲线
    drawLine:function(datas){
        $('#lineContent1').remove()
        var html = '<div id="lineContent1"></div>'
        $('#loadLine').after(html)
        // html.after($('#loadLine'))
        var option = {
            // tooltip:{
            //     trigger:'axis',
            //     axisPointer:{
            //         lineStyle: {
            //             color: '#006699'
            //         }
            //     },
            //     formatter:function(item){
            //         var str = '<div style="color: #a5e2f9">'+item[0].axisValue+'</div>';
            //         for(var i = 0 ,len= item.length; i<len ;i++){
            //             str +=  '<div style="color: #a5e2f9">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span>'+datas.yData[i].unit+'</div>'
            //         }
            //         return str;
            //     }
            //
            // },
           // color:['#1bbd00','#1395f6'],
            legend: {
                // right: '20',
                itemGap: 14,
                icon: 'line',
                textStyle:{
                    color:'#8A8A8A',
                    fontSize:12
                },
                itemHeight:20,
                type:'scroll',
                // orient: 'vertical',
                top:'5.5%',
                right:'10%',
                pageButtonPosition:'end',
                // bottom:'20%',
                // right:'8%',
                data:''
            },
            grid: {
                top:'15%',
                bottom:'20%',
                left: '6.8%',
                right: '6.8%'
            },
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#ecedf6'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#333'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#b1b2b2'
                    }
                },
                axisTick:{
                    alignWithLabel:true
                },
                nameTextStyle:{
                    // color:'#a5e2f9'
                },
                data: datas.xData
            },
            yAxis: [{
                name:'('+datas.yData[0].unit+')',
                type: 'value',
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#ecedf6'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#333'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#b1b2b2'
                    }
                },
                nameTextStyle:{
                    color:'#333'
                }
            },{
                name:datas.yData[1] ?'('+datas.yData[1].unit+')':'',
                type: 'value',
                splitLine:{
                    show:false,
                },
                axisLabel:{
                    textStyle:{
                        color:'#333'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#b1b2b2'
                    }
                },
                nameTextStyle:{
                    color:'#333'
                }
            }],
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 100,
                    borderColor:'rgba(204,204,204, .5)',
                    backgroundColor:'rgba(205,205,205, .4)',
                    fillerColor:'rgba(205,205,205, 0.1)',
                    dataBackground:{
                        lineStyle:{
                            color:'rgba(1,39,84, 0.35)',
                        }
                    },

                    handleStyle:{
                        color:'rgba(204,204,204, 0.5)',
                        borderColor:'rgba(204,204,204, 0.5)',
                    },
                    textStyle:{
                        color:'#333'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 1,
                    end: 35
                }
            ],
            series: []

        };


        var legendData = [];
        var powers = datas.yData;
        var yDatas = [];
        var unit = [];
        var uniqueUnit = []
        for(var i = 0 ,len = powers.length;i<len;i++){
            legendData.push(powers[i].deviceName + ' ' + powers[i].name);
            yDatas[i] = powers[i].value;
            unit[i]=powers[i].unit
            option.series.push({
                name:powers[i].deviceName + ' ' + powers[i].name,
                type:'line',
                data: powers[i].value,
                yAxisIndex:0,
                showSymbol: false,
                symbolSize: 1
                // areaStyle: {
                //     normal: {
                //         // shadowColor: 'rgba(0, 0, 0, 0.1)',
                //         // shadowBlur: 10
                //         opacity:0.2
                //     }
                // }
            });
            //option.yAxis[i].name = powers[i].name +'(' + powers[i].unit+ ')';
        }
        uniqueUnit=unit.unique()
        option.yAxis[0].name=uniqueUnit[0]
        if(!!uniqueUnit[1]){
            option.yAxis[1].name=uniqueUnit[1]
        }
        option.legend.data = legendData;
        Echarts.render('lineContent1', option);
    },
    //保存设置
    saveLine:function(){
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        $("#deviceForm .items :checkbox:checked").each(function (i) {
            arr1[i] = $(this).val()
        });
        $("#dataForm .items :checkbox:checked").each(function (i) {
            arr2[i] = $(this).val();
            arr3[i] = $(this).data('unit')
        });
        var inventers = arr1.join(',');
        var guids = arr2.join(',');
        var startTime = $("#timeStart").val();
        var endTime = $("#timeEnd").val();
        var plantId = $('#plantId').val();
        var areaNames = $('#showWin').val()
        // console.log('areaNames',areaNames)
        arr4 = arr3.unique();
        if(arr4.length>2){
            App.alert($.getI18n('report.dataNotDefault'));
            return
        }
        if(startTime=='' || endTime == '' ){
            App.alert($.getI18n('report.timeIsRequired'))
        }else{
            var obj = {inventers:inventers,guids:guids,tokenId:Cookies.getCook('tokenId'),startTime:startTime,endTime:endTime,plantId:plantId,areaNames:areaNames};
            $.http.POST('/report/savePersonalSet.do',obj,function(res){
                App.warningDialog(res.msg)
            })
        }
    },
    //地区电站信息
    areaChang:function () {
        var that = this;
        var plantChangeWin='';
        // 弹窗
        var winContent = '\n' +
            '            <div class="changeWin1" style="">\n' +
            '                <div class="fl" style="height: 34px;line-height: 34px">'+$.getI18n('report.plantArea')+'：</div>\n' +
            '                <input id="selectPlant" type="text" readonly class="selectPlant">\n' +
            '                <button class="imgBtn comfort setSave" id="setOk" style="margin-left: 10px">'+$.getI18n('report.sureChoose')+'</button>\n' +
            // '                <button class="imgBtn comfort" id="setOk">生成报表</button>\n' +
            '                <div class="map-select-box" style="display:none ">\n' +
            '                    <h2 class="navigation-tit" id="navigationTit">\n' +
            '                        <a class="rootArea" id="rootArea">--</a>\n' +
            '                    </h2>\n' +
            '                    <div class="navigation-box clearfix">\n' +
            '                        <img class="arrow" src="/images/repImages/shadow.png" alt="">\n' +
            '                        <table id="io-table">\n' +
            '                            <tr>\n' +
            '                                <td><a></a></td>\n' +
            '                                <td><a><img src="/images/lodding.gif" style="width: 30px;height: 30px" alt=""></a></td>\n' +
            '                                <td><a></a></td>\n' +
            '                            </tr>\n' +
            '                        </table>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="ue-container" style="display: none">\n' +
            '                    <select  size="10" name="doublebox" id="plantSelect">\n' +
            '                    </select>\n' +
            '                </div>\n' +
            '            </div>';
        $('#showWin').on('click',function () {
            plantChangeWin = App.dialog({
                id: "changeWin" ,
                title: $.getI18n('report.historyChoosePlant'),
                width: 900,
                height: 493,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content: winContent,
                openEvent: function () {
                    setEnvent()
                },
                closeEvent: null,
                isdrag: true,
                buttons: [{text:$.getI18n('cancel'),type:'imgNoBtn',clickToClose :true}]
            })
        });
        // 电站
        var plantList='';
        function plantBox(obj){
            $('#plantSelect').empty();
            $('#plantSelect').doublebox({nonSelectedList:[]});
            plantList = $('#plantSelect').doublebox({
                nonSelectedListLabel: '待选电站',
                selectedListLabel: '已选电站',
                preserveSelectionOnMove: 'moved',
                showFilterInputs: true,
                filterPlaceHolder:$.getI18n('report.inputPlantName'),
                moveSelectedLabel: '移入',
                removeSelectedLabel: '移出',
                moveOnSelect: false,
                nonSelectedList:obj,
                selectedList:[],
                optionValue:"id",
                optionText:"name",
                doubleMove:false,
            });
            //隐藏按钮
            $('.box2 input.filter').hide();
            // $('.box1 input.filter').attr('placeholder',$.getI18n('report.inputPlantName'));
            $('.box1 input').attr('placeholder','请输入电站名称');
            $('.ue-container').show()
        }

        var _this = this;
        function refreshArea(data){
            $.http.POST('/report/getAreaDistribution.do', data, function (result) {
                setCurArea(result.body.areaInfo);
                setCurAreaChildren(result.body.kidsArea,result.body.plantsInfo.location,result.body.areaInfo.id);
                plantBox(result.body.plantsInfo)
            })
        }
        //请求获取电站及区域数据
        function setEnvent(){
            $('#rootArea').on('click',function () {
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    plantType:Cookies.getCook('plantType'),
                    areaId:'',
                    type:2,
                    serviceType:2
                });
                $('.navigation-item').remove()
            });
            //点击确认选择,获取出设备和数据点
            $('#setOk').unbind().on('click',function(){
                $('.btns').hide();
                //var areaValue = $('.selectPlant').val();
                var options = $('#bootstrap-duallistbox-selected-list_doublebox option');
                var areaId = options.attr('value');
                $('#plantId').val(areaId);
                if(areaId){
                    //查询逆变器
                    $.http.POST('/report/getDeviceForPlant.do',{plantId:areaId,tokenId:Cookies.getCook('tokenId')},function(res){
                        if(res.body.length > 0){
                            $('#deviceForm').show();
                            $('div.sureBtn').show();
                            $('form div.selectBtn').css('visibility','visible');
                            $('#dataForm').hide();
                            $('#lineContent1').hide();
                            $('#dataForm fieldset .items').empty();
                            var html = '';
                            $.each(res.body,function(i,val){
                                html+='<div class="formItem">'+
                                    '<span>'+
                                    '<input type="checkbox" name="" value="'+val.id+'">'+
                                    '<label for="" class="unChoose"></label>'+val.name+
                                    '</span>'+
                                    '</div>'
                            });
                            $('#deviceForm fieldset .items').empty();
                            $('#deviceForm fieldset .items').append(html);
                            $('#deviceForm .items span').unbind().on('click',function(){
                                $('#dataForm').hide();
                                $('.btns').hide();
                                if($(this).children('label').hasClass('choose')){
                                    $(this).children('label').removeClass('choose').addClass('unChoose').end()
                                        .children('input').prop('checked',false);
                                }else{
                                    $(this).children('label').removeClass('unChoose').addClass('choose').end()
                                        .children('input').prop('checked',true);
                                }
                            });
                            //点击确定根据逆变器获取出遥控信号点
                            $('.sureBtn').unbind().on('click',function(){
                                var arr = [];
                                $("#deviceForm .items :checkbox:checked").each(function (i) {
                                    arr[i] = $(this).val()
                                });
                                if(arr.length > 0){
                                    $('#dataForm').show();
                                    $('.btns').show();
                                    var vals = arr.join(',');
                                    $.http.POST('/report/getYXGuidForInventers.do',{inventers:vals,tokenId:Cookies.getCook('tokenId')},function(res){
                                        var dHtml = '';
                                        $.each(res.body,function(i,val){
                                            dHtml+='<div class="formItem">'+
                                                '<span>'+
                                                '<input type="checkbox" name="" value="'+val.field+'" data-unit="'+val.unit+'">'+
                                                '<label for="" class="unChoose"></label>'+val.fieldLabel+"("+val.unit+")"+
                                                '</span>'+
                                                '</div>'
                                        });
                                        $('#dataForm fieldset .items').empty();
                                        $('#dataForm fieldset .items').append(dHtml);
                                        $('#dataForm .items span').unbind().on('click',function(){
                                            if($(this).children('label').hasClass('choose')){
                                                $(this).children('label').removeClass('choose').addClass('unChoose').end()
                                                    .children('input').prop('checked',false);
                                            }else{
                                                $(this).children('label').removeClass('unChoose').addClass('choose').end()
                                                    .children('input').prop('checked',true);
                                            }
                                        })
                                    })
                                }else{
                                    App.alert($.getI18n('report.chooseDevice'))
                                }

                            });
                            $('#nanImg').hide()
                        }else{
                            App.alert($.getI18n('report.deviceEmptyChoose'))
                        }
                        $('.btn.modal-btn.imgNoBtn').click();
                    })
                }
            });

            $('#rootArea').click();
        }
        //设置当前区域节点
        function setCurArea(plantArea){
            if(Number(plantArea.fatherId)===0){
                $('#rootArea').text(plantArea.name);
                _this.areaId = plantArea.id;
                $('#selectPlant').unbind().on('click',function (e) {
                    $('.map-select-box').fadeToggle();
                    e.stopPropagation()
                });

                $('body').unbind('click').on('click',function () {
                    $('.map-select-box').fadeOut();
                })
            }
            $('.selectPlant').val($('#navigationTit').text().replace(/(^\s{5,})|(\s{5,}$)|(\s{5,})/g,""));
        }
        //设置当前区域节点下的子区域
        function setCurAreaChildren(kidsArea,curLoc,fatherId){
            $('#io-table').html('');
            var $tr = $('<tr></tr>');
            var td = '';
            str = $('#io-table');
            $.each(kidsArea,function (index, item) {
                var tpl = '<td><a class="toNextArea" sp-child="{{hasChild}}" sp-id="{{id}}" sp-fatherId="'+fatherId+'"><span class="plantName">{{name}}</span>（{{count}}座）</a></td>';
                td = Mustache.render(tpl, item);
                $tr.append($(td));
                if((index+1)%3 === 0){
                    str.append($tr);
                    $tr = $('<tr></tr>');
                }
            });
            (kidsArea.length%3 !== 0) && str.append($tr);
            //绑定下转
            $('.toNextArea').unbind().on('click',function () {
                var $this = $(this);
                var $id = $this.attr('sp-id');
                var $child = $this.attr('sp-child');
                var $fatherId = $this.attr('sp-fatherId');
                // if($child === "true"){
                _this.areaId = $id;
                _this.rangeType = 1;
                $('.alarmType').eq(0).click();
                refreshArea({
                    tokenId:Cookies.getCook('tokenId'),
                    plantType:Cookies.getCook('plantType'),
                    areaId:$id,
                    type:2,
                    serviceType:2
                });
                navigation({
                    name:$this.find('.plantName').text(),
                    id:$id,
                    fatherId:$fatherId,
                    isAdd:1
                });
                // }
                $('.selectPlant').val($('#navigationTit').text().replace(/(^\s{5,})|(\s{5,}$)|(\s{5,})/g,""));
                
            })

        }
        //区域导航
        function navigation(obj){
            var _id = obj.id.replace('.','-').replace('.','-');
            if (obj.isAdd) {
                if($('.nav-id-'+obj.id).length){
                    return
                }
                var navA = '<a sp-fatherId="'+obj.fatherId+'" class="navigation-item nav-id-'+_id+'">\/<span class="nav-text">'+obj.name+'</span></a>';
                $('#navigationTit').append(navA);

                var $navItem = $('.nav-id-'+_id);
                // $('#selectPlant').val($('#navigationTit').text());
                $navItem.data('clusterMsg',obj);
                $navItem.unbind().on('click',function(){
                    var $this = $(this);
                    obj.isAdd = !1;
                    if(Number($navItem.data('clusterMsg').fatherId) === 0)return;
                    navigation(obj);
                    // refreshMap($navItem.data('clusterMsg'))
                    _this.areaId = $navItem.data('clusterMsg').id;
                    _this.rangeType = 1;
                    $('.alarmType').eq(0).click();
                    /*_this.AlarmUtil({
                        areaId:$navItem.data('clusterMsg').id,
                    });*/
                    refreshArea({
                        tokenId:Cookies.getCook('tokenId'),
                        plantType:Cookies.getCook('plantType'),
                        areaId:$navItem.data('clusterMsg').id,
                        type:2,
                        serviceType:2
                    })
                })
            }else {

                var $item = $('.navigation-item');
                if(!$item.eq($item.length-1).hasClass('nav-id-'+_id)){
                    $item.eq($item.length-1).remove();
                    navigation(obj);
                }
            }
        }
    },
    //回显数据
    reviewData:function(){
        var that = this;
        $('#loadingData').show();
        $('#nanImg').hide();
        $.http.POST('/report/getDeviceForPlant.do',{tokenId:Cookies.getCook('tokenId')},function(res){
            if(res.body.length > 0){
                $('#loadingData').hide();
                $('#deviceForm').show();
                $('#nanImg').hide();
                $('div.sureBtn').show();
                $('.btns').show();
                // $('form .selectBtn').css('visibility','hidden')
                var html = '';
                var arr = [];
                var arr1 = [];
                $.each(res.body,function(i,val){
                    if(val.checked=='true'){
                        html+='<div class="formItem">'+
                            '<span>'+
                            '<input type="checkbox" name="" value="'+val.id+'" checked >'+
                            '<label for="" class="choose"></label>'+val.name+
                            '</span>'+
                            '</div>'
                    }else{
                        html+='<div class="formItem">'+
                            '<span>'+
                            '<input type="checkbox" name="" value="'+val.id+'" >'+
                            '<label for="" class="unChoose"></label>'+val.name+
                            '</span>'+
                            '</div>'
                    }
                });
                $('#deviceForm fieldset .items').empty();
                $('#deviceForm fieldset .items').append(html);
                $("#deviceForm :checkbox:checked").each(function (i) {
                    arr[i] = $(this).val()
                });
                var vals = arr.join(',');
                $('#dataForm').show();
                //添加可修改操作
                $('#deviceForm .items span').unbind().on('click',function(){
                    $('#dataForm').hide();
                    $('.btns').hide();
                    $('#lineContent1').hide()
                    if($(this).children('label').hasClass('choose')){
                        $(this).children('label').removeClass('choose').addClass('unChoose').end()
                            .children('input').prop('checked',false);
                    }else{
                        $(this).children('label').removeClass('unChoose').addClass('choose').end()
                            .children('input').prop('checked',true);
                    }
                });
                //点击确定根据逆变器获取出遥控信号点
                $('.sureBtn').unbind().on('click',function(){
                    var arr = [];
                    $("#deviceForm .items :checkbox:checked").each(function (i) {
                        arr[i] = $(this).val()
                    });
                    if(arr.length > 0){
                        $('#dataForm').show();
                        $('.btns').show();
                        var vals = arr.join(',');
                        $.http.POST('/report/getYXGuidForInventers.do',{inventers:vals,tokenId:Cookies.getCook('tokenId')},function(res){
                            var dHtml = '';
                            $.each(res.body,function(i,val){
                                dHtml+='<div class="formItem">'+
                                    '<span>'+
                                    '<input type="checkbox" name="" value="'+val.field+'" data-unit="'+val.unit+'">'+
                                    '<label for="" class="unChoose"></label>'+val.fieldLabel+"("+val.unit+")"+
                                    '</span>'+
                                    '</div>'
                            });
                            $('#dataForm fieldset .items').empty();
                            $('#dataForm fieldset .items').append(dHtml);
                            $('#dataForm .items span').unbind().on('click',function(){
                                if($(this).children('label').hasClass('choose')){
                                    $(this).children('label').removeClass('choose').addClass('unChoose').end()
                                        .children('input').prop('checked',false);
                                }else{
                                    $(this).children('label').removeClass('unChoose').addClass('choose').end()
                                        .children('input').prop('checked',true);
                                }
                            })
                        })
                    }else{
                        App.alert($.getI18n('report.chooseDevice'))
                    }

                });
                //加载默认遥控数据
                $.http.POST('/report/getYXGuidForInventers.do',{inventers:vals,tokenId:Cookies.getCook('tokenId')},function(res) {
                    var dHtml = '';
                    $.each(res.body, function (i, val) {
                        if(val.checked=='true'){
                            dHtml += '<div class="formItem">' +
                                '<span>' +
                                '<input type="checkbox" name="" value="' + val.field + '" data-unit="'+val.unit+'" checked>' +
                                '<label for="" class="choose"></label>' + val.fieldLabel + "(" + val.unit + ")" +
                                '</span>' +
                                '</div>'
                        }else{
                            dHtml += '<div class="formItem">' +
                                '<span>' +
                                '<input type="checkbox" name="" value="' + val.field + '" data-unit="'+val.unit+'">' +
                                '<label for="" class="unChoose"></label>' + val.fieldLabel + "(" + val.unit + ")" +
                                '</span>' +
                                '</div>'
                        }
                    });
                    $('#dataForm fieldset .items').empty();
                    $('#dataForm fieldset .items').append(dHtml);
                    //添加可修改操作
                    $('#dataForm .items span').unbind().on('click',function(){
                        if($(this).children('label').hasClass('choose')){
                            $(this).children('label').removeClass('choose').addClass('unChoose').end()
                                .children('input').prop('checked',false);
                        }else{
                            $(this).children('label').removeClass('unChoose').addClass('choose').end()
                                .children('input').prop('checked',true);
                        }
                    });
                   /* $.http.POST('/report/getHistoryLine.do',{tokenId:Cookies.getCook('tokenId')},function(res){
                        that.drawLine(res.body)
                    })*/
                    //$('.btns').show()

                    //加载时间
                    $.http.POST('/report/getHistoryTime.do',{tokenId:Cookies.getCook('tokenId')},function(res){
                        // $('#timeStart').val(res.body[0]);
                        // $('#timeEnd').val(res.body[1])
                        $('#timeStart').val(res.body[0]);
                        $('#timeEnd').val(res.body[1])
                        $('#showWin').val(res.body[2])

                        //加载曲线
                        $('#getLine').click()
                    })
                });

            }else{
                $('#loadingData').hide();
                $('#nanImg').show();
                that.areaChang()
            }
        })
    }
    //初始化时间限制




















};