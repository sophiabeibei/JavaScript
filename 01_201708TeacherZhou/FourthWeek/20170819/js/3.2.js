
//------------------------------------匀速动画公式
/**
 *
 * @param t time: 已经走过的时间
 * @param b begin: 当前元素起始位置
 * @param c change: 要运动的总距离
 * @param d duration: 动画的总时间
 * @constructor 匀速动画公式: 获取当前元素应有的位置
 */
function Linear(t, b, c, d) {
    return t / d * c + b;
}

//----------------------------------------实现要实现的运动效果
//->目标值
var targetLeft = utils.win("clientWidth")-box.offsetWidth,
    targetTop = utils.win("clientHeight")-box.offsetHeight;
var time = 0,
    duration = 5000;
var beginLeft = utils.css(box,"left"),
    beginTop = utils.css(box,"top");
var changeLeft = targetLeft-beginLeft,
    changeTop = targetTop-beginTop;
box.timer = window.setInterval(function () {
    time += 17;
    //->当到达总时间的时候,结束动画
    if (time >= duration) {
        utils.css(box, {
            top: targetTop,
            left: targetLeft
        });
        window.clearInterval(box.timer);
        return;
    }

    //->获取当前元素的位置
    var curL = Linear(time, beginLeft, changeLeft, duration),
        curT = Linear(time,beginTop,changeTop,duration);
    utils.css(box, {
        top: curT,
        left: curL
    });
}, 17);