/**
 * 2018/8/14
 * @author hh.todd@qq.com
 * @description  能效系统
 * @param:
*/
define(function(){
    return energyEfficientPageRender;
});
var energyEfficientPageRender = {
    Render: function () {
        var plantNum = Cookies.getCook('plantNum').split(',')
        if (+plantNum[2] === -1) {
            $('#eeMainContent').attr('attr-href', 'partial/plantMonitor/pmSingleIndex.html',{singlePlantType:plantType})
        }else {
            $('#eeMainContent').loadPage('partial/energyEfficient/activeMonitor/index.html')
        }

        //切换系统
        $('#navSysCtrolNav').css("display",'block')
        $('#navSysCtrol .ctrolBox').on('click',function () {
            var $this = $(this)
            // if($(this).hasClass('on') || $this.attr('attr-sys') === 'cnmain') return


            if($(this).hasClass('on')) return
            $('#navSysCtrol .ctrolBox').removeClass('on')
            $('.solarIcon').find('img').attr('src','/images/energyEfficient/activeMonitor/solar_1.png')
            $('.socIcon').find('img').attr('src','/images/energyEfficient/activeMonitor/soc_1.png')
            $('.energyIcon').find('img').attr('src','/images/energyEfficient/activeMonitor/energy_1.png')
            $(this).addClass('on')
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

        //设置用户名字
        $('#userName').text(Cookies.getCook('userName'));
        var logoPic = Cookies.getCook('energyEffLogoPic');
        !!logoPic ? $('#logoImg').attr('src', logoPic).one('error', function () {
            $('#logoImg').attr('src', '/images/energyEfficient/activeMonitor/logo_6.png')
        }) : $('#logoImg').attr('src', '/images/energyEfficient/activeMonitor/logo_6.png');
        var userPic = Cookies.getCook('userPic');
        var $userPic = $('#userName:before')
        !!userPic ? $userPic.attr('src', userPic).one('error', function () {
            $userPic.attr('src', '/images/newMain/admin.png')
        }) : $userPic.attr('src', '/images/newMain/admin.png');

        //退出
        $('#exitEe').on('click', function () {
            $.http.POST('/login/loginOut.do', {}, function (result) {
                Menu.clearUserRole();
                Cookies.setCookByName('tokenId', '');
                localStorage.setItem('login', '');
                Cookies.setCookByName('defaultLoading','')
                Cookies.clearAllCookie()
                window.location.href = window.URLHREF
            })
        });

        //当前企业拥有的电站类型
        var plantTypeList = Cookies.getCook('plantTypeList').split(',')
        if(plantTypeList.length === 1){
            $('#navSysCtrolNav').remove()
            Cookies.setCookByName('plantType', +plantTypeList[0]);//电站类型，1：光伏；2：储能；
        }else if(plantTypeList.length === 2){
            if(plantTypeList.indexOf("1")===-1){
                $('#solarIcon').remove()
            }else if(plantTypeList.indexOf("2")===-1){
                $('#socIcon').remove()
            }else if(plantTypeList.indexOf("4")===-1){
                $('#energyIcon').remove()
            }
        }
    },
}