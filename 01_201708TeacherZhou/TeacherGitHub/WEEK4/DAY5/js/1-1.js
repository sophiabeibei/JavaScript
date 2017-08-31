// zhufengAnimate({
//     curEle: box,
//     target: {
//         top: 300,
//         left: 1000,
//         width: 150,
//         height: 150
//     },
//     effect: zhufengEffect.Bounce.easeOut,
//     duration: 500
// });


//=>当动画完成的时候：让当前元素的背景颜色变为PINK，让其透明度变为0.5，....
zhufengAnimate({
    curEle: box,
    target: {
        top: 300,
        left: 1000,
        width: 150,
        height: 150
    },
    effect: zhufengEffect.Bounce.easeOut,
    duration: 500,
    callBack: function () {
        //->把我们需要在动画完成处理的事情都放在这个函数中,在动画库中,动画完成后只需要把传递的这个回调函数执行即可
        //->this:box
        utils.css(this, {
            background: 'green',
            opacity: 0.5
        });
    }
});













