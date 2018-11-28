/** 2017/10/17
* @author: kj
* @description: 引入系统所需插件及依赖
*/
require.config({
    baseUrl:'/js/',
    paths: {
        'jquery': 'vendor/jquery/jquery.min',
        'validation': 'plugins/jquery-validation/dist/jquery.validate',
        'mustache': 'plugins/mustache.min',
        'bootstrap': 'vendor/bootstrap/js/bootstrap',
        'mCustomScrollbar': 'plugins/mCustomScrollbar/jquery.mCustomScrollbar',
        'dataTables': 'plugins/dataTables/media/js/jquery.dataTables',
        'App': 'plugins/App',
        'main': 'main',
        'Cookies': 'plugins/Cookies',
        'md5': 'plugins/md5',
        'Echarts': 'plugins/Echarts',
        'leaflet':'plugins/Leaflet/leaflet',
        'WdatePicker':'plugins/My97DatePicker/WdatePicker',
        'ztree':'plugins/ztree/js/jquery.ztree.all.min',
        'uuid':'plugins/uuid/Math.uuid',
        'moment':'plugins/moment',
        'MapUtil':'plugins/Leaflet/MapUtil',
        'i18n':'plugins/jquery.i18n-1.0.0/jquery.i18n',
        'wxLogin':'plugins/wxLogin/wxLogin'
    },
    shim:{
        'validation':['jquery'],
        'i18n':['jquery'],
        'bootstrap':['jquery','css!vendor/bootstrap/css/bootstrap.css'],
        'leaflet':['css!plugins/Leaflet/leaflet.css'],
        'dataTables':['jquery','css!plugins/dataTables/media/css/jquery.dataTables.min.css'],
        'ztree':['jquery','css!plugins/ztree/css/zTreeStyle/zTreeStyle.css'],
        'mCustomScrollbar':['plugins/mCustomScrollbar/jquery.mousewheel.min','css!plugins/mCustomScrollbar/jquery.mCustomScrollbar.min.css'],
        'MapUtil':['leaflet'],
        'right':['Cookies']
    },
    waitSeconds: 15
});
// 使用 Mock
require(["jquery",
    "mustache",
    "moment",
    "i18n",
    // "echarts",
    "dataTables",
    "Cookies",
    "wxLogin",
    "ztree",
    "validation",
    "md5",
    "bootstrap",
    "mCustomScrollbar"
],function($,mustache,moment){

    window.sysLang = 'zh-cn'; //默认语言
    var defaultLang = window.sysLang;
    $.i18n({
        defaultLang: defaultLang,
        filePath: "plugins/i18n/",
        filePrefix: "i18n_",
        forever: true
    });
    if(window.errPageInter){
        clearTimeout(window.errPageInter)
    }
    //
    var arr = window.location.href.split('/');
    var arr1 = [];
    arr1.push(arr[0]);
    arr1.push(arr[1]);
    arr1.push(arr[2]);
    var url = arr1.join('/');
    window.URLHREF= url;
    // window.URLHREF= 'https://www.dev.synpowertech.com/'
    // window.URLHREF= 'http://192.168.1.105:8080/box-web'
    window.Mustache = mustache;

    window.moment = moment;
    require([
        "main",
        "uuid",
        "WdatePicker",
        // "Echarts",
        "css!/css/dataTablesExp.css",
        "css!/css/index.css"],function(){

        $(function(){
            /*window.Echarts=echarts;
            if(!Echarts){
                require(["js/plugins/echarts/echarts.min.js"],function (echarts) {
                    Echarts = echarts;
                })
            }*/
            var isMock = false;


            if(isMock){
                require(['./main/MockData'],function () {
                    main.loadSys();
                })

            }else {
                main.loadSys();
            }

            $(document).keyup(function(event){
                if(event.ctrlKey && event.keyCode === 13){
                    App.fullScreen()
                }
            });
            // $('#sysBody').height(window.screen.height)
            /*$(".sp-body").mCustomScrollbar({
                theme:"3d",
                axis:"yx" // vertical and horizontal scrollbar
            });*/
            // $("body").mCustomScrollbar('destroy');
        })
    });
});