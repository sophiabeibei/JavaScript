function on(curEle, eventType, eventFn) {
    if (/^self/.test(eventType)) {
        if (!curEle['myself' + eventType]) {
            curEle['myself' + eventType] = [];
        }
        var ary = curEle['myself' + eventType];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === eventFn) {
                return;
            }
        }
		ary.push(eventFn);
		return;
	}
        if (curEle.addEventListener) {
            curEle.addEventListener(eventType, eventFn, false);
            return;
        }
		
        if (!curEle['myEvent' + eventType]) {
            curEle['myEvent' + eventType] = [];
            curEle.attachEvent("on" + eventType, function () {
                run.call(curEle)
            });
        }
        var ary = curEle['myEvent' + eventType];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === eventFn) {
                return;
            }
        }
        ary.push(eventFn)
   
}
function off(curEle, eventType, eventFn) {
    if (/^self/.test(eventType)) {
        var ary = curEle['myself' + eventType]
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] === eventFn) {
                    ary[i] = null;
                    return
                }
            }
        }
    } else if (curEle.removeEventListener) {
        curEle.removeEventListener(eventType, eventFn, false)
    }
    else {
        var ary = curEle['myEvent' + eventType];
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] === eventFn) {
                    ary[i] = null;
                    return
                }
            }
        }
    }
}
function run() {
    var e = e || window.event;
    if (ary && ary.length) {
        if (!e.target) {
            e.target = e.srcElement;
            e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
            e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            }
        }
        var ary = this['myEvent' + e.type];
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] == 'function') {
                ary[i].call(this, e);
            } else {
                ary.splice(i, 1);
                i--;
            }
        }
    }
}

function selfRun(selfRun, e) {
    var ary = this['myself' + selfRun];
    if (ary && ary.length) {
		for(var i=0;i<ary.length;i++)
			if (typeof ary[i] == 'function') {
				ary[i].call(this, e);
				//a[i]();
			}else {
				ary.splice(i, 1);
				i--;
			}
    }
}

function processThis(fn, obj) {
    return function (e) {
        fn.call(obj, e)
    }
}
//F11,逐语句调试（是最详细的调试，会进入到某个方法的定义中去跟踪）
//F10：逐过程调试(不会进入到自定义函数里去跟踪代码)
//F8：逐断点调试（相当于IE中的F5）
//当代码运行的时候，会停在断点的位置。如果代码不执行，断点没有意义。
//断点停在那一行代码，表示即将执行这一行代码（但是还未执行）