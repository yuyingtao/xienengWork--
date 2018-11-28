/** 2017/10/19
 * @author: kj
 * @description:
 */
define(function () {
    return LargeScreenRender;
});
var LargeScreenRender = {
    weaterInter:'popDetailWin',
    domId:'popDetailWin',//模块中的任意Id
    timeInter:'',
    Render: function () {
        //    Todo Main function
        var that = this;

        $('#mapContainer').css({
            width: document.body.clientWidth,
            height: document.body.clientWidth*9/16 + 'px'
        })
        // alert(document.body.clientWidth)
        $('.sp-ls-body').css({
            height: $('.sp-ls-body').width()*9/16 + 'px'
        })
        $(window).resize(function(){

            $('.sp-ls-body').css({
                height: $('.sp-ls-body').width()*9/16 + 'px'
            })
            if(document.body.clientWidth>960){
                $('#mapContainer').css({
                    width: document.body.clientWidth,
                    height: document.body.clientWidth*9/16 + 'px'
                })
            }

        });
        if(!("ontouchend" in document)){
            $(".sp-body").mCustomScrollbar({
                theme:"3d",
                axis:"yx" // vertical and horizontal scrollbar
            });
        }
        /*$(".sp-body").mCustomScrollbar({
            theme:"3d",
            axis:"yx" // vertical and horizontal scrollbar
        });*/

        $('#toManageSys').on('click', function () {
            Cookies.setCookByName('defaultLoading', Number(Cookies.getCook("sysType")) === 0 ? 'main' : 'singleSys');
            window.location.href='/'
            /*
            Cookies.setCookByName('defaultLoading', "main");
            window.location.href='/'*/
        });

        require(['js/partial/largeScreen/satusConfig.js'], function (SatusConfig) {

            // $('.sp-ls-body .ls-center-l, .sp-ls-body .ls-center-r').animate({width:'21.3542%'},1000)
            // $('.sp-ls-body .ls-center-cb').animate({height:'27.5%'},1000)
            // $('.ls-center-r .fadeInBox').animate({width:'100%'},3000)
            $.each(SatusConfig, function (name, loadHref) {
                $('.dynamic-module.' + name).loadPage(loadHref)
            })
        });
        this.MapBusiness();
        this.basicCompany();
        this.getWeather('104.079373,30.629169')
        that.getAjax();
        /*this.cameraWin({
            name:'某某某电站',
            cameraInfos:[{"id": 1, "name": "vjdklh", "sn": "B78AE84B-EEBb-Af51-BC5F-C6C23EDECc98"}, {
                "id": 2,
                "name": "duicedgm",
                "sn": "35afc1DE-CF6c-96A5-e227-534827DF63ee"
            }, {"id": 3, "name": "crgrbrz", "sn": "c0d3B0AC-5DE5-44bd-8EdD-F8aAd98FEB3A"}, {
                "id": 4,
                "name": "dtudvas",
                "sn": "219968dF-9cfE-801E-dFa8-C3dCCe9Eb154"
            }, {"id": 5, "name": "vnymxki", "sn": "fB1Bf3AC-5592-BCbE-18AC-3eA6b1eA1988"}, {
                "id": 6,
                "name": "pzqdgvpu",
                "sn": "75E64deC-Ff4c-A7Ba-F371-2B5D5180515e"
            }, {"id": 7, "name": "llwxbfpa", "sn": "99589EfA-6EDc-29BE-e8Fc-31Cb59D5edCD"}, {
                "id": 8,
                "name": "dgwesrcy",
                "sn": "3dfd42e7-BED6-a6Af-a1F0-84bf638f3CB1"
            }]
        })*/
    },
    getAjax:function () {
        var _this = this;
        $.http.POST('/screen/getLogoAndName.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
                _this.companyInfo(res.body)
        });
        $.http.POST('/screen/generationStatics.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            if(JSON.stringify(res.body) =="{}"){
                $("<p class='noDistribution'>").html($.getI18n("noData")).appendTo($("#powerPic"));
                $('#ygu').text("--");
                $('#mg').text("--");
                return false
            }
            _this.powerWord(res.body);
            _this.powerInfo(res.body.datas)
        })
    },
    //公司基本信息
    basicCompany:function () {
        var timer = '';
        var _this = this;
        clearInterval(_this.timeInter);
        $.http.POST('/screen/basicStatic.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            _this.totalGen(res.body)
            // _this.companyInfo(res.body)
        });
        _this.timeInter = setInterval(function(){
            $.http.POST('/screen/basicStatic.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
                _this.totalGen(res.body)
                // _this.companyInfo(res.body)
            })
        },5000)

    },
    powerIncome:function (datas) {
        $('#win_plant_genToday').text(App.convertUnit("kilowatt",datas.genToday).num);
        $('#win_plant_genTodayUnity').text(App.convertUnit("kilowatt",datas.genToday).unit);
        $('#win_plant_totalGen').text(App.convertUnit("kilowatt",datas.totalGen).num);
        $('#win_plant_totalGenUnity').text(App.convertUnit("kilowatt",datas.totalGen).unit);
        $('#win_plant_income').text(App.convertUnit("rmb",datas.income).num);
        $('#win_plant_incomeUnity').text(App.convertUnit("rmb",datas.income).unit);
        $('#win_plant_totalIncome').text(App.convertUnit("rmb",datas.totalIncome).num);
        $('#win_plant_totalIncomeUnity').text(App.convertUnit("rmb",datas.totalIncome).unit)
    },
    subStr:function (str) {
        if(str&&str.length>28){
            str = str.substring(0,27)+'…'
        }
        return str
    },
    popWinBasicInfo:function (datas) {
        var _this = this;
        $.each(datas,function (name,value) {
            if(name=='capacity'){
                $('#win_plant_'+name).text(value+datas.unit)
            }else{
                $('#win_plant_'+name).text(_this.subStr(value)).attr('title',value)
            }
        });
        //轮播图片
        var divHtml = '';
        var liHtml = '';
        if(datas.img && datas.img.length>0){
            if(datas.img.length==1){
                divHtml+= '<div class="item"><img src="'+datas.img[0]+'"></div>';
            }else{
                $.each(datas.img,function(i,val){
                    divHtml+='<div class="item"><img src="'+val+'"></div>';
                    liHtml+='<li data-target="#largeCarousel" data-slide-to="'+i+'"></li>'
                })
            }
        }else{
            divHtml = '<div class="item"><img src="/images/defaultPlant.png"></div>';
        }
        $('.carouselBox').html(divHtml);
        $('.carousel-indicators').html(liHtml);
        $('.carousel-indicators').find('li').eq(0).addClass('active');
        $('#largeCarousel .carouselBox .item').eq(0).addClass('active');
        $('#largeCarousel').carousel();
        $('#largeCarousel .carousel-indicators li').click(function(){
            var num = Number($(this).attr('data-slide-to'));
            $('#largeCarousel').carousel(num);
        });
        var date = new Date(Number(datas.recentWeather[0].dataTime));
        var week ;
        switch (date.getDay()){
            case 0:week=$.getI18n("screen.sunday");break;
            case 1:week=$.getI18n("screen.monday");break;
            case 2:week=$.getI18n("screen.tuesday");break;
            case 3:week=$.getI18n("screen.wednesday");break;
            case 4:week=$.getI18n("screen.thursday");break;
            case 5:week=$.getI18n("screen.friday");break;
            case 6:week=$.getI18n("screen.saturday");break;
        }
        $('#we_dateFormatter0').html(week + '&nbsp;' +date.format('yyyy-MM-dd') + '&nbsp;' + '(' + $.getI18n("screen.realTime") +datas.recentWeather[0].currentTemperature+'℃)');
        $('.topWeather').find('img').attr('src',datas.recentWeather[0].dayPictureUrl);
        $('.topWeather').find('p').eq(0).text(datas.recentWeather[0].temperature+'℃');
        $('.topWeather').find('p').eq(1).text(datas.recentWeather[0].weather);
        $('.topWeather').find('p').eq(2).text(datas.recentWeather[0].wind);
        $('.leftWeather').find('img').attr('src',datas.recentWeather[1].dayPictureUrl);
        $('.leftWeather').find('p').eq(1).text(datas.recentWeather[1].temperature+'℃');
        $('.leftWeather').find('p').eq(2).text(datas.recentWeather[1].weather);
        $('.leftWeather').find('p').eq(3).text(datas.recentWeather[1].wind);
        $('.rightWeather').find('img').attr('src',datas.recentWeather[2].dayPictureUrl);
        $('.rightWeather').find('p').eq(1).text(datas.recentWeather[2].temperature+'℃');
        $('.rightWeather').find('p').eq(2).text(datas.recentWeather[2].weather);
        $('.rightWeather').find('p').eq(3).text(datas.recentWeather[2].wind)

    },
    //累计发电量定时刷新
    totalGen:function(data){

        var genDay = App.convertUnit("kilowatt",data.totalGen,8);
        if(main.clearInterCharge(this.timeInter,'totalGenU'))return;
            var arr = genDay.num.toString().split("");
                var elImg = arr.map(function (item) {
                    var img;
                   switch (item){
                        case "0": img = "0.png";
                            break;
                        case "1": img = "1.png";
                            break;
                       case "2": img = "2.png";
                           break;
                       case "3": img = "3.png";
                           break;
                       case "4": img = "4.png";
                           break;
                       case "5": img = "5.png";
                           break;
                       case "6": img = "6.png";
                           break;
                       case "7": img = "7.png";
                           break;
                       case "8": img = "8.png";
                           break;
                       case "9": img = "9.png";
                           break;
                       case ".": img = "doc.png";
                           break

                    }
                    if(img =="doc.png"){
                       return `<img src="/images/largeScreen/${img}" style="margin-top: 20px;margin-right:5px">`
                    }else {
                        return `<img src="/images/largeScreen/${img}" style="width: 20px;height: 33px;margin-right: 5px">`
                    }
                }).join("");
        $('.totalGen').find('i').eq(0).html(elImg);
            $('#totalGenU').text(genDay.unit)
    },
    //公司基本信息
    companyInfo:function (data) {

        var value = data.logoImg;
        // $('#toManageSys img').attr('src',value)
        !!value  ? $('#toManageSys img').attr('src',value).one('error',function () {
            $('#toManageSys img').attr('src','/images/largeScreen/logo.png') }) : $('#toManageSys img').attr('src','/images/largeScreen/logo.png')

        $('#toManageSys span').html(data.logoName);

        //时间格式化
        var time = parseInt(data.screenTime);
        this.setTime(time)
    },
    //补零操作
    addZero:function (n) {
        if(n<10){
            n = '0'+n
        }
        return n
    },
    //时间计时
    setTime:function (time) {
        var _this = this;
        var date = new Date(time);
        var year = parseInt(date.format('yyyy')),
            month = parseInt(date.format('MM')),
            day = parseInt(date.format('dd')),
            hour = parseInt(date.format('HH')),
            minute= parseInt(date.format('mm')),
            sec = parseInt(date.format('ss'));
        _this.timeInter = setInterval(function(){
            sec++;
            if(sec>=60){
                sec=0;
                minute+=1;
            }
            if(minute>=60){
                minute = 0;
                hour+=1
            }
            if(hour>=24){
                hour=0;
                day+=1;
            }
            if(month=='1'||month=='3'||month=='5'||month=='7'||month=='8'||month=='10'||month=='12'){
                if(day>31){
                    day = 1;
                    month+=1
                }
            }else if(month=='4'||month=='6'||month=='9'||month=='11'){
                if(day>30){
                    day = 1;
                    month +=1
                }
            }else{
                if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
                    if(day>29){
                        day = 1;
                        month +=1
                    }
                }else{
                    if(day>28){
                        day = 1;
                        month +=1
                    }
                }
            }
            if(month>12){
                month = 1;
                year+=1
            }
            $('.screenTime').find('i').eq(0).text(month).end()
                .eq(1).text(day).end()
                .end().end()
                .find('b#scT').text(year).end();
                var clock = $('.clock').FlipClock({
                    clockFace: "TwentyFourHourClock",
                    showSeconds: false,
                    // autoStart: false,
                    // minimumDigits:5,
                    callbacks: {
                        // stop: function() {
                        //     $('.message').html('The clock has stopped!')
                        // }
                    }
                });
                // clock.setTime(3600);
                // clock.setCountdown(true);
                // clock.start();
        },1000)
    },
    //发电量文字
    powerWord:function (data) {
        $('#yg').text(data.year.value);
        $('#ygu').text(data.year.unity);
        $('#mg').text(data.month.value);
        $('#mgu').text(data.month.unity);
    },
    //发电量图表
    powerInfo:function (datas) {
        var names=[$.getI18n("screen.generatedEleEnergy") +'（'+datas.unity1+'）',$.getI18n("screen.profit")+'（'+datas.unity2+'）'];
        var xData = datas.xData,
            yData1 = datas.yData1,
            yData2 = datas.yData2;
        var fontS = +$('body').css('fontSize').replace('px','')
        var option = {
            color:['rgba(0,120,255, 1)','#0078FF'],
            title: {
                // text: '年度发电量',
                // color:['red']
            },
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
            //             str +=  '<div style="color: #a5e2f9">'+item[i].seriesName+': <span style="font-size: 1.3em">'+item[i].data+'</span></div>'
            //         }
            //         return str;
            //     }
            //
            // },
            grid: {
                top:'30%',
                bottom:'20%',
                left: '8%',
                right: '8%'

            },
            legend: {
                show: true,
                top: 0,
                right: '10%',
                textStyle:{
                    color:'rgba(0,172,234,1)',
                    fontSize:fontS
                },
                selectedMode:true,
                data:names
            },
            xAxis: {
                type: 'category',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#343956'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#00acea',
                        fontSize:fontS*0.857
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#244e5e'
                    }
                },
                axisTick:{
                    alignWithLabel:true
                },
                nameTextStyle:{
                    // color:'#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name:names[0],
                type: 'value',
                splitNumber:5,
                // max:(Number(datas.maxData1||0)+Number(datas.maxData2||0)).toFixed(2),
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#303439'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#00acea',
                        fontSize:fontS*0.857
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#244e5e'
                    }
                },
                nameTextStyle:{
                    color:'#00acea',
                    fontSize:fontS*0.857
                }
            },{
                name:names[1],
                type: 'value',
                splitNumber:5,
                // max:(Number(datas.maxData1||0)+Number(datas.maxData2||0)).toFixed(2),
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#303439'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#00acea',
                        fontSize:fontS*0.857
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#244e5e'
                    }
                },
                nameTextStyle:{
                    color:'#00acea',
                    fontSize:fontS*0.857
                }
            }],
            series: [{
                name: names[0],
                type: 'bar',
                barWidth: '30%',
                barBorderRadius: 4,
                // stack:1,
                itemStyle: {
                    normal: {

                        barBorderRadius: 4,

                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 1,
                                color: 'rgba(52,155,87, 1)',
                            }, {
                                offset: 0,
                                color: 'rgba(29,183,166, 1)',
                            }],
                            globalCoord: false
                        },
                    }
                },
                data: yData1
            },{
                name:names[1],
                type:'line',
                data:yData2,
                yAxisIndex: 1,
                // stack:1,
                showSymbol: false,
                symbolSize: 1,
                symbol:'none',
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0,120,255, 0.4)',
                            }, {
                                offset: 1,
                                color: 'rgba(0,120,255, 0)',
                            }],
                            globalCoord: false
                        },
                    }
                }
            }]
        };
        Echarts.render('powerPic', option);
    },
    //地图业务
    MapBusiness: function () {
        var _this = this;
        var highlight = '';
        var highlightZIndex = 0;
        var interArr = [];
        var kpiInter;
        var mapId = 'mapContainer';
        var  center= [30.629169, 104.079373];
        var map;
        MapContain(mapId);
        var appendContent = '    <div id="popDetailWin" class="popDetailWin" >\n' +
            '        <a class="closebtn" id="popwin-close"><img src="/images/largeScreen/close.png"></a>\n' +
            '        <div class="basic-info clearfix">\n' +
            '            <div class="basic-info-pic" id="largeCarousel">' +
            '               <div class="pic-container">' +
            '                   <div class="cameraImg" id="toCamera" style="z-index:99"></div>' +
            '<ol class="carousel-indicators"></ol>'+
            '<div class="carousel-inner carouselBox"></div>'+
            // '                   <img id="win_plant_img" style="width: 446px;height: 252px" src="" onerror="this.src=\'+"/images/pmImages/img_power.png"+\'" alt="">' +
            '               </div>' +
            '            </div>\n' +
            '            <div class="basic-info-data">\n' +
            '                <div class="bid-t">\n' +
            '                    <h2><span id="win_plant_name" style="cursor:pointer">--</span></h2>\n' +
            '                    <p><label>'+$.getI18n("screen.address")+'</label><span id="win_plant_address">--</span></p>\n' +
            '                    <p><label>'+$.getI18n("screen.capacity")+'</label><span id="win_plant_capacity">--</span></p>\n' +
            '                    <p><label>'+$.getI18n("screen.remark")+'</label><span id="win_plant_remark">--</span></p>\n' +
            // '                    <a class="toDetail">详情 ></a>\n' +
            '                </div>\n' +
            '                <div class="split-line"><img src="/images/largeScreen/splitLine.png"></div>\n' +
            '                <div class="bid-b clearfix">\n' +
            '                    <div class="bid-kpi" id="bid-kpi" style="width: 38.1%;height: 100%"></div>\n' +
            '                    <div class="bid-kpi-descrip">\n' +
            '                        <div class="descrip-item">\n' +
            '                            <p>'+$.getI18n("screen.genDay")+'（<span id="win_plant_genTodayUnity"></span>）</p>\n' +
            '                            <p id="win_plant_genToday" class="item-value">--</p>\n' +
            '                        </div>\n' +
            '                        <div class="descrip-item">\n' +
            '                            <p>'+$.getI18n("screen.profitDay")+'（<span id="win_plant_incomeUnity"></span>）</p>\n' +
            '                            <p id="win_plant_income" class="item-value">--</p>\n' +
            '                        </div>\n' +
            '                        <div class="descrip-item">\n' +
            '                            <p>'+$.getI18n("screen.genTotal")+'（<span id="win_plant_totalGenUnity"></span>）</p>\n' +
            '                            <p id="win_plant_totalGen" class="item-value">--</p>\n' +
            '                        </div>\n' +
            '                        <div class="descrip-item">\n' +
            '                            <p>'+$.getI18n("screen.profitTotal")+'（<span id="win_plant_totalIncomeUnity"></span>）</p>\n' +
            '                            <p id="win_plant_totalIncome" class="item-value">--</p>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="split-line"><img src="/images/largeScreen/splitLine.png"></div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="time-active" id="we_dateFormatter0">--</div>\n' +
            '        <div class="plant-kpi clearfix">\n' +
            '            <div class="weather">\n' +
            // '                <img id="we_nightPictureUrl0" src=""  alt="天气">\n' +
            // '                <p id="we_temperature0">--</p>\n' +
            // '                <p id="we_weather0">--</p>\n' +
            // '                <p id="we_wind0">--</p>\n' +
            '               <div class="topWeather">\n' +
            '                   <img id="" src=""  alt="'+$.getI18n("screen.weather")+'">\n' +
            '                   <p id="">--</p>\n' +
            '                   <p id="">--</p>\n' +
            '                   <p id="">--</p>\n' +
            '               </div>\n'+
            '<div style="width:182px;height:1px; margin:0 auto 5px auto;clear:both;background:url(/images/largeScreen/splitLine.png) no-repeat center;background-size: 100% 100%;"></div>'+
            '               <div class="bottomWeather">\n' +
            '                   <div class="leftWeather">\n' +
                                    '<p style="width:100%;float:right;text-align:right">('+$.getI18n("screen.tomorrow")+')</p>\n'+
            '                       <img id="" src=""  alt="'+$.getI18n("screen.weather")+'">\n' +
            '                       <p id="">--</p>\n' +
            '                       <p id="">--</p>\n' +
            '                       <p id="">--</p>\n' +
            '                   </div>'+
            '                   <div class="midWeather"></div>'+
            '                   <div class="rightWeather">\n' +
            '                       <p style="width:100%;float:right;text-align:right">('+$.getI18n("screen.dayAfterTomorrow")+')</p>\n'+
            '                       <img id="" src=""  alt="'+$.getI18n("screen.weather")+'">\n' +
            '                       <p id="">--</p>\n' +
            '                       <p id="">--</p>\n' +
            '                       <p id="">--</p>\n' +
            '                   </div>\n'+
            '               </div>\n'+
            '            </div>\n' +
            '            <div class="power-kpi" id="power-kpi" style="width: 71.564%;height: 95%;"> </div>\n' +
            '        </div>\n' +
            '    </div>\n';


        //地图弹窗数据
        function popWinSetData(plantId) {
            clearInterval( _this.weaterInter);
            clearInterval(kpiInter);
            $.http.POST('/screen/plantInfo.do',{id:plantId,tokenId:Cookies.getCook('tokenId')},function (res) {

                //是否有进入单电站的权限
                if(!App.isEmpty(systemRole['singlePlantMonView'])){
                    $('#win_plant_name').unbind().on('click',function(){
                        Cookies.setCookByName('defaultLoading', "singleSys");
                        Cookies.setCookByName('singlePlantInfo', JSON.stringify({plantId:plantId,singlePlantType:res.body.singlePlantType}));
                        window.location.href='/'
                    });
                }

                _this.popWinBasicInfo(res.body);

                //    摄像头
                $('#toCamera').on('click',function(e){
                    _this.cameraWin(res.body);
                    // $('#popDetailWin').remove();
                    $('#LiveWin').show();
                    e.stopPropagation()
                })
            });



            interKPI();
            kpiInter = setInterval(function () {
                interKPI()
            } ,30000);

            // $('a.toDetail').unbind().on('click',function(){
            //     $('#singlePlantId').val(plantId);
            //     $('#mainContainer').loadPage('../plantMonitor/pmSingleIndex.html');
            // })
            function interKPI(){

                if(main.clearInterCharge(kpiInter,_this.domId))return;
                $.http.POST('/screen/dynamicStatics.do',{id:plantId,tokenId:Cookies.getCook('tokenId')},function (res) {
                    //发电量与收益
                    _this.powerIncome(res.body.genIncome);
                    //功率
                    _this.winCurveKpi(res.body.activePower);
                    //仪盘表
                    _this.ypbKpi(res.body.energyStatic)
                })
            }
        }
        //渲染地图
        function MapContain(id) {
            require(['MapUtil'], function (MapUtil) {
                map = MapUtil.Instance(id, {
                    center: center,
                    zoomControl: false,
                    attributionControl: false,
                    layers: [L.tileLayer.provider('GaoDe.Satellite.Map'), L.tileLayer.provider('GaoDe.SatelliteAnnotion.Map')],
                    zoom: 4,
                    controls: {
                        zoomControl: {
                            show: false
                        },
                        scaleControl: {
                            show: false
                        }
                    }
                }).option.map;
                refreshMap();


                /*
                *  @description: 导航栏
                *  @parameter: obj
                *  {
                *       @id: 节点的id,
                *     @name: 节点的name,
                *    @isAdd: true:导航栏上增加菜单项；false:导航栏上减少菜单项
                *  }
                *
                * */
                function navigation(obj) {
                    var _id = obj.id.replace('.','-').replace('.','-');
                    if (obj.isAdd) {
                        if($('.nav-id-'+obj.id).length){
                            return
                        }
                        var navA = '<a class="nav-item nav-id-'+_id+'">\><span class="nav-text">'+obj.name+'</span></a>';
                        $('#leafletControlNav').append(navA);

                        var $navItem = $('.nav-id-'+_id);
                        $navItem.data('clusterMsg',obj);
                        $navItem.unbind().on('click',function(){
                            var $this = $(this);
                            obj.isAdd = !1;
                            navigation(obj);
                            refreshMap($navItem.data('clusterMsg'))
                        })
                    }else {

                        var $item = $('.nav-item');
                        if(!$item.eq($item.length-1).hasClass('nav-id-'+_id)){
                            $item.eq($item.length-1).remove();
                            navigation(obj);
                        }
                    }
                    highlight && highlight.disablePermanentHighlight();
                    highlight && highlight.setZIndexOffset(highlightZIndex);

                }

                /*
                *  @description: 更新地图
                *  @parameter: obj {*} 返回的对象
                *  <pre>
                *      {<br>
                *          id: '11', // marker的id<br>
                *          level: '1', // 当前层级 1：顶级（中国）；2：省级；3：市级<br>
                *          name: '中国', // marker的名字<br>
                *          type: 0, // getAllPlant.do<br>
                *          location: [30.40,104.04], // 经纬度<br>
                *      }<br>
                *  </pre>
                * */
                var LayerMarkers;
                function refreshMap(obj) {
                    var clearMap = LayerMarkers;
                    LayerMarkers = '';
                    !!clearMap && MapUtil.clearMap(clearMap);
                    var status;
                    // if(obj=='undefined'|| obj&&(obj.hasChild=='true' && obj.type =='0') ){
                    //     status = 0;
                    // }else if(obj.hasChild=='false' && obj.type =='0'){
                    //     status = 1
                    // }else if(obj.type=='1'){
                    //     status = 2
                    // }
                    //显示到市级
                    //status，0：需要得到区域，1：需要得到电站
                    if(obj){ if(obj.level == 3 && obj.type =='0'){
                        status = 1
                    }else if( obj.hasChild && obj.type =='0'){
                            status = 0;
                        }
                    }else{
                        status = 0;
                    }
                    $.http.POST('/screen/districtManage.do', {id: !!obj && obj.id ? obj.id : '',tokenId:Cookies.getCook('tokenId'),	status:status}, function (result) {
                        drawMarker(result.body)
                    })
                }

                /*
                *  @description: 绘制marker
                *  @parameter: obj [{*}] 数组对象
                *  <pre>
                *      {<br>
                *          id: '11', // marker的id<br>
                *          name: '中国', // marker的名字<br>
                *          type: 0, // 子节点的类型 0:区域，1:电站<br>
                *          location: [30.40,104.04], // 经纬度<br>
                *          isAdd: true, //true:导航栏上增加菜单项；false:导航栏上减少菜单项
                *      }<br>
                *  </pre>
                * */
                function drawMarker(obj) {
                    LayerMarkers = MapUtil.createMarkerGroup(map);
                    var marker;

                    highlight && highlight.disablePermanentHighlight();
                    highlight && highlight.setZIndexOffset(highlightZIndex);
                    !!searchLayer && MapUtil.clearMap(searchLayer);
                    var zoneMarker = false;
                    var isRoot = false
                    $.each(obj, function (index, item) {
                        //区域
                        if (item.type=='0'||item.type=='1') {

                            obj.length === 1 && (zoneMarker = true)
                            //根节点
                            if(obj.length === 1 && !item.fatherId){
                                refreshMap(item);
                                isRoot = true
                                //添加导航栏菜单
                                if(!$('#leafletControlNavNode').length){
                                    var LayerNav = MapUtil.createMarkerGroup(map);
                                    MapUtil.addNavControl(map, LayerNav, {position: 'topright',rootName:item.name});

                                    //点击根路径时刷新
                                    $('#leafletControlNavNode').on('click',function () {
                                        highlight && highlight.disablePermanentHighlight();
                                        highlight && highlight.setZIndexOffset(highlightZIndex);
                                        $('.nav-item').remove();
                                        // MapUtil.clearMap(searchLayer);
                                        refreshMap();
                                    });

                                }
                                return false

                            }
                            marker = MapUtil.createMarker(item.location,
                                {
                                    isDivIcon: true,
                                    className: 'cluster-icon',
                                    html: '<div class="clusterIcon" style="padding:10px"><div class="Iconcenter">' + item.name + '</div></div>',
                                    iconSize: [40, 40],
                                    events: {
                                        click: function (e) {
                                            //更新导航
                                            navigation($.extend({
                                                isAdd: 1
                                            },item));
                                        //    下转
                                            refreshMap(item);
                                        }
                                    }
                                }
                            );
                        }else {  //电站
                            zoneMarker = false;
                            marker = MapUtil.createMarker(item.location,
                                {

                                    isDivIcon: true,
                                    className: 'plant-icon',
                                    html: '<div class="plantIcon" style=""><div class="plantImg"></div><label>'+item.name+'</label></div>',
                                    tooltip:item.name,
                                    // tooltip:item.name,
                                    iconSize: [32, 50],
                                    riseOnHover:false,
                                    events: {
                                        click: function (e) {
                                            $('#sp-ls-body').append(appendContent);
                                            popWinSetData(item.id);
                                            $('#popDetailWin').show();
                                            $('#popwin-close').unbind().on('click',function () {
                                                clearInterval(_this.weaterInter);
                                                clearInterval(kpiInter);
                                                $('#popDetailWin').remove();
                                            })
                                        }
                                    }
                                }
                            );


                        }
                        MapUtil.addMarker(LayerMarkers, marker);
                    });

                    // !zoneMarker && $('.clusterIcon').length == 1 && map.setZoom($('#leafletControlNav .nav-item').length+4)
                    if(!isRoot){
                        var padArr = [400,400]
                        var cliWid = document.body.clientWidth
                        if(cliWid<1367){
                            padArr=[40,40]
                        }else if(cliWid<960){
                            padArr=[0,0]
                        }
                        MapUtil.fitView(map,{padding:padArr});
                        obj.length === 1 && map.setZoom($('#leafletControlNav .nav-item').length+4)
                    }


                }



                //添加搜索功能

                var searchLayer;  //含有所有电站的图层
                var searchRes;  //返回搜索控件对象
                exuteSerach();
                function exuteSerach(){
                    $.http.POST('/screen/getAllPlant.do',{tokenId:Cookies.getCook('tokenId')}, function (result) {
                        var datas = result.body;
                        searchLayer = MapUtil.createMarkerGroup(map);
                        $.each(datas, function (index, item) {
                            var plantMarker = MapUtil.createMarker(item.location,
                                {
                                    isDivIcon: true,
                                    className: 'plant-icon',
                                    html: '<div class="plantIcon" style=""><div class="plantImg"></div><label>'+item.name+'</label></div>',
                                    tooltip:item.name,
                                    riseOnHover:false,
                                    // title:item.name,
                                    iconSize: [32, 50],
                                    // bubblingMouseEvents:true,
                                    events: {
                                        click: function (e) {
                                            $('#sp-ls-body').append(appendContent);
                                            popWinSetData(item.id);
                                            $('#popDetailWin').show();
                                            $('#popwin-close').unbind().on('click',function () {
                                                clearInterval(_this.weaterInter);
                                                clearInterval(kpiInter);
                                                $('#popDetailWin').remove();
                                            })
                                        }
                                    }
                                }
                            );
                            // console.log('getTooltip:',plantMarker.getTooltip())
                            var getMarker = MapUtil.addMarker(searchLayer, plantMarker);
                            // console.log('getMarker:',getMarker.getPane())
                        });

                        searchRes = MapUtil.addSearchControl(map, searchLayer, {
                            position: 'topright',
                            textPlaceholder: $.getI18n('inputPlantName'),   //placeholder value
                        });

                        // return
                        highlight && highlight.disablePermanentHighlight();
                        highlight && highlight.setZIndexOffset(highlightZIndex);
                        MapUtil.clearMap(searchLayer);

                        L.DomEvent
                            .off($('.search-button').get(0), 'click', searchRes._handleSubmit, searchRes)
                        searchRes._handleSubmit=function() {	//button and tooltip click and enter submit
                            // debugger;

                            highlight && highlight.disablePermanentHighlight();
                            highlight && highlight.setZIndexOffset(highlightZIndex);
                            this._hideAutoType();

                            this.hideAlert();
                            this._hideTooltip();

                            if(this._input.style.display == 'none')	//on first click show _input only
                                this.expand();

                            else
                            {
                                if(this._input.value === '')	//hide _input only
                                    this.collapse();
                                else
                                {
                                    var loc = this._getLocation(this._input.value);

                                    if(loc===false)
                                        this.showAlert();
                                    else
                                    {
                                        this.showLocation(loc, this._input.value);
                                        MapUtil.clearMap(LayerMarkers);
                                        map.addLayer(searchLayer);
                                        $('.nav-item').remove();
                                        // loc.layer._icon.mouseOver();
                                        this.fire('search:locationfound', {
                                            latlng: loc,
                                            text: this._input.value,
                                            layer: loc.layer ? loc.layer : null
                                        });
                                        highlight = loc.layer;
                                        highlightZIndex = highlight._zIndex;
                                        highlight.setZIndexOffset(99999);
                                        $('.plantImg').removeClass('on');
                                        $(loc.layer._icon).find('.plantImg').addClass('on');
                                        highlight.enablePermanentHighlight();
                                    }
                                }
                            }
                            return
                        }

                       $('.search-button').on('click',function(){
                            searchRes._handleSubmit()
                        })
                       /* L.DomEvent
                            .on(button, 'click', L.DomEvent.stop, searchRes)
                            .on(button, 'click', searchRes._handleSubmit, searchRes)
                            .on(button, 'focus', searchRes.collapseDelayedStop, searchRes)
                            .on(button, 'blur', searchRes.collapseDelayed, searchRes);*/

                        // MapUtil.fitView(map)
                    })
                }

            })
        }

    },

    //渲染功率KPI
    winCurveKpi:function (datas) {
        var xData = datas.xData,yData1=datas.yData1,yData2=datas.yData2;

        $('#power-kpi').css('height',$('.plant-kpi').height()+'px')
        var option = {
            tooltip:{
                trigger:'axis',
                axisPointer:{
                    lineStyle: {
                        color: '#006699'
                    }
                },
                formatter:function(item){
                    if(!item[1])return;
                    var str = '<div style="color: #333;">'+item[1].axisValue+'</div><img style="position: absolute;left: -10px;top:10px" class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAYAAAAW5GZjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQjg1MzFFRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQjg1MzFGRTA4MTExRTc5MEU4QkVFOTI2QzgwMzU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NERCODUzMUNFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NERCODUzMURFMDgxMTFFNzkwRThCRUU5MjZDODAzNTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qIb73AAABN0lEQVR42mL4//8/Az588uRJ8zNnznz9/v37fyYGPODUqVM2TExMO1RUVLg4ODgY8JkYAjTx28ePH//DAAsW0xiBVBM7O3u1qqoqIxcXF1yOBU0hD5BazMvLGwBUyMDCgmoWC5JCSSC1TUxMzEBeXp6BkZERww8sUIUyQOqAtLS0MhDj9DAj0COcQPqkjIyMrpSUFL7AYQAFXZWgoCBBhTDFCbKysgzEAJBiAVZWVqIV737z5g3RimufPHny88ePH4QVm5mZXf3792/WzZs3///69Qu/aqS0UHTx4sX/P3/+/I8LoCee0gsXLvwDOomwYqiGlHPnzv359u0bYcVQDeFnz579+eXLF8KKoRq8gekZRQOhLBV9/vz5fzBPMxChofzatWtgxUxERFzX58+fT759+5YBIMAAY/x/DWAwTZ8AAAAASUVORK5CYII=" alt="">';
                    if(item[1].data!="null"){
                        str +=  '<div style="color: #333">'+item[1].seriesName+': <span style="font-size: 1.3em">'+item[1].data+'</span>'+datas.unit+'</div>'
                    }else{
                        str +=  ''
                    }
                    return str;
                }

            },
            color:['#00acea'],
             grid: {
                 top:'13%',
                 bottom:'25%',
                 left: '8%',
                 right: '2%'
             },
            xAxis: {
                // name:'日',
                boundaryGap: ['50%', '50%'],
                type: 'category',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#343956'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#00acea'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#244e5e'
                    }
                },
                axisTick:{
                    alignWithLabel:true
                },
                nameTextStyle:{
                    // color:'#a5e2f9'
                },
                data: xData
            },
            yAxis: [{
                name:$.getI18n('ass.power') +'('+datas.unit+')',
                type: 'value',
                splitNumber:5,
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#272761'],
                        type: 'dashed'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#00acea'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#244e5e'
                    }
                },
                nameTextStyle:{
                    color:'#00acea'
                }
            },{
                type: 'value',
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: ['#272761'],
                        type: 'dashed'
                    }
                },
                axisTick:{
                    show:false,
                },
                axisLabel:{
                    show:false,
                    textStyle:{
                        // color:'#a5e2f9'
                    }
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:'#244e5e'
                    }
                },
                nameTextStyle:{
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
                    borderColor:'rgba(17,58,106, .5)',
                    backgroundColor:'rgba(5,30,64, .6)',
                    fillerColor:'rgba(5,30,64, 0.1)',
                    dataBackground:{
                        lineStyle:{
                            color:'rgba(1,39,84, 0.35)',
                        }
                    },

                    handleStyle:{
                        color:'rgba(0,101,153, 0.35)',
                        borderColor:'rgba(0,101,153, 0.35)',
                    },
                    textStyle:{
                        color:'rgba(0,101,153)'
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
                type:'line',
                data: yData2,
                showSymbol: false,
                smooth: false,
                symbolSize: 0,
                yAxisIndex: 0,
                itemStyle:{
                    normal:{
                        lineStyle:{
                            width:1,
                            color:'rgba(255,255,255,.5)',
                            type:'dashed'  //'dotted'虚线 'solid'实线
                        }
                    }
                },
                markLine: {
                    symbolSize:[30,30],
                    symbol:['','image:///images/largeScreen/sun.png'],
                    lineStyle:{
                        normal:{
                            type:'solid',
                            color:'#00acea',
                        }
                    },
                    data: [
                        [{
                            coord: [datas.curTime, 0]
                        }, {
                            coord: [datas.curTime, datas.curData2]
                        }
                        ]
                    ]
                }
            },{
                name:$.getI18n('ass.power'),
                type:'line',
                data: yData1,
                showSymbol: false,
                smooth:true,
                symbolSize: 1,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0,172,234, 0.13)',
                            }, {
                                offset: 1,
                                color: 'rgba(0,172,234, 0)',
                            }],
                            globalCoord: false
                        },
                    }
                }
            }]
        };

        Echarts.render('power-kpi', option);

    },
    ypbKpi: function (datas) {
        var txtCol = '#1BBD00';
        switch (Number(datas.type)){
            case 0:txtCol = '#3eb766';break;
            case 1:txtCol = '#e9cb02';break;
            case 2:txtCol = '#cf0000';break;
            case 3:txtCol = '#909090';break;
            case 4:txtCol = '#ffa35c';break;
        }
        var fontS = +$('body').css('fontSize').replace('px','')
        var option = {
            tooltip: {
                // formatter: "{a} <br/>{b} : {c}%"
                formatter:function(item){
                    return item.name + ' : ' + item.value + datas.unit
                }
            },
            series: [{
                max: datas.capacity.toFixed(1),
                axisLine: {
                    width: $('#bid-kpi').width()*2/9,
                    show: true,
                    lineStyle: {
                        width: 15,
                        shadowBlur: 0,
                        color: [
                            [0.2, '#2DC6C8'],
                            [0.8, '#5AB1EF'],
                            [1, '#D87A80']
                        ]
                    }
                },
                type: 'gauge',
                precision: 0,
                startAngle: 180,
                endAngle: 0,
                radius: $('#bid-kpi').width()*9/20,
                splitNumber: 5,
                // center: [$('#bid-kpi').width()*48/100+'%', $('#bid-kpi').height()*71/100+'%'], // 默认全局居中
                center: ['48%', $('.basic-info-data').height()/2.8], // 默认全局居中
                axisTick: {
                    length: 5
                },
                splitLine: {
                    show: true,
                    length: 15,

                },
                axisLabel: {
                    distance: 5,
                    show: true,
                    textStyle: {
                        fontSize: 8
                    }
                },
                pointer: {
                    show: true,
                    width: 5,

                },
                detail: {
                    "show": false
                },
                "title": {
                    "show": true,
                    "offsetCenter": [0, "25%"], //标题位置设置
                    "textStyle": { //标题样式设置
                        "color": txtCol,
                        "fontSize": fontS*1.1428571,
                        "fontFamily": "微软雅黑",
                        "fontWeight": "bold"
                    }
                },
                data: [{
                    value: datas.value,
                    name: datas.res
                }]
            }]
        };
        Echarts.render('bid-kpi', option);
    },

    getWeather:function (location) {
        if(main.clearInterCharge( this.weaterInter,this.domId))return;
        $.ajax({
            url:'https://api.map.baidu.com/telematics/v3/weather',
            dataType:"jsonp",
            // jsonp:'function_name_index',
            // jsonpCallback:'function_name',
            data:{
                location:location,
                output:'json',
                ak:'t5uryEXGfrHPNNGbgam7eEl2'
            },
            success:function (result) {
                if(result.status === 'success'){
                    //基础数据
                    var weatherData = result.results[0].weather_data;
                    var day0Data = weatherData[0];
                    var dateData0 = day0Data.date.split(/\s+/);
                    $('#we_dateFormatter0').html(dateData0[0] + '&nbsp;' +result.date + '&nbsp;' + dateData0[2]);
                }
                var weatherDataItem = weatherData[0];
                var dayData = weatherDataItem.date.split(/\s+/);
                $.each(weatherDataItem,function (item,value) {
                    if($('#we_'+item+0).length < 1) return true;
                    $('#we_'+item+0).text(value);
                    //天气图片
                    if($('#we_'+item+0).get(0).nodeName === 'IMG'){
                        var imgUrl = value.split('/');
                        $('#we_'+item+0).attr('src',"/images/3d_60/"+imgUrl[imgUrl.length-1])
                    }
                })
            },
            error:function (e) {
                console.log(e)
            }
        })
    },
    cameraWin:function (obj) {
        /*var ca = [];
        ca.push({id: 1, name: "摄像头一", sn: "B78AE84B-EEBb-Af51-BC5F-C6C23EDECc98"})
        if(obj.cameraInfos === undefined || !obj.cameraInfos.length){
            $.extend(obj,{cameraInfos:[{id: 1, name: "摄像头一", sn: "B78AE84B-EEBb-Af51-BC5F-C6C23EDECc98"}]});
            console.log('obj',obj)
        }*/
        var _this = this;
        var arr = obj.cameraInfos.cameraInfos;
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
            '            <div class="floatBox"><a style="display: " class="toHis" id="toHis" ></a></div>\n' +
            '            <div id="videoMain" class="videoMain">\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="b-toolbar"><div class="cameraSw" id="cameraList">'+cameraList+'</div><div class="toolBarCon"><a class="switchSource" id="vedio1">'+$.getI18n('screen.affluent')+'</a><a class="switchSource on" id="vedio2">'+$.getI18n('screen.affluent')+'</a><!--<a class="switchScreen" id="switchScreen"></a>--></div></div>\n' +
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
        var opt = obj.cameraInfos;
        $('#LiveWin').length && $('#LiveWin').remove();
        var str = '<div class="camerapop" id="videoHisWin">\n' +
            '    <div class="cameraWin" id="cameraHisWin">\n' +
            '        <a class="closebtn" id="cawin-close"><img src="/images/largeScreen/close_1.png"></a>\n' +
            '        <div class="top-tit">'+obj.name+'('+'<span id="cameraName">'+obj.setCameraName+'</span>'+')'+'</div>\n' +
            '    <div style="width:100%;height: 83%">\n' +
            '            <div class="floatBox"><a class="toHis" id="toLive" ></a></div>\n' +
            '        <object classid="clsid:54FC7795-1014-4BF6-8BA3-500C61EC1A05" id="EZUIKit" name="EZUIKit" style="z-index:10;width: 85%;height: 90%"><param name="wmode" value="opaque" /></object>\n' +
            '        <div class="progressBar"><div class="VideoSplitLine" id="VideoSplitLine"></div><div class="progressMain"><div class="progressCon" id="progressCon"></div></div></div>\n' +
            '            <div class="timePic"><img src="/images/time.png" alt=""></div>\n' +
            '    </div>\n' +
            '    <div class="videoHisList" id="hisTimeList">\n' +
            '            '+$.getI18n('screen.date')+'\n' +
            '        </div><div class="screenSet"><img onclick="SynpowerCamera.toEnlarge()" id="enlarge" src="/images/all.png" alt=""><img style="display: none" onclick="SynpowerCamera.toShrunk()" id="shrunk" src="/images/all2.png" alt=""></div>\n' +
            '       \n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>';
        $('#sysBody').append(str);
        $('#cawin-close').unbind().on('click', function () {
            try{
                SynpowerCamera.StopPlay()
            }catch (e){
                App.alert(e)
            }
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


    }

};