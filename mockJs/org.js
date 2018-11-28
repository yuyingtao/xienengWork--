/**
 * Created by SP0015 on 2018/1/2.
 */
module.exports = {
    'getOrgTree.do': {
        "code": "100",
        "body": [{
            "orgType": "0",
            "children": [{
                "orgType": "0",
                "iconSkin": "icon01",
                "children": [{
                    "orgType": "0",
                    "iconSkin": "icon01",
                    "children": [],
                    "icon": "/images/setting/file2.png",
                    "name": "科亚机电有限责任公司",
                    "pId": 3,
                    "id": 2
                }, {
                    "orgType": "1",
                    "iconSkin": "icon01",
                    "children": [],
                    "icon": "/images/setting/file2.png",
                    "name": "研发部",
                    "pId": 3,
                    "id": 7
                }],
                "icon": "/images/setting/file2.png",
                "name": "南京合桥",
                "pId": 1,
                "id": 3
            }, {
                "orgType": "0",
                "iconSkin": "icon01",
                "children": [{
                    "orgType": "0",
                    "iconSkin": "icon01",
                    "children": [],
                    "icon": "/images/setting/file2.png",
                    "name": "销售部",
                    "pId": 10,
                    "id": 11
                }],
                "icon": "/images/setting/file2.png",
                "name": "协能2",
                "pId": 1,
                "id": 10
            }],
            "icon": "/images/setting/file.png",
            "name": "协能共创",
            "pId": "0",
            "check": "false",
            "id": 1,
            "open": "true"
        }],
        "msg": null
    },
    'getOrgInfo.do': {
        code: '100',

        body: {
            email: "admin@qq.com",
            loginId: "xiebiao",
            orgCode: "XL5535644",
            orgId: "6",
            orgName: "华南分部",
            'status|1': [1,0],
            userId: "011",
            userTel: "15282542260",
        },

        msg: {
            errorType: '1001',
            message: '先学习！'
        }
    }
};