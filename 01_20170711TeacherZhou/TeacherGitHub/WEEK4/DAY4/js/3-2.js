function Linear(t, b, c, d) {
    return t / d * c + b;
}

//->目标值：
var targetLeft = utils.win('clientWidth') - box.offsetWidth,
    targetTop = utils.win('clientHeight') - box.offsetHeight;

var time = 0,
    duration = 1000;
var beginLeft = utils.css(box, 'left'),
    beginTop = utils.css(box, 'top');
var changeLeft = targetLeft - beginLeft,
    changeTop = targetTop - beginTop;
box.timer = setInterval(function () {
    time += 17;
    if (time >= duration) {
        utils.css(box, {
            top: targetTop,
            left: targetLeft
        });
        clearInterval(box.timer);
        return;
    }
    var curLeft = Linear(time, beginLeft, changeLeft, duration),
        curTop = Linear(time, beginTop, changeTop, duration);
    utils.css(box, {
        top: curTop,
        left: curLeft
    });
}, 17);

