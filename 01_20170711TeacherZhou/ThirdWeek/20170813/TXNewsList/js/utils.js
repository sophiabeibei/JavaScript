
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


    //20170810上午封装
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

    //->css: 实现(获取,单独设置,批量设置)元素的样式属性(第二种方法)
    function css() {
        var arg = arguments,
            len = arg.length,
            fn = getCss;
        if(len>=3)fn = setCss;
        if(len === 2 && typeof arg[1] === "object") fn = setGroupCss;
        return fn.apply(null,arg);
    }


    //20170810下午封装
    //->offset: 获取当前元素距离body的偏移量
    function offset(curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while(p && p !== document.body){
            if(!/MSIE 8.0/i.test(navigator.userAgent)){
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return{left: l,top : t};
    }

    //->win: 设置/获取浏览器的JS盒子模型属性(1个值的时候是获取,2个值的时候是设置)
    function win(attr, value) {
        if(typeof value !== "undefined"){
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }


    //20170813上午封装
    //->getPrev: 获取上一个哥哥元素节点
    function prev(curEle) {
        if("previousElementSibling" in curEle){
            return curEle.previousElementSibling;
        }
        var p = curEle.previousElementSibling;
        while (p && p.nodeType !== 1){
            p = p.previousSibling;
        }
        return p;
    }

    //->getNext: 获取下一个弟弟元素节点
    function next(curEle) {
        if("nextElementSibling" in curEle){
            return curEle.nextElementSibling;
        }
        var n = curEle.nextSibling;
        while (n && n.nodeType !== -1){
            n = n.nextSibling;
        }
        return n;
    }

    //->getPrevAll: 获取所有的哥哥元素节点
    function prevAll(curEle) {
        var ary = [],
            p = curEle.previousSibling;
        while (p){
            if(p.nodeType === 1){
                //ary.push(p);//-> [li#li3, li#li2, li#li1]
                ary.unshift(p);//->[li#li1, li#li2, li#li3]
            }
            p = p.previousSibling;
        }
        return ary;
    }

    //->getNextAll: 获取所有的弟弟元素节点
    function nextAll(curEle) {
        var ary = [],
            n = curEle.nextSibling;
        while (n){
            if(n.nodeType === 1){
                ary.push(n);
            }
            n = n.nextSibling;
        }
        return ary;
    }

    //->getSiblings: 获取有的兄弟元素节点
    function siblings(curEle) {
        return prevAll(curEle).concat(nextAll(curEle));
    }

    //->getIndex: 获取当前元素的索引
    function index(curEle) {
        return prevAll(curEle).length;
    }

    //->getFirstChild: 获取当前容器的第一个元素子节点;
    function firstChild(curEle) {
        var f = curEle.firstChild;
        while (f && f.nodeType !== 1){
            f = f.firstChild;
        }
        return f;
    }

    //->getLastChild: 获取当前容器的最后一个元素子节点
    function lastChild(curEle) {
        var l = curEle.lastChild;
        while (l && l.nodeType !== 1){
            l = l.previousSibling;
        }
        return l;
    }


    //20170813下午封装
    //->children: 获取容器所有的元素子节点;
    function children(curEle,tag) {
        var ary = [],
            nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            if(cur.nodeType ===1){
                if(typeof tag !== "undefined"){
                    cur.tagName.toUpperCase() === tag.toUpperCase() ? ary.push(cur) : null;
                    continue;
                }
                ary.push(cur);
            }
        }
        return ary;
    }

    //->byClass: 通过元素的样式类名来获取一组元素(排除法)

    // function byClass(strClass, context) {
    //     context = context || document;
    //     var ary = [],
    //         tagList = context.getElementsByTagName("*");
    //     strClass = strClass.replace(/^ +| +$/g, "").split(/ +/g);
    //     for (var i = 0; i < tagList.length; i++) {
    //         var curTag = tagList[i],
    //             curTagClass = curTag.className;
    //         for (var k = 0; k < strClass.length; k++) {
    //             var reg = new RegExp("(^| +)" + strClass[k] + "( +|$)");
    //             if(!reg.test(curTagClass)){
    //                 ary.length--;
    //                 break;
    //             }
    //         }
    //     }
    //     return ary;
    // }

    //->byClass: 通过元素的样式类名来获取一组元素(假设法)
    function byClass(strClass, context) {
        context = context || document;
        var ary = [],
            tagList = context.getElementsByTagName("*");
        strClass = strClass.replace(/^ +| +$/g, "").split(/ +/g);
        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i],
                curTagClass = curTag.className;
            var isMatch = true;
            for (var k = 0; k < strClass.length; k++) {
                var reg = new RegExp("(^| +)" + strClass[k] + "( +|$)");
                if(!reg.test(curTagClass)){
                    isMatch = false;
                    break;
                }
            }
            isMatch ?ary.push(curTag): null;
        }
        return ary;
    }

    //->hasClass: 检测当前元素是否包含某些样式类名
    function hasClass(curEle, strClass) {
        var curEleClass = curEle.className,
            isMatch = true;
        strClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
        for (var i = 0; i < strClass.length; i++) {
            var reg = new RegExp("(^| +)"+strClass[i]+"( +|$)");
            if(!reg.test(curEleClass)){
                isMatch = false;
                break;
            }
        }
        return isMatch;
    }

    //->addClass: 给当前元素增加样式类名
    function addClass(curEle, strClass) {
        strClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
        for (var i = 0; i < strClass.length; i++) {
            var curClass = strClass[i];
            if(hasClass(curEle,curClass)){
                continue;
            }
            curEle.className += "" + curClass;
        }
        curEle.className = curEle.className.replace(/ +/g," ");
    }

    //->removeClass: 移除当前元素的某一个样式类名
    function removeClass(curEle, strClass) {
        strClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
        var originalClass = curEle.className.replace(/ +/g,"  ");
        for (var i = 0; i < strClass.length; i++) {
            var curClass = strClass[i];
            if(hasClass(curEle,curClass)){
                var reg = new RegExp("(^| )"+curClass+"( |$)","g");
                originalClass = originalClass.replace(reg,"");
            }
        }
        originalClass = originalClass.replace(/ +/g," ").replace(/^ +| +$/g,"");
        curEle.className = originalClass;
    }



    return {
        toArray: toArray,
        toJSON: toJSON,
        setCss :setCss,
        setGroupCss : setGroupCss,
        getCss : getCss,
        css : css,
        offset : offset,
        win : win,
        prev : prev,
        next : next,
        prevAll : prevAll,
        nextAll : nextAll,
        siblings : siblings,
        index : index,
        firstChild : firstChild,
        lastChild : lastChild,
        children : children,
        byClass : byClass,
        hasClass : hasClass,
        addClass : addClass,
        removeClass : removeClass
    }
})();