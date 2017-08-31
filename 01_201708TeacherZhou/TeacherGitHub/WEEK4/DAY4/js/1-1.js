// var n = 0;
// window.setInterval(function () {
//     console.log(++n);//->输出多次,从1开始一直累加下去
// }, 1000);

// var m = 0;
// window.setTimeout(function (str) {
//     //console.log(++m);//->输出一次1
//     console.log(str);
// }, 1000, 'i am parameter');

// window.setTimeout(function () {
//     //->一般情况下,当时间到达,执行这个匿名函数的时候,函数中的THIS指向WINDOW,而且当前函数中没有传递任何的实参
//     console.log(this === window);
// }, 1000);

// var obj = {name: 'zhufeng'};
// window.setTimeout(function (num) {
//     //->使用CALL或者APPLY
//     //在设置定时器的时候就把当前的匿名函数执行了,把函数执行的结果赋值给了定时器 <=> setTimeout(undefined,1000) 1000MS后执行的是UNDEFINED,不是我们想要的效果
// }.call(obj, 100), 1000);

// window.setTimeout(function (num) {
//     //->使用BIND(IE6~8下不兼容)
//     //使用BIND可以解决这个问题,BIND仅仅是预先把函数中的THIS和参数都准备好,设置定时器的时候,第一个参数还依然是个函数,当1000MS后执行函数,此时函数中的THIS已经是预先设置的OBJ了,NUM的值也是预先设定好的100这个值
// }.bind(obj, 100), 1000);

//=>利用了闭包可以保存内容的机制:在设置定时器的时候,我们预先形成一个不销毁的闭包(把需要的THIS和NUM提前通过CALL改变了),在这函数中返回一个小函数给定时器,1000MS后执行返回的小函数,在小函数中我们可以通过作用域链的机制找到需要的OBJ以及NUM
var obj = {name: 'zhufeng'};
window.setTimeout(function (num) {
    //->this:obj num=100
    var _this = this;
    return function () {
        //->1000MS后执行的是返回的小函数,把需要处理的事情放在小函数中即可
        console.log(num);//->100
        console.log(this);//->window
        console.log(_this);//->obj
    }
}.call(obj, 100), 1000);







