
//->utils: 整个项目的公共方法库(使用单利模式封装)
var utils = (function (){

    //->toArray: converts a like array into an array(把类数组转换成数组)
    function toArray(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry);
        }catch(e){
            var len = likeAry.length;
            for (var i = 0; i < len; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON: converts a string into a object (把JSON字符串转化为对象)
    function toJSON(str) {
        //->传一个字符串过来,最终转化成对象;
        return "JSON" in window ? JSON.parse(str) : eval('('+str+')');
    }



    //->setCss: 设置元素的样式
    function setCss(curEle, attr, value) {
        if (attr.toLowerCase() === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }

        var unitReg = /^(width|height|((margin|padding)?(top|left|right|bottom)?))$/i;
        unitReg.test(attr) && !isNaN(value) ? value += 'px' : null;
        curEle['style'][attr] = value;
    }

    //->setGroupCss：批量设置元素的样式
    function setGroupCss(curEle, options) {
        if (Object.prototype.toString.call(options) !== '[object Object]') return;
        for (var attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(curEle, attr, options[attr]);
            }
        }
    }

    //->getCss: 获取元素的样式属性值
    function getCss(curEle, attr) {
        var val = null,
            reg = null;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr.toLowerCase() === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity=(.+)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|em|rem)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }



    //->css: 实现获取,单独设置,批量设置元素的样式属性(第一种方法)
    // function css() {
    //     var arg = arguments;
    //     if(arg.length >=3){
    //         //->单独设置
    //         setCss.apply(null,arg);
    //     }
    //     if(arg.length === 2 && typeof arg[1] === "object"){
    //         //->批量设置
    //         setGroupCss.apply(null,arg);
    //         return;
    //     }
    //     //->获取样式
    //     return getCss.apply(null,arg);
    // }
    //->css: 实现获取,单独设置,批量设置元素的样式属性(第二种方法)
    function css() {
        var arg = arguments,
            fn = getCss;
        if(arg.length>=3)fn = setCss;
        if(arg.length === 2 && typeof arg[1] === "object") fn = setGroupCss;
        return fn.apply(null,arg);
    }




















    return {
        toArray: toArray,
        toJSON: toJSON,
        setCss : setCss,
        setGroupCss : setGroupCss,

        css : css
    }
})();
















































