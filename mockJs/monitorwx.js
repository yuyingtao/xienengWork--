module.exports = {
    'getUserInfo.do': {
        code: 100,
        body: {
            "orgName": "科亚机电有限责任公司",
            "orgCode": "X73950",
            "userTel": "18782275148",
            "userName": "阿娇"
        },
        "msg": ""
    },
    'updateValueOfGuid.do': {
        "body": "执行成功",
        "code": 100,
        "msg": "0.0177"
    },
    'deviceDetail.do': {
        "code": "100",
        "body": {
            "basicMsg": {
                "connTime": "2017-12-22",
                "power": "36.0千瓦",
                "sn": "ERTERTFDSG",
                "type": "0",
                "brand": "华为",
                "modal": "SUN2000-36kTL",
                "status": "发电中"
            },
            "data": {
                "deviceType": 2,
                "showData": [
                    [
                        {
                            "name": "PV1输入电压",
                            "value": "594.1 V"
                        },
                        {
                            "name": "PV1输入电流",
                            "value": "0.1 A"
                        },
                        {
                            "name": "PV2输入电压",
                            "value": "594.1 V"
                        },
                        {
                            "name": "PV2输入电流",
                            "value": "0.1 A"
                        },
                        {
                            "name": "PV3输入电压",
                            "value": "614.1 V"
                        },
                        {
                            "name": "PV3输入电流",
                            "value": "0.1 A"
                        },
                        {
                            "name": "PV4输入电压",
                            "value": "614.1 V"
                        },
                        {
                            "name": "PV4输入电流",
                            "value": "0.1 A"
                        },
                        {
                            "name": "PV5输入电压",
                            "value": "603.8 V"
                        },
                        {
                            "name": "PV5输入电流",
                            "value": "0.1 A"
                        },
                        {
                            "name": "PV7输入电压",
                            "value": "585 V"
                        },
                        {
                            "name": "PV7输入电流",
                            "value": "0.1 A"
                        },
                        {
                            "name": "MPPT1输入总功率",
                            "value": "0.07 kW"
                        },
                        {
                            "name": "MPPT2输入总功率",
                            "value": "0.07 kW"
                        },
                        {
                            "name": "MPPT3输入总功率",
                            "value": "0.04 kW"
                        },
                        {
                            "name": "MPPT4输入总功率",
                            "value": "0.03 kW"
                        }
                    ],
                    [
                        {
                            "name": "电网AB线电压",
                            "value": "386.2 V"
                        },
                        {
                            "name": "电网BC线电压",
                            "value": "388.8 V"
                        },
                        {
                            "name": "电网CA线电压",
                            "value": "387.6 V"
                        },
                        {
                            "name": "电网A相电压",
                            "value": "223.2 V"
                        },
                        {
                            "name": "电网B相电压",
                            "value": "224.6 V"
                        },
                        {
                            "name": "电网C相电压",
                            "value": "223.9 V"
                        },
                        {
                            "name": "电网A相电流",
                            "value": "0 A"
                        },
                        {
                            "name": "电网B相电流",
                            "value": "0 A"
                        },
                        {
                            "name": "电网C相电流",
                            "value": "0 A"
                        },
                        {
                            "name": "电网频率",
                            "value": "50.02 Hz"
                        },
                        {
                            "name": "功率因数",
                            "value": "0 "
                        },
                        {
                            "name": "当前小时发电量",
                            "value": "0.03 kWh"
                        },
                        {
                            "name": "当前日发电量",
                            "value": "0.03 度"
                        },
                        {
                            "name": "当前月发电量",
                            "value": "137.01 kWh"
                        },
                        {
                            "name": "当前年发电量",
                            "value": "137.01 kWh"
                        },
                        {
                            "name": "总发电量",
                            "value": "1413.5 度"
                        }
                    ],
                    [
                        {
                            "name": "逆变器效率",
                            "value": "76.97 %"
                        },
                        {
                            "name": "机内温度",
                            "value": "5 ℃"
                        },
                        {
                            "name": "绝缘阻抗值",
                            "value": "2.27 MΩ"
                        },
                        {
                            "name": "闭锁状态",
                            "value": "1 "
                        },
                        {
                            "name": "零电压穿越保护状态",
                            "value": "2040 "
                        },
                        {
                            "name": "低电压穿越保护状态",
                            "value": "1020 "
                        },
                        {
                            "name": "孤岛效应保护状态",
                            "value": "510 "
                        },
                        {
                            "name": "逆变并网状态",
                            "value": "1 "
                        },
                        {
                            "name": "当天峰值有功功率",
                            "value": "0.1 kW"
                        },
                        {
                            "name": "有功功率",
                            "value": "0.08 kW"
                        },
                        {
                            "name": "无功功率",
                            "value": "0 kVar"
                        },
                        {
                            "name": "输入总功率",
                            "value": "0.11 kW"
                        },
                        {
                            "name": "逆变器开机时间",
                            "value": "1515140736 Sec"
                        },
                        {
                            "name": "逆变器关机时间",
                            "value": "1515078656 Sec"
                        }
                    ]
                ]
            },
            "monitor": {
                "setBtns": [
                    {
                        "guid": "VX217503532_YK_0",
                        "value": "0",
                        "tipTitle": "远程开机",
                        "tipContent": "开机后逆变器将开始发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        "label": "开机"
                    },
                    {
                        "guid": "VX217503532_YK_1",
                        "value": "1",
                        "tipTitle": "远程关机",
                        "tipContent": "关机后逆变器将停止发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        "label": "关机"
                    }
                ],
                "ykGuid": null,
                "setDatas": [],
                "ykValue": null
            },
            "status": [
                {
                    "name": "升级失败",
                    "value": "0"
                },
                {
                    "name": "Flash故障",
                    "value": "0"
                },
                {
                    "name": "逆变电路异常",
                    "value": "0"
                },
                {
                    "name": "残余电流异常",
                    "value": "0"
                },
                {
                    "name": "温度过高",
                    "value": "0"
                },
                {
                    "name": "绝缘阻抗低",
                    "value": "0"
                },
                {
                    "name": "直流电路异常",
                    "value": "0"
                },
                {
                    "name": "DC输入电压高",
                    "value": "0"
                },
                {
                    "name": "DC输入电压高",
                    "value": "0"
                },
                {
                    "name": "DC输入电压高",
                    "value": "0"
                },
                {
                    "name": "DC输入电压高",
                    "value": "0"
                },
                {
                    "name": "接地异常",
                    "value": "0"
                },
                {
                    "name": "组串1异常",
                    "value": "0"
                },
                {
                    "name": "组串2异常",
                    "value": "0"
                },
                {
                    "name": "组串3异常",
                    "value": "0"
                },
                {
                    "name": "组串4异常",
                    "value": "0"
                },
                {
                    "name": "组串5异常",
                    "value": "0"
                },
                {
                    "name": "组串6异常",
                    "value": "0"
                },
                {
                    "name": "组串7异常",
                    "value": "0"
                },
                {
                    "name": "组串8异常",
                    "value": "0"
                }
            ]
        },
        "msg": null
    },
    'device.do': {
        "body": [
            {
                "groupData": [
                    {
                        "deviceType": 1,
                        "name": "逆变器004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "57",
                        "status": 0
                    },
                    {
                        "deviceType": 1,
                        "name": "逆变器003",
                        "devicePower": "NaN",
                        "type": 1,
                        "deviceId": "52",
                        "status": 0
                    }
                ],
                "groupName": "集中式逆变器"
            },
            {
                "groupData": [
                    {
                        "deviceType": 2,
                        "name": "36K-303",
                        "devicePower": "0kWh",
                        "type": 2,
                        "deviceId": "55",
                        "status": 1
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-302",
                        "devicePower": "0kWh",
                        "type": 3,
                        "deviceId": "54",
                        "status": 1
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-301-5235695",
                        "devicePower": "0kWh",
                        "type": 4,
                        "deviceId": "53",
                        "status": 1
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-101",
                        "devicePower": "22.13kWh",
                        "type": 0,
                        "deviceId": "43",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-204",
                        "devicePower": "21.9kWh",
                        "type": 0,
                        "deviceId": "51",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-203",
                        "devicePower": "22.22kWh",
                        "type": 0,
                        "deviceId": "50",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-202",
                        "devicePower": "14.93kWh",
                        "type": 0,
                        "deviceId": "49",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-201",
                        "devicePower": "22.3kWh",
                        "type": 2,
                        "deviceId": "48",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-102",
                        "devicePower": "14.43kWh",
                        "type": 0,
                        "deviceId": "44",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-104",
                        "devicePower": "21.85kWh",
                        "type": 1,
                        "deviceId": "46",
                        "status": 0
                    },
                    {
                        "deviceType": 2,
                        "name": "36K-103",
                        "devicePower": "22.59kWh",
                        "type": 0,
                        "deviceId": "45",
                        "status": 0
                    }
                ],
                "groupName": "逆变器"
            },
            {
                "groupData": [
                    {
                        "deviceId": 5,
                        "devicePower": "5MW",
                        "deviceType": 3,
                        "type": 2,
                        "name": "0001采集器",
                        "status": 0
                    },
                    {

                        "deviceType": 5,
                        "name": "采集器004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 5,
                        "name": "采集器004",
                        "devicePower": "NaN",
                        "type": 3,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 5,
                        "name": "采集器004",
                        "devicePower": "NaN",
                        "type": 4,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 5,
                        "name": "采集器005",
                        "devicePower": "NaN",
                        "type": 1,
                        "deviceId": "55",
                        "status": 0
                    }
                ],
                "groupName": "采集器"
            },
            {
                "groupData": [
                    {

                        "deviceType": 3,
                        "name": "电表004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 3,
                        "name": "电表004",
                        "devicePower": "NaN",
                        "type": 2,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 3,
                        "name": "电表004",
                        "devicePower": "NaN",
                        "type": 4,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 3,
                        "name": "电表004",
                        "devicePower": "15.23kW",
                        "type": 3,
                        "deviceId": "2",
                        "status": 0
                    }
                ],
                "groupName": "电表"
            },
            {
                "groupData": [
                    {

                        "deviceType": 10,
                        "name": "BMS004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 10,
                        "name": "BMS005",
                        "devicePower": "15.23kW",
                        "type": 3,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 10,
                        "name": "BMS005",
                        "devicePower": "15.23kW",
                        "type": 2,
                        "deviceId": "2",
                        "status": 0
                    }
                ],
                "groupName": "BMS"
            },
            {
                "groupData": [
                    {

                        "deviceType": 11,
                        "name": "汇流箱01",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 11,
                        "name": "汇流箱02",
                        "devicePower": "15.23kW",
                        "type": 3,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 11,
                        "name": "汇流箱02",
                        "devicePower": "15.23kW",
                        "type": 2,
                        "deviceId": "2",
                        "status": 0
                    }
                ],
                "groupName": "汇流箱"
            },
            {
                "groupData": [
                    {

                        "deviceType": 9,
                        "name": "PCS004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 9,
                        "name": "PCS005",
                        "devicePower": "15.23kW",
                        "type": 2,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 9,
                        "name": "PCS005",
                        "devicePower": "15.23kW",
                        "type": 1,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 9,
                        "name": "PCS005",
                        "devicePower": "15.23kW",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 9,
                        "name": "PCS005",
                        "devicePower": "15.23kW",
                        "type": 3,
                        "deviceId": "2",
                        "status": 0
                    }
                ],
                "groupName": "PCS"
            },
            {
                "groupData": [
                    {

                        "deviceType": 12,
                        "name": "XB004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 12,
                        "name": "XB45",
                        "devicePower": "15.23kW",
                        "type": 2,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 12,
                        "name": "XB0051",
                        "devicePower": "15.23kW",
                        "type": 1,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 12,
                        "name": "XB0305",
                        "devicePower": "15.23kW",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 12,
                        "name": "PCS005",
                        "devicePower": "15.23kW",
                        "type": 3,
                        "deviceId": "2",
                        "status": 0
                    }
                ],
                "groupName": "箱变"
            },
            {
                "groupData": [
                    {

                        "deviceType": 13,
                        "name": "HJ004",
                        "devicePower": "NaN",
                        "type": 0,
                        "deviceId": "2",
                        "status": 4
                    },
                    {

                        "deviceType": 13,
                        "name": "HJ45",
                        "devicePower": "15.23kW",
                        "type": 2,
                        "deviceId": "2",
                        "status": 2
                    },
                    {

                        "deviceType": 13,
                        "name": "HJ0051",
                        "devicePower": "15.23kW",
                        "type": 1,
                        "deviceId": "2",
                        "status": 1
                    },
                    {

                        "deviceType": 13,
                        "name": "HJ0305",
                        "devicePower": "15.23kW",
                        "type": 0,
                        "deviceId": "2",
                        "status": 0
                    },
                    {

                        "deviceType": 13,
                        "name": "HJS005",
                        "devicePower": "15.23kW",
                        "type": 3,
                        "deviceId": "2",
                        "status": 3
                    }
                ],
                "groupName": "箱变"
            }
        ],
        "code": 100,
        "msg": "0.0177"
    },
    'getList.do': {
        "code":100,
        "body": [{
            "addr": "四川省成都市龙泉驿区",
            "capacity": "111kw",
            "distribution": "1.2公里",
            "genToday": "524",
            "genTodayUnit": "kW",
            "name": "龙泉电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "1",
            "status": "",
            "type": "0",
            "plantType":1
        },{
            "addr": "四川省成都市高新区天府大道",
            "capacity": "222KW",
            "distribution": "3.6公里",
            "genToday": "147",
            "genTodayUnit": "kW",
            "name": "高新区电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "2",
            "status": "1",
            "energyStorage": "100",
            "energyStorageUnit": "kWh",
            "type": "1",
            "soc":"89%",
            "plantType":1
        },{
            "addr": "四川省成都市双流区",
            "capacity": "333KW",
            "distribution": "4.8公里",
            "genToday": "123",
            "genTodayUnit": "kW",
            "name": "双流电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "3",
            "status": "2",
            "energyStorage": "100",
            "energyStorageUnit": "kWh",
            "phoCap":"120",
            "phoCapUnit":"kw",
            "type": "6",
            "soc":"89%",
            "plantType":1
        }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444",
                "genTodayUnit": "kW",
                "name": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "5",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "soc":"89%",
                "plantType":1
            },
            {
                "addr": "四川省成都市龙泉驿区",
                "capacity": "111kw",
                "distribution": "1.2公里",
                "genToday": "524",
                "genTodayUnit": "kW",
                "name": "龙泉电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "1",
                "status": "",
                "type": "0",
                "plantType":1
            },{
                "addr": "四川省成都市高新区天府大道",
                "capacity": "222KW",
                "distribution": "3.6公里",
                "genToday": "147",
                "genTodayUnit": "kW",
                "name": "高新区电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "2",
                "status": "1",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "1",
                "soc":"89%",
                "plantType":1
            },{
                "addr": "四川省成都市双流区",
                "capacity": "333KW",
                "distribution": "4.8公里",
                "genToday": "123",
                "genTodayUnit": "kW",
                "name": "双流电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "3",
                "status": "2",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "type": "6",
                "soc":"89%",
                "plantType":1
            }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444",
                "genTodayUnit": "kW",
                "name": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "5",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "soc":"89%",
                "plantType":1
            },
            {
                "addr": "四川省成都市龙泉驿区",
                "capacity": "111kw",
                "distribution": "1.2公里",
                "genToday": "524",
                "genTodayUnit": "kW",
                "name": "龙泉电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "1",
                "status": "",
                "type": "0",
                "plantType":1
            },{
                "addr": "四川省成都市高新区天府大道",
                "capacity": "222KW",
                "distribution": "3.6公里",
                "genToday": "147",
                "genTodayUnit": "kW",
                "name": "高新区电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "2",
                "status": "1",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "1",
                "soc":"89%",
                "plantType":1
            },{
                "addr": "四川省成都市双流区",
                "capacity": "333KW",
                "distribution": "4.8公里",
                "genToday": "123",
                "genTodayUnit": "kW",
                "name": "双流电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "3",
                "status": "2",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "type": "6",
                "soc":"89%",
                "plantType":1
            }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444",
                "genTodayUnit": "kW",
                "name": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "5",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "soc":"89%",
                "plantType":1
            },
            {
                "addr": "四川省成都市龙泉驿区",
                "capacity": "111kw",
                "distribution": "1.2公里",
                "genToday": "524",
                "genTodayUnit": "kW",
                "name": "龙泉电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "1",
                "status": "",
                "type": "0",
                "plantType":1
            },{
                "addr": "四川省成都市高新区天府大道",
                "capacity": "222KW",
                "distribution": "3.6公里",
                "genToday": "147",
                "genTodayUnit": "kW",
                "name": "高新区电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "2",
                "status": "1",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "1",
                "soc":"89%",
                "plantType":1
            },{
                "addr": "四川省成都市双流区",
                "capacity": "333KW",
                "distribution": "4.8公里",
                "genToday": "123",
                "genTodayUnit": "kW",
                "name": "双流电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "3",
                "status": "2",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "type": "6",
                "soc":"89%",
                "plantType":1
            }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444",
                "genTodayUnit": "kW",
                "name": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "5",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "soc":"89%",
                "plantType":1
            },
            {
                "addr": "四川省成都市龙泉驿区",
                "capacity": "111kw",
                "distribution": "1.2公里",
                "genToday": "524",
                "genTodayUnit": "kW",
                "name": "龙泉电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "1",
                "status": "",
                "type": "0",
                "plantType":1
            },{
                "addr": "四川省成都市高新区天府大道",
                "capacity": "222KW",
                "distribution": "3.6公里",
                "genToday": "147",
                "genTodayUnit": "kW",
                "name": "高新区电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "2",
                "status": "1",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "1",
                "soc":"89%",
                "plantType":1
            },{
                "addr": "四川省成都市双流区",
                "capacity": "333KW",
                "distribution": "4.8公里",
                "genToday": "123",
                "genTodayUnit": "kW",
                "name": "双流电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "3",
                "status": "2",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "type": "6",
                "soc":"89%",
                "plantType":1
            }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444",
                "genTodayUnit": "kW",
                "name": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "5",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "soc":"89%",
                "plantType":1
            }
        ]

    },
    'getMapPlant.do': {
        "code": "100",
        "body": {
            "addr": "四川省成都市双流区",
            "capacity": "333KW",
            "distribution": "4.8公里",
            "genToday": "123",
            "genTodayUnit": "kW",
            "name": "双流电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "3",
            "status": "2",
            "energyStorage": "100",
            "energyStorageUnit": "kWh",
            "phoCap":"120",
            "unit":"kW",
            "phoCapUnit":"kw",
            "type": 2,
            "soc":"89%",
            "plantType":3
        },
        "msg": null
    },
    'singlePlant.do': {
        "code": "100",
        "body": {
            "genUToday": "度",
            "proUToday": "元",
            "proTotal": 2792.7,
            "proToday": 0.08,
            "genTotal": 3443.53,
            "genUTotal": "度",
            "genToday": 0.1,
            "proUTotal": "元",
            "disToday":100,
            "disUYoday":"度",
            "disTotal":3400.23,
            "soc":"26%",
            "chargeTotal":15241.25
        },
        "msg": null
    },
    'singleGenCurve.do': {
        "code": "100",
        "body": {
            "maxValue": 204.82,
            "xData": [
                "12-27",
                "12-28",
                "12-29",
                "12-30",
                "12-31",
                "01-01",
                "01-02",
                "01-03",
                "01-04",
                "01-05"
            ],
            "yData": [
                {
                    "unit": "度",
                    "name": "发电量",
                    "value": [
                        178.56,
                        191.58,
                        139.98,
                        126.07,
                        204.82,
                        183.65,
                        85.6,
                        45.2,
                        0.5,
                        0.1
                    ]
                },
                /*{
                    "name": "充电量",
                    "value": [
                        198.69,
                        178.56,
                        191.58,
                        183.65,
                        85.6,
                        45.2,
                        0.5,
                        139.98,
                        126.07,
                        204.82
                    ]
                },
                {
                    "name": "放电量",
                    "value": [
                        183.65,
                        85.6,
                        45.2,
                        0.5,
                        139.98,
                        126.07,
                        198.69,
                        178.56,
                        191.58,
                        204.82
                    ]
                }*/
            ]
        },
        "msg": "查询成功！"
    },
    'static.do': {
        "code": "100",
        "body": {
            "plantType":0,
            "contribution": [
                {
                    "unity": "kg",
                    "name": "CO²减排",
                    "value": 1667.82
                },
                {
                    "unity": "棵",
                    "name": "等效植树",
                    "value": 91
                },
                {
                    "unity": "kg",
                    "name": "节约标准煤",
                    "value": 675.83
                }
            ],
            "plantStatus": {
                "gen": "0",
                "standby": "1",
                "totalPrice": "2792.63元",
                "break": "0",
                "fault": "0",
                "abnormal":"1",
                "totalPower": "3443.43kWh"
            },
            "totalCapacity": "70541121.2",
            "companyName": "科亚机电有限责任公司",
            "deviceDis": {
                "partCount": "260块",
                "inverterCount": "2台",
                "plantArea": "750平方米"
            },
            "plantTotal": 1,
            "plantScale": [

                {
                    "value": 6,
                    "name": "光伏电站"
                },
                {
                    "value": 8,
                    "name": "光储电站"
                }
            ],
            "sizeAndIncome":[
                {
                    "unity": "度",
                    "name": "储能容量",
                    "value": 166715
                },
                {
                    "unity": "度",
                    "name": "光伏容量",
                    "value": 9154115.3
                },
                {
                    "unity": "元",
                    "name": "累计收益",
                    "value": 654175.83
                }
            ]
        },
        "msg": null
    },
    'genCurve.do': {
        "code": "100",
        "body": {
            "start": "2017-12-26",
            "xData": [
                "12-26",
                "12-27",
                "12-28",
                "12-29",
                "12-30",
                "12-31",
                "01-01",
                "01-02",
                "01-03",
                "01-04"
            ],
            "unity1": "kWh",
            "yData": [
                {
                    "name": "发电量",
                    "value": [
                        198.69,
                        178.56,
                        191.58,
                        139.98,
                        126.07,
                        204.82,
                        183.65,
                        85.6,
                        45.2,
                        0.5
                    ]
                },
               /* {
                    "name": "充电量",
                    "value": [
                        198.69,
                        178.56,
                        191.58,
                        183.65,
                        85.6,
                        45.2,
                        0.5,
                        139.98,
                        126.07,
                        204.82
                    ]
                },
                {
                    "name": "放电量",
                    "value": [
                        183.65,
                        85.6,
                        45.2,
                        0.5,
                        139.98,
                        126.07,
                        198.69,
                        178.56,
                        191.58,
                        204.82
                    ]
                }*/
            ],
            "end": "2018-01-04",
            "maxData1": 204.82
        },
        "msg": "查询成功！"
    },
    'powerCurve.do': {
        "code": "100",
        "body": {
            "yData1" : ["0", "0", "0.07", "0.28", "0.57", "0.87", "1.19", "1.64", "2.18", "2.79", "3.26", "3.98", "4.65", "5.34", "6", "6.82", "7.65", "8.3", "9.15", "10.25", "11.55", "12.37", "12.94", "14.14", "15.35", "15.97", "17.41", "18.88", "20", "21.36", "23.09", "25.3", "26.99", "28.83", "31.42", "32.07", "33.13", "34.87", "37.94", "39.53", "43.87", "43.72", "43.7", "45.03", "46.06", "43.49", "44.91", "49.17", "48.53", "48.58", "52.5", "52.09", "53.51", "51.66", "55.13", "58.24", "57.26", "60.8", "56.77", "57.7", "56.07", "61.65", "53.58", "61.88", "60.35", "58.19", "26.09", "60.94", "59.38", "64.43", "68.54", "61.82", "63.02", "66.22", "53.85", "60.04", "65.91", "60.83", "55.35", "61.72", "58.91", "55.95", "60.27", "58.05", "61.08", "59.94", "56.8", "58.15", "58.54", "55.41", "55.32", "52.03", "55.54", "51.38", "47.84", "47.67", "50.45", "47.85", "46.53", "46.95", "43.85", "42.85", "39.1", "40.9", "38.67", "36.88", "37.63", "37.34", "35.68", "34.22", "33.02", "32.16", "31.29", "29.65", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            "xData": ["06:30", "06:35", "06:40", "06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55", "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20"],
            "minValue": 0.0,
            "unit": "千瓦",
            "curPower": "88000",
            "maxValue": 0.171,
            "curData2" :"89.11",
            "curTime" :"15:55",
            "yData2" : ["0.0", "3.834", "7.614", "11.339", "15.01", "18.627", "22.189", "25.697", "29.15", "32.55", "35.894", "39.185", "42.42", "45.602", "48.729", "51.802", "54.82", "57.784", "60.694", "63.549", "66.35", "69.096", "71.789", "74.426", "77.01", "79.538", "82.013", "84.433", "86.799", "89.11", "91.367", "93.57", "95.718", "97.812", "99.851", "101.836", "103.767", "105.643", "107.465", "109.233", "110.946", "112.605", "114.209", "115.759", "117.255", "118.696", "120.083", "121.415", "122.693", "123.917", "125.086", "126.201", "127.261", "128.268", "129.219", "130.117", "130.96", "131.748", "132.482", "133.162", "133.788", "134.359", "134.875", "135.338", "135.746", "136.099", "136.398", "136.643", "136.833", "136.969", "137.051", "137.078", "137.051", "136.969", "136.833", "136.643", "136.398", "136.099", "135.746", "135.338", "134.875", "134.359", "133.788", "133.162", "132.482", "131.748", "130.96", "130.117", "129.219", "128.268", "127.261", "126.201", "125.086", "123.917", "122.693", "121.415", "120.083", "118.696", "117.255", "115.759", "114.209", "112.605", "110.946", "109.233", "107.465", "105.643", "103.767", "101.836", "99.851", "97.812", "95.718", "93.57", "91.367", "89.11", "86.799", "84.433", "82.013", "79.538", "77.01", "74.426", "71.789", "69.096", "66.35", "63.549", "60.694", "57.784", "54.82", "51.802", "48.729", "45.602", "42.42", "39.185", "35.894", "32.55", "29.15", "25.697", "22.189", "18.627", "15.01", "11.339", "7.614", "3.834", "0.0"]

        },
        "msg": null
    },
    'plantMap.do': {
        "code": "100",
        "body": [
            {
                "latitude": "34.7202921520",
                "plantId": 1,
                "type": 0,
                "longitude": "116.5657567978"
            },
            {
                "latitude": "36.7202921520",
                "plantId": 2,
                "type": 1,
                "longitude": "113.5657567978"
            }
        ],
        "msg": null
    },
    'singleDynamic.do': {
        "code":"100",
        "body":{
            "singlePlantType":0,
            "addr":"江苏省徐州市丰县常店镇马楼村南方向",
            "capacity":"70.2KW",
            "weather":{"dayPictureUrl":"/images/weather/duoyun.png","weather":"多云"},
            "deviceStatus":{
                "gen":3,
                "standby":0,
                "break":0,
                "fault":0,
                "abnormal":1
            },
            "deviceTotal":3,
            "deviceDis":{"area":"null平方米","types":[1,2],"plants":["1"],"module":"260块","inverter":"0台"},
            "contribution":[
                {"unit":"kg","name":"CO²减排","value":1668.32},
                {"unit":"棵","name":"等效植树","value":91},
                {"unit":"kg","name":"节约标准煤","value":676.03}
            ],
            "componentModule":[
                {"unit":"台","name":"PCS","value":166832},
                {"unit":"块","name":"电池簇","value":915412},
                {"unit":"平方米","name":"占地面积","value":67641.03}
            ],
            "img":["/images/banner1.png","/images/banner2.png","/images/banner3.png","/images/banner4.png"],
            "location":["34.7202921520","116.5657567978"],
            "plantName":"徐州丰县电动车产业园",
            "contacts":"科亚机电",
            "contactsTel":"17705228629",
            "plantStatus":0
        },
        "msg":null
    },
    'dynamic.do': {
        "code": "100",
        "body": {
            "genPro": {
                "genUToday": "度",
                "proTotal": 7112792.63,
                "proUToday": "元",
                "genTotal": 72443.43,
                "genUTotal": "度",
                "proToday": 59876.1,
                "genToday": 12253.126,
                "proUTotal": "元",
                "disUtoday" :"度",
                "disTotal":6845112.67,
                "disToday":84546423111.69
            }
        },
        "msg": null
    },
    'searchPlantByKeyword.do': {
        "code":100,
        "body": [{
            "addr": "四川省成都市龙泉驿区",
            "capacity": "111kw",
            "distribution": "1.2公里",
            "genToday": "524",
            "genTodayUnit": "kW",
            "name": "龙泉电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "1",
            "unit":"kW",
            "status": "",
            "type": "0",
            "plantType":1
        },{
            "addr": "四川省成都市高新区天府大道",
            "capacity": "222KW",
            "distribution": "3.6公里",
            "genToday": "147",
            "genTodayUnit": "kW",
            "name": "高新区电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "2",
            "status": "1",
            "energyStorage": "100",
            "energyStorageUnit": "kWh",
            "type": "1",
            "soc":"89%",
            "plantType":2
        },{
            "addr": "四川省成都市双流区",
            "capacity": "333KW",
            "distribution": "4.8公里",
            "genToday": "123",
            "genTodayUnit": "kW",
            "name": "双流电站",
            "pic": "/images/img_2@2x.png",
            "weatherPic":"/images/sun_1@2x.png",
            "weather":"晴天",
            "plantId": "3",
            "status": "2",
            "energyStorage": "100",
            "energyStorageUnit": "kWh",
            "phoCap":"120",
            "phoCapUnit":"kw",
            "type": "6",
            "soc":"89%",
            "plantType":3
        }
            ,{
                "addr": "四川省绵阳市三台县景福镇",
                "capacity": "444KW",
                "distribution": "300公里",
                "genToday": "444",
                "genTodayUnit": "kW",
                "name": "向阳电站",
                "pic": "/images/img_2@2x.png",
                "weatherPic":"/images/sun_1@2x.png",
                "weather":"晴天",
                "plantId": "4",
                "status": "3",
                "energyStorage": "100",
                "energyStorageUnit": "kWh",
                "type": "5",
                "phoCap":"120",
                "phoCapUnit":"kw",
                "soc":"89%",
                "plantType":3
            }
        ]

    },
    'plantInfo.do': {
        "code": "100",
        "body": [
            {
                "latitude": "34.7202921520",
                "plantId": 1,
                "type": 0,
                "longitude": "116.5657567978"
            },
            {
                "latitude": "36.7202921520",
                "plantId": 2,
                "type": 1,
                "longitude": "113.5657567978"
            }
        ],
        "msg": null
    },
    'singlePowerCurve.do': {
        "code": "100",
        "body": {
            "xData": ["06:30", "06:35", "06:40", "06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55", "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20"],
            "data": {
                "value": [
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0.01",
                    "0.01",
                    "0.01",
                    "0.04",
                    "0.04",
                    "0.11",
                    "0.09",
                    "0.08",
                    "0.09",
                    "0.14",
                    "0.2",
                    "0.2",
                    "0.24",
                    "0.24",
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                "unit": "千瓦",
                "name": "功率"
            },
            "curPower": 55615,
            "phPower" : 24512,
            "enStorage":12316,
            "maxValue": 0.24399999,
            "capacity": "70.2千瓦",
            "curData2" :"89.11",
            "curTime" :"15:55",
            "unit" :"kW",
            "yData1" : ["0", "0", "0.07", "0.28", "0.57", "0.87", "1.19", "1.64", "-2.18", "2.79", "3.26", "3.98", "4.65", "5.34", "6", "6.82", "7.65", "8.3", "9.15", "-10.25", "11.55", "12.37", "12.94", "14.14", "15.35", "15.97", "17.41", "18.88", "20", "21.36", "23.09", "25.3", "26.99", "28.83", "31.42", "32.07", "33.13", "34.87", "-37.94", "39.53", "43.87", "-43.72", "43.7", "45.03", "46.06", "43.49", "44.91", "49.17", "48.53", "48.58", "52.5", "52.09", "53.51", "51.66", "55.13", "58.24", "57.26", "60.8", "56.77", "57.7", "56.07", "61.65", "53.58", "61.88", "60.35", "58.19", "26.09", "60.94", "59.38", "64.43", "68.54", "61.82", "63.02", "66.22", "53.85", "60.04", "65.91", "60.83", "55.35", "61.72", "58.91", "55.95", "60.27", "58.05", "61.08", "59.94", "56.8", "58.15", "58.54", "55.41", "55.32", "52.03", "55.54", "51.38", "47.84", "47.67", "50.45", "47.85", "46.53", "46.95", "43.85", "42.85", "39.1", "40.9", "38.67", "36.88", "37.63", "37.34", "35.68", "34.22", "33.02", "32.16", "31.29", "29.65", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        },
        "msg": null
    }

};