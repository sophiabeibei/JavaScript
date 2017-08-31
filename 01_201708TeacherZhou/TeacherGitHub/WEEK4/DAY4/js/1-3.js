//->需求：每间隔一秒钟我们都在原来的基础上累加一，当累加到五的时候，结束这样的操作

//=>setInterval
// var n = 0;
// var timer = window.setInterval(function () {
//     console.log(++n);
//     if (n >= 5) {
//         window.clearInterval(timer);
//     }
// }, 1000);

//=>setTimeout
//->定时器执行一次后就不再执行了
// var n = 0;
// var timer = window.setTimeout(function () {
//     console.log(++n);
//     if (n >= 5) {
//         window.clearInterval(timer);
//     }
// }, 1000);

//->基于递归思想(函数执行的时候在调用自己执行)来实现我们的需求
var timer = null,
    n = 0;
function fn() {
    //->执行FN之前的第一步：把上一次没用的那个定时器清除掉
    window.clearTimeout(timer);

    console.log(++n);
    if (n >= 5) {
        //->已经到达最后的阶段了,结束后讲不再执行FN,我们也就没有必要在设置新的定时器了
        return;
    }
    timer = setTimeout(fn, 1000);//->每一次执行FN结束后,为了过一秒后再次执行FN,我们在重新设置一个定时器
}
timer = setTimeout(fn, 1000);








