/*
 * 严格模式和非严格模式的区别:
 *   ->非严格模式下,自执行函数中的this是window
 *   ->严格模式下,自执行函数中的this是undefined;
 *
 *   ->非严格模式下,如果不确定执行的主体,this都是window,
 *     严格模式下,不知道执行主体的时候,this都是undefined;
 *
 *
 * */


//->范例一:
// ~function(){
//     console.log(this);//->window
// }();
//
// ~function () {
//     "use strict";
//     console.log(this);//->undefined
// }();





//->范例二
function fn() {
    console.log(this);//->window
}
fn();
fn.call();//->this: window
fn.call(null);//->this: window
fn.call(undefined);//->this: window




//->范例三
function sum() {
    "use strict";
    console.log(this);//->undefined     方法执行,没".",不知道执行主体是谁;严格模式下,不知道执行主体的时候,this都是undefined;
}
sum();
fn.call();//->this: undefined       不写是undefined;
fn.call(null);//->this: null             写啥就是啥
fn.call(undefined);//->this: undefined       写啥就是啥













