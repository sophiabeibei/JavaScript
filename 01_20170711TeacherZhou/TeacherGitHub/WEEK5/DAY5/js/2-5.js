function on(curEle, type, fn) {
    if ('addEventListener' in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    if (!curEle[type + 'Pool']) {
        curEle[type + 'Pool'] = [];
        curEle.attachEvent('on' + type, function (e) {
            //->this:window
            run.call(curEle, e);
        });
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
            // ary.splice(i, 1);
            ary[i] = null;
            break;
        }
    }
}

//=>RUN:把我们自己创建的事件池按照顺序执行
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
            if (!item) {//item===null
                ary.splice(i, 1);
                i--;
                continue;
            }
            item.call(this, e);
        }
    }
}

function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
function fn3() {
    console.log(3);
    off(document.body, 'click', fn1);
    off(document.body, 'click', fn2);
    off(document.body, 'click', fn4);
}
function fn4() {
    console.log(4);
}
function fn5() {
    console.log(5);
}
function fn6() {
    console.log(6);
}
function fn7() {
    console.log(7);
}
function fn8() {
    console.log(8);
}
function fn9() {
    console.log(9);
}
function fn10() {
    console.log(10);
}
function fn11() {
    console.log(11);
}
function fn12() {
    console.log(12);
}

on(document.body, 'click', fn1);
on(document.body, 'click', fn2);
on(document.body, 'click', fn3);
on(document.body, 'click', fn4);
on(document.body, 'click', fn5);
on(document.body, 'click', fn6);
on(document.body, 'click', fn7);
on(document.body, 'click', fn8);
on(document.body, 'click', fn9);
on(document.body, 'click', fn10);
on(document.body, 'click', fn11);
on(document.body, 'click', fn12);


//=============================================
var obj = {name: '珠峰'};
function fn(num1, num2) {
    console.log(this, num1, num2);
}
// setTimeout(fn, 1000);//->this:window num1=num2=undefined

// setTimeout(fn.bind(obj, 100, 200), 1000);//->this:obj num1=100 num2=200

// setTimeout(function () {
//     fn.call(obj, 100, 200);
// }, 1000);//->this:obj num1=100 num2=200

// Function.prototype.bind = function bind(context) {
//     //->this:fn我们需要操作的函数
//     var _this = this,
//         outer = [].slice.call(arguments, 1);//->除了CONTEXT之外的其它参数集合
//     return function () {
//         var inner = [].slice.call(arguments);
//         _this.apply(context, outer.concat(inner));
//     }
// };

// setTimeout(fn.bind(obj, 100, 200), 1000);
// setTimeout(function () {
//     fn.apply(obj, [100, 200]);
// }, 1000);

// document.body.onclick = fn.bind(obj, 100, 200);
// document.body.onclick = function (e) {
//     // _this.apply(context, outer);
//     fn.apply(obj, [100, 200]);
// };

Function.prototype.myBind = function myBind(context) {
    var _this = this,
        outer = [].slice.call(arguments, 1);
    return function () {
        var inner = [].slice.call(arguments);
        _this.apply(context, outer.concat(inner));
    }
};
