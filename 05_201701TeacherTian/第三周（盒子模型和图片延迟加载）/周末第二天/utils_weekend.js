var utils = (function (){
    var isStanderBrowser = !!document.getElementsByClassName; //

    function listToArray(likeAry){
        try{
            return Array.prototype.slice.call(likeAry,0);
        }catch(e){
            var ary = [];
            for(var i = 0; i < likeAry.length; i++){
                ary.push(likeAry[i]);
            }
            return ary;
        }
    }



    function win(attr,val){ // 浏览器窗口如果val没有就是获取，否则就是设置
        if(typeof val == 'undefined'){
            return document.documentElement[attr] || document.body[attr];
        }
        // scrollTop和scrollLeft生效
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    function getCss(ele,attr){
        var val = null;
        if(window.getComputedStyle){ // 标准
            val = window.getComputedStyle(ele,null)[attr];
        }else{ // ie8-
            // 处理透明度
            if(attr == 'opacity'){
                val = ele.currentStyle.filter; // alpha(opacity=50.5)
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
            }else{
                val = ele.currentStyle[attr];
            }
        }
        //  100px -1000px -100.50px '1' 'block'
        var reg = /^-?\d+(\.\d+)?(px)?$/; // 处理单位
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(/*ele,*/ele,attr,val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity='+ val*100 +')';
            return;
        }
        if(attr == 'float'){
            ele.style.cssFloat = val;
            ele.style.styleFloat = val; // ie
            return;
        }
        // width, height, left top right bottom margin padding marginLeft ...
        var reg = /width|height|left|top|right|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
        //reg.test(attr) ? !isNaN(val)? val += 'px' : void 0 : void 0;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }

    function setGroupCss(ele,group){ // => {}
        if(Object.prototype.toString.call(group) == '[object Object]'){
            for(var key in group){
                // key : width, height, background ...
                // val : group[key]
                setCss(ele,key,group[key]);
            }
        }
    }

    function css(ele){
        var secondParam = arguments[1];
        var thirdParam = arguments[2];
        if(typeof secondParam == 'string'){ // setCss getCss
            if(typeof thirdParam == 'undefined'){ // getCss
                return getCss(ele,secondParam);
            }
            setCss/*.call*/(ele,secondParam,thirdParam);
        }
        // setGroupCss
        secondParam = secondParam || [];
        if(secondParam.toString() == '[object Object]'){
            setGroupCss(ele,secondParam);
        }
    }

    function getRandom(n,m){
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        return Math.round(Math.random()*(m-n)+n);
    }

    function getElesByClass(className, context) {
        context = context || document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }
        var allTags = context.getElementsByTagName('*');
        var classAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        var ary = [];
        for(var i = 0; i < allTags.length; i++){
            var curTag = allTags[i];
            var isGoodTag = true;
            for(var j = 0; j < classAry.length; j++){
                var curClass = classAry[j];
                var reg = new RegExp('(^| +)'+curClass+'( +|$)');
                if(!reg.test(curTag.className)){
                    isGoodTag = false;
                    break;
                }
            }
            if(isGoodTag){
                ary.push(curTag);
            }
        }
        return ary;
    }

    function hasClass(ele,className){
        return new RegExp('(^| +)'+className+'( +|$)').test(ele.className);
    }

    // 给ele增加className这个类
    function addClass(ele,className){
        var classAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        for(var i = 0; i < classAry.length; i++){ //分别增加类
            // 如果原来存在这个类就没有必要增加了
            if(!hasClass(ele,classAry[i])){
                ele.className += ' ' + classAry[i]; // 在className的尾巴上追加
            }
        }
    }

    //
    function removeClass(ele,className){
        var classAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        for(var i = 0; i < classAry.length; i++){
            var curClass = classAry[i]; // c2,c3
            if(hasClass(ele,curClass)){ // 如果ele有这个class我才移除
                var reg = new RegExp('(^| +)'+curClass+'( +|$)','g');
                ele.className = ele.className.replace(reg," ");
            }
        }
    }
    //
    function offset(ele){
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par){
            l += par.clientLeft + par.offsetLeft;
            t += par.clientTop + par.offsetTop;
            par = par.offsetParent;
        }
        return { left : l, top : t };
    }

    function prev(ele){ // 获取上一个元素哥哥节点
        if(isStanderBrowser){
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling; // 先获取上一个哥哥节点
        while (pre && pre.nodeType != 1 ){
            pre = pre.previousSibling;
        }
        return pre;
    }

    function next(ele){
        if(isStanderBrowser){
            return ele.nextElementSibling;
        }
        var nex = ele.nextSibling;
        while (nex && nex.nodeType != 1){
            nex = nex.nextSibling;
        }
        return nex;
    }

    function prevAll(ele){ //所有的元素哥哥
        var ary = [];
        var pre = prev(ele); // 先获取一个元素哥哥
        while (pre){
            ary.unshift(pre);
            pre = prev(pre); // pre条件更新
        }
        return ary;
    }

    function nextAll(ele){
        var ary = [];
        var nex = next(ele);
        while(nex){
            ary.push(nex);
            nex = next(nex);
        }
        return ary;
    }

    function siblings(ele){ // 所有兄弟们
        return prevAll(ele).concat(nextAll(ele));
    }

    function index(ele){
        return prevAll(ele).length;
    }

    function children(ele,tagName){ // 所有元素子节点
        var ary = [];
        if(isStanderBrowser){
            ary =  listToArray(ele.children);
        }else{
// 从childNodes里挑出来nodeType为1
            var childs = ele.childNodes;
            for(var i = 0; i < childs.length; i++){
                if(childs[i].nodeType == 1){
                    ary.push(childs[i]);
                }
            }
        }

        if(typeof tagName == 'string'){ // 'p'
            for(var i = 0; i < ary.length; i++){
                if(ary[i].nodeName !== tagName.toUpperCase()){
                    ary.splice(i,1);
                    i--;
                }
            }
        }
        return ary;
    }


    return {
        // 如果想用这个函数
        listToArray : listToArray,
        getRandom : getRandom,
        win : win,
        css : css,
        getElesByClass : getElesByClass,
        hasClass : hasClass,
        addClass : addClass,
        removeClass : removeClass,
        offset : offset,
        prev : prev,
        next : next,
        prevAll : prevAll,
        nextAll : nextAll,
        siblings : siblings,
        index : index,
        children : children
    };
})();










