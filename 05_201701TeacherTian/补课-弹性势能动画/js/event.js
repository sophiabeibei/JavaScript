;(function () {
    function on(ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn);
        } else {
            if (!ele['AAA' + type]) {
                ele['AAA' + type] = [];
                ele.attachEvent('on' + type, bind(run, ele));
            }
            var a = ele['AAA' + type];
            for (var i = 0; i < a.length; i++) {
                if (a[i] === fn) {
                    return;
                }
            }
            a.push(fn);
        }
    }

    function run(e) {
        e = window.event;
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };

        var a = this['AAA' + e.type];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                if (typeof a[i] == 'function') {
                    a[i].call(this, e);
                } else {
                    a.splice(i, 1);
                    i--;
                }
            }
        }
    }

    function off(ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn);
        } else {
            var a = ele['AAA' + type];
            if (a && a.length) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === fn) {
                        //a.splice(i,1);
                        a[i] = null;
                        break;
                    }
                }
            }
        }
    }

    function bind(fn, context) {
        return function (e) {
            fn.call(context, e);
        }
    }

    window.on = on;
    window.off = off;
    window.bind = bind;
})();