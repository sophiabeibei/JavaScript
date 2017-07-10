/**
 * Created by Administrator on 2017/6/21.
 */
function getSpeed(){
    if(!this.prevPosi){
        this.prevPosi = this.offsetLeft;
    }else{
        this.speed = this.offsetLeft-this.prevPosi;
        this.prevPosi = this.offsetLeft;
    }
}
function  clearTimer() {
    window.clearTimeout(this.flytimer);
    window.clearTimeout(this.droptimer);
    this.speed = null;
    this.dropSpeed = null;
}
function fly() {
    // debugger
    // this.speed
    var maxRight = document.documentElement.clientWidth || document.body.clientWidth - this.offsetWidth;
    if(this.offsetLeft + this.speed>maxRight){
        this.style.left = maxRight + "px";
        this.speed *= -1;
    }else if(this.offsetLeft + this.speed <= 0){
        this.style.left = 0 + "px";
        this.speed*=-1;
    }else{
        this.style.left = this.offsetLeft + this.speed + "px";
    }
    this.speed *= 0.97;
    if(Math.abs(this.speed)>=0.5){
        this.flytimer = setTimeout(handThis(this,fly),15)
    }
}
function drop() {
    //速度 加速度，初始值速度为0；
//        dropSpeed +=9.8;
    // 衰减数；
    // 条件判断，运动到最底端  没有在最底端
    // 先对垂直方向的速度进行初始化
    if(!this.dropSpeed){
        this.dropSpeed = 9;
        this.flag =0;
    }else{
        this.dropSpeed += 9.8;
    }
    this.dropSpeed *= 0.97;

    var maxBottom = (document.documentElement.clientHeight || document.body.clientHeight) -this.offsetHeight;
    // 盒子运动到页面的最底端
    if(this.offsetTop + this.dropSpeed>=maxBottom){
        // 这里面代码连续走两次，说明当前盒子已经到底部了
        this.dropSpeed *= -1;
        this.style.top = maxBottom + "px";
        this.flag ++;
    }else{
        this.style.top = this.offsetTop + this.dropSpeed + "px";
        this.flag =0;
    }
    if(this.flag < 2){
        this.droptimer=window.setTimeout(handThis(this,drop),18)
    }
}
