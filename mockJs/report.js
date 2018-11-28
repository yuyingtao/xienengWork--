/**
 * 2018/11/19
 * @author hh.todd@qq.com
 * @description  微信接口
 * @param:
*/
module.exports = {
    'fuzzySearchPlant.do': {
        "code":100,
        "body": [{
            "addr": "四川省成都市龙泉驿区",
            "capacity": "111kw",
            "distribution": "1.2公里",
            "genToday": "111kW",
            "plantName": "龙泉电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun@2x.png",
            "weather":"晴天",
            "plantId": "1",
            "status": "",
            "type": "0",
            "plantType":1
        },{
            "addr": "四川省成都市高新区天府大道",
            "capacity": "222KW",
            "distribution": "3.6公里",
            "genToday": "222KW",
            "plantName": "高新区电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun@2x.png",
            "weather":"晴天",
            "plantId": "2",
            "status": "1",
            "type": "1",
            "soc":"89%",
            "plantType":2
        },{
            "addr": "四川省成都市双流区",
            "capacity": "333KW",
            "distribution": "4.8公里",
            "genToday": "333kw",
            "plantName": "双流电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun@2x.png",
            "weather":"晴天",
            "plantId": "3",
            "status": "2",
            "type": "6",
            "soc":"89%",
            "plantType":3
        }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444kw",
                "plantName": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "type": "5",
                "energyStorage":"120kWh",
                "soc":"89%",
                "phoCap":"120kw",
                "plantType":3
            }
        ]

    }
};