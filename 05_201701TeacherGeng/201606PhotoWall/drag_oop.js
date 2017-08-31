/*
	拖拽产品1.0版本
	实现了最基本的拖拽功能
	可以让用户来根据自已的需求来扩展和拖拽相关的其它功能（通过事件接口来扩展功能）
	设计指导原则
	拖拽开始的事件类型设定为 "dragstart"
	拖拽进行的事件类型设定为 "drag"
	拖拽结束的事件类型设定为 "dragend"
	以上设计原则是开发用的
	
	以下是给用户使用看的
					使用说明
	一.如果打算在拖拽的某个阶段扩展新的功能，请使用如下事件
		拖拽开始的事件类型设定为 "dragstart"
		拖拽进行的事件类型设定为 "drag"
		拖拽结束的事件类型设定为 "dragend"
	一.二 通过事件绑定的方法，被绑定的方法在运行的时候，this会指向Drag类的实例
	二.如果您想使用被拖拽的元素，此元素保存在实例的ele属性中
	
	
*/


function EventEmitter(){};//事件发射器类，订阅发布模式或者叫观察者模式的实现原理
EventEmitter.prototype.on=function(type,fn){
	if(!this["aEmitter"+type]){
		this["aEmitter"+type]=[];	
	}
	var a=this["aEmitter"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;			
	}
	a.push(fn);
	return this;//实现链式写法的关键
}

EventEmitter.prototype.run=function(type){
	
	var a=this["aEmitter"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].apply(this,[].slice.call(arguments,1));
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
				return;	
			}
		}
	}
	
}

//当用new 去运算一个构造函数的时候，发生了那几件事：
//1.创建了一个此类的实例，并且将此实例返回
//2.这个实例自动就具有__proto__这个属性（表示它自动拥有类的原型上的方法了）
//3.以此实例为上下文构造函数运行
function Drag(ele){
	this.ele=ele;
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;
	
	this.DOWN=processThis(this.down,this);
	this.MOVE=processThis(this.move,this);
	this.UP=processThis(this.up,this);
	on(this.ele,"mousedown",this.DOWN);
}
Drag.prototype=new EventEmitter;
Drag.prototype.down=function(e){//准备拖拽
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
	this.run("dragstart",e);
}

Drag.prototype.move=function(e){
	this.ele.style.left=this.x+(e.pageX-this.mx)+"px";
	this.ele.style.top=this.y+(e.pageY-this.my)+"px";
	this.run("drag",e);
	
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








