/**
 * Created by SP0015 on 2018/1/11.
 */
module.exports = {
    'getInfoForLink.do': {
        "code": "100",
        "body": {
            "orgList":[
                {
                    "value": "协能共创",
                    "id": 1
                },
                {
                    "value": "南京合桥",
                    "id": 2
                },
                {
                    "value": "公司3",
                    "id": 3
                },
                {
                    "value": "公司4",
                    "id": 4
                },
                {
                    "value": "公司5",
                    "id": 5
                }
            ],
            "plantList":[
                {
                    "value": "徐州电站",
                    "id": 1,
                    "creationTime":"2017-8-1"
                },
                {
                    "value": "上海电站",
                    "id": 2,
                    "creationTime":"2017-5-1"
                },
                {
                    "value": "北京电站",
                    "id": 3,
                    "creationTime":"2018-1-1"
                },
                {
                    "value": "成都电站",
                    "id": 4,
                    "creationTime":"2018-2-3"
                },
                {
                    "value": "山东电站",
                    "id": 5,
                    "creationTime":"2017-9-21"
                }
            ],
            "roleList":[
                {
                    "value":"超级管理员",
                    "id":1
                },
                {
                    "value":"电站业主",
                    "id":2
                },
                {
                    "value":"默认管理员",
                    "id":3
                },
                {
                    "value":"运维",
                    "id":4
                }
            ]
        },
        "msg": null
    },
    'saveSharedLink.do': {
        "code": "100",
        "body":{
            "linkCode":"lksdfhklxcjlxc132546"
        },
        "msg": null
    },
    'updateUserName.do': {
        "code": "100",
        "body":{},
        "msg": null
    },
    'updateUserTel.do': {
        "code": "100",
        "body":{},
        "msg": null
    },
    'updateOwner.do': {
        "body": "",
        "code": 100,
        "msg": "修改业主账号成功/失败"
    },
    'savePlantOwner.do': {
        "body": "",
        "code": 100,
        "msg": "新增业主账号成功/失败"
    },
    'deleteOwner.do': {
        "body": "",
        "code": 100,
        "msg": "删除成功/失败"
    },
    'quicklyRegister.do': {
        "body": "",
        "code": 100,
        "msg": "成功/失败"
    },
};