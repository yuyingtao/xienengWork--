module.exports = {
    'loginIn.do':{
        code:'100',
        body:{
            "tokenId|1000000-1000000000": 100,
            userName:'系统管理员',
            rightList:[
                {id:'mapView'},
                {id:'energyKPI',child:[{id: 'rightControl1'}]},
                {id:'uEdiet'}
                //{id:'uEdiet',childs:[{id: 'rightControl2'}]}
            ],
        },
        msg:{
            errorType:'1001',
            message:'先学习！'
        }
    },
    "getLogoAndName.do":{
        "code": "100",
        "body": {
            "logoName": "智慧能源管理系统",
            "logoImg": "/images/systemImages/screenLogo.png",
            screenTime:1521776393731
        },
        "msg": "查询成功"
    },
    "isLogin.do":{
        code:'100',
        body:{
            userRole:'Admin',
            userName:'系统管理员'
        },
        msg:{
            errorType:'1001',
            message:'先学习！'
        }
    },
    "queryUserRolSrc.do":{
        code:'100',
        body:[
            {id:'mapView'},
            {id:'energyKPI',childs:[{id: 'rightControl1'}]},
            {id:'uEdiet'}
            //{id:'uEdiet',childs:[{id: 'rightControl2'}]}
        ],
        msg:'网络连接错误'
    },
    "exit.do":{
        code:'100',
        body:'',
        msg:''
    },
    "getCurrentEMS.do":{
        code:'100',
        body:{
            currentCurve:{
                "time": ['0:00','0:15','0:30','0:45','1:00','1:15','1:30','1:45','2:00','2:15','2:30','2:45','3:00','3:15','3:30','3:45','4:00','4:15','4:30','4:45','5:00','5:15','5:30','5:45','6:00'],
                "unit": "A",
                "name": "电流",
                "value": [20,20,20,20,20,-40,-40,-40,-40,-40,-40,-40,-40,80,80,80,80,-50,-50,-50,-50,-50,-50,-50,-50]

            }
        },
        msg:'网络连接错误！'
    },
    //实时功率曲线
    "getPowerCurve.do":{
        code:'100',
        body:{
            "time": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
            "unit": "kW",
            "power": [{
                "name": "充放电功率",
                "value": [-145,158,22,356,235,145,247,23,486,256,-200,159,400,257,87,345,45,47,123,-45,-67,187]
            },
                {
                    "name": "电网功率",
                    "value": [125,215,-13,251,264,189,102,345,192,30,478,25,-215,313,151,264,189,-132,345,92,30,-78]
                },
                {
                    "name": "用电功率",
                    "value": [458,0,200,100,304,258,1,-300,-247,20,456,325,300,478,54,-100,189,102,345,192,-30,-178]
                },
                {
                    "name":"用电量",
                    "value":[199,233,345,53,78,90,234,45,123,157,2,66,23,455,489,54,366,288,258,480]
                }
            ]
        },
        msg:'网络连接错误！'
    },
    "getPlantInfo.do":{
        code:'100',
        body:{
            "plantName": "成都高新区美年电站",
            "capacity": "1000kW",
            "gridConnectedDate": "2017-5-1",
            "runDays": "80天",
            "loaction": [30.629169,104.079373],
            "plantPhoto": "",
            "plantAddr": "电站地址"
        },
        msg:'网络连接错误'
    },
    //发电量统计
    "generationStatics.do":{
        code:100,
        "body": {
            "datas":
                {
                    "unity1": "kWh",
                    "unity2": "元",
                    "maxData1": "30000",
                    "maxData2": "20000",

                    "xData": [
                        "12月",
                        "1月",
                        "2月",
                        "3月",
                        "4月",
                        "5月",
                        "6月",
                        "7月",
                        "8月",
                        "9月",
                        "10月",
                        "11月"
                    ],
                    "yData1": [
                        "2000",
                        "1500",
                        "1800",
                        "30000",
                        "2600",
                        "4000",
                        "3500",
                        "2500",
                        "1500",
                        "5000",
                        "4500",
                        "4000"
                    ],
                    "yData2": [
                        "10000",
                        "12000",
                        "13000",
                        "5000",
                        "11000",
                        "8000",
                        "20000",
                        "18000",
                        "14000",
                        "20000",
                        "18000",
                        "19000"
                    ]
                },
            "month": {
                "unity": "kwh",
                "value": 24775
            },
            "year": {
                "unity": "kwh",
                "value": 34540
            }
        }
    },
    //电站分布
    "distribution.do":{
        code:'100',
        body:[
            {
                name: '四川',
                value: '120',
                unit:"mW"
            },{
                name: '河北',
                value: '115',
                unit:"kW"
            },{
                name: '江苏',
                value: '113',
                unit:"kW"
            },{
                name: '河南',
                value: '95',
                unit:"mW"
            },{
                name: '上海',
                value: '92',
                unit:"kW"
            },{
                name: '北京',
                value: '87',
                unit:"kW"
            },{
                name: '深圳',
                value: '87',
                unit:"kW"
            },{
                name: '广州',
                value: '60',
                unit:"kW"
            },{
                name: '江西',
                value: '60',
                unit:"mW"
            },{
                name: '浙江',
                value: '50',

            },{
                name: '陕西',
                value: '50',
                unit:"kW"
            },{
                name: '广西',
                value: '30',
                unit:"kW"
            },{
                name: 'XXX',
                value: '30',
                unit:"kW"
            },{
                name: 'XXX',
                value: '30',
                unit:"kW"
            },{
                name: 'XXX',
                value: '30',
                unit:"kW"
            }],
        msg:'网络连接错误'
    },
    "palants.do":{
        code:'100',
        body:{
            country:[
                {id:'11',name: '中国',type: 0,level: 1,"singlePlantType|1":[0,1,2],location: [30.40,104.04]},
                {id:'22',name: '挪威',type: 0,level: 1,"singlePlantType|1":[0,1,2],location: [70.51, 27.43]}
            ],
            province:[
                {id:'111',name: '四川',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [30.40,104.04]},
                {id:'112',name: '辽宁',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [41.48,123.25]},
                {id:'113',name: '广东',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [23.08,113.14]},
                {id:'114',name: '浙江',type: 0,level: 2,"singlePlantType|1":[0,1,2],location: [30.16,120.10]}
            ],
            plant:[
                {id:'1111',name: '电站1',type: 2,"singlePlantType|1":[0,1,2],location: [30.57,104.06]},
                {id:'1112',name: '电站2',type: 2,"singlePlantType|1":[0,1,2],location: [28.74,101.90]},
                {id:'1113',name: '电站3',type: 2,"singlePlantType|1":[0,1,2],location: [32.25,107.52]},
                {id:'1114',name: '电站4',type: 2,"singlePlantType|1":[0,1,2],location: [33.81,102.73]}
            ],
        },
        msg:'网络连接错误'
    },
    //电站规模
    "getPlantCount.do":{
        code:100,
        body:{
            datas:[{
                value: 45,
                name: '5kW以下'
            }, {
                value: 20,
                name: '5-10kW'
            }, {
                value: 65,
                name: '10kW-1MW'
            }, {
                value: 65,
                name: '1MW-10MW'
            }, {
                value: 65,
                name: '10MW'
            }],
            totalCapacity:"20000MW",
            totalPlant:'1234座'
        },
        msg:''
    },
    "getCountry.do":{
        code:'100',
        body:[
            {id:'11',name: '中国',type: 0,level: 1, toType: 0,"singlePlantType|1":[0,1,2],location: [30.40,104.04]},
            {id:'22',name: '挪威',type: 0,level: 1, toType: 0,"singlePlantType|1":[0,1,2],location: [70.51, 27.43]}
        ],
        msg:'网络连接错误'
    },
    //社会贡献
    "contribution.do":{
        code:100,
        body:[{
            name:'CO₂减排',
            value:1231,
            unity:"t"
        },{
            name:'等效植树',
            value:1131,
            unity:"棵"
        },{
            name:'节约标准煤',
            value:1331,
            unity:"t"
        }]
    },
    //设备分布
    "plantDistribution.do":{
        code:100,
        body:{
            partCount:'10',
            inverterCount:'100',
            plantArea:'960'
        }
    },
    //电站运营
    "business.do":{
        code:100,
        body:{
            businessNum:'800',
            controlNum:'678',
            roleNum:'312',
            serviceNum:'159',
            totalNum:1949,
            businessName:'监控1',
            roleName:'售后2',
            serviceName:'服务3',
            controlName:'运维4'
        },
        msg:''
    },
    "districtManage.do":function (param) {
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
    },
    "getAllPlant.do":function (param) {
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
    },
    "getProvince.do":{
        code:'100',
        body:[
            {id:'111',name: '四川',level:2,type: 0,level: 2, toType: 1,"singlePlantType|1":[0,1,2],location: [30.40,104.04]},
            {id:'112',name: '辽宁',level:2,type: 0,level: 2, toType: 1,"singlePlantType|1":[0,1,2],location: [41.48,123.25]},
            {id:'113',name: '广东',level:2,type: 0,level: 2, toType: 1,"singlePlantType|1":[0,1,2],location: [23.08,113.14]},
            {id:'114',name: '浙江',level:2,type: 0,level: 2, toType: 1,"singlePlantType|1":[0,1,2],location: [30.16,120.10]}
        ],
        msg:'网络连接错误'
    },
    "getPlant.do":{
        code:'100',
        body:[
            {id:'1111',name: '电站1',type: 2,"singlePlantType|1":[0,1,2],location: [30.57,104.06]},
            {id:'1112',name: '电站2',type: 2,"singlePlantType|1":[0,1,2],location: [28.74,101.90]},
            {id:'1113',name: '电站3',type: 2,"singlePlantType|1":[0,1,2],location: [32.25,107.52]},
            {id:'1114',name: '电站4',type: 2,"singlePlantType|1":[0,1,2],location: [33.81,102.73]}
        ],
        msg:'网络连接错误'
    },
    "postTest.do":{
        code:100,
        body:'',
        msg:''
    },
    'basicStatic.do':{
        code:100,
        body: {
            "logoImg": "",
            "logoName": "协能共创科技有限公司",
            "screenTime": "1512978365000",
            "totalGen|+1": 1000.023,
            "totalGenUnity": "kWh"
        },
        msg:''
    },
    'introduction.do':{
        code:100,
        "body": {
            "description": "新能源行业领先的新能源管理平新能源行业领先的新能源管新能源行业领先的新能源管新能源行业领先的新能源管新能源行业领先的新能源管新能源行业领先的新能源管台及解决方案",
            "image": "",
            "title": "协能共创科技有限公司"
        },
        msg:''
    },
    'plantInfo.do':{
        code:100,
        "body": {
            "img": null,
            "address": "四川省成都市高新区美年广场",
            "capacity": "100",
            "unit": "kW",
            "singlePlantType": 1,
            "location": '104.079373,30.629169',
            "name": "高新美年电站",
            "remark": "该电站是四川省最大的电站",
            "recentWeather":[
                {
                    actulWeather:10,
                    dayPictureUrl:'/images/weather/qing.png',
                    temperature:'11~1',
                    weather:'晴',
                    wind:'微风',
                    dataTime:1521698400273,
                    currentTemperature:8
                },
                {
                    dayPictureUrl:'/images/weather/duoyun.png',
                    temperature:'11~1',
                    weather:'晴',
                    wind:'微风'
                },{
                    dayPictureUrl:'/images/weather/xiaoyu.png',
                    temperature:'11~1',
                    weather:'晴',
                    wind:'微风'
                }
            ],
            "cameraInfos|5-8":[{
                "id|+1":1,
                name:'@word(6, 8)',
                "sn":"@guid",
                "channel":1
            }]
        },
        msg:''
    },
    'dynamicStatics.do':{
        code:100,
        "body": {
            "activePower": {
                "curData2": 5175,
                "curTime": "12:15",
                "unit": "kw",
                "xData": ["6:00", "6:05", "6:10", "6:15", "6:20", "6:25", "6:30", "6:35", "6:40", "6:45", "6:50", "6:55", "7:00", "7:05", "7:10", "7:15", "7:20", "7:25", "7:30", "7:35", "7:40", "7:45", "7:50", "7:55", "8:00", "8:05", "8:10", "8:15", "8:20", "8:25", "8:30", "8:35", "8:40", "8:45", "8:50", "8:55", "9:00", "9:05", "9:10", "9:15", "9:20", "9:25", "9:30", "9:35", "9:40", "9:45", "9:50", "9:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55", "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00"],
                "yData2": [0, 143, 284, 423, 560, 695, 828, 959, 1088, 1215, 1340, 1463, 1584, 1703, 1820, 1935, 2048, 2159, 2268, 2375, 2480, 2583, 2684, 2783, 2880, 2975, 3068, 3159, 3248, 3335, 3420, 3503, 3584, 3663, 3740, 3815, 3888, 3959, 4028, 4095, 4160, 4223, 4284, 4343, 4400, 4455, 4508, 4559, 4608, 4655, 4700, 4743, 4784, 4823, 4860, 4895, 4928, 4959, 4988, 5015, 5040, 5063, 5084, 5103, 5120, 5135, 5148, 5159, 5168, 5175, 5180, 5183, 5184, 5183, 5180, 5175, 5168, 5159, 5148, 5135, 5120, 5103, 5084, 5063, 5040, 5015, 4988, 4959, 4928, 4895, 4860, 4823, 4784, 4743, 4700, 4655, 4608, 4559, 4508, 4455, 4400, 4343, 4284, 4223, 4160, 4095, 4028, 3959, 3888, 3815, 3740, 3663, 3584, 3503, 3420, 3335, 3248, 3159, 3068, 2975, 2880, 2783, 2684, 2583, 2480, 2375, 2268, 2159, 2048, 1935, 1820, 1703, 1584, 1463, 1340, 1215, 1088, 959, 828, 695, 560, 423, 284, 143, 0],
                "yData1":  [0, 100, 200, 300, 350, 360, 370, 400, 410, 420, 430, 440, 450, 460, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            "energyStatic": {
                "capacity": 100,
                "res": "正常发电中",
                "type": "0",
                "value": 80
            },
            "genIncome": {
                "genToday": 23,
                "genTodayUnity": "度",
                "income": 29,
                "incomeUnity": "元",
                "totalGen": "23458",
                "totalGenUnity": "度",
                "totalIncome": "5456",
                "totalIncomeUnity": "元"
            }
        },
        "msg": "测试内容7n7j"
    }

};