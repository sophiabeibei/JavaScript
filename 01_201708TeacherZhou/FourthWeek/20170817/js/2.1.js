// animate(box,{
//     top: 300,
//     left: 500,
//     width: 200,
//     height: 200,
//     opacity: 0.5
// },animationEffect.Back.easeOut);


//-------------2.对象统一处理参数
// animate({
//     target: {
//         top: 300,
//         left: 500,
//         width: 200,
//         height: 200,
//         opacity: 0.5
//     },
//     curEle: box
// });


//--------可以不按照顺序传值;
animate({
    curEle: box,
    target: {
        top: 300,
        left: 500,
        width: 200,
        height: 200,
        opacity: 0.5
    },
    effect: animationEffect.Back.easeOut,
    callBack: function () {
        //->动画完成之后做的事情在这里写
        //->this: 当前操作的元素
        utils.css(this, "background", "pink")
    },
    duration: 500
});


