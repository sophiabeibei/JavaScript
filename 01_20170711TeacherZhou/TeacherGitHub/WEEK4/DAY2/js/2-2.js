//[时间固定的匀速动画]-------------
//->t:time 当前已经走的时间
//->b:begin 起始的位置
//->c:change 总距离
//->d:duration 总时间

//=>计算出当前元素的位置
function linear(t, b, c, d) {
    return t / d * c + b;
}

var begin = utils.css(box, 'left'),
    target = utils.win('clientWidth') - box.offsetWidth,
    change = target - begin,
    duration = 500;
var time = 0;
box.timer = setInterval(function () {
    time += 17;
    if (time >= duration) {//->已经走的时间大于等于总时间,我们应该结束动画
        utils.css(box, 'left', target);
        clearInterval(box.timer);
        return;
    }
    var curL = linear(time, begin, change, duration);
    utils.css(box, 'left', curL);
}, 17);
