//-------两个关键词: 总时间1000ms   匀速
//总时间
//总距离
//目前所在的位置(34ms的位置) = 34ms/总时间1000ms
//走过的距离 = 34ms/总时间1000ms * 总距离
//剩余的距离 = 34ms/总时间1000ms * 总距离 + 起始位置


//=>总时间1000ms                       D
//=>起始位置                           B
//=>总距离: 目标位置-起始位置            C
//=>已经走的时间                        T

//=>限定时间的匀速动画: 就是随时获取到当前元素的位置即可,让元素运动到这个位置,一直到总时间结束,就完成了动画;
//->T/D: 已经走过的时间占总时间的百分比(我们已经走过百分之多少了);
//->T/D*C: 已经走过的百分比乘以总距离= 已经走过的具体距离(走过的距离);
//->T/D*C+B: 已经走过的距离+起始位置=当前的位置(当前我们应该所在的位置;)


//------------------------------------匀速动画公式
/**
 * 匀速动画公式: 获取当前元素应有的位置
 * @param t time: 已经走过的时间
 * @param b begin: 当前元素起始位置
 * @param c change: 要运动的总距离
 * @param d duration: 动画的总时间
 * @constructor
 */
function Linear(t, b, c, d) {
    return t / d * c + b;
}

//----------------------------------------实现要实现的运动效果
var time = 0,
    begin = utils.css(box, "left"),
    target = utils.win("clientWidth") - box.offsetWidth,
    change = target - begin,
    duration = 5000;
box.timer = window.setInterval(function () {
    time += 17;
    //->当到达总时间的时候,结束动画
    if (time >= duration) {
        utils.css(box, "left", target);
        window.clearInterval(box.timer);
        return;
    }

    //->获取当前元素的位置
    var curL = Linear(time, begin, change, duration);
    utils.css(box, "left", curL);
}, 17);

