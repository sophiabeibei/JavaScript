// //---------------------------------------------------用setTimeout 实现动画
// var box = document.getElementById("box");
// var minL = 0,
//     maxL = utils.win("clientWidth")-box.offsetWidth;
// function move() {
//     //->每一次执行方法之前都把上一次没用的定时器清除掉(性能优化)
//     var curL = utils.css(box,"left");
//     if(curL>=maxL){
//         utils.css(box,"left",maxL);
//         window.clearInterval(box.timer);
//         return;
//     }
//     curL+=10;
//     utils.css(box,"left",curL);
//     //->方法执行完成后都会重新的设置一个定时器,让其17ms后重新执行这个方法(递归思想)
//     box.timer = window.setTimeout(move,17);
// }
// move();
//
// // 这个是用 setTimeout 实现需求的案例








// //---------------------------------------------------什么时候用 setTimeout ?????
// //->这个会导致浏览器崩溃,所以要用到 setTimeout 去实现
// var n = 0;
// window.setInterval(function () {
//     for (var i = 0; i < 1000000000; i++) {
//         console.log("ok");
//     }
//     console.log(++n);
// },10);



// //---------------------------------------------------用 setTimeout 去实现不会致使浏览器崩溃(这种方法很少有人用了)
// var n = 0,
//     timer = null;
// function fn() {
//     for (var i = 0; i < 1000000000; i++) {
//         if(i===(1000000000-1)){
//             console.log("ok");
//         }
//     }
//     console.log(++n);
//     timer = window.setTimeout(fn,10);
// }
// fn();


// 这个是用 setTimeout 实现需求的案例

