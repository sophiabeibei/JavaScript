// //=>定时器是异步编程
// var n = 0;
// window.setTimeout(function () {
//     console.log(++n);//->2) 1
// }, 1000);
// console.log(n);//->1) 0

//=>定时器的等待时间设置为零也不是立即执行:浏览器在处理一件事情的时候,会有一个最小的反应时间,我们写零浏览器是反应不过来的(谷歌一般最小的反应时间是5~6MS、IE是10~13MS,这个值会根据当前电脑CPU性能来决定的,每个人的不太一样)
// var n = 0;
// window.setTimeout(function () {
//     console.log(++n);//->2) 1
// }, 0);//->5~6
// console.log(n);//->1) 0
//
// window.onscroll = function () {
//     //->通过ONSCROLL也可以鉴证浏览器是有自己的处理最小反应时间的,我们快速滑动,在短时间内触发的此处就少一些,慢一些滑动,滑动相同的距离用的时间就会多一些,触发次数也会多一些
//     console.log('OK');
// };


//=>定时器设定了等待时间,到达时间后也不一定执行,看当前主任务队列中是否有任务正在执行呢,如果有任务在执行,到时间后也依然需要继续等待(JS是单线程的)
// var n = 0;
// window.setTimeout(function () {
//     console.log(++n);//->2) 1
// }, 10);
//
// // var strTime = new Date();
// for (var i = 0; i < 1000000000; i++) {
//     //->循环10亿次
// }
// // var endTime = new Date();
// // console.log(endTime - strTime);//->大约需要3057MS (通过这种方式可以监测代码执行的性能)
//
// console.log(n);//->1) 0

//=>此时的主任队列中遇到了死循环,浏览器永远空闲不下来,定时器等不到执行的那一天了(真实项目中要杜绝死循环:出现死循环就什么都做不了)
// var n = 0;
// window.setTimeout(function () {
//     console.log(++n);
// }, 10);
// while (1 == 1) {
//     //->死循环
// }

//=>当主任队列任务完成完成后,会到等待任务队列中,把到时间的任务执行；如果很多等待的任务都到时间了,谁先到的,我们先执行谁；如果时间都很短,而且很相近,有些时候浏览器执行顺序混乱；
window.setTimeout(function () {
    console.log(1);//->3)
}, 100);

window.setTimeout(function () {
    console.log(2);//->1)
}, 0);

window.setTimeout(function () {
    console.log(3);//->2)
}, 50);

for (var i = 0; i < 1000000000; i++) {
    //->循环10亿次:需要大概3~4S,上面所有的定时器都到时间了
}












