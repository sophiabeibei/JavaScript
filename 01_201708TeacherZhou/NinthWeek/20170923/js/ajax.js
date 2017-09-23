/*
 * ajax库
 * */
// let xhr = new XMLHttpRequest;
// xhr.open("get","",false);
// xhr.onreadystatechange = function () {
//    if(xhr.readyState === 4 && xhr.status === 200){
//
//    }
// };
// xhr.send(null);
//把上面四步封装成一个方法

//在讲封装之前,看"jQ中的ajax请求"是怎样的;看文件: ajax-jq.html;

~function () {
    //->ES6格式写
    let queryChar = (url) => url.indexOf("?") > -1 ? "&" : "?";

    //=>把对象转换为字符串的方法
    let formatObj = (obj) => {
        for (let key in obj) {
            let str = ``;
            if (obj.hasOwnProperty(key)) {
                str += `${key}=${obj[key]}&`;
            }
        }
        //->去掉字符串中最后一个&的方法;
        str.length > 0 ? str = str.substring(0, str.length - 1) : null;
        return str;
    };

    let ajax = (options) => {
        let _default = {
            url: null,
            method: "get",
            dataTYpe: "text",
            data: null,
            async: true,
            cache: true,
            success: null
        };
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === "type") {
                    _default["method"] = options["type"];
                }
                _default[key] = options[key];
            }
        }
        let {url, method, dataType, data, async, cache, success} = _default;


        let regGet = /^(GET|DELETE|HEAD)$/i;

        //=>处理data;data默认值null;
        if (data) {
            //->如果data是个对象,变成字符串;判断data是个对象
            if (Object.prototype.toString.call(data) === "[object Object]") {
                //->说明传递的是一个对象,我们要把其转换为字符串;这样的字符串key=value&key=value...
                data = formatObj(data);//->此时的data就是一个字符串;
            }
            //->如果当前的请求是get系列的,我们把data拼接在url末尾;
            if(regGet.test(method)){
                url += `${queryChar(url)}${data}`;
                data = null;
            }
        }


        //=>cache的处理(清缓存的处理);什么情况下处理cache;1.get系列;2.
        if (regGet.test(method) && cache === false) {
            url += `${queryChar(url)}_=${Math.random()}`;
        }


        //->发送ajax请求
        let xhr = new XMLHttpRequest;
        xhr.open(method, url, async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //->获取字符串
                let result = xhr.responseText;

                //->处理dataType
                switch (dataType.toUpperCase()) {
                    case "JSON":
                        result = "JSON" in window ? JSON.parse(result) : eval("(+result+)");
                        break;
                    case "XML":
                        result = xhr.responseText;
                        break;
                }


                //->数据获取成功后,执行success回调函数
                typeof success === "function" ? success(result) : null;
                //->这个操作还可以这么写:
                // success && success(result);
            }
        };
        xhr.send(data);
    };
    window.ajax = ajax;
}();

/*

 ajax库/jQuery中的ajax方法
 */