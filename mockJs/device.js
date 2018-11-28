module.exports = {
    //数据采集器表格数据
    'getCollectors.do':{
        code:100,
        "body": {
            data:[
                {
                    "connTime": '2018-1-17',
                    "deviceId": 1,
                    "deviceName": '数据采集器1',
                    "modelId": 'SYN00001',
                    "orgName": '成都协能共创',
                    "plantName": '电站A',
                    "plantId": '1',
                    "sn": 'CD01000',
                    "collType":1,
                    "status": 1
                },
                {
                    "connTime": '2018-1-17',
                    "deviceId": 2,
                    "deviceName": '数据采集器2',
                    "modelId": 'SYN00002',
                    "orgName": '成都协能共创',
                    "plantName": '电站B',
                    "plantId": '2',
                    "sn": 'CD02000',
                    "collType":2,
                    "status": 0
                }
            ],
            recordsFiltered:2,
            recordsTotal:2
        },

        msg:''
    },
    'updateCollector.do':{
        code:100,
        msg:'修改成功'
    },
    'getVedioByTime.do':{
        body:[{
            startTime:"1519857363000"
        }],
        code:100,
        msg:'修改成功'
    },
    'getCameraList.do':{"code":null,"body":{"recordsFiltered":0,"data":[],"draw":"1","recordsTotal":0},"msg":null},
    'getLiveHLS.do':{
        code:100,
        body:{
            hls:'http://hls.open.ys7.com/openlive/98aab36ac122412391b64b0eebad75d4.hd.m3u8',
            rtmp:'rtmp://rtmp.open.ys7.com/openlive/98aab36ac122412391b64b0eebad75d4.hd'
        },
        msg:'修改成功'
    },
    'deleteCollectors.do':{
        code:100,
        msg:'删除成功'
    },
    'getDevicesUnderColl.do':function (param){
        var request = param.body;
        var data =[]
        if(request.id==1){//写死的id为2的是自研数采
            data = [
                {
                    "modeName": "hw_36ktl_a",
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "modeDefault": [{
                        "modeName": "hw_36ktl_a",
                        "modeId": 1
                    }, {
                        "modeName": "hw_36ktl_b",
                        "modeId": 2
                    }],
                    "deviceId": 872,
                    "deviceName": "XD001",
                    "deviceSN": "XD001",
                    "subDeviceOrder": "0",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "modeId": 1,
                    "typeId": 2
                },
                {
                    "modeName": "hw_36ktl_a",
                    "collType":2,
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "modeDefault": [{
                        "modeName": "hw_36ktl_a",
                        "modeId": 1
                    }, {
                        "modeName": "hw_36ktl_b",
                        "modeId": 2
                    }],
                    "deviceId": 873,
                    "deviceName": "XD002",
                    "deviceSN": "XD002",
                    "subDeviceOrder": "1",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "modeId": 2,
                    "typeId": 2
                }
                ]
        }else {
            data = [
                {
                    "modeName": "hw_36ktl_a",
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "serialPortDefault": [{
                        "serialPortName": "串口1",
                        "serialPortId": 1
                    }, {
                        "serialPortName": "串口2",
                        "serialPortId": 2
                    }],
                    "deviceId": 872,
                    "deviceName": "XD001",
                    "deviceSN": "XD001",
                    "subDeviceOrder": "0",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "serialPortName": "串口2",
                    "typeId": 2
                },
                {
                    "modeName": "hw_36ktl_a",
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "serialPortDefault": [{
                        "serialPortName": "串口1",
                        "serialPortId": 1
                    }, {
                        "serialPortName": "串口2",
                        "serialPortId": 2
                    }],
                    "deviceId": 872,
                    "deviceName": "XD001",
                    "deviceSN": "XD001",
                    "subDeviceOrder": "0",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "serialPortName": "串口2",
                    "typeId": 2
                },
                {
                    "modeName": "hw_36ktl_a",
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "serialPortDefault": [{
                        "serialPortName": "串口1",
                        "serialPortId": 1
                    }, {
                        "serialPortName": "串口2",
                        "serialPortId": 2
                    }],
                    "deviceId": 872,
                    "deviceName": "XD001",
                    "deviceSN": "XD001",
                    "subDeviceOrder": "0",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "serialPortName": "串口2",
                    "typeId": 2
                },
                {
                    "modeName": "hw_36ktl_a",
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "serialPortDefault": [{
                        "serialPortName": "串口1",
                        "serialPortId": 1
                    }, {
                        "serialPortName": "串口2",
                        "serialPortId": 2
                    }],
                    "deviceId": 872,
                    "deviceName": "XD001",
                    "deviceSN": "XD001",
                    "subDeviceOrder": "0",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "serialPortName": "串口2",
                    "typeId": 2
                },
                {
                    "modeName": "hw_36ktl_a",
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "serialPortDefault": [{
                        "serialPortName": "串口1",
                        "serialPortId": 1
                    }, {
                        "serialPortName": "串口2",
                        "serialPortId": 2
                    }],
                    "deviceId": 872,
                    "deviceName": "XD001",
                    "deviceSN": "XD001",
                    "subDeviceOrder": "0",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "serialPortName": "串口1",
                    "typeId": 2
                },
                {
                    "modeName": "hw_36ktl_a",
                    "collType":2,
                    "deviceDefault": [{
                        "typeName": "集中式逆变器",
                        "typeId": 1
                    }, {
                        "typeName": "组串式逆变器",
                        "typeId": 2
                    }],
                    "modelId": 4,
                    "typeName": "组串式逆变器",
                    "serialPortDefault": [{
                        "serialPortName": "串口1",
                        "serialPortId": 1
                    }, {
                        "serialPortName": "串口2",
                        "serialPortId": 2
                    }],
                    "deviceId": 873,
                    "deviceName": "XD002",
                    "deviceSN": "XD002",
                    "subDeviceOrder": "1",
                    "modelDefault": [{
                        "modelName": "华为_SUN2000-33KTL",
                        "modelId": 1
                    }, {
                        "modelName": "华为_SUN2000-50kTL",
                        "modelId": 2
                    }, {
                        "modelName": "华为_SUN2000-36kTL",
                        "modelId": 4
                    }],
                    "modelName": "SUN2000-36kTL",
                    "serialPortName": "串口1",
                    "typeId": 2
                }
            ]
        }
        return {
            code:100,
            body:{
                data:data,
                maxLength:5,
                "recordsFiltered": 2,
                "draw": "null",
                "recordsTotal": 2
            },
            msg:""
        }
    },
    "getDeviceChoiceTree.do":function (param) {
        var request = param.body;
        var data =[]
        if(request.requestType==0){
            data=[
                {
                    "typeName":"集中式逆变器",
                    "typeId":1
                },
                {
                    "typeName":"组串式逆变器",
                    "typeId":2
                }
                ]
        }else if(request.requestType==1){
            data=[
                {
                    "modelId":1,
                    "model":"华为_ASP-40KTLC"
                },
                {
                    "modelId":2,
                    "model":"测试_ASP-40KTLC"
                },
                {
                    "modelId":3,
                    "model":"测试2_ASP-40KTLC"
                },
                ]
        }else {
            data = [
                {
                    "modeName":"hw_36ktl_a",
                    "modeId":1
                },
                {
                    "modeName":"hw_36ktl_b",
                    "modeId":2
                },
                {
                    "modeName":"hw_36ktl_c",
                    "modeId":3
                }
            ]
        }
        return {
            code:'100',
            body:{
                "data":data
            },
            msg:'查询成功'
        }
    },
    'addCollector.do':{
        code:100,
        msg:'成功'
    },
    'getAllDeviceType.do':{
        code:100,
        body:{
            data:[{
                topModelId:1,
                topModelName:'逆变器1'
            },{
                id:2,
                typeName:'逆变器2'
            },
                {
                    id:3,
                    typeName:'逆变器3'
                }
            ]
        }
    },
    'getInverterList.do':{
        "code": "100",
        "body": {
            "recordsFiltered": 804,
            "data": [{
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 29,
                "connTime": "2018-03-07",
                "deviceId": 873,
                "deviceName": "XD002",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "XD002",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "搜狗电站",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 29,
                "connTime": "2018-03-07",
                "deviceId": 872,
                "deviceName": "XD001",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "XD001",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "搜狗电站",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 27,
                "connTime": "2018-03-07",
                "deviceId": 869,
                "deviceName": "ces",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "xc001",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "卓越",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "南京合桥",
                "modelId": 4,
                "plantId": 1,
                "connTime": "2018-02-26",
                "deviceId": 854,
                "deviceName": "lms1046",
                "orgId": 3,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "lms2261046",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "徐州丰县电动车产业园",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 13,
                "connTime": "2018-01-15",
                "deviceId": 849,
                "deviceName": "36KTL-test2",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "GWAETGWASGE787test",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "未分配",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 13,
                "connTime": "2018-01-15",
                "deviceId": 848,
                "deviceName": "36KTL-test1",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "GWAETGWASGE786test",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "未分配",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 10,
                "connTime": "2018-01-15",
                "deviceId": 846,
                "deviceName": "36KTL-797",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "GWAETGWASGE795",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "长葛市众品工业园电站",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 10,
                "connTime": "2018-01-15",
                "deviceId": 845,
                "deviceName": "36KTL-796",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "GWAETGWASGE794",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "长葛市众品工业园电站",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 10,
                "connTime": "2018-01-15",
                "deviceId": 844,
                "deviceName": "36KTL-795",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "GWAETGWASGE793",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "长葛市众品工业园电站",
                "status": "1"
            }, {
                "deviceType": "组串式逆变器",
                "orgName": "协能共创",
                "modelId": 4,
                "plantId": 10,
                "connTime": "2018-01-15",
                "deviceId": 843,
                "deviceName": "36KTL-794",
                "orgId": 1,
                "manufacturer": "华为",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "sn": "GWAETGWASGE792",
                "power": "36KW",
                "maxRoute": 8,
                "plantName": "长葛市众品工业园电站",
                "status": "1"
            }],
            "draw": "1",
            "recordsTotal": 10
        },
        "msg": "查询成功"
    },
    'updateCollAndSubDev.do':{
        "code":"100",
        "body":[],
        "msg":""
    },
    'getCameraList.do':{
        code:100,
        body:{
            "data": [
                {
                    "cameraId": "111",
                    "cameraModel": "xs53",
                    "cameraName": "摄像头",
                    "cameraSN": "xf1345",
                    "manufacture": "摄像头厂商",
                    "orgName": "江苏太阳能公司",
                    "plantName": "某个电站",
                    "plantId":"1",
                    "orgId":"2",
                    'status|1': [1,0,2],
                },
                {
                    "cameraId": "111",
                    "cameraModel": "xs53",
                    "cameraName": "摄像头",
                    "cameraSN": "xf1345",
                    "manufacture": "摄像头厂商",
                    "orgName": "江苏太阳能公司",
                    "plantName": "某个电站",
                    "plantId":"3",
                    "orgId":"4",
                    'status|1': [1,0,2],
                },
                {
                    "cameraId": "111",
                    "cameraModel": "xs53",
                    "cameraName": "摄像头",
                    "cameraSN": "xf1345",
                    "manufacture": "摄像头厂商",
                    "orgName": "江苏太阳能公司",
                    "plantName": "某个电站",
                    "plantId":"5",
                    "orgId":"6",
                    'status|1': [1,0,2],
                },
                {
                    "cameraId": "111",
                    "cameraModel": "xs53",
                    "cameraName": "摄像头",
                    "cameraSN": "xf1345",
                    "manufacture": "摄像头厂商",
                    "orgName": "江苏太阳能公司",
                    "plantName": "某个电站",
                    "plantId":"7",
                    "orgId":"8",
                    'status|1': [1,0,2],
                },
                {
                    "cameraId": "111",
                    "cameraModel": "xs53",
                    "cameraName": "摄像头",
                    "cameraSN": "xf1345",
                    "manufacture": "摄像头厂商",
                    "orgName": "江苏太阳能公司",
                    "plantName": "某个电站",
                    "plantId":"9",
                    "orgId":"10",
                    'status|1': [1,0,2],
                },
            ],
            recordsFiltered:2,
            recordsTotal:2
        }
    },
    //遥控列表
    'getYKList.do':{
        "code": "100",
        "body": {
            "recordsFiltered": 35,
            "data": [{
                "signName": "开机",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 1,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "关机",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 1,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "MPPT多峰扫描",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 0,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "MPPT多峰扫描",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 1,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "限功率0%关机",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 0,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "限功率0%关机",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 1,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "远程功率调度",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 0,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "远程功率调度",
                "realType": "遥控",
                "dataGain": "--",
                "statusValue": 1,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "无功功率补偿方式",
                "realType": "摇调",
                "dataGain": 1.0,
                "statusValue": 0,
                "maxValue": "--",
                "mixValue": "--"
            }, {
                "signName": "有功功率控制方式",
                "realType": "摇调",
                "dataGain": 1.0,
                "statusValue": 0,
                "maxValue": "--",
                "mixValue": "--"
            }],
            "draw": "4",
            "recordsTotal": 35
        },
        "msg": "查询成功"
    },
    //遥测
    'getYCList.do':{
        "code": "100",
        "body": {
            "recordsFiltered": 33,
            "data": [{
                "unit": "V",
                "vueGroup": "2",
                "signName": "PV1 输入电压",
                "dataGain": 0.1,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV1输入电压"
            }, {
                "unit": "V",
                "vueGroup": "2",
                "signName": "PV2 输入电压",
                "dataGain": 0.1,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV2输入电压"
            }, {
                "unit": "V",
                "vueGroup": "2",
                "signName": "PV3 输入电压",
                "dataGain": 0.1,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV3输入电压"
            }, {
                "unit": "V",
                "vueGroup": "2",
                "signName": "PV4 输入电压",
                "dataGain": 0.1,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV4输入电压"
            }, {
                "unit": "V",
                "vueGroup": "2",
                "signName": "PV5 输入电压",
                "dataGain": 0.1,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV5输入电压"
            }, {
                "unit": "V",
                "vueGroup": "2",
                "signName": "PV6 输入电压",
                "dataGain": 0.1,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV6输入电压"
            }, {
                "unit": "A",
                "vueGroup": "2",
                "signName": "PV1 输入电流",
                "dataGain": 0.01,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV1输入电流"
            }, {
                "unit": "A",
                "vueGroup": "2",
                "signName": "PV2 输入电流",
                "dataGain": 0.01,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV2输入电流"
            }, {
                "unit": "A",
                "vueGroup": "2",
                "signName": "PV3 输入电流",
                "dataGain": 0.01,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV3输入电流"
            }, {
                "unit": "A",
                "vueGroup": "2",
                "signName": "PV4 输入电流",
                "dataGain": 0.01,
                "maxValue": "--",
                "mixValue": "--",
                "specialProcess": "N/A",
                "correctionFactor": "--",
                "imName": "PV4输入电流"
            }],
            "draw": "2",
            "recordsTotal": 33
        },
        "msg": "查询成功"
    },
    'getYXList.do':{
        "code": null,
        "body": {
            "recordsFiltered": 114,
            "data": [{
                "alarmBitLength": 1,
                "signalName": "软件版本不匹配",
                "visibility": "否",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "次要",
                "alarmReason": "1"
            }, {
                "alarmBitLength": 1,
                "signalName": "升级失败",
                "visibility": "是",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "重要",
                "alarmReason": "1"
            }, {
                "alarmBitLength": 1,
                "signalName": "Flash故障",
                "visibility": "是",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "次要",
                "alarmReason": "1"
            }, {
                "alarmBitLength": 1,
                "signalName": "软件版本不匹配",
                "visibility": "否",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "次要",
                "alarmReason": "2"
            }, {
                "alarmBitLength": 1,
                "signalName": "软件版本不匹配",
                "visibility": "否",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "次要",
                "alarmReason": "3"
            }, {
                "alarmBitLength": 1,
                "signalName": "系统故障",
                "visibility": "否",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "重要",
                "alarmReason": "1"
            }, {
                "alarmBitLength": 1,
                "signalName": "系统故障",
                "visibility": "否",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "重要",
                "alarmReason": "27"
            }, {
                "alarmBitLength": 1,
                "signalName": "逆变电路异常",
                "visibility": "是",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "重要",
                "alarmReason": "20"
            }, {
                "alarmBitLength": 1,
                "signalName": "残余电流异常",
                "visibility": "是",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "重要",
                "alarmReason": "1"
            }, {
                "alarmBitLength": 1,
                "signalName": "温度过高",
                "visibility": "是",
                "statusValue": 1,
                "faultPoint": "--",
                "suggest": "--",
                "push": "--",
                "ycAlarm": "否",
                "alarmType": "告警",
                "startBit": "--",
                "statusName": "发生",
                "alarmLevel": "重要",
                "alarmReason": "1"
            }],
            "draw": "3",
            "recordsTotal": 114
        },
        "msg": null
    },
    'moduleSearch.do':{
        code:100,
        body:{
            data:[
                {
                    "DCpower": "测试内容s59b",
                    "count": 41162,
                    "manufacturer": "测试内容5v05",
                    "moduleNum": "测试内容lq6e",
                    "modulePower": 55022,
                    "moduleType": "测试内容4lr3"
                },
                {
                    "DCpower": "测试内容s59b",
                    "count": 41162,
                    "manufacturer": "测试内容5v05",
                    "moduleNum": "测试内容lq6e",
                    "modulePower": 55022,
                    "moduleType": "测试内容4lr3"
                },
                {
                    "DCpower": "测试内容s59b",
                    "count": 41162,
                    "manufacturer": "测试内容5v05",
                    "moduleNum": "测试内容lq6e",
                    "modulePower": 55022,
                    "moduleType": "测试内容4lr3"
                },
                {
                    "DCpower": "测试内容s59b",
                    "count": 41162,
                    "manufacturer": "测试内容5v05",
                    "moduleNum": "测试内容lq6e",
                    "modulePower": 55022,
                    "moduleType": "测试内容4lr3"
                }
            ]
        }

    },
    'getModuleInfo.do':{
        "code": "100",
        "body": {
            "recordsFiltered": 6,
            "data": [{
                "pvName": "pv1",
                "moduleType": "多晶",
                "pvId": 1,
                "moduleNum": "协鑫_GCL-P6/60 270 ",
                "count": 20.0,
                "modulePower": 270.0,
                "moduleId": 40,
                "DCpower": 5.4,
                "deviceId": 1,
                "manufacturer": "协鑫"
            }, {
                "pvName": "pv2",
                "moduleType": "多晶",
                "pvId": 2,
                "moduleNum": "协鑫_GCL-P6/60 270 ",
                "count": 20.0,
                "modulePower": 270.0,
                "moduleId": 40,
                "DCpower": 5.4,
                "deviceId": 1,
                "manufacturer": "协鑫"
            }, {
                "pvName": "pv3",
                "moduleType": "多晶",
                "pvId": 3,
                "moduleNum": "协鑫_GCL-P6/60 270 ",
                "count": 20.0,
                "modulePower": 270.0,
                "moduleId": 40,
                "DCpower": 5.4,
                "deviceId": 1,
                "manufacturer": "协鑫"
            }, {
                "pvName": "pv4",
                "moduleType": "多晶",
                "pvId": 4,
                "moduleNum": "协鑫_GCL-P6/60 270 ",
                "count": 20.0,
                "modulePower": 270.0,
                "moduleId": 40,
                "DCpower": 5.4,
                "deviceId": 1,
                "manufacturer": "协鑫"
            }, {
                "pvName": "pv5",
                "moduleType": "多晶",
                "pvId": 5,
                "moduleNum": "协鑫_GCL-P6/60 270 ",
                "count": 20.0,
                "modulePower": 270.0,
                "moduleId": 40,
                "DCpower": 5.4,
                "deviceId": 1,
                "manufacturer": "协鑫"
            }, {
                "pvName": "pv6",
                "moduleType": "多晶",
                "pvId": 6,
                "moduleNum": "协鑫_GCL-P6/60 270 ",
                "count": 20.0,
                "modulePower": 270.0,
                "moduleId": 40,
                "DCpower": 5.4,
                "deviceId": 1,
                "manufacturer": "协鑫"
            }],
            "draw": "null",
            "recordsTotal": 6,
            "realCount": 6
        },
        "msg": null
    },
    'plantIdofOrg4Camera.do':{
        code:100,
        body:{
            data:[
                {
                    plantId:"123",
                    plantName:"A电站"
                },
                {
                    plantId:"456",
                    plantName:"B电站"
                },
                {
                    plantId:"789",
                    plantName:"C电站"
                }
            ]
        }
    },
    'getCaModelList.do':{
        body:{
            data: [
                {modelName: "海康_DTSD718_128G", modelId: 1},
                {modelName: "海康_DTSD341-MC3_128G", modelId: 2},
                {modelName: "海康_DTSD188S_128G", modelId: 3},
                {modelName: "海康_DDS720_128G", modelId: 4},
            ]
        },
        code:"100",
        msg:"查询成功",
    },
    //设备信号标识
    'getInverterModelForChoice.do':{
        "code": "100",
        "body": {
            "recordsFiltered": 3,
            "data": [{
                "deviceType": "组串式逆变器",
                "efficace": "0.986",
                "mttpRoute": 3,
                "modelId": 1,
                "deviceIdentity": "华为_SUN2000-33KTL",
                "model": "SUN2000-33KTL",
                "typeId": 2,
                "connTime": "2018-03-07",
                "power": "33",
                "maxRoute": 6,
                "manufacturer": "华为"
            }, {
                "deviceType": "组串式逆变器",
                "efficace": "0.99",
                "mttpRoute": 4,
                "modelId": 2,
                "deviceIdentity": "华为_SUN2000-50kTL",
                "model": "SUN2000-50kTL",
                "typeId": 2,
                "connTime": "2018-03-07",
                "power": "50KW",
                "maxRoute": 8,
                "manufacturer": "华为"
            }, {
                "deviceType": "组串式逆变器",
                "efficace": "0.9885",
                "mttpRoute": 4,
                "modelId": 4,
                "deviceIdentity": "华为_SUN2000-36kTL",
                "model": "SUN2000-36kTL",
                "typeId": 2,
                "connTime": "2018-03-07",
                "power": "36KW",
                "maxRoute": 8,
                "manufacturer": "华为"
            }],
            "draw": "6",
            "recordsTotal": 3
        },
        "msg": "查询成功"
    },
    //组串信号标识
    'getModuleInfoforChoice.do':{
        "code":"100",
        "body":{
            "recordsFiltered":0,"data":[],"draw":"5","recordsTotal":0
        },
        "msg":null
    },
    'plantIdofOrg4Device.do':{
        "code": "100",
        "body": {
            "data": [{
                "plantId": 1,
                "plantName": "徐州丰县电动车产业园"
            }, {
                "plantId": 2,
                "plantName": "岭背塘电站"
            }, {
                "plantId": 3,
                "plantName": "云石山乡电站"
            }, {
                "plantId": 4,
                "plantName": "湾潭快递产业园"
            }, {
                "plantId": 5,
                "plantName": "壬田镇中潭村电站"
            }, {
                "plantId": 6,
                "plantName": "海宁市鑫旺五金厂电站"
            }, {
                "plantId": 7,
                "plantName": "山东省枣庄市峄城电站"
            }, {
                "plantId": 8,
                "plantName": "石家庄南寨电站"
            }, {
                "plantId": 9,
                "plantName": "贾庄工业园电站"
            }, {
                "plantId": 10,
                "plantName": "长葛市众品工业园电站"
            }, {
                "plantId": 31,
                "plantName": "测试电站"
            }, {
                "plantId": 33,
                "plantName": "光伏能源电站"
            }, {
                "plantId": 34,
                "plantName": "测试电站林"
            }, {
                "plantId": 35,
                "plantName": "邻家电站测试"
            }]
        },
        "msg": "查询成功"
    },
    'getAllCollNames.do':{"code":"100","body":{"data":[{"topModelId":1,"topModelName":"SYN-005"},{"topModelId":2,"topModelName":"SYN-010"},{"topModelId":3,"topModelName":"SYN-TEST"}]},"msg":"查询成功"}
};