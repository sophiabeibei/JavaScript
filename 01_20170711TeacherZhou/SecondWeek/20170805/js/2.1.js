obj = {name: "obj",fn: fn};
var ary = [12,23];
function fn(){
    console.log(this);
}
fn();//->this: window
obj.fn();//->this: obj     Object {name: "obj", fn: function}

//->让fn执行,并且让里面的this变为ary
fn.call(ary);//->[12, 23]
fn.call(obj);//->Object {name: "obj", fn: function}
fn.call();//->不写,this: windo
fn.call(null);//->window
fn.call(undefined);//->window

/*
* call方法总结
*   1.语法: [函数].call([context],para1,para2...)
*   2.作用:
*       1.先让函数中的this变为第一个传递的参数值([context])
*       2.最后再立即把[函数]执行,第二个及以后的参数(para1,para2...)都是在给这个[函数]传递实参;
*
*   3.特殊: 第一个参数不写或者写null/undefined,函数中的this都是window;除此之外,第一个参数写的是谁,this就指向谁;
*       fn.call(ary);//->[12, 23]
*       fn.call(obj);//->Object {name: "obj", fn: function}
*       fn.call();//->不写,this: window
*       fn.call(null);//->window
*       fn.call(undefined);//->window
* */




















