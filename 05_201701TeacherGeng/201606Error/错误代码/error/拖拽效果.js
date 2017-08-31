function down(e){//准备拖拽
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
    }else{
        this.MOVE=processThis(move,this);
        this.UP=processThis(up,this);
        this.MOVE=move.bind(this);
        this.UP=up.bind(this);
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    selfRun.call(this,'selfabcd1',e)
}
function move(e){//拖拽进行
    this.style.left=this.x+(e.pageX-this.mx)+"px";
    this.style.top=this.y+(e.pageY-this.my)+"px";
    selfRun.call(this,'selfabcd2',e)
}
function up(e){//拖拽结束
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    selfRun.call(this,'selfabcd3',e)
    
}
var eles=document.getElementsByTagName("div");
for(var i=0;i<eles.length;i++){
    on(eles[i],"mousedown",down);
}
