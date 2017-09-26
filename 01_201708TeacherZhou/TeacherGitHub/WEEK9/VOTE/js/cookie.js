var cookie = (function () {
    //->设置
    function setValue(options) {
        var _default = {
            name: null,
            value: null,
            expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
            path: '/',
            domain: ''
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path + ";domain=" + _default.domain;
    }

    //->获取
    function getValue(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }

    //->删除
    function removeValue(options) {
        var _default = {
            name: null,
            path: '/',
            domain: ''
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        if (getValue(_default.name)) {
            document.cookie = _default.name + "= ;path=" + _default.path + ";domain=" + _default.domain + ";expires=Fri,02-Jan-1970 00:00:00 GMT";
        }
    }

    return {
        set: setValue,
        get: getValue,
        remove: removeValue
    }
})();