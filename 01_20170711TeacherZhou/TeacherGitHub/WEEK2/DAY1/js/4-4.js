/*
 * 严格模式和非严格模式的区别：
 *  ->非严格模式下,ARGUMENTS和形参存在映射关系(一个改,另外一个也跟着自动改)
 *  ->严格模式下,ARGUMENTS和形参没有映射关系
 */
function fn(x, y) {
    arguments[0] = 100;
    console.log(x);//->100

    y = 200;
    console.log(arguments[1]);//->200
}
fn(10, 20);

function sum(x, y) {
    'use strict';
    arguments[0] = 100;
    console.log(x);//->10

    y = 200;
    console.log(arguments[1]);//->20
}
sum(10, 20);