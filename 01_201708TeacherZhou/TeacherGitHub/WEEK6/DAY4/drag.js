function down(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.mx = this.offsetLeft;
    this.my = this.offsetTop;
    if(this.setCapture){
        this.setCapture();
        this.onmousemove = move;
        this.onmouseup = up;
    }else{
        var _this = this;
        //利用事件委托的原理，给最外层document绑定onmousemove
        document.onmousemove = function (e) {
            move.call(_this,e)
        };
        document.onmouseup = function (e) {
            up.call(_this,e)
        };
    }
}
// 获取鼠标当前最新的位置
function move(e) {
    var  changeL = e.clientX -this.x;
    var changeT = e.clientY -this.y;
    var maxL = (document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    var maxT = (document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(this.mx+changeL>maxL){
        this.style.left = maxL + "px";
    }else  if(this.my + changeT >maxT){
        this.style.top = maxT + "px";
    }else{
        this.style.left = this.mx + changeL + "px";
        this.style.top = this.my + changeT + "px";
    }
    selfrun.call(this,"selfDragStart");
}
// 当鼠标抬起，移出onmousemove事件的move和onmouseup的up方法
function up() {
    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove = null;
        this.onmouseup = null;
    }else{
        document.onmousemove = null;
        document.onmouseup = null;
    }
    selfrun.call(this,"selfDragStarting");
}
