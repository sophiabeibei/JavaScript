var minL = 0,
    maxL = utils.win('clientWidth') - box.offsetWidth;

toRight();
function toRight() {
    box.timer = window.setInterval(function () {
        var curL = utils.css(box, 'left');
        if (curL + 10 >= maxL) {
            utils.css(box, 'left', maxL);
            window.clearInterval(box.timer);

            //->向左走
            toLeft();
            return;
        }
        curL += 10;
        utils.css(box, 'left', curL);
    }, 17);
}


function toLeft() {
    box.timer = window.setInterval(function () {
        var curL = utils.css(box, 'left');
        if (curL - 10 <= minL) {
            utils.css(box, 'left', minL);
            window.clearInterval(box.timer);

            //->向右走
            toRight();
            return;
        }
        curL -= 10;
        utils.css(box, 'left', curL);
    }, 17);
}