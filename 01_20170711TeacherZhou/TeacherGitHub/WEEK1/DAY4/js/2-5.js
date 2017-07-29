// fn();//->变量提升阶段：完成了函数的声明+定义,所以在哪执行都可以
// function fn() {
//     console.log('ok');
// }

/*
 * 变量提升
 *   var fn; =>undefined
 */
fn();//->Uncaught TypeError: fn is not a function
var fn = function () {
    console.log('ok');
};

document.body.onclick = function () {
    //->点击BODY的时候函数执行
};
document.body.onclick();//->也是把函数执行了(模拟点击事件)