var oBox = document.getElementById('box'),
    minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

function down(e) {
    this['strX'] = e.clientX;
    this['strY'] = e.clientY;
    this['strL'] = this.offsetLeft;
    this['strT'] = this.offsetTop;
    this['MOVE'] = bind(move, this);
    this['UP'] = bind(up, this);
    on(document, 'mousemove', this['MOVE']);
    on(document, 'mouseup', this['UP']);

    //->END MOVE
    window.clearInterval(this.flyTimer);
    window.clearInterval(this.dropTimer);
}

function move(e) {
    var curL = e.clientX - this['strX'] + this['strL'],
        curT = e.clientY - this['strY'] + this['strT'];
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + 'px';
    this.style.top = curT + 'px';

    //->computed fly speed
    // this['pre'] = null;
    // this['speedFly'] = null;
    if (this['pre']) {
        this['speedFly'] = this.offsetLeft - this['pre'];
        this['pre'] = this.offsetLeft;
    } else {
        this['pre'] = this.offsetLeft;
        this['speedFly'] = this.offsetLeft;
    }
}

function up(e) {
    //this->oBox
    off(document, 'mousemove', this['MOVE']);
    off(document, 'mouseup', this['UP']);

    //->BEGIN MOVE
    fly.call(this);
    drop.call(this);
}

//->I CAN FLY
function fly() {
    //this->oBox
    var _this = this,
        speedFly = this['speedFly'];
    this.flyTimer = window.setInterval(function () {
        //->什么时候结束：当我们的速度小于0.5的时候结束(OFFSET LEFT获取的结果是四舍五入的,加上一个小于0.5的值,对最后的结果不会起到太大作用了->盒子已经不动了)
        if (Math.abs(speedFly) < 0.5) {
            window.clearInterval(_this.flyTimer);
            return;
        }

        speedFly *= 0.98;//->速度的指数衰减:速度会越来越慢
        var curL = _this.offsetLeft + speedFly;
        if (curL >= maxL) {
            speedFly *= -1;
            curL = maxL;
        } else if (curL <= minL) {
            speedFly *= -1;
            curL = minL;
        }
        _this.style.left = curL + 'px';
    }, 17);
}

//->I CAN DROP
function drop() {
    var _this = this,
        speedDrop = 9.8,
        dropFlag = 0;//->到达底边加1,弹起来或者在空中运动都为0,只要这个值大于1,说明弹不起来的,我们清除动画即可
    _this.dropTimer = window.setInterval(function () {
        if (dropFlag > 1) {
            window.clearInterval(_this.dropTimer);
            return;
        }
        speedDrop += 9.8;
        speedDrop *= .98;
        var curT = _this.offsetTop + speedDrop;
        if (curT >= maxT) {
            curT = maxT;
            speedDrop *= -1;
            dropFlag++;
        } else {
            dropFlag = 0;
        }
        _this.style.top = curT + 'px';
    }, 17);
}

var boxList = document.getElementsByClassName('box');
for (var i = 0; i < boxList.length; i++) {
    on(boxList[i], 'mousedown', down);
}