/**
 * 2018/11/19
 * @author hh.todd@qq.com
 * @description
 * @param:
*/
module.exports = {
    'plantInfo.do': {
        "body": {
            "name": "环球中心某某电站",
            "addr": {
                "administrativeAddr":"四川省成都市高新区环球中心1700号",
                "detail":"四川省成都市高新区环球中心1700号",
                "loaction":"30.64242,104.64242",
                "administrative":[{
                    "name":"中国",
                    "lat":"30.64242",
                    "lng":"104.64242"
                },{
                    "name":"四川省",
                    "lat":"30.64242",
                    "lng":"104.64242"
                },{
                    "name":"成都市",
                    "lat":"30.65984",
                    "lng":"104.10194"
                },{
                    "name":"武侯区",
                    "lat":"30.64242",
                    "lng":"104.04311"
                }]
            },
            "area": "123",
            "capacity": "500",
            "capacityUnit": "千瓦",
            "collector": [{
                "id": "1",
                "inventerNum": 5,
                "maxNum":10,
                "collName": "某某某",
                "no": "f652fs633f",
                "serialPort": [{
                    "spMax": 5,

                    "spId": "1",
                    "spName": "串口1",
                    "datas":[{
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
                }]
            },{
                "id": "2",
                "inventerNum": 8,
                "maxNum":8,
                "no": "v54158521f"
            }],
            "owner": [{
                "id": "1",
                "userName": "张三",
                "userTel": "18782254147"
            },{
                "id": "2",
                "userName": "李四",
                "userTel": "18782254148"
            }],
            "pic": "/images/img_2@2x.png",
            "price": "100",
            "type": [123,224]
        },
        "code": 100,
        "msg": "0.0177"
    },
    'updatePlantInfo.do': {
        "body": "",
        "code": 100,
        "msg": "上传成功/失败"
    },
    'uploadPhoto.do': {
        "body": "",
        "code": 100,
        "msg": "上传成功/失败"
    },
    'deletePlantPhoto.do': {
        "body": "",
        "code": 100,
        "msg": "删除成功/失败"
    },
    'getPlantType.do': {
        "body": [[{
            "id":123,
            "name":"分布式"
        },{
            "id":232,
            "name":"户用"
        },{
            "id":1223,
            "name":"集中式"
        }],[{
            "id":223,
            "name":"工商业屋顶"
        },{
            "id":224,
            "name":"村级扶贫"
        },{
            "id":225,
            "name":"其他"
        }]],
        "code": 100,
        "msg": ""
    },
    'insertPlantInfo.do': {
        "body": {
            "plantId": "18782275148"
        },
        "code": 100,
        "msg": "新建电站成功/失败"
    },
};