/*!
 * jQuery i18n Plugin v1.0.0
 * https://github.com/ZOMAKE/jquery.i18n
 *
 * Copyright 2017 ZOMAKE,Inc.
 * Released under the Apache Licence 2.0
 */

(function($) {
    var i18nLang = {};
    /*$.getI18n = function (key) {
        var words = key.split('.');
        var word=i18nLang
        $.each(words,function (i,item) {
            word = word[item]
        })
        return word;
    };*/
    $.extend({
        i18n: function(options) {
            var defaults = {
                attribute: "i18n",
                lang: "",
                defaultLang: "",
                filePath: "/i18n/",
                filePrefix: "i18n_",
                fileSuffix: "",
                forever: true,
                callback: function() {}
            };

            function getCookie(name) {
                var arr = document.cookie.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var arr1 = arr[i].split('=');
                    if (arr1[0] == name) {
                        return arr1[1];
                    }
                }
                return '';
            }
            function setCookie(name, value, myDay) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + myDay);
                document.cookie = name + '=' + value + '; expires=' + oDate;
            }
            var options = $.extend(defaults, options);

            if (getCookie('i18n_lang') != "" && getCookie('i18n_lang') != "undefined" && getCookie('i18n_lang') != null) {
                defaults.defaultLang = getCookie('i18n_lang');
            } else if (options.lang == "" && defaults.defaultLang == "") {
                throw "defaultLang must not be null !";
            }
            if (options.lang != null && options.lang != "") {
                if (options.forever) {
                    setCookie('i18n_lang', options.lang);
                } else {
                    $.removeCookie("i18n_lang");
                }
            } else {
                options.lang = defaults.defaultLang;
            }
            var i = $("[" + options.attribute + "]");
            var getPath = [''];
            getPath[0]=options.filePath + options.filePrefix + options.lang + options.fileSuffix;
            // getPath.push[(options.filePath + options.filePrefix + options.lang + options.fileSuffix)]
            // debugger;
            // return
            require(getPath,function(data){

                if (data != null) {
                    i18nLang = data;
                }

                $(i).each(function(i) {
                    var i18nOnly = $(this).attr("i18n-only");
                    if ($(this).val() != null && $(this).val() != "") {
                        //判断是否是option的value
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "value") {
                            if($(this)[0].tagName=='OPTION'){
                                var words = $(this).attr("value").split('.');
                                var word=i18nLang
                                $.each(words,function (i,item) {
                                    word = word[item]
                                })
                                $(this).attr("value",word)
                            }else{
                                var words = $(this).attr("i18n").split('.');
                                var word=i18nLang
                                $.each(words,function (i,item) {
                                    word = word[item]
                                })
                                $(this).val(word)
                            }
                        }
                    }
                    if ($(this).html() != null && $(this).html() != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "html") {
                            var words = $(this).attr("i18n").split('.');
                            var word=i18nLang
                            $.each(words,function (i,item) {
                                word = word[item]
                            })
                            $(this).html(word)
                        }
                    }
                    if ($(this).attr('placeholder') != null && $(this).attr('placeholder') != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "placeholder") {
                            var words = $(this).attr("i18n").split('.');
                            var word=i18nLang
                            $.each(words,function (i,item) {
                                word = word[item]
                            })
                            $(this).attr('placeholder',word)
                        }
                    }
                    if ($(this).attr('title') != null && $(this).attr('title') != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "title") {
                            var words = $(this).attr("i18n").split('.');
                            var word=i18nLang
                            $.each(words,function (i,item) {
                                word = word[item]
                            })
                            $(this).attr('title', word)
                        }
                    }
                    if ($(this).attr('alt') != null && $(this).attr('alt') != "") {
                        if (i18nOnly == null || i18nOnly == undefined || i18nOnly == "" || i18nOnly == "alt") {
                            var words = $(this).attr("i18n").split('.');
                            var word=i18nLang
                            $.each(words,function (i,item) {
                                word = word[item]
                            })
                            $(this).attr('alt', word)
                        }
                    }
                });
                options.callback();
            })

        },
        getI18n : function (key) {
        var words = key.split('.');
        var word=i18nLang
        $.each(words,function (i,item) {
            word = word[item]
        })
        return word;
    }
    });
})(jQuery);
