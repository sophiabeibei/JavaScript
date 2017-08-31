function EventEmitter(){//这是EventTarget类的原型
	
	};
EventEmitter.prototype.on=function(type,fn){
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
EventEmitter.prototype.run=function(type,e){//第二个参数是指有可能用到的系统的事件对象
	var a=this["aEmitter"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);	//把系统的事件对象往下去传，这样可以使我们自己类的实例，在具体备发布自定义事件的同时，也可以使用系统的事件对象
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
}

EventEmitter.prototype.off=function(type,fn){
	var a=this["aEmitter"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return this;	
			}
		}
			
	}
	return this;
}
/* 以上是事件管理、发布的类-------*/

//以下是拖拽的类
	//现在拖拽已经是一个定型的产品，它已经可以实现完整完整的拖拽功能了，但是还需要让它可以实现和其它的功能协同工作的能力。就是说还可以在不破坏现在的Drag类的代码的前提下，可以给它扩展新的功能
	
	//那现在就是给Drag类加接口：使它具体绑定事件的功能
	//拖拽有三个阶段：拖拽开始，拖拽进行，拖拽结束这三个阶段，如果有某些方法想在拖拽的某个阶段，和拖拽同时执行，则需要给这三个阶段分别发布三个事件
	//先要确定这三个事件类型
	//1、dragstart,
	//2、drag
	//3、dragend

function Drag(ele){//参数ele是被拖拽的元素
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;
	this.obj=ele;//把构造函数运行时得到的这个被拖拽的元素保存this的obj中，这样就确保其它Drag类上的方法中都可以访问被拖拽的元素了
	this.DOWN=processThis(this.down,this);
	this.MOVE=processThis(this.move,this);
	this.UP=processThis(this.up,this);
	on(this.obj,"mousedown",this.DOWN);
	
	
	
}
Drag.prototype=new EventEmitter;
Drag.prototype.down=function(e){
	
	this.x=this.obj.offsetLeft;
	this.y=this.obj.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY
	if(this.obj.setCapture){
		this.obj.setCapture();
		on(this.obj,"mousemove",this.MOVE);
		on(this.obj,"mouseup",this.UP);
	}else{
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();
	this.run("dragstart",e);
}
	

Drag.prototype.move=function(e){
	this.obj.style.left=this.x+e.pageX-this.mx+"px";
	this.obj.style.top=this.y+e.pageY-this.my+"px";
	this.run("drag",e);
}

Drag.prototype.up=function(e){
	if(this.obj.releaseCapture){
		this.obj.releaseCapture();
		off(this.obj,"mousemove",this.MOVE);
		off(this.obj,"mouseup",this.UP);
	}else{
		off(document,"mousemove",this.MOVE)
		off(document,"mouseup",this.UP);
	}
	this.run("dragend",e);	
}

Drag.prototype.range=function(obj){
	this.oRange=obj;
	this.on("drag",this.addRange);//真正实现限范围的拖拽是由addRange来实现
	
}

Drag.prototype.addRange=function(e){
	this.oRange//{l:0,r:500,t:0,b:300}
	//相当把move重写
	var currentX=this.x+e.pageX-this.mx;
	var currentY=this.y+e.pageY-this.my;
	if(currentX>=this.oRange.r){//如果超过了右边界，则停在右边界上
		this.obj.style.left=this.oRange.r+"px";
	}else if(currentY<=this.oRange.l){
		this.obj.style.left=this.oRange.l+"px";
	}else{
		this.obj.style.left=currentX+"px";
	}
	
	if(currentY>=this.oRange.b){
		this.obj.style.top=this.oRange.b+"px";
	}else if(currentY<=this.oRange.t){
		this.obj.style.top=this.oRange.t+"px";
	}else{
		this.obj.style.top=this.y+e.pageY-this.my+"px"; 
	}
}

Drag.prototype.border=function(){
	this.on("dragstart",this.addBorder);
	this.on("dragend",this.removeBorder);
}
Drag.prototype.addBorder=function(){
	this.obj.style.border="2px purple dashed";
}

Drag.prototype.removeBorder=function(){
	this.obj.style.border="none";
}
/*
	具体事件绑定功能的，可自行扩展功能的拖拽产品
				使用说明书
	1.实现某元素ele的拖拽，方式是new Drag(ele);
	2.Drag实例具体事件绑定的功能，别分是
		2.1 dragstart 用法如下
			var obj=new Drag(ele);
			obj.on("dragstart",fn);
			这样可以实现在拖拽开始的阶段运行fn方法
		2.2 drag
		2.3 dragend
	3.产品其它细节。如果你想使用被拖拽的元素，则是实例上是obj属性
		如果是绑定的方法里使用被拖拽的元素，则使用this.obj
升级1.1
	4 拖拽的时候加一个指定拖拽范围（限定范围的拖拽，这个拖拽的范围是由参数指定的）


*/
/*
var obj1=new Drag(div1);
obj1.on("dragend",drop);
obj1.range({l:0,r:500,t:0,b:300});//表示在参数对象指定的范围内实现拖拽：水平方向0-500，垂直方向：0-300。
ele.addEventListener("click",fn);

*/
