define( [ '../plugins/mock-min'], function (Mock) {
var errorData = {"success": false,"data": null,"failCode": 404,"params": null,"message": "没有找到此文件"};
Mock.mock("/alarm/alarmList.do",{"code":100,"body":{"attentionCount":"800","monthCount":"678","recoveryCount":"312","todayCount":"159","recordsTotal":800,"recordsFiltered":800,"data|12":[{"alarmLevel|1":["重要","提示","次要"],"changeTime":"1509608652011","deviceId|+1":1,"id|+1":1,"unionId|+1":1,"deviceName":"@first","deviceType|1":["0","1","2","3","5"],"signalGuid":"@first","signalName":"@first","status|1":["0","1"]}]},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/alarm/alarmLine.do",{"code":100,"body":{"attention|1":[0,1],"currStatus|1":[0,1],"deviceId|+1":1,"deviceName":"@first","changeTime":"05:25","maxVal":1500,"location":[31.0774899654,106.5519332886],"plantId":111411,"singlePlantType|1":[1,2,3],"plantName":"河堰电站","power":{"xData":["00:00","00:05","00:10","00:15","00:20","00:25","00:30","00:35","00:40","00:45","00:50","00:55","01:00","01:05","01:10","01:15","01:20","01:25","01:30","01:35","01:40","01:45","01:50","01:55","02:00","02:05","02:10","02:15","02:20","02:25","02:30","02:35","02:40","02:45","02:50","02:55","03:00","03:05","03:10","03:15","03:20","03:25","03:30","03:35","03:40","03:45","03:50","03:55","04:00","04:05","04:10","04:15","04:20","04:25","04:30","04:35","04:40","04:45","04:50","04:55","05:00","05:05","05:10","05:15","05:20","05:25","05:30","05:35","05:40","05:45","05:50","05:55","06:00","06:05","06:10","06:15","06:20","06:25","06:30","06:35","06:40","06:45","06:50","06:55","07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","08:55","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:20","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:25","23:30","23:35","23:40","23:45","23:50","23:55"],"yData":[{"name":"有功功率","unit":"kW","value":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1000","1200","1200","1300","1400","1500","1500","1500","1500","1500","1000","1000","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0.00","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]},{"name":"无功功率","unit":"kW","value":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1200","1000","1000","1000","1000","1000","0","0","0","1000","1000","1000","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0.00","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]}]}},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/alarm/alarmAttention.do",{"code":100,"msg":"执行成功！"});
Mock.mock("/alarm/getAlertorOrder.do",{"code":100,"body":[{"name":"1-1","value":"01050000f00089CA"},{"name":"1-0","value":"010500000000CDCA"},{"name":"2-1","value":"01050003f00079CA"},{"name":"2-0","value":"0105000300003DCA"}],"msg":""});
Mock.mock("/alarm/getalarmLight.do",{"code":100,"body":{"light":0,"ring":1,"serial":"COM4"},"msg":""});
Mock.mock("/alarm/setalarmLight.do",{"code":100,"msg":"设置成功！"});
Mock.mock("/alarm/getConfirmAlarm.do",{"code":100,"msg":"确认成功！"});
Mock.mock("/alarm/getAlarmData.do",{"code":100,"body":{"isAlarm":1},"msg":"设置成功！"});
Mock.mock("/alarmwx/clearFollow.do",{"body":"取消关注成功","code":100,"msg":"0.0177"});
Mock.mock("/alarmwx/followEvent.do",{"body":"","code":100,"msg":"成功"});
Mock.mock("/alarmwx/getAlarm.do",{"code":"100","body":{"row":[{"date":"2018-03-21","data":[{"changeTime":1521670800000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1并网","alarmLevel":"2","id":"1_36ktl_a_YC_50_0","deviceId":1,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:20","status":"1"},{"changeTime":1521670800000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1非闭锁","alarmLevel":"2","id":"1_36ktl_a_YC_51_0","deviceId":1,"signalGuid":"36ktl_a_YC_51_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:20","status":"1"},{"changeTime":1521670800000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1逆变并网","alarmLevel":"2","id":"1_36ktl_a_YC_55_0","deviceId":1,"signalGuid":"36ktl_a_YC_55_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:20","status":"1"},{"changeTime":1521670800000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2并网","alarmLevel":"2","id":"2_36ktl_a_YC_50_0","deviceId":2,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:20","status":"1"},{"changeTime":1521670800000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2非闭锁","alarmLevel":"2","id":"2_36ktl_a_YC_51_0","deviceId":2,"signalGuid":"36ktl_a_YC_51_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:20","status":"1"},{"changeTime":1521670800000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2逆变并网","alarmLevel":"2","id":"2_36ktl_a_YC_55_0","deviceId":2,"signalGuid":"36ktl_a_YC_55_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:20","status":"1"},{"changeTime":1521670200000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1待机：光照检测","alarmLevel":"2","id":"1_36ktl_a_YC_50_0","deviceId":1,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:10","status":"1"},{"changeTime":1521670200000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2待机：光照检测","alarmLevel":"2","id":"2_36ktl_a_YC_50_0","deviceId":2,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"06:10","status":"1"}]},{"date":"2018-03-22","data":[{"changeTime":1521629100000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1待机：无光照","alarmLevel":"2","id":"1_36ktl_a_YC_50_0","deviceId":1,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:45","status":"1"},{"changeTime":1521629100000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2待机：无光照","alarmLevel":"2","id":"2_36ktl_a_YC_50_0","deviceId":2,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:45","status":"1"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1待机：光照检测","alarmLevel":"2","id":"1_36ktl_a_YC_50_0","deviceId":1,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"1"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1闭锁","alarmLevel":"2","id":"1_36ktl_a_YC_51_0","deviceId":1,"signalGuid":"36ktl_a_YC_51_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"0"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1逆变离网","alarmLevel":"2","id":"1_36ktl_a_YC_55_0","deviceId":1,"signalGuid":"36ktl_a_YC_55_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"0"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2待机：光照检测","alarmLevel":"2","id":"2_36ktl_a_YC_50_0","deviceId":2,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"1"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2闭锁","alarmLevel":"2","id":"2_36ktl_a_YC_51_0","deviceId":2,"signalGuid":"36ktl_a_YC_51_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"0"}]},{"date":"2018-03-23","data":[{"changeTime":1521629100000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1待机：无光照","alarmLevel":"2","id":"1_36ktl_a_YC_50_0","deviceId":1,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:45","status":"1"},{"changeTime":1521629100000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2待机：无光照","alarmLevel":"2","id":"2_36ktl_a_YC_50_0","deviceId":2,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:45","status":"1"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1待机：光照检测","alarmLevel":"2","id":"1_36ktl_a_YC_50_0","deviceId":1,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"1"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1闭锁","alarmLevel":"2","id":"1_36ktl_a_YC_51_0","deviceId":1,"signalGuid":"36ktl_a_YC_51_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"0"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-1逆变离网","alarmLevel":"2","id":"1_36ktl_a_YC_55_0","deviceId":1,"signalGuid":"36ktl_a_YC_55_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"0"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2待机：光照检测","alarmLevel":"2","id":"2_36ktl_a_YC_50_0","deviceId":2,"signalGuid":"36ktl_a_YC_50_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"1"},{"changeTime":1521628500000,"deviceType":2,"plant_id":1,"signalName":"36KTL-2闭锁","alarmLevel":"2","id":"2_36ktl_a_YC_51_0","deviceId":2,"signalGuid":"36ktl_a_YC_51_0","plantName":"徐州丰县电动车产业园","changeTimeLabel":"18:35","status":"0"}]}],"countList":[{"count":959,"alarmLevel":"2"},{"count":"0","alarmLevel":"0"},{"count":"0","alarmLevel":"1"}]},"msg":null});
Mock.mock("/alarmwx/searchPlant.do",{"body":[{"plantId":"1","plantName":"环球中心电站"},{"plantId":"2","plantName":"孵化园中心电站"},{"plantId":"3","plantName":"维诺中心电站"},{"plantId":"4","plantName":"米亚罗中心电站"},{"plantId":"5","plantName":"茶马电站"},{"plantId":"2","plantName":"鼓捣电站"}],"code":100,"msg":"0.0177"});
Mock.mock("/alarmwx/detail.do",{"body":{"signalName":"V2组串6功率输出异常","deviceName":"123逆变器","plantName":"环球中心电站","changeTime":"2017-2-3","plantId":"1","deviceId":"1","id":"1","attention":1,"plantType":2,"alarm_level":0},"code":100,"msg":"0.0177"});
Mock.mock("/device/getCollectors.do",{"code":100,"body":{"data":[{"connTime":"2018-1-17","deviceId":1,"deviceName":"数据采集器1","modelId":"SYN00001","orgName":"成都协能共创","plantName":"电站A","plantId":"1","sn":"CD01000","collType":1,"status":1},{"connTime":"2018-1-17","deviceId":2,"deviceName":"数据采集器2","modelId":"SYN00002","orgName":"成都协能共创","plantName":"电站B","plantId":"2","sn":"CD02000","collType":2,"status":0}],"recordsFiltered":2,"recordsTotal":2},"msg":""});
Mock.mock("/device/updateCollector.do",{"code":100,"msg":"修改成功"});
Mock.mock("/device/getVedioByTime.do",{"body":[{"startTime":"1519857363000"}],"code":100,"msg":"修改成功"});
Mock.mock("/device/getCameraList.do",{"code":100,"body":{"data":[{"cameraId":"111","cameraModel":"xs53","cameraName":"摄像头","cameraSN":"xf1345","manufacture":"摄像头厂商","orgName":"江苏太阳能公司","plantName":"某个电站","plantId":"1","orgId":"2","status|1":[1,0,2]},{"cameraId":"111","cameraModel":"xs53","cameraName":"摄像头","cameraSN":"xf1345","manufacture":"摄像头厂商","orgName":"江苏太阳能公司","plantName":"某个电站","plantId":"3","orgId":"4","status|1":[1,0,2]},{"cameraId":"111","cameraModel":"xs53","cameraName":"摄像头","cameraSN":"xf1345","manufacture":"摄像头厂商","orgName":"江苏太阳能公司","plantName":"某个电站","plantId":"5","orgId":"6","status|1":[1,0,2]},{"cameraId":"111","cameraModel":"xs53","cameraName":"摄像头","cameraSN":"xf1345","manufacture":"摄像头厂商","orgName":"江苏太阳能公司","plantName":"某个电站","plantId":"7","orgId":"8","status|1":[1,0,2]},{"cameraId":"111","cameraModel":"xs53","cameraName":"摄像头","cameraSN":"xf1345","manufacture":"摄像头厂商","orgName":"江苏太阳能公司","plantName":"某个电站","plantId":"9","orgId":"10","status|1":[1,0,2]}],"recordsFiltered":2,"recordsTotal":2}});
Mock.mock("/device/getLiveHLS.do",{"code":100,"body":{"hls":"http://hls.open.ys7.com/openlive/98aab36ac122412391b64b0eebad75d4.hd.m3u8","rtmp":"rtmp://rtmp.open.ys7.com/openlive/98aab36ac122412391b64b0eebad75d4.hd"},"msg":"修改成功"});
Mock.mock("/device/deleteCollectors.do",{"code":100,"msg":"删除成功"});
Mock.mock("/device/getDevicesUnderColl.do",function (param){
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
    });
Mock.mock("/device/getDeviceChoiceTree.do",function (param) {
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
    });
Mock.mock("/device/addCollector.do",{"code":100,"msg":"成功"});
Mock.mock("/device/getAllDeviceType.do",{"code":100,"body":{"data":[{"topModelId":1,"topModelName":"逆变器1"},{"id":2,"typeName":"逆变器2"},{"id":3,"typeName":"逆变器3"}]}});
Mock.mock("/device/getInverterList.do",{"code":"100","body":{"recordsFiltered":804,"data":[{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":29,"connTime":"2018-03-07","deviceId":873,"deviceName":"XD002","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"XD002","power":"36KW","maxRoute":8,"plantName":"搜狗电站","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":29,"connTime":"2018-03-07","deviceId":872,"deviceName":"XD001","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"XD001","power":"36KW","maxRoute":8,"plantName":"搜狗电站","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":27,"connTime":"2018-03-07","deviceId":869,"deviceName":"ces","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"xc001","power":"36KW","maxRoute":8,"plantName":"卓越","status":"1"},{"deviceType":"组串式逆变器","orgName":"南京合桥","modelId":4,"plantId":1,"connTime":"2018-02-26","deviceId":854,"deviceName":"lms1046","orgId":3,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"lms2261046","power":"36KW","maxRoute":8,"plantName":"徐州丰县电动车产业园","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":13,"connTime":"2018-01-15","deviceId":849,"deviceName":"36KTL-test2","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"GWAETGWASGE787test","power":"36KW","maxRoute":8,"plantName":"未分配","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":13,"connTime":"2018-01-15","deviceId":848,"deviceName":"36KTL-test1","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"GWAETGWASGE786test","power":"36KW","maxRoute":8,"plantName":"未分配","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":10,"connTime":"2018-01-15","deviceId":846,"deviceName":"36KTL-797","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"GWAETGWASGE795","power":"36KW","maxRoute":8,"plantName":"长葛市众品工业园电站","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":10,"connTime":"2018-01-15","deviceId":845,"deviceName":"36KTL-796","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"GWAETGWASGE794","power":"36KW","maxRoute":8,"plantName":"长葛市众品工业园电站","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":10,"connTime":"2018-01-15","deviceId":844,"deviceName":"36KTL-795","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"GWAETGWASGE793","power":"36KW","maxRoute":8,"plantName":"长葛市众品工业园电站","status":"1"},{"deviceType":"组串式逆变器","orgName":"协能共创","modelId":4,"plantId":10,"connTime":"2018-01-15","deviceId":843,"deviceName":"36KTL-794","orgId":1,"manufacturer":"华为","efficace":"0.9885","mttpRoute":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"sn":"GWAETGWASGE792","power":"36KW","maxRoute":8,"plantName":"长葛市众品工业园电站","status":"1"}],"draw":"1","recordsTotal":10},"msg":"查询成功"});
Mock.mock("/device/updateCollAndSubDev.do",{"code":"100","body":[],"msg":""});
Mock.mock("/device/getYKList.do",{"code":"100","body":{"recordsFiltered":35,"data":[{"signName":"开机","realType":"遥控","dataGain":"--","statusValue":1,"maxValue":"--","mixValue":"--"},{"signName":"关机","realType":"遥控","dataGain":"--","statusValue":1,"maxValue":"--","mixValue":"--"},{"signName":"MPPT多峰扫描","realType":"遥控","dataGain":"--","statusValue":0,"maxValue":"--","mixValue":"--"},{"signName":"MPPT多峰扫描","realType":"遥控","dataGain":"--","statusValue":1,"maxValue":"--","mixValue":"--"},{"signName":"限功率0%关机","realType":"遥控","dataGain":"--","statusValue":0,"maxValue":"--","mixValue":"--"},{"signName":"限功率0%关机","realType":"遥控","dataGain":"--","statusValue":1,"maxValue":"--","mixValue":"--"},{"signName":"远程功率调度","realType":"遥控","dataGain":"--","statusValue":0,"maxValue":"--","mixValue":"--"},{"signName":"远程功率调度","realType":"遥控","dataGain":"--","statusValue":1,"maxValue":"--","mixValue":"--"},{"signName":"无功功率补偿方式","realType":"摇调","dataGain":1,"statusValue":0,"maxValue":"--","mixValue":"--"},{"signName":"有功功率控制方式","realType":"摇调","dataGain":1,"statusValue":0,"maxValue":"--","mixValue":"--"}],"draw":"4","recordsTotal":35},"msg":"查询成功"});
Mock.mock("/device/getYCList.do",{"code":"100","body":{"recordsFiltered":33,"data":[{"unit":"V","vueGroup":"2","signName":"PV1 输入电压","dataGain":0.1,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV1输入电压"},{"unit":"V","vueGroup":"2","signName":"PV2 输入电压","dataGain":0.1,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV2输入电压"},{"unit":"V","vueGroup":"2","signName":"PV3 输入电压","dataGain":0.1,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV3输入电压"},{"unit":"V","vueGroup":"2","signName":"PV4 输入电压","dataGain":0.1,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV4输入电压"},{"unit":"V","vueGroup":"2","signName":"PV5 输入电压","dataGain":0.1,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV5输入电压"},{"unit":"V","vueGroup":"2","signName":"PV6 输入电压","dataGain":0.1,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV6输入电压"},{"unit":"A","vueGroup":"2","signName":"PV1 输入电流","dataGain":0.01,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV1输入电流"},{"unit":"A","vueGroup":"2","signName":"PV2 输入电流","dataGain":0.01,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV2输入电流"},{"unit":"A","vueGroup":"2","signName":"PV3 输入电流","dataGain":0.01,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV3输入电流"},{"unit":"A","vueGroup":"2","signName":"PV4 输入电流","dataGain":0.01,"maxValue":"--","mixValue":"--","specialProcess":"N/A","correctionFactor":"--","imName":"PV4输入电流"}],"draw":"2","recordsTotal":33},"msg":"查询成功"});
Mock.mock("/device/getYXList.do",{"code":null,"body":{"recordsFiltered":114,"data":[{"alarmBitLength":1,"signalName":"软件版本不匹配","visibility":"否","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"次要","alarmReason":"1"},{"alarmBitLength":1,"signalName":"升级失败","visibility":"是","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"重要","alarmReason":"1"},{"alarmBitLength":1,"signalName":"Flash故障","visibility":"是","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"次要","alarmReason":"1"},{"alarmBitLength":1,"signalName":"软件版本不匹配","visibility":"否","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"次要","alarmReason":"2"},{"alarmBitLength":1,"signalName":"软件版本不匹配","visibility":"否","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"次要","alarmReason":"3"},{"alarmBitLength":1,"signalName":"系统故障","visibility":"否","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"重要","alarmReason":"1"},{"alarmBitLength":1,"signalName":"系统故障","visibility":"否","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"重要","alarmReason":"27"},{"alarmBitLength":1,"signalName":"逆变电路异常","visibility":"是","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"重要","alarmReason":"20"},{"alarmBitLength":1,"signalName":"残余电流异常","visibility":"是","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"重要","alarmReason":"1"},{"alarmBitLength":1,"signalName":"温度过高","visibility":"是","statusValue":1,"faultPoint":"--","suggest":"--","push":"--","ycAlarm":"否","alarmType":"告警","startBit":"--","statusName":"发生","alarmLevel":"重要","alarmReason":"1"}],"draw":"3","recordsTotal":114},"msg":null});
Mock.mock("/device/moduleSearch.do",{"code":100,"body":{"data":[{"DCpower":"测试内容s59b","count":41162,"manufacturer":"测试内容5v05","moduleNum":"测试内容lq6e","modulePower":55022,"moduleType":"测试内容4lr3"},{"DCpower":"测试内容s59b","count":41162,"manufacturer":"测试内容5v05","moduleNum":"测试内容lq6e","modulePower":55022,"moduleType":"测试内容4lr3"},{"DCpower":"测试内容s59b","count":41162,"manufacturer":"测试内容5v05","moduleNum":"测试内容lq6e","modulePower":55022,"moduleType":"测试内容4lr3"},{"DCpower":"测试内容s59b","count":41162,"manufacturer":"测试内容5v05","moduleNum":"测试内容lq6e","modulePower":55022,"moduleType":"测试内容4lr3"}]}});
Mock.mock("/device/getModuleInfo.do",{"code":"100","body":{"recordsFiltered":6,"data":[{"pvName":"pv1","moduleType":"多晶","pvId":1,"moduleNum":"协鑫_GCL-P6/60 270 ","count":20,"modulePower":270,"moduleId":40,"DCpower":5.4,"deviceId":1,"manufacturer":"协鑫"},{"pvName":"pv2","moduleType":"多晶","pvId":2,"moduleNum":"协鑫_GCL-P6/60 270 ","count":20,"modulePower":270,"moduleId":40,"DCpower":5.4,"deviceId":1,"manufacturer":"协鑫"},{"pvName":"pv3","moduleType":"多晶","pvId":3,"moduleNum":"协鑫_GCL-P6/60 270 ","count":20,"modulePower":270,"moduleId":40,"DCpower":5.4,"deviceId":1,"manufacturer":"协鑫"},{"pvName":"pv4","moduleType":"多晶","pvId":4,"moduleNum":"协鑫_GCL-P6/60 270 ","count":20,"modulePower":270,"moduleId":40,"DCpower":5.4,"deviceId":1,"manufacturer":"协鑫"},{"pvName":"pv5","moduleType":"多晶","pvId":5,"moduleNum":"协鑫_GCL-P6/60 270 ","count":20,"modulePower":270,"moduleId":40,"DCpower":5.4,"deviceId":1,"manufacturer":"协鑫"},{"pvName":"pv6","moduleType":"多晶","pvId":6,"moduleNum":"协鑫_GCL-P6/60 270 ","count":20,"modulePower":270,"moduleId":40,"DCpower":5.4,"deviceId":1,"manufacturer":"协鑫"}],"draw":"null","recordsTotal":6,"realCount":6},"msg":null});
Mock.mock("/device/plantIdofOrg4Camera.do",{"code":100,"body":{"data":[{"plantId":"123","plantName":"A电站"},{"plantId":"456","plantName":"B电站"},{"plantId":"789","plantName":"C电站"}]}});
Mock.mock("/device/getCaModelList.do",{"body":{"data":[{"modelName":"海康_DTSD718_128G","modelId":1},{"modelName":"海康_DTSD341-MC3_128G","modelId":2},{"modelName":"海康_DTSD188S_128G","modelId":3},{"modelName":"海康_DDS720_128G","modelId":4}]},"code":"100","msg":"查询成功"});
Mock.mock("/device/getInverterModelForChoice.do",{"code":"100","body":{"recordsFiltered":3,"data":[{"deviceType":"组串式逆变器","efficace":"0.986","mttpRoute":3,"modelId":1,"deviceIdentity":"华为_SUN2000-33KTL","model":"SUN2000-33KTL","typeId":2,"connTime":"2018-03-07","power":"33","maxRoute":6,"manufacturer":"华为"},{"deviceType":"组串式逆变器","efficace":"0.99","mttpRoute":4,"modelId":2,"deviceIdentity":"华为_SUN2000-50kTL","model":"SUN2000-50kTL","typeId":2,"connTime":"2018-03-07","power":"50KW","maxRoute":8,"manufacturer":"华为"},{"deviceType":"组串式逆变器","efficace":"0.9885","mttpRoute":4,"modelId":4,"deviceIdentity":"华为_SUN2000-36kTL","model":"SUN2000-36kTL","typeId":2,"connTime":"2018-03-07","power":"36KW","maxRoute":8,"manufacturer":"华为"}],"draw":"6","recordsTotal":3},"msg":"查询成功"});
Mock.mock("/device/getModuleInfoforChoice.do",{"code":"100","body":{"recordsFiltered":0,"data":[],"draw":"5","recordsTotal":0},"msg":null});
Mock.mock("/device/plantIdofOrg4Device.do",{"code":"100","body":{"data":[{"plantId":1,"plantName":"徐州丰县电动车产业园"},{"plantId":2,"plantName":"岭背塘电站"},{"plantId":3,"plantName":"云石山乡电站"},{"plantId":4,"plantName":"湾潭快递产业园"},{"plantId":5,"plantName":"壬田镇中潭村电站"},{"plantId":6,"plantName":"海宁市鑫旺五金厂电站"},{"plantId":7,"plantName":"山东省枣庄市峄城电站"},{"plantId":8,"plantName":"石家庄南寨电站"},{"plantId":9,"plantName":"贾庄工业园电站"},{"plantId":10,"plantName":"长葛市众品工业园电站"},{"plantId":31,"plantName":"测试电站"},{"plantId":33,"plantName":"光伏能源电站"},{"plantId":34,"plantName":"测试电站林"},{"plantId":35,"plantName":"邻家电站测试"}]},"msg":"查询成功"});
Mock.mock("/device/getAllCollNames.do",{"code":"100","body":{"data":[{"topModelId":1,"topModelName":"SYN-005"},{"topModelId":2,"topModelName":"SYN-010"},{"topModelId":3,"topModelName":"SYN-TEST"}]},"msg":"查询成功"});
Mock.mock("/devicewx/deleteDevice.do",{"body":"","code":100,"msg":"删除成功/失败"});
Mock.mock("/devicewx/getInventerNum.do",{"body":{"collName":"某某某","serialPort":[{"spMax":5,"spName":"串口1","spId":"1","datas":[{"addr":"001","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"002","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"003","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"004","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"005","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"}]},{"spMax":3,"spId":"2","spName":"串口2"}],"num":10,"id":123},"code":100,"msg":"该数采已存在！"});
Mock.mock("/devicewx/getModel.do",{"body":[[{"id":1,"name":"华为"},{"id":2,"name":"阳光"},{"id":3,"name":"固德威"}],[{"id":1,"name":"SUN2000-36KTL"},{"id":2,"name":"SUN2000-50KTL"},{"id":3,"name":"SUN2000-60KTL"},{"id":4,"name":"SUN2000-70KTL"},{"id":5,"name":"SUN2000-80KTL"}]],"code":100,"msg":""});
Mock.mock("/devicewx/getDevType.do",{"code":"100","body":{},"msg":null});
Mock.mock("/devicewx/updateDevice.do",{"body":"关注/取消关注成功","code":100,"msg":"修改成功"});
Mock.mock("/devicewx/updateSelfDevice.do",{"body":"关注/取消关注成功","code":100,"msg":"修改成功"});
Mock.mock("/energyMonitor/getEnterpriseInfo.do",{"code":100,"body":{"enterPriseName":"苏州宝嘉新能源科技有限公司","addr":"苏州市吴江区七都镇七都大道2577号","connectTime":"2018年7月7日","description":"苏州宝嘉新能源科技有限公司是一家中外合资企业。公司产品以外销为主，应用于欧美市场的众多生产领域，如太阳能公司、瓦斯电力公司、建筑铁路部门、汽车行业配件等。公司坚持“质量为生命，信誉为宗旨，用户至上，持续改进”的质量方针，目前已经发展成为华东地区最具影响力的新能源企业之一。","photos":["/images/energyEfficient/activeMonitor/img2.png","/images/energyEfficient/activeMonitor/img3.png","/images/energyEfficient/activeMonitor/img4.png"]}});
Mock.mock("/energyMonitor/getUseElec.do",{"code":100,"body":{"dayElec|1":[2875.5,2302.3,2895.2],"dayElecPrice":2012.85,"monthElec":19856.89,"monthElecPrice":13899.83,"yearElec":711204.67,"yearElecPrice":497843.27}});
Mock.mock("/energyMonitor/getElecKPI.do",{"code":100,"body":[{"name":0,"value|1":[7347.05,7302.3,6895.2],"unit":"度"},{"name":1,"value|1":[5550,5453,5589],"unit":"度"},{"name":2,"value|1":[2584.3,2553,2241],"unit":"度"},{"name":3,"value|1":[4999,4888,4777],"unit":"度"}]});
Mock.mock("/energyMonitor/getElecQualityKPI.do",{"code":100,"body":{"estimateReward":1235.22,"forecastFines":0,"max":0.92,"min":0.73,"powerFactor":0.92}});
Mock.mock("/energyMonitor/useElecMinTime.do",{"code":100,"body":"2017-2-6"});
Mock.mock("/energyMonitor/useElecLoadMinTime.do",{"code":100,"body":"2017-2-6"});
Mock.mock("/energyMonitor/getElecUseKpi.do",function (param) {
        var request = param.body;
        typeof(request) !== 'object' && (request = JSON.parse(request));
        var res={};
        switch (+request.dimension) {
            case 0:res = {
                "code": "100",
                "body": {
                    "start":"2018-08-01",
                    "end":"2018-08-20",
                    "xData": ["08-1", "08-2", "08-3", "08-4", "08-5", "08-6", "08-7", "08-8", "08-9", "08-10", "08-11", "08-12", "08-13", "08-14", "08-15", "08-16", "08-17", "08-18", "08-19", "08-20"],

                    "yData": [{
                        "name": "0",
                        unit:'kWh',
                        "value": [10.75, 10.52, 10.71, 10.2, 10.24, 11.75, 9.3, 10.22, 10.96, 9.19, 11.84, 10.71, 10.2, 10.24, 10.63, 11.17, 9.29, 10.71, 10.2, 10.24]
                    },{
                        "name": "1",
                        unit:'kWh',
                        "value": [9.75, 9.12, 10.35, 10.11, 10.32, 10.22, 10.96, 10.19, 10.84, 10.71, 10.2, 10.24, 10.63, 10.17, 10.29, 10.2, 10.24, 10.63, 10.17, 10.29]
                    }, {
                        "name": "2",
                        unit:'元',
                        "value": [5.59, 7.04, 6.32, 7.06, 7.2, 7.95, 8.05, 8.04, 7.58, 7.15, 6.57, 6.74, 6.82, 8.22, 2.85, 6.57, 6.74, 6.82, 8.22, 2.85]
                    }]
                },
                "msg": "查询成功"
            }
                break;
            case 1:
                res = {
                    "code": "100",
                    "body": {
                        "start": "2018-01",
                        "xData": ["2018-01", "2018-02","2018-03", "2018-04", "2018-05", "2018-06", "2018-07", "2018-08"],
                        "yData": [
                            {"name": "0",
                                unit:'kWh',
                                "value": [122.55, 120.55,120.03, 120.11, 125.41, 123.42, 124.65, 120.26]
                            },
                            {"name": "1",
                                unit:'kWh',
                                "value": [120.12, 120.55,118.12, 119.55, 120.38, 120.40, 120.73, 116.01]},
                            {
                            "name": "2",
                                unit:'元',
                            "value": [2.91, 10.18, 37.58, 130.49, 152.19, 115.91]
                        }],
                        "end": "2018-08",
                    },
                    "msg": "查询成功"
                }
                break;
            case 2:res = {
                "code": "100",
                "body": {
                    "start":"2016",
                    "end":"2018",
                    "xData": ["2016","2017","2018"],
                    "yData": [{
                        "name": "0",
                        unit:'GWh',
                        "value": [3.00,2.9960,2.99089]
                    },{
                        "name": "2",
                        unit:'万元',
                        "value": [0.0,0.11,450.21]
                    }]
                },
                "msg": "查询成功"
            }
                break;
        }

        return res
    });
Mock.mock("/energyMonitor/getElecLoadKpi.do",function (param) {
        var request = param.body;
        typeof(request) !== 'object' && (request = JSON.parse(request));
        var res = {
            "code": "100",
            "body": {
                "start":"2018-08-20",
                "end":"2018-08-20",
                "xData": ["0:00","0:05","0:10","0:15","0:20","0:25","0:30","0:35","0:40","0:45","0:50","0:55","1:00","1:05","1:10","1:15","1:20","1:25","1:30","1:35","1:40","1:45","1:50","1:55","2:00","2:05","2:10","2:15","2:20","2:25","2:30","2:35","2:40","2:45","2:50","2:55","3:00","3:05","3:10","3:15","3:20","3:25","3:30","3:35","3:40","3:45","3:50","3:55","4:00","4:05","4:10","4:15","4:20","4:25","4:30","4:35","4:40","4:45","4:50","4:55","5:00","5:05","5:10","5:15","5:20","5:25","5:30","5:35","5:40","5:45","5:50","5:55","6:00","6:05","6:10","6:15","6:20","6:25","6:30","6:35","6:40","6:45","6:50","6:55","7:00","7:05","7:10","7:15","7:20","7:25","7:30","7:35","7:40","7:45","7:50","7:55","8:00","8:05","8:10","8:15","8:20","8:25","8:30","8:35","8:40","8:45","8:50","8:55","9:00","9:05","9:10","9:15","9:20","9:25","9:30","9:35","9:40","9:45","9:50","9:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:20","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:25","23:30","23:35","23:40","23:45","23:50","23:55"],

                "yData": [{
                    "name": "0",
                    unit:'千瓦',
                    "value": ["80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","80","90","110","130","150","170","190","210","230","250","270","290","310","330","350","370","390","405","420","435","450","465","480","495","505","515","525","535","545","555","565","570","570","575","575","580","580","585","585","590","590","595","595","600","595","595","595","590","590","590","585","585","585","580","580","580","575","575","575","570","570","570","565","565","560","555","550","545","545","545","545","545","550","545","545","545","545","530","530","530","530","530","525","530","530","530","530","530","520","520","520","525","515","505","495","485","475","465","455","445","435","425","415","405","395","385","375","360","345","330","315","300","285","270","255","240","225","210","195","180","165","150","135","120","105","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100","100"]
                },{
                    "name": "1",
                    unit:'千瓦',
                    "value": [1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250]
                }, {
                    "name": "2",
                    unit:'%',
                    "value": [1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250]
                }]
            },
            "msg": "查询成功"
        }
        var yougong = res.body.yData[0].value
        var fuhe = []
        for(var i=0;i<yougong.length;i++){
            fuhe.push(100*yougong[i]/1250)
        }
        res.body.yData[2].value = fuhe

        return res
    });
Mock.mock("/equipment/listEquipmentInfo.do",{"code":100,"body":{"recordsFiltered":24,"data":[{"efficiency":"98.6","channels":4,"max":8,"modelIdentity":"阳光_SG12KTL-M","typeName":"组串式逆变器","photo":"/images/setting/deviceManage/inverter.png","model":"SG12KTL-M","id":2,"power":"15","manufacturer":"阳光","status":"0"},{"efficiency":"98.6","channels":4,"max":8,"modelIdentity":"阳光_SG12KTL-M","typeName":"组串式逆变器","photo":"","model":"SG12KTL-M","id":1,"power":"15KW","manufacturer":"太阳","status":"1"},{"efficiency":"98.6","channels":4,"max":8,"modelIdentity":"阳光_SG12KTL-M","typeName":"组串式逆变器","photo":"","model":"SG12KTL-M","id":1,"power":"15KW","manufacturer":"太阳","status":"1"},{"efficiency":"98.6","channels":4,"max":8,"modelIdentity":"阳光_SG12KTL-M","typeName":"组串式逆变器","model":"SG12KTL-M","id":1,"power":"15KW","manufacturer":"太阳","status":"1","photo":"/images/setting/deviceManage/inverter.png"}],"recordsTotal":24,"draw":""}});
Mock.mock("/equipment/updateStatus.do",{"code":100,"body":"","msg":"修改状态成功"});
Mock.mock("/equipment/listEquipmentSub.do",{"code":"100","msg":1,"body":{"data":[{"efficiency":"15.72%","ff":0.751767,"id":1,"im":8.3,"isc":8.91,"iscTemperatureCoefficient":0.06,"manufacturer":"晶科能源","model":"JKM320P-72","modelIdentity":"晶科能源_JKM320P-72_305","photo":"/images/setting/deviceManage/photovoltaic.png","pmaxTemperatureCoefficient":-0.41,"power":305,"status":"0","subassemblyType":"多晶","vm":36.8,"voc":45.6,"vocTemperatureCoefficient":-0.31,"workingTemperature":"40℃~+89℃"},{"efficiency":"15.72%","ff":0.751767,"id":2,"im":8.3,"isc":8.91,"iscTemperatureCoefficient":0.06,"manufacturer":"晶科能源","model":"JKM320P-72","modelIdentity":"晶科能源_JKM320P-72_305","photo":"/images/setting/deviceManage/photovoltaic.png","pmaxTemperatureCoefficient":-0.41,"power":305,"status":"1","subassemblyType":"多晶","vm":36.8,"voc":45.6,"vocTemperatureCoefficient":-0.31,"workingTemperature":"40℃~+89℃"},{"efficiency":"15.72%","ff":0.751767,"id":1,"im":8.3,"isc":8.91,"iscTemperatureCoefficient":0.06,"manufacturer":"晶科能源","model":"JKM320P-72","modelIdentity":"晶科能源_JKM320P-72_305","photo":"/images/setting/deviceManage/photovoltaic.png","pmaxTemperatureCoefficient":-0.41,"power":305,"status":"0","subassemblyType":"多晶","vm":36.8,"voc":45.6,"vocTemperatureCoefficient":-0.31,"workingTemperature":"40℃~+89℃"},{"efficiency":"15.72%","ff":0.751767,"id":1,"im":8.3,"isc":8.91,"iscTemperatureCoefficient":0.06,"manufacturer":"晶科能源","model":"JKM320P-72","modelIdentity":"晶科能源_JKM320P-72_305","photo":"/images/setting/deviceManage/photovoltaic.png","pmaxTemperatureCoefficient":-0.41,"power":305,"status":"0","subassemblyType":"多晶","vm":36.8,"voc":45.6,"vocTemperatureCoefficient":-0.31,"workingTemperature":"40℃~+89℃"}],"draw":"","recordsFiltered":4,"recordsTotal":4}});
Mock.mock("/equipment/updateEquipmentBasic.do",{"code":100,"msg":"修改成功"});
Mock.mock("/equipment/updateSubBasic.do",{"code":100,"msg":"修改成功"});
Mock.mock("/equipment/updateSubStatus.do",{"code":100,"msg":"修改成功"});
Mock.mock("/equipment/readInterverExcel.do",{"code":100,"msg":"成功"});
Mock.mock("/equipment/interverExcelTemplate.do",{"code":100,"msg":"成功"});
Mock.mock("/equipment/listCamera.do",{"code":100,"body":{"data":[{"cameraModel":"i8","cameraPhoto":"/images/setting/deviceManage/photovoltaic.png","cameraResolution":"1000","guardLevel":"4","inStorage":"8","manufacturer":"华为","maxResolution":"1920","modelIdentity":"kw12345","network":"wifi","supportInfra":0,"typeName":"摄像头"},{"cameraModel":"i8","cameraPhoto":"/images/setting/deviceManage/photovoltaic.png","cameraResolution":"1000","guardLevel":"4","inStorage":"8","manufacturer":"华为","maxResolution":"1920","modelIdentity":"kw12345","network":"wifi","supportInfra":0,"typeName":"摄像头"},{"cameraModel":"i8","cameraPhoto":"/images/setting/deviceManage/photovoltaic.png","cameraResolution":"1000","guardLevel":"4","inStorage":"8","manufacturer":"华为","maxResolution":"1920","modelIdentity":"kw12345","network":"wifi","supportInfra":0,"typeName":"摄像头"}],"draw":"测试内容e5y1","recordsFiltered":3,"recordsTotal":3}});
Mock.mock("/equipment/updateCameraStatus.do",{"code":100,"msg":"修改成功"});
Mock.mock("/equipment/updateCambasic.do",{"code":100,"msg":"修改成功"});
Mock.mock("/equipment/updateEquipmentPhoto.do",{"code":100,"msg":"上传成功"});
Mock.mock("/equipment/updateSubPhoto.do",{"code":100,"msg":"上传成功"});
Mock.mock("/equipment/updateCameraPhoto.do",{"code":100,"msg":"上传成功"});
Mock.mock("/equipment/getDeviceType.do",{"code":100,"body":[{"id":1,"name":"集中式逆变器"},{"id":2,"name":"组串式逆变器"}]});
Mock.mock("/login/loginIn.do",{"code":"100","body":{"loginId":"18782275148","userName":"小智","iconUrl":"/images/plantImages/1516778892949.jpg","email":"","roleId":"4","rights":null,"id":"36","tokenId":"410792247517384704","gender":"1","userOrg":{"id":1,"orgName":"协能共创","orgLogo":null,"orgDesc":"新能源行业领先的新能源管理平台及解决方案供应商,公司注重人才的凝聚培养与技术的研发创新，致力于通过先进的技术，为全球绿色能源的应用和高效管理提供解决方案","orgType":"0","orgPhoto":null,"fatherId":0,"lastModifyTime":1517304864916,"lastModifyUser":1,"orgCode":"X64340","orgValiCode":"SP00001","orgAgentorName":"李丹","orgAngetorId":1,"orgAngetorTel":"13536521598","createTime":1508124799995,"createUser":1,"orgStatus":"1","orgValid":"0","controlName":"监控","controlNum":"1","businessName":"运维","businessNum":"3","serviceName":"售后","serviceNum":"2","roleName":"市场","roleNum":"3","totalNum":null,"systemLogo":"/images/systemImages/15178851642931.png","systemName":"协能共创光伏","systemLogoEe":"","screenLogo":"/images/systemImages/15174538356271.jpg","screenName":null},"userTel":"18782275148","userType":"0","plantType":"1","plantNum":"10,1,2","plantId":"1","plantTypeList":"1,4"},"msg":null});
Mock.mock("/login/loginOut.do",{"code":"100","body":"","msg":""});
Mock.mock("/login/getSysInfo.do",{"code":"100","body":{"scrollPic":["/images/loginImages/bg1.jpg","/images/loginImages/bg2.jpg","/images/loginImages/bg3.jpg"],"logoPic":"/images/loginImages/logo.png","logoTxt":"光伏智慧管理平台"},"msg":""});
Mock.mock("/login/dataTable.do",{"code":"100","body":{"data|14":[{"alarmLevel|1":["严重","提示","一般","提示"],"changeTime":"1509608652011","salary|+1":1,"id|+1":1,"name":"@first","start_date|1":["0","1","2","3","5"],"position":"@first","office":"@first","extn|1":["0","1"]}]},"msg":""});
Mock.mock("/login/getAddrLocation.do",{"code":100,"body":{"addrName":"成都市","lat":"11","lng":"22"}});
Mock.mock("/login/checkLinkCode.do",{"code":100,"body":{"createUser":"张三","orgName":"协能共创","plantList":["徐州电站","北京电站"],"roleName":"超级管理员","userType":0}});
Mock.mock("/login/checkRegisterUser.do",{"code":100,"body":{}});
Mock.mock("/login/quicklyRegister.do",{"code":100,"body":{}});
Mock.mock("/monitor/singleDeviceBasic.do",{"code":"100","body":{"connTime":"环球中心电站","deviceId":"5kW","deviceModel":"张三","mark":"13451864425","deviceSN":"13451864425","power":"13451864425","deviceName":"13451864425","image":"/images/pmImages/img_power.png"},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/monitor/getPvTopo.do",{"code":"100","body":{"mpptPower|1":["487.5kW","-402.7kW","0kW"],"activePower|1":["487.5kW","-402.7kW","0kW"]},"msg":"查询成功"});
Mock.mock("/monitor/getGCTopo.do",{"code":"100","body":{"batPower|1":["487.5kW","-402.7kW","0kW"],"gridPower|1":["487.5kW","-402.7kW","0kW"],"loadPower|1":["487.5kW","402.7kW","0kW"],"pvPower|1":["487.5kW","0kW"]},"msg":"查询成功"});
Mock.mock("/monitor/getCNTopo.do",{"code":"100","body":{"batPower|1":["487.5kW","-402.7kW","0kW"],"gridPower|1":["487.5kW","-402.7kW","0kW"],"loadPower|1":["487.5kW","402.7kW","0kW"]},"msg":"查询成功"});
Mock.mock("/monitor/getTotalInfo.do",{"code":"100","body":{"totalPowerUnit":"度","totalPrice":8270.87,"totalPriceUnit":"元","totalPower":10198.36},"msg":"查询成功"});
Mock.mock("/monitor/getTodayInfo.do",{"code":"100","body":{"gen":3,"unit":"座","standby":3,"abnormal":10,"break":1,"profitDayUnit":"元","genDay":69.62,"fault":3,"time":1520412616167,"genDayUnit":"度","profitDay":56.46},"msg":"查询成功"});
Mock.mock("/monitor/deviceStatus.do",function (param) {
        var request = param.body;
        typeof(request) !== 'object' && (request = JSON.parse(request));
        var res=[];
        switch (Number(request.type)){
            case 0:
                /*res = {
                    showData:[
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                        {name:'电压电压电压',value:'123v'},
                    ],
                    deviceType:3
                }*/
                res = {
                    showData: [
                        [
                            {name: '电压电压电压', value: '223v'},
                            {name: '电压电压电压', value: '123v'},
                            {name: '电压电压电压', value: '133v'},
                            {name: '电压电压电压', value: '123v'},
                            {name: '电压电压电压', value: '123v'},
                            {name: '电压电压电压', value: '123v'},
                            {name: '电压电压电压1', value: '123v'}],
                        [{name: '交流电压', value: '123v'},
                            {name: '交流电流', value: '123v'},
                            {name: '交流功率', value: '123v'},
                            {name: '日发电量', value: '123v'},
                            {name: '日发电量', value: '123v'},
                            {name: '日发电量', value: '123v'},
                            {name: '日发电量', value: '123v'},
                            {name: '累计发电量', value: '123v'},
                            {name: '日发电量', value: '123v'}],
                        [
                            {name: '温度', value: '123v'},
                            {name: '转换效率', value: '123v'},
                            {name: '转换效率', value: '123v'},
                            {name: '电压电压电压', value: '123v'},
                            {name: '电压电压电压', value: '123v'},
                            {name: '电压电压电压', value: '123v'}
                        ],
                    ],
                    curTime:'@datetime()',
                    deviceType:1
                }
                ;break;
            case 1:
                res = [
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'1'},
                    {name:'某某某某某状态',value:'0'},
                    {name:'某某某某某状态',value:'0'},
                ];break;
            case 2:
                res = {
                    setBtns:[{
                        guid:'1_36ktl_a_YK_0_1',
                        "tipTitle": "远程开机",
                        "tipContent": "开机后逆变器将开始发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        label:'开机',
                        value: '1'
                    },{
                        guid:'1_36ktl_a_YK_0_2',
                        "tipTitle": "远程关机",
                        "tipContent": "关机后逆变器将停止发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        label:'关机',
                        value: '7'
                    },{
                        guid:'1_36ktl_a_YK_0_3',
                        "tipTitle": "远程重启",
                        "tipContent": "重启时逆变器将停止发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        label:'重启',
                        value: '8'
                    },{
                        guid:'1_36ktl_a_YK_0_4',
                        "tipTitle": "远程开机",
                        "tipContent": "开机后逆变器将开始发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        label:'单元1开机',
                        value: '9'
                    },{
                        guid:'1_36ktl_a_YK_0_4',
                        "tipTitle": "远程开机",
                        "tipContent": "开机后逆变器将开始发电，请谨慎操作！你将对操作造成的一切后果承担所有责任",
                        label:'单元1开机',
                        value: '9'
                    }],
                    setDatas:[
                        {label:'设定值1',name:'name1',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值2',name:'name2',value:'13',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值3',name:'name3',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值4',name:'name4',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值5',name:'name5',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值6',name:'name6',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值7',name:'name7',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值8',name:'name8',value:'12',unit:'kW',validMin:1,validMax:100},
                        {label:'设定值9',name:'name9',value:'12',unit:'kW',validMin:1,validMax:100}
                    ],
                    ykGuid:'15496',
                    ykValue:'7'
                };break;
        }

        return {
            code:'100',
            body:res,
            msg:'网络连接错误'
        }
    });
Mock.mock("/monitor/singleBasicInfo.do",{"code":"100","body":{"name":"环球中心电站","plantType":"分布式 扶贫电站","contacts":"张三","contactsTel":"13451864425","connectTime":"2017年10月31日","plantArea":"750平方米","location":[30.629169,104.079373],"address":"@county(true)","desc":"无","img":["/images/pmImages/img_power.png","/images/pmImages/img_power.png","/images/pmImages/img_power.png"],"cameraInfo":{"appKey":"f9ee6aeb44e24ae685a838ba7931c6da","accessToken":"at.006tmi860hyu4zp18197923l216exa52-45ezmtwz5v-1sdzhq7-oevxygfbi","cameraInfos":[{"sn":"134046139"}]}},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/monitor/singelDevices.do",{"code":"100","body":{"recordsFiltered":3,"data":[{"deviceType":2,"genDay":"116.37","power":"13.77","type|1":[0,1,2,3,4],"deviceId":"1","deviceName":"36KTL-1","status":"正常"},{"deviceType":2,"genDay":"116.37","power":"13.77","type|1":[0,1,2,3,4],"deviceId":"1","deviceName":"36KTL-1","status":"待机"},{"deviceType":2,"genDay":"116.37","power":"13.77","type|1":[0,1,2,3,4],"deviceId":"1","deviceName":"36KTL-1","status":"故障"},{"deviceType":2,"genDay":"139.68","power":"16.55","type|1":[0,1,2,3,4],"deviceId":"2","deviceName":"36KTL-2","status":"通讯中断"},{"deviceType":5,"genDay":"NaN","power":"NaN","type|1":[0,1,2,3,4],"deviceId":"3","deviceName":"数采01","status":"通讯中"}],"draw":"1","recordsTotal":3},"msg":null});
Mock.mock("/monitor/singelDevices.do?tokenId=410792247517384704",{"code":"100","body":{"data|10":[{"power|1-100.1-10":1,"deviceId|+1":1,"deviceName":"@first","type|1":[0,1,2,3,4],"status|1":["通信中","发电","待机","故障","中断"]}],"recordsTotal":800,"recordsFiltered":800},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/monitor/getCurrentIncomeOfPlant.do",{"code":"100","body":{"genTotal":17376.99,"genTotalUnit":"度","profitDayUnit":"元","genDay":"120.62","profitTotal":14092.74,"genDayUnit":"度","profitTotalUnit":"元","type":0,"profitDay":"97.82"},"msg":null});
Mock.mock("/monitor/getPowerCurrentOfDevice.do",{"code":"100","body":{"xData":["05:40","05:45","05:50","05:55","06:00","06:05","06:10","06:15","06:20","06:25","06:30","06:35","06:40","06:45","06:50","06:55","07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","08:55","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55"],"yName":"功率(千瓦),发电量(度)","yData":[{"name":"功率","value":["0","0.043","0.103","0.204","0.323","0.479","0.699","0.915","1.124","1.371","1.645","1.996","2.375","2.742","2.446","2.117","2.359","3.893","4.547","5.237","5.786","5.153","3.279","3.399","4.573","5.02","9.54","10.959","10.518","10.801","11.913","12.748","13.261","14.034","14.533","14.851","15.628","16.371","16.699","17.792","18.106","18.752","18.724","20.116","20.116","20.735","22.001","21.697","22.609","22.235","23.138","24.665","24.158","24.921","24.645","23.34","24.071","25.797","25.149","25.358","25.843","25.731","15.379","27.875","26.316","24.595","23.172","29.526","28.857","15.662","29.17","27.887","27.375","29.555","27.304","30.12","30.12","27.966","15.992","15.992","23.385","17.519","17.519","14.897","9.461","9.461","30.533","30.748","28.958","13.236","24.662","26.778","27.772","28.793","17.735","26.556","14.15","26.841","27.555","27.032","20.042","27.342",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"unit":"千瓦"},{"name":"发电量","value":["0","0","0","0.01","0.04","0.07","0.12","0.18","0.27","0.37","0.5","0.65","0.83","1.05","1.27","1.46","1.65","1.88","2.23","2.64","3.1","3.53","3.87","4.13","4.48","4.95","5.67","6.54","7.4","8.33","9.29","10.31","11.41","12.57","13.73","14.97","16.19","17.57","18.95","20.34","21.88","23.36","24.93","26.56","26.56","29.93","31.7","33.45","35.27","37.15","39.07","41.04","43.02","44.82","46.86","48.92","51.03","53.14","55.23","57.36","59.46","61.65","63.26","65.42","67.71","69.39","71.72","73.9","76.23","78.48","80.51","82.93","84.97","87.36","89.68","91.98","91.98","96.81","98.61","98.61","102.49","104.5","104.5","108.48","109.56","109.56","112.29","114.88","117.42","118.89","120.24","122.41","124.58","126.95","129.07","131.19","133.07","134.82","136.9","139.19","141.04","143.15",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"unit":"度"}]},"msg":null});
Mock.mock("/monitor/getPowerCountOfPlant.do",{"code":"100","body":{"PPR":"+0.95度","historyEnergy":{"start":"2018-01-09","xData":["01-09 周二","01-10 周三","01-11 周四","01-12 周五","01-13 周六","01-14 周日","01-15 周一"],"unity1":"度","maxData2":239.85,"yData":[{"name":"发电量","value":[293.07,287.48,295.74,281.2,234.42,0,9.33]},{"name":"收益","value":[237.68,233.15,239.85,228.05,190.11,0,7.57]}],"end":"2018-01-15","unity2":"元","maxData1":295.74},"activePower":{"yData1":["4.5","6.7","8.678",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"xData":["07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","08:55","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30"],"yData2":["9.25","9.625","9.993","10.354","10.707","11.052","11.39","11.721","12.044","12.36","12.668","12.969","13.262","13.548","13.827","14.097","14.361","14.617","14.866","15.107","15.34","15.567","15.785","15.997","16.201","16.397","16.586","16.767","16.941","17.108","17.267","17.419","17.563","17.7","17.829","17.951","18.065","18.172","18.271","18.363","18.448","18.525","18.594","18.657","18.711","18.759","18.798","18.831","18.855","18.873","18.883","18.885","18.88","18.868","18.848","18.821","18.786","18.744","18.694","18.637","18.572","18.5","18.42","18.333","18.239","18.137","18.028","17.911","17.787","17.655","17.516","17.369","17.215","17.053","16.884","16.708","16.524","16.332","16.133","15.927","15.713","15.492","15.263","15.027","14.784","14.533","14.274","14.008","13.735","13.454","13.165","12.869","12.566","12.255","11.937","11.612","11.278","10.938","10.59","10.234","9.871","9.501","9.123","8.738","8.345","7.945","7.537","7.122","6.699","6.269","5.832","5.387","4.934","4.475","4.007","3.532","3.05","2.56","2.063","1.559","1.047","0.527","0.0"],"curData2":"9.25","unit":"千瓦","curTime":"07:30"},"palntRank":"+0.95小时"},"msg":null});
Mock.mock("/monitor/plantOpen.do",{"code":100,"body":[{"break":"5","fault":"5","deviceNum":"20","image":"","location":[30.8515424456,121.1283874512],"powerCurve":{"curData2":5175,"curTime":"12:15","unit":"kw","xData":["6:00","6:05","6:10","6:15","6:20","6:25","6:30","6:35","6:40","6:45","6:50","6:55","7:00","7:05","7:10","7:15","7:20","7:25","7:30","7:35","7:40","7:45","7:50","7:55","8:00","8:05","8:10","8:15","8:20","8:25","8:30","8:35","8:40","8:45","8:50","8:55","9:00","9:05","9:10","9:15","9:20","9:25","9:30","9:35","9:40","9:45","9:50","9:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00"],"yData2":[0,143,284,423,560,695,828,959,1088,1215,1340,1463,1584,1703,1820,1935,2048,2159,2268,2375,2480,2583,2684,2783,2880,2975,3068,3159,3248,3335,3420,3503,3584,3663,3740,3815,3888,3959,4028,4095,4160,4223,4284,4343,4400,4455,4508,4559,4608,4655,4700,4743,4784,4823,4860,4895,4928,4959,4988,5015,5040,5063,5084,5103,5120,5135,5148,5159,5168,5175,5180,5183,5184,5183,5180,5175,5168,5159,5148,5135,5120,5103,5084,5063,5040,5015,4988,4959,4928,4895,4860,4823,4784,4743,4700,4655,4608,4559,4508,4455,4400,4343,4284,4223,4160,4095,4028,3959,3888,3815,3740,3663,3584,3503,3420,3335,3248,3159,3068,2975,2880,2783,2684,2583,2480,2375,2268,2159,2048,1935,1820,1703,1584,1463,1340,1215,1088,959,828,695,560,423,284,143,0],"yData1":[0,100,200,300,350,360,370,400,410,420,430,440,450,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}]});
Mock.mock("/monitor/plantOpen.do?tokenId=410792247517384704",{"code":100,"body":[{"break":"5台","fault":"5台","normal":"5台","standby":"5台","deviceNum":"20","image":"","location":[30.8515424456,121.1283874512],"powerCurve":{"activePower":{"curData2":5175,"curTime":"12:15","unit":"kw","xData":["6:00","6:05","6:10","6:15","6:20","6:25","6:30","6:35","6:40","6:45","6:50","6:55","7:00","7:05","7:10","7:15","7:20","7:25","7:30","7:35","7:40","7:45","7:50","7:55","8:00","8:05","8:10","8:15","8:20","8:25","8:30","8:35","8:40","8:45","8:50","8:55","9:00","9:05","9:10","9:15","9:20","9:25","9:30","9:35","9:40","9:45","9:50","9:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00"],"yData2":[0,143,284,423,560,695,828,959,1088,1215,1340,1463,1584,1703,1820,1935,2048,2159,2268,2375,2480,2583,2684,2783,2880,2975,3068,3159,3248,3335,3420,3503,3584,3663,3740,3815,3888,3959,4028,4095,4160,4223,4284,4343,4400,4455,4508,4559,4608,4655,4700,4743,4784,4823,4860,4895,4928,4959,4988,5015,5040,5063,5084,5103,5120,5135,5148,5159,5168,5175,5180,5183,5184,5183,5180,5175,5168,5159,5148,5135,5120,5103,5084,5063,5040,5015,4988,4959,4928,4895,4860,4823,4784,4743,4700,4655,4608,4559,4508,4455,4400,4343,4284,4223,4160,4095,4028,3959,3888,3815,3740,3663,3584,3503,3420,3335,3248,3159,3068,2975,2880,2783,2684,2583,2480,2375,2268,2159,2048,1935,1820,1703,1584,1463,1340,1215,1088,959,828,695,560,423,284,143,0],"yData1":[0,100,200,300,350,360,370,400,410,420,430,440,450,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}}]});
Mock.mock("/monitor/multiWebSocket.do",{"code":100,"objSocket":[{"topic":"multiGP","body":{"totalGen":"12314kW","totalProfit":"112313元","day":{"unity1":"kWh","unity2":"元","xData":["2017-11-20","2017-11-21","2017-11-22","2017-11-23","2017-11-24","2017-11-25","2017-11-26"],"yData1":["1000","2000","1500","1405","3000","2080","2500"],"yData2":["3000","8000","9500","5405","5000","4080","10000"]},"month":{"unity1":"kWh","unity2":"元","xData":["12月","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月"],"yData1":["2000","1500","1800","30000","2600","4000","3500","2500","1500","5000","4500","4000"],"yData2":["10000","12000","13000","5000","11000","8000","20000","18000","14000","20000","18000","19000"]},"year":{}}},{"topic":"multiPS","body":{"break":"123","fault":"234","normal":"456","standby":"110"}},{"topic":"multiPC","body":{"curData2":5175,"curTime":"12:15","unit":"kw","xData":["6:00","6:05","6:10","6:15","6:20","6:25","6:30","6:35","6:40","6:45","6:50","6:55","7:00","7:05","7:10","7:15","7:20","7:25","7:30","7:35","7:40","7:45","7:50","7:55","8:00","8:05","8:10","8:15","8:20","8:25","8:30","8:35","8:40","8:45","8:50","8:55","9:00","9:05","9:10","9:15","9:20","9:25","9:30","9:35","9:40","9:45","9:50","9:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00"],"yData2":[0,143,284,423,560,695,828,959,1088,1215,1340,1463,1584,1703,1820,1935,2048,2159,2268,2375,2480,2583,2684,2783,2880,2975,3068,3159,3248,3335,3420,3503,3584,3663,3740,3815,3888,3959,4028,4095,4160,4223,4284,4343,4400,4455,4508,4559,4608,4655,4700,4743,4784,4823,4860,4895,4928,4959,4988,5015,5040,5063,5084,5103,5120,5135,5148,5159,5168,5175,5180,5183,5184,5183,5180,5175,5168,5159,5148,5135,5120,5103,5084,5063,5040,5015,4988,4959,4928,4895,4860,4823,4784,4743,4700,4655,4608,4559,4508,4455,4400,4343,4284,4223,4160,4095,4028,3959,3888,3815,3740,3663,3584,3503,3420,3335,3248,3159,3068,2975,2880,2783,2684,2583,2480,2375,2268,2159,2048,1935,1820,1703,1584,1463,1340,1215,1088,959,828,695,560,423,284,143,0],"yData1":[0,100,200,300,350,360,370,400,410,420,430,440,450,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}]});
Mock.mock("/monitor/basicInfo.do",{"code":"100","body":{"unity":"KW","totalNumUnit":"座","totalNum":10,"totalCap":41980.2},"msg":null});
Mock.mock("/monitor/plantDist.do",{"code":"100","body":{"areaInfo":[{"hasChild":true,"fatherId":0,"name":"中国","count":10,"id":"116.36836139.9150691"}],"kidsArea":[{"hasChild":true,"count":1,"name":"湖南省","location":"109.96625327.5003392","id":"109.96625327.5003392"},{"hasChild":true,"count":1,"name":"河南省","location":"113.64095134.7655452","id":"113.64095134.7655452"},{"hasChild":true,"count":1,"name":"河北省","location":"114.48255438.0622962","id":"114.48255438.0622962"},{"hasChild":true,"count":3,"name":"江西省","location":"116.15533825.9838972","id":"116.15533825.9838972"},{"hasChild":true,"count":2,"name":"山东省","location":"116.98432336.6642042","id":"116.98432336.6642042"},{"hasChild":true,"count":1,"name":"江苏省","location":"118.769552959632.06648636212","id":"118.769552959632.06648636212"},{"hasChild":true,"count":1,"name":"浙江省","location":"120.18367930.259572","id":"120.18367930.259572"}],"plantsInfo":[{"genTotal":9445.44,"ppr":3.7,"singlePlantType":1,"name":"徐州丰县电动车产业园","weather":"/images/weather/duoyun.png","genDay":259.54,"location":"116.5657567978,34.7202921520","contectsTel":"15996972171","id":11,"addr":"江苏省徐州市丰县","contacts":"王海森","capacity":70.2,"status":0},{"genTotal":66118.08,"ppr":2.56,"singlePlantType":1,"name":"岭背塘电站","weather":"/images/weather/yin.png","genDay":1816.78,"location":"116.155338,25.983897","contectsTel":"18782275148","id":12,"addr":"江西省赣州市瑞金市","contacts":"寇娇","capacity":710,"status":0},{"genTotal":226690.55,"ppr":2.5,"singlePlantType":1,"name":"云石山乡电站","weather":"/images/weather/yin.png","genDay":6228.96,"location":"115.903688,25.847467","contectsTel":"13438007067","id":13,"addr":"江西省赣州市瑞金市","contacts":"张杰","capacity":2490,"status":1},{"genTotal":557280.94,"ppr":2.58,"singlePlantType":1,"name":"湾潭快递产业园","weather":"/images/weather/duoyun.png","genDay":15312.86,"location":"109.966253,27.500339","contectsTel":"13398187817","id":14,"addr":"湖南省怀化市鹤城区","contacts":"张鹏","capacity":5940,"status":2},{"genTotal":2229123.76,"ppr":2.59,"singlePlantType":1,"name":"壬田镇中潭村电站","weather":"/images/weather/yin.png","genDay":61251.44,"location":"116.157675,26.009295","contectsTel":"18282760953","id":15,"addr":"江西省赣州市瑞金市","contacts":"吴莎莎","capacity":23680,"status":4},{"genTotal":47227.2,"ppr":0.61,"singlePlantType":1,"name":"海宁市鑫旺五金厂电站","weather":"/images/weather/yin.png","genDay":1297.7,"location":"120.584978,30.432841","contectsTel":"17602847284","id":16,"addr":"浙江省嘉兴市海宁市","contacts":"刘灿","capacity":2120,"status":3},{"genTotal":198354.23,"ppr":2.5,"singlePlantType":1,"name":"山东省枣庄市峄城电站","weather":"/images/weather/duoyun.png","genDay":5450.34,"location":"117.571957,34.794461","contectsTel":"17705228629","id":17,"addr":"山东省枣庄市","contacts":"科亚机电","capacity":2180,"status":4},{"genTotal":349481.27,"ppr":2.53,"singlePlantType":1,"name":"石家庄南寨电站","weather":"/images/weather/duoyun.png","genDay":9602.98,"location":"114.399512,38.18118","contectsTel":"18780575078","id":18,"addr":"河北省石家庄市","contacts":"徐春燕","capacity":3790,"status":0},{"genTotal":37781.76,"ppr":2.16,"name":"贾庄工业园电站","weather":"/images/weather/qing.png","genDay":1038.16,"singlePlantType":1,"location":"117.08435,37.27403","contectsTel":"15282542261","id":19,"addr":"山东省济南市商河县","contacts":"林茂盛","capacity":480,"status":0},{"genTotal":47227.2,"ppr":2.5,"singlePlantType":1,"name":"长葛市众品工业园电站","weather":"/images/weather/duoyun.png","genDay":1297.7,"location":"113.652623,34.066009","contectsTel":"18380404279","id":110,"addr":"河南省许昌市建安区","contacts":"张兰","capacity":520,"status":0}],"recordsFiltered":10,"draw":"1","recordsTotal":10},"msg":"得到区域电站分布信息"});
Mock.mock("/monitor/areaInfo.do",function (param) {
        var request = param.body;
        typeof(request) !== 'object' && (request = JSON.parse(request));
        var res = [];
        switch (Number(request.id)){
            case 9:res=[
                {name:'成都', count:123,id:91},
                {name:'绵阳', count:123,id:92},
                {name:'自贡', count:123,id:93},
            ];break;
            case 2:res=[
                {name:'四川', count:123,id:9},
                {name:'河北', count:123,id:2},
                {name:'云南', count:123,id:3},
                {name:'福建', count:123,id:4},
                {name:'广东', count:123,id:5},
                {name:'北京', count:123,id:6},
                {name:'重庆', count:123,id:7},
                {name:'贵州', count:123,id:8}
            ]
            // case 1,1:res=[
            //     {name:'中国', count:123,id:1}
            // ];break;
            // case 1,2:res = [
            //     {name:'四川', count:123,id:9},
            //     {name:'河北', count:123,id:2},
            //     {name:'云南', count:123,id:3},
            //     {name:'福建', count:123,id:4},
            //     {name:'广东', count:123,id:5},
            //     {name:'北京', count:123,id:6},
            //     {name:'重庆', count:123,id:7},
            //     {name:'贵州', count:123,id:8}
            // ];break;
            // case 9,2:res=[
            //     {name:'成都', count:123,id:91},
            //     {name:'绵阳', count:123,id:92},
            //     {name:'自贡', count:123,id:93},
            // ];break;
            // case 91,2:res=[
            //     {name:'龙泉驿区', count:123,id:911},
            //     {name:'高新区', count:123,id:912},
            //     {name:'双流区', count:123,id:913},
            // ];break;
            // case 91,1:res=[
            //     {name:'成都', count:123,id:91},
            //     {name:'绵阳', count:123,id:92},
            //     {name:'自贡', count:123,id:93},
            // ];break;
            // case 9,1:res=[
            //     {name:'四川', count:123,id:9},
            //     {name:'河北', count:123,id:2},
            //     {name:'云南', count:123,id:3},
            //     {name:'福建', count:123,id:4},
            //     {name:'广东', count:123,id:5},
            //     {name:'北京', count:123,id:6},
            //     {name:'重庆', count:123,id:7},
            //     {name:'贵州', count:123,id:8}
            // ];break;
        }
        if(request.id==''){
            res=[
                {name:'四川', count:123,id:9},
                {name:'河北', count:123,id:2},
                {name:'云南', count:123,id:3},
                {name:'福建', count:123,id:4},
                {name:'广东', count:123,id:5},
                {name:'北京', count:123,id:6},
                {name:'重庆', count:123,id:7},
                {name:'贵州', count:123,id:8}
            ]
        }
        return {
            code:'100',
            body:{
                areaInfo:res
            },
            msg:'网络连接错误'
        }
    });
Mock.mock("/monitor/deviceDetail.do",{"code":"100","body":{"image":"","connTime":"2017-12-22","deviceModel":"SUN2000-36kTL","power":"36.0千瓦","deviceId":"1","deviceName":"36KTL-1","deviceSN":"ERTERTFDSG","mark":"华为"},"msg":null});
Mock.mock("/monitor/updateValueOfGuid.do",{"code":101,"msg":"执行成功！"});
Mock.mock("/monitor/curveSearch.do",{"code":"100","body":{"start":"2018-03-19","xData":["03-19 周一","03-20 周二","03-21 周三","03-22 周四","03-23 周五","03-24 周六","03-25 周日","03-26 周一","03-27 周二","03-28 周三","03-29 周四","03-30 周五","03-31 周六","04-01 周日","04-02 周一"],"unity1":"kWh","maxData2":3223.69,"yData":[{"name":"发电量","value":[406.62,378.38,841.12,3394.19,3456.6,2517.49,2402.4,3467.77,3397.42,1958.87,924.12,704.4,1089.77,1024.22,371.14]},{"name":"收益","value":[356.66,325.92,724.67,3146.31,3210.67,2344.54,2165.32,3223.69,3127.78,1700.92,719.4,555.39,844.17,794.05,283.39]}],"end":"2018-04-02","unity2":"元","maxData1":3467.77},"msg":"查询成功"});
Mock.mock("/monitor/curveSearchDate.do",{"code":100,"body":"2017-10-11"});
Mock.mock("/monitor/plantStatus.do",{"code":"100","body":{"totalPowerUnit":"度","standby":0,"totalPrice":3163622.76,"break":0,"totalPriceUnit":"元","profitDayUnit":"元","genDay":116388.3,"fault":0,"profitDay":94390.89,"gen":10,"unit":"座","time":1517996306983,"genDayUnit":"度","totalPower":3900891.22},"msg":"查询成功"});
Mock.mock("/monitor/fuzzySearchPlant.do",{"body":{"plantList":[{"plantId|+1":1,"plantName":"某某电站","singlePlantType|1":[1,2,3]},{"plantId|+1":1,"plantName":"某某某电站","singlePlantType|1":[1,2,3]}]},"code":"100","msg":"查询成功！"});
Mock.mock("/monitor/getPlantIncome.do",{"code":"100","body":{"historyEnergy":{"start":"2018-03-06","xData":["03-06 周二","03-07 周三","03-08 周四","03-09 周五","03-10 周六","03-11 周日","03-12 周一"],"unity1":"度","maxData2":323.18,"yData":[{"type":"bar","name":"发电量","value":[138.19,156.27,391.09,398.49,373.83,335.81,125.03]},{"type":"value","name":"收益","value":[112.07,126.73,317.17,323.18,303.18,272.34,101.4]}],"end":"2018-03-12","unity2":"元","maxData1":398.49},"palntRank":"-1.3小时","PPR":"-1.3度"},"msg":null});
Mock.mock("/monitor/getPlantPower.do",{"code":100,"body":{"curData2":5175,"curTime":"12:15","unit":"kw","xData":["6:00","6:05","6:10","6:15","6:20","6:25","6:30","6:35","6:40","6:45","6:50","6:55","7:00","7:05","7:10","7:15","7:20","7:25","7:30","7:35","7:40","7:45","7:50","7:55","8:00","8:05","8:10","8:15","8:20","8:25","8:30","8:35","8:40","8:45","8:50","8:55","9:00","9:05","9:10","9:15","9:20","9:25","9:30","9:35","9:40","9:45","9:50","9:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00"],"yData2":[0,143,284,423,560,695,828,959,1088,1215,1340,1463,1584,1703,1820,1935,2048,2159,2268,2375,2480,2583,2684,2783,2880,2975,3068,3159,3248,3335,3420,3503,3584,3663,3740,3815,3888,3959,4028,4095,4160,4223,4284,4343,4400,4455,4508,4559,4608,4655,4700,4743,4784,4823,4860,4895,4928,4959,4988,5015,5040,5063,5084,5103,5120,5135,5148,5159,5168,5175,5180,5183,5184,5183,5180,5175,5168,5159,5148,5135,5120,5103,5084,5063,5040,5015,4988,4959,4928,4895,4860,4823,4784,4743,4700,4655,4608,4559,4508,4455,4400,4343,4284,4223,4160,4095,4028,3959,3888,3815,3740,3663,3584,3503,3420,3335,3248,3159,3068,2975,2880,2783,2684,2583,2480,2375,2268,2159,2048,1935,1820,1703,1584,1463,1340,1215,1088,959,828,695,560,423,284,143,0],"yData1":[0,100,200,300,350,360,370,400,410,420,430,440,450,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}});
Mock.mock("/monitor/plantStatusPower.do",{"code":"100","body":{"activePowerUnit":"KW","type":0,"capacityUnit":"KW","status":"正常发电中","capacity":70.2,"activePower":52.15},"msg":null});
Mock.mock("/monitor/singlePlantDistribution.do",{"code":"100","body":{"contribution":[{"unit":"kg","name":"CO²减排","value":17324.86},{"unit":"棵","name":"等效植树","value":950},{"unit":"kg","name":"节约标准煤","value":7020.3}]},"msg":null});
Mock.mock("/monitor/singlePlantStatus.do",{"code":"100","body":{"type":4,"status":"异常"},"msg":null});
Mock.mock("/monitor/getPlantName.do",{"code":"100","body":{"name":"xxx电站"},"msg":""});
Mock.mock("/monitor/getBMSList.do",{"code":"100","body":{"data|10":[],"recordsTotal":0,"recordsFiltered":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getPCSList.do",{"code":"100","body":{"data|10":[{"id|+1":51,"name":"@first","power":1475.66,"doe":"87546","deviceType":9,"type|1":[0,1,2,3],"status|1":["正常","待机","故障"]}],"recordsTotal":100,"recordsFiltered":0},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getMeterList.do",{"code":"100","body":{"data|10":[{"id|+1":41,"name":"@first","neq":1475.66,"peq":14662.23,"power":23.229,"deviceType":3,"type|1":[0,1,2,3],"status|1":["发电","待机","放电","故障"]}],"recordsTotal":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getBoxChangeList.do",{"code":"100","body":{"data|10":[{"id|+1":41,"name":"@first","voltage":220,"activePower":1234,"deviceType":12,"type|1":[0,1,2,3],"status|1":["发电","待机","放电","故障"]}],"recordsTotal":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getEnviroDetectorList.do",{"code":"100","body":{"data|10":[{"id|+1":41,"name":"@first","itr":1234,"deviceType":13,"type|1":[0,1,2,3],"status|1":["发电","待机","放电","故障"]}],"recordsTotal":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getInverterList.do",{"code":"100","body":{"data|10":[{"id|+1":11,"name":"@first","power":1475.66,"genDay":14662.23,"deviceType":2,"type|1":[0,1,2,3],"status|1":["充电","待机","放电","故障"]}],"recordsTotal":0,"recordsFiltered":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getCenInverterList.do",{"code":"100","body":{"data|10":[{"id|+1":1,"name":"@first","power":1475.66,"genDay":14662.23,"deviceType":1,"type|1":[0,1,2,3],"status|1":["充电","待机","放电","故障"]}],"recordsTotal":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getConfBoxList.do",{"code":"100","body":{"data|10":[{"id|+1":21,"name":"@first","voltage":220,"elecCurrent":112.23,"deviceType":11,"type|1":[0,1,2,3,4],"status|1":["充电","待机","放电","断连","故障"]}],"recordsTotal":0,"recordsFiltered":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/getCollectorList.do",{"code":"100","body":{"data|10":[{"id|+1":31,"name":"@first","deviceType":5,"type|1":[0,1,2,3],"status|1":["发电","待机","断连","故障"]}],"recordsTotal":100,"recordsFiltered":100},"msg":{"errorType":"1001","message":""}});
Mock.mock("/monitor/listBat.do",{"code":100,"body":{"data":[{"batName":"电池簇1","status":1,"id":1,"voltage":1},{"batName":"电池簇2","status":2,"id":2,"voltage":2},{"batName":"电池簇3","status":3,"id":3,"voltage":3},{"batName":"电池簇4","status":4,"id":4,"voltage":4},{"batName":"电池簇5","status":1,"id":5,"voltage":5},{"batName":"电池簇6","status":4,"id":6,"voltage":6}],"recordsFiltered":6,"recordsTotal":6},"msg":""});
Mock.mock("/monitor/getStoList.do",{"code":100,"body":{"plantsInfo":[{"capacity":"93","charToday":"1221","disCharToday":"200","addr":"成都市环球中心","name":"环球电站1","plantType":"分布式","soc":"1","singlePlantType":2,"status":"1","sysEfficiency":"60%","weather":"/images/weather/yin.png","id":21},{"capacity":"93","charToday":"1221","disCharToday":"200","singlePlantType":2,"addr":"成都市环球中心","name":"环球电站2","plantType":"分布式","soc":"1","status":"1","sysEfficiency":"60%","weather":"/images/weather/qing.png","id":22}],"draw":"","recordsFiltered":2,"recordsTotal":2}});
Mock.mock("/monitor/getOptStoList.do",{"code":"100","body":{"data":[{"batCapacity":"1","charToday":"1","contact":"王海森","genToday":"1","plantAddr":"成都市武侯区","plantName":"武侯电站","singlePlantType":3,"disCharToday":"1","power":"100","soc":"10%","status":"0","userTel":"18780181347","weather":"/images/weather/duoyun.png","id":1},{"batCapacity":"1","charToday":"1","singlePlantType":3,"contact":"王海森","genToday":"1","plantAddr":"成都市武侯区","disCharToday":"1","plantName":"武侯电站","power":"100","soc":"10%","status":"1","userTel":"18780181347","weather":"/images/weather/duoyun.png","id":2}],"draw":"","recordsFiltered":2,"recordsTotal":2},"msg":"测试内容mxdk"});
Mock.mock("/monitor/getElectricityProfit.do",{"code":100,"body":{"end":"2018","start":"2018","unity1":"度","unity2":"元","xData":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"yData":[{"name":"放电量","type":"bar","value":[10,20,15,30,23,40,25,23,40,18,11,30]},{"name":"发电量","type":"bar","value":[16,20,15,20,43,40,55,23,60,18,51,30]},{"name":"充电量","type":"bar","value":[16,20,15,20,43,40,55,23,60,18,51,30]},{"name":"收益","type":"line","value":[116,220,150,90,83,30,155,123,160,118,151,230]}]}});
Mock.mock("/monitor/getTotalPhotovoltaic.do",{"code":100,"body":{"totalCap":"100.58","totalCapUnit":"kwh","totalElectricity":"2000","totalElectricityUnit":"kwh","totalGen":"3000","totalGenUnit":"kwh","totalPhoCap":"70.05","totalPhoCapUnit":"kw"}});
Mock.mock("/monitor/getTodayChargeEle.do",{"code":100,"body":{"charge":"100","chargeUnit":"kwh","disCharge":"300","disChargeUnit":"kwh","genDay":"500","genUnit":"kwh","abnormal":100,"break":"10","fault":"23","standby":1,"gen":50,"time":1521098908382}});
Mock.mock("/monitor/getPlantOpen.do",{"body":[{"break":0,"deviceNum":3,"fault":0,"image":"/images/banner1.png","location":["34.7202921520","116.5657567978"],"normal":3,"powerCurve":{"xData":["12",2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"yData":[{"type":"line","unit":"千瓦","name":"充放电功率","value":[-145,158,22,356,235,145,247,23,486,256,-200,159,400,257,87,345,45,47,123,-45,-67,187]},{"type":"line","unit":"千瓦","name":"电网功率","value":[125,215,-13,251,264,189,102,345,192,30,478,25,-215,313,151,264,189,-132,345,92,30,-78]},{"type":"line","unit":"千瓦","name":"用电功率","value":[458,0,200,100,304,258,1,-300,-247,20,456,325,300,478,54,-100,189,102,345,192,-30,-178]}]},"standby":0}],"code":"100","msg":1});
Mock.mock("/monitor/getPlantOpen.do?tokenId=410792247517384704",{"body":[{"break":0,"deviceNum":3,"fault":0,"image":"/images/banner1.png","location":["34.7202921520","116.5657567978"],"normal":3,"powerCurve":{"unit":"千瓦","xData":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"yData":[{"type":"line","name":"充放电功率","unit":"千瓦","value":[-145,158,22,356,235,145,247,23,486,256,-200,159,400,257,87,345,45,47,123,-45,-67,187]},{"type":"line","unit":"千瓦","name":"电网功率","value":[125,215,-13,251,264,189,102,345,192,30,478,25,-215,313,151,264,189,-132,345,92,30,-78]},{"type":"line","unit":"千瓦","name":"用电功率","value":[458,0,200,100,304,258,1,-300,-247,20,456,325,300,478,54,-100,189,102,345,192,-30,-178]}]},"standby":0}],"code":"100","msg":1});
Mock.mock("/monitor/getProSearchDate.do",{"code":"100","body":"2018-03-07","msg":"查询成功"});
Mock.mock("/monitor/getSingleElecPro.do",{"code":100,"body":{"end":"2018","start":"2018","unity1":"度","unity2":"元","xData":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"yData":[{"name":"放电量","type":"bar","value":[10,20,15,30,23,40,25,23,40,18,11,30]},{"name":"发电量","type":"bar","value":[16,20,15,20,43,40,55,23,60,18,51,30]},{"name":"充电量","type":"bar","value":[16,20,15,20,43,40,55,23,60,18,51,30]},{"name":"收益","type":"line","value":[116,220,150,90,83,30,155,123,160,118,151,230]}]}});
Mock.mock("/monitor/getSinglePowerCurve.do",{"code":100,"body":{"unit":"千瓦","xData":[1,2,3,4,5,6,7,8,9,10],"yData":[{"name":"充放电功率","type":"line","value":[100,150,-20,140,80,69,-30,59,110,128]},{"name":"发电功率","type":"line","value":[80,120,10,160,48,90,29,38,100,148]}]}});
Mock.mock("/monitor/getWeatherInfo.do",{"code":"100","body":[{"bgPictureUrl":"/images/weather/weather_bg.png","id":1198,"weather":"大雨转小雨","dayPictureUrl":"/images/weather/dayu.png","wind":"东北风3-4级","temperature":"12 ~ 1","currentTemperature":"4","plantId":1,"dataTime":1521165600812},{"id":1199,"weather":"多云转中雨","dayPictureUrl":"/images/weather/duoyun.png","wind":"东风微风","temperature":"13 ~ 4","currentTemperature":null,"plantId":1,"dataTime":1521216000000},{"id":1200,"weather":"小雨转阴","dayPictureUrl":"/images/weather/xiaoyu.png","wind":"东北风微风","temperature":"10 ~ 8","currentTemperature":null,"plantId":1,"dataTime":1521302400000}],"msg":null});
Mock.mock("/monitor/getPowerCap.do",{"code":100,"body":{"batCap":"200","batCapUnit":"度","curCap":"158","curCapUnit":"度","phoCap":"300","phoCapUnit":"千瓦","power":"200","powerUnit":"千瓦"}});
Mock.mock("/monitor/getSingleOptProfit.do",{"code":100,"body":{"chargeDay":"200980","chargeDayUnit":"度","dischargeDay":"30007809","dischargeDayUnit":"度","genDay":"656","genDayUnit":"度","profitDay":"1654","profitDayUnit":"元","profitTotal":"260461","profitTotalUnit":"元"}});
Mock.mock("/monitor/getSingleEneProfit.do",{"code":100,"body":{"chargeDay":"16541","chargeDayUnit":"度","dischargeDay":"450401","dischargeDayUnit":"度","profitDay":"4640","profitDayUnit":"元","profitTotal":"68514","profitTotalUnit":"元"}});
Mock.mock("/monitor/getBatCap.do",{"code":100,"body":{"batCap":"798","batCapUnit":"度","curCap":"643","curCapUnit":"度"}});
Mock.mock("/monitorwx/getUserInfo.do",{"code":100,"body":{"orgName":"科亚机电有限责任公司","orgCode":"X73950","userTel":"18782275148","userName":"阿娇"},"msg":""});
Mock.mock("/monitorwx/updateValueOfGuid.do",{"body":"执行成功","code":100,"msg":"0.0177"});
Mock.mock("/monitorwx/deviceDetail.do",{"code":"100","body":{"basicMsg":{"connTime":"2017-12-22","power":"36.0千瓦","sn":"ERTERTFDSG","type":"0","brand":"华为","modal":"SUN2000-36kTL","status":"发电中"},"data":{"deviceType":2,"showData":[[{"name":"PV1输入电压","value":"594.1 V"},{"name":"PV1输入电流","value":"0.1 A"},{"name":"PV2输入电压","value":"594.1 V"},{"name":"PV2输入电流","value":"0.1 A"},{"name":"PV3输入电压","value":"614.1 V"},{"name":"PV3输入电流","value":"0.1 A"},{"name":"PV4输入电压","value":"614.1 V"},{"name":"PV4输入电流","value":"0.1 A"},{"name":"PV5输入电压","value":"603.8 V"},{"name":"PV5输入电流","value":"0.1 A"},{"name":"PV7输入电压","value":"585 V"},{"name":"PV7输入电流","value":"0.1 A"},{"name":"MPPT1输入总功率","value":"0.07 kW"},{"name":"MPPT2输入总功率","value":"0.07 kW"},{"name":"MPPT3输入总功率","value":"0.04 kW"},{"name":"MPPT4输入总功率","value":"0.03 kW"}],[{"name":"电网AB线电压","value":"386.2 V"},{"name":"电网BC线电压","value":"388.8 V"},{"name":"电网CA线电压","value":"387.6 V"},{"name":"电网A相电压","value":"223.2 V"},{"name":"电网B相电压","value":"224.6 V"},{"name":"电网C相电压","value":"223.9 V"},{"name":"电网A相电流","value":"0 A"},{"name":"电网B相电流","value":"0 A"},{"name":"电网C相电流","value":"0 A"},{"name":"电网频率","value":"50.02 Hz"},{"name":"功率因数","value":"0 "},{"name":"当前小时发电量","value":"0.03 kWh"},{"name":"当前日发电量","value":"0.03 度"},{"name":"当前月发电量","value":"137.01 kWh"},{"name":"当前年发电量","value":"137.01 kWh"},{"name":"总发电量","value":"1413.5 度"}],[{"name":"逆变器效率","value":"76.97 %"},{"name":"机内温度","value":"5 ℃"},{"name":"绝缘阻抗值","value":"2.27 MΩ"},{"name":"闭锁状态","value":"1 "},{"name":"零电压穿越保护状态","value":"2040 "},{"name":"低电压穿越保护状态","value":"1020 "},{"name":"孤岛效应保护状态","value":"510 "},{"name":"逆变并网状态","value":"1 "},{"name":"当天峰值有功功率","value":"0.1 kW"},{"name":"有功功率","value":"0.08 kW"},{"name":"无功功率","value":"0 kVar"},{"name":"输入总功率","value":"0.11 kW"},{"name":"逆变器开机时间","value":"1515140736 Sec"},{"name":"逆变器关机时间","value":"1515078656 Sec"}]]},"monitor":{"setBtns":[{"guid":"VX217503532_YK_0","value":"0","tipTitle":"远程开机","tipContent":"开机后逆变器将开始发电，请谨慎操作！你将对操作造成的一切后果承担所有责任","label":"开机"},{"guid":"VX217503532_YK_1","value":"1","tipTitle":"远程关机","tipContent":"关机后逆变器将停止发电，请谨慎操作！你将对操作造成的一切后果承担所有责任","label":"关机"}],"ykGuid":null,"setDatas":[],"ykValue":null},"status":[{"name":"升级失败","value":"0"},{"name":"Flash故障","value":"0"},{"name":"逆变电路异常","value":"0"},{"name":"残余电流异常","value":"0"},{"name":"温度过高","value":"0"},{"name":"绝缘阻抗低","value":"0"},{"name":"直流电路异常","value":"0"},{"name":"DC输入电压高","value":"0"},{"name":"DC输入电压高","value":"0"},{"name":"DC输入电压高","value":"0"},{"name":"DC输入电压高","value":"0"},{"name":"接地异常","value":"0"},{"name":"组串1异常","value":"0"},{"name":"组串2异常","value":"0"},{"name":"组串3异常","value":"0"},{"name":"组串4异常","value":"0"},{"name":"组串5异常","value":"0"},{"name":"组串6异常","value":"0"},{"name":"组串7异常","value":"0"},{"name":"组串8异常","value":"0"}]},"msg":null});
Mock.mock("/monitorwx/device.do",{"body":[{"groupData":[{"deviceType":1,"name":"逆变器004","devicePower":"NaN","type":0,"deviceId":"57","status":0},{"deviceType":1,"name":"逆变器003","devicePower":"NaN","type":1,"deviceId":"52","status":0}],"groupName":"集中式逆变器"},{"groupData":[{"deviceType":2,"name":"36K-303","devicePower":"0kWh","type":2,"deviceId":"55","status":1},{"deviceType":2,"name":"36K-302","devicePower":"0kWh","type":3,"deviceId":"54","status":1},{"deviceType":2,"name":"36K-301-5235695","devicePower":"0kWh","type":4,"deviceId":"53","status":1},{"deviceType":2,"name":"36K-101","devicePower":"22.13kWh","type":0,"deviceId":"43","status":0},{"deviceType":2,"name":"36K-204","devicePower":"21.9kWh","type":0,"deviceId":"51","status":0},{"deviceType":2,"name":"36K-203","devicePower":"22.22kWh","type":0,"deviceId":"50","status":0},{"deviceType":2,"name":"36K-202","devicePower":"14.93kWh","type":0,"deviceId":"49","status":0},{"deviceType":2,"name":"36K-201","devicePower":"22.3kWh","type":2,"deviceId":"48","status":0},{"deviceType":2,"name":"36K-102","devicePower":"14.43kWh","type":0,"deviceId":"44","status":0},{"deviceType":2,"name":"36K-104","devicePower":"21.85kWh","type":1,"deviceId":"46","status":0},{"deviceType":2,"name":"36K-103","devicePower":"22.59kWh","type":0,"deviceId":"45","status":0}],"groupName":"逆变器"},{"groupData":[{"deviceId":5,"devicePower":"5MW","deviceType":3,"type":2,"name":"0001采集器","status":0},{"deviceType":5,"name":"采集器004","devicePower":"NaN","type":0,"deviceId":"2","status":0},{"deviceType":5,"name":"采集器004","devicePower":"NaN","type":3,"deviceId":"2","status":0},{"deviceType":5,"name":"采集器004","devicePower":"NaN","type":4,"deviceId":"2","status":0},{"deviceType":5,"name":"采集器005","devicePower":"NaN","type":1,"deviceId":"55","status":0}],"groupName":"采集器"},{"groupData":[{"deviceType":3,"name":"电表004","devicePower":"NaN","type":0,"deviceId":"2","status":0},{"deviceType":3,"name":"电表004","devicePower":"NaN","type":2,"deviceId":"2","status":0},{"deviceType":3,"name":"电表004","devicePower":"NaN","type":4,"deviceId":"2","status":0},{"deviceType":3,"name":"电表004","devicePower":"15.23kW","type":3,"deviceId":"2","status":0}],"groupName":"电表"},{"groupData":[{"deviceType":10,"name":"BMS004","devicePower":"NaN","type":0,"deviceId":"2","status":0},{"deviceType":10,"name":"BMS005","devicePower":"15.23kW","type":3,"deviceId":"2","status":0},{"deviceType":10,"name":"BMS005","devicePower":"15.23kW","type":2,"deviceId":"2","status":0}],"groupName":"BMS"},{"groupData":[{"deviceType":11,"name":"汇流箱01","devicePower":"NaN","type":0,"deviceId":"2","status":0},{"deviceType":11,"name":"汇流箱02","devicePower":"15.23kW","type":3,"deviceId":"2","status":0},{"deviceType":11,"name":"汇流箱02","devicePower":"15.23kW","type":2,"deviceId":"2","status":0}],"groupName":"汇流箱"},{"groupData":[{"deviceType":9,"name":"PCS004","devicePower":"NaN","type":0,"deviceId":"2","status":0},{"deviceType":9,"name":"PCS005","devicePower":"15.23kW","type":2,"deviceId":"2","status":0},{"deviceType":9,"name":"PCS005","devicePower":"15.23kW","type":1,"deviceId":"2","status":0},{"deviceType":9,"name":"PCS005","devicePower":"15.23kW","type":0,"deviceId":"2","status":0},{"deviceType":9,"name":"PCS005","devicePower":"15.23kW","type":3,"deviceId":"2","status":0}],"groupName":"PCS"},{"groupData":[{"deviceType":12,"name":"XB004","devicePower":"NaN","type":0,"deviceId":"2","status":0},{"deviceType":12,"name":"XB45","devicePower":"15.23kW","type":2,"deviceId":"2","status":0},{"deviceType":12,"name":"XB0051","devicePower":"15.23kW","type":1,"deviceId":"2","status":0},{"deviceType":12,"name":"XB0305","devicePower":"15.23kW","type":0,"deviceId":"2","status":0},{"deviceType":12,"name":"PCS005","devicePower":"15.23kW","type":3,"deviceId":"2","status":0}],"groupName":"箱变"},{"groupData":[{"deviceType":13,"name":"HJ004","devicePower":"NaN","type":0,"deviceId":"2","status":4},{"deviceType":13,"name":"HJ45","devicePower":"15.23kW","type":2,"deviceId":"2","status":2},{"deviceType":13,"name":"HJ0051","devicePower":"15.23kW","type":1,"deviceId":"2","status":1},{"deviceType":13,"name":"HJ0305","devicePower":"15.23kW","type":0,"deviceId":"2","status":0},{"deviceType":13,"name":"HJS005","devicePower":"15.23kW","type":3,"deviceId":"2","status":3}],"groupName":"箱变"}],"code":100,"msg":"0.0177"});
Mock.mock("/monitorwx/getList.do",{"code":100,"body":[{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"524","genTodayUnit":"kW","name":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"1","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"147","genTodayUnit":"kW","name":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"2","status":"1","energyStorage":"100","energyStorageUnit":"kWh","type":"1","soc":"89%","plantType":1},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","phoCapUnit":"kw","type":"6","soc":"89%","plantType":1},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444","genTodayUnit":"kW","name":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"4","status":"3","energyStorage":"100","energyStorageUnit":"kWh","type":"5","phoCap":"120","phoCapUnit":"kw","soc":"89%","plantType":1},{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"524","genTodayUnit":"kW","name":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"1","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"147","genTodayUnit":"kW","name":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"2","status":"1","energyStorage":"100","energyStorageUnit":"kWh","type":"1","soc":"89%","plantType":1},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","phoCapUnit":"kw","type":"6","soc":"89%","plantType":1},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444","genTodayUnit":"kW","name":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"4","status":"3","energyStorage":"100","energyStorageUnit":"kWh","type":"5","phoCap":"120","phoCapUnit":"kw","soc":"89%","plantType":1},{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"524","genTodayUnit":"kW","name":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"1","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"147","genTodayUnit":"kW","name":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"2","status":"1","energyStorage":"100","energyStorageUnit":"kWh","type":"1","soc":"89%","plantType":1},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","phoCapUnit":"kw","type":"6","soc":"89%","plantType":1},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444","genTodayUnit":"kW","name":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"4","status":"3","energyStorage":"100","energyStorageUnit":"kWh","type":"5","phoCap":"120","phoCapUnit":"kw","soc":"89%","plantType":1},{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"524","genTodayUnit":"kW","name":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"1","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"147","genTodayUnit":"kW","name":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"2","status":"1","energyStorage":"100","energyStorageUnit":"kWh","type":"1","soc":"89%","plantType":1},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","phoCapUnit":"kw","type":"6","soc":"89%","plantType":1},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444","genTodayUnit":"kW","name":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"4","status":"3","energyStorage":"100","energyStorageUnit":"kWh","type":"5","phoCap":"120","phoCapUnit":"kw","soc":"89%","plantType":1},{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"524","genTodayUnit":"kW","name":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"1","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"147","genTodayUnit":"kW","name":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"2","status":"1","energyStorage":"100","energyStorageUnit":"kWh","type":"1","soc":"89%","plantType":1},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","phoCapUnit":"kw","type":"6","soc":"89%","plantType":1},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444","genTodayUnit":"kW","name":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"4","status":"3","energyStorage":"100","energyStorageUnit":"kWh","type":"5","phoCap":"120","phoCapUnit":"kw","soc":"89%","plantType":1}]});
Mock.mock("/monitorwx/getMapPlant.do",{"code":"100","body":{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","unit":"kW","phoCapUnit":"kw","type":2,"soc":"89%","plantType":3},"msg":null});
Mock.mock("/monitorwx/singlePlant.do",{"code":"100","body":{"genUToday":"度","proUToday":"元","proTotal":2792.7,"proToday":0.08,"genTotal":3443.53,"genUTotal":"度","genToday":0.1,"proUTotal":"元","disToday":100,"disUYoday":"度","disTotal":3400.23,"soc":"26%","chargeTotal":15241.25},"msg":null});
Mock.mock("/monitorwx/singleGenCurve.do",{"code":"100","body":{"maxValue":204.82,"xData":["12-27","12-28","12-29","12-30","12-31","01-01","01-02","01-03","01-04","01-05"],"yData":[{"unit":"度","name":"发电量","value":[178.56,191.58,139.98,126.07,204.82,183.65,85.6,45.2,0.5,0.1]}]},"msg":"查询成功！"});
Mock.mock("/monitorwx/static.do",{"code":"100","body":{"plantType":0,"contribution":[{"unity":"kg","name":"CO²减排","value":1667.82},{"unity":"棵","name":"等效植树","value":91},{"unity":"kg","name":"节约标准煤","value":675.83}],"plantStatus":{"gen":"0","standby":"1","totalPrice":"2792.63元","break":"0","fault":"0","abnormal":"1","totalPower":"3443.43kWh"},"totalCapacity":"70541121.2","companyName":"科亚机电有限责任公司","deviceDis":{"partCount":"260块","inverterCount":"2台","plantArea":"750平方米"},"plantTotal":1,"plantScale":[{"value":6,"name":"光伏电站"},{"value":8,"name":"光储电站"}],"sizeAndIncome":[{"unity":"度","name":"储能容量","value":166715},{"unity":"度","name":"光伏容量","value":9154115.3},{"unity":"元","name":"累计收益","value":654175.83}]},"msg":null});
Mock.mock("/monitorwx/genCurve.do",{"code":"100","body":{"start":"2017-12-26","xData":["12-26","12-27","12-28","12-29","12-30","12-31","01-01","01-02","01-03","01-04"],"unity1":"kWh","yData":[{"name":"发电量","value":[198.69,178.56,191.58,139.98,126.07,204.82,183.65,85.6,45.2,0.5]}],"end":"2018-01-04","maxData1":204.82},"msg":"查询成功！"});
Mock.mock("/monitorwx/powerCurve.do",{"code":"100","body":{"yData1":["0","0","0.07","0.28","0.57","0.87","1.19","1.64","2.18","2.79","3.26","3.98","4.65","5.34","6","6.82","7.65","8.3","9.15","10.25","11.55","12.37","12.94","14.14","15.35","15.97","17.41","18.88","20","21.36","23.09","25.3","26.99","28.83","31.42","32.07","33.13","34.87","37.94","39.53","43.87","43.72","43.7","45.03","46.06","43.49","44.91","49.17","48.53","48.58","52.5","52.09","53.51","51.66","55.13","58.24","57.26","60.8","56.77","57.7","56.07","61.65","53.58","61.88","60.35","58.19","26.09","60.94","59.38","64.43","68.54","61.82","63.02","66.22","53.85","60.04","65.91","60.83","55.35","61.72","58.91","55.95","60.27","58.05","61.08","59.94","56.8","58.15","58.54","55.41","55.32","52.03","55.54","51.38","47.84","47.67","50.45","47.85","46.53","46.95","43.85","42.85","39.1","40.9","38.67","36.88","37.63","37.34","35.68","34.22","33.02","32.16","31.29","29.65",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"xData":["06:30","06:35","06:40","06:45","06:50","06:55","07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","08:55","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00","18:05","18:10","18:15","18:20"],"minValue":0,"unit":"千瓦","curPower":"88000","maxValue":0.171,"curData2":"89.11","curTime":"15:55","yData2":["0.0","3.834","7.614","11.339","15.01","18.627","22.189","25.697","29.15","32.55","35.894","39.185","42.42","45.602","48.729","51.802","54.82","57.784","60.694","63.549","66.35","69.096","71.789","74.426","77.01","79.538","82.013","84.433","86.799","89.11","91.367","93.57","95.718","97.812","99.851","101.836","103.767","105.643","107.465","109.233","110.946","112.605","114.209","115.759","117.255","118.696","120.083","121.415","122.693","123.917","125.086","126.201","127.261","128.268","129.219","130.117","130.96","131.748","132.482","133.162","133.788","134.359","134.875","135.338","135.746","136.099","136.398","136.643","136.833","136.969","137.051","137.078","137.051","136.969","136.833","136.643","136.398","136.099","135.746","135.338","134.875","134.359","133.788","133.162","132.482","131.748","130.96","130.117","129.219","128.268","127.261","126.201","125.086","123.917","122.693","121.415","120.083","118.696","117.255","115.759","114.209","112.605","110.946","109.233","107.465","105.643","103.767","101.836","99.851","97.812","95.718","93.57","91.367","89.11","86.799","84.433","82.013","79.538","77.01","74.426","71.789","69.096","66.35","63.549","60.694","57.784","54.82","51.802","48.729","45.602","42.42","39.185","35.894","32.55","29.15","25.697","22.189","18.627","15.01","11.339","7.614","3.834","0.0"]},"msg":null});
Mock.mock("/monitorwx/plantMap.do",{"code":"100","body":[{"latitude":"34.7202921520","plantId":1,"type":0,"longitude":"116.5657567978"},{"latitude":"36.7202921520","plantId":2,"type":1,"longitude":"113.5657567978"}],"msg":null});
Mock.mock("/monitorwx/singleDynamic.do",{"code":"100","body":{"singlePlantType":0,"addr":"江苏省徐州市丰县常店镇马楼村南方向","capacity":"70.2KW","weather":{"dayPictureUrl":"/images/weather/duoyun.png","weather":"多云"},"deviceStatus":{"gen":3,"standby":0,"break":0,"fault":0,"abnormal":1},"deviceTotal":3,"deviceDis":{"area":"null平方米","types":[1,2],"plants":["1"],"module":"260块","inverter":"0台"},"contribution":[{"unit":"kg","name":"CO²减排","value":1668.32},{"unit":"棵","name":"等效植树","value":91},{"unit":"kg","name":"节约标准煤","value":676.03}],"componentModule":[{"unit":"台","name":"PCS","value":166832},{"unit":"块","name":"电池簇","value":915412},{"unit":"平方米","name":"占地面积","value":67641.03}],"img":["/images/banner1.png","/images/banner2.png","/images/banner3.png","/images/banner4.png"],"location":["34.7202921520","116.5657567978"],"plantName":"徐州丰县电动车产业园","contacts":"科亚机电","contactsTel":"17705228629","plantStatus":0},"msg":null});
Mock.mock("/monitorwx/dynamic.do",{"code":"100","body":{"genPro":{"genUToday":"度","proTotal":7112792.63,"proUToday":"元","genTotal":72443.43,"genUTotal":"度","proToday":59876.1,"genToday":12253.126,"proUTotal":"元","disUtoday":"度","disTotal":6845112.67,"disToday":84546423111.69}},"msg":null});
Mock.mock("/monitorwx/searchPlantByKeyword.do",{"code":100,"body":[{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"524","genTodayUnit":"kW","name":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"1","unit":"kW","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"147","genTodayUnit":"kW","name":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"2","status":"1","energyStorage":"100","energyStorageUnit":"kWh","type":"1","soc":"89%","plantType":2},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"123","genTodayUnit":"kW","name":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"3","status":"2","energyStorage":"100","energyStorageUnit":"kWh","phoCap":"120","phoCapUnit":"kw","type":"6","soc":"89%","plantType":3},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444","genTodayUnit":"kW","name":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun_1@2x.png","weather":"晴天","plantId":"4","status":"3","energyStorage":"100","energyStorageUnit":"kWh","type":"5","phoCap":"120","phoCapUnit":"kw","soc":"89%","plantType":3}]});
Mock.mock("/monitorwx/plantInfo.do",{"code":"100","body":[{"latitude":"34.7202921520","plantId":1,"type":0,"longitude":"116.5657567978"},{"latitude":"36.7202921520","plantId":2,"type":1,"longitude":"113.5657567978"}],"msg":null});
Mock.mock("/monitorwx/singlePowerCurve.do",{"code":"100","body":{"xData":["06:30","06:35","06:40","06:45","06:50","06:55","07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","08:55","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00","18:05","18:10","18:15","18:20"],"data":{"value":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0.01","0.01","0.01","0.04","0.04","0.11","0.09","0.08","0.09","0.14","0.2","0.2","0.24","0.24",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"unit":"千瓦","name":"功率"},"curPower":55615,"phPower":24512,"enStorage":12316,"maxValue":0.24399999,"capacity":"70.2千瓦","curData2":"89.11","curTime":"15:55","unit":"kW","yData1":["0","0","0.07","0.28","0.57","0.87","1.19","1.64","-2.18","2.79","3.26","3.98","4.65","5.34","6","6.82","7.65","8.3","9.15","-10.25","11.55","12.37","12.94","14.14","15.35","15.97","17.41","18.88","20","21.36","23.09","25.3","26.99","28.83","31.42","32.07","33.13","34.87","-37.94","39.53","43.87","-43.72","43.7","45.03","46.06","43.49","44.91","49.17","48.53","48.58","52.5","52.09","53.51","51.66","55.13","58.24","57.26","60.8","56.77","57.7","56.07","61.65","53.58","61.88","60.35","58.19","26.09","60.94","59.38","64.43","68.54","61.82","63.02","66.22","53.85","60.04","65.91","60.83","55.35","61.72","58.91","55.95","60.27","58.05","61.08","59.94","56.8","58.15","58.54","55.41","55.32","52.03","55.54","51.38","47.84","47.67","50.45","47.85","46.53","46.95","43.85","42.85","39.1","40.9","38.67","36.88","37.63","37.34","35.68","34.22","33.02","32.16","31.29","29.65",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"msg":null});
Mock.mock("/org/getOrgTree.do",{"code":"100","body":[{"orgType":"0","children":[{"orgType":"0","iconSkin":"icon01","children":[{"orgType":"0","iconSkin":"icon01","children":[],"icon":"/images/setting/file2.png","name":"科亚机电有限责任公司","pId":3,"id":2},{"orgType":"1","iconSkin":"icon01","children":[],"icon":"/images/setting/file2.png","name":"研发部","pId":3,"id":7}],"icon":"/images/setting/file2.png","name":"南京合桥","pId":1,"id":3},{"orgType":"0","iconSkin":"icon01","children":[{"orgType":"0","iconSkin":"icon01","children":[],"icon":"/images/setting/file2.png","name":"销售部","pId":10,"id":11}],"icon":"/images/setting/file2.png","name":"协能2","pId":1,"id":10}],"icon":"/images/setting/file.png","name":"协能共创","pId":"0","check":"false","id":1,"open":"true"}],"msg":null});
Mock.mock("/org/getOrgInfo.do",{"code":"100","body":{"email":"admin@qq.com","loginId":"xiebiao","orgCode":"XL5535644","orgId":"6","orgName":"华南分部","status|1":[1,0],"userId":"011","userTel":"15282542260"},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/plantInfo/getCnPlantPrice.do",{"code":"100","body":[{"name":"光伏电站0.811电价","id":1},{"name":"光伏电站1.0电价","id":3},{"name":"2018年并网分布式(I类)","id":4},{"name":"2018年并网分布式(II类)","id":5},{"name":"2018年并网分布式(III类)","id":6},{"name":"2018年并网扶贫(I类)","id":7},{"name":"2018年并网扶贫(II类)","id":8},{"name":"2018年并网扶贫(III类)","id":9},{"name":"2018年并网-西藏","id":10},{"name":"2017年并网分布式(I类)","id":11},{"name":"2017年并网分布式(II类)","id":12},{"name":"2017年并网分布式(III类)","id":13},{"name":"2018年并网分布式-上海","id":14},{"name":"2018年并网分布式-北京","id":15},{"name":"2018年并网分布式-镇江","id":16},{"name":"2018年并网扶贫河北","id":17}],"msg":null});
Mock.mock("/plantInfo/getPlantPriceDetail.do",{"code":"100","body":[{"neg":"0.3","pos":0.5,"time":"10:00:00~00:59:00"},{"neg":"0.7","pos":1,"time":"01:00:00~09:59:00"}],"msg":null});
Mock.mock("/plantInfowx/plantInfo.do",{"body":{"name":"环球中心某某电站","addr":{"administrativeAddr":"四川省成都市高新区环球中心1700号","detail":"四川省成都市高新区环球中心1700号","loaction":"30.64242,104.64242","administrative":[{"name":"中国","lat":"30.64242","lng":"104.64242"},{"name":"四川省","lat":"30.64242","lng":"104.64242"},{"name":"成都市","lat":"30.65984","lng":"104.10194"},{"name":"武侯区","lat":"30.64242","lng":"104.04311"}]},"area":"123","capacity":"500","capacityUnit":"千瓦","collector":[{"id":"1","inventerNum":5,"maxNum":10,"collName":"某某某","no":"f652fs633f","serialPort":[{"spMax":5,"spId":"1","spName":"串口1","datas":[{"addr":"001","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"002","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"003","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"004","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"},{"addr":"005","devName":"aaaaa","id":"1","model":"华为SUN2000-36KTL","model_id":[0,0],"type":"组串式逆变器","type_id":"0"}]},{"spMax":3,"spId":"2","spName":"串口2"}]},{"id":"2","inventerNum":8,"maxNum":8,"no":"v54158521f"}],"owner":[{"id":"1","userName":"张三","userTel":"18782254147"},{"id":"2","userName":"李四","userTel":"18782254148"}],"pic":"/images/img_2@2x.png","price":"100","type":[123,224]},"code":100,"msg":"0.0177"});
Mock.mock("/plantInfowx/updatePlantInfo.do",{"body":"","code":100,"msg":"上传成功/失败"});
Mock.mock("/plantInfowx/uploadPhoto.do",{"body":"","code":100,"msg":"上传成功/失败"});
Mock.mock("/plantInfowx/deletePlantPhoto.do",{"body":"","code":100,"msg":"删除成功/失败"});
Mock.mock("/plantInfowx/getPlantType.do",{"body":[[{"id":123,"name":"分布式"},{"id":232,"name":"户用"},{"id":1223,"name":"集中式"}],[{"id":223,"name":"工商业屋顶"},{"id":224,"name":"村级扶贫"},{"id":225,"name":"其他"}]],"code":100,"msg":""});
Mock.mock("/plantInfowx/insertPlantInfo.do",{"body":{"plantId":"18782275148"},"code":100,"msg":"新建电站成功/失败"});
Mock.mock("/poverty/getPoorHouseholdsInfo.do",{"code":"100","body":{"completeNum":6921,"poorTotal":8157,"detailInfo":[{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"李四","number":6,"plantName":"电站B"},{"income":20414,"name":"王五","number":5,"plantName":"电站C"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"},{"income":25414,"name":"张三","number":6,"plantName":"电站A"}]},"msg":"查询成功"});
Mock.mock("/poverty/IncreaseIncome.do",{"code":"100","body":{"IncreaseIncomeNum":2141.3,"IncreaseIncomeUnit":"万元","InvestmentAmount":"3541.8万元"},"msg":"查询成功"});
Mock.mock("/poverty/getNewsList.do",{"code":"100","body":[{"abstract":"10月17日，国家能源局会同国务院扶贫办印发《下达第一批光伏扶贫项目的通知》（以下简称《通知》），下达第一批总规模516万千瓦光伏扶贫项目。","id":"1","img":"images/povertyAlleviation/photo.png","title":"国家能源局 国务院扶贫办下达第一批光伏扶贫项目","time":"2016-10-18"},{"id":"2","img":"images/povertyAlleviation/timg.jpg","title":"【正式文件】国家能源局、扶贫办印发“十三五”第一批光伏扶贫项目计划","abstract":"近日，国家能源局、国务院扶贫办联合发布《关于下达“十三五”第一批光伏扶贫项目计划的通知》，正式下发“十三五”第一批光伏扶贫项目","time":"2018-01-06"},{"id":"3","img":"images/povertyAlleviation/photo2.jpg","title":"国家能源局关于光伏扶贫电站的官方解读","abstract":"3月26日，我局与国务院扶贫办联合印发了《光伏扶贫电站管理办法》(以下简称《办法》)。","time":"2018-04-27"}],"msg":"查询成功"});
Mock.mock("/poverty/getNewsDetail.do",function (param){
        var request = param.body;
        var body =""
        var title = ""
        if(request.id ==1){
            title = "国家能源局 国务院扶贫办下达第一批光伏扶贫项目"
            body = "<p>10月17日，国家能源局会同国务院扶贫办印发《下达第一批光伏扶贫项目的通知》（以下简称《通知》），下达第一批总规模516万千瓦光伏扶贫项目。其中，村级光伏电站（含户用）共计218万千瓦，集中式地面电站共计298万千瓦，共涉及河北、山西、辽宁、吉林、江苏、安徽、江西、山东、河南、湖北、湖南、云南、陕西和甘肃14个省约2万个贫困村，可为约55万个建档立卡贫困户每年每户增收不低于3000元。</p>"+
            "<p>光伏扶贫是落实国家精准扶贫、精准脱贫战略的重要举措，有利于促进贫困人口稳收增收，有利于扩大光伏发电市场。2015年底，《中共中央国务院关于打赢脱贫攻坚战的决定》中明确提出“加快推进光伏扶贫工程，支持光伏发电设施接入电网运行，发展光伏农业”。为贯彻落实文件精神，加快推进光伏扶贫工程，2016年3月，国家发展改革委、国务院扶贫办、国家能源局、国家开发银行和农业发展银行联合印发《关于实施光伏发电扶贫工作的意见》，明确了相关政策措施：一是国家在光伏年度建设规模管理中，专门安排光伏扶贫的光伏电站建设规模；二是国家开发银行、中国农业发展银行为光伏扶贫项目提供优惠贷款，根据资金来源成本情况在央行同期贷款基准利率基础上适度下浮；三是电网企业负责投资建设光伏扶贫电站项目的电力送出工程并确保项目按月足额结算电费和领取国家补贴资金。</p>"
        }else if(request.id ==2){
            title = "【正式文件】国家能源局、扶贫办印发“十三五”第一批光伏扶贫项目计划"
            body = "<p>近日，国家能源局、国务院扶贫办联合发布《关于下达“十三五”第一批光伏扶贫项目计划的通知》，正式下发“十三五”第一批光伏扶贫项目。</p>"+
                    "<p>在地方组织编制“十三五”光伏扶贫实施方案的基础上，经国家能源局会同国务院扶贫办联合审核，471个光伏扶贫重点县中的236个县具备条件。</p>"+
                    "<p>本批下达14个省(自治区)、236个光伏扶贫重点县的光伏扶贫项目，共8689个村级电站，总装机规模4186237.852千瓦，扶持对象为14556个建档立卡贫困村的710751户建档立卡贫困户。</p>"+
                    "<p>其中山西省建设规模最大，为1029461.04千瓦;其次是河北省，建设规模615506.132千瓦;其次是青海(471600千瓦)、甘肃(428462千瓦)和内蒙古(367633千瓦)。</p>"+
                    "<img src='images/povertyAlleviation/zheshi1.jpg'>"+
                    "<img src='images/povertyAlleviation/zheshi2.jpg'>"+
                    "<img src='images/povertyAlleviation/zheshi3.jpg'>"
        }else {
            title = "国家能源局关于光伏扶贫电站的官方解读"
            body = "<p>3月26日，我局与国务院扶贫办联合印发了《光伏扶贫电站管理办法》(以下简称《办法》)。下面我就《办法》相关情况向大家做一下介绍。</p>"+
                    "<h4>一、背景情况</h4>"+
                    "<p>十八大以来，国家能源局坚决贯彻党中央决策部署，在国务院扶贫办的指导下，结合能源产业特点，积极探索发展光伏扶贫模式。2014年，启动了光伏扶贫试点工作，2015年初下达了安徽、河北、山西、宁夏、甘肃、青海等6省(区)光伏扶贫试点专项建设规模150万千瓦。2016年3月，会同国家发展改革委、国务院扶贫办等联合印发了《关于实施光伏发电扶贫工作的意见》(发改能源〔2016〕621号)，光伏扶贫在全国全面展开。2016年10月、2017年12月分两次各下达光伏扶贫专项规模516万千瓦和418万千瓦，2017年在年度规模中明确8个省共450万千瓦普通电站规模也全部用于光伏扶贫。据国务院扶贫办统计，截至2017年底，全国共有25个省(区、市)、940个县开展了光伏扶贫项目建设，累计建成规模1011万千瓦、直接惠及约3万个贫困村的164.6万户贫困户。光伏扶贫在带动群众脱贫致富、增强村集体经济实力和保障农村能源供应方面取得良好成效，为世界减贫事业贡献了中国智慧、中国方案。</p>"+
                    "<p>光伏扶贫是个新事物，实施过程中也出现了一些问题。个别地方盲目扩大光伏电站扶贫对象、一些地方打着扶贫名义要规模上项目、个别地方存在“一光了之”、“一哄而上”现象等;一些地方政府出资不到位或以项目建设单位垫资方式违规出资，一些电站建设运维质量不高，这些问题如果不及时加以解决都会影响光伏扶贫的实施效果，必须制定相关制度规范电站管理，把好事办好。</p>"+
                    "<p>2017年下半年起，国家能源局会同国务院扶贫办，在深入调研、总结经验、分析问题、征求意见的基础上，研究起草了《办法》，并征求了国家发展改革委、财政部、各省发展改革委(能源局)、扶贫办及国家电网公司、南方电网公司等有关企业的意见。根据各方反馈意见，我们对《办法》进行修改完善。今年3月26日，我局会同国务院扶贫办正式印发了《光伏扶贫电站管理办法》。</p>"+
                    "<h4>二、《办法》主要内容</h4>"+
                    "<p>《办法》主要目的是规范光伏扶贫工作实施，明确光伏扶贫电站建设运行管理要求，保障光伏扶贫实施效果，共二十条，分别对光伏扶贫的定位、定义、适用范围、对象、方式、投资、标准、建设、配套服务、验收、运行消纳、价格、补贴、收益分配、目录管理、计划管理、各方责任、企业扶贫等方面都做出了明确规定。在此着重强调以下几点：</p>"+
                    "<p>一是关于光伏扶贫定位。《办法》明确光伏扶贫是资产收益扶贫的有效方式，是产业扶贫的有效途径。也就是说光伏扶贫只是产业扶贫的众多方式之一，不是唯一方式，不能“一光了之”。</p>"+
                    "<p>二是关于扶贫对象。《办法》明确光伏扶贫对象为列入国家光伏扶贫实施范围的建档立卡贫困村的建档立卡贫困户，优先扶持深度贫困地区和弱劳动能力贫困人口，不能把扶贫对象扩大化。</p>"+
                    "<p>二是关于扶贫对象。《办法》明确光伏扶贫对象为列入国家光伏扶贫实施范围的建档立卡贫困村的建档立卡贫困户，优先扶持深度贫困地区和弱劳动能力贫困人口，不能把扶贫对象扩大化。</p>"+
                    "<p>三是关于建设方式。《办法》明确光伏扶贫电站原则上应在建档立卡贫困村按照村级电站方式建设，根据当地实际情况，确有必要并经充分论证可以采取联建方式建设村级电站。今后光伏扶贫电站不再搞集中式电站，不能打着光伏扶贫名义要规模、建集中式电站。</p>"+
                    "<p>四是关于建设资金。《办法》明确光伏扶贫电站由各地根据财力可能筹措资金建设，不得负债建设，企业不得投资入股。保证扶贫电站公益性质，地方有钱就干，有多少钱干多少事。</p>"+
                    "<p>五是关于电价政策。为支持光伏扶贫，《办法》明确光伏扶贫电站不参与竞价，执行国家制定的光伏扶贫价格政策。</p>"+
                    "<p>六是关于补贴发放。《办法》明确光伏扶贫电站优先纳入可再生能源补助目录，补助资金优先安排，原则上年度补助资金于次年1季度前发放到位。这是国家支持扶贫对光伏扶贫电站实行的优惠政策。</p>"+
                    "<p>七是目录管理。《办法》明确光伏扶贫电站实行目录管理，国家能源局会同国务院扶贫办按建档立卡贫困村代码，对光伏扶贫电站统一编码、建立目录，纳入目录的，享受光伏扶贫电站政策。今后只有纳入光伏扶贫电站目录的才能享受光伏扶贫优惠政策。</p>"+
                    "<p>八是关于建设和运行维护。《办法》明确光伏扶贫电站以县为单位，由县级政府按照“规划、设计、施工、验收、运维”五统一的原则实施，运用市场化方式委托专业机构负责光伏扶贫电站的建设、运行和维护，确保建设运行质量与运行安全，并鼓励采用达到“领跑者”技术指标的先进技术。这样规定有利于提高光伏扶贫电站建设运维的专业化程度，保证光伏扶贫电站建设运维质量。</p>"+
                    "<p>九是厘清职责。《办法》明确“中央统筹、省负总责、市县抓落实”的管理体制，省级政府扶贫、能源主管部门负责本省光伏扶贫工作的统筹协调和管理监督，要对项目的真实性、准确性负责。</p>"

        }
        return {
            code:'100',
            body:body,
            title:title,
            msg:'查询成功'
        }
    });
Mock.mock("/report/fuzzySearchPlant.do",{"code":100,"body":[{"addr":"四川省成都市龙泉驿区","capacity":"111kw","distribution":"1.2公里","genToday":"111kW","plantName":"龙泉电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun@2x.png","weather":"晴天","plantId":"1","status":"","type":"0","plantType":1},{"addr":"四川省成都市高新区天府大道","capacity":"222KW","distribution":"3.6公里","genToday":"222KW","plantName":"高新区电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun@2x.png","weather":"晴天","plantId":"2","status":"1","type":"1","soc":"89%","plantType":2},{"addr":"四川省成都市双流区","capacity":"333KW","distribution":"4.8公里","genToday":"333kw","plantName":"双流电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun@2x.png","weather":"晴天","plantId":"3","status":"2","type":"6","soc":"89%","plantType":3},{"addr":"四川省绵阳市三台县景福镇","capacity":"444KW","distribution":"300公里","genToday":"444kw","plantName":"向阳电站","pic":"/images/img_2@2x.png","weatherPic":"/images/sun@2x.png","weather":"晴天","plantId":"4","status":"3","type":"5","energyStorage":"120kWh","soc":"89%","phoCap":"120kw","plantType":3}]});
Mock.mock("/role/getAllRights.do",{"code":"100","body":{"list":[{"children":[{"hasChild":false,"name":"多电站监控","showType":"0","pId":"1","id":9,"open":false,"describeMsg":"多电站监控多电站监控多电站监控多电站监控多电站监控多电站监控多电站监控","chkDisabled":true},{"hasChild":false,"name":"单电站监控","showType":"0","pId":"1","id":10,"open":false,"describeMsg":"单电站监控多电站监控多电站监控多电站监控多电站监控多电站监控"},{"hasChild":false,"name":"设备控制","showType":"0","pId":"1","id":11,"open":false,"describeMsg":"设备控制多电站监控多电站监控多电站监控多电站监控多电站监控多电站监控"}],"name":"电站监控","showType":"1","pId":"0","id":1,"open":false,"describeMsg":"电站监控多电站监控多电站监控多电站监控多电站监控多电站监控"},{"children":[{"hasChild":false,"name":"告警查看","showType":"0","pId":"2","id":12,"open":false,"describeMsg":"告警查看多电站监控多电站监控多电站监控多电站监控多电站监控"}],"name":"智能运维","showType":"1","pId":"0","id":2,"open":false,"describeMsg":"智能运维多电站监控多电站监控多电站监控多电站监控多电站监控"},{"children":[{"hasChild":false,"name":"电站运行报表","showType":"0","pId":"3","id":13,"open":false,"describeMsg":"电站运行报表多电站监控多电站监控多电站监控多电站监控多电站监控"},{"hasChild":false,"name":"电站对比报表","showType":"0","pId":"3","id":14,"open":false,"describeMsg":"电站对比报表多电站监控多电站监控多电站监控多电站监控多电站监控"},{"hasChild":false,"name":"历史数据曲线","showType":"0","pId":"3","id":15,"open":false,"describeMsg":"历史数据曲线多电站监控多电站监控多电站监控多电站监控多电站监控"}],"name":"分析报表","showType":"1","pId":"0","id":3,"open":false,"describeMsg":"分析报表多电站监控多电站监控多电站监控"},{"children":[{"hasChild":false,"name":"大屏监视","showType":"0","pId":"4","id":16,"open":false,"describeMsg":"大屏监视多电站监控多电站监控多电站监控"}],"name":"企业大屏","showType":"1","pId":"0","id":4,"open":false,"describeMsg":"企业大屏"},{"children":[{"children":[{"hasChild":false,"name":"查看权限","showType":"0","editLook":"0","pId":"17","id":29,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"17","id":30,"open":false,"describeMsg":"编辑权限"}],"hasChild":true,"name":"我的信息","showType":"0","pId":"5","id":17,"open":false,"describeMsg":"我的信息"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"18","checked":false,"id":31,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"18","id":32,"open":false,"describeMsg":"编辑权限"},{"hasChild":false,"name":"新增权限","showType":"0","pId":"18","id":33,"open":false,"describeMsg":"新增权限"},{"hasChild":false,"name":"删除权限","showType":"0","pId":"18","id":34,"open":false,"describeMsg":"删除权限"}],"hasChild":true,"name":"组织信息","showType":"0","pId":"5","id":18,"open":false,"describeMsg":"组织信息"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"19","id":35,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"19","id":36,"open":false,"describeMsg":"编辑权限"},{"hasChild":false,"name":"新增权限","showType":"0","pId":"19","id":37,"open":false,"describeMsg":"新增权限"},{"hasChild":false,"name":"删除权限","showType":"0","pId":"19","id":38,"open":false,"describeMsg":"删除权限"}],"hasChild":true,"name":"账户管理","showType":"0","pId":"5","id":19,"open":false,"describeMsg":"账户管理"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"20","id":39,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"20","id":40,"open":false,"describeMsg":"编辑权限"},{"hasChild":false,"name":"新增权限","showType":"0","pId":"20","id":41,"open":false,"describeMsg":"新增权限"},{"hasChild":false,"name":"删除权限","showType":"0","pId":"20","id":42,"open":false,"describeMsg":"删除权限"}],"hasChild":true,"name":"角色权限","showType":"0","pId":"5","id":20,"open":false,"describeMsg":"角色权限"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"21","id":43,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"21","id":44,"open":false,"describeMsg":"编辑权限"}],"hasChild":true,"name":"电站权限","showType":"0","pId":"5","id":21,"open":false,"describeMsg":"电站权限"}],"name":"账号及权限","showType":"1","pId":"0","id":5,"open":false,"describeMsg":"账号及权限"},{"children":[{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"22","id":45,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"22","id":46,"open":false,"describeMsg":"编辑权限"},{"hasChild":false,"name":"新增权限","showType":"0","pId":"22","id":47,"open":false,"describeMsg":"新增权限"},{"hasChild":false,"name":"删除权限","showType":"0","pId":"22","id":48,"open":false,"describeMsg":"删除权限"}],"hasChild":true,"name":"电站信息管理","showType":"0","pId":"6","id":22,"open":false,"describeMsg":"电站信息管理"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"23","id":49,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"23","id":50,"open":false,"describeMsg":"编辑权限"},{"hasChild":false,"name":"新增权限","showType":"0","pId":"23","id":51,"open":false,"describeMsg":"新增权限"},{"hasChild":false,"name":"删除权限","showType":"0","pId":"23","id":52,"open":false,"describeMsg":"删除权限"}],"hasChild":true,"name":"电站业主管理","showType":"0","pId":"6","id":23,"open":false,"describeMsg":"电站业主管理"}],"name":"电站管理","showType":"0","pId":"0","id":6,"open":false,"describeMsg":"电站管理"},{"children":[{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"24","id":53,"open":false,"describeMsg":"查看权限"}],"hasChild":true,"name":"数采管理","showType":"0","pId":"7","id":24,"open":false,"describeMsg":"数采管理"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"25","id":54,"open":false,"describeMsg":"查看权限"}],"hasChild":true,"name":"逆变器管理","showType":"0","pId":"7","id":25,"open":false,"describeMsg":"逆变器管理"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"26","id":55,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"26","id":56,"open":false,"describeMsg":"编辑权限"},{"hasChild":false,"name":"新增权限","showType":"0","pId":"26","id":57,"open":false,"describeMsg":"新增权限"},{"hasChild":false,"name":"删除权限","showType":"0","pId":"26","id":58,"open":false,"describeMsg":"删除权限"}],"hasChild":true,"name":"\t摄像头管理","showType":"0","pId":"7","id":26,"open":false,"describeMsg":"\t摄像头管理"}],"name":"设备管理","showType":"0","pId":"0","id":7,"open":false,"describeMsg":"设备管理"},{"children":[{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"27","id":59,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"27","id":60,"open":false,"describeMsg":"编辑权限"}],"hasChild":true,"name":"企业个性化设置","showType":"0","pId":"8","id":27,"open":false,"describeMsg":"企业个性化设置"},{"children":[{"hasChild":false,"name":"查看权限","showType":"0","pId":"28","id":61,"open":false,"describeMsg":"查看权限"},{"hasChild":false,"name":"编辑权限","showType":"0","pId":"28","id":62,"open":false,"describeMsg":"编辑权限"}],"hasChild":true,"name":"其他设置","showType":"0","pId":"8","id":28,"open":false,"describeMsg":"其他设置"}],"name":"系统设置","showType":"0","pId":"0","id":8,"open":false,"describeMsg":"系统设置"}]},"msg":null});
Mock.mock("/screen/loginIn.do",{"code":"100","body":{"tokenId|1000000-1000000000":100,"userName":"系统管理员","rightList":[{"id":"mapView"},{"id":"energyKPI","child":[{"id":"rightControl1"}]},{"id":"uEdiet"}]},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/screen/getLogoAndName.do",{"code":"100","body":{"logoName":"智慧能源管理系统","logoImg":"/images/systemImages/screenLogo.png","screenTime":1521776393731},"msg":"查询成功"});
Mock.mock("/screen/isLogin.do",{"code":"100","body":{"userRole":"Admin","userName":"系统管理员"},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/screen/queryUserRolSrc.do",{"code":"100","body":[{"id":"mapView"},{"id":"energyKPI","childs":[{"id":"rightControl1"}]},{"id":"uEdiet"}],"msg":"网络连接错误"});
Mock.mock("/screen/exit.do",{"code":"100","body":"","msg":""});
Mock.mock("/screen/getCurrentEMS.do",{"code":"100","body":{"currentCurve":{"time":["0:00","0:15","0:30","0:45","1:00","1:15","1:30","1:45","2:00","2:15","2:30","2:45","3:00","3:15","3:30","3:45","4:00","4:15","4:30","4:45","5:00","5:15","5:30","5:45","6:00"],"unit":"A","name":"电流","value":[20,20,20,20,20,-40,-40,-40,-40,-40,-40,-40,-40,80,80,80,80,-50,-50,-50,-50,-50,-50,-50,-50]}},"msg":"网络连接错误！"});
Mock.mock("/screen/getPowerCurve.do",{"code":"100","body":{"time":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"unit":"kW","power":[{"name":"充放电功率","value":[-145,158,22,356,235,145,247,23,486,256,-200,159,400,257,87,345,45,47,123,-45,-67,187]},{"name":"电网功率","value":[125,215,-13,251,264,189,102,345,192,30,478,25,-215,313,151,264,189,-132,345,92,30,-78]},{"name":"用电功率","value":[458,0,200,100,304,258,1,-300,-247,20,456,325,300,478,54,-100,189,102,345,192,-30,-178]},{"name":"用电量","value":[199,233,345,53,78,90,234,45,123,157,2,66,23,455,489,54,366,288,258,480]}]},"msg":"网络连接错误！"});
Mock.mock("/screen/getPlantInfo.do",{"code":"100","body":{"plantName":"成都高新区美年电站","capacity":"1000kW","gridConnectedDate":"2017-5-1","runDays":"80天","loaction":[30.629169,104.079373],"plantPhoto":"","plantAddr":"电站地址"},"msg":"网络连接错误"});
Mock.mock("/screen/generationStatics.do",{"code":100,"body":{"datas":{"unity1":"kWh","unity2":"元","maxData1":"30000","maxData2":"20000","xData":["12月","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月"],"yData1":["2000","1500","1800","30000","2600","4000","3500","2500","1500","5000","4500","4000"],"yData2":["10000","12000","13000","5000","11000","8000","20000","18000","14000","20000","18000","19000"]},"month":{"unity":"kwh","value":24775},"year":{"unity":"kwh","value":34540}}});
Mock.mock("/screen/distribution.do",{"code":"100","body":[{"name":"四川","value":"120","unit":"mW"},{"name":"河北","value":"115","unit":"kW"},{"name":"江苏","value":"113","unit":"kW"},{"name":"河南","value":"95","unit":"mW"},{"name":"上海","value":"92","unit":"kW"},{"name":"北京","value":"87","unit":"kW"},{"name":"深圳","value":"87","unit":"kW"},{"name":"广州","value":"60","unit":"kW"},{"name":"江西","value":"60","unit":"mW"},{"name":"浙江","value":"50"},{"name":"陕西","value":"50","unit":"kW"},{"name":"广西","value":"30","unit":"kW"},{"name":"XXX","value":"30","unit":"kW"},{"name":"XXX","value":"30","unit":"kW"},{"name":"XXX","value":"30","unit":"kW"}],"msg":"网络连接错误"});
Mock.mock("/screen/palants.do",{"code":"100","body":{"country":[{"id":"11","name":"中国","type":0,"level":1,"singlePlantType|1":[0,1,2],"location":[30.4,104.04]},{"id":"22","name":"挪威","type":0,"level":1,"singlePlantType|1":[0,1,2],"location":[70.51,27.43]}],"province":[{"id":"111","name":"四川","type":0,"level":2,"singlePlantType|1":[0,1,2],"location":[30.4,104.04]},{"id":"112","name":"辽宁","type":0,"level":2,"singlePlantType|1":[0,1,2],"location":[41.48,123.25]},{"id":"113","name":"广东","type":0,"level":2,"singlePlantType|1":[0,1,2],"location":[23.08,113.14]},{"id":"114","name":"浙江","type":0,"level":2,"singlePlantType|1":[0,1,2],"location":[30.16,120.1]}],"plant":[{"id":"1111","name":"电站1","type":2,"singlePlantType|1":[0,1,2],"location":[30.57,104.06]},{"id":"1112","name":"电站2","type":2,"singlePlantType|1":[0,1,2],"location":[28.74,101.9]},{"id":"1113","name":"电站3","type":2,"singlePlantType|1":[0,1,2],"location":[32.25,107.52]},{"id":"1114","name":"电站4","type":2,"singlePlantType|1":[0,1,2],"location":[33.81,102.73]}]},"msg":"网络连接错误"});
Mock.mock("/screen/getPlantCount.do",{"code":100,"body":{"datas":[{"value":45,"name":"5kW以下"},{"value":20,"name":"5-10kW"},{"value":65,"name":"10kW-1MW"},{"value":65,"name":"1MW-10MW"},{"value":65,"name":"10MW"}],"totalCapacity":"20000MW","totalPlant":"1234座"},"msg":""});
Mock.mock("/screen/getCountry.do",{"code":"100","body":[{"id":"11","name":"中国","type":0,"level":1,"toType":0,"singlePlantType|1":[0,1,2],"location":[30.4,104.04]},{"id":"22","name":"挪威","type":0,"level":1,"toType":0,"singlePlantType|1":[0,1,2],"location":[70.51,27.43]}],"msg":"网络连接错误"});
Mock.mock("/screen/contribution.do",{"code":100,"body":[{"name":"CO₂减排","value":1231,"unity":"t"},{"name":"等效植树","value":1131,"unity":"棵"},{"name":"节约标准煤","value":1331,"unity":"t"}]});
Mock.mock("/screen/plantDistribution.do",{"code":100,"body":{"partCount":"10","inverterCount":"100","plantArea":"960"}});
Mock.mock("/screen/business.do",{"code":100,"body":{"businessNum":"800","controlNum":"678","roleNum":"312","serviceNum":"159","totalNum":1949,"businessName":"监控1","roleName":"售后2","serviceName":"服务3","controlName":"运维4"},"msg":""});
Mock.mock("/screen/districtManage.do",function (param) {
        var request = param.body;
        typeof(request) !== 'object' && (request = JSON.parse(request));

        var res=[];
        //22:挪威  11:中国
        switch (Number(request.id)){
            case 11:
                res = [
                {id:'111',name: '四川',level:2,type: 0,fatherId: '11',level: 2,"hasChild": true,"singlePlantType|1":[0,1,2],location: [30.40,104.04]},
                // {id:'113',name: '上海',type: 0,"singlePlantType|1":[0,1,2],location: [31.23,121.47]},
                // {id:'114',name: '浙江',type: 0,"singlePlantType|1":[0,1,2],location: [30.16,120.10]}
            ];break;
            case 111:res =[
                {
                "id": "1111",
                "fatherId": "111",
                "location": ["30.65984", "104.10194"],
                "hasChild": true,
                "type": 0,
                "name": "成都市",
                "count": 0,
                "plantType": null,
                "level": 3
            }, {
                "id": "1112",
                "fatherId": "111",
                "location": ["31.499015", "104.698923"],
                "hasChild": true,
                "type": 0,
                "name": "绵阳市",
                "count": 0,
                "plantType": null,
                "level": 3
            }]
                /*[
                {id:'1111',name: '阿坝州',type: 0,level: 3,"singlePlantType|1":[0,1,2],location: [30.67,102.216]},
                // {id:'1112',name: '自贡市',type: 0,"singlePlantType|1":[0,1,2],location: [29.45,104.50]},
                // {id:'1113',name: '雅安市',type: 0,"singlePlantType|1":[0,1,2],location: [30.18,103.05]},
                // {id:'1114',name: '南充市',type: 0,"singlePlantType|1":[0,1,2],location: [31.42,106.78]}
            ]*/;break;
            case 1111:res =[
                {id:'11111',name: '黑水县',level: 4,type: 1,"singlePlantType|1":[0,1,2],location: [31.98,103.31]},
                {id:'11112',name: '马尔康',level: 4,type: 1,"singlePlantType|1":[0,1,2],location: [32.19,101.74]},
                {id:'11113',name: '松潘县',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [32.68,103.31]},
                {id:'11114',name: '阿坝县',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [32.91,101.83]},
                {id:'11115',name: '壤塘县',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [32.11,101.11]}
            ];break;
            case 11111:res =[
                {id:'111111',name: '沙板电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.0547537095,102.9804891876]},
                {id:'111112',name: '铁别电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.0545537095,102.9802891876]},
                {id:'111113',name: '四美电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.0543537095,102.9800891876]}
            ];break;
            case 11112:res =[
                {id:'111121',name: '菜农电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.9032280127,102.1995449066]},
                {id:'111122',name: '俄尔雅电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.9058329092,102.1803188324]},
                {id:'111123',name: '洛威电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.8297322965,102.0990371704]}
            ];break;
            case 11113:res =[
                {id:'111131',name: '青云电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.9032280127,102.1995449066]},
                {id:'111132',name: '大寨电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.6046754406,103.7263870239]},
                {id:'111133',name: '地柏电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.4437260286,103.8022613525]}
            ];break;
            case 11114:res =[
                {id:'111131',name: '色尔古电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.8725228795,101.7169189453]},
                {id:'111132',name: '洛尔达电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.8720903534,101.7843818665]},
                {id:'111133',name: '柯河电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.6994886809,101.3323974609]}
            ];break;
            case 11115:res =[
                {id:'111131',name: '加斯满电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.2525876374,100.9653854370]}
            ];break;
            case 1112:res =[
                {id:'11121',name: '荣县',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [29.2774152650,104.5170593262]}
            ];break;
            case 11121:res =[
                {id:'111211',name: '旭阳电站',type: 2,"singlePlantType|1":[0,1,2],location: [29.4340660829,104.3984413147]},
                {id:'111212',name: '晏家电站',type: 2,"singlePlantType|1":[0,1,2],location: [29.5328398635,104.2794799805]}
            ];break;
            case 1113:res =[
                {id:'11131',name: '雨城区',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [29.9906978171,103.0517578125]}
            ];break;
            case 11131:res =[
                {id:'111311',name: '天宝电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.0011046648,103.0461788177]}
            ];break;
            case 1114:res =[
                {id:'11141',name: '营山县',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [31.0905740950,106.5454101563]},
                {id:'11142',name: '蓬安县',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [31.2221970321,106.4685058594]},
                {id:'11143',name: '顺庆区',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [30.9681892968,106.1279296875]}
            ];break;
            case 11141:res =[
                {id:'111411',name: '河堰电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0774899654,106.5519332886]},
                {id:'111412',name: '凤凰电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0571986526,106.5012931824]},
                {id:'111413',name: '铺垭电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.2527261968,106.5550231934]},
                {id:'111414',name: '兴旺电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0867519512,106.8248748779]},
                {id:'111415',name: '铺垭电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0329316187,106.7864227295]}
            ];break;
            case 11142:res =[
                {id:'111421',name: '相如电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0020373576,106.4008712769]}
            ];break;
            case 11143:res =[
                {id:'111431',name: '张关垭电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8338562827,106.0651874542]}
            ];break;
            case 113:res =[
                {id:'1131',name: '金山区',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [30.8633314096,121.1750793457]}
            ];break;
            case 1131:res =[
                {id:'11311',name: '朱泾电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8633314096,121.1750793457]},
                {id:'11312',name: '夹漏电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8515424456,121.1283874512]}
            ];break;
            case 114:res =[
                {id:'1141',name: '嘉兴市',type: 0,level: 3,"singlePlantType|1":[0,1,2],location: [30.8008333919,120.8345031738]}
            ];break;
            case 1141:res =[
                {id:'11411',name: '南湖区',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [30.8008333919,120.8345031738]},
                {id:'11412',name: '平湖市',type: 1,level: 4,"singlePlantType|1":[0,1,2],location: [30.7430160258,121.1434936523]}
            ];break;
            case 11411:res =[
                {id:'114111',name: '三家浜电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8008333919,120.8345031738]}
            ];break;
            case 11412:res =[
                {id:'114121',name: '广陈电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.7430160258,121.1434936523]}
            ];
                break;
        }

        if(request.id == ''){
            /*res =[
                {id:'111',name: '四川',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [30.40,104.04]},
                {id:'113',name: '上海',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [31.23,121.47]},
                {id:'114',name: '浙江',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [30.16,120.10]}
            ]*/
            res = [{"location":["39.915069","116.368361"],"id":"11","name":"中国","type":0,"hasChild":true,"level":1}]
        }
        return {
            code:'100',
            body:res,
            msg:'网络连接错误'
        }
    });
Mock.mock("/screen/getAllPlant.do",function (param) {
        var request = param.body;
        typeof(request) !== 'object' && (request = JSON.parse(request));

        return {
            code:'100',
            body:[
                {id:'111111',name: '沙板电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.0547537095,102.9804891876]},
                {id:'111112',name: '铁别电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.0545537095,102.9802891876]},
                {id:'111113',name: '四美电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.0543537095,102.9800891876]},
                {id:'111121',name: '菜农电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.9032280127,102.1995449066]},
                {id:'111122',name: '俄尔雅电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.9058329092,102.1803188324]},
                {id:'111123',name: '洛威电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.8297322965,102.0990371704]},
                {id:'111131',name: '青云电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.9032280127,102.1995449066]},
                {id:'111132',name: '大寨电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.6046754406,103.7263870239]},
                {id:'111133',name: '地柏电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.4437260286,103.8022613525]},
                {id:'111131',name: '色尔古电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.8725228795,101.7169189453]},
                {id:'111132',name: '洛尔达电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.8720903534,101.7843818665]},
                {id:'111133',name: '柯河电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.6994886809,101.3323974609]},
                {id:'111131',name: '加斯满电站',type: 2,"singlePlantType|1":[0,1,2],location: [32.2525876374,100.9653854370]},
                {id:'111211',name: '旭阳电站',type: 2,"singlePlantType|1":[0,1,2],location: [29.4340660829,104.3984413147]},
                {id:'111212',name: '晏家电站',type: 2,"singlePlantType|1":[0,1,2],location: [29.5328398635,104.2794799805]},
                {id:'111311',name: '天宝电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.0011046648,103.0461788177]},
                {id:'111411',name: '河堰电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0774899654,106.5519332886]},
                {id:'111412',name: '凤凰电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0571986526,106.5012931824]},
                {id:'111413',name: '铺垭电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.2527261968,106.5550231934]},
                {id:'111414',name: '兴旺电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0867519512,106.8248748779]},
                {id:'111415',name: '铺垭电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0329316187,106.7864227295]},
                {id:'111431',name: '张关垭电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8338562827,106.0651874542]},
                {id:'111421',name: '相如电站',type: 2,"singlePlantType|1":[0,1,2],location: [31.0020373576,106.4008712769]},
                {id:'11311',name: '朱泾电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8633314096,121.1750793457]},
                {id:'11312',name: '夹漏电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8515424456,121.1283874512]},
                {id:'114111',name: '三家浜电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.8008333919,120.8345031738]},
                {id:'114121',name: '广陈电站',type: 2,"singlePlantType|1":[0,1,2],location: [30.7430160258,121.1434936523]}
            ],
            msg:'网络连接错误'
        }
    });
Mock.mock("/screen/getProvince.do",{"code":"100","body":[{"id":"111","name":"四川","level":2,"type":0,"toType":1,"singlePlantType|1":[0,1,2],"location":[30.4,104.04]},{"id":"112","name":"辽宁","level":2,"type":0,"toType":1,"singlePlantType|1":[0,1,2],"location":[41.48,123.25]},{"id":"113","name":"广东","level":2,"type":0,"toType":1,"singlePlantType|1":[0,1,2],"location":[23.08,113.14]},{"id":"114","name":"浙江","level":2,"type":0,"toType":1,"singlePlantType|1":[0,1,2],"location":[30.16,120.1]}],"msg":"网络连接错误"});
Mock.mock("/screen/getPlant.do",{"code":"100","body":[{"id":"1111","name":"电站1","type":2,"singlePlantType|1":[0,1,2],"location":[30.57,104.06]},{"id":"1112","name":"电站2","type":2,"singlePlantType|1":[0,1,2],"location":[28.74,101.9]},{"id":"1113","name":"电站3","type":2,"singlePlantType|1":[0,1,2],"location":[32.25,107.52]},{"id":"1114","name":"电站4","type":2,"singlePlantType|1":[0,1,2],"location":[33.81,102.73]}],"msg":"网络连接错误"});
Mock.mock("/screen/postTest.do",{"code":100,"body":"","msg":""});
Mock.mock("/screen/basicStatic.do",{"code":100,"body":{"logoImg":"","logoName":"协能共创科技有限公司","screenTime":"1512978365000","totalGen|+1":1000.023,"totalGenUnity":"kWh"},"msg":""});
Mock.mock("/screen/introduction.do",{"code":100,"body":{"description":"新能源行业领先的新能源管理平新能源行业领先的新能源管新能源行业领先的新能源管新能源行业领先的新能源管新能源行业领先的新能源管新能源行业领先的新能源管台及解决方案","image":"","title":"协能共创科技有限公司"},"msg":""});
Mock.mock("/screen/plantInfo.do",{"code":100,"body":{"img":null,"address":"四川省成都市高新区美年广场","capacity":"100","unit":"kW","singlePlantType":1,"location":"104.079373,30.629169","name":"高新美年电站","remark":"该电站是四川省最大的电站","recentWeather":[{"actulWeather":10,"dayPictureUrl":"/images/weather/qing.png","temperature":"11~1","weather":"晴","wind":"微风","dataTime":1521698400273,"currentTemperature":8},{"dayPictureUrl":"/images/weather/duoyun.png","temperature":"11~1","weather":"晴","wind":"微风"},{"dayPictureUrl":"/images/weather/xiaoyu.png","temperature":"11~1","weather":"晴","wind":"微风"}],"cameraInfos|5-8":[{"id|+1":1,"name":"@word(6, 8)","sn":"@guid","channel":1}]},"msg":""});
Mock.mock("/screen/dynamicStatics.do",{"code":100,"body":{"activePower":{"curData2":5175,"curTime":"12:15","unit":"kw","xData":["6:00","6:05","6:10","6:15","6:20","6:25","6:30","6:35","6:40","6:45","6:50","6:55","7:00","7:05","7:10","7:15","7:20","7:25","7:30","7:35","7:40","7:45","7:50","7:55","8:00","8:05","8:10","8:15","8:20","8:25","8:30","8:35","8:40","8:45","8:50","8:55","9:00","9:05","9:10","9:15","9:20","9:25","9:30","9:35","9:40","9:45","9:50","9:55","10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:30","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:30","15:35","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00"],"yData2":[0,143,284,423,560,695,828,959,1088,1215,1340,1463,1584,1703,1820,1935,2048,2159,2268,2375,2480,2583,2684,2783,2880,2975,3068,3159,3248,3335,3420,3503,3584,3663,3740,3815,3888,3959,4028,4095,4160,4223,4284,4343,4400,4455,4508,4559,4608,4655,4700,4743,4784,4823,4860,4895,4928,4959,4988,5015,5040,5063,5084,5103,5120,5135,5148,5159,5168,5175,5180,5183,5184,5183,5180,5175,5168,5159,5148,5135,5120,5103,5084,5063,5040,5015,4988,4959,4928,4895,4860,4823,4784,4743,4700,4655,4608,4559,4508,4455,4400,4343,4284,4223,4160,4095,4028,3959,3888,3815,3740,3663,3584,3503,3420,3335,3248,3159,3068,2975,2880,2783,2684,2583,2480,2375,2268,2159,2048,1935,1820,1703,1584,1463,1340,1215,1088,959,828,695,560,423,284,143,0],"yData1":[0,100,200,300,350,360,370,400,410,420,430,440,450,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"energyStatic":{"capacity":100,"res":"正常发电中","type":"0","value":80},"genIncome":{"genToday":23,"genTodayUnity":"度","income":29,"incomeUnity":"元","totalGen":"23458","totalGenUnity":"度","totalIncome":"5456","totalIncomeUnity":"元"}},"msg":"测试内容7n7j"});
Mock.mock("/system/getPropagandaPhoto.do",{"code":"100","body":["/images/newMain/banner1.jpg","/images/newMain/banner2.jpg","/images/newMain/banner3.jpg"],"msg":""});
Mock.mock("/system/getSystemContent.do",{"code":"100","body":{"systemName":null,"loginPhoto":[],"loginLogo":null},"msg":"获取信息 成功"});
Mock.mock("/system/getSystemBasic.do",{"body":{"orgDesc":"新能源行业领先的新能源管理平台及解决方案供应商,公司注重人才的凝聚培养与技术的研发创新，致力于通过先进的技术，为全球绿色能源的应用和高效管理提供解决方案","orgPhoto":"/images/largeScreen/gobal.png","orgPhotoFather":false,"propagandaPhoto":[],"propagandaPhotoFather":true,"screenLogo":"/images/systemImages/screenLogo.png","screenLogoFather":false,"screenName":"智慧能源管理系统","systemLogo":"/images/systemImages/logo.png","systemLogoFather":false,"systemName":"协能共创光伏管理系统"},"code":"100","msg":"查询成功"});
Mock.mock("/system/getSystemInfo.do",{"code":"100","body":{"businessName":"监屏","businessNum":"2","controlName":"运维","controlNum":"12","plantArtificialCapacity":1.39,"plantAutomaticCalculation":"1","roleName":"其他","roleNum":"2","serviceName":"经营","serviceNum":"1","unit":"GW"},"msg":"获取信息 成功"});
Mock.mock("/user/queryUserRolSrc.do",{"code":"100","body":[{"id":"iom","rightsName":"智能运维","child":[{"id":"alarmView","rightsName":"告警查看","child":[],"sn":12}],"sn":2},{"id":"povertyView","rightsName":"扶贫管理","child":[]},{"id":"report","rightsName":"分析报表","child":[{"id":"runReportView","rightsName":"电站运行报表","child":[],"sn":13},{"id":"compReportView","rightsName":"电站对比报表","child":[],"sn":14},{"id":"hisReportView","rightsName":"历史数据曲线","child":[],"sn":15},{"id":"eleFeesReportView","rightsName":"电费报表","child":[],"sn":90}],"sn":3},{"id":"plantMon","rightsName":"电站监控","child":[{"id":"PlantMonView","rightsName":"多电站监控","child":[],"sn":9},{"id":"singlePlantMonView","rightsName":"单电站监控","child":[],"sn":10},{"id":"deviceControlEdit","rightsName":"设备控制","child":[],"sn":11}],"sn":1},{"id":"screen","rightsName":"企业大屏","child":[{"id":"screenView","rightsName":"大屏监视","child":[],"sn":16}],"sn":4},{"id":"accountAndAuthority","rightsName":"账号及权限","child":[{"id":"myInfo","rightsName":"我的信息","child":[{"id":"myInfoView","rightsName":"查看权限","child":[],"sn":29},{"id":"myInfoEdit","rightsName":"编辑权限","child":[],"sn":30}],"sn":17},{"id":"groupInfo","rightsName":"组织信息","child":[{"id":"groupInfoView","rightsName":"查看权限","child":[],"sn":31},{"id":"groupInfoEdit","rightsName":"编辑权限","child":[],"sn":32},{"id":"groupInfoNew","rightsName":"新增权限","child":[],"sn":33},{"id":"groupInfoDelete","rightsName":"删除权限","child":[],"sn":34}],"sn":18},{"id":"accountManage","rightsName":"账户管理","child":[{"id":"accountManageView","rightsName":"查看权限","child":[],"sn":35},{"id":"accountManageEdit","rightsName":"编辑权限","child":[],"sn":36},{"id":"accountManageNew","rightsName":"新增权限","child":[],"sn":37},{"id":"accountManageDelete","rightsName":"删除权限","child":[],"sn":38}],"sn":19},{"id":"roleAuthority","rightsName":"角色权限","child":[{"id":"roleAuthorityView","rightsName":"查看权限","child":[],"sn":39},{"id":"roleAuthorityDelete","rightsName":"删除权限","child":[],"sn":42},{"id":"roleAuthorityNew","rightsName":"新增权限","child":[],"sn":41},{"id":"roleAuthorityEdit","rightsName":"编辑权限","child":[],"sn":40}],"sn":20},{"id":"plantAuthority","rightsName":"电站权限","child":[{"id":"plantAuthorityEdit","rightsName":"编辑权限","child":[],"sn":44},{"id":"plantAuthorityView","rightsName":"查看权限","child":[],"sn":43}],"sn":21}],"sn":5},{"id":"plantManage","rightsName":"电站管理","child":[{"id":"plantInfoManage","rightsName":"电站信息管理","child":[{"id":"plantInfoManageDelete","rightsName":"删除权限","child":[],"sn":48},{"id":"plantInfoManageNew","rightsName":"新增权限","child":[],"sn":47},{"id":"plantInfoManageEdit","rightsName":"编辑权限","child":[],"sn":46},{"id":"plantInfoManageView","rightsName":"查看权限","child":[],"sn":45}],"sn":22},{"id":"plantOwnerManage","rightsName":"电站业主管理","child":[{"id":"plantOwnerManageDelete","rightsName":"删除权限","child":[],"sn":52},{"id":"plantOwnerManageNew","rightsName":"新增权限","child":[],"sn":51},{"id":"plantOwnerManageEdit","rightsName":"编辑权限","child":[],"sn":50},{"id":"plantOwnerManageView","rightsName":"查看权限","child":[],"sn":49}],"sn":23}],"sn":6},{"id":"sysSetting","rightsName":"系统设置","child":[{"id":"enterpriseSetting","rightsName":"企业个性化设置","child":[{"id":"enterpriseSettingEdit","rightsName":"编辑权限","child":[],"sn":60},{"id":"enterpriseSettingView","rightsName":"查看权限","child":[],"sn":59}],"sn":27},{"id":"elseSetting","rightsName":"其他设置","child":[{"id":"elseSettingView","rightsName":"查看权限","child":[],"sn":61},{"id":"elseSettingEdit","rightsName":"编辑权限","child":[],"sn":62}],"sn":28},{"id":"systemSetting","rightsName":"系统设置","child":[{"id":"systemSettingView","rightsName":"查看权限","child":[],"sn":85},{"id":"systemSettingEdit","rightsName":"编辑权限","child":[],"sn":86}],"sn":84}],"sn":8},{"id":"deviceManage","rightsName":"设备管理","child":[{"id":"deviceLisManage","rightsName":"设备管理","child":[{"id":"dataLogger","rightsName":"数采管理","child":[{"id":"dataLoggerView","rightsName":"查看权限","child":[],"sn":53},{"id":"dataLoggerEdit","rightsName":"编辑权限","child":[],"sn":81},{"id":"dataLoggerNew","rightsName":"新增权限","child":[],"sn":82},{"id":"dataLoggerDelete","rightsName":"删除权限","child":[],"sn":83}],"sn":24},{"id":"inverterManage","rightsName":"逆变器管理","child":[{"id":"inverterManageView","rightsName":"查看权限","child":[],"sn":54},{"id":"inverterManageEdit","rightsName":"编辑权限","child":[],"sn":87},{"id":"libInverterManageImport","rightsName":"导入权限","child":[],"sn":88},{"id":"libInverterManageSwitch","rightsName":"启停用权限","child":[],"sn":89}],"sn":25},{"id":"cameraManage","rightsName":"\t摄像头管理","child":[{"id":"cameraManageDelete","rightsName":"删除权限","child":[],"sn":58},{"id":"cameraManageNew","rightsName":"新增权限","child":[],"sn":57},{"id":"cameraManageEdit","rightsName":"编辑权限","child":[],"sn":56},{"id":"cameraManageView","rightsName":"查看权限","child":[],"sn":55}],"sn":26}],"sn":7},{"id":"deviceLibManage","rightsName":"设备库管理","child":[{"id":"libAssemblyLogger","rightsName":"组件","child":[{"id":"libAssemblyLoggerView","rightsName":"查看权限","child":[],"sn":69},{"id":"libAssemblyLoggerEdit","rightsName":"编辑权限","child":[],"sn":70},{"id":"libAssemblyLogger","rightsName":"启停用权限","child":[],"sn":72},{"id":"libAssemblyLoggerImport","rightsName":"导入权限","child":[],"sn":71}],"sn":66},{"id":"libInverterManage","rightsName":"逆变器","child":[{"id":"libInverterManageView","rightsName":"查看权限","child":[],"sn":73},{"id":"libInverterManageEdit","rightsName":"编辑权限","child":[],"sn":74},{"id":"libInverterManageImport","rightsName":"导入权限","child":[],"sn":75},{"id":"libInverterManageSwitch","rightsName":"启停用权限","child":[],"sn":76}],"sn":67},{"id":"libCameraManage","rightsName":"摄像头","child":[{"id":"libCameraManageView","rightsName":"查看权限","child":[],"sn":77},{"id":"libCameraManageEdit","rightsName":"编辑权限","child":[],"sn":78},{"id":"libCameraManageImport","rightsName":"导入权限","child":[],"sn":79},{"id":"libCameraManageSwitch","rightsName":"启停用权限","child":[],"sn":80}],"sn":68}],"sn":65}],"sn":64}],"msg":null});
Mock.mock("/user/getUserInfo.do",{"code":"100","body":{"password":"4607e782c4d86fd5364d7e4508bb10d9","loginId":"18782275148","icon":"/images/icon/15178812490361.jpg","userTel":"18782275148","userName":"某某","userId":"36","email":""},"msg":"查询成功"});
Mock.mock("/user/getRoleByOrgId.do",{"code":"100","body":[{"name":"电站业主","value":"6"},{"name":"技术部主管","value":"7"},{"name":"采购","value":"8"},{"name":"执行经理","value":"9"},{"name":"默认管理员","value":"10"},{"name":"默认管理员","value":"1"},{"name":"默认管理员","value":"12"},{"name":"默认管理员","value":"13"}],"msg":"查询成功"});
Mock.mock("/user/listUserInfo.do",{"code":"100","body":{"recordsFiltered":23,"data":[{"loginId":"sysadmin","orgName":"协能共创","roleName":"超级管理员","icon":"/images/icon/15178834078071.png","userTel":"13312345678","id":"1","userName":"系统管理员","email":"sysadmin@synpowertech.com","orgId":"1","status":"1"},{"loginId":"13823311273","orgName":"协能共创","roleName":"默认电站业主","icon":"","userTel":"13823311273","id":"9","userName":"超级管理员","email":"12111zzz@qq.com","orgId":"1","status":"1"},{"loginId":"15114020380","orgName":"协能共创","roleName":"执行经理","icon":"","userTel":"15114020380","id":"10","userName":"超级管理员","email":"5456@aa.com","orgId":"1","status":"1"},{"loginId":"18109075660","orgName":"科亚机电有限责任公司","roleName":"超级管理员","icon":"","userTel":"18109075660","id":"11","userName":"W周","email":"--","orgId":"2","status":"1"},{"loginId":"18144366396","orgName":"协能共创","roleName":"默认管理员","icon":"","userTel":"18144366396","id":"12","userName":"徐帅","email":"7845714852@qq.com","orgId":"1","status":"1"},{"loginId":"13438007067","orgName":"协能共创","roleName":"商务部主管","icon":"","userTel":"13438007067","id":"13","userName":"张杰","email":"--","orgId":"1","status":"1"},{"loginId":"18982112651","orgName":"协能共创","roleName":"电站业主","icon":"","userTel":"18982112651","id":"14","userName":"邓宇","email":"--","orgId":"1","status":"1"},{"loginId":"18215621580","orgName":"科亚机电有限责任公司","roleName":"执行经理","icon":"","userTel":"18215621580","id":"15","userName":"鲁班","email":"--","orgId":"2","status":"1"},{"loginId":"17705228629","orgName":"科亚机电有限责任公司","roleName":"执行经理","icon":"","userTel":"17705228629","id":"17","userName":"刁亚斌","email":"--","orgId":"2","status":"1"},{"loginId":"15905228000","orgName":"科亚机电有限责任公司","roleName":"超级管理员","icon":"","userTel":"15905228000","id":"18","userName":"王在峰","email":"--","orgId":"2","status":"1"}],"draw":"1","recordsTotal":23},"msg":null});
Mock.mock("/user/selectUserInfo.do",{"code":100,"body":{"email":"admin@synpowertech.com","loginId":"13888888888","org":"成都协能共创","role":"1","status":"1","userName":"帅哥","userTel":"13888888888","icon":"","useTel":true},"msg":{"errorType":"1001","message":"先学习！"}});
Mock.mock("/user/updateUserInfo.do",{"code":"100","msg":{"message":"编辑成功"}});
Mock.mock("/user/updateUserPwd.do",{"code":"100","body":{},"msg":null});
Mock.mock("/user/insertUserFormId.do",{"code":"100","body":{},"msg":null});
Mock.mock("/userwx/getInfoForLink.do",{"code":"100","body":{"orgList":[{"value":"协能共创","id":1},{"value":"南京合桥","id":2},{"value":"公司3","id":3},{"value":"公司4","id":4},{"value":"公司5","id":5}],"plantList":[{"value":"徐州电站","id":1,"creationTime":"2017-8-1"},{"value":"上海电站","id":2,"creationTime":"2017-5-1"},{"value":"北京电站","id":3,"creationTime":"2018-1-1"},{"value":"成都电站","id":4,"creationTime":"2018-2-3"},{"value":"山东电站","id":5,"creationTime":"2017-9-21"}],"roleList":[{"value":"超级管理员","id":1},{"value":"电站业主","id":2},{"value":"默认管理员","id":3},{"value":"运维","id":4}]},"msg":null});
Mock.mock("/userwx/saveSharedLink.do",{"code":"100","body":{"linkCode":"lksdfhklxcjlxc132546"},"msg":null});
Mock.mock("/userwx/updateUserName.do",{"code":"100","body":{},"msg":null});
Mock.mock("/userwx/updateUserTel.do",{"code":"100","body":{},"msg":null});
Mock.mock("/userwx/updateOwner.do",{"body":"","code":100,"msg":"修改业主账号成功/失败"});
Mock.mock("/userwx/savePlantOwner.do",{"body":"","code":100,"msg":"新增业主账号成功/失败"});
Mock.mock("/userwx/deleteOwner.do",{"body":"","code":100,"msg":"删除成功/失败"});
Mock.mock("/userwx/quicklyRegister.do",{"body":"","code":100,"msg":"成功/失败"});

  $.ajaxPrefilter(function (options, originalOptions, jqXHR) { if((options.type).toUpperCase() == 'GET'){options.cache = true;} (!(/^\//.test(options.url))) && (options.url = "/" + options.url)});
 }); 