/*
 * 同步和异步编程
 * ->每当执行一句或者一段JS代码,其实都是在完成一个任务
 *
 * 1、同步
 *  上一个任务没有完成,下一个任务不能执行=>‘任务是自上而下逐一执行的’
 *  JS中大部分的操作都是同步编程
 *
 * 2、异步
 *  上一个任务没有彻底完成(完成一半),下一个任务先去执行,等把下面的任务完成后,才会返回头执行上面没有彻底完成的任务
 *
 * => JS是单线程的编程语言：它脑子中只有一根弦，一次只能处理一件事情
 */

//=>同步
// var n = 1;
// while (n === 1) {//->当前这件事情是一个死循环:当前这件任务永远无法完成,而循环的操作是同步编程(这件事完不成,以后的事情都无法执行)
//     console.log('ok');
// }
// console.log('NO');//->永远不会输出

//=>异步
//->定时器就是异步编程的
// var n = 12;
// setTimeout(function () {
//     n++;
//     console.log(n);//->2) 13
// }, 1000);
// //->任务:设置一个定时器,1S后执行匿名函数
// //=>按照同步理解：首先设置定时器,然后等待,此时什么都不能做,1S后把函数执行,才能执行其它的任务 (错误的)
// //=>按照异步理解：首先设置定时器,但是我们不会去等待到时间在做其它的事情,在这个阶段我们首先会把下面的任务逐一去完成,当下面任务完成后,我们在返回头看定时器的等待时间是否到达,到达则执行匿名函数,如果每到继续等待 (正确的)
// console.log(n);//->1) 12


// var n = 12;
// setTimeout(function () {
//     n++;
//     console.log(n);//->2) 13
// }, 0);//->定时器的时间因子设置为零,也不是立马执行,每一个浏览器都有一个最小的反应时间(预估测试值:谷歌最小的反应时间是5~6ms IE最小反应时间是10~13ms  我们一般设置的时候,最小值设置为17ms性能会更好一些),当我们设置的时间小于这个值,浏览器也是按照最小的时间处理的  =>也就是设置一个定时器,怎么着也要等一会在执行,此时不等,继续执行下面的任务...
// console.log(n);//->1) 12


//==>我们给定时器设置一个时间,到达时间定时器一定执行了吗?
//答案：不一定
//->设置一个定时器,总要等一段时间再执行,此阶段我们不等,继续执行下面的任务,但是由于JS的单线程的,一次只能处理一件事情,下面的任务没完成,不管定时器是否到达设定的时间,也要把下面任务彻底完成后,才能反过头执行定时器里面的内容
// var n = 12;
// // var sTime = new Date();
// setTimeout(function () {
//     // var endTime = new Date();
//     // console.log(endTime - sTime);//->测试最小的反应时间
//
//     console.log(++n);//->2) 13
// }, 0);
//
// // var starTime = new Date();
// for (var i = 0; i < 100000000; i++) {
//
// }
// // var endTime = new Date();
// // console.log(endTime - starTime); //->通过性能测试，我们发现在谷歌下循环一亿次大概需要300MS左右
// console.log(n);//->1) 12


//->一次都不会输出,因为执行死循环后,当前的浏览器就再也做不了其它的事情了(JS是单线程的)
// var n = 12;
// setTimeout(function () {
//     console.log(++n);
// }, 0);
// while (1 === 1) {
//
// }
// console.log(n);

//->当同步的任务彻底完成后,开始看之前设置的定时器是否到时间,到时间的给予执行
//=>如果有很多的定时器都到时间了,会把最先到达时间的先执行(因为在设置定时器的时候,浏览器会把计时最短的定时器排在队列的前面)
// setTimeout(function () {
//     console.log(1);//->第二次
// }, 100);
//
// setTimeout(function () {
//     console.log(2);//->第一次
//     for (var i = 0; i < 100000000; i++) {}
// }, 0);
//
// var st = new Date();
// for (var i = 0; i < 100000000; i++) {}
// console.log(new Date() - st);// >=300MS
//
// setTimeout(function () {
//     console.log(3);//->第三次
// }, 10);


// setTimeout(function () {
//     console.log(1);//->第三次
// }, 100);
//
// setTimeout(function () {
//     console.log(2);//->第一次
// }, 0);
//
// setTimeout(function () {
//     console.log(3);//->第二次
// }, 10);
//
// var st = new Date();
// for (var i = 0; i < 100000000; i++) {}
// console.log(new Date() - st);// >=300MS


//-------------------------------
//=>所有的事件绑定都是异步编程
// var n = 12;
// document.body.onclick = function () {
//     console.log(++n); //->点击的时候才输出13
// };
// console.log(n);//->12

// var oImg = new Image;
// oImg.src = 'http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png';
// oImg.onload = function () {
//     console.log('OK');//->第二次
// };
// console.log('NO');//->第一次

// var oImg = new Image;
// oImg.src = 'http://img3.imgtn.bdimg.com/it/u=2280528661,1869298878&fm=214&gp=0.jpg';
// oImg.onload = function () {
//     console.log('图片加载成功');
// };
// oImg.onerror = function () {
//     console.log('图片加载失败');
// };
// console.log('当前图片加载中，客官请稍等~~');

//------------------------------------
//=>AJAX中我们可以开启异步编程
// var xhr = new XMLHttpRequest;
// xhr.open('GET', '地址', false);//->FALSE:同步 TRUE:或者不写都是异步