Drag.prototype.down = function (e) {
    e = e || window.event;
    console.log(this);
    //当down的时候,记录盒子当前的位置:
    this.ele.x = e.clientX;
    this.ele.y = e.clientY;
    this.ele.mx = this.ele.offsetLeft;
    this.ele.my = this.ele.offsetTop;
    this.MOVE = this.move.bind(this);
    this.UP = this.up.bind(this);
    on(document,"mousemove",this.MOVE);
    on(document,"mouseup",this.UP);
};
Drag.prototype.move = function (e) {
    e = e || window.event;
    //在down方法中同时绑定move方法;
    var changeL = e.clientX - this.ele.x;
    var changeT = e.clientY - this.ele.y;
    this.ele.style.left = this.ele.mx + changeL + 'px';
    this.ele.style.top = this.ele.my + changeT + 'px';
};
Drag.prototype.up = function (e) {
    e = e || window.event;
    //在down的时候绑定up方法
    off(document,"mousemove",this.move);
    off(document,"mouseup",this.up);
};

new Drag(box);
new Drag(box1);
new Drag(box2);