function down(e) {
    // 记录盒子的初始位置
    e = e || window.event;
    this.x = e.pageX;
    this.y = e.pageY;
    this.mx = this.offsetLeft;
    this.my = this.offsetTop;
    if(this.setCapture){
        this.setCapture();
        this.onmousemove  = move;
        this.onmouseup = up;
    }else{
        //谷歌:利用事件委托给document。绑定onmousemove,因为鼠标永远不能脱离document；
        var _this = this;
        document.onmousemove = function (e) {
//                console.log(e)
            move.call(_this,e)
        };
        document.onmouseup = function (e) {
            up.call(_this,e)
        };
    }
}

//
function move(e) {
//        console.log(e);
    // 计算出鼠标横向纵向移动距离
    var changeL = e.pageX-this.x;
    var changeT = e.pageY - this.y;
    var maxRight = (document.documentElement.clientWidth|| document.body.clientWidth)-this.offsetWidth;
    if(this.mx + changeL>maxRight){
        this.style.left = maxRight + "px";
    }else if(this.mx + changeL<0){
        this.style.left = 0 + "px";
    }else{
        this.style.left = this.mx + changeL + "px";
        this.style.top = this.my +changeT + "px";
    }
    selfrun.call(this,"selfDragStart");
}
function up() {
    // 谷歌下移出document上的onmousemove事件方法

    //解绑：把鼠标和盒子分开
    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove = null;
    }else{
        document.onmousemove = null;
        document.onmouseup = null;
    }
    selfrun.call(this,"selfDragStarting")
}

