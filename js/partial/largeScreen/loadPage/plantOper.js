/*2017/11/9
* @author: lms
* @description:电站运营
*/
define(function () {
    return plantOper;
});
var plantOper = {
    Render:function () {
        this.getPlantOperData()
    },
    getPlantOperData:function () {
        var _this = this;
        $.http.POST('/screen/business.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            _this.businessDetail(res.body);
            _this.drawPie(['rgba(15,197,159,1)','rgba(13,70,57,1)'],'pie1',[{name:res.body.controlName,value:res.body.controlNum},{name:'剩余',value:(res.body.totalNum-res.body.controlNum)}]);
            _this.drawPie(['rgba(77,67,21,1)','rgba(250,217,37,1)'],'pie2',[{name:'剩余',value:(res.body.totalNum-res.body.businessNum)},{name:res.body.businessName,value:res.body.businessNum}]);
            _this.drawPie(['rgba(135,188,103,1)','rgba(42,57,42,1)'],'pie3',[{name:res.body.serviceName,value:res.body.serviceNum},{name:'剩余',value:(res.body.totalNum-res.body.serviceNum)}]);
            _this.drawPie(['rgba(78,39,21,1)','rgba(255,126,39,1)'],'pie4',[{name:'剩余',value:(res.body.totalNum-res.body.roleNum)},{name:res.body.roleName,value:res.body.roleNum}]);
        })
    },
    businessDetail:function (data) {
        $('.oper1').text(data.controlName);
        $('.oper3').text(data.businessName);
        $('.oper5').text(data.serviceName);
        $('.oper7').text(data.roleName);
        $('.oper2').text(data.controlNum+'人');
        $('.oper4').text(data.businessNum+'人');
        $('.oper6').text(data.serviceNum+'人');
        $('.oper8').text(data.roleNum+'人');
    },
    drawPie:function(color,id,data){
       var options = {
            color:color,
            title: {
            },
            tooltip: {
                show: true,
                trigger: 'item',
                textStyle:{
                    color:'#333'
                },
                formatter: '{b}:  {c}'
            },
            legend: {

            },
            series: [{
                name: '',
                hoverAnimation:false,
                type: 'pie',
                radius : ['50%','90%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data
            }]
        };
        Echarts.render(id, options);
    }
};