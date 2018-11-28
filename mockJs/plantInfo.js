/**
 * 2018/11/19
 * @author hh.todd@qq.com
 * @description  微信接口
 * @param:
*/
module.exports = {
    'getCnPlantPrice.do': {
        "code": "100",
        "body": [
            {
                "name": "光伏电站0.811电价",
                "id": 1
            },
            {
                "name": "光伏电站1.0电价",
                "id": 3
            },
            {
                "name": "2018年并网分布式(I类)",
                "id": 4
            },
            {
                "name": "2018年并网分布式(II类)",
                "id": 5
            },
            {
                "name": "2018年并网分布式(III类)",
                "id": 6
            },
            {
                "name": "2018年并网扶贫(I类)",
                "id": 7
            },
            {
                "name": "2018年并网扶贫(II类)",
                "id": 8
            },
            {
                "name": "2018年并网扶贫(III类)",
                "id": 9
            },
            {
                "name": "2018年并网-西藏",
                "id": 10
            },
            {
                "name": "2017年并网分布式(I类)",
                "id": 11
            },
            {
                "name": "2017年并网分布式(II类)",
                "id": 12
            },
            {
                "name": "2017年并网分布式(III类)",
                "id": 13
            },
            {
                "name": "2018年并网分布式-上海",
                "id": 14
            },
            {
                "name": "2018年并网分布式-北京",
                "id": 15
            },
            {
                "name": "2018年并网分布式-镇江",
                "id": 16
            },
            {
                "name": "2018年并网扶贫河北",
                "id": 17
            }
        ],
        "msg": null
    },
    'getPlantPriceDetail.do': {
        "body": "",
        "code": 100,
        "msg": "新增业主账号成功/失败"
    },
    'getPlantPriceDetail.do': {"code":"100","body":[{"neg":"0.3","pos":0.5,"time":"10:00:00~00:59:00"},{"neg":"0.7","pos":1.0,"time":"01:00:00~09:59:00"}],"msg":null}
};