function EventEmitter(){};
EventEmitter.prototype.on=function(type,fn){
    if(!this["emitter"+type]){
        this["emitter"+type]=[];
    }
    var a=this["emitter"+type];
    for(var i=0;i<a.length;i++){
        if(a[i]==fn)return this;
    }
    a.push(fn);
    return this
}
EventEmitter.prototype.run=function(type,e){
    var a=this["emitter"+type];
    if(a){
        for(var i=0;i<a.length;i++){
            if(typeof a[i]==="function"){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }

    }

}
EventEmitter.prototype.off=function(type,fn){
    var a=this["emitter"+type];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            if(a[i]==fn){
                a[i]=null;
                break;
            }
        }
    }
    return this
}
function processThis(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}
function Drag(ele){
    this.x=null;
    this.y=null;
    this.mx=null;
    this.my=null;
    this.ele=ele;
    this.DOWN=processThis(this,this.down);
    this.MOVE=processThis(this,this.move);
    this.UP=processThis(this,this.up);
    on(this.ele,"mousedown",this.DOWN);
}
Drag.prototype=new EventEmitter;

Drag.prototype.down=function(e){
    this.x=this.ele.offsetLeft;
    this.y=this.ele.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup",this.UP);
    }else{
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    this.run("draga",e);

};

Drag.prototype.move=function(e){
    this.ele.style.left=e.pageX-this.mx+this.x+"px";
    this.ele.style.top=e.pageY-this.my+this.y+"px";
    this.ele.T=e.pageY-this.my+this.y;
    this.ele.L=e.pageX-this.mx+this.x;


    this.run("dargstart",e);
};

Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.UP);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    this.run("dragging",e);
};