~(function () {
    //===================================bind执行原理   裸码(兼容所有浏览器)
    Function.prototype.myBind = function myBind(context) {
        var _this = this,
            outer = [].slice.call(arguments,1);
        return function () {
            var inner = [].slice.call(arguments);
            _this.apply(context,outer.concat(inner));
        }
    };



    function on(curEle, type, fn) {
        if ("addEventListener" in curEle) {
            curEle.addEventListener(type, fn, false);
            return;
        }
        if (!curEle[type + "Pool"]) {
            curEle[type + "Pool"] = [];
            curEle.attachEvent("on" + type, myBind(curEle));
        }
        var ary = curEle[type + "Pool"];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                return;
            }
        }
        ary.push(fn);
    }
    function off(curEle, type, fn) {
        if ("addEventListener" in curEle) {
            curEle.removeEventListener(type, fn, false);
            return;
        }
        var ary = curEle[type + "Pool"] || [];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                // ary.splice(i, 1);
                ary[i] = null;
                break;
            }
        }
    }
    function run(e) {
        if(!e.target){
            // 事件对象不兼容   这里加处理
            e.target = e.srcElement;
            e.pageX=e.clientX+(document.documentElement.scrollWidth||document.body.scrollWidth);
            e.pageY=e.clientY+(document.documentElement.scrollHeight||document.body.scrollHeight);
            e.preventDefault = function () {
                e.returnValue=false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            }
        }
        var ary = this[e.type + "Pool"];
        if(ary){
            for (var i = 0; i < ary.length; i++) {
                var item = ary[i];
                if(!item){//->item===null
                    ary.splice(i,1);
                    i--;
                    continue;
                }
                item.call(this,e);
            }
        }
    }
    window.event = {
        on: on,
        off: off
    }
})();


//事件库event.js


