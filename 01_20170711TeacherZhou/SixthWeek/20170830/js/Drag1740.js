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
//
// };
// box.onmouseup = function (e) {
//     e = e || window.event;
//
// };


// ----------------------------------------------------
var box = document.getElementById("box");
function down(e) {
    //->记录鼠标的位置
    this.x = e.pageX;
    this.y = e.pageY;
    console.log(this.x, this.y);

    //->盒子的上偏移量,左偏移量
    this.mx = box.offsetLeft;
    this.my = box.offsetTop;
    console.log(this.mx, this.my);

    //->绑定鼠标移动和起来的方法
    this.onmousemove = move;
    this.onmouseup = up;

    //->处理鼠标丢失的问题
    if(this.setCapture){}
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

}


box.onmousedown = down;


//本文件,鼠标可以移动,但鼠标会丢失/粘手;