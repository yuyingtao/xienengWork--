/** 2017/10/19
* @author: kj
* @description:
*/
define(function(){
    return PSIPageRender;
});
var PSIPageRender = {
    isSearchTo:false,//是否是由搜索而来
    plantId:'',
    Render: function (opts) {
        //    Todo Main function
        var _this = this;
        if(Cookies.getCook('defaultLoading') === 'singleSys'){
            opts = JSON.parse(Cookies.getCook('singlePlantInfo'))
            _this.plantId = opts.plantId
        }
        $("nav ul li").unbind("click").on("click",function () {
            $('#mianPage_container').loadPage($(this).find('a').attr('attr-href'));
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
        Cookies.setCookByName('defaultLoading', Number(Cookies.getCook("sysType")) === 0 ? 'main' : 'singleSys');
        $('#navTitBar div').unbind("click").on('click',function () {
            var $this = $(this);
            $('#navTitBar div').removeClass('on');
            $this.addClass('on');
            $('#pmSinglecontent').loadPage($this.attr('attr-href'),opts);
        });
        // $('#navTitBar div').eq(0).click();
        this.searchPlant(opts.plantId)
        !this.isSearchTo && $('#pmSinglecontent').loadPage('partial/plantMonitor/pmSinglePlant.html',opts);
    },
    //搜索
    searchPlant:function (plantId) {
        var _this = this;
        _this.isSearchTo = false
        $('.serchBox input').on('focus',function(){
            //alert(1)
            var plantName = $('#plantName').val();
        });

        $(".pnContainer").mCustomScrollbar({
            theme:"3d",
            axis:"yx" // vertical and horizontal scrollbar
        });
        $.http.POST('/monitor/getPlantName.do',{tokenId:Cookies.getCook('tokenId'),plantId:(!!plantId ? plantId:_this.plantId) },function(res){
            $('#sp-name').text(res.body.name);
            $('#plantName').val(res.body.name)
        });
        $('.serchBox input').bind('input propertychange',function(){
            var plantName = $('#plantName').val();
            $.http.POST('/monitor/fuzzySearchPlant.do',{tokenId:Cookies.getCook('tokenId'),plantName:plantName,plantType:Cookies.getCook('plantType')},function(res){
                $('.plantContain').hide();
                if(res.body.plantList.length!=0){
                    $('.plantContain').show();
                    var html ='';
                    $.each(res.body.plantList,function(i,val){
                        html+='<a data-id="'+val.plantId+'"  data-planttype="'+val.singlePlantType+'">'+val.plantName+'</a>'
                    });
                    $('.plantContain .pcScrrol').html(html);
                    //点击a选中
                    $('.plantContain .pnContainer a').on('click',function(){
                        $('#plantName').val($(this).text());
                        $('.plantContain').hide();
                        var id = $(this).data('id');
                        var singlePlantType = $(this).data('planttype');

                        _this.isSearchTo = true
                        $('#pmSinglecontent').loadPage('partial/plantMonitor/pmSingleIndex.html',{singlePlantType:singlePlantType,plantId:id},function () {
                            $('#navTitBar div').eq(0).click()
                        });
                        // alert(id)
                    });

                    $('body').unbind('click').on('click',function () {
                        $('.plantContain .serchBox').unbind('click').on('click',function () {

                        });
                        $('.plantContain').hide();
                    })


                }
            })
        });
        $('#serchSingleBtn').on('click',function () {

        })
    }
};