function Drag(curEle) {
    // 当前类中的this还是指向 实例  把当前的元素对象放在当前实例的一个属性上
    this.ele = curEle;
    this.DOWN = this.down.bind(this);
    on(this.ele,"mousedown",this.DOWN)
}
Drag.prototype.down = function (e) {
    this.ele.x = e.clientX;
    this.ele.y = e.clientY;
    this.ele.mx = this.ele.offsetLeft;
    this.ele.my = this.ele.offsetTop;
    this.MOVE = this.move.bind(this)
    this.UP = this.up.bind(this);
    on(document,"mousemove",this.MOVE)
    on(document,"mouseup",this.UP)
};
Drag.prototype.move = function (e) {
    var changeL = e.clientX - this.ele.x;
    var changeT = e.clientY - this.ele.y;
    this.ele.style.left = this.ele.mx + changeL + "px";
    this.ele.style.top = this.ele.my + changeT + "px";
};
Drag.prototype.up = function (e) {
    off(document,"mousemove",this.MOVE);
    off(document,"mouseup",this.UP)
}
