~function () {
    let queryChar = (url)=> url.indexOf('?') > -1 ? '&' : '?';

    //=>把对象转换为字符串
    let formatObj = (obj)=> {
        let str = ``;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                str += `${key}=${obj[key]}&`;
            }
        }
        str.length > 0 ? str = str.substring(0, str.length - 1) : null;
        return str;
    };

    let ajax = (options)=> {
        //->init parameter
        let _default = {
            url: null,
            method: 'get',
            dataType: 'text',
            data: null,
            async: true,
            cache: true,
            success: null
        };
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'type') {
                    _default['method'] = options['type'];
                    continue;
                }
                _default[key] = options[key];
            }
        }
        let {url, method, dataType, data, async, cache, success}=_default;

        let regGet = /^(GET|DELETE|HEAD)$/i;
        //=>DATA
        if (data) {
            if (Object.prototype.toString.call(data) === '[object Object]') {
                //=>传递的是一个对象,我们要把其转换为字符串'KEY=VALUE&KEY=VALUE...'
                data = formatObj(data);
            }
            //=>如果当前请求是GET系列的,我们把DATA拼接在URL后面
            if (regGet.test(method)) {
                url += `${queryChar(url)}${data}`;
                data = null;
            }
        }

        //=>CATCH
        if (regGet.test(method) && cache === false) {
            url += `${queryChar(url)}_=${Math.random()}`;
        }

        //->send ajax
        let xhr = new XMLHttpRequest;
        xhr.open(method, url, async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //=>DATA-TYPE
                let result = xhr.responseText;
                switch (dataType.toUpperCase()) {
                    case 'JSON':
                        result = 'JSON' in window ? JSON.parse(result) : eval('(' + result + ')');
                        break;
                    case 'XML':
                        result = xhr.responseXML;
                        break;
                }

                //=>SUCCESS
                //->typeof success === 'function' ? success(result) : null;
                success && success(result);
            }
        };
        xhr.send(data);
    };
    window.ajax = ajax;
}();