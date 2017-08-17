var container = utils.byClass('container')[0],
    wrapper = utils.byClass('wrapper', container)[0],
    tip = utils.byClass('tip', container)[0],
    tipList = utils.children(tip),
    btnLeft = utils.byClass('btnLeft', container)[0],
    btnRight = utils.byClass('btnRight', container)[0];

//->实现自动轮播
var step = 0,//->步长:当前需要展示这张图片对应的索引
    total = 4,//->总数:记录当前有几张真实的图片
    autoTimer = null,//->定时器标识:自动轮播的定时器
    autoInterval = 3000;//->时间因子:多长时间自动轮播一次
function autoMove() {
    autoTimer = setInterval(moveRight, autoInterval);
}
function moveRight() {
    step++;
    if (step > total) {
        utils.css(wrapper, 'left', 0);
        step = 1;
    }
    zhufengAnimate(wrapper, {left: -step * 1000}, 500);
    selectTip();
}
autoMove();

//->鼠标进入和离开控制自动轮播
container.onmouseenter = function () {
    window.clearInterval(autoTimer);
};
container.onmouseleave = autoMove;

//->实现焦点对齐和焦点切换
function selectTip() {
    var tempStep = step;
    tempStep > (total - 1) ? tempStep = 0 : null;
    for (var i = 0; i < tipList.length; i++) {
        var curTip = tipList[i];
        i === tempStep ? utils.addClass(curTip, 'bg') : utils.removeClass(curTip, 'bg');
    }
}

~function tipClick() {
    for (var i = 0; i < tipList.length; i++) {
        var curTip = tipList[i];
        curTip['data-index'] = i;
        curTip.onclick = function () {
            step = this['data-index'];
            zhufengAnimate(wrapper, {left: -step * 1000}, 500);
            selectTip();
        }
    }
}();

//->实现左右切换
btnRight.onclick = moveRight;
btnLeft.onclick = function () {
    step--;
    if (step < 0) {
        utils.css(wrapper, 'left', -total * 1000);
        step = total - 1;
    }
    zhufengAnimate(wrapper, {left: -step * 1000}, 500);
    selectTip();
};
