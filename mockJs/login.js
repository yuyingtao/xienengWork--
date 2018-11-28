module.exports = {
    'loginIn.do': {
        "code": "100",
        "body": {
            "loginId": "18782275148",
            "userName": "小智",
            "iconUrl": "/images/plantImages/1516778892949.jpg",
            "email": "",
            "roleId": "4",
            "rights": null,
            "id": "36",
            "tokenId": "410792247517384704",
            "gender": "1",
            "userOrg": {
                "id": 1,
                "orgName": "协能共创",
                "orgLogo": null,
                "orgDesc": "新能源行业领先的新能源管理平台及解决方案供应商,公司注重人才的凝聚培养与技术的研发创新，致力于通过先进的技术，为全球绿色能源的应用和高效管理提供解决方案",
                "orgType": "0",
                "orgPhoto": null,
                "fatherId": 0,
                "lastModifyTime": 1517304864916,
                "lastModifyUser": 1,
                "orgCode": "X64340",
                "orgValiCode": "SP00001",
                "orgAgentorName": "李丹",
                "orgAngetorId": 1,
                "orgAngetorTel": "13536521598",
                "createTime": 1508124799995,
                "createUser": 1,
                "orgStatus": "1",
                "orgValid": "0",
                "controlName": "监控",
                "controlNum": "1",
                "businessName": "运维",
                "businessNum": "3",
                "serviceName": "售后",
                "serviceNum": "2",
                "roleName": "市场",
                "roleNum": "3",
                "totalNum": null,
                "systemLogo": "/images/systemImages/15178851642931.png",
                "systemName": "协能共创光伏",
                "systemLogoEe": "",
                "screenLogo": "/images/systemImages/15174538356271.jpg",
                "screenName": null
            },
            "userTel": "18782275148",
            "userType": "0",
            "plantType": "1",
            "plantNum": "10,1,2",
            "plantId": "1",
            'plantTypeList':'1,4'
        },
        "msg": null
    },
    "loginOut.do": {
        code: '100',
        body: '',
        msg: ''
    },
    "getSysInfo.do": {
        code: '100',
        body: {
            scrollPic: ['/images/loginImages/bg1.jpg', '/images/loginImages/bg2.jpg', '/images/loginImages/bg3.jpg',],
            logoPic: '/images/loginImages/logo.png',
            logoTxt: '光伏智慧管理平台'
        },
        msg: ''
    },
    "dataTable.do": {
        code: '100',
        body: {
            'data|14': [{
                "alarmLevel|1": ["严重", "提示", "一般", "提示"],
                changeTime: '1509608652011',
                "salary|+1": 1,
                "id|+1": 1,
                name: '@first',
                "start_date|1": ["0", "1", "2", "3", "5"],
                position: '@first',
                office: '@first',
                "extn|1": ["0", "1"],
            }],
        },

        msg: ''
    },
    'getAddrLocation.do': {
        code: 100,
        body: {
            addrName: '成都市',
            lat: '11',
            lng: '22'
        }
    },
    'checkLinkCode.do': {
        code: 100,
        body: {
            "createUser":"张三",
            "orgName":"协能共创",
            "plantList":[
                "徐州电站","北京电站"
            ],
            "roleName":"超级管理员",
            "userType":0
        }
    },
    'checkRegisterUser.do': {
        code: 100,
        body: {}
    },
    'quicklyRegister.do': {
        code: 100,
        body: {}
    }

};