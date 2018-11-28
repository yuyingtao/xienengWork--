
define(function () {
    return loadCarouselRender
});
var loadCarouselRender = {
    domId:'carousel-example-generic',//模块Id
    plantStatusInterval:"",//定时刷新基本数据
    flag:false,
    totalInfoInter:'',//累计信息定时刷新
    Render: function () {
        var _this = this;
        //获取轮播图
        _this.getCarousel();
        if(Cookies.getCook('plantType')==1){
            $('.photovoltaic-plant').show();
            $('.optical-storage-plant').hide();
            _this.plantInfo();
            _this.getPlantsData(_this);
        }else{
            $('.photovoltaic-plant').hide();
            $('.optical-storage-plant').show();
            _this.totalInfo()
        }
    },
    //获取轮播图
    getCarousel:function () {
        // alert("11")
        $.http.POST('/system/getPropagandaPhoto.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            // alert("22")
            if(!res.body.length){
                $(`<div class="item active">
                    <img src="/images/newMain/banner1.jpg" alt="">
                </div>
                <div class="item">
                    <img src="/images/newMain/banner2.jpg" alt="">
                </div>
                <div class="item">
                    <img src="/images/newMain/banner3.jpg" alt="">
                </div>`).appendTo($(".carousel-inner"))
            }else{
                if(res.body.length == "1"){
                    for(let i = 0;i<3;i++){
                        if(i==0){
                            $(`<div class="item active"><img src=${res.body[0]} alt=""></div>`).appendTo($(".carousel-inner"))
                        }else {
                            $(`<div class="item"><img src=${res.body[0]} alt=""></div>`).appendTo($(".carousel-inner"))
                        }
                    }
                }else {
                    let elDiv = res.body.map(function (item,index) {
                        if(index == "0"){
                            return $(`<div class="item active"> <img src=${item} alt=""></div>`)
                        }else {
                            return $(`<div class="item"> <img src=${item} alt=""></div>`)
                        }
                    });
                    $(".carousel-inner").append(elDiv)
                }
            }
            //启动轮播
            $('.carousel').carousel();
        })
    },
    //获取电站信息
    getPlantsData:function(_this){
        //基础信息
        getGetPlantsData();
        function getGetPlantsData() {
            _this.flag = false;
            if(main.clearInterCharge(_this.totalInfoInter,_this.domId))return;
            $.http.POST('/monitor/getTotalInfo.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
                if(res.code =="100"){
                    _this.flag = true
                }if(JSON.stringify(res.body) == "{}"){
                    $(".totalPower").html("--");
                    $(".totalPrice").html("--");
                    return false
                }else {
                    const {body} =res;
                    const totalPower = App.ConvertUnit({
                        unit:'kilowatt',
                        num:body.totalPower,
                        len:6,
                        split:4,
                        isInt:true
                    })
                    const totalPrice = App.ConvertUnit({
                        unit:'rmb',
                        num:body.totalPrice,
                        len:6,
                        split:4,
                        isInt:true
                    })
                    // const totalPower = App.convertUnit("kilowatt",body.totalPower,6);
                    // const totalPrice = App.convertUnit("rmb",body.totalPrice,6);
                    $(".totalPower").html(totalPower.num);
                    $(".totalPowerUnit").html(totalPower.unit);
                    $(".totalPrice").html(totalPrice.num);
                    $(".totalPriceUnit").html(totalPrice.unit);
                }
            },true,true)
        }
        _this.totalInfoInter = setInterval(function () {
            if(_this.flag){
                getGetPlantsData();
            }
        },5000);
    },
    //电站基础信息
    plantInfo:function(){
        $.http.POST('/monitor/basicInfo.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            var {body} = res;
            const totalCap =  App.ConvertUnit({
                unit:'watt',
                num:body.totalCap,
                len:6,
                split:3,
                isInt:true
            })
            // const totalCap = App.convertUnit("watt",body.totalCap,6,3);
            $(".totalCap").html(totalCap.num);
            $(".totalCapUnit").html(totalCap.unit);
            $(".totalNum").html(body.totalNum)
        })
    },
    //右上角累计信息
    totalInfo:function(){
        var _this = this;
        totalData();
        function totalData() {
            _this.flag = false;
            if(main.clearInterCharge(_this.plantStatusInterval,_this.domId))return;
            $.http.POST('/monitor/getTotalPhotovoltaic.do',{tokenId:Cookies.getCook('tokenId'),plantType:Cookies.getCook('plantType')},function (res) {
                if(res.code =="100"){
                    _this.flag = true
                }
                if(JSON.stringify(res.body) == "{}"){
                    $(".totalCapacity").html("--");
                    $(".totalElectricity").html("--");
                    $(".totalPhotovoltaicCapacity").html("--");
                    $(".totalGen").html("--");
                    return false
                }else {
                    const {body} =res;
                    const totalCapacity = App.ConvertUnit({
                        unit:'kilowatt',
                        num:body.totalCap,
                        len:6,
                        split:4,
                        isInt:false
                    })
                    const totalElectricity = App.ConvertUnit({
                        unit:'watt',
                        num:body.totalElectricity,
                        len:6,
                        split:4,
                        isInt:false
                    })
                    const totalPhoCap = App.ConvertUnit({
                        unit:'watt',
                        num:body.totalPhoCap,
                        len:6,
                        split:3,
                        isInt:false
                    })
                    const totalGen = App.ConvertUnit({
                        unit:'kilowatt',
                        num:body.totalGen,
                        len:6,
                        split:4,
                        isInt:false
                    })
                    $(".totalCapacity").html(totalCapacity.num);
                    $(".totalCapacityUnit").html(totalCapacity.unit);
                    $(".totalGen").html(totalGen.num);
                    $(".totalGenUnit").html(totalGen.unit);
                    $(".totalPhotovoltaicCapacity").html(totalPhoCap.num);
                    $(".totalPhotovoltaicCapacityUnit").html(totalPhoCap.unit);
                    $(".totalElectricity").html(totalElectricity.num);
                    $(".totalElectricityUnit").html(totalElectricity.unit);
                }
            },true,true)
        }
        _this.plantStatusInterval = setInterval(function () {
            if(_this.flag){
                totalData();
            }
        },5000);
    }

};