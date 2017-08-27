~function () {
    Function.prototype.myBind = function myBind(context) {
        var _this = this,
            outer = [].slice.call(arguments, 1);
        return function () {
            var inner = [].slice.call(arguments);
            _this.apply(context, outer.concat(inner));
        }
    };

    function on(curEle, type, fn) {
        if ('addEventListener' in curEle) {
            curEle.addEventListener(type, fn, false);
            return;
        }
        if (!curEle[type + 'Pool']) {
            curEle[type + 'Pool'] = [];
            curEle.attachEvent('on' + type, run.myBind(curEle));
        }
        var ary = curEle[type + 'Pool'];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) return;
        }
        ary.push(fn);
    }

    function off(curEle, type, fn) {
        if ('removeEventListener' in curEle) {
            curEle.removeEventListener(type, fn, false);
            return;
        }
        var ary = curEle[type + 'Pool'] || [];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary[i] = null;
                break;
            }
        }
    }

    function run(e) {
        if (!e.target) {
            e.target = e.srcElement;
            e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            };
        }
        var ary = this[e.type + 'Pool'];
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                var item = ary[i];
                if (!item) {
                    ary.splice(i, 1);
                    i--;
                    continue;
                }
                item.call(this, e);
            }
        }
    }

    window.zhufengEvent = {
        on: on,
        off: off
    }
}();







