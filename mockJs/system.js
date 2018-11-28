/**
 * Created by SP0004 on 2018/1/2.
 */
module.exports = {
    'getSystemInfo.do': {"code":"100","body":{"serviceNum":"2","businessNum":"3","roleNum":"3","unit":"MW","controlNum":"1","controlName":"监控","businessName":"运维","roleName":"市场","plantArtificialCapacity":41.98,"serviceName":"售后","plantAutomaticCalculation":"1"},"msg":"组织数据查询成功"}
};
module.exports = {
    'getPropagandaPhoto.do':
        {"code":"100",
            "body":["/images/newMain/banner1.jpg","/images/newMain/banner2.jpg","/images/newMain/banner3.jpg"],
            "msg":""
        },
    'getSystemContent.do':
        {
            code: "100",
            body: {systemName: null, loginPhoto: [], loginLogo: null},
            msg: "获取信息 成功"
        },
    'getSystemBasic.do':{
        body: {
            orgDesc: "新能源行业领先的新能源管理平台及解决方案供应商,公司注重人才的凝聚培养与技术的研发创新，致力于通过先进的技术，为全球绿色能源的应用和高效管理提供解决方案",
            orgPhoto: "/images/largeScreen/gobal.png",
            orgPhotoFather: false,
            propagandaPhoto: [],
            propagandaPhotoFather: true,
            screenLogo: "/images/systemImages/screenLogo.png",
            screenLogoFather: false,
            screenName: "智慧能源管理系统",
            systemLogo: "/images/systemImages/logo.png",
            systemLogoFather: false,
            systemName: "协能共创光伏管理系统",
        },
        code:"100",
        msg: "查询成功"
    },
    'getSystemInfo.do':
        {
            code: "100",
            body: {
                businessName:"监屏",
                businessNum:"2",
                controlName:"运维",
                controlNum:"12",
                plantArtificialCapacity:1.39,
                plantAutomaticCalculation:"1",
                roleName:"其他",
                roleNum:"2",
                serviceName:"经营",
                serviceNum:"1",
                unit:"GW"
            },
            msg: "获取信息 成功"
        },
};