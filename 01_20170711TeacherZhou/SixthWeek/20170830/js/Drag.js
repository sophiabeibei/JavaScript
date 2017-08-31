// var box = document.getElementById("box");
// box.onmousedown = function (e) {
//     e = e || window.event;
//     target = e.target || e.srcElement;
//     e.preventDefault = function () {
//         e.returnValue = false;
//     };
//     e.stopPropagation = function () {
//         e.cancelBubble = true;
//     }
// };
// box.onmouseup = function (e) {
//     e = e || window.event;
// };


// ----------------------------------------------------
var box = document.getElementById("box");
var outer = document.getElementById("outer");
function down(e) {
    //->记录鼠标的位置
    this.x = e.pageX;
    this.y = e.pageY;
    //console.log(this.x, this.y);

    //->盒子的上偏移量,左偏移量
    this.mx = this.offsetLeft;
    this.my = this.offsetTop;
    //console.log(this.mx, this.my);


    //->处理鼠标丢失的问题
    if(this.setCapture){
        //->setCapture: 处理鼠标丢失的问题(不兼容)这是IE和火狐提供的方法
        this.setCapture();

        //->绑定鼠标移动和松开时的方法
        this.onmousemove = move;
        this.onmouseup = up;
    }else{
        //->处理setCapture的兼容问题(google)
        //利用事件委托原理,给document绑定onmousemove方法,因为鼠标永远不会脱离document
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
    //->鼠标横向的位置 / 纵向移动的距离
    //目标位置 - 原始位置 = 移动的距离(鼠标变化的距离)
    var changeL = e.pageX - this.x,
        changeT = e.pageY - this.y;

    //->盒子当前最新的位置(box的left,top值)
    this.style.left = this.mx + changeL + "px";
    this.style.top = this.my + changeT + "px";
}

function up(e) {
    //->google下移除document上的onmousemove事件上的方法
    //->解决粘手的问题

    //->解绑: 把鼠标和盒子分开
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


//本文件,处理了鼠标丢失问题;   ----裸码文件Drag1800