/** 2017/10/17
* @author: kj
* @description:
*/
'use strict';
define(['plugins/App','main/configure','plugins/unitConvers','plugins/right'],function(App,Configure,UnitConvers,Menu){
    window.App=App;
    window.Menu = Menu;
    window.UnitConvers = UnitConvers;
    window.windowInter = '';

    // if (typeof window.main != 'undefined' && !window.main) {
    //     window.main = {};
    // }
    window.main = {};
    /******************************************** jquery 公共方法扩展 **************************************************/
    if (jQuery)(function ($) {
        $.extend({
            /**
             * AJAX 请求
             */
            http: {
                /**
                 * Ajax调用扩展
                 *
                 * @param url {string} 链接地址
                 * @param params {Object} 参数
                 * @param callback {Function} 成功回调方法
                 * @param error {Function} 失败回调方法
                 * @param async {Boolean} 是否异步，true:异步（默认） | false:同步
                 * @param validShow {Boolean} 后端返回101错误时，是否需要统一处理错误，true:不需要统一处理错误，在请求处的业务逻辑中自行处理，false:统一处理掉
                 */
                ajax: function (url, params, callback, error, async, validShow) {
                    var send = function () {
                        var sendDone = function () {
                            var defer = $.Deferred();
                            $.ajax({
                                type: "POST",
                                url: url,
                                dataType:'JSON',
                                data: JSON.stringify(params),
                                //timeout : 120000,
                                async: async,
                                success: function (data, status, xhr) {
                                    defer.resolve(true, data, status, xhr);
                                },
                                error: function (data, status, errorThrown) {
                                    defer.resolve(false, data, status, errorThrown);
                                }
                            });
                            return defer.promise();
                        };
                        $.when(sendDone()).done(function (success, data, status, xhr) {
                            if (success) {
                                if (callback && main.checkData(data)) {
                                    try {
                                        switch (parseInt(data.code)){
                                            case 100:callback(data, status, xhr);break;
                                            case 101:validShow ? successCallBack(data, status, xhr) : App.alert({code:data.code,msg:data.msg});break;
                                            // case 103:App.alert({code:data.code,msg:data.msg});break;
                                            case 104:App.alert({code:data.code,msg:data.msg});break;
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }
                                Menu.hasElementRight();
                            }
                            else {
                                if (data.status == 0) {
                                    window.location.reload();
                                } else if (data.status != 200) {
                                    var msg = Msg.ajax.error || (data.statusText + ":" + data.status);
                                    msg = data.status == 502 ? $.getI18n('InvalidGateway') : msg;
                                    msg = data.status == 504 ? $.getI18n('requestTimeout') : msg;
                                    App.alert({
                                        id: data.status,
                                        title: $.getI18n('tips'),
                                        message: msg
                                    }, function () {
                                        // TODO 错误提示后操作，如刷新页面
                                    });
                                    if (error) {
                                        try {
                                            error(data, status, errorThrown);
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                }
                                Menu.hasElementRight();
                            }
                        });
                    };
                    // TODO 验证是否登录
                    if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                        Menu.checkLogin(send);
                    }
                    else {
                        send();
                    }
                },
                /**
                 * 跨域 Ajax 访问
                 * @param url {string} 链接地址
                 * @param params {Object} 参数
                 * @param callback {Function} 成功回调方法
                 * @param error {Function} 失败回调方法
                 * @param async 是否异步，true:异步（默认） | false:同步
                 */
                crossAjax: function (url, params, callback, error, async) {
                    var send = function () {
                        var sendDone = function () {
                            var defer = $.Deferred();
                            $.ajax({
                                type: "GET",
                                url: url,
                                data: JSON.stringify(params),
                                dataType: 'jsonp',
                                jsonp: "jsonCallback",
                                async: async,
                                success: function (data, status, xhr) {
                                    defer.resolve(true, data, status, xhr);
                                },
                                error: function (data, status, errorThrown) {
                                    defer.resolve(false, data, status, errorThrown);
                                }
                            });
                            return defer.promise();
                        };

                        $.when(sendDone()).done(function (success, data, status, xhr) {
                            if (success) {
                                if (callback && main.checkData(data)) {
                                    try {
                                        callback(data, status, xhr);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }
                                Menu.hasElementRight();
                            }
                            else {
                                if (data.status == 0) {
                                    window.location.reload();
                                } else if (data.status != 200) {
                                    var msg = Msg.ajax.error || (data.statusText + ":" + data.status);
                                    msg = data.status == 502 ? $.getI18n('InvalidGateway') : msg;
                                    msg = data.status == 504 ? $.getI18n('requestTimeout') : msg;
                                    App.alert({
                                        id: data.status,
                                        title: $.getI18n('tips'),
                                        message: msg
                                    });
                                    if (error) {
                                        try {
                                            error(data, status, errorThrown);
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                }
                                Menu.hasElementRight();
                            }
                        });
                    };
                    // TODO 验证是否登录
                    if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                        Menu.checkLogin(send);
                    }
                    else {
                        send();
                    }
                },
                GET: function (url, successCallBack, async, validShow) {
                    var send = function () {
                        var sendDone = function () {
                            var defer = $.Deferred();
                            $.ajax({
                                type: "GET",
                                url: url,
                                dataType:'JSON',
                                async: async,
                                success: function (data, status, xhr) {
                                    defer.resolve(true, data, status, xhr);
                                }
                            });
                            return defer.promise();
                        };
                        $.when(sendDone()).done(function (success, data, status, xhr) {
                            if (successCallBack && App.getClassOf(successCallBack) == "Function" && main.checkData(data)) {
                                try {
                                    switch (parseInt(data.code)){
                                        case 100:successCallBack(data, status, xhr);break;
                                        case 101:validShow ? successCallBack(data, status, xhr) : App.alert({code:data.code,msg:data.msg});break;
                                        case 104:App.alert({code:data.code,msg:data.msg});break;
                                    }
                                    // successCallBack(data, status, xhr);
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                            Menu.hasElementRight();
                        });
                    };
                    // TODO 验证是否登录
                    if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                        Menu.checkLogin(send);
                    }
                    else {
                        send();
                    }
                },
                POST: function (url, params, successCallBack, async, validShow) {
                    var send = function () {
                        var sendDone = function () {
                            var defer = $.Deferred();
                            $.ajax({
                                type: "post",
                                url: url,
                                async: async,
                                cache: false,
                                dataType: "json",
                                contentType: 'application/json;charset=utf-8',
                                //contentType:'application/x-www-form-urlencoded',
                                data: JSON.stringify(params),
                                success: function (data, status, xhr) {

                                    defer.resolve(true, data, status, xhr);
                                },
                                error: function (data, status, errorThrown) {
                                    defer.resolve(false, data, status, errorThrown);
                                }
                            });
                            return defer.promise();
                        };
                        $.when(sendDone()).done(function (success, data, status, xhr) {
                            if (success) {

                                if (successCallBack && App.getClassOf(successCallBack) == "Function" && main.checkData(data)) {
                                    try {
                                        switch (parseInt(data.code)){
                                            case 100:successCallBack(data, status, xhr);break;
                                            case 101:validShow ? successCallBack(data, status, xhr) : App.warningDialog(data.msg,1);break;
                                            case 102:App.warningDialog(data.msg,1);break;
                                            case 104:App.alert({code:data.code,msg:data.msg});break;
                                        }

                                    } catch (e) {
                                        console.error(e);
                                    }
                                }
                                Menu.hasElementRight();
                            }
                            else {
                                if (data.status == 0) {
                                    // window.location.reload();
                                } else if (data.status != 200) {
                                    var msg = $.getI18n('tipError') || (data.statusText + ":" + data.status);
                                    msg = data.status == 502 ? $.getI18n('InvalidGateway') : msg;
                                    msg = data.status == 504 ? $.getI18n('requestTimeout') : msg;
                                    try {
                                        switch (parseInt(data.status)){

                                            //60s刷新一次，看版本是否恢复
                                            case 500:Cookies.setCookByName('tokenId', '');$('#sysBody').load(Menu.errorPage.noService.url,function () {
                                                window.errPageInter = setTimeout(function () {
                                                    window.location.href = '/'
                                                },30000)
                                            });break;
                                            case 502:Cookies.setCookByName('tokenId', '');$('#sysBody').load(Menu.errorPage.noService.url,function () {
                                                window.errPageInter = setTimeout(function () {
                                                    window.location.href = '/'
                                                },30000)
                                            });break;
                                            case 504:Cookies.setCookByName('tokenId', '');$('#sysBody').load(Menu.errorPage.noService.url,function () {
                                                window.errPageInter = setTimeout(function () {
                                                    window.location.href = '/'
                                                },30000)
                                            });break;
                                            case 404:Cookies.setCookByName('tokenId', '');$('#sysBody').load(Menu.errorPage.noFound.url,function () {
                                                window.errPageInter = setTimeout(function () {
                                                    window.location.href = '/'
                                                },30000)
                                            });break;
                                            // default:App.alert({
                                            //     code: 502,
                                            //     msg: msg
                                            // }, function () {
                                            //     // TODO 错误提示后操作，如刷新页面
                                            // });
                                        }

                                    } catch (e) {
                                        console.error(e);
                                    }
                                    /*App.alert({
                                        code: 502,
                                        msg: msg
                                    }, function () {
                                        // TODO 错误提示后操作，如刷新页面
                                    });*/
                                }
                            }

                        });
                    };
                    // TODO 验证是否登录
                    if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                        Menu.checkLogin(send);
                    }
                    else {
                        send();
                    }
                },
                PUT: function (url, params, successCallBack, async) {
                    var send = function () {
                        var sendDone = function () {
                            var defer = $.Deferred();
                            $.ajax({
                                type: "PUT",
                                url: url,
                                dataType:'JSON',
                                async: async,
                                data: JSON.stringify(params),
                                success: function (data, status, xhr) {
                                    defer.resolve(true, data, status, xhr);
                                }
                            });
                            return defer.promise();
                        };
                        $.when(sendDone()).done(function (success, data, status, xhr) {
                            if (successCallBack && App.getClassOf(successCallBack) == "Function" && main.checkData(data)) {
                                try {
                                    successCallBack(data, status, xhr);
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                            Menu.hasElementRight();
                        });
                    };
                    // TODO 验证是否登录
                    if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                        Menu.checkLogin(send);
                    }
                    else {
                        send();
                    }
                },
                DELETE: function (url, successCallBack, async) {
                    var send = function () {
                        var sendDone = function () {
                            var defer = $.Deferred();
                            $.ajax({
                                type: "DELETE",
                                url: url,
                                async: async,
                                success: function (data, status, xhr) {
                                    defer.resolve(true, data, status, xhr);
                                }
                            });
                            return defer.promise();
                        };
                        $.when(sendDone()).done(function (success, data, status, xhr) {
                            if (successCallBack && App.getClassOf(successCallBack) == "Function" && main.checkData(data)) {
                                try {
                                    successCallBack(data, status, xhr);
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                            Menu.hasElementRight();
                        });
                    };
                    // TODO 验证是否登录
                    if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                        Menu.checkLogin(send);
                    }
                    else {
                        send();
                    }
                }
            }
        });

        /**
         * jQuery对象方法扩展
         */
        $.fn.extend({
            seek: function (name) {
                return $(this).find('[name=' + name + ']');
            },

            /**
             * 填充元素文本值
             * @param  {[string]} text
             */
            fillText: function (text) {
                return $(this).each(function () {
                    var _dom = $(this)[0];
                    if (_dom.tagName.toUpperCase() === 'INPUT') {
                        $(this).val(text);
                    } else {
                        $(this).html(text);
                    }
                });
            },

            /**
             * 填充jquery对象指定区域数据
             * 若data为string则填充当前元素
             * @param  {[object | string]} data 填充数据对象{k: v, ...}
             */
            fill: function (data) {
                return $(this).each(function () {
                    if (typeof data === 'string') {
                        $(this).fillText(data);
                    } else {
                        for (var k in data) {
                            $(this).seek(k).fillText(data[k]);
                        }
                    }
                });
            },

            /**
             * 为jquery对象添加src属性值
             * @param  {[string]} url    请求url
             * @param  {[object]} params 请求参数
             */
            attrSrc: function (url, params) {
                return $(this).each(function () {
                    url += '?';
                    for (var k in params) {
                        url += k + '=' + params[k] + '&';
                    }
                    url += '_t=' + new Date().getTime();
                    $(this).attr('src', url);
                });
            },

            /**
             * placeholder支持
             */
            placeholderSupport: function () {
                var $this = $(this);
                var pm = $this.prop('placeholder') || $this.attr('placeholder');
                var message = main.eval(pm);
                if ('placeholder' in document.createElement('input')) {
                    $this.attr("placeholder", message);
                } else {
                    var spanMessage = $("<span>" + message + "</span>");
                    var tw = Number(this.width());
                    var left = 0 - (this.width() + 5);
                    spanMessage.css({'position': 'relative', 'top': 5}).css('left', left)
                        .css({"color": '#b0b0b0', "font-size": '10pt', 'cursor': 'text'})
                        .css({'width': this.width(), 'height': $this.height(), 'overflow': 'hidden'})
                        .css({'display': 'inline-block', 'word-break': 'keep-all'})
                        .css('margin-right', left).attr('title', message);
                    spanMessage.click(function () {
                        $this.focus();
                    });
                    $this.parent().append(spanMessage);

                    $this.on('keyup blur', function () {
                        var v = $this.val();
                        if (v && v.length > 0) {
                            spanMessage.hide();
                        } else {
                            spanMessage.show();
                        }
                    });
                }
            },

            /**
             * 载入远程 HTML 文件代码并插入至 DOM 中
             * @param url: '链接地址'
             * @param params {Object} 参数 key/value 数据
             * @param callback 载入成功时回调函数
             */
            loadPage: function (url, params, callback) {
                var $this = $(this);
                $this.css('visibility','hidden');
                if (App.getClassOf(params) == 'Function') {
                    callback = params;
                    params = {};
                }
                !params && (params = {});
                var preLoad = url.replace('.html','');
                var action = Configure[preLoad];
                localStorage.setItem('oldurl',url);
                var loadMainPage = function () {
                    localStorage.setItem('url',url);
                    require(action.styles || [], function () {
                        $this.empty();
                        $this.load(url, function (data, status, xhr) {
                            Menu.hasElementRight();
                            var loadList = [];
                            action.loadJs && (loadList = loadList.concat(action.loadJs));
                            require(loadList, function () {
                                $.each(arguments, function (i, arg) {
                                    if (arg) {
                                        App.getClassOf(arg.Render) == 'Function' &&
                                        $(function () {
                                            try {
                                                arg.Render(params)
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        });
                                    }
                                });
                                App.getClassOf(callback) == 'Function' && callback(data, arguments);
                                Menu.hasElementRight();

                                $.i18n({
                                    defaultLang: window.sysLang,
                                    filePath: "plugins/i18n/",
                                    filePrefix: "i18n_",
                                    forever: true,
                                    callback: function () {
                                        $this.css('visibility','visible');
                                    }
                                });
                            });
                        });
                    });
                };
                // 验证是否登录
                if (!(url.indexOf('login') != -1 || url.indexOf('xxx2') != -1 )) {
                    Menu.checkLogin(loadMainPage);
                }
                else {
                    loadMainPage();
                }
            }
        });


        //同时执行多个不同api接口的且需要各自的最后一次时的ajax
        window.pendingRequests = {};
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

            var key=options.url;
            if (!pendingRequests[key] && key.indexOf('.html') == -1) {
                // console.log(false)
                pendingRequests[key]=[];
                pendingRequests[key].push(jqXHR)
            }else{
                // console.log(true)
                !pendingRequests[key] && (pendingRequests[key] = []);
                pendingRequests[key].push(jqXHR)
            }
            for(var i in pendingRequests){
                var len=pendingRequests[i].length;

                for(var j=0;j<len-1;j++){
                    pendingRequests[i][j].abort()
                }
            }
            setTimeout(function () {
                var complete = options.complete;
                options.complete = function (jqXHR, textStatus) {
                    delete pendingRequests[key];
                    if ($.isFunction(complete)) {
                        complete.apply(this, arguments);
                    }
                };
            },0)
        });
    })(jQuery);

    /**
     * 加载系统页面--企业用户（多电站）（系统模块入口）
     */
    main.loadSys = function () {
        console.time('系统界面加载');
        Menu.clearUserRole();
        if (Menu.isLogin()) {
            $(document).unbind('keydown');

            var bdy = $('#sysBody');

            // $('body').css('background','#cae4c0')
            // var enterPath = 'partial/main.html';
            var defaultLoading = 'main';
            var enterPath = 'partial/main.html';

            var prevLoad = function () {
                console.timeEnd('系统界面加载');
                document.title = $.getI18n('sysTitle');
            };
            //大屏
            if (Cookies.getCook("defaultLoading") == "synpowerScreen") {
                enterPath = 'partial/largeScreen/index.html';
                defaultLoading = "synpowerScreen";
            }
            //单电站
            if (Cookies.getCook("defaultLoading") == "singleSys") {
                defaultLoading = "singleSys";
            }
            //能耗系统
            if (Cookies.getCook("defaultLoading") == "energySys") {
                enterPath = 'partial/energyEfficient/index.html';
                defaultLoading = "energySys";
                $('body').css({'background':'#1955c2 url("/images/energyEfficient/bg1.png") no-repeat','background-size': '100% 100%'})
                $("body").mCustomScrollbar('destroy');
                $("body").mCustomScrollbar({
                    theme:"3d",
                    axis:"yx" // vertical and horizontal scrollbar
                });
            }
            //光储系统
            if (Cookies.getCook("defaultLoading") == "main") {
                $('body').css('background','#cae4c0')
            }

            Cookies.setCookByName('defaultLoading', defaultLoading);
            $.http.POST('/user/queryUserRolSrc.do', {tokenId:Cookies.getCook('tokenId'),uId:Cookies.get('id')}, function (res) {
                Menu.setUserRole(res.body);
                bdy.loadPage(enterPath, {}, function(){
                    prevLoad()
                    if (Cookies.getCook("defaultLoading") == "singleSys") {
                        defaultLoading = "singleSys";
                        $('#mianPage_container').loadPage('partial/plantMonitor/pmSingleIndex.html');
                    }else {
                        $("nav ul li").eq(0).click()
                    }
                });
            }, null, false);
        }else {
            $('#sysBody').loadPage('partial/login.html');
        }
    };
    /**
     * 加载系统页面--个人用户（单电站）（系统模块入口）
     */
    main.loadSingleSys = function () {
        console.time('系统界面加载');
        Menu.clearUserRole();
        if (Menu.isLogin()) {
            $(document).unbind('keydown');

            var bdy = $('#sysBody');
            $('body').css('background','#cae4c0')
            var defaultLoading = 'singleSys';
            var enterPath = 'partial/plantMonitor/pmSingleIndex.html';
            var prevLoad = function () {
                console.timeEnd('系统界面加载');
                document.title = $.getI18n('sysTitle');
            };
            if (Cookies.getCook("defaultLoading") == "synpowerScreen") {
                enterPath = 'partial/largeScreen/index.html';
                defaultLoading = "synpowerScreen";
            }
            if (Cookies.getCook("defaultLoading") == "main") {
                enterPath = 'partial/main.html';
                defaultLoading = "main";
            }
            Cookies.setCookByName('defaultLoading', defaultLoading);
            $.http.POST('/user/queryUserRolSrc.do', {tokenId:Cookies.getCook('tokenId'),uId:Cookies.get('id')}, function (res) {
                /*var customRight= [
                    //电站监控
                    {
                        id: 'plantMon',
                        child: [{id: 'PlantMonView'}, {id: 'deviceControlEdit'}]
                    },
                    //智能运维
                    {id: 'iom', child: [{id: 'alarmView'}]},
                    //分析报表
                    {
                        id: 'report',
                        child: [{id: 'runReportView'}, {id: 'compReportView'}, {id: 'hisReportView'}]
                    },
                    //企业大屏
                    {
                        id: 'screen',
                        child: [{id: 'screenView'}]
                    },
                    //账号及权限
                    {
                        id: 'accountAndAuthority',
                        child: [
                            //我的信息
                            {id: 'myInfo', child: [{id: 'myInfoView'}, {id: 'myInfoEdit'}]},
                            //组织信息
                            {
                                id: 'groupInfo',
                                child: [{id: 'groupInfoView'}, {id: 'groupInfoEdit'}, {id: 'groupInfoNew'}, {id: 'groupInfoDelete'}]
                            },
                            //账户管理
                            {
                                id: 'accountManage',
                                child: [{
                                    id: 'accountManageView'
                                }, {
                                    id: 'accountManageEdit'
                                }, {
                                    id: 'accountManageNew'
                                }, {
                                    id: 'accountManageDelete'
                                }]
                            },
                            //角色权限
                            {
                                id: 'roleAuthority',
                                child: [{
                                    id: 'roleAuthorityView'
                                }, {
                                    id: 'roleAuthorityEdit'
                                }, {
                                    id: 'roleAuthorityNew'
                                }, {
                                    id: 'roleAuthorityDelete'
                                }]
                            },
                            //电站权限
                            {id: 'plantAuthority', child: [{id: 'plantAuthorityView'}, {id: 'plantAuthorityEdit'}]}
                        ]
                    },
                    //电站管理
                    {
                        id: 'plantManage',
                        child: [
                            //电站信息管理
                            {
                                id: 'plantInfoManage',
                                child: [{
                                    id: 'plantInfoManageView'
                                }, {
                                    id: 'plantInfoManageEdit'
                                }, {
                                    id: 'plantInfoManageNew'
                                }, {
                                    id: 'plantInfoManageDelete'
                                }]
                            },
                            //电站业主管理
                            {
                                id: 'plantOwnerManage',
                                child: [{
                                    id: 'plantOwnerManageView'
                                }, {
                                    id: 'plantOwnerManageEdit'
                                }, {
                                    id: 'plantOwnerManageNew'
                                }, {
                                    id: 'plantOwnerManageDelete'
                                }]
                            },
                            //设备管理
                            {id: 'deviceManage', child: [{id: 'dataLogger'}, {id: 'dataLoggerView'}]},
                            //逆变器管理
                            {id: 'inverterManage', child: [{id: 'inverterManageView'}]},
                            //摄像头管理
                            {
                                id: 'cameraManage',
                                child: [{
                                    id: 'cameraManageView'
                                }, {
                                    id: 'cameraManageEdit'
                                }, {
                                    id: 'cameraManageNew'
                                }, {
                                    id: 'cameraManageDelete'
                                }]
                            }
                        ]
                    },
                    //系统设置
                    {
                        id: 'sysSetting',
                        child: [
                            //企业个性化设置
                            {id: 'enterpriseSetting', child: [{id: 'enterpriseSettingView'}, {id: 'enterpriseSettingEdit'}]},
                            //其他设置
                            {id: 'elseSetting', child: [{id: 'elseSettingView'}, {id: 'elseSettingEdit'}]}
                        ]
                    }
                ]
                Menu.setUserRole(customRight);*/
                Menu.setUserRole(res.body);
                bdy.loadPage(enterPath, {}, prevLoad);
            }, null, false);
        }else {
            $('#sysBody').loadPage('partial/login.html');

        }
    };

    /**
     * 加载大屏
     */
    main.loadSynpowerScreen = function () {
        console.time('大屏加载');
        if (Menu.isLogin()) {
            var bdy = $('#sysBody');
            $('body').css('background','#cae4c0')
            var defaultLoading = 'singleSys';
            var enterPath = 'partial/largeScreen/index.html';
            var prevLoad = function () {
                console.timeEnd('大屏加载');
                document.title = $.getI18n('sysTitle');
            };
            Cookies.setCookByName('defaultLoading', defaultLoading);
            $.http.POST('/user/queryUserRolSrc.do', {tokenId:Cookies.getCook('tokenId'),uId:Cookies.get('id')}, function (res) {
                if (res.code =='100') {
                    Menu.setUserRole(res.body);
                    bdy.loadPage(enterPath, {}, prevLoad);
                }
            }, null, false);
        }else {
            $('#sysBody').loadPage('partial/login.html');

        }
    };
    /**
     * 加载能耗系统
     */
    main.loadEnergySys = function () {
        console.time('能耗系统加载');
        if (Menu.isLogin()) {
            var bdy = $('#sysBody');


            $('body').css({'background':'#1955c2 url("/images/energyEfficient/bg1.png") no-repeat','background-size': '100% 100%'})
            $("body").mCustomScrollbar('destroy');
            $("body").mCustomScrollbar({
                theme:"3d",
                axis:"yx" // vertical and horizontal scrollbar
            });
            var defaultLoading = 'energySys';
            var enterPath = 'partial/energyEfficient/index.html';
            var prevLoad = function () {
                console.timeEnd('能耗系统加载');
                document.title = '企业智慧能源管理平台';
            };
            Cookies.setCookByName('defaultLoading', defaultLoading);
            $.http.POST('/user/queryUserRolSrc.do', {tokenId:Cookies.getCook('tokenId'),uId:Cookies.get('id')}, function (res) {
                if (res.code =='100') {
                    Menu.setUserRole(res.body);
                    bdy.loadPage(enterPath, {}, prevLoad);
                }
            }, null, false);
        }else {
            $('#sysBody').loadPage('partial/login.html');

        }
    };
    main.clearInterCharge = function(inter,domId){
        if(!$('#'+domId).length){
            clearInterval(inter);
            return true;
        }
        return false;
    };
    main.clearTimeCharge = function(inter,domId){
        if(!$('#'+domId).length){
            if(typeof inter === 'string'){
                clearTimeout(inter);
            }else { //数组
                for(var i in inter){
                    clearTimeout(inter[i]);
                }
            }
            return true;
        }
        return false;
    };
    /**
     * 检查ajax响应数据状态
     * @param data
     */
    main.checkData = function (data) {
        data = typeof data == "string" ? JSON.parse(data) : data;
        if (data && !data.success) {
            if (data.data && data.data.failCode && data.data.failCode == "306") {
                Cookies.clearById('tokenId');
                App.dialog('close');
                App.alert({
                    id: 'right',
                    title: $.getI18n('tips'),
                    message: Msg.systemSetting.relogin
                }, function () {
                    //sso需放开
                    //window.location = data.data.message;
                    Cookies.clearById('tokenId');
                    window.location = "/";
                });
                //session过期后, 使用top来获取页面引用, redirect到登录界面
                //否则大屏会出现地图层redirect到登录页面, 而大屏模块仍展示的情况
            } else if (data.data && data.data.failCode && data.data.failCode == "307") {
                Cookies.clearById('tokenId');
                App.dialog('close');
                App.alert({
                    id: 'right',
                    title: $.getI18n('tips'),
                    message: $.getI18n('forcedLanding')
                }, function () {
                    Cookies.clearById('tokenId');
                    window.location = "/";
                });
            } else if (data.data && data.data.failCode && data.data.failCode == "401") {
                App.alert({
                    id: 'right',
                    title: $.getI18n('tips'),
                    message: $.getI18n('noRight')
                });
            } else if (data.data && data.data.failCode && data.data.failCode == "305") {
                Cookies.clearById('tokenId');
                window.location = data.data.message;
            } else if (data.data && data.data.failCode && data.data.failCode == "404") {
                App.alert({
                    id: 'right',
                    title: $.getI18n('tips'),
                    message: $.getI18n('noPage')
                });
            } else if (data.data && data.data.failCode && data.data.failCode == "405") {
                App.dialog('close');
                Cookies.clearById('tokenId');
                App.alert({
                    id: 'right',
                    title: $.getI18n('tips'),
                    message: $.getI18n('toUpdate')
                }, function () {
//                	sso 需放开
                    //window.location = data.data.message;
                    //session过期后, 使用top来获取页面引用, redirect到登录界面
                    //否则大屏会出现地图层redirect到登录页面, 而大屏模块仍展示的情况
                    Cookies.clearById('tokenId');
                    window.location = "/";
                });
            } else {
                return true;
            }
        } else {
            return true;
        }

    };
    /**
     * storage 变化处理方法
     */
    main.storageChange = function (e) {
        if ((e.key == "userid" && e.newValue != e.oldValue && e.oldValue) || (!e.key && !Cookies.getCook('tokenId'))) {
            if ($.trim(sessionStorage.getItem("sId")) != "") {
                window.location = "/";
            } else {
                window.location.reload();
            }
        } else if (e.key == "userName" && e.newValue != e.oldValue) {
            $("#userName").html(e.newValue);
        } else if (e.key == "userAvatar" && e.newValue != e.oldValue) {
            $("#userImage").attr("src", "/user/getImage?t=" + e.newValue).error(function () {
                $(this).attr('src', '/images/main/userHead.png');
            });
        }
    };
});
