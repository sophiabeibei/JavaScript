function getSpeed() {
    if(!this.prevPosi){
//            this.flySpeed =1;
        this.prevPosi = this.offsetLeft;
    }else{
        this.flySpeed = this.offsetLeft - this.prevPosi;
        this.prevPosi = this.offsetLeft;
    }
}
// 自由落体 垂直方向的速度
function drop() {
    if(!this.dropSpeed){
        this.dropSpeed =2;
    }else{
        // 速度是像素
        this.dropSpeed+=9.8;
        // drop 10次  100
        //90.2
        clearTimeout(this.dropTimer)
    };
    this.dropSpeed*=0.98;
    var curPosi = this.offsetTop + this.dropSpeed;
    var maxBottom = (document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(curPosi >= maxBottom){
        this.style.top = maxBottom+"px";
        this.dropSpeed *= -1;
        this.flag ++;
    }else{
        this.style.top = curPosi+"px";
        this.flag =0;
    }
    if(this.flag<2){
        this.dropTimer = setTimeout(handThis(this,drop),18)
    }
}
// 水平方向动画
function fly() {
    clearTimeout(this.flyTimer);
    var maxRight = (document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    this.flySpeed*=0.98;
    var curPosi= this.offsetLeft + this.flySpeed;
    if(curPosi >= maxRight){
        this.style.left = maxRight+"px";
        this.flySpeed *= -1;
    }else if(curPosi<=0){
        this.style.left = 0+"px";
        this.flySpeed *= -1;
    }else{
        this.style.left = curPosi+ "px";
    }
    if(Math.abs(this.flySpeed)>0.5){
        this.flyTimer = setTimeout(handThis(this,fly),18)
    }
}

function handThis(obj,fn){
    return function () {
        fn.call(obj)
    }
}

