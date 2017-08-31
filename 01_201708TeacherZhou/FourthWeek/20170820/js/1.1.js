//->当动画完成,调用callBack
// animate({
//     curEle: box,
//     target: {
//         top: 300,
//         left: 1000,
//         width: 150,
//         height: 150
//     },
//     effect: animationEffect.Bounce.easeOut,
//     duration: 5000,
// });




//=>当动画完成的时候,让当前元素的背景颜色,变为pink;让其透明度变为0.5....
animate({
    curEle: box,
    target: {
        top: 300,
        left: 1000,
        width: 150,
        height: 150
    },
    effect: animationEffect.Bounce.easeOut,
    duration: 5000,
    callBack: function () {
        //->把我们需要在动画完成处理的事情都放在这个函数中,在动画库中,动画完成后只需要把传递的这个回调函数执行即可;
        //->this: box
        utils.css(this,{
            background: "green",
            opacity: 0.5
        });
    }
});

