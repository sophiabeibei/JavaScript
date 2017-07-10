var oBox = document.getElementById('box'),
    minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

function down(e) {
    //this->oBox
    this['strX'] = e.clientX;
    this['strY'] = e.clientY;
    this['strL'] = this.offsetLeft;
    this['strT'] = this.offsetTop;//->JS盒子模型中提供的属性,获取的结果是不带小数的,它会自己进行四舍五入

    this['MOVE'] = bind(move, this);
    this['UP'] = bind(up, this);
    on(document, 'mousemove', this['MOVE']);//->绑定给文档对象主要处理的是：鼠标移动过快,鼠标焦点和当前元素分离丢失的BUG(所有的浏览器都可以这样处理)
    on(document, 'mouseup', this['UP']);
}

function move(e) {
    //this->oBox
    var curL = e.clientX - this['strX'] + this['strL'],
        curT = e.clientY - this['strY'] + this['strT'];
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + 'px';
    this.style.top = curT + 'px';
}

function up(e) {
    off(document, 'mousemove', this['MOVE']);
    off(document, 'mouseup', this['UP']);
}

on(oBox, 'mousedown', down);