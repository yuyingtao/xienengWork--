/**
 * Created by deng on 2017/7/14.
 */
/**
 * 1，系统基础方法 {@code App.XXX}
 * 2，原型扩展 {@code Object.extend(...)}
 * 3，jquery扩展方法及对验证规则的扩展 {@code $Object.XXX}
 * 4，数据访问方法 {@code App.http.XXX}
 *
 * @author P00034
 */
'use strict';
define(['jquery'], function ($) {

    /*****************************************************原型扩展******************************************************
     * @param {Object} target 目标对象。
     * @param {Object} source 源对象。
     * @param {Object} deep 是否复制(继承)对象中的对象。
     * @returns {Object} 返回继承了source对象属性的新对象。
     */
    Object.extend = function (target, source, deep) {
        target = target || {};
        var sType = typeof source, i = 1, options;
        if (sType === 'undefined' || sType === 'boolean') {
            deep = sType === 'boolean' ? source : false;
            source = target;
            target = this;
        }
        if (sType !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
            source = {};
        while (i <= 2) {
            options = i === 1 ? target : source;
            if (options != null) {
                for (var name in options) {
                    var src = target[name], copy = options[name];
                    if (target === copy)
                        continue;
                    if (deep && copy && typeof copy === 'object' && !copy.nodeType)
                        target[name] = this.extend(src ||
                            (copy.length != null ? [] : {}), copy, deep);
                    else if (copy !== undefined)
                        target[name] = copy;
                }
            }
            i++;
        }
        return target;
    };

    /**
     * 字符串（String）原型对象扩展
     */
    Object.extend(String, {

        /**
         * 字符串格式化
         * 例子:
         * String.format("{0}{1}", "hello", "world");
         */
        format: function () {
            if (arguments.length == 0) {
                return null;
            }
            var formatStr = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                formatStr = formatStr.replace(new RegExp('\\{' + (i - 1) + '\\}', 'gm'), arguments[i]);
            }
            return formatStr;
        }
    });
    Object.extend(String.prototype, {
        /**
         * 从字符串中左、右或两端删除空格、Tab、回车符或换行符等空白字符
         */
        trim: function () {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        },
        ltrim: function () {
            return this.replace(/(^\s*)/g, "");
        },
        rtrim: function () {
            return this.replace(/(\s*$)/g, "");
        },
        /**
         * HTML转义字符
         */
        replaceHTMLChar: function () {
            return this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '\"').replace(/&#39;/g, '\'');
        },
        /**
         * 转义特殊字符
         */
        replaceIllegalChar: function () {
            return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\\"/g, '&quot;').replace(/\\'/g, '&#39;');
        },
        /**
         * 以指定字符串匹配字符串头部或尾部，相同时返回true
         * @author cWX235881
         */
        endWith: function (str) {
            if (str == null || str == "" || this.length == 0
                || str.length > this.length)
                return false;
            return (this.substring(this.length - str.length) == str);
        },
        startWith: function (str) {
            if (str == null || str == "" || this.length == 0
                || str.length > this.length)
                return false;
            return (this.substr(0, str.length) == str);
        },
        /**
         * 获取URL传递参数中指定参数名称的值
         * @param name {String} 参数名称
         * @returns {Object} 返回值
         */
        getValue: function (name) {
            var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var b = this.substr(this.indexOf("\?") + 1).match(regex);
            if (b && b != null) return unescape(b[2]);
            return null;
        },
        /**
         * 对数字字符串格式进行小数截断
         * @param length {Int} 小数截断位数
         */
        fixed: function (length) {
            if (isNaN(this))
                return this;
            return parseFloat(Number(this).fixed(length));
        },
        /**
         * 对数字格式进行单位转换
         * @param length {Int} 转换的比率，默认为4，如4：相当于处以10000
         */
        unit: function (length) {
            if (isNaN(this))
                return 0;
            return parseFloat(Number(this).unit(length));
        },
        /**
         * 对数字格式进行
         */
        format: function () {
            var value = this;
            var source = value.replace(/,/g, '').split('.');
            source[0] = source[0].replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
            return source.join('.');
        },
        /**
         * 判断字符串中是否包含指定字符串
         */
        contains: function (str) {
            var value = this;
            return value.indexOf(str) > -1;

        },
        encrypt: function () {
            if (this == undefined || this == null || this == "") {
                return undefined;
            }

            var length = this.length;
            var charArray = [];
            for (var i = 0; i < length; i++) {
                charArray[i] = this.charCodeAt(i);
                charArray[i] = charArray[i] * 2;
            }

            return charArray.toString().replace(/,/g, "@");
        },
        //获取文字宽度
        visualLength:function () {
            var ruler = $("#ruler");
            ruler.text(this);
            return ruler[0].offsetWidth;
        },
        //判断字符串长度
        getBLen : function() {
            var str = this;
            if (str == null) return 0;
            if (typeof str != "string"){
                str += "";
            }
            return str.replace(/[^\x00-\xff]/g,"01").length;
        }
    });

    /**
     * 日期时间（Date）原型对象扩展
     */
    Object.extend(Date, {
        /**
         * 将日期格式字符串转换为Date对象
         * @param strDate {String} 指定格式的时间字符串，必填
         * @param fmt {String} 格式，默认'yyyy-MM-dd HH:mm:ss S'
         * @param timeZone {Number} 时区 ，如 -8 表示 西8区，默认为 操作系统时区
         */
        parse: function (strDate, fmt, timeZone) {
            var da = [];
            if (!isNaN(fmt)) {
                timeZone = fmt;
                fmt = null;
            }
            var sd = String(strDate).match(/\d+/g);
            var r = fmt && fmt.match(/[yYMmdHhsS]+/gm);
            var o = {
                "[yY]+": (new Date()).getFullYear(), //年
                "M+": 1, //月份
                "d+": 1, //日
                "[Hh]+": 0, //小时
                "m+": 0, //分
                "s+": 0, //秒
                "S": 0 //毫秒
            };
            if (r) {
                var j = 0;
                for (var k in o) {
                    da[j] = o[k];
                    for (var i = 0; i < r.length; i++)
                        if (new RegExp("(" + k + ")").test(r[i])) {
                            da[j] = sd[i];
                            break;
                        }
                    j++;
                }
            } else {
                da = sd;
            }
            var d = eval('new Date(' + (da ? da.map(function (a, i) {
                    var t = parseInt(a, 10);
                    if (i == 1) {
                        t = t - 1;
                    }
                    return t;
                }) : '') + ')');
            if (!isNaN(timeZone)) {
                var localTime = d.getTime(),
                    localOffset = d.getTimezoneOffset() * 60000,
                    utc = localTime + localOffset,
                    offset = timeZone,
                    localSecondTime = utc + (3600000 * offset);
                d = new Date(localSecondTime);
            }
            return d;
        },

        /**
         * 将日期格式字符串转换为毫秒值
         * @param strDate {String} 指定格式的时间字符串，必填
         * @param fmt {String} 格式，默认'yyyy-MM-dd HH:mm:ss S'
         * @param timeZone {Number} 时区 ，如 -8 表示 西8区，默认为 操作系统时区
         */
        parseTime: function (strDate, fmt, timeZone) {
            if (arguments.length === 0) {
                return new Date().getTime();
            }
            if (!strDate) {
                return strDate;
            }

            var _date = Date.parse(strDate, fmt, timeZone);
            if (!_date.getTime()) {
                _date = new Date(strDate);
            }

            return _date.getTime();
        },

        /**
         * 获取操作系统时区
         * @returns {number}
         */
        getTimezone: function () {
            return -1 * (new Date()).getTimezoneOffset() / 60;
        },
        /**
         * 获取操作系统时区
         * @returns {number}
         */
        getYMD: function (param,dateparam) {
            var param = param==undefined?0:param;
            var seperator1 = "-";
            var date = new Date(dateparam || (new Date()));
            date.setDate(date.getDate()+param);
            var year = date.getFullYear();
            var month = parseInt(date.getMonth() + 1);
            month = month<10?'0'+month:month;
            var strDate = parseInt(date.getDate());
            strDate = strDate<10?'0'+strDate:strDate;
            var strdate = year + seperator1 + month + seperator1 + strDate;
            //var week=['周日','周一','周二','周三','周四','周五','周六']
            return strdate;
        }
    });
    Object.extend(Date.prototype, {

        /**
         * 时间格式化
         * @param fmt {String} 格式字符串，如：'yyyy-MM-dd HH:mm:ss S'
         * @param isForce {Boolean} 是否强制使用格式，而不国际化时间格式，默认 false，即不强制使用格式，而格式自动化
         * @param lang {String} 语言标识，如：'zh'，默认为当前语言
         * @param region {String} 区域标识，如：'CN'，默认为当前区域
         *
         * @return {String} 指定日期格式字符串（如：2014-12-12 22:22:22:234）
         */
        format: function (fmt, isForce, lang, region) {
            if (!isForce) {
                lang = lang || main.Lang || 'zh';
                region = region || main.region || 'CN';

                if (lang == 'zh') {
                } else if (lang == 'ja') {
                    fmt = fmt.replace(/-/ig, '\/');
                } else if (lang == 'en') {
                    var fullTimes = fmt.split(/\s/);
                    var year = (fullTimes[0].match("[yY]+") && fullTimes[0].match("[yY]+")[0]) || "";
                    var month = (fullTimes[0].match("M+") && fullTimes[0].match("M+")[0]) || "";
                    var day = (fullTimes[0].match("d+") && fullTimes[0].match("d+")[0]) || "";
                    if (month && day && year) {
                        fullTimes[0] = (region == 'US') ? month + "\/" + day + "\/" + year : day + "\/" + month + "\/" + year;
                    } else if (month && year) {
                        fullTimes[0] = month + "\/" + year;
                    } else if (year) {
                        fullTimes[0] = year;
                    }
                    fmt = (region == 'US') ? fullTimes.reverse().join(' ') : fullTimes.join(' ');
                }
            }

            var o = {
                "[yY]+": this.getFullYear(), //年
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "[Hh]+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/([yY]+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
         可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
         Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
         * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
         * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
         * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
         * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
         */
        pattern : function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
                "H+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            var week = {
                "0": "/u65e5",
                "1": "/u4e00",
                "2": "/u4e8c",
                "3": "/u4e09",
                "4": "/u56db",
                "5": "/u4e94",
                "6": "/u516d"
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    });

    /**
     * 数组（Array）原型对象扩展
     */
    Object.extend(Array, {});
    Object.extend(Array.prototype, {
        /**
         * 获取数组中的最大值
         * @returns {number}
         */
        max: function () {
            return Math.max.apply(Math, this);
        },

        /**
         * 获取数组中的最小值
         * @returns {number}
         */
        min: function () {
            return Math.min.apply(Math, this);
        },

        /**
         * 判断数组中是否包含某个元素
         * @param obj {*}
         */
        contains: function (obj) {
            var i = this.length;
            while (i--) {
                if (this[i] == obj) {
                    return true;
                }
            }
            return false;
        },

        /**
         * 删除数组中是某个值得所有元素
         * @param val {*}
         */
        removeAll: function (val) {
            var temp = this.slice(0);
            var i = temp.length;
            while (i--) {
                if (temp[i] === val) {
                    temp.splice(i, 1);
                }
            }
            return temp;
        },

        /**
         * 获取数组中是某个值的元素序列号
         * @param val {*}
         */
        indexOf: function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * 删除数组中是某个值的元素
         * @param val {*}
         */
        remove: function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        },
        /**
         * 数组去重
         * @param
         */
        unique:function(){
            var res = [];
            var json = {};
            for(var i = 0; i < this.length; i++){
                if(!json[this[i]]){
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }
    });

    /**
     * Map 原型扩展
     */
    Object.extend(Map, {});
    Object.extend(Map.prototype, {
        set: function (key, value) {
            if (!this.map.hasOwnProperty(key)) {
                this.size++;
            }
            this.map[key] = value;
        },
        get: function (key) {
            if (this.map.hasOwnProperty(key)) {
                return this.map[key];
            }
            return null;
        },
        delete: function (key) {
            if (this.map.hasOwnProperty(key)) {
                this.size--;
                return delete this.map[key];
            }
            return false;
        },
        keys: function () {
            var resultArr = [];
            for (var key in this.map) {
                if (this.map.hasOwnProperty(key)) {
                    resultArr.push(key);
                }
            }
            return resultArr;
        },
        values: function () {
            var resultArr = [];
            for (var key in this.map) {
                if (this.map.hasOwnProperty(key)) {
                    resultArr.push(this.map[key]);
                }
            }
            return resultArr;
        },
        has: function (key) {
            return this.map.hasOwnProperty(key);
        },
        clear: function () {
            this.map = {};
            this.size = 0;
        }
    });

    /**
     * 数值（Number）原型对象扩展
     */
    Object.extend(Number, {});
    Object.extend(Number.prototype, {
        /**
         * 对数字格式进行千分位分隔
         * @returns {string}
         */
        format: function () {
            var value = this + '';
            var source = value.replace(/,/g, '').split('.');
            source[0] = source[0].replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
            return source.join('.');
        },

        /**
         * 对数字格式进行四舍五入
         * @param length {int} 小数截断位数，默认为0
         */
        fixed: function (length) {
            if (isNaN(this))
                return 0;
            var s = Math.pow(10, Math.abs(parseInt(length || 0)));
            return parseFloat(Math.round(this * s) / s);
        },

        /**
         * 对数字格式进行单位转换
         * @param length {int} 转换的比率，默认为4，如4：相当于处以10000
         */
        unit: function (length) {
            if (isNaN(this))
                return 0;
            var len = 4;
            if (length) {
                len = length;
            }
            var num = 1;
            for (var i = 0; i < Math.abs(len); i++) {
                num *= 10;
            }
            if (len > 0) {
                return parseFloat(this / num);
            } else {
                return parseFloat(this * num);
            }
        }
    });

   /* $.fn.setForm = function(jsonValue) {
        var obj = this;
        $.each(jsonValue, function (name, ival) {
            var $oinput = obj.find("[name=" + name + "]");
            if ($oinput.attr("type") == "radio" || $oinput.attr("type") == "checkbox") {
                $oinput.each(function() {
                    if (Object.prototype.toString.apply(ival) == '[object Array]') { //是复选框，并且是数组
                        for (var i = 0; i < ival.length; i++) {
                            if ($(this).val() == ival[i]) //或者文本相等
                                $(this).prop("checked", true);
                        }
                    } else {
                        if ($(this).val() == ival)
                            $(this).prop("checked", true);
                    }
                });
            } else if ($oinput.attr("type") == "textarea") { //多行文本框
                obj.find("[name=" + name + "]").html(ival);
            } else {
                obj.find("[name=" + name + "]").val(ival);
            }
        });
    };*/
    //设置表单值
    $.fn.setForm = function(jsonValue) {
        var obj = this;
        //if(isEmptyObject(jsonValue)) return;
        $.each(jsonValue, function (name, ival) {
            var $oinput = obj.find("[name=" + name + "]");
            if ($oinput.attr("type") == "radio" || $oinput.attr("type") == "checkbox") {
                $oinput.each(function() {
                    if (Object.prototype.toString.apply(ival) == '[object Array]') { //是复选框，并且是数组
                        for (var i = 0; i < ival.length; i++) {
                            if ($(this).val() == ival[i]) //或者文本相等
                                $(this).prop("checked", true);
                        }
                    } else {
                        if ($(this).val() == ival)
                            $(this).prop("checked", true);
                    }
                });
            } else if ($oinput.attr("type") == "textarea") { //多行文本框
                obj.find("[name=" + name + "]").html(ival);
            } else {
                obj.find("[name=" + name + "]").val(ival);
            }
        });

        return obj
    };
    //获取表单值
    $.fn.getForm = function() {
        var data = {};
        $(this).find('[name]').length && $(this).find('[name]').each(function(){
            var dom = $(this);
            if(dom.attr("type") == "radio" || dom.attr("type") == "checkbox"){
                if(dom.is(':checked'))data[dom.attr('name')] = dom.val();
            }else if(dom.get(0).tagName === 'SELECT'){
                data[dom.attr('name')] = dom.find('option:selected').val();
           /* }else if(dom.get(0).tagName === 'TEXTAREA'){
                debugger;
                data[dom.attr('name')] = dom.text();*/
            }else {
                data[dom.attr('name')] = dom.val();
            }
        });

        return data
    };
    //图片简单切换调用语句 imgtransition({speed: 3000, animate: 1000});
    $.fn.imgtransition = function(o){
        var defaults = {
            speed : 5000,
            animate : 1000
        };
        o = $.extend(defaults, o);

        return this.each(function(){
            var arr_e = $("li", this);
            arr_e.css({position: "absolute"});
            arr_e.parent().css({margin: "0", padding: "0", "list-style": "none", overflow: "hidden"});

            function shownext(){
                var active = arr_e.filter(".active").length ? arr_e.filter(".active") : arr_e.first();
                var next =  active.next().length ? active.next() : arr_e.first();
                active.css({"z-index": 9});
                next.css({opacity: 0.0, "z-index": 10}).addClass('active').animate({opacity: 1.0}, o.animate, function(){
                    active.removeClass('active').css({"z-index": 8});
                });
            }

            arr_e.first().css({"z-index": 9});
            setInterval(function(){
                shownext();
            },o.speed);

        });
    };
    /************************************************ 工具方法封装 *****************************************************/
    var App;
    App = {
        token: '',
        user: {},
        maps: [],

        /********************************************** 公共规则和组件 *************************************************/

        /*
        * 单位换算
         * @param unit {string} 要格式化的数字对象
         * @param num {number} 要格式化的数字
         * @param len {number} 加小数位一共的长度
         * @param split {number} 换算位数（3位、4位...）
        * */
        convertUnit:function (unit,num,len,split) {
            if(!parseFloat(num)) return {
                num:'0.00',
                unit:UnitConvers[unit][0]
            };
            var _num = ""+parseFloat(num);
            var len = (len && parseFloat(len) ) || 6;
            var split = (split && parseFloat(split) ) || 4;
            var units = UnitConvers[unit];
            var _unit = units[0];

            var formatNum = parseFloat(_num).toFixed(2);
            var i=0;
            if((''+formatNum).length>len+1){
                do{
                    if (unit === 'kg' && i===1){
                        split+=1
                    }
                    i++;
                    formatNum = (parseFloat(_num)/Math.pow(10,split)).toFixed(2);
                    _num = formatNum;
                    _unit = units[i]
                }
                while ((''+formatNum).length>len)
            }

            return {
                num:parseFloat(_num).toFixed(2),
                unit:_unit
            }
        },
        /*
        * 单位换算
         * @param unit {string} 要格式化的数字对象
         * @param num {number} 要格式化的数字
         * @param len {number} 加小数位一共的长度
         * @param split {number} 换算位数（3位、4位...）
         * @param isInt {Boolean} 是否要求：未换算时返回整数，有换算才返回小数。默然是false
        * */
        ConvertUnit:function (obj) {
            var options = $.extend ({
                unit:'',
                num:'',
                len:6,
                split:4,
                isInt:false,
            },obj);
            if(!parseFloat(options.num)) return {
                num:'0.00',
                unit:UnitConvers[options.unit][0]
            };
            var isInt = !!options.isInt;
            var _num = ""+parseFloat(options.num);
            var len = (options.len && parseFloat(options.len) ) || 6;
            var split = (options.split && parseFloat(options.split) ) || 4;
            var units = UnitConvers[options.unit];
            var _unit = units[0];

            var formatNum = parseFloat(_num).toFixed(2);
            var i=0;
            if((''+formatNum).length>len+1){
                do{
                    if (_unit === 'kg' && i===1){
                        split+=1
                    }
                    i++;
                    formatNum = (parseFloat(_num)/Math.pow(10,split)).toFixed(2);
                    _num = formatNum;
                    _unit = units[i]
                }
                while ((''+formatNum).length>len)
            }
            if(isInt && !i){
                _num = parseInt(_num)
            }else {
                _num = parseFloat(_num).toFixed(2)
            }

            return {
                num:_num,
                unit:_unit
            }
        },
        /**
         * 定义一个模块
         * @param moduleName {String} 模块名称
         * @param moduleDescription {String} 模块描述
         * @param importList {Array} 依赖模块列表
         * @param fn {Function} 模块体
         */
        Module: function (moduleName, moduleDescription, importList, fn) {
            (function ($) {
                if (typeof define === "function" && define.amd) {
                    var deps = importList || ['jquery'];
                    define(deps, function () {
                        return $.extend({
                            Render: fn.apply(this, arguments).Render || fn.apply(this, arguments)
                        }, fn.apply(this, arguments));
                    });
                } else {
                    window[moduleName] = $.extend({
                        Render: fn().Render || fn()
                    }, fn());
                }
            })(jQuery);
        },

        /*
        * @description：判断对象是否为空
        * */
        isEmptyObject:function (e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        /*
        * @description：判断对象、字符串、数组是否为空
        * */
         isEmpty:function(obj) {
             // 用变量保存可以加速对对象原型的hasOwnProperty的访问。
             var hasOwnProperty = Object.prototype.hasOwnProperty;

             // 本身为空直接返回true
            if (obj == null) return true;

            // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            //最后通过属性长度判断。
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        },
        isInteger:function (obj) {
            return typeof obj === 'number' && obj%1 === 0
        },
        toUtf8: function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    },
    /**
         * 获取系统根网络路径
         * @returns {String}
         */
        rootPath: function () {
            var html = window.location.href;
            var host = window.location.host;
            return html.substring(0, html.lastIndexOf(host) + host.length + 1);
        },
        /**
         * 获取浏览器类型
         * @returns {Object}
         */
        getBrowser: function () {
            var browser = $.browser;
            if (!browser) {
                var uaMatch = function (ua) {
                    ua = ua.toLowerCase();

                    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                        /(msie) ([\w.]+)/.exec(ua) ||
                        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                        [];

                    return {
                        browser: match[1] || "",
                        version: match[2] || "0"
                    };
                };

                var matched = uaMatch(navigator.userAgent);
                browser = {};

                if (matched.browser) {
                    browser[matched.browser] = true;
                    browser.version = matched.version;
                }

                // 区分 Chrome 和 Safari
                if (browser.chrome) {
                    browser.webkit = true;
                } else if (browser.webkit) {
                    browser.safari = true;
                }
                browser.platform = (window.navigator && window.navigator.platform) ? window.navigator.platform : ""
            }
            return browser;
        },


        /**
         * 添加获取url参数的方法
         * @param name
         * @returns {*}
         */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        /**
         * 初始化 Ajax
         */
        initAjax: function () {
            $.ajaxSetup({
                global: true,
                cache: false,
                dataType: "json",
                contentEncoding: "gzip",
                contentType: 'application/json',
                headers: {
                    "Access-Token": Cookies.getCook('tokenId'),
                    "Prefer_Lang": Cookies.getCook('Prefer_Lang'),
                    "Timezone": Date.getTimezone() || 0
                }
            });
        },

        /******************************************* jquery validate的扩展 ********************************************/
        initValidate: function () {
            /**
             * extend validate language setting
             */
            $.extend($.validator.messages, {
                required: $.getI18n("validRequired"),
                remote: $.getI18n("validError"),
                email:$.getI18n("emailError"),
                mobile: $.getI18n("phoneNumberError"),
            });
            /**
             * extend validate methods
             */
            // 电话号码格式
            jQuery.validator.addMethod("mobile", function(value, element) {
                var mobile = /^[1][34578]\d{9}$/;
                return this.optional(element) || (mobile.test(value));
            }, $.getI18n("phoneNumberError"));
            // 端口号
            jQuery.validator.addMethod("Port", function(value, element) {
                var parten=/^(\d)+$/g;
                var flag = false;
                if(parten.test(value)&&parseInt(value)<=65535&&parseInt(value)>=0){
                    flag = true;
                }else{
                    flag = false;
                }
                return this.optional(element) || flag;
            }, $.getI18n("portError"));
            // ip
            jQuery.validator.addMethod("IP", function(value, element) {
                var flag = false;
                var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
                if (reSpaceCheck.test(value))
                {
                    value.match(reSpaceCheck);
                    if (RegExp.$1<=255&&RegExp.$1>=0
                        &&RegExp.$2<=255&&RegExp.$2>=0
                        &&RegExp.$3<=255&&RegExp.$3>=0
                        &&RegExp.$4<=255&&RegExp.$4>=0)
                    {
                        flag = true;
                    }else
                    {
                        flag = false;
                    }
                }else
                {
                    flag = false;
                }
                return this.optional(element) || flag;
            }, $.getI18n("ipError"));
            // 密码错误
            jQuery.validator.addMethod("passwordCheck", function(value, element) {
                var strength = 0;
                var flag = false;
                if (value.length > 5 && value.match(/[\da-zA-Z]+/)) {
                    if (value.match(/\d+/)) {
                        strength++;
                    }
                    if (value.match(/[a-z]+/)) {
                        strength++;
                    }
                    if (value.match(/[A-Z]+/)) {
                        strength++;
                    }
                    if (value.match(/[!@*$-_()+=&￥]+/)) {
                        strength++;
                    }
                }
                if (strength >= 3) {
                    flag = true;
                }
                return this.optional(element) || flag;
            }, $.getI18n("numValid"));
            //验证两次输入密码是否一致
            jQuery.validator.addMethod("eqPassword",function(value,element){
                var flag1 = false;
                if($(element).val()==$("#password").val()){
                    flag1 = true
                }else {
                    flag1 = false
                }
                return flag1;
            },$.getI18n("pwdNotEqual"));
            jQuery.validator.addMethod("eq1Password",function(value,element){
                var flag1 = false;
                if($(element).val()==$("#NewPassword").val()){
                    flag1 = true
                }else {
                    flag1 = false
                }
                return flag1;
            },$.getI18n("pwdNotEqual"));
            //修改信息时验证数据库重复电话号码
            jQuery.validator.addMethod("checkRepeatTel",function(value,element){
                var flag = 1;
                $.ajax({
                    type:"POST",
                    url:"/user/getUserNotMyself.do",
                    async:false,                                             //同步方法，如果用异步的话，flag永远为1
                    dataType: "json",
                    data:JSON.stringify({userTel:value,tokenId:Cookies.getCook('tokenId'),userId:$(element).attr("_id")}),
                    success: function(res){
                        if(res.code == '101'){
                            flag = 0;
                        }
                    }
                });
                if(flag == 0){
                    return false;
                }else{
                    return true;
                }
            },$.getI18n("phoneNumberExist"));
            //修改信息验证数据库重复邮箱
            jQuery.validator.addMethod("checkRepeatEmail",function(value,element){
                var flag = 1;
                $.ajax({
                    type:"POST",
                    url:"/user/getUserNotMyself.do",
                    async:false,                                             //同步方法，如果用异步的话，flag永远为1
                    dataType: "json",
                    data:JSON.stringify({email:value,tokenId:Cookies.getCook('tokenId'),userId:$(element).attr("_id")}),
                    success: function(res){
                        if(res.code == '101'){
                            flag = 0;
                        }
                    }
                });
                if(flag == 0){
                    return false;
                }else{
                    return true;
                }
            },$.getI18n("emailberExist"));
            //修改信息验证数据库重复用户名
            jQuery.validator.addMethod("checkRepeatLoginId",function(value,element){
                var flag = 1;
                $.ajax({
                    type:"POST",
                    url:"/user/getUserNotMyself.do",
                    async:false,                                             //同步方法，如果用异步的话，flag永远为1
                    dataType: "json",
                    data:JSON.stringify({loginId:value,tokenId:Cookies.getCook('tokenId'),userId:$(element).attr("_id")}),
                    success: function(res){
                        if(res.code == '101'){
                            flag = 0;
                        }
                    }
                });
                if(flag == 0){
                    return false;
                }else{
                    return true;
                }
            },$.getI18n("userNameExist"));
            //新增用户时验证数据库重复电话号码
            jQuery.validator.addMethod("checkAddRepeatTel",function(value,element){
                var flag = 1;
                $.ajax({
                    type:"POST",
                    url:"user/getUnique.do",
                    async:false,                                             //同步方法，如果用异步的话，flag永远为1
                    dataType: "json",
                    data:JSON.stringify({userTel:value,tokenId:Cookies.getCook('tokenId')}),
                    success: function(res){
                        if(res.code == '101'){
                            flag = 0;
                        }
                    }
                });
                if(flag == 0){
                    return false;
                }else{
                    return true;
                }
            },$.getI18n("phoneNumberExist"));
            //新增用户时验证数据库重复邮箱
            jQuery.validator.addMethod("checkAddRepeatEmail",function(value,element){
                var flag = 1;
                $.ajax({
                    type:"POST",
                    url:"user/getUnique.do",
                    async:false,                                             //同步方法，如果用异步的话，flag永远为1
                    dataType: "json",
                    data:JSON.stringify({email:value,tokenId:Cookies.getCook('tokenId')}),
                    success: function(res){
                        if(res.code == '101'){
                            flag = 0;
                        }
                    }
                });
                if(flag == 0){
                    return false;
                }else{
                    return true;
                }
            },$.getI18n("emailberExist"));
            //新增用户时验证数据库重复用户名
            jQuery.validator.addMethod("checkAddRepeatLoginId",function(value,element){
                var flag = 1;
                $.ajax({
                    type:"POST",
                    url:"user/getUnique.do",
                    async:false,                                             //同步方法，如果用异步的话，flag永远为1
                    dataType: "json",
                    data:JSON.stringify({loginId:value,tokenId:Cookies.getCook('tokenId')}),
                    success: function(res){
                        if(res.code == '101'){
                            flag = 0;
                        }
                    }
                });
                if(flag == 0){
                    return false;
                }else{
                    return true;
                }
            },$.getI18n("userNameExist"));
            //数字验证var mobile = /^[1][34578]\d{9}$/;
        //     return this.optional(element) || (mobile.test(value));
        // }, $.getI18n("phoneNumberError"));
            jQuery.validator.addMethod('checkNumber',function(value,element){
                var number = /^(\-|\+)?\d+(\.\d+)?$/;
                return this.optional(element) || (number.test(value))
            },'只能输入非负数');
            //电站名称字符数验证
            jQuery.validator.addMethod('checkPlantName',function(value,element){
                var plantName= /^([\u4E00-\u9FA5\uF900-\uFA2D|A-Za-z0-9]){1,11}$/;
                return this.optional(element) || (plantName.test(value))
            },'只能是中文字母数字，长度为1-11位');
        },

        /***************************************** Dialog 弹出框扩展封装 *************************************/
        /**
         * 模态弹出框
         * @param options {Object}
         * <pre>
         * { <br>
         *       id: "modal",//弹窗id <br>
         *       title: "dialog",//弹窗标题 <br>
         *       width: 600,//弹窗内容宽度，不支持% <br>
         *       height: 500,//弹窗内容高度,不支持%  <br>
         *       maxWidth: null ,//弹窗内容最大宽度, 不支持% <br>
         *       maxHeight: null,//弹窗内容最大高度, 不支持% <br>
         *       appendTo: '#main_view',//弹出框父元素选择器  <br>
         *       modal: true,//是否为模态弹出框<br>
         *       keyboard: true,//是否开启esc键退出，和原生bootstrap 模态框一样 <br>
         *       buttons: [], //按钮分配, 参数：id: 按钮id; text: 按钮文本; click: 按钮点击回调函数; clickToClose: true 点击按钮是否关闭弹出框 <br>
         *       content: "",//加载静态内容 <br>
         *       openEvent: null,//弹窗打开后回调函数 <br>
         *       closeEvent: null,//弹窗关闭后回调函数 <br>
         *       isdrag: true //点击header是否能够拖动,默认可拖动 <br>
         * } <br>
         * </pre>
         * @returns {jQuery}
         */
        dialog: function (options) {
            var defaults = {
                id: "modal" + (new Date().getTime()),
                title: "",
                width: 270,
                height: 60,
                maxWidth: document.documentElement.clientWidth - 40,
                maxHeight: document.documentElement.clientHeight - 42,
                appendTo: 'body',
                backdrop: false,
                modal: true,
                keyboard: true,
                content: "",
                openEvent: null,
                closeEvent: null,
                isdrag: true,
                ifr: false
            };

            //动态创建窗口
            var dialog = {
                init: function (opts) {
                    var _self = this;

                    //动态插入窗口
                    var d = _self.dHtml(opts);
                    if ($("#" + opts.id).length > 0) {
                        $("#" + opts.id).remove();
                        App.dialogZIndex--;
                        App.dialogZIndex > 940
                            ? $(opts.appendTo || "body").addClass('modal-open')
                            : $(opts.appendTo || "body").removeClass('modal-open');
                    }
                    $(':focus').blur();
                    $(opts.appendTo || "body").append(d);

                    var modal = $("#" + opts.id);
                    //初始化窗口
                    modal.modal(opts);
                    //窗口位置
                    /*$('.modal-dialog', modal).resize(function () {
                        _self.resize($(this));
                    });
                    modal.resize(function () {
                        _self.resize($('.modal-dialog', modal));
                    });
                    _self.resize($('.modal-dialog', modal));*/
                    //窗口层级
                    $(modal).css('z-index', App.dialogZIndex++);
                    //幕布层级
                    // if(opts.backdrop){
                    //     $('.modal-backdrop').css('z-index', (App.dialogZIndex-2));
                    // }

                    //设置为模态窗口
                    opts.modal && modal.addClass('modal-overlay');
                    modal
                    //隐藏窗口后删除窗口对话框
                        .on('hide.bs.modal', function () {
                            //$(':focus').blur();
                            $('#iemsDatePicker').hide();
                            $('._ztreeInputDiv').remove();
                            //$('body').mousedown();
                        })
                        .on('hidden.bs.modal', function () {
                            modal.remove();
                            if (opts.closeEvent) {
                                opts.closeEvent();
                            }
                            App.dialogZIndex--;
                            App.dialogZIndex > 940
                                ? $(opts.appendTo || "body").addClass('modal-open')
                                : $(opts.appendTo || "body").removeClass('modal-open');
                        })
                        //窗口显示后
                        .on('shown.bs.modal', function () {
                            if (opts.openEvent) {
                                opts.openEvent();
                            }
                        })
                        //显示窗口
                        .modal('show');
                    return $('.modal-body', modal);
                },
                dHtml: function (o) {
                    var context = $('<div/>').attr('id', o.id).addClass('modal fade show')
                        .attr('role', 'dialog').attr('aria-labelledby', o.id + '_modalLabel').attr('aria-hidden', true);
                    var content = $('<div/>').addClass('modal-content');
                    var header = $('<div/>').addClass('modal-header');
                    var body = $('<div/>').addClass('modal-body').css({
                        'height': o.height,
                        'max-height': o.maxHeight || (window.screen.height - 120),
                        'overflow':'auto'
                    });

                    var closeBtn = $('<button/>').addClass('close').attr('data-dismiss', 'modal')
                        .attr('aria-hidden', true).text('×').on("mousedown", function (e) {
                            e.stopPropagation();
                        });
                    var title = $('<p/>').addClass('modal-title').html(o.title);
                    title.css("cursor", "default");
                    header.append(closeBtn).append(title);
                    if (o.isdrag) { // 拖曳
                        var _mousex, _mousey, headx, heady;
                        title.css("cursor", "move");
                        header.css("cursor", "move").on("mousedown", function (e) {
                            if (!e) {
                                e = window.event; // for IE
                            }
                            var offset = $(this).offset();    // header位置
                            headx = parseInt(offset.left, 10), heady = parseInt(offset.top, 10);
                            // 拖拽时鼠标位置
                            _mousex = e.pageX, _mousey = e.pageY;
                            // mousedown后添加拖动事件
                            // 绑定到document保证不因为卡顿窗口跟不上鼠标使光标脱离事件停顿
                            $(document).off("mousemove").on("mousemove", function (e) {
                                //move后窗口左上角位置
                                var x = headx + (e.pageX - _mousex),
                                    y = heady + (e.pageY - _mousey);

                                if (x <= 0) {   // 左右越界判断
                                    x = 0;
                                } else if (x >= $(window).width() - $(header).width()) {
                                    x = $(window).width() - $(header).width();
                                }
                                if (y <= 0) {   // 上下越界判断
                                    y = 0;
                                } else if (y >= $(window).height() - $(header).parents('.modal-dialog').height()) {
                                    y = $(window).height() - $(header).parents('.modal-dialog').height();
                                }
                                header.parents(".modal-dialog").css({
                                    "left": x + "px",
                                    "top": y + "px",
                                    "position": "absolute"
                                }); //设置新位置
                                return false;
                            });
                        });
                        $(document).on("mouseup", function () {
                            $(document).off("mousemove");   // 鼠标弹起后取消拖动事件
                        });
                    }

                    var $con = $('<div/>').addClass('iems-modal-content').append(o.content || "");
                    body.append($con);

                    var footer = $('<div/>').addClass('modal-footer');
                    //btn配置
                    if (o.buttons && o.buttons.length > 0) {
                        $.each(o.buttons, function (i, t) {
                            var btn = $('<button/>').addClass('btn modal-btn').addClass(this.type || '')
                                .attr("id", this.id).text(this.text || 'Submit').attr('aria-hidden', true);
                            t.clickToClose && btn.attr('data-dismiss', 'modal');
                            t.click && btn.click(function (e) {
                                t.click(e, context, this);
                            });

                            footer.append(btn);
                        });
                    }

                    var ifrContent = '<iframe src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;width:'+o.width+'px; height:220px;z-index:-1; filter:alpha(opacity=0);"></iframe>';
                    context.append(
                        $('<div/>').addClass('modal-dialog').css({
                            'width': o.width,
                            'padding': 0,
                            'left': 'calc( 50% - '+o.width/2+'px)',
                            'top': 'calc( 42% - '+(o.height == 'auto' ? 60:o.height)/2+'px)',
                            'max-width': o.maxWidth
                        }).append(content.append(header).append(body).append(footer).append(o.ifr?ifrContent:''))
                    );

                    var scrollBarWidth = body.get(0).offsetWidth - body.get(0).scrollWidth;
                    scrollBarWidth > 0 && body.css({'padding-right': scrollBarWidth + 15});

                    return context;
                },
                close: function () {
                    $(".modal").modal("hide");

                },
                resize: function (modal) {
                    var mw = $(window).width() - $(modal).width();
                    var mh = $(window).height() - $(modal).height() - 5;
                    $(modal).css({
                        'top': mh > 0 ? (mh / 2.5) : 0,
                        'left': mw > 0 ? (mw / 2) : 0
                    });
                }
            };
            if (options == "close") {
                return dialog.close();
            }
            var opts = $.extend({}, defaults, options);

            return dialog.init(opts);
        },
        dialogZIndex: 940,

        /**
         * 消息提示框
         * @param o {Object} 参数设置
         * @param c {Function} 点击“OK”按钮或者关闭弹出框回调方法
         *     <pre>
         *     例如： App.alert({id: id, title: "title", msg: "Content", ……}, function () { …… });
         *     </pre>
         * @returns {*}
         */
        alert: function (o, c) {
            var content = '';
            var p = '',t = '';
           App.getClassOf(o) == 'String' ? p = o : (p = o.msg ,t = o.code);

            if (!p) return;
            content = App.getClassOf(p) == 'String' ? p : p.msg;

            if(Number(t) === 104||Number(t) === 502){
                // if( main.loginFlag) return;
                $(".modal").length && $(".modal").modal("hide");
                // main.loginFlag = true;
                Menu.clearUserRole();
                clearTimeout(windowInter);
                Cookies.clearAllCookie()
                window.location.href = '/'
            }
            var setting = {
                title: $.getI18n('tips'),
                width: 320,
                height: 'auto',
                content: content || '',
                buttons: p.buttons || [
                    {
                        id: 'okId',
                        type: 'cus-img-btn cus-ib-start',
                        text:  $.getI18n('confirm') || 'OK',
                        clickToClose: true
                    }
                ],
                closeEvent: function () {
                    if (c)
                        c();
                }
            };
            if (App.getClassOf(p) == "String") {
                setting.message = p;
            }
            $.extend(setting, p);

            return App.dialog(setting);
        },
 /**
         * 层级最高的消息提示框
         * @param o {Object} 参数设置
         * @param c {Function} 点击“OK”按钮或者关闭弹出框回调方法
         *     <pre>
         *     例如： App.alert({id: id, title: "title", msg: "Content", ……}, function () { …… });
         *     </pre>
         * @returns {*}
         */
        ifrAlert: function (o, c) {
            var content = '';
            var p = '',t = '';
           App.getClassOf(o) == 'String' ? p = o : (p = o.msg ,t = o.code);

            if (!p) return;
            content = App.getClassOf(p) == 'String' ? p : p.msg;

            if(Number(t) === 104||Number(t) === 502){
                // if( main.loginFlag) return;
                $(".modal").length && $(".modal").modal("hide");
                // main.loginFlag = true;
                clearTimeout(windowInter);
                Cookies.setCookByName('tokenId', '');
                $('#sysBody').loadPage('partial/login.html');
            }
            var setting = {
                title: $.getI18n('tips'),
                width: 320,
                height: 'auto',
                content: content || '',
                buttons: p.buttons || [
                    {
                        id: 'okId',
                        type: 'cus-img-btn cus-ib-start',
                        text: $.getI18n('confirm') || 'OK',
                        clickToClose: true
                    }
                ],
                closeEvent: function () {
                    if (c)
                        c();
                }
            };
            if (App.getClassOf(p) == "String") {
                setting.message = p;
                setting.ifr = true
            }
            $.extend(setting, p);

            return App.dialog(setting);
        },

        /**
         * 确认询问框
         * @param p {Object} 参数设置
         * @param c {Function} 点击OK回调方法
         * @param r {Function} 点击Cancel回调方法
         *      例如:
         *      App.confirm({type: "confirm", title: "TITLE", msg: "Message"}, funtion(){...(okEvent)}, funtion(){...(closeEvent)});
         */
        confirm: function (p, c, r) {
            if (!p) return;

            var content = App.getClassOf(p) == 'String' ? p : p.msg;
            var setting = {
                title: p.title,
                width: 320,
                height: 'auto',
                content: content || '',
                buttons: p.buttons || [
                    {
                        id: 'okId',
                        type: 'submit cus-img-btn cus-ib-start',
                        text: p.sure || $.getI18n('confirm'),
                        clickToClose: true,
                        click: function (e, d) {
                            if (c) {
                                c();
                            }
                        }
                    },
                    {
                        id: 'cancelId',
                        type: 'cancel cus-img-btn cus-ib-start',
                        text: p.cancel || $.getI18n('cancel'),
                        clickToClose: true
                    }
                ],
                closeEvent: function () {
                    if (r)
                        r();
                }
            };
            $.extend(setting, p);
            return App.dialog(setting);
        },


        /**
         * 警告框
         * @param p {Object} 参数设置 / {String} 提示内容
         * @param t {Function} 提示类型，p为{String}时可设置
         *      例如:
         *      App.confirm({type: "confirm", title: "TITLE", msg: "Message"}, funtion(){...(okEvent)}, funtion(){...(closeEvent)});
         */
        warningDialog:function (p ,type) {
            var defaults = {
                id: "warningModal" + (new Date().getTime()),
                content: "", //提示内容
                width: 270,
                appendTo: 'body',
                closeEvent: null,
                isdrag: true,
                ifr: false,
                type:0
            }
            if(typeof p === Object){
                $.extend(defaults,p)
            }else{
                defaults.content = p
                defaults.type = type || 0
            }
            var topOff = 10
            var types = ['alert-success','alert-danger','alert-info','alert-warning'] ;// 成功,错误,信息,警告
            var tips = ['成功','错误','信息','警告'] ;// 成功,信息,警告,错误
            if($('.alert').length){
                $.each($('.alert'),function (index,item) {
                    topOff += $(item).outerHeight() + 10
                })
            }
            var str = "<div style='position:fixed;top:"+topOff+"px;right:-"+defaults.width+"px;z-index: 9999;width:"+defaults.width+"px' id="+defaults.id+" class='alert "+types[defaults.type]+"'>" +
                "<a href='#' class='close' data-dismiss='alert'>&times;</a>\n" +
                "<strong>"+tips[defaults.type]+"！</strong>"+defaults.content+"。\n" +
                "</div>"
            $("body").append(str)
            $("#"+defaults.id).animate({right:0},"slow","swing")
            setTimeout(
                function () {
                    $("#"+defaults.id).alert('close')
                }, 6000
            );


            /*var topOff = !$('.alert').length? 10 : (10*$('.alert').length +$('.alert').length)
            var types = ['alert-success','alert-info','alert-warning','alert-danger'] ;// 成功,信息,警告,错误
            var tips = ['成功','信息','警告','错误'] ;// 成功,信息,警告,错误

            var str = "<div style='position:fixed;top:"+topOff+"px;right:0;z-index: 9999;width: "+defaults.width+"px' id="+defaults.id+" class='alert "+types[defaults.type]+"'>" +
                "<a href='#' class='close' data-dismiss='alert'>&times;</a>\n" +
                "<strong>"+tips[defaults.type]+"！</strong>"+defaults.content+"。\n" +
                "</div>"
            $("body").append(str)*/



        },
        /**
         * 用户输入响应框
         * @param id     input输入框的id
         * @param p      参数设置{(Object/String)}
         *              {id: "(modal弹窗id)",
                         title:"标题",
                         content:"静态html内容(默认为input标签)",
                         okEvent: "(Function)",
                         closeEvent: "(Function)"}
         * @param c      okEvent 确认回调方法{Function}
         * @param r      closeEvent 窗口关闭回调方法{Function}
         * @returns {*}
         */
        prompt: function (id, p, c, r) {
            var proInput = $('<input type="text" id=' + id + ' name="' + id + '" style="width: 90%;">');
            var setting = {
                title: $.getI18n('tips'),
                content: (p && p.content) || proInput,
                width: 320,
                height: 'auto',
                buttons: (p && p.btns) || [
                    {
                        id: 'okId',
                        text: $.getI18n('confirm') || 'OK',
                        click: function (e, d) {
                            var val = $('#' + id).val();
                            if (c) {
                                c(val, d);
                            }
                        }
                    },
                    {
                        id: 'cancelId',
                        type: 'cancel',
                        text: $.getI18n('cancel') || 'Cancel',
                        clickToClose: true
                    }
                ],
                closeEvent: function () {
                    if (r) {
                        r();
                    }
                }
            };
            $.extend(setting, p);
            return App.dialog(setting);
        },

        /**
         * 获取对象的类名，自定义的任何类返回'Object'
         * @param o 任意类型
         * @returns {String} 返回ECMAScript中预定义的六种类型之一，首写字母为大写
         */
        getClassOf: function (o) {
            if (o === null)return 'Null';
            if (o === undefined)return 'Undefined';
            return Object.prototype.toString.call(o).slice(8, -1);
        },

        /**
         * 业务公共前端方法,统一拦截特殊字符
         */
        dealSpecialSign: function (obj) {
            var signArray = ["%", "\\", "_", "-", "/", "."]; //需要做转义请在此添加
            var temp = obj + "";
            var tempArray = [];
            var flag = false;
            if (temp.indexOf("[") > -1) {
                flag = true;
            }
            if (!flag) {
                //针对邪恶‘\’特殊处理
                for (var k = 0; k < temp.length; k++) {
                    tempArray.push(temp.charAt(k));
                }
                for (var h = 0; h < tempArray.length; h++) {
                    if (signArray.contains(tempArray[h] + "")) {
                        if (tempArray[h] == "\\") {
                            tempArray[h] = "\\\\";
                        } else {
                            tempArray[h] = "\\" + tempArray[h];
                        }
                    }
                }
                //组装返回字符
                var tempStr = "";
                for (var y = 0; y < tempArray.length; y++) {
                    tempStr += tempArray[y];
                }
                obj = tempStr;
            }
            return obj;
        },

        /**
         * 货币转换
         * @param value
         */
        unitTransform:function(value){
            var result = {};
            var unit = App.getCurrencyUnit();
            result.value = parseFloat(value).fixed(2).toFixed(2);
            result.unit = unit;
            return result;
        },
        getCurrencyUnit:function(){
            var currency = Cookies.getCook('currency');
            var unit;
            switch (currency){
                case '1':
                    unit = '¥';
                    break;
                case '2':
                    unit = '$';
                    break;
                case '3':
                    unit = '¥';
                    break;
                case '4':
                    unit = '€';
                    break;
                case '5':
                    unit = '£';
                    break;
                default:
                    unit = '¥';
                    break;
            }
            return unit;
        },
        fullScreen: function(){
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            if(typeof rfs != "undefined" && rfs) {
                rfs.call(el)
            };

        }
    };
    return App;
});

/**
 * Map 类型定义
 * @param obj
 * @constructor
 */
function Map(obj) {
    this.map = {};
    this.size = 0;
}