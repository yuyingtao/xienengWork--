module.exports = {
    'queryUserRolSrc.do': {
        "code": "100",
        "body": [{
            "id": "iom",
            "rightsName": "智能运维",
            "child": [{"id": "alarmView", "rightsName": "告警查看", "child": [], "sn": 12}],
            "sn": 2
        }, {"id": "povertyView", "rightsName": "扶贫管理", "child": []}, {
            "id": "report",
            "rightsName": "分析报表",
            "child": [{"id": "runReportView", "rightsName": "电站运行报表", "child": [], "sn": 13}, {
                "id": "compReportView",
                "rightsName": "电站对比报表",
                "child": [],
                "sn": 14
            }, {"id": "hisReportView", "rightsName": "历史数据曲线", "child": [], "sn": 15}, {
                "id": "eleFeesReportView",
                "rightsName": "电费报表",
                "child": [],
                "sn": 90
            }],
            "sn": 3
        }, {
            "id": "plantMon",
            "rightsName": "电站监控",
            "child": [{"id": "PlantMonView", "rightsName": "多电站监控", "child": [], "sn": 9}, {
                "id": "singlePlantMonView",
                "rightsName": "单电站监控",
                "child": [],
                "sn": 10
            }, {"id": "deviceControlEdit", "rightsName": "设备控制", "child": [], "sn": 11}],
            "sn": 1
        }, {
            "id": "screen",
            "rightsName": "企业大屏",
            "child": [{"id": "screenView", "rightsName": "大屏监视", "child": [], "sn": 16}],
            "sn": 4
        }, {
            "id": "accountAndAuthority",
            "rightsName": "账号及权限",
            "child": [{
                "id": "myInfo",
                "rightsName": "我的信息",
                "child": [{"id": "myInfoView", "rightsName": "查看权限", "child": [], "sn": 29}, {
                    "id": "myInfoEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 30
                }],
                "sn": 17
            }, {
                "id": "groupInfo",
                "rightsName": "组织信息",
                "child": [{"id": "groupInfoView", "rightsName": "查看权限", "child": [], "sn": 31}, {
                    "id": "groupInfoEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 32
                }, {"id": "groupInfoNew", "rightsName": "新增权限", "child": [], "sn": 33}, {
                    "id": "groupInfoDelete",
                    "rightsName": "删除权限",
                    "child": [],
                    "sn": 34
                }],
                "sn": 18
            }, {
                "id": "accountManage",
                "rightsName": "账户管理",
                "child": [{
                    "id": "accountManageView",
                    "rightsName": "查看权限",
                    "child": [],
                    "sn": 35
                }, {"id": "accountManageEdit", "rightsName": "编辑权限", "child": [], "sn": 36}, {
                    "id": "accountManageNew",
                    "rightsName": "新增权限",
                    "child": [],
                    "sn": 37
                }, {"id": "accountManageDelete", "rightsName": "删除权限", "child": [], "sn": 38}],
                "sn": 19
            }, {
                "id": "roleAuthority",
                "rightsName": "角色权限",
                "child": [{
                    "id": "roleAuthorityView",
                    "rightsName": "查看权限",
                    "child": [],
                    "sn": 39
                }, {
                    "id": "roleAuthorityDelete",
                    "rightsName": "删除权限",
                    "child": [],
                    "sn": 42
                }, {"id": "roleAuthorityNew", "rightsName": "新增权限", "child": [], "sn": 41}, {
                    "id": "roleAuthorityEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 40
                }],
                "sn": 20
            }, {
                "id": "plantAuthority",
                "rightsName": "电站权限",
                "child": [{
                    "id": "plantAuthorityEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 44
                }, {"id": "plantAuthorityView", "rightsName": "查看权限", "child": [], "sn": 43}],
                "sn": 21
            }],
            "sn": 5
        }, {
            "id": "plantManage",
            "rightsName": "电站管理",
            "child": [{
                "id": "plantInfoManage",
                "rightsName": "电站信息管理",
                "child": [{
                    "id": "plantInfoManageDelete",
                    "rightsName": "删除权限",
                    "child": [],
                    "sn": 48
                }, {
                    "id": "plantInfoManageNew",
                    "rightsName": "新增权限",
                    "child": [],
                    "sn": 47
                }, {
                    "id": "plantInfoManageEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 46
                }, {"id": "plantInfoManageView", "rightsName": "查看权限", "child": [], "sn": 45}],
                "sn": 22
            }, {
                "id": "plantOwnerManage",
                "rightsName": "电站业主管理",
                "child": [{
                    "id": "plantOwnerManageDelete",
                    "rightsName": "删除权限",
                    "child": [],
                    "sn": 52
                }, {
                    "id": "plantOwnerManageNew",
                    "rightsName": "新增权限",
                    "child": [],
                    "sn": 51
                }, {
                    "id": "plantOwnerManageEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 50
                }, {"id": "plantOwnerManageView", "rightsName": "查看权限", "child": [], "sn": 49}],
                "sn": 23
            }],
            "sn": 6
        }, {
            "id": "sysSetting",
            "rightsName": "系统设置",
            "child": [{
                "id": "enterpriseSetting",
                "rightsName": "企业个性化设置",
                "child": [{
                    "id": "enterpriseSettingEdit",
                    "rightsName": "编辑权限",
                    "child": [],
                    "sn": 60
                }, {"id": "enterpriseSettingView", "rightsName": "查看权限", "child": [], "sn": 59}],
                "sn": 27
            }, {
                "id": "elseSetting",
                "rightsName": "其他设置",
                "child": [{
                    "id": "elseSettingView",
                    "rightsName": "查看权限",
                    "child": [],
                    "sn": 61
                }, {"id": "elseSettingEdit", "rightsName": "编辑权限", "child": [], "sn": 62}],
                "sn": 28
            }, {
                "id": "systemSetting",
                "rightsName": "系统设置",
                "child": [{
                    "id": "systemSettingView",
                    "rightsName": "查看权限",
                    "child": [],
                    "sn": 85
                }, {"id": "systemSettingEdit", "rightsName": "编辑权限", "child": [], "sn": 86}],
                "sn": 84
            }],
            "sn": 8
        }, {
            "id": "deviceManage",
            "rightsName": "设备管理",
            "child": [{
                "id": "deviceLisManage",
                "rightsName": "设备管理",
                "child": [{
                    "id": "dataLogger",
                    "rightsName": "数采管理",
                    "child": [{
                        "id": "dataLoggerView",
                        "rightsName": "查看权限",
                        "child": [],
                        "sn": 53
                    }, {"id": "dataLoggerEdit", "rightsName": "编辑权限", "child": [], "sn": 81}, {
                        "id": "dataLoggerNew",
                        "rightsName": "新增权限",
                        "child": [],
                        "sn": 82
                    }, {"id": "dataLoggerDelete", "rightsName": "删除权限", "child": [], "sn": 83}],
                    "sn": 24
                }, {
                    "id": "inverterManage",
                    "rightsName": "逆变器管理",
                    "child": [{
                        "id": "inverterManageView",
                        "rightsName": "查看权限",
                        "child": [],
                        "sn": 54
                    }, {
                        "id": "inverterManageEdit",
                        "rightsName": "编辑权限",
                        "child": [],
                        "sn": 87
                    }, {
                        "id": "libInverterManageImport",
                        "rightsName": "导入权限",
                        "child": [],
                        "sn": 88
                    }, {"id": "libInverterManageSwitch", "rightsName": "启停用权限", "child": [], "sn": 89}],
                    "sn": 25
                }, {
                    "id": "cameraManage",
                    "rightsName": "\t摄像头管理",
                    "child": [{
                        "id": "cameraManageDelete",
                        "rightsName": "删除权限",
                        "child": [],
                        "sn": 58
                    }, {
                        "id": "cameraManageNew",
                        "rightsName": "新增权限",
                        "child": [],
                        "sn": 57
                    }, {
                        "id": "cameraManageEdit",
                        "rightsName": "编辑权限",
                        "child": [],
                        "sn": 56
                    }, {"id": "cameraManageView", "rightsName": "查看权限", "child": [], "sn": 55}],
                    "sn": 26
                }],
                "sn": 7
            }, {
                "id": "deviceLibManage",
                "rightsName": "设备库管理",
                "child": [{
                    "id": "libAssemblyLogger",
                    "rightsName": "组件",
                    "child": [{
                        "id": "libAssemblyLoggerView",
                        "rightsName": "查看权限",
                        "child": [],
                        "sn": 69
                    }, {
                        "id": "libAssemblyLoggerEdit",
                        "rightsName": "编辑权限",
                        "child": [],
                        "sn": 70
                    }, {
                        "id": "libAssemblyLogger",
                        "rightsName": "启停用权限",
                        "child": [],
                        "sn": 72
                    }, {"id": "libAssemblyLoggerImport", "rightsName": "导入权限", "child": [], "sn": 71}],
                    "sn": 66
                }, {
                    "id": "libInverterManage",
                    "rightsName": "逆变器",
                    "child": [{
                        "id": "libInverterManageView",
                        "rightsName": "查看权限",
                        "child": [],
                        "sn": 73
                    }, {
                        "id": "libInverterManageEdit",
                        "rightsName": "编辑权限",
                        "child": [],
                        "sn": 74
                    }, {
                        "id": "libInverterManageImport",
                        "rightsName": "导入权限",
                        "child": [],
                        "sn": 75
                    }, {"id": "libInverterManageSwitch", "rightsName": "启停用权限", "child": [], "sn": 76}],
                    "sn": 67
                }, {
                    "id": "libCameraManage",
                    "rightsName": "摄像头",
                    "child": [{
                        "id": "libCameraManageView",
                        "rightsName": "查看权限",
                        "child": [],
                        "sn": 77
                    }, {
                        "id": "libCameraManageEdit",
                        "rightsName": "编辑权限",
                        "child": [],
                        "sn": 78
                    }, {
                        "id": "libCameraManageImport",
                        "rightsName": "导入权限",
                        "child": [],
                        "sn": 79
                    }, {"id": "libCameraManageSwitch", "rightsName": "启停用权限", "child": [], "sn": 80}],
                    "sn": 68
                }],
                "sn": 65
            }],
            "sn": 64
        }],
        "msg": null
    },
    // 'queryUserRolSrc.do': {
    //     code: '100',
    //     body: [
    //         //电站监控
    //         {
    //             id: 'plantMon',
    //             child: [{id: 'PlantMonView'}, {id: 'deviceControlEdit'}]
    //         },
    //         //智能运维
    //         {id: 'iom', child: [{id: 'alarmView'}]},
    //         //分析报表
    //         {
    //             id: 'report',
    //             child: [{id: 'runReportView'}, {id: 'compReportView'}, {id: 'hisReportView'}]
    //         },
    //         //企业大屏
    //         {
    //             id: 'screen',
    //             child: [{id: 'screenView'}]
    //         },
    //         //账号及权限
    //         {
    //             id: 'accountAndAuthority',
    //             child: [
    //                 //我的信息
    //                 {id: 'myInfo', child: [{id: 'myInfoView'}, {id: 'myInfoEdit'}]},
    //                 //组织信息
    //                 {
    //                     id: 'groupInfo',
    //                     child: [{id: 'groupInfoView'}, {id: 'groupInfoEdit'}, {id: 'groupInfoNew'}, {id: 'groupInfoDelete'}]
    //                 },
    //                 //账户管理
    //                 {
    //                     id: 'accountManage',
    //                     child: [{
    //                         id: 'accountManageView'
    //                     }, {
    //                         id: 'accountManageEdit'
    //                     }, {
    //                         id: 'accountManageNew'
    //                     }, {
    //                         id: 'accountManageDelete'
    //                     }]
    //                 },
    //                 //角色权限
    //                 {
    //                     id: 'roleAuthority',
    //                     child: [{
    //                         id: 'roleAuthorityView'
    //                     }, {
    //                         id: 'roleAuthorityEdit'
    //                     }, {
    //                         id: 'roleAuthorityNew'
    //                     }, {
    //                         id: 'roleAuthorityDelete'
    //                     }]
    //                 },
    //                 //电站权限
    //                 {id: 'plantAuthority', child: [{id: 'plantAuthorityView'}, {id: 'plantAuthorityEdit'}]}
    //             ]
    //         },
    //         //电站管理
    //         {
    //             id: 'plantManage',
    //             child: [
    //                 //电站信息管理
    //                 {
    //                     id: 'plantInfoManage',
    //                     child: [{
    //                         id: 'plantInfoManageView'
    //                     }, {
    //                         id: 'plantInfoManageEdit'
    //                     }, {
    //                         id: 'plantInfoManageNew'
    //                     }, {
    //                         id: 'plantInfoManageDelete'
    //                     }]
    //                 },
    //                 //电站业主管理
    //                 {
    //                     id: 'plantOwnerManage',
    //                     child: [{
    //                         id: 'plantOwnerManageView'
    //                     }, {
    //                         id: 'plantOwnerManageEdit'
    //                     }, {
    //                         id: 'plantOwnerManageNew'
    //                     }, {
    //                         id: 'plantOwnerManageDelete'
    //                     }]
    //                 },
    //                 //设备管理
    //                 {id: 'deviceManage', child: [{id: 'dataLogger'}, {id: 'dataLoggerView'}]},
    //                 //逆变器管理
    //                 {id: 'inverterManage', child: [{id: 'inverterManageView'},{id:'inverterManageEdit'}]},
    //                 //摄像头管理
    //                 {
    //                     id: 'cameraManage',
    //                     child: [{
    //                         id: 'cameraManageView'
    //                     }, {
    //                         id: 'cameraManageEdit'
    //                     }, {
    //                         id: 'cameraManageNew'
    //                     }, {
    //                         id: 'cameraManageDelete'
    //                     }]
    //                 }
    //             ]
    //         },
    //         //系统设置
    //         {
    //             id: 'sysSetting',
    //             child: [
    //                 //企业个性化设置
    //                 {id: 'enterpriseSetting', child: [{id: 'enterpriseSettingView'}, {id: 'enterpriseSettingEdit'}]},
    //                 //其他设置
    //                 {id: 'elseSetting', child: [{id: 'elseSettingView'}, {id: 'elseSettingEdit'}]},
    //                 {id:'systemSetting',child:[{id:'systemSettingView'},{id:'systemSettingEdit'}]}
    //             ]
    //         },
    //         //设备管理
    //         {
    //             id: 'deviceManage',
    //             child: [
    //                 //设备管理
    //                 {id: 'deviceLisManage',
    //                     child: [
    //                     {id:'dataLogger',
    //                         child:[{
    //                         id:'dataLoggerView'},{id:'dataLoggerEdit'},{id:'dataLoggerNew'},{id:'dataLoggerDelete'}]}
    //                 ,{id:'inverterManage',child:[{id:'inverterManageView'}]},{
    //                     id:'cameraManage',child:[{
    //                         id:'cameraManageView'
    //                             },{id:'cameraManageEdit'},{id:'cameraManageNew'},{id:'cameraManageDelete'}]
    //                         }]},
    //                 //设备库管理
    //                 {id: 'deviceLibManage', child: [{id: 'libAssemblyLogger',child:[{id:'libAssemblyLoggerView'},{id:'libAssemblyLoggerEdit'},{id:'libAssemblyLoggerImport'},{id:'libAssemblyLogger'}]},
    //                     {id: 'libInverterManage',child:[{id:'libInverterManageView'},{id:'libInverterManageEdit'},{id:"libInverterManageImport"},{id:'libInverterManageSwitch'}]},
    //                     {id:'libCameraManage',child:[{id:'libCameraManageView'},{id:"libCameraManageEdit"},{id:'libCameraManageImport'},{id:'libCameraManageSwitch'}]}]}
    //             ]
    //         },
    //     ],
    //     msg:
    //         {
    //             errorType: '1001',
    //             message:
    //                 '先学习！'
    //         }
    // },
    'getUserInfo.do':
        {
            "code": "100",
            "body": {
                "password": "4607e782c4d86fd5364d7e4508bb10d9",
                "loginId": "18782275148",
                "icon": "/images/icon/15178812490361.jpg",
                "userTel": "18782275148",
                "userName": "某某",
                "userId": "36",
                "email": ""
            },
            "msg": "查询成功"
        }
    ,
    'getRoleByOrgId.do':
        {
            "code": "100",
            "body": [{"name": "电站业主", "value": "6"}, {"name": "技术部主管", "value": "7"}, {
                "name": "采购",
                "value": "8"
            }, {"name": "执行经理", "value": "9"}, {"name": "默认管理员", "value": "10"}, {
                "name": "默认管理员",
                "value": "1"
            }, {"name": "默认管理员", "value": "12"}, {"name": "默认管理员", "value": "13"}],
            "msg": "查询成功"
        }
    ,
    'listUserInfo.do':
        {
            "code": "100",
            "body": {
                "recordsFiltered": 23,
                "data": [{
                    "loginId": "sysadmin",
                    "orgName": "协能共创",
                    "roleName": "超级管理员",
                    "icon": "/images/icon/15178834078071.png",
                    "userTel": "13312345678",
                    "id": "1",
                    "userName": "系统管理员",
                    "email": "sysadmin@synpowertech.com",
                    "orgId": "1",
                    "status": "1"
                }, {
                    "loginId": "13823311273",
                    "orgName": "协能共创",
                    "roleName": "默认电站业主",
                    "icon": "",
                    "userTel": "13823311273",
                    "id": "9",
                    "userName": "超级管理员",
                    "email": "12111zzz@qq.com",
                    "orgId": "1",
                    "status": "1"
                }, {
                    "loginId": "15114020380",
                    "orgName": "协能共创",
                    "roleName": "执行经理",
                    "icon": "",
                    "userTel": "15114020380",
                    "id": "10",
                    "userName": "超级管理员",
                    "email": "5456@aa.com",
                    "orgId": "1",
                    "status": "1"
                }, {
                    "loginId": "18109075660",
                    "orgName": "科亚机电有限责任公司",
                    "roleName": "超级管理员",
                    "icon": "",
                    "userTel": "18109075660",
                    "id": "11",
                    "userName": "W周",
                    "email": "--",
                    "orgId": "2",
                    "status": "1"
                }, {
                    "loginId": "18144366396",
                    "orgName": "协能共创",
                    "roleName": "默认管理员",
                    "icon": "",
                    "userTel": "18144366396",
                    "id": "12",
                    "userName": "徐帅",
                    "email": "7845714852@qq.com",
                    "orgId": "1",
                    "status": "1"
                }, {
                    "loginId": "13438007067",
                    "orgName": "协能共创",
                    "roleName": "商务部主管",
                    "icon": "",
                    "userTel": "13438007067",
                    "id": "13",
                    "userName": "张杰",
                    "email": "--",
                    "orgId": "1",
                    "status": "1"
                }, {
                    "loginId": "18982112651",
                    "orgName": "协能共创",
                    "roleName": "电站业主",
                    "icon": "",
                    "userTel": "18982112651",
                    "id": "14",
                    "userName": "邓宇",
                    "email": "--",
                    "orgId": "1",
                    "status": "1"
                }, {
                    "loginId": "18215621580",
                    "orgName": "科亚机电有限责任公司",
                    "roleName": "执行经理",
                    "icon": "",
                    "userTel": "18215621580",
                    "id": "15",
                    "userName": "鲁班",
                    "email": "--",
                    "orgId": "2",
                    "status": "1"
                }, {
                    "loginId": "17705228629",
                    "orgName": "科亚机电有限责任公司",
                    "roleName": "执行经理",
                    "icon": "",
                    "userTel": "17705228629",
                    "id": "17",
                    "userName": "刁亚斌",
                    "email": "--",
                    "orgId": "2",
                    "status": "1"
                }, {
                    "loginId": "15905228000",
                    "orgName": "科亚机电有限责任公司",
                    "roleName": "超级管理员",
                    "icon": "",
                    "userTel": "15905228000",
                    "id": "18",
                    "userName": "王在峰",
                    "email": "--",
                    "orgId": "2",
                    "status": "1"
                }],
                "draw": "1",
                "recordsTotal": 23
            },
            "msg": null
        }
    ,
//编辑用户
    'selectUserInfo.do':
        {
            code: 100,
            "body":
                {
                    "email":
                        "admin@synpowertech.com",
                    "loginId":
                        "13888888888",
                    "org":
                        "成都协能共创",
                    "role":
                        "1",
                    "status":
                        "1",
                    "userName":
                        "帅哥",
                    "userTel":
                        "13888888888",
                    icon:'',
                    'useTel':true
                }
            ,
            msg: {
                errorType: '1001',
                message:
                    '先学习！'
            }
        }
    ,
    'updateUserInfo.do':
        {
            code:"100",
            msg:{
                message:"编辑成功",
            }
        },

    'updateUserPwd.do': {
        "code": "100",
        "body":{},
        "msg": null
    },
    'insertUserFormId.do': {
        "code": "100",
        "body":{},
        "msg": null
    },
};