function drop() {
    //1.没有垂直方向速度，给一个速度1 有一个加速度
    //2.设置当前盒子的位置  offsetTop
    // 3.当运动浏览器底部的时候，速度反向 *= -1；
    // 4.定时器让drop执行
//        dropSpeed += 9;// px

    if(!this.dropSpeed){
        this.dropSpeed =9;// 给盒子一个初速度
    }else{
        this.dropSpeed +=9.8;
        window.clearTimeout(this.dropTimer);
    }
    // -80.2
    this.dropSpeed *= 0.98;
    var curPosi = this.offsetTop + this.dropSpeed;
    var maxT = (document.documentElement.clientHeight||document.body.clientHeight) -this.offsetHeight;
    if(curPosi >= maxT){
        this.style.top =maxT + "px";
        this.dropSpeed *= -1; //-90
//            console.log(1);
        this.flag ++;
    }else{
        this.style.top =curPosi + "px";
        this.flag = 0;
    }
    if(this.flag <2){
        this.dropTimer =window.setTimeout(handThis(this,drop),18);
    }

}
// move 方法是每隔一段时间执行；那么盒子最后一次执行move的盒子运动的距离，表示了当前盒子运动快慢，抽象定义这个值就是盒子的“速度”；

// 横向动画
function fly() {
    window.clearTimeout(this.flyTimer);
    var maxRight = (document.documentElement.clientWidth|| document.body.clientWidth)-this.offsetWidth;
    var curPosi = this.offsetLeft + this.flySpeed;
    this.flySpeed *= 0.97;
    if(curPosi >= maxRight){
        this.style.left = maxRight + "px";
        this.flySpeed *=-1;
    }else if(curPosi <=0){
        this.style.left = 0 + "px";
        this.flySpeed *= -1;
    }else{
        this.style.left = curPosi + "px";
    }
    if(Math.abs(this.flySpeed)>0.5){
        this.flyTimer = window.setTimeout(handThis(this,fly),18);
    }
}
function getSpeed() {
    // this.当前盒子
    if(!this.prevPosi){
        this.prevPosi = this.offsetLeft;
    }else{
        this.flySpeed = this.offsetLeft-this.prevPosi;
        this.prevPosi = this.offsetLeft;
    }
}
// 改变this关键字的方法  把fn中的this改变成obj
function handThis(obj,fn){
    return function () {
        fn.call(obj)
    }
}
