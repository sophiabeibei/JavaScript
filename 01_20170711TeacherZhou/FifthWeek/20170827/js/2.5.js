function on(curEle, type, fn) {
    if ("addEventListener" in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    if (!curEle[type + "Pool"]) {
        curEle[type + "Pool"] = [];
        curEle.attachEvent("on" + type, function (e) {
            //->this: window      attachEvent方法中的this是window   因为bind不兼容,这里用匿名函数;
            run.call(curEle,e);//->e: 事件元素也传给了run      事件对象有默认传事件对象e的机制;   事件对象不兼容
        });
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


// function fn1(e) {
//     console.log(1, e.pageY, this === document.body);
// }
function fn1(e) {
    console.log(1);
}
function fn2(e) {
    console.log(2);
}
function fn3(e) {
    console.log(3);
    off(document.body,"click",fn1);
    off(document.body,"click",fn2);
    off(document.body,"click",fn4);
}
function fn4(e) {
    console.log(4);
}
function fn5(e) {
    console.log(5);
}
function fn6(e) {
    console.log(6);
}
function fn7(e) {
    console.log(7);
}
function fn8(e) {
    console.log(8);
}
function fn9(e) {
    console.log(9);
}
function fn10(e) {
    console.log(10);
}
function fn11(e) {
    console.log(11);
}
function fn12(e) {
    console.log(12);
}
on(document.body,"click",fn1);
on(document.body,"click",fn2);
on(document.body,"click",fn3);
on(document.body,"click",fn4);
on(document.body,"click",fn5);
on(document.body,"click",fn6);
on(document.body,"click",fn7);
on(document.body,"click",fn8);
on(document.body,"click",fn9);
on(document.body,"click",fn10);
on(document.body,"click",fn11);
on(document.body,"click",fn12);






// var obj={name: "珠峰"};
// function fn(num1, num2) {
//     console.log(this, num1, num2);
// }
// setTimeout(fn,1000);//->this:window  num1=num2=undefined
// //需求this: obj  num1=100   num2=200
// setTimeout(fn.bind(obj,100,200),1000);//不兼容
// //兼容处理
// setTimeout(function () {
//     fn.call(obj,100,200);
// },1000);//->this: obj  num1=100   num2=200



//===================================bind实现原理
// var obj={name: "珠峰"};
// function fn(num1, num2) {
//     console.log(this, num1, num2);
// }
// setTimeout(fn,1000);//->this:window  num1=num2=undefined
// //需求this: obj  num1=100   num2=200
//
// //bind的执行原理
// Function.prototype.bind = function bind(context) {
//     //->this:fn我们需要操作的函数
//     var _this = this,
//         outer = [].slice.call(arguments,1);//->除了context之外的其它参数集合;     outer: 传进来的100和200;
//
//     return function () {
//         var inner = [].slice.call(arguments);
//         _this.apply(context,outer.concat(inner));
//         //->把e放在末尾;
//     }
// };

// setTimeout(fn.bind(obj,100,200),1000);


// document.body.onclick = fn.bind(obj,100,200);
// document.body.onclick = function () {//->对于事件来说,还有个e
//     fn.apply(obj,[100,200]);
// };



//===================================bind执行原理   裸码(兼容所有浏览器)
Function.prototype.myBind = function myBind(context) {
    var _this = this,
        outer = [].slice.call(arguments,1);
    return function () {
        var inner = [].slice.call(arguments);
        _this.apply(context,outer.concat(inner));
    }
};














//=>类似于JQ中的on方法: 给当前元素某个行为绑定方法
//=>类似于JQ中的off方法: 移除当前元素某个行为的某个方法
//=>run: 把我们自己创建的事件池按照顺序执行

//详细注释看2.4.js