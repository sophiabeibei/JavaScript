function clearEffect(){
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);
}
function getSpeed(){
    if(this.prevPosi){
        this.speed= e.speed-this.prevPosi;
        this.prevPosi= e.pageX;
    }else{
        this.prevPosi= e.pageX;
    }
}
function fly(){
    this.speed*=.98;
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    var current=this.speed+this.offsetLeft;
    if(current<=0){
        this.style.left=0;
        this.speed*=-1;
    }else if(current>=maxRight){
        this.style.left=maxRight+'px';
        this.speed*=-1;
    }else{
        this.style.left=current+'px';
    }
    if(Math.abs(this.speed)>=5){
        this.flyTimer=window.setTimeout(processThis(fly,this),20)
    }
}
function drop(){
    if(this.dropSpeed){
        this.dropSpeed_=9;
    }else{
        this.deopSpeed=9;
    }
    this.dropSpeed*=.97;
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    var current=this.deopSpeed+this.offsetTop;
    if(current>=maxBottom){
        this.style.top=maxBottom+'px';
        this.dropSpeed*=-1;
        this.flag++;
    }else{
        this.style.left=current+'px';
        this.flag=0;
    }
    this.dropTimer=window.setTimeout(processThis(drop,this),20)
}