var utils = (function () {
    function listToArray(likeAry) {
        try {
            return Array.prototype.slice.call(likeAry, 0);
        } catch (e) { // e.message
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
            return ary;
        }
    }

    function offset(ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            l += par.clientLeft + par.offsetLeft;
            t += par.clientTop + par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}; // top不能作为全局变量
    }

    function win(attr, val) {
        if (typeof val != 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function getCss(ele, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele)[attr];
        } else { // ie
            if (attr == 'opacity') {
                val = ele.currentStyle.filter; // alpha(opacity=55.5)  \d+
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        // 100px -100px 100.5px  "1"
        var reg = /^-?\d+(\.\d+)?(px)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val; // ieLow
            return;
        }
        var reg = /width|height|top|left|right|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
        if (reg.test(attr)) { // 如果验证属性名字通过，就是来设置width等属性
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }

    function getElesByClass(className, context) {
        context = context || document;
        if(context.getElementsByClassName){
            return listToArray(context.getElementsByClassName(className));
        }
        // for low ie   "  a b  "
        var classNameAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        var tags = context.getElementsByTagName('*');
        var ary = [];
        for(var i = 0; i < tags.length; i++){
            var curTag = tags[i];
            var isGoodTag = true; // 假设
            for(var j = 0; j < classNameAry.length; j++){
                var curClass = classNameAry[j];
                var reg = new RegExp('(^| +)'+curClass+'( +|$)');
                if(!reg.test(curTag.className)){
                    isGoodTag = false;
                    break;
                }
            }
            isGoodTag && ary.push(curTag);
        }
        return ary;
    }

    return {
        listToArray: listToArray,
        offset: offset,
        win: win,
        jsonParse: jsonParse,
        getCss: getCss,
        setCss: setCss,
        getElesByClass : getElesByClass
    };
})();

