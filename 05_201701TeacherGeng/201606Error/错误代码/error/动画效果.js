function getSpeed(e){
    if(this.prevPosi){
        this.speed= e.pageX-this.prevPosi
        this.prevPosi=e.pageX
    }else{
        this.prevPosi=e.pageX
    }
}
function clearEffect(){
    clearTimeout(this.flyTimer)
    clearTimeout(this.dropTimer)
}
function fly(){
    this.speed*=0.98;
    var maxW = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth;
    var  current=this.offsetLeft+this.speed;
    if(current>=maxW){
        this.style.left=maxW+'px';
        this.speed*=-1;
    }else if(current<=0){
        this.style.left=0;
        this.speed*=-1;}
    else{
        this.style.left=current+'px'
    }
    this.style.left=current+this.speed+'px';
    this.flyTimer=window.setTimeout(processThis(fly,this),25);
}
function drop(){
    if(this.dropSpeed){
        this.dropSpeed+=9.8
    }else{
        this.dropSpeed=9.8
    }
    this.dropSpeed*=0.98
    var maxBottom = (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight;
    var current=this.offsetTop+this.dropSpeed
    if(current>=maxBottom){
        this.style.top=maxBottom+'px';
        this.dropSpeed*=-1
        this.flag++
    }
    else{
        this.style.top=current+'px'
        this.flag=0
    }
    if(this.flag<2){
        this.dropTimer= window.setTimeout(processThis(drop,this),25);
    }
}
