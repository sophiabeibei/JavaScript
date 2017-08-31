/*
 * 严格模式和非严格模式的区别:
 *   ->严格模式下不允许使用: arguments.callee/arguments.callee.caller这两个属性;
 *
 *
 * */




//->非严格模式下:
function fn() {
    console.log(arguments.callee);//->存储的是当前函数本身  也就是fn;
    arguments.callee();
    console.log(arguments.callee.caller);//->存储的是当前函数在哪个作用域下执行的,如果是在全局下执行的,返回结果是null,如果aa函数中执行的,它存储的值就是aa本身;


}
fn();

//arguments.callee()的好处: 匿名函数
/*~function () {
    console.log(arguments.callee);//->存储的是当前函数本身  也就是fn;
    arguments.callee();//->不需要名字就可以自己调用自己

}();*/




function aa() {
    fn();
}
aa();

//->严格模式下:
function sum() {
    "use strict";
    //console.log(arguments.callee);//->Uncaught RangeError: Maximum call stack size exceeded
}
fn();































