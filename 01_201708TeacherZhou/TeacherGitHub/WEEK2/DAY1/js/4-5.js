/*
 * 严格模式和非严格模式的区别：
 *  ->严格模式下不允许使用：arguments.callee/arguments.callee.caller这两个属性
 */
function fn() {
    //console.log(arguments.callee);//->存储的是当前函数本身:FN
    //console.log(arguments.callee.caller);//->存储的是当前函数在哪个作用域下执行的,如果是在全局下执行的,返回结果是NULL,如果AA函数中执行的,它存储的值就是AA本身
}
fn();

function aa() {
    fn();
}
aa();

function sum() {
    'use strict';
    //console.log(arguments.callee);//->Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
}
sum();