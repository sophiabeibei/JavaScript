function down(e) {
    this.style.zIndex = 100;
    // this -->oBox;
    e = e || window.event;
    // 记录盒子的位置
    this.x= this.offsetLeft;
    this.y = this.offsetTop;
    // 记录鼠标的位置
    this.mx = e.pageX;
    this.my = e.pageY;
    // 在IE和火狐下,解决粘连鼠标问题;
    if(this.setCapture){
        this.setCapture();
        this.onmousemove = move;
        this.onmouseup = up;
    }else{
        var _this = this;
        this.MOVE = function (e) {
            move.call(_this,e);
        };
        this.UP = function (e) {
            up.call(_this,e)
        };
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
}
function move(e) {
    e = e || window.event;
    var changeX = e.pageX - this.mx;
    var changeY = e.pageY - this.my;
    this.style.left = this.x + changeX+ "px";
    this.style.top = this.y + changeY + "px";
    //move 方法执行好多次，move最后一次执行的位置减去上一次盒子的位置，这是单位时间内移动的距离，咱们称作“速度”
//        this.prevPosi = this.offsetLeft;
    selfrun.call(this,"selfDragging");
}
function up() {
    this.style.zIndex = 0;
    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove = null;
        this.onmouseup = null;
    }else{
        document.onmousemove = null;
        document.onmouseup = null;
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP)
    }
    //发布 通知
    selfrun.call(this,"selfDragstart")
    //让fly drop 执行;
}
function handThis(obj, fn) {
    return function (e) {
        fn.call(obj,e);
    }
}






