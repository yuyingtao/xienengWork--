/**
 * Created by SP0015 on 2018/1/11.
 */
module.exports = {
    'getAllRights.do': {
        "code": "100",
        "body": {
            list: [{
                "children": [
                    {
                        "hasChild": false,
                        "name": "多电站监控",
                        "showType": "0",
                        "pId": "1",
                        "id": 9,
                        "open": false,
                        "describeMsg": "多电站监控多电站监控多电站监控多电站监控多电站监控多电站监控多电站监控",
                        "chkDisabled":true
                    },
                    {
                        "hasChild": false,
                        "name": "单电站监控",
                        "showType": "0",
                        "pId": "1",
                        "id": 10,
                        "open": false,
                        "describeMsg": "单电站监控多电站监控多电站监控多电站监控多电站监控多电站监控"
                    },
                    {
                        "hasChild": false,
                        "name": "设备控制",
                        "showType": "0",
                        "pId": "1",
                        "id": 11,
                        "open": false,
                        "describeMsg": "设备控制多电站监控多电站监控多电站监控多电站监控多电站监控多电站监控"
                    }
                ],
                "name": "电站监控",
                "showType": "1",
                "pId": "0",
                "id": 1,
                "open": false,
                "describeMsg": "电站监控多电站监控多电站监控多电站监控多电站监控多电站监控"
            },
                {
                    "children": [
                        {
                            "hasChild": false,
                            "name": "告警查看",
                            "showType": "0",
                            "pId": "2",
                            "id": 12,
                            "open": false,
                            "describeMsg": "告警查看多电站监控多电站监控多电站监控多电站监控多电站监控"
                        }
                    ],
                    "name": "智能运维",
                    "showType": "1",
                    "pId": "0",
                    "id": 2,
                    "open": false,
                    "describeMsg": "智能运维多电站监控多电站监控多电站监控多电站监控多电站监控"
                },
                {
                    "children": [
                        {
                            "hasChild": false,
                            "name": "电站运行报表",
                            "showType": "0",
                            "pId": "3",
                            "id": 13,
                            "open": false,
                            "describeMsg": "电站运行报表多电站监控多电站监控多电站监控多电站监控多电站监控"
                        },
                        {
                            "hasChild": false,
                            "name": "电站对比报表",
                            "showType": "0",
                            "pId": "3",
                            "id": 14,
                            "open": false,
                            "describeMsg": "电站对比报表多电站监控多电站监控多电站监控多电站监控多电站监控"
                        },
                        {
                            "hasChild": false,
                            "name": "历史数据曲线",
                            "showType": "0",
                            "pId": "3",
                            "id": 15,
                            "open": false,
                            "describeMsg": "历史数据曲线多电站监控多电站监控多电站监控多电站监控多电站监控"
                        }
                    ],
                    "name": "分析报表",
                    "showType": "1",
                    "pId": "0",
                    "id": 3,
                    "open": false,
                    "describeMsg": "分析报表多电站监控多电站监控多电站监控"
                },
                {
                    "children": [
                        {
                            "hasChild": false,
                            "name": "大屏监视",
                            "showType": "0",
                            "pId": "4",
                            "id": 16,
                            "open": false,
                            "describeMsg": "大屏监视多电站监控多电站监控多电站监控"
                        }
                    ],
                    "name": "企业大屏",
                    "showType": "1",
                    "pId": "0",
                    "id": 4,
                    "open": false,
                    "describeMsg": "企业大屏"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "editLook":"0",
                                    "pId": "17",
                                    "id": 29,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "17",
                                    "id": 30,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "我的信息",
                            "showType": "0",
                            "pId": "5",
                            "id": 17,
                            "open": false,
                            "describeMsg": "我的信息"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "18",
                                    "checked":false,
                                    "id": 31,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "18",
                                    "id": 32,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "新增权限",
                                    "showType": "0",
                                    "pId": "18",
                                    "id": 33,
                                    "open": false,
                                    "describeMsg": "新增权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "删除权限",
                                    "showType": "0",
                                    "pId": "18",
                                    "id": 34,
                                    "open": false,
                                    "describeMsg": "删除权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "组织信息",
                            "showType": "0",
                            "pId": "5",
                            "id": 18,
                            "open": false,
                            "describeMsg": "组织信息"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "19",
                                    "id": 35,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "19",
                                    "id": 36,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "新增权限",
                                    "showType": "0",
                                    "pId": "19",
                                    "id": 37,
                                    "open": false,
                                    "describeMsg": "新增权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "删除权限",
                                    "showType": "0",
                                    "pId": "19",
                                    "id": 38,
                                    "open": false,
                                    "describeMsg": "删除权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "账户管理",
                            "showType": "0",
                            "pId": "5",
                            "id": 19,
                            "open": false,
                            "describeMsg": "账户管理"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "20",
                                    "id": 39,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "20",
                                    "id": 40,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "新增权限",
                                    "showType": "0",
                                    "pId": "20",
                                    "id": 41,
                                    "open": false,
                                    "describeMsg": "新增权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "删除权限",
                                    "showType": "0",
                                    "pId": "20",
                                    "id": 42,
                                    "open": false,
                                    "describeMsg": "删除权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "角色权限",
                            "showType": "0",
                            "pId": "5",
                            "id": 20,
                            "open": false,
                            "describeMsg": "角色权限"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "21",
                                    "id": 43,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "21",
                                    "id": 44,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "电站权限",
                            "showType": "0",
                            "pId": "5",
                            "id": 21,
                            "open": false,
                            "describeMsg": "电站权限"
                        }
                    ],
                    "name": "账号及权限",
                    "showType": "1",
                    "pId": "0",
                    "id": 5,
                    "open": false,
                    "describeMsg": "账号及权限"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "22",
                                    "id": 45,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "22",
                                    "id": 46,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "新增权限",
                                    "showType": "0",
                                    "pId": "22",
                                    "id": 47,
                                    "open": false,
                                    "describeMsg": "新增权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "删除权限",
                                    "showType": "0",
                                    "pId": "22",
                                    "id": 48,
                                    "open": false,
                                    "describeMsg": "删除权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "电站信息管理",
                            "showType": "0",
                            "pId": "6",
                            "id": 22,
                            "open": false,
                            "describeMsg": "电站信息管理"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "23",
                                    "id": 49,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "23",
                                    "id": 50,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "新增权限",
                                    "showType": "0",
                                    "pId": "23",
                                    "id": 51,
                                    "open": false,
                                    "describeMsg": "新增权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "删除权限",
                                    "showType": "0",
                                    "pId": "23",
                                    "id": 52,
                                    "open": false,
                                    "describeMsg": "删除权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "电站业主管理",
                            "showType": "0",
                            "pId": "6",
                            "id": 23,
                            "open": false,
                            "describeMsg": "电站业主管理"
                        }
                    ],
                    "name": "电站管理",
                    "showType": "0",
                    "pId": "0",
                    "id": 6,
                    "open": false,
                    "describeMsg": "电站管理"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "24",
                                    "id": 53,
                                    // "check_Child_State":0,
                                    // "checked":true,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "数采管理",
                            "showType": "0",
                            "pId": "7",
                            "id": 24,
                            "open": false,
                            "describeMsg": "数采管理"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "25",
                                    "id": 54,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "逆变器管理",
                            "showType": "0",
                            "pId": "7",
                            "id": 25,
                            "open": false,
                            "describeMsg": "逆变器管理"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "26",
                                    "id": 55,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "26",
                                    "id": 56,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "新增权限",
                                    "showType": "0",
                                    "pId": "26",
                                    "id": 57,
                                    "open": false,
                                    "describeMsg": "新增权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "删除权限",
                                    "showType": "0",
                                    "pId": "26",
                                    "id": 58,
                                    "open": false,
                                    "describeMsg": "删除权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "\t摄像头管理",
                            "showType": "0",
                            "pId": "7",
                            "id": 26,
                            "open": false,
                            "describeMsg": "\t摄像头管理"
                        }
                    ],
                    "name": "设备管理",
                    "showType": "0",
                    "pId": "0",
                    "id": 7,
                    "open": false,
                    "describeMsg": "设备管理"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "27",
                                    "id": 59,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "27",
                                    "id": 60,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "企业个性化设置",
                            "showType": "0",
                            "pId": "8",
                            "id": 27,
                            "open": false,
                            "describeMsg": "企业个性化设置"
                        },
                        {
                            "children": [
                                {
                                    "hasChild": false,
                                    "name": "查看权限",
                                    "showType": "0",
                                    "pId": "28",
                                    "id": 61,
                                    "open": false,
                                    "describeMsg": "查看权限"
                                },
                                {
                                    "hasChild": false,
                                    "name": "编辑权限",
                                    "showType": "0",
                                    "pId": "28",
                                    "id": 62,
                                    "open": false,
                                    "describeMsg": "编辑权限"
                                }
                            ],
                            "hasChild": true,
                            "name": "其他设置",
                            "showType": "0",
                            "pId": "8",
                            "id": 28,
                            "open": false,
                            "describeMsg": "其他设置"
                        }
                    ],
                    "name": "系统设置",
                    "showType": "0",
                    "pId": "0",
                    "id": 8,
                    "open": false,
                    "describeMsg": "系统设置"
                }
            ]
        },
        "msg": null
    },
};