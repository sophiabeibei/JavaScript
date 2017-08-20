//=>总时间1000MS   D
//=>起始位置       B
//=>总距离：目标位置-起始位置    C
//=>已经走的时间   T

//=>限定时间的匀速动画：就是随时获取到当前元素的位置即可，让元素运动到这个位置，一直到总时间结束，就完成了动画
//-> T/D：已经走过的时间占总时间的百分比(我们已经走过百分之多少了)
//-> T/D*C：已经走过的百分比乘以总距离=已经走过的具体距离(我们已经走了多远)
//-> T/D*C+B：已经走过的距离+起始的位置=当前的位置(当前我们应该在哪)

//--------------------------
//->匀速动画公式：获取当前元素应有的位置
//->t:time 已经走过的时间
//->b:begin 当前元素起始位置
//->c:change 要运动的总距离
//->d:duration 动画的总时间
function Linear(t, b, c, d) {
    return t / d * c + b;
}

//-------------------------
var time = 0,
    begin = utils.css(box, 'left'),
    target = utils.win('clientWidth') - box.offsetWidth,
    change = target - begin,
    duration = 500;
box.timer = window.setInterval(function () {
    time += 17;
    //->当到达总时间的时候,结束动画
    if (time >= duration) {
        utils.css(box, 'left', target);
        window.clearInterval(box.timer);
        return;
    }
    //->获取当前元素的位置,并且让元素运动到这个位置
    var curL = Linear(time, begin, change, duration);
    utils.css(box, 'left', curL);
}, 17);

















