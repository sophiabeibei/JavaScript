/*
 定时器一共两种:setInterval/setTimeout

 1、setInterval([function],[intarval]) ：设置一个定时器，然后每隔[intarval]这么长的时间执行一次[function]，直到手动清除定时器，才会终止

 2、setTimeout([function],[intarval])：设置一个定时器，然后等[intarval]这么长的时间执行一次[function]，定时器结束
 */

//=>设置定时器的时候,会有一个返回值,返回值是一个数字,代表当前的定时器是第几个，当我们清除定时器的时候，只需要指定这个数字，就会把相关的定时器清除掉
//===>不管设置的是那种定时器,都是按照设定的时间排好序号的,清除的时候 clearInterval && clearTimeout 中的任意一个方法,只要指定好对应的编号,都可以把当前的定时器清除掉

window.setInterval(function () {
    console.log(1);
}, 1000);

// var timer2 = window.setTimeout(function () {
//     console.log(2);
// }, 500);