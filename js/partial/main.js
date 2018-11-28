/** 2017/10/18
 * @author: kj
 * @description:
 */
define(function () {
    return MainPageRender;
});
var MainPageRender = {
    Render: function () {
        //    Todo Main function
        var _this = this;
        // $('#spNavTop').width($('#MainPage').width())
        // _this.getAjaxData();
        // console.log('containerEditor: ',$('#containerEditor').length);
        // _this.ypbKpi();
        // _this.dataTable();
        // _this.ztreeShow();
        /* $("#mainPageScroll").mCustomScrollbar('destroy');
         $("#mainPageScroll").mCustomScrollbar({
             theme:"3d",
             axis:"yx" // vertical and horizontal scrollbar
         });*/

        //切换系统
        $('#navSysCtrolNav').css("display",'block')
        $('#navSysCtrol .ctrolBox').removeClass('on')
        if (+Cookies.getCook("plantType") === 2) {
            $('#navSysCtrol .ctrolBox').eq(1).addClass('on')
        }else {
            $('#navSysCtrol .ctrolBox').eq(0).addClass('on')
        }

        $('#navSysCtrol .ctrolBox').on('click',function () {
            var $this = $(this)
            // if($(this).hasClass('on') || $this.attr('attr-sys') === 'cnmain') return
            if($(this).hasClass('on')) return
            $('#navSysCtrol .ctrolBox').removeClass('on')
            $('.solarIcon').find('img').attr('src','/images/energyEfficient/activeMonitor/solar_1.png')
            $('.socIcon').find('img').attr('src','/images/energyEfficient/activeMonitor/soc_1.png')
            $('.energyIcon').find('img').attr('src','/images/energyEfficient/activeMonitor/energy_1.png')
            $this.addClass('on')
            var _thisImg = $(this).find('img').attr('src').split('/')
            var curImg = _thisImg.pop()
            var newImg = curImg.replace(/(_1\.png)$/,'_2.png')
            _thisImg.push(newImg)
            $(this).find('img').attr('src',_thisImg.join('/'))


            Cookies.setCookByName("defaultLoading",$this.attr('attr-sys'))
            Cookies.setCookByName('plantType', +$this.attr('attr-planttype'));//电站类型，1：光伏；2：储能；4：能耗
            window.location.href=window.URLHREF
        })
        $('#navSysCtrolNav').hover(function () {
            $('#navSysCtrolNav').addClass('on')
            $('#navSysCtrol').stop(true).animate({height:'206px'},400)
        },function () {
            $('#navSysCtrol').stop(true).animate({height:'0px'},400,function () {
                $('#navSysCtrolNav').removeClass('on')
            })
        })

        //当前企业拥有的电站类型
        var plantTypeList = Cookies.getCook('plantTypeList').split(',')
        if(plantTypeList.length === 1){
            $('#navSysCtrolNav').remove()
            Cookies.setCookByName('plantType', +plantTypeList[0]);//电站类型，1：光伏；2：储能；
        }else if(plantTypeList.length === 2){
            if(plantTypeList.indexOf("1")===-1){
                Cookies.setCookByName('plantType', 2);//电站类型，1：光伏；2：储能；4：
                // 能耗
                $('#solarIcon').remove()
            }else if(plantTypeList.indexOf("2")===-1){
                Cookies.setCookByName('plantType', 1);//电站类型，1：光伏；2：储能；4：能耗
                $('#socIcon').remove()
            }else if(plantTypeList.indexOf("4")===-1){
                Cookies.setCookByName('plantType', 1);//电站类型，1：光伏；2：储能；4：能耗
                $('#energyIcon').remove()
            }
        }



        //设置用户名字
        $('#userName').text(Cookies.getCook('userName'));
        var logoPic = Cookies.getCook('logoPic');
        !!logoPic ? $('#logoImg').attr('src', logoPic).one('error', function () {
            $('#logoImg').attr('src', '/images/logo.png')
        }) : $('#logoImg').attr('src', '/images/logo.png');
        var userPic = Cookies.getCook('userPic');
        !!userPic ? $('.admin img').attr('src', userPic).one('error', function () {
            $('.admin img').attr('src', '/images/newMain/admin.png')
        }) : $('.admin img').attr('src', '/images/newMain/admin.png');
        //退出
        $('#exitSys').on('click', function () {
            $.http.POST('/login/loginOut.do', {}, function (result) {
                Menu.clearUserRole();
                Cookies.setCookByName('tokenId', '');
                localStorage.setItem('login', '');
                Cookies.clearAllCookie()
                window.location.href = window.URLHREF
            })
        });
        //修改密码
        $('#modifyPwd').unbind().on('click', function () {
            _this.modifyPassword()
        });
        //告警设置
        _this.alarmSet()
        //个人用户有电站数量区分
        if (Number(Cookies.getCook('userType')) === 1) {
            var plantType=+Cookies.getCook('plantType');
            var plantNum = Cookies.getCook('plantNum').split(',')
            var plantIds = Cookies.getCook('plantId').split(',')
            var _id,_num
            if(plantType === 1){
                _id = plantIds[0]
                _num= (+plantNum[0] === -1 ? 0 : +plantNum[0])
            }else {
                _id = plantIds[1]
                _num= (+plantNum[0] === -1 ? 0 : +plantNum[0])
            }
            if (_num === 1) {
                $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:plantType,plantId:_id});
                return
                // $('#plantUrl').attr('attr-href', 'partial/plantMonitor/pmSingleIndex.html',{singlePlantType:plantType})
            } else if ( _num=== 0) {
                $('#mianPage_container').append('<div class="noPlant"><img src="/images/noPlant.png" /></div>');
                return
            }
        }
        //导航切换
        $("nav ul li").each(function (index) {
            if (index != "0") {
                if ($(this).hasClass("activeLi")) {
                    $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg2.png");
                    $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                    $(this).css("background-color", "#2A353E")
                }
            } else {

                if ($(this).hasClass("activeLi")) {
                    $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                    $(this).css("background-color", "#2A353E")
                }
            }
        });
        $("nav ul li").on("click", function () {

            if (!$(this).index($("nav ul li")) && Cookies.getCook("defaultLoading") == "singleSys") {
                //    大屏跳单电站
            } else {
                $('#mianPage_container').loadPage($(this).find('a').attr('attr-href'));
            }
            //导航栏样式
            $("nav ul li").each(function (index) {
                $(this).removeClass("activeLi")
            });
            $(this).addClass("activeLi");
            $("nav ul li").each(function (index) {
                if (index != 0) {
                    $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg4.png");
                    $(this).css("background-color", "#121E28");
                    if ($(this).hasClass("activeLi")) {
                        $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg2.png");
                        $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                        $(this).css("background-color", "#2A353E");
                        // $("nav ul li").eq(0).children(".next").find("img").attr("src","/images/newMain/nav_bg4.png")
                        $("nav ul li").eq(0).children(".firPer").find("img").attr("src", "/images/newMain/nav_bg1.png");
                        $("nav ul li").eq(0).children(".next").find("img").attr("src", "/images/newMain/nav_bg4.png");
                        if (index - 1 == 0) {
                            $("nav ul li").eq(0).children(".next").find("img").attr("src", "/images/newMain/nav_bg2.png")
                        }
                    }
                }
                else {
                    $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                    $(this).children(".firPer").find("img").attr("src", "/images/newMain/nav_bg5.png");
                    $(this).css("background-color", "#121E28");
                    if ($(this).hasClass("activeLi")) {
                        $(this).css("background-color", "#2A353E")
                    }
                }
            })
        });
        // $('nav ul li').eq(0).click();
        // $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html',{plantId:1,singlePlantType:1});
        // $('#singlePlantId').val(1)
        //hover效果
        $("nav ul li").on("mouseover", function () {
            if ($(this).prev("li").hasClass("activeLi")) {
                $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg6.png");
                $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                $(this).css("background-color", "#2A353E")
            } else if ($(this).next("li").hasClass("activeLi")) {
                $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg6.png");
                $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg2.png");
                $(this).css("background-color", "#2A353E")
            } else if ($(this).hasClass("activeLi")) {

            } else {
                $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg2.png");
                $(this).css("background-color", "#2A353E")
            }
        });
        $("nav ul li").on("mouseleave", function () {
            if ($(this).prev("li").hasClass("activeLi")) {
                $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg3.png");
                $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg4.png");
                $(this).css("background-color", "#121E28")
            } else if ($(this).next("li").hasClass("activeLi")) {
                $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg2.png");
                $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg4.png");
                $(this).css("background-color", "#121E28")
            } else if ($(this).hasClass("activeLi")) {

            } else {
                $(this).children(".next").find("img").attr("src", "/images/newMain/nav_bg4.png");
                $(this).prev("li").children(".next").find("img").attr("src", "/images/newMain/nav_bg4.png");
                $(this).css("background-color", "#121E28")
            }
        });
        $("nav ul li").eq(0).on("mouseover", function () {
            if (!$(this).hasClass("activeLi")) {
                $(this).children(".firPer").find("img").attr("src", "/images/newMain/nav_bg5.png")
            }
        });
        $("nav ul li").eq(0).on("mouseleave", function () {
            if (!$(this).hasClass("activeLi")) {
                $(this).children(".firPer").find("img").attr("src", "/images/newMain/nav_bg1.png")
            }
        });
        //    大屏切换
        $('#switchScreen').on('click', function () {
            Cookies.setCookByName('defaultLoading', "synpowerScreen");
            window.location.href = '/'
        });
        //切换到设置页面
        $(".setup").on("click", function () {
            var $this = $(this);
            $('#sysBody').loadPage($this.find("a").attr('attr-href'))
        })
        // $(".setup").click()
    },
    //修改密码
    modifyPassword: function () {
        var pd = '';
        var pwdContent = '<form id="pwdForm">' +
            '<div class="form-group1">' +
            '<b>*' +
            '</b>' +
            '<label>' + $.getI18n('oldPwd') +'：'+
            '</label>' +
            '<input name="OldPassword" type="password" id="OldPassword"/>' +
            '<span class="OldPassword">&nbsp;</span>' +
            '</div>' +
            '<div class="form-group1">' +
            '<b>*' +
            '</b>' +
            '<label>' + $.getI18n('newPwd') +'：'+
            '</label>' +
            '<input name="NewPassword" type="password" id="NewPassword"/>' +
            '<span class="NewPassword">&nbsp;</span>' +
            '</div>' +
            '<div class="form-group1">' +
            '<b>*' +
            '</b>' +
            '<label>' + $.getI18n('confirmPwd') +'：'+
            '</label>' +
            '<input name="repNewPassword" type="password" id="repNewPassword"/>' +
            '<span class="repNewPassword">&nbsp;</span>' +
            '</div>' +
            '</form>';
        pd = App.dialog({
            title: $.getI18n('modifyPWD'),
            width: 450,
            height: 260,
            maxWidth: document.documentElement.clientWidth - 40,
            maxHeight: document.documentElement.clientHeight - 42,
            appendTo: 'body',
            backdrop: false,
            modal: true,
            keyboard: true,
            content: pwdContent,
            // openEvent: function () {
            //     setEnvent()
            // },
            closeEvent: null,
            isdrag: true,
            buttons: [{
                text: $.getI18n('cancel'),
                type: 'imgNoBtn',
                clickToClose: true,
                id: 'cancelOwner'
            }, {text: $.getI18n('save'), type: 'imgNoBtn', clickToClose: true, id: 'saveOwner'}]
        });
        $('#OldPassword').unbind().on('blur', function () {
            if ($.trim($('#OldPassword').val())) {
                $('.OldPassword').text($.getI18n('inputOldPwd')).css('visibility', 'hidden')
            }
        });
        $('#NewPassword').unbind().on('blur', function () {
            if ($.trim($('#NewPassword').val())) {
                $('.NewPassword').text($.getI18n('inputNewPwd')).css('visibility', 'hidden')
            }
        });
        $('#repNewPassword').unbind().on('blur', function () {
            if ($.trim($('#repNewPassword').val())) {
                $('.repNewPassword').text($.getI18n('inputconfPwd')).css('visibility', 'hidden')
            }
        });
        $('#saveOwner').unbind().on('click', function () {
            if (!$.trim($('#OldPassword').val())) {
                $('.OldPassword').text($.getI18n('inputOldPwd')).css('visibility', 'visible');
                return false;
            }
            if (!$.trim($('#NewPassword').val())) {
                //App.alert('请输入新密码');
                $('.NewPassword').text($.getI18n('inputNewPwd')).css('visibility', 'visible');
                return false;
            }
            if (!$.trim($('#repNewPassword').val())) {
                $('.repNewPassword').text($.getI18n('inputconfPwd')).css('visibility', 'visible');
                //App.alert('请输入确认新密码');
                return false;
            }
            if ($('#NewPassword').val() != $('#repNewPassword').val()) {
                //App.alert('确认新密码与新密码不相等，请重新输入！');
                $('.repNewPassword').text($.getI18n('difPwd')).css('visibility', 'visible');
                return false;
            }
            var data = $('#pwdForm').getForm();
            $.each(data, function (i, val) {
                data[i] = hex_md5(val)
            });
            data.tokenId = Cookies.getCook('tokenId');
            data.userId = Cookies.getCook('id');
            $.http.POST('/user/updateUserPwd.do', data, function (res) {
                // App.alert(res.msg)
                if (res.code == 101) {
                    App.warningDialog(res.msg,1)
                } else {
                    App.warningDialog(res.msg);
                    $('#exitSys').click()
                }
            }, true, true)
        })
    },
    //告警设置
    alarmSet:function () {
        getAlarmData();
        function getAlarmData(){
            $.post('/alarm/getAlarmData.do',JSON.stringify({tokenId:Cookies.getCook('tokenId')}),function(result){
                var data = result.body;
//                    如果有告警
                if(data.isAlarm){
                    $('#alarmBtn img').attr('src',"/images/newMain/alarmlight.gif")
                    $('#alarmBtn').unbind().on('click',confirmAlarm)
                }else {
//                        没有告警,关闭警灯
                    $('#alarmBtn img').attr('src',"/images/newMain/alarmlight.png")
                    $('#alarmBtn').unbind('click')
                }
                setTimeout(getAlarmData,5000)

            })
        }

        function confirmAlarm(){
            App.dialog({
                title: '告警提示',
                width: 320,
                height: 50,
                content: '确认告警，关闭警灯',
                openEvent:function () {
                    //    告警确定
                    $('#saveSet').unbind().on('click',function(){
                        $.http.POST('/alarm/getConfirmAlarm.do',{tokenId:Cookies.getCook('tokenId')},function(result){
                            App.warningDialog(result.msg)
                        })
                    })                },
                buttons: [{
                    text: $.getI18n('cancel'),
                    type: 'imgNoBtn',
                    clickToClose: true
                }, {text: '确认', type: 'imgNoBtn', clickToClose: true, id: 'saveSet'}]
            });
        }

    },
    //请求接口数据
    getAjaxData: function () {
        var _this = this;
        $.http.POST('/interface/getCurrentEMS.do', {}, function (result) {
            /*if (result.code =='100') {
                _this.DrawTable(result.body.currentCurve);
            }else {
                App.alert({code:result.code,msg:result.msg})
            }*/
            _this.DrawTable(result.body.currentCurve);
        });
        $.http.POST('/interface/getPowerCurve.do', {}, function (result) {
            _this.esKpi(result.body);
        });
        //地图
        var mapId = 'mapContainer';
        $('#' + mapId).length && $.http.POST('/interface/getPlantInfo.do', {}, function (result) {
            _this.MapContain(mapId, result.body.loaction);
        })
    },
    //渲染KPI
    DrawTable: function (datas) {

        var xData = datas.time;
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        // color: '#006699'
                    }
                },
                formatter: function (item) {
                    var str = '<div style="color: #a5e2f9">' + item[0].axisValue + '</div>';
                    for (var i = 0, len = item.length; i < len; i++) {
                        str += '<div style="color: #a5e2f9">' + item[i].seriesName + ': <span style="font-size: 1.3em">' + item[i].data + '</span>' + datas.unit + '</div>'
                    }
                    return str;
                }

            },
            color: ['#00ae2e'],
            /*grid: {
                top: '10%',
                bottom: '15%',
                left: '5%',
                right: '3%'
            },*/
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#272761'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        // color: '#a5e2f9',
                        fontSize: 16
                    }
                },
                axisLine: {
                    lineStyle: {
                        // color: '#1c4c88'
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                nameTextStyle: {
                    // color: '#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name: datas.name + '(' + datas.unit + ')',
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        // color: ['#272761'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        // color: '#a5e2f9',
                        fontSize: 16
                    }
                },
                axisLine: {
                    lineStyle: {
                        // color: '#1c4c88'
                    }
                },
                nameTextStyle: {
                    // color: '#a5e2f9',
                    fontSize: 16
                }
            }],
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 0,
                    end: 100,
                    // borderColor:'rgba(17,58,106, .6)',
                    // backgroundColor:'rgba(5,30,64, .9)',
                    // fillerColor:'rgba(5,30,64, 0.1)',
                    // dataBackground:'rgba(1,39,84, 0.35)',
                    handleStyle: {
                        // color:'rgba(0,101,153, 0.35)',
                        // borderColor:'rgba(0,101,153, 0.35)',
                    },
                    textStyle: {
                        // color:'rgba(165, 226, 249)'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 1,
                    end: 35
                }
            ],
            series: [{
                name: datas.name,
                type: 'line',
                step: 'start',
                data: datas.value,
                showSymbol: true,
                symbol: 'emptyCircle',
                // symbolSize: 1,
                areaStyle: {
                    normal: {
                        // shadowColor: 'rgba(0, 0, 0, 0.1)',
                        // shadowBlur: 10
                        opacity: 0.2
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        // esKpiChart.setOption(option);
        Echarts.render('echartsFlow', option);

    },
    //渲染KPI
    esKpi: function (datas) {
        var xData = datas.time;
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        // color: '#006699'
                    }
                },
                formatter: function (item) {
                    var str = '<div style="color: #a5e2f9">' + item[0].axisValue + '</div>';
                    for (var i = 0, len = item.length; i < len; i++) {
                        str += '<div style="color: #a5e2f9">' + item[i].seriesName + ': <span style="font-size: 1.3em">' + item[i].data + '</span>' + datas.unit + '</div>'
                    }
                    return str;
                }

            },
            color: ['RGB(4,138,48)', 'RGB(3,100,201)', 'RGB(192,114,49)'],
            legend: {
                right: '20',
                itemGap: 40,
                icon: 'line',
                textStyle: {
                    // color:'#a5e2f9',
                    fontsize: 12
                },
                top: '5%',
                left: '35%',
                data: ''
            },
            /* grid: {
                 top:'20%',
                 bottom:'20%',
                 left: '6.8%',
                 right: '6.8%'
             },*/
            xAxis: {
                // name:'日',
                boundaryGap: false,
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#272761'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        // color:'#a5e2f9'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#1c4c88'
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                nameTextStyle: {
                    // color:'#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name: '(' + datas.unit + ')',
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#272761'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        // color:'#a5e2f9'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#1c4c88'
                    }
                },
                nameTextStyle: {
                    // color:'#a5e2f9'
                }
            }],

            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 0,
                    end: 100,
                    // borderColor:'rgba(17,58,106, .6)',
                    // backgroundColor:'rgba(5,30,64, .9)',
                    // fillerColor:'rgba(5,30,64, 0.1)',
                    // dataBackground:'rgba(1,39,84, 0.35)',
                    handleStyle: {
                        // color:'rgba(0,101,153, 0.35)',
                        // borderColor:'rgba(0,101,153, 0.35)',
                    },
                    textStyle: {
                        // color:'rgba(165, 226, 249)'
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
        var powers = datas.power;
        var yDatas = [];
        for (var i = 0, len = powers.length; i < len; i++) {
            legendData.push(powers[i].name);
            yDatas[i] = powers[i].value;
            option.series.push({
                name: powers[i].name,
                type: 'line',
                data: powers[i].value,
                showSymbol: false,
                symbolSize: 1,
                areaStyle: {
                    normal: {
                        // shadowColor: 'rgba(0, 0, 0, 0.1)',
                        // shadowBlur: 10
                        opacity: 0.4
                    }
                }
            });
        }
        option.legend.data = legendData;
        Echarts.render('echartsFlow1', option);

    },
    //渲染地图
    MapContain: function (id, center) {
        require(['MapUtil'], function () {
            var map = L.map(id, {
                center: center || [],
                zoomControl: false,
                attributionControl: false,
                zoom: 8
            });
            L.tileLayer.provider('Google.Satellite.Map').addTo(map);

            function getRandomLatLng() {
                return L.latLng(center);
            }

            var markers = L.markerClusterGroup();
            markers.addLayer(L.marker(getRandomLatLng(map)));
            map.addLayer(markers);
        })
    },
    showEdit: function () {
        var editId = 'containerEditor';
        $('#' + editId).length && UE.getEditor(editId, {
            UEDITOR_HOME_URL: '/js/plugins/Ueditor/',
            // initialFrameWidth : 600,
            initialFrameHeight: 300
        });
    },
    ypbKpi: function () {
        var option = {
            "toolbox": {
                "show": false,
                "feature": {
                    "mark": {
                        "show": true
                    },
                    "restore": {
                        "show": true
                    },
                    "saveAsImage": {
                        "show": true
                    }
                }
            },
            "series": [{
                "name": "指标",
                "type": "gauge",
                "startAngle": 180, //总的360，设置180就是半圆
                "endAngle": 0,
                "center": ["50%", "77%"], //整体的位置设置
                "radius": 200,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 20,
                        shadowBlur: 0,
                        color: [[0.2, '#E43F3D'], [0.4, '#E98E2C'], [0.6, '#DDBD4D'], [0.8, '#7CBB55'], [1, '#9CD6CE']]
                    }
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "show": false
                },
                "splitLine": {
                    "show": false
                },
                "pointer": {
                    "width": 10, //指针的宽度
                    "length": "80%", //指针长度，按照半圆半径的百分比
                    "color": "#2d99e2"
                },
                "title": {
                    "show": true,
                    "offsetCenter": [25, "-40%"], //标题位置设置
                    "textStyle": { //标题样式设置
                        "color": "#2d99e2",
                        "fontSize": 32,
                        "fontFamily": "微软雅黑",
                        "fontWeight": "bold"
                    }
                },
                "detail": {
                    "show": false
                },
                "data": [{ //显示数据
                    "value": 69.8,
                    "name": "500 kW"
                }]
            }]
        };
        Echarts.render('echartsypb', option);
    },
    dataTable: function () {
        var table = $("#issueTable").DataTable({
            ajax: {
                type: "POST",
                url: "login/dataTable.do?tokenId=" + Cookies.getCook('tokenId'),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: function (d) {

                    // d.aaa={bb:111}
                    var orders = d.order;
                    var orderName = [];
                    $.each(orders, function (index, item) {
                        var columns = d.columns;
                        var columnName = columns[Number(item.column)].data;
                        var dir = item.dir;
                        var str = '{"' + columnName + '":"' + dir + '"}';
                        orderName.push(eval("(" + str + ")"))
                    });
                    d.orderName = orderName;
                    d = JSON.stringify(d);
                    return d
                    // return JSON.stringify(d)
                },
                dataSrc: function (json) {
                    Number(json.code) == 104 && App.alert(json);
                    json.draw = json.body.draw;
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    !json.body.data && (json.body.data = []);
                    return json.body.data
                }
            },
            "sort": "position Asc",
            "processing": true,
            "searching": false,//关闭搜索框
            "bFilter": true, //是否启动过滤、搜索功能
            "serverSide": true,//服务器分页
            "pagingType": "full_numbers",
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-center");
            },
            order: [[3, "desc"], [2, "desc"]],
            columns: [
                {data: "name", "title": 'Name', "searchable": true},
                {data: "position", "title": 'Position', "searchable": true},
                {data: "office", "title": 'Office', "searchable": true},
                {data: "extn", "title": 'Extn.', "searchable": true},
                {data: "start_date", "title": 'Start date', "searchable": true},
                {data: "salary", "title": 'Salary', "searchable": true},
                {
                    data: null,
                    "title": '操作',
                    "searchable": false,
                    "defaultContent": "<button class='edit-btn' type='button'>编辑</button>"
                }
            ],
            "aLengthMenu": [10, 15, 50],
            "oLanguage": {    // 语言设置
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "检索:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                }
            },

        });

        $("#issueTable").on("click", ".edit-btn", function () {
            var tds = $(this).parents("tr").children();
            $.each(tds, function (i, val) {
                var jqob = $(val);
                if (i < 1 || jqob.has('button').length) {
                    return true;
                }//跳过第1项 序号,按钮
                var txt = jqob.text();
                var put = $("<input type='text'>");
                put.val(txt);
                jqob.html(put);
            });
            $(this).html("保存");
            $(this).toggleClass("edit-btn");
            $(this).toggleClass("save-btn");
        });

        $("#issueTable").on("click", ".save-btn", function () {
            var row = table.row($(this).parents("tr"));
            var tds = $(this).parents("tr").children();
            $.each(tds, function (i, val) {
                var jqob = $(val);
                //把input变为字符串
                if (!jqob.has('button').length) {
                    var txt = jqob.children("input").val();
                    jqob.html(txt);
                    table.cell(jqob).data(txt);//修改DataTables对象的数据
                }
            });
            var data = row.data();
            /*$.ajax({
                "url":"/example/resources/user_share/inline_edit_no_plugin/edit.php",
                "data":data,
                "type":"post",
                "error":function(){
                    alert("服务器未正常响应，请重试");
                },
                "success":function(response){
                    alert(response);
                }
            });*/
            $(this).html("编辑");
            $(this).toggleClass("edit-btn");
            $(this).toggleClass("save-btn");
        });

    },
    ztreeShow: function () {
        var setting = {
            data: {
                key: {
                    title: "t"
                },
                simpleData: {
                    enable: true
                }
            },
            view: {
                fontCss: getFontCss
            }
        };
        var zNodes = [
            {id: 1, pId: 0, name: "父节点1 - 展开", open: true},
            {id: 11, pId: 1, name: "父节点11 - 折叠"},
            {id: 111, pId: 11, name: "叶子节点111"},
            {id: 112, pId: 11, name: "叶子节点112"},
            {id: 113, pId: 11, name: "叶子节点113"},
            {id: 114, pId: 11, name: "叶子节点114"},
            {id: 12, pId: 1, name: "父节点12 - 折叠"},
            {id: 121, pId: 12, name: "叶子节点121"},
            {id: 122, pId: 12, name: "叶子节点122"},
            {id: 123, pId: 12, name: "叶子节点123"},
            {id: 124, pId: 12, name: "叶子节点124"},
            {id: 13, pId: 1, name: "父节点13 - 没有子节点", isParent: true},
            {id: 2, pId: 0, name: "父节点2 - 折叠"},
            {id: 21, pId: 2, name: "父节点21 - 展开", open: true},
            {id: 211, pId: 21, name: "叶子节点211"},
            {id: 212, pId: 21, name: "叶子节点212"},
            {id: 213, pId: 21, name: "叶子节点213"},
            {id: 214, pId: 21, name: "叶子节点214"},
            {id: 22, pId: 2, name: "父节点22 - 折叠"},
            {id: 221, pId: 22, name: "叶子节点221"},
            {id: 222, pId: 22, name: "叶子节点222"},
            {id: 223, pId: 22, name: "叶子节点223"},
            {id: 224, pId: 22, name: "叶子节点224"},
            {id: 23, pId: 2, name: "父节点23 - 折叠"},
            {id: 231, pId: 23, name: "叶子节点231"},
            {id: 232, pId: 23, name: "叶子节点232"},
            {id: 233, pId: 23, name: "叶子节点233"},
            {id: 234, pId: 23, name: "叶子节点234"},
            {id: 3, pId: 0, name: "父节点3 - 没有子节点", isParent: true}
        ];

        function focusKey(e) {
            if (key.hasClass("empty")) {
                key.removeClass("empty");
            }
        }

        function blurKey(e) {
            if (key.get(0).value === "") {
                key.addClass("empty");
            }
        }

        var lastValue = "", nodeList = [], fontCss = {};

        function searchNode(e) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var value = $.trim(key.get(0).value);
            var keyType = "name";
            if (lastValue === value) return;
            lastValue = value;
            if (value === "") return;
            updateNodes(false);
            nodeList = zTree.getNodesByParamFuzzy(keyType, value);
            updateNodes(true);
        }

        function updateNodes(highlight) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            for (var i = 0, l = nodeList.length; i < l; i++) {
                nodeList[i].highlight = highlight;
                zTree.updateNode(nodeList[i]);
                zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将父节点展开
            }
        }

        function getFontCss(treeId, treeNode) {
            return (!!treeNode.highlight) ? {color: "#A60000", "font-weight": "bold"} : {
                color: "#333",
                "font-weight": "normal"
            };
        }

        function filter(node) {
            return !node.isParent && node.isFirstNode;
        }

        var key;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        key = $("#key");
        key.bind("focus", focusKey)
            .bind("blur", blurKey)
            .bind("propertychange", searchNode)
            .bind("input", searchNode);
    }
};