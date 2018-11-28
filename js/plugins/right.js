+(function () {
    'use strict';
    define(['jquery'], function ($) {
        var system = {
            login: {
                type: 'GET',
                url: "login.html"
            },
            noFound: {
                type: 'GET',
                url: "404.html"
            },
            noRight: {
                type: 'GET',
                url: "401.html"
            },
            toLogin: {
                type: "GET",
                url: "partial/login.html"
            },
            noService: {
                type: "GET",
                url: "500.html"
            }
        };

        var userRole = {};

        return {
            errorPage:system,
            login: function (tokenId, user) {
                tokenId && Cookies.setCookByName('tokenId', tokenId);
                if (user) {
                    Cookies.setCookByName('userName', user.userName);
                    Cookies.setCookByName('loginId', user.loginId);
                    Cookies.setCookByName('roleId', user.roleId);
                    Cookies.setCookByName('id', user.id);
                    Cookies.setCookByName('plantNum', user.plantNum);
                    Cookies.setCookByName('plantId', user.plantId);
                }
            },
            /**
             * 判断是否登录系统
             */
            isLogin: function () {
                var tokenId = Cookies.getCook('tokenId');
                //var tokenId = 380323655558762496
                //alert(localStorage.getItem('url'))
                if(tokenId){
                    tokenId = tokenId;
                }else{
                    if(localStorage.getItem('login') === null){
                        tokenId = null;
                    }else{
                        tokenId = '';
                    }
                }
                return tokenId;
                var loginFlag = false;


                /*
                * tokenId ='' 退出按钮
                * tokenId =null 清空缓存
                * tokenId = tokenId 登录
                * */
                /*$.ajax({
                    url:'/interface/isLogin',
                    type:'post',
                    dataType:'JSON',
                    data:$(".cus-login-box").serializeArray(),
                    success:function (result) {
                        if(!result.success){
                            loginFlag = true;
                        }
                    },
                    error:function (e) {
                        console.log(e)
                    }
                })*/
                // $.http.POST('/interface/isLogin',{},function(result){
                //     if(result.code =='100'){
                //         loginFlag = true;
                //
                //     }
                // })
                // console.log(loginFlag)
                // return loginFlag;
            },

            /**
             * 根据URL获取权限
             * @param url
             * @returns {*}
             */
            getRight: function (url) {
                var menu = false;
                $.each($.extend(system, userRole), function (i, e) {
                    if (e && e.url && e.url.replace(/^\//, '') == url.replace(/^\//, '')) {
                        menu = e;
                        return false;
                    }
                });
                return menu;
            },

            setUserRole: function (roles) {
                if (roles) {
                    for (var i = 0; i < roles.length; i++) {
                        var role = roles[i];
                        userRole[role.id] = role;

                        var child = role.child;
                        if (child && child.length > 0) {
                            this.setUserRole(child);
                        }
                    }
                }
                window.systemRole = userRole;
            },

            clearUserRole: function () {
                userRole = {};
            },

            /**
             * 检测是否登录
             * @param fn {Function} 回调方法
             */
            checkLogin: function (fn) {
                if (this.isLogin()) {
                    typeof fn == 'function' && fn();
                } else{
                    $(".modal").length && $(".modal").modal("hide");
                    $('#sysBody').loadPage('partial/login.html',function () {
                        // App.alert('登录数据已经清空，请重新登录！')
                    });
                }
            },

            /**
             * 检测页面元素是否有权限，注意id不能重复
             */
            hasElementRight: function () {
                var permissions = $('[permission]');
                if (permissions && permissions.length > 0) {
                    $.each(permissions, function (i, e) {
                        var hasRight = false;
                        var permission = $(e).attr('permission') || e.permission || e.id;
                        $.each(permission.split(/\s+/), function (i, key) {
                            if (window.systemRole[key]) {
                                hasRight = true;
                            } else {
                                hasRight = false;
                                return false;
                            }
                        });
                        if (!hasRight) {
                            //删除input的时候，如果在表格里面，将TD也删除
                            var parent = $(e).parent();
                            if (parent && parent[0].nodeName == 'TD') {
                                $(e).parent().remove();
                            }
                            else {
                                $(e).remove();
                            }
                        }
                    });
                }
            }

        };
    });
})();
