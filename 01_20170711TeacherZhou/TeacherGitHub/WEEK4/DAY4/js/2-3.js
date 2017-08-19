var minL = 0,
    maxL = utils.win('clientWidth') - box.offsetWidth;
function move() {
    //->每一次执行方法之前都把上一次没用的定时器清除掉(优化内存)
    window.clearTimeout(box.timer);

    var curL = utils.css(box, 'left');
    if (curL + 10 >= maxL) {
        utils.css(box, 'left', maxL);
        return;
    }
    curL += 10;
    utils.css(box, 'left', curL);

    //->方法执行完成后都会重新的设置一个定时器,让其17MS后重新执行这个方法(递归思想)
    box.timer = window.setTimeout(move, 17);
}
move();


// var n = 0;
// window.setInterval(function () {
//     for (var i = 0; i < 1000000000; i++) {
//
//     }
//     console.log(++n);
// }, 10);

// var n = 0,
//     timer = null;
// function fn() {
//     window.clearTimeout(timer);
//
//     for (var i = 0; i < 100000; i++) {
//         if (i === (100000 - 1)) {
//             console.log('ok');
//         }
//     }
//     console.log(++n);
//
//     timer = window.setTimeout(fn, 10);
// }
// fn();









