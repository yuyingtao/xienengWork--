/**
 * Created by SP0015 on 2018/1/11.
 */
module.exports = {
    'deleteDevice.do': {
        "body": "",
        "code": 100,
        "msg": "删除成功/失败"
    },
    'getInventerNum.do': {
        "body": {
            "collName": "某某某",
            "serialPort": [{
                "spMax": 5,
                "spName": "串口1",
                "spId": "1",
                "datas":[
                    {
                        "addr":"001",
                        "devName":"aaaaa",
                        "id":"1",
                        "model":"华为SUN2000-36KTL",
                        "model_id":[0,0],
                        "type":"组串式逆变器",
                        "type_id":"0"
                    },{
                        "addr":"002",
                        "devName":"aaaaa",
                        "id":"1",
                        "model":"华为SUN2000-36KTL",
                        "model_id":[0,0],
                        "type":"组串式逆变器",
                        "type_id":"0"
                    },{
                        "addr":"003",
                        "devName":"aaaaa",
                        "id":"1",
                        "model":"华为SUN2000-36KTL",
                        "model_id":[0,0],
                        "type":"组串式逆变器",
                        "type_id":"0"
                    },{
                        "addr":"004",
                        "devName":"aaaaa",
                        "id":"1",
                        "model":"华为SUN2000-36KTL",
                        "model_id":[0,0],
                        "type":"组串式逆变器",
                        "type_id":"0"
                    },{
                        "addr":"005",
                        "devName":"aaaaa",
                        "id":"1",
                        "model":"华为SUN2000-36KTL",
                        "model_id":[0,0],
                        "type":"组串式逆变器",
                        "type_id":"0"
                    }]
            },{
                "spMax": 3,
                "spId": "2",
                "spName": "串口2"
            }],
            "num": 10,
            "id":123
        },
        "code": 100,
        "msg": "该数采已存在！"
    },
    'getModel.do': {
        "body": [[{
            "id":1,
            "name":"华为"
        },{
            "id":2,
            "name":"阳光"
        },{
            "id":3,
            "name":"固德威"
        }],[{
            "id":1,
            "name":"SUN2000-36KTL"
        },{
            "id":2,
            "name":"SUN2000-50KTL"
        },{
            "id":3,
            "name":"SUN2000-60KTL"
        },{
            "id":4,
            "name":"SUN2000-70KTL"
        },{
            "id":5,
            "name":"SUN2000-80KTL"
        }]],
        "code": 100,
        "msg": ""
    },
    'getDevType.do': {
        "code": "100",
        "body":{},
        "msg": null
    },
    'updateDevice.do': {
        "body": "关注/取消关注成功",
        "code": 100,
        "msg": "修改成功"
    },
    'updateSelfDevice.do': {
        "body": "关注/取消关注成功",
        "code": 100,
        "msg": "修改成功"
    }
};