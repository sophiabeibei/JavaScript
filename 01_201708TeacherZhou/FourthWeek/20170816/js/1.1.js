/*
* 定时器可以分为两个阶段:
*   第一阶段
*   1.设置一个定时器(有两种方式setInterval,setTimeout),然后再设置一个等待时间(interval时间因子),接下来等待即可;
*   第二阶段
*   2.当到达等到的时间后,执行定时器规划的任务(设置定时器,第一个参数传递的函数,就是规划的任务)
*
*
* */


// //---------------------------------------setInterval------------------------------
// setInterval(function () {
//     //->setInterval: 当到达这个时间(1000)之后,执行这个任务
//     //->this: window
// },1000);


// // 用call不能解决需求
// //->需求: 把定时器里的this改成obj;
// var obj = {name: "zhufeng"};
// setInterval(function () {
//     //->this: obj
//     //console.log(this);
//     //->当前函数没有返回值,是undefined
//
// }.call(obj),1000);//->.call(obj): 设置定时器的时候,就把函数执行了(虽然改变了函数中的this),把函数执行的返回值(undefined)设置为定时器的第一个参数,1000ms后执行的是undefined <=> setInterval(undefined,1000)定时器到达时间执行undefined并没有报错,因为定时器本身屏蔽了错误;



// //->用bind解决需求(注意: IE678下不兼容)
// //->需求: 把定时器里的this改成obj;
// var obj = {name: "zhufeng"};
// setInterval(function () {
//     //->this: obj
//     //console.log(this);
//     //->当前函数没有返回值,是undefined
//
// }.bind(obj),1000);//->bind: 预先把函数中的this修改成obj,当定时器到达指定的时间后,执行这个函数,this也就是obj了(IE678下不兼容)





//---------------------------------------setTimeout------------------------------
//->setTimeout: 到达指定时间执行一次函数,执行完成后,当前的定时器就没有了;
//->setInterval: 到达指定的时间先把函数执行一次,但是此时定时器并米有失去它的作用,以后每间隔这么长的时间,当前的函数都会重新执行一次,"除非手动清除当前的定时器";
setTimeout(function () {
    //->this: window
    console.log(this);
},1000);


