/*
 * 严格模式和非严格模式的区别：
 *  ->非严格模式下,自执行函数中的THIS是window
 *  ->严格模式下,自执行函数中的THIS是undefined
 *
 *  =>非严格模式下，如果不确定执行的主体，this都是window，但是严格模式下要求，不知道执行主体的时候，this都是undefined
 */
// ~function () {
//     console.log(this);//->window
// }();
//
// ~function () {
//     'use strict';
//     console.log(this);//->undefined
// }();

function fn() {
    console.log(this);
}
fn();//->this:window
fn.call();//->this:window
fn.call(null);//->this:window
fn.call(undefined);//->this:window

function sum() {
    'use strict';
    console.log(this);
}
sum();//->this:undefined
sum.call();//->this:undefined
sum.call(null);//->this:null
sum.call(undefined);//->this:undefined