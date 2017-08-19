// //---------------------------------------------定时器中的递归思想之: setInterval
// //->需求: 每间隔一秒钟我们都在原来的基础上累加1,当累加到五的时候,结束这个的操作
// var n = 0;
// var timer = window.setInterval(function () {
//     console.log(++n);//->
//     if(n>=5){
//         clearInterval(timer);
//     }
// },1000);


// //----------------------------------------定时器中的递归思想之: setTimeout
// //->需求: 每间隔一秒钟我们都在原来的基础上累加1,当累加到五的时候,结束这个的操作
// //->setTimeout 不能实现上面的需求,定时器执行依次就不再执行了
// var n = 0;
// var timer = window.setTimeout(function () {
//     console.log(++n);//->
//     if(n>=5){
//         clearInterval(timer);
//     }
// },1000);



// //----------------------------------------定时器中的递归思想之: setTimeout去实现setInterval思想原理: 基于递归思想
// //->需求: 每间隔一秒钟我们都在原来的基础上累加1,当累加到五的时候,结束这个的操作
// //->setTimeout去实现setInterval的思想原理: 基于递归思想(函数执行的时候在调用自己执行)来实现我们的需求
// var timer = null,
//     n = 0;
// function fn() {
//     console.log(++n);//->1
//     if(n>=5){
//         //->已经到达最后的阶段了,结束后将不再执行fn,我们也就没必要再设置新的定时器了
//         return;
//     }
//     timer = window.setTimeout(fn,1000);//->每一次执行fn结束后,为了过一秒再次执行fn,我们再重新设置一个定时器
// }
// timer = setTimeout(fn,1000);


// //----------------------------------------setTimeout去实现setInterval思想原理: 基于递归思想----优化性能
// //->需求: 每间隔一秒钟我们都在原来的基础上累加1,当累加到五的时候,结束这个的操作
// //->setTimeout去实现setInterval的思想原理: 基于递归思想(函数执行的时候在调用自己执行)来实现我们的需求
// var timer = null,
//     n = 0;
// function fn() {
//     //->执行fn之前的第一步: 把上一次没用的那个定时器清除掉
//     window.clearTimeout(timer);
//     console.log(++n);//->1
//     if(n>=5){
//         //->已经到达最后的阶段了,结束后将不再执行fn,我们也就没必要再设置新的定时器了
//         return;
//     }
//     timer = window.setTimeout(fn,1000);//->每一次执行fn结束后,为了过一秒再次执行fn,我们再重新设置一个定时器
// }
// timer = setTimeout(fn,1000);

















































