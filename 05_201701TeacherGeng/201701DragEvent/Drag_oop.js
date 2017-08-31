function Emitter(){};

Emitter.prototype.on=function(type,fn){
	if(!this["aEmitter"+type]){
		this["aEmitter"+type]=[];	
	}
	var a=this["aEmitter"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return this;	
	}
	a.push(fn);	
	return this;
}
Emitter.prototype.run=function(type,e){
	var a=this["aEmitter"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);
			}else{
				a.splice(i,1);
				i--;
			}
		}
	}
}
Emitter.prototype.off=function(type,fn){
	var a=this["aEmitter"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;	
			}
		}
	}
}

//使用继承使Drag类具备发布事件的功能
//要求你发布三个事件
//分布是在拖拽开始的时候发布dragstart事件，拖拽进行的时候发生dragging事件，拖拽结束的时候发布dragend事件
//思考：为什么这里的事件发布，就不需要加前缀self了呢


function Drag(ele){
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;
	this.ele=ele;
	this.DOWN=processThis(this.down,this);
	this.MOVE=processThis(this.move,this);
	this.UP=processThis(this.up,this);
	on(this.ele,"mousedown",this.DOWN);
	
	
	
}
Drag.prototype=new Emitter;

Drag.prototype.down=function(e){
	this.x=this.ele.offsetLeft;//盒子的原始x轴坐标
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
	this.run("dragstart",e);
	//Emitter.prototype.run.call(this.ele,"dragstart",e);
	//this.on("dragstart",dex)
}


Drag.prototype.move=function(e){
	this.ele.style.left=e.pageX- this.mx+this.x+"px";
	this.ele.style.top=e.pageY-this.my+this.y+"px";
	this.run("dragging",e);
}

Drag.prototype.up=function(e){
	if(this.ele.releaseCapture){
		this.ele.releaseCapture();
		off(this.ele,"mousemove",this.MOVE);
		off(this.ele,"mouseup",this.UP);	
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);	
	}
	
	this.run("dragend",e);
}

/*
          Drag1.1产品设计和使用说明书
  一、Drag是一个类，使用此类可以实现某DOM元素的拖拽
      用法如 var obj=new Drag(div1);//这样就可以实现div1的拖拽
  二、Drag类上有三个公有方法，分别是down,move,up
  down表示鼠标按下去准备拖拽的阶段
  move表示鼠标按下去并且鼠标移动，这时候DOM元素会发生移动，这是拖拽进行的阶段
  up表示鼠标抬起来，拖拽结束了。这是拖拽结束的阶段
  方法里的this都是表示当前这个类的实例
  三、类上还有五个公开的属性
       this.x表示
	   this.y表示
	   this.mx表示
	   this.my表示
	   this.ele表示被拖拽的元素
  四、如果给拖拽的不同阶段扩展新的功能 
     1.扩展在拖拽开始的阶段，使用 “dragstart"事件
	 obj.on("dragstart",fn1);//表示在拖拽开始的阶段，fn1会被运行
	 2.扩展在拖拽进行的阶段，使用"dragging"事件
	  
	 3.扩展在拖拽结束的阶段，使用"dragend"事件


*/