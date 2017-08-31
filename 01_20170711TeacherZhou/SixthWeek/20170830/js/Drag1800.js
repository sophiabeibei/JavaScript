// -------------------------------------------------裸码
var box = document.getElementById("box");
var outer = document.getElementById("outer");
function down(e) {
    this.x = e.pageX;
    this.y = e.pageY;
    this.mx = this.offsetLeft;
    this.my = this.offsetTop;
    if(this.setCapture){
        this.setCapture();
        this.onmousemove = move;
        this.onmouseup = up;
    }else{
        var _this = this;
        document.onmousemove = function (e) {
            move.call(_this,e);
        };
        document.onmouseup = function (e) {
            up.call(_this,e);
        };
    }
}
function move(e) {
    var changeL = e.pageX - this.x,
        changeT = e.pageY - this.y;
    this.style.left = this.mx + changeL + "px";
    this.style.top = this.my + changeT + "px";

}

function up(e) {
    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove = null;
    }else{
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
box.onmousedown = down;
outer.onmousedown = down;



//=>鼠标按下盒子的方法

//计算鼠标的左位置
//计算鼠标的上位置

//计算盒子的左位置
//计算盒子的上位置

//绑定鼠标移动的方法
//绑定鼠标松开时的方法

//解决鼠标移动之后松开鼠标时的粘手问题
//使用setCapture解决鼠标移动时鼠标与盒子的丢失问题;

//处理setCapture的google的兼容问题;


//=>鼠标移动盒子的方法
//计算鼠标移动的左距离
//计算鼠标移动的上距离

//计算盒子移动后的最新位置左
//计算盒子移动后的最新位置上

//=>鼠标离开盒子的方法
//鼠标离开时解决粘手的问题


//本文件,处理了鼠标丢失问题