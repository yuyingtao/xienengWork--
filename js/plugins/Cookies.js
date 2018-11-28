var Cookies = {};
var sessionId;
var max_size = 3500;

Cookies.set = function (name, value) {
    if (!sessionId) {
        return;
    }
    if (sessionId) {
        name = sessionId + name;
    }
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value)
        + ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
        + ((path == null) ? "" : ("; path=" + path))
        + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
};
Cookies.get = function (name) {
    var value;
    if (sessionId) {
        value = Cookies.getCook(sessionId + name);
    }
    return value || Cookies.getCook(name);
};
Cookies.getCook = function (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    var value;
    while (i < clen) {
        j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return Cookies.getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    return null;
};
Cookies.clear = function (name) {
    if (Cookies.get(name)) {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
        Cookies.set(name, "", expdate);
    }
};
Cookies.clearAllCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        /*var expdate = new Date();
        expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
        Cookies.clear(keys[i]);*/
    }
};
Cookies.getCookieVal = function (offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
};
/**
 * 设置sessionid
 */
Cookies.setSessionId = function (value) {
    sessionId = value;
};
/**
 * 获取sessionid
 */
Cookies.getSessionId = function () {
    return sessionId;
};
/**
 * 获取Cookie大小
 */
Cookies.getSize = function () {
    return document.cookie.length;
};
/**
 * 是否达到最大
 */
Cookies.isGeMaxSize = function () {
    return Cookies.getSize() > Cookies.getMaxSize();
};
/**
 * 清除一个服务器的Cookie
 */
Cookies.clearOne = function () {
    var matchs = "token";
    var onesessionid;
    var cookiesArr = document.cookie.split('; ');
    for (var i = 0; i < cookiesArr.length; i++) {
        var cookieArr = cookiesArr[i].split('=');
        if (cookieArr && cookieArr.length > 0 && ( (cookieArr[0]).indexOf(matchs) >= 0 || (cookieArr[0]).indexOf("loginType720") >= 0)) {
            if ((cookieArr[0]).indexOf("token710") >= 0) {
                onesessionid = (cookieArr[0]).replace("token710", "");
            } else if ((cookieArr[0]).indexOf("loginType720") >= 0) {
                onesessionid = (cookieArr[0]).replace("loginType720", "");
            } else {
                onesessionid = (cookieArr[0]).replace("token", "");
            }
            if (Cookies.getSessionid() != onesessionid) {
                Cookies.clearByid(onesessionid);
                return;
            }
        }
    }
};
/**
 * 清除Cookie通过 sessionId
 */
Cookies.clearById = function (sessionid) {
    if (!sessionid) {
        return;
    }
    var cookiesArr = document.cookie.split('; ');
    for (var i = 0; i < cookiesArr.length; i++) {
        var cookieArr = cookiesArr[i].split('=');
        if (cookieArr && cookieArr.length > 0 && (cookieArr[0]).indexOf(sessionid) >= 0) {
            var expdate = new Date();
            expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
            Cookies.setCookByName(cookieArr[0], "", expdate);
        }
    }
};
/**
 * 向Cookie中放入值
 */
Cookies.setCookByName = function (name, value) {
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value)
        + ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
        + ((path == null) ? "" : ("; path=" + path))
        + ((domain == null) ? "" : ("; domain=" + domain))
        + ((secure == true) ? "; secure" : "");
};
/**
 * 设置sessionid
 */
Cookies.setMaxSize = function (value) {
    max_size = value;
};
/**
 * 获取sessionid
 */
Cookies.getMaxSize = function () {
    return max_size;
};