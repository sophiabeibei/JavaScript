// fn();//->因为变量提升阶段完成了函数的声明+定义,所以在哪执行都可以
// function fn() {
//     console.log("ok");
// }



//1.
/*把一个函数作为值赋值给一个变量,这种方式叫做函数表达式;

* 变量提升
*       var fn; =>undefined
* */
fn();//->Uncaught TypeError: fn is not a function
var fn = function () {
    console.log("ok");
};


//2.
/*
* 把一个函数赋值给元素事件,这种方式也叫函数表达式;
* */
document.body.onclick = function () {
    //->2.1点击BODY的时候函数执行
};
document.body.onclick();//->2.2这种方式也是把寒素执行了(这叫模拟点击事件)

//css的连接方式有啥不同???
//import是同步
//link是异步


//写出position的所有值???
//->移动端开发的时候,position: fiexd不兼容,怎么解决??




//boxszing-box??


//h5   和 native的区别?

//你了解过闭包吗?















































