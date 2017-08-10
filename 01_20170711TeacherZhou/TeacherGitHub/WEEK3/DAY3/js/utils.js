var utils = (function () {
    //->toArray:把类数组转换为数组
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON:把JSON字符串变为对象
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    //->setCss：设置元素的样式
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

    //->getCss：获取元素的样式属性值
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

    //->css：实现获取、单独设置、批量设置元素的样式属性
    function css() {
        var arg = arguments,
            fn = getCss;
        if (arg.length >= 3) fn = setCss;
        if (arg.length === 2 && typeof arg[1] === 'object') fn = setGroupCss;
        return fn.apply(null, arg);
    }

    //->offset：获取当前元素距离BODY的偏移量
    function offset(curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while (p) {
            if (!/MSIE 8/i.test(navigator.userAgent)) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t};
    }

    //->win：设置或者获取浏览器的JS盒子模型属性
    function win(attr, value) {
        if (typeof value !== 'undefined') {
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        css: css,
        offset: offset,
        win: win
    };
})();