function on(curEle, type, fn) {
    if ('addEventListener' in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    if (!curEle[type + 'Pool']) {
        curEle[type + 'Pool'] = [];

        //->把RUN方法放在内置的事件池中:触发当前元素的事件行为的时候,浏览器会把RUN方法执行(而执行RUN方法就会把我们自己事件池中绑定的那些方法依次执行)
        //1、我们执行ON方法,只要把RUN放在内置事件池中一次就够了,没必要每一次执行ON都放内置的事件池一次(此处判断只会执行一次)
        //2、当触发事件行为,执行RUN方法的时候,RUN中的THIS是window,我们需要让RUN中的THIS是当前元素才可以
        curEle.attachEvent('on' + type, run.bind(curEle));

        // curEle['on' + type] = run; 当然用DOM0来做这件事就很简单了,此时当RUN执行的时候,RUN中的this是当前元素
    }
    var ary = curEle[type + 'Pool'];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            return;
        }
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
            ary.splice(i, 1);
            break;
        }
    }
}

//=>RUN:把我们自己创建的事件池按照顺序执行
function run(e) {
    //->THIS:当前元素
    //->E:内置事件池中的方法执行,浏览器默认会给传递E(事件对象)
    if (!e.target) {
        //->IE6~8
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
            var item = ary[i];//->我们自己事件池中存储的一个个的方法
            item.call(this, e);//->我们把这些方法执行:让方法中的THIS是当前的元素,并且把事件对象传递给这个方法(贴合标准浏览器的机制)
        }
    }
}
