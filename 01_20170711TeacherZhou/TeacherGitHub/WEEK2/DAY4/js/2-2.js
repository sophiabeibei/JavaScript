var obj = {name: 'obj', fn: fn};
var ary = [12, 23];
function fn(num1, num2) {
    console.log(this, num1, num2);
}
fn.apply();//->this:window  num1=num2=undefined
fn.apply(null, [12]);//->this:window num1=12 num2=undefined
fn.apply(undefined, [12, 23]);//->this:window num1=12 num2=23
fn.apply([100, 200]);//->this:[100, 200] num1=undefined num2=undefined

/*
 * APPLY方法总结
 *  ->语法: [函数].apply([context],[para1,para2...]) 和CALL的区别,CALL是一个个的给函数传递参数,APPLY要求把传递给函数的实参放在一个数组中,但是执行的时候也相当于在给函数一个个的传参,只是语法上的一丢丢区别而已
 *
 *  ->作用:
 *   和CALL一模一样
 *
 *  ->特殊:
 *   和CALL一模一样
 */