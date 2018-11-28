/** 2018/3/7
 * @author: SP0014
 * @description:  单电站页面 电站状态
 */
define(function () {
    return spStatusCap;
});
var spStatusCap = {
    plantId: '',//电站id
    domId: 'spMonitorCarousel',//模块中的任意Id
    statusInter:'', //状态定时器
    Render:function(){
        var _this = this;
        _this.plantId = opts.plantId || ''
        _this.getData()
    },
    getData:function(){
        var _this = this;
        statusInter();
        function statusInter(){
            if (main.clearInterCharge(_this.statusInter, _this.domId)) return;
            $.http.POST('/monitor/singlePlantStatus.do',{plantId:_this.plantId,tokenId:Cookies.getCook('tokenId')},function(res){
                _this.setStatus(res.body)
            })
        }
        _this.statusInter = setInterval(statusInter, 30000);
    },
    setStatus:function(datas){
        switch (Number(datas.type)) {
            case 0:
                $('.spStatus span').removeClass().addClass('normal');
                $('.palntStatus img').attr('src', '/images/pmImages/solarpanel_2.png');
                break;
            case 1:
                $('.spStatus span').removeClass().addClass('standby');
                $('.palntStatus img').attr('src', '/images/pmImages/standby1.png');
                break;
            case 2:
                $('.spStatus span').removeClass().addClass('fault');
                $('.palntStatus img').attr('src', '/images/pmImages/malfunction.png');
                break;
            case 3:
                $('.spStatus span').removeClass().addClass('break');
                $('.palntStatus img').attr('src', '/images/pmImages/suspend.png');
                break;
            case 4:
                $('.spStatus span').removeClass().addClass('abnormal');
                $('.palntStatus img').attr('src', '/images/pmImages/abnormal.png');
                break;
        }
        $('#sp-status').text(datas.status)
    }
};