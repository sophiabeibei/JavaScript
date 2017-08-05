var obj = {name: 'obj', fn: fn};
var ary = [12, 23];
function fn(num1, num2) {
    console.log(this);
}
// fn();//->this:window
// obj.fn();//->this:obj

//=>让fn执行,并且让里面的this变为ary
fn.call();//->this:window  num1=num2=undefined
fn.call(null, 12);//->this:window num1=12 num2=undefined
fn.call(undefined, 12, 23);//->this:window num1=12 num2=23

/*
 * CALL方法总结
 *  ->语法: [函数].call([context],para1,para2...)
 *  ->作用:
 *   1)先让[函数]中的THIS变为第一个传递的参数值([context])
 *   2)最后在立即把[函数]执行，第二个及以后的参数(para1,para2...)都是在给这个[函数]传递实参
 *
 *  ->特殊:
 *   第一个参数不写或者写的是NULL/UNDEFINED，函数中的this都是window，除此之外，第一个参数写的是谁，this就指向谁
 */

