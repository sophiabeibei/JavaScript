// JavaScript Document
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if(!ele["myBind" +　type]){
        ele["myBind" + type] = [];
        ele.attachEvent("on" + type,function (e){
            run.call(ele,e);
        });
    }
    var ary = ele["myBind" + type];
    for(var i=0;i<ary.length;i++){
        if(ary[i] == fn){
            return;
        }
    }
    ary.push(fn);
}
function run(){
    var e=event;
    e.pageX=e.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft);
    e.pageY=e.clientY+(document.body.scrollTop||document.documentElement.scrollTop);
    e.stopPropagation=function(){
        e.cancelBubble=true;
    }
    e.preventDefault=function(){
        e.returnValue=false;
    }
    var ary=this["myBind" + e.type]
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){
            ary[i].call(this,e)
        }else{ary.splice(i,1);i--;}
    }
}
function down(e){
    this.x=e.clientX;
    this.y=e.clientY;
    this.mx=this.offsetLeft;
    this.my=this.offsetTop;
    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up)
    }else{
        var _this=this;
        this.MOVE=function(e){
            move.call(_this,e)
        }
        this.UP=function(e){
            up.call(_this,e)
        }
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP)
    }








}


function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var ary = ele["myBind" + type];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==fn){
            ary[i]=null;
            break;
        }
    }
}
function move(e){
    var changeL=e.clientX-this.x,
        changeT=e.clientY-this.y;
    this.style.left=this.mx+changeL+"px";
    this.style.top=this.my+changeT+"px";

    if(!this.prePros){
        this.prePros=this.offsetLeft;
    }
    this.speed=this.offsetLeft-this.prePros;
    this.prePros=this.offsetLeft;
}

function up(e){
    if(this.releaseCapture){
        this.releaseCapture();

        off(this,"mousemove",move);
        off(this,"mouseup",up)
    }else{

        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP)
    }

    drop.call(this);
    fly.call(this);
}
function handThis(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}
//fly()

function drop(){
    if(!this.dropSpeed){
        this.dropSpeed=9.8;
        this.flag=0;
    }else{
        this.dropSpeed+=9.8;
    }
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(this.dropSpeed+this.offsetTop>maxBottom){
        this.style.top=maxBottom+"px";
        this.flag++;
        this.dropSpeed*=-1;
    }else{
        this.style.top=this.dropSpeed+this.offsetTop+"px";
        this.flag=0;
    }
    this.dropSpeed*=0.98;
    if(this.flag<2){
        this.dropTimer=setTimeout(handThis(this,drop),15);
    }


}
