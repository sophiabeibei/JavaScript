/**
 * Created by Crazy on 2016/7/21.
 */
function clearEffect(){
    clearTimeout(this.flyTime)
    clearTimeout(this.dropTime)
}
function getSpeed(e){
    if(this.prevPosition){
        this.speed= e.pageX-this.prevPosition
        this.prevPosition= e.pageX
    }else{
        this.prevPosition= e.pageX
    }
}
function fly(){
    this.speed*=.98
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth
    var current=this.speed+this.offsetLeft
    if(current<=0){
        this.style.left=0
        this.speed*=-1
    }else if(current>=maxRight){
        this.style.left=maxRight+'px'
        this.speed*=-1
    }else{
        this.style.left=current+'px'
    }
    if(Math.abs(this.speed)>=.5){
        this.flyTime=window.setTimeout(processThis(fly,this),25)
    }
}
function drop(){
    if(this.dropSpeed){
        this.dropSpeed+=9
    }else{
        this.dropSpeed=9
    }
    this.dropSpeed*=.97
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight
    var current=this.dropSpeed+this.offsetTop
    if(current>=maxBottom){
        this.style.top=maxBottom+'px'
        this.dropSpeed*=-1
        this.flag++
    }else{
        this.style.top=current+'px'
        this.flag=0
    }
    if(this.flag<2){
        this.dropTime=window.setTimeout(processThis(drop,this),25)
    }
}
