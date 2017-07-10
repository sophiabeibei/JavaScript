var utils= {
    toJSON  : function (str) {
        return "JSON" in window ?JSON.parse(str) : eval("("+str+")");
    },
    listToArray : function (likeAry) {
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry)
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    offset : function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p){
            l+= p.clientLeft+p.offsetLeft;
            t+= p.clientTop+p.offsetTop;
            p = p.offsetParent;
        }
        return {left :l,top:t};
    },
    getCss : function getCss(curEle,attr) {
        var val = null;
        var reg = null;
        if("getComputedStyle" in window){
            val = window.getComputedStyle(curEle)[attr];//
        }else{
            if(attr==="opacity"){
                val = curEle.currentStyle["filter"];//alpha(opacity=50)
                reg =/^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
//                console.log(reg.exec(val))
                var temp = reg.exec(val)[1];
                val = temp ? temp/100 : 1;
                val = parseFloat(val);
            }else{
                val = curEle.currentStyle[attr];
            }
        };
        // val  : 颜色 数字 数字+单位
        //val = isNaN(parseFloat(val)) ? val : parseFloat(val);
        var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
        val = reg1.test(val) ? parseFloat(val) : val;
        return val;
    },
    setCss : function setCss(curEle,attr,value) {
        if(attr === "opacity"){
            curEle.style["opacity"] = value;
            // 在IE下对透明度的设置
            curEle.style["filter"] = "alpha(opacity="+ value*100 +")";
        };
        if(attr==="float"){
            //在IE下对浮动的设置
            curEle.style["cssFloat"] = value;
            curEle.style["styleFloat"] = value;
        }
        // 确保对宽高marginpadding赋值带单位
        var reg = /^width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?)$/;
        // 取匹配要修改的属性是以上几种
        if(reg.test(attr)){
            // 判断当前的值是否带有单位，如果没有，进行拼接
            if(!isNaN(value)){
                value+="px";
            }
        }
        curEle.style[attr] = value;
    },
    win : function win(attr,value) {
        if(value === undefined){
            return document.documentElement[attr] || document.body[attr];
        };
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    getByClass :     function getByClass(cName,context) {
        context = context || document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(cName);
        };
        var ary= [];
        for(var i=0;i<nodes.length;i++){
            var curNode = nodes[i];
            var curClass = curNode.className;//"first second"
            var reg = new RegExp("(^|\\s+)"+cName+"(\\s+|$)");
            if(reg.test(curClass)){
                ary.push(curNode)
            }
        }
        return ary;
    },
    hasClass :function hasClass(curEle,cName) {
        var curEleClass = curEle.className;
        var reg = new RegExp("(^| +)"+cName+"( +|$)");
        return reg.test(curEleClass);
    },
    addClass : function addClass(curEle,cName) {
        var reg  = new RegExp("^ +| +$","g");
        cName = cName.replace(reg,"");
        var ary = cName.split(/ +/g);
        for(var i=0;i<ary.length;i++){
            if(!utils.hasClass(curEle,ary[i])){
                curEle.className +=" " +ary[i];
            }
        };
    },
    removeClass :function removeClass(curEle,cName) {
        var  reg = new RegExp("^ +| +$","g");
        cName = cName.replace(reg,"");
        var ary = cName.split(/ +/g)
        for(var i=0;i<ary.length;i++){
            var curName = ary[i];
            if(utils.hasClass(curEle,curName)){
                var reg1 = new RegExp("(^| +)"+curName+"( +|$)");
                curEle.className = curEle.className.replace(reg1," ")
            }
        }
    },
    getIndex :function getIndex(curEle) {
        var index = 0;
        var p = curEle.previousSibling;// 获取上一个哥哥节点
        while(p){
            if(p.nodeType ===1){
                index++;
            }
            p=p.previousSibling
        }
        return index;
    },
    siblings : function siblings(curEle) {
        var nodes = curEle.parentNode.childNodes// 子节点
        var ary =[];
        for(var i=0;i<nodes.length;i++){
            var curNode = nodes[i];
            if(curNode !== curEle&&curNode.nodeType===1){
                ary.push(curNode)
            }
        };
        return ary;
    },
    previousSiblings : function prevSiblings(curEle) {
        var ary =[];
        var p = curEle.previousSibling;
        while(p){
            if(p.nodeType ===1){
                ary.unshift(p)
            }
            p = p.previousSibling;
        }
        return ary;
    },
    nextSiblings :   function nextSiblings(curEle) {
        var ary = [];
        var n = curEle.nextSibling;
        while (n) {
            if (n.nodeType === 1) {
                ary.push(n)
            }
            n = n.nextSibling;
        }
        return ary;
    },
    prev :function prev(curEle) {
        var pre;
        if(curEle.previousElementSibling){
            pre = curEle.previousElementSibling;
            return pre;
        };
        var p = curEle.previousSibling;
        while (p){
            if(p.nodeType==1){
                return p
            }
            p = p.previousSibling;
        }
    },
    next : function next(curEle) {
        var nex;
        if(curEle.nextElementSibling){
            nex = curEle.nextElementSibling;
            return nex;
        };
        var n = curEle.nextSibling;
        while (n){
            if(n.nodeType==1){
                return n
            }
            n = n.nextSibling;
        }
    },
    children:function children(curEle) {
        var children=curEle.children;
        if(typeof curEle.nextElementSibling !="object"){
            var ary = [];
            for(var i=0;i<children.length;i++){
                var curChild = children[i];
                if(curChild.nodeType ===1){
                    ary.push(curChild);
                }
            }
            return ary;
        }
        return children;
    }
}

