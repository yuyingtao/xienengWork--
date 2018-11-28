/** 2018/3/6
 * @author: SP0014
 * @description:  单电站页面 静态信息简介
 */
define(function () {
    return spInfo;
});
var spInfo = {
    domId: 'spMonitorCarousel',//模块中的任意Id
    plantId: '',//电站id
    limitDate:'',
    capPowerInter:'',//功率比定时器
    powerInter:'',//功率比定时器  光储
    cnPowerInter:'',//功率比定时器  光储
    singlePlantType:1,
    Render:function(opts){
        var _this = this;
        _this.plantId = opts.plantId || ''
        _this.singlePlantType = opts.singlePlantType;
        if(_this.singlePlantType==1){
            $('.photovoltaic-plant').show();
            $('.energy-plant').hide();
            $('.Optical-storage-plant').hide();
            _this.getData()
        }else if(_this.singlePlantType==2){
            $('.photovoltaic-plant').hide();
            $('.energy-plant').show();
            $('.Optical-storage-plant').hide();
            _this.cnData()
        }else{
            $('.photovoltaic-plant').hide();
            $('.energy-plant').hide();
            $('.Optical-storage-plant').show();
            _this.gcData()
        }
    },
    getData:function(){
        var _this = this;
        $.http.POST('/monitor/singleBasicInfo.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.setBasicInfo(result.body);

            //    摄像头
            $('#toCamera').on('click', function (e) {
                _this.cameraWin(result.body);
                // $('#popDetailWin').remove();
                e.stopPropagation()
            })
        });
        //时间限制限定
        $.http.POST('/monitor/getProSearchDate.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.limitDate = result.body
        });
        // 功率数据获取  光伏
        capPowerInter();
        function capPowerInter(){
            if (main.clearInterCharge(_this.capPowerInter, _this.domId)) return;
            $.http.POST('/monitor/plantStatusPower.do',{plantId:_this.plantId,tokenId:Cookies.getCook('tokenId')},function(res){
                _this.capPower(res.body)
            })
        }
        _this.capPowerInter = setInterval(capPowerInter, 30000);
    },
    //静态信息 光伏
    setBasicInfo: function (datas) {
        $('.gf-plant-info').find('p').eq(0).find('b').text(datas.plantType);
        $('.gf-plant-info').find('p').eq(1).find('b').text(datas.address);
        $('.gf-plant-info').find('p').eq(2).find('b').text(datas.plantArea);
        $('.gf-plant-info').find('p').eq(3).find('b').text(datas.contacts + ' ' + datas.contactsTel);
        $('.gf-plant-info').find('p').eq(4).find('b').text(datas.connectTime);
        $('.info').find('p').text($.getI18n('plantMonitor.introduction') + datas.desc);
        // var value = datas.img
        // !!value  ? $('#sp-image').attr('src',value).one('error',function () {
        //     $('#sp-image').attr('src','/images/repImages/default_plant.png') }) : $('#sp-image').attr('src','/images/pmImages/default_plant.png')
        //
        //轮播图片
        var divHtml = '';
        var liHtml = '';
        //<!--<li data-target="#myCarousel" data-slide-to="0" class="active"></li>-->
        if (datas.img) {
            if (datas.img.length == 1) {
                divHtml += '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>' +
                    '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>' +
                    '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>';
                liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="0" class="active"></li>' +
                    '<li data-target="#spMonitorCarousel" data-slide-to="1"></li>' +
                    '<li data-target="#spMonitorCarousel" data-slide-to="2"></li>'
            } else {
                $.each(datas.img, function (i, val) {
                    divHtml += '<div class="item"><img src="' + val + '" style="height: 230px"></div>';
                    liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="' + i + '"></li>'
                })
            }
        } else {
            divHtml = '<div class="item"><img src="/images/defaultPlant.png"></div>' +
                '<div class="item"><img src="/images/defaultPlant.png"></div>' +
                '<div class="item"><img src="/images/defaultPlant.png"></div>';
            liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="0" class="active"></li>' +
                '<li data-target="#spMonitorCarousel" data-slide-to="1"></li>' +
                '<li data-target="#spMonitorCarousel" data-slide-to="2"></li>'
        }
        $('.carousel-inner').html(divHtml);
        $('.carousel-indicators').html(liHtml);
        $('.carousel-indicators').find('li').eq(0).addClass('active');
        $('.item').eq(0).addClass('active');
        $('#spMonitorCarousel').carousel();
    },
    //静态信息 光储
    setBasicInfo1: function (datas) {
        $('.plant-information').find('p').eq(0).find('b').text(datas.plantType);
        $('.plant-information').find('p').eq(1).find('b').text(datas.address);
        $('.plant-information').find('p').eq(2).find('b').text(datas.plantArea);
        $('.plant-information').find('p').eq(3).find('b').text(datas.contacts + ' ' + datas.contactsTel);
        $('.plant-information').find('p').eq(4).find('b').text(datas.connectTime);
        $('.info').find('p').text($.getI18n('plantMonitor.introduction') + datas.desc);
        // var value = datas.img
        // !!value  ? $('#sp-image').attr('src',value).one('error',function () {
        //     $('#sp-image').attr('src','/images/repImages/default_plant.png') }) : $('#sp-image').attr('src','/images/pmImages/default_plant.png')
        //
        //轮播图片
        var divHtml = '';
        var liHtml = '';
        //<!--<li data-target="#myCarousel" data-slide-to="0" class="active"></li>-->
        if (datas.img) {
            if (datas.img.length == 1) {
                divHtml += '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>' +
                    '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>' +
                    '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>';
                liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="0" class="active"></li>' +
                    '<li data-target="#spMonitorCarousel" data-slide-to="1"></li>' +
                    '<li data-target="#spMonitorCarousel" data-slide-to="2"></li>'
            } else {
                $.each(datas.img, function (i, val) {
                    divHtml += '<div class="item"><img src="' + val + '" style="height: 230px"></div>';
                    liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="' + i + '"></li>'
                })
            }
        } else {
            divHtml = '<div class="item"><img src="/images/defaultPlant.png"></div>' +
                '<div class="item"><img src="/images/defaultPlant.png"></div>' +
                '<div class="item"><img src="/images/defaultPlant.png"></div>';
            liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="0" class="active"></li>' +
                '<li data-target="#spMonitorCarousel" data-slide-to="1"></li>' +
                '<li data-target="#spMonitorCarousel" data-slide-to="2"></li>'
        }
        $('.carousel-inner').html(divHtml);
        $('.carousel-indicators').html(liHtml);
        $('.carousel-indicators').find('li').eq(0).addClass('active');
        $('.item').eq(0).addClass('active');
        $('#spMonitorCarousel').carousel();
    },
    //静态信息 储能
    setBasicInfo2: function (datas) {
        $('.cn-plant-info').find('p').eq(0).find('b').text(datas.plantType);
        $('.cn-plant-info').find('p').eq(1).find('b').text(datas.address);
        $('.cn-plant-info').find('p').eq(2).find('b').text(datas.plantArea);
        $('.cn-plant-info').find('p').eq(3).find('b').text(datas.contacts + ' ' + datas.contactsTel);
        $('.cn-plant-info').find('p').eq(4).find('b').text(datas.connectTime);
        //轮播图片
        var divHtml = '';
        var liHtml = '';
        //<!--<li data-target="#myCarousel" data-slide-to="0" class="active"></li>-->
        if (datas.img) {
            if (datas.img.length == 1) {
                divHtml += '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>' +
                    '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>' +
                    '<div class="item"><img src="' + datas.img[0] + '" style="height: 230px"></div>';
                liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="0" class="active"></li>' +
                    '<li data-target="#spMonitorCarousel" data-slide-to="1"></li>' +
                    '<li data-target="#spMonitorCarousel" data-slide-to="2"></li>'
            } else {
                $.each(datas.img, function (i, val) {
                    divHtml += '<div class="item"><img src="' + val + '" style="height: 230px"></div>';
                    liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="' + i + '"></li>'
                })
            }
        } else {
            divHtml = '<div class="item"><img src="/images/defaultPlant.png"></div>' +
                '<div class="item"><img src="/images/defaultPlant.png"></div>' +
                '<div class="item"><img src="/images/defaultPlant.png"></div>';
            liHtml += '<li data-target="#spMonitorCarousel" data-slide-to="0" class="active"></li>' +
                '<li data-target="#spMonitorCarousel" data-slide-to="1"></li>' +
                '<li data-target="#spMonitorCarousel" data-slide-to="2"></li>'
        }
        $('.carousel-inner').html(divHtml);
        $('.carousel-indicators').html(liHtml);
        $('.carousel-indicators').find('li').eq(0).addClass('active');
        $('.item').eq(0).addClass('active');
        $('#spMonitorCarousel').carousel();
    },
    cameraWin:function (obj) {
        /*var ca = [];
        ca.push({id: 1, name: "摄像头一", sn: "B78AE84B-EEBb-Af51-BC5F-C6C23EDECc98"})
        if(obj.cameraInfos === undefined || !obj.cameraInfos.length){
            $.extend(obj,{cameraInfos:[{id: 1, name: "摄像头一", sn: "B78AE84B-EEBb-Af51-BC5F-C6C23EDECc98"}]});
            console.log('obj',obj)
        }*/
        var _this = this;
        var arr = obj.cameraInfo.cameraInfos;
        if(!arr.length){
            App.alert($.getI18n('screen.noCamera'));
            return
        }
        var cameraList = '';
        var cla='';
        for(var i=0;i<arr.length;i++){
            i===0?cla = 'on':cla = '';
            cameraList += '<a class="'+cla+'" attrid="'+arr[i].id+'" attrsn="'+arr[i].sn+'">'+arr[i].name+'</a>'
        }
        var str = '<div class="camerapop" id="LiveWin">\n' +
            '    <div class="cameraWin">\n' +
            '        <a class="closebtn" id="cawin-close"><img src="/images/largeScreen/close_1.png"></a>\n' +
            '        <div class="top-tit">'+obj.name+'('+'<span id="cameraName">'+arr[0].name+'</span>'+')'+'</div>\n' +
            '        <div class="c-main">\n' +
            '            <div class="floatBox"><a class="toHis" id="toHis" ></a></div>\n' +
            '            <div id="videoMain" class="videoMain">\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="b-toolbar"><div class="cameraSw" id="cameraList">'+cameraList+'</div><div class="toolBarCon"><a class="switchSource" id="vedio1">'+$.getI18n('fluent')+'</a><a class="switchSource on" id="vedio2">'+$.getI18n('definition')+'</a><!--<a class="switchScreen" id="switchScreen"></a>--></div></div>\n' +
            '    </div>\n' +
            '</div>';
        $('#sysBody').append(str);
        $('#cawin-close').unbind().on('click',function () {
            $('#LiveWin').remove();
        });

        //摄像头切换
        $('#cameraList a').unbind().on('click',function () {
            $('#cameraName').text($(this).text());
            $('#cameraList a').removeClass('on');
            $(this).addClass('on');
            $('#mapPlayer').hide();
            obj.setSN = $(this).attr('attrsn');
            obj.setCameraName = $(this).text();

            $.http.POST('/device/getLiveHLS.do',{tokenId:Cookies.getCook('tokenId'),id:$(this).attr('attrid')},function (res) {
                $('#vedio1').attr('attrhlssrc',res.body.hls.replace(/\.hd/,''));
                $('#vedio1').attr('attrrtmpsrc',res.body.rtmp.replace(/\.hd/,''));
                $('#vedio2').attr('attrhlssrc',res.body.hls);
                $('#vedio2').attr('attrrtmpsrc',res.body.rtmp);
                $('#videoMain').html(
                    '<video id="mapPlayer" poster="/images/cameraLoading.gif" autoplay controls playsInline webkit-playsinline>\n' +
                    '                <source id="rtmpUrl" src="'+res.body.rtmp+'" />\n' +
                    '                <source id="hlsUrl" src="'+res.body.hls+'" type="application/x-mpegURL" />\n' +
                    '            </video>'
                );
                $('#mapPlayer').show();

                var player = new EZUIPlayer('mapPlayer');

                player.on('error', function(){
                    console.log('error');
                });
                player.on('play', function(){
                    console.log('play');
                });
                player.on('pause', function(){
                    console.log('pause');
                });
                //流畅
                $('#vedio1').unbind().on('click',function () {
                    $('.toolBarCon a').removeClass('on');
                    $(this).addClass('on');
                    $('#mapPlayer').hide();

                    $('#videoMain').html(
                        '<video id="mapPlayer" poster="/images/cameraLoading.gif" autoplay controls playsInline webkit-playsinline>\n' +
                        '                <source id="rtmpUrl" src="'+$(this).attr('attrrtmpsrc')+'" />\n' +
                        '                <source id="hlsUrl" src="'+$(this).attr('attrhlssrc')+'" type="application/x-mpegURL" />\n' +
                        '            </video>'
                    );
                    var player = new EZUIPlayer('mapPlayer');

                    player.on('error', function(){
                        console.log('error');
                    });
                    player.on('play', function(){
                        console.log('play');
                    });
                    player.on('pause', function(){
                        console.log('pause');
                    });
                    $('#mapPlayer').show()
                });
                //高清
                $('#vedio2').unbind().on('click',function () {
                    $('.toolBarCon a').removeClass('on');
                    $(this).addClass('on');
                    $('#mapPlayer').hide();

                    $('#videoMain').html(
                        '<video id="mapPlayer" poster="/images/cameraLoading.gif" autoplay controls playsInline webkit-playsinline>\n' +
                        '                <source id="rtmpUrl" src="'+$(this).attr('attrrtmpsrc')+'" />\n' +
                        '                <source id="hlsUrl" src="'+$(this).attr('attrhlssrc')+'" type="application/x-mpegURL" />\n' +
                        '            </video>'
                    );
                    var player = new EZUIPlayer('mapPlayer');

                    player.on('error', function(){
                        console.log('error');
                    });
                    player.on('play', function(){
                        console.log('play');
                    });
                    player.on('pause', function(){
                        console.log('pause');
                    });
                    $('#mapPlayer').show()
                })
            })
        });
        $('#cameraList a').eq(0).click();
        $('#toHis').on('click',function () {
            if(!(!!window.ActiveXObject || "ActiveXObject" in window)){
                App.alert($.getI18n('screen.tipUseIE'));
                return
            }

            $('#LiveWin').remove();
            _this.cameraHisWin(obj)
        })
    },
    cameraHisWin: function (obj) {

        var _this = this;
        var opt = obj.cameraInfo;
        $('#LiveWin').length && $('#LiveWin').remove();
        var str = '<div class="camerapop" id="videoHisWin">\n' +
            '    <div class="cameraWin">\n' +
            '        <a class="closebtn" id="cawin-close"><img src="/images/largeScreen/close_1.png"></a>\n' +
            '        <div class="top-tit">'+obj.name+'('+'<span id="cameraName">'+obj.setCameraName+'</span>'+')'+'</div>\n' +
            '    <div style="width: 1375px;height: 650px;">\n' +
            '            <div class="floatBox"><a class="toHis" id="toLive" ></a></div>\n' +
            '        <object classid="clsid:54FC7795-1014-4BF6-8BA3-500C61EC1A05" id="EZUIKit" width="1000" height="600" name="EZUIKit"></object>\n' +
            '        <div class="progressBar"><div class="VideoSplitLine" id="VideoSplitLine"></div><div class="progressMain"><div class="progressCon" id="progressCon"></div></div></div>\n' +
            '            <div class="timePic"><img src="/images/time.png" alt=""></div>\n' +
            '    </div>\n' +
            '    <div class="videoHisList" id="hisTimeList">\n' +
            '            '+$.getI18n('screen.date')+' \n' +
            '        </div>\n' +
            '       \n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>';
        $('#sysBody').append(str);
        $('#cawin-close').unbind().on('click', function () {
            SynpowerCamera.StopPlay();
            $('#videoHisWin').remove();
        });
        $('#toLive').on('click',function () {
            $('#cawin-close').click();
            _this.cameraWin(obj)
        });
        /*if (objCard.object==null) {
            alert("CardAccessor插件未安装！");
        }
        else{
            alert("已检测到CardAccessor插件！");
        }*/
        /* var yourActiveXObject = document.getElementById('EZUIKit');
         if(typeof(yourActiveXObject) === 'undefined' || yourActiveXObject === null){
             alert('Unable to load ActiveX');
             // return;
         }else
         yourActiveXObject.addEventListener('PluginEventHandler', PluginEventHandler);*/
        // $('#objWin').append('<object classid="clsid:54FC7795-1014-4BF6-8BA3-500C61EC1A05" id="EZUIKit" width="1000" height="360" name="EZUIKit"></object>')

        SynpowerCamera.init({
            AppKey: opt.appKey,
            AccessToken: opt.accessToken,
            Url: 'ezopen://open.ys7.com/' + opt.cameraInfos[0].sn + '/1.rec',
            SN: obj.setSN
        })


    },
    //容量功率比
    capPower:function(datas){
        //设置动态进度
        var percent = (datas.activePower / datas.capacity).toFixed(2) * 100 + '%';
        var spare = (1 - (datas.activePower / datas.capacity).toFixed(2)) * 100 + '%';
        $('#currentPower').css({
            width: percent
        });
        $('#sparePower').css({
            width: spare
        });
        $('#currentTriangle').css({
            left: percent
        });
        //console.log(datas.activePower/datas.capacity)
        // $('.capPow').find('p').eq(2).find('span').text(App.convertUnit("watt", datas.activePower, 6, 3).num + App.convertUnit("watt", datas.activePower, 6, 3).unit);
        // $('.capPow').find('p').eq(0).find('span').text(App.convertUnit("watt", datas.capacity, 6, 3).num + App.convertUnit("watt", datas.capacity, 6, 3).unit)
        $('.capPow').find('p').eq(2).find('span').text( datas.activePower+ datas.activePowerUnit);
        $('.capPow').find('p').eq(0).find('span').text( datas.capacity+ datas.capacityUnit)
    },
    //光储储能电站比率
    gcData:function(){
        var _this = this;
        //光储
        //摄像头
        $.http.POST('/monitor/singleBasicInfo.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.setBasicInfo1(result.body);

            //    摄像头
            $('#toCamera').on('click', function (e) {
                _this.cameraWin(result.body);
                // $('#popDetailWin').remove();
                e.stopPropagation()
            })
        });
        //时间限制限定
        $.http.POST('/monitor/getProSearchDate.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.limitDate = result.body
        });
        powerInter();
        function powerInter(){
            if (main.clearInterCharge(_this.powerInter, _this.domId)) return;
            $.http.POST('/monitor/getPowerCap.do',{plantId:_this.plantId,tokenId:Cookies.getCook('tokenId')},function(res){
                _this.division(res.body)
            })
        }
        _this.powerInter = setInterval(powerInter, 30000);
    },
    //光储容量功率比
    division:function(datas){
        //设置动态进度
        var percentPower = (datas.power / datas.phoCap).toFixed(2) * 100 + '%';
        var sparePower = (1 - (datas.power / datas.phoCap).toFixed(2)) * 100 + '%';
        var leftWidth1 = (datas.power / datas.phoCap).toFixed(2) * 100 -10 + '%';
        var percentCap = (datas.curCap / datas.batCap).toFixed(2) * 100 + '%';
        var spareCap = (1 - (datas.curCap / datas.batCap).toFixed(2)) * 100 + '%';
        var leftWidth2 = (datas.curCap / datas.batCap).toFixed(2) * 100 -10 + '%';
        $('#current-power').css({
            width: percentPower
        });
        $('#spare-power').css({
            width: sparePower
        });
        $('#current-triangle-power').css({
            left: percentPower
        });
        $('#current-capacity').css({
            width: percentCap
        });
        $('#spare-capacity').css({
            width: spareCap
        });
        $('#current-triangle-capacity').css({
            left: percentCap
        });
        $('.head-power').find('p').eq(0).find('span').eq(0).html('('+datas.powerUnit+')').end();
        $('.head-power').find('p').eq(0).find('span').eq(1).html(datas.power).end();
        $('.current-percent').eq(0).text(percentPower).css({left:leftWidth1});
        $('.head-power').find('p').eq(2).find('span').eq(0).html('('+datas.phoCapUnit+')').end();
        $('.head-power').find('p').eq(2).find('span').eq(1).html(datas.phoCap).end();
        $('.head-power').find('p').eq(3).find('span').eq(0).html('('+datas.curCapUnit+')').end();
        $('.head-power').find('p').eq(3).find('span').eq(1).html(datas.curCap).end();
        $('.current-percent').eq(1).text(percentCap).css({left:leftWidth2});
        $('.head-power').find('p').eq(5).find('span').eq(0).html('('+datas.batCapUnit+')').end();
        $('.head-power').find('p').eq(5).find('span').eq(1).html(datas.batCap).end()
        //console.log(datas.activePower/datas.capacity)
        // $('.capPow').find('p').eq(2).find('span').text(App.convertUnit("watt", datas.activePower, 6, 3).num + App.convertUnit("watt", datas.activePower, 6, 3).unit);
        // $('.capPow').find('p').eq(0).find('span').text(App.convertUnit("watt", datas.capacity, 6, 3).num + App.convertUnit("watt", datas.capacity, 6, 3).unit)
    },
    cnData:function(){
        var _this = this;
        //储能
        //摄像头
        $.http.POST('/monitor/singleBasicInfo.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.setBasicInfo2(result.body);

            //    摄像头
            $('#toCamera').on('click', function (e) {
                _this.cameraWin(result.body);
                // $('#popDetailWin').remove();
                e.stopPropagation()
            })
        });
        //时间限制限定
        $.http.POST('/monitor/getProSearchDate.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantId: _this.plantId
        }, function (result) {
            _this.limitDate = result.body
        });
        cnPowerInter();
        function cnPowerInter(){
            if (main.clearInterCharge(_this.cnPowerInter, _this.domId)) return;
            $.http.POST('/monitor/getBatCap.do',{plantId:_this.plantId,tokenId:Cookies.getCook('tokenId')},function(res){
                _this.batDivision(res.body)
            })
        }
        _this.powerInter = setInterval(cnPowerInter, 30000);
    },
    //储能容量比
    batDivision:function(datas){
        var percentCap, spareCap,leftWidth2;
        if(datas.curCap==0){
            percentCap='0%';
            spareCap='100%';
            leftWidth2='0%';
        }else{
            percentCap = (datas.curCap / datas.batCap).toFixed(2) * 100 + '%';
            spareCap = (1 - (datas.curCap / datas.batCap).toFixed(2)) * 100 + '%';
            leftWidth2 = (datas.curCap / datas.batCap).toFixed(2) * 100 -10 + '%';
        }
        $('#currentBat').css({
            width: percentCap
        });
        $('#spareBat').css({
            width: spareCap
        });
        $('#currentCnTriangle').css({
            left: percentCap
        });
        $('.energy-head').find('p').eq(0).find('span').eq(0).html('('+datas.curCapUnit+')').end();
        $('.energy-head').find('p').eq(0).find('span').eq(1).text(datas.curCap).end();
        $('.current-bat').eq(0).text(percentCap).css({left:leftWidth2});
        $('.energy-head').find('p').eq(2).find('b').eq(1).html('('+datas.batCapUnit+')').end();
        $('.energy-head').find('p').eq(2).find('span').eq(0).text(datas.batCap).end()
    }
};