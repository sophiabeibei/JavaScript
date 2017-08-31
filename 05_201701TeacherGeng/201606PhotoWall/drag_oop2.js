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
	
	拖拽产品的升级
	拖拽产品1.1版
	增加的功能：
	1、可以使拖拽限定范围
	
	拖拽产品的升级
	升级到1.2版 
	加一拖拽的时候加边框
	当按下去的时候，给被拖拽元素加一个虚边框，当鼠标抬起来的时候，把虚框再去掉
	
	
	以上功能都可以由用户来自行扩展，为什么还要固化到拖拽产品内部呢（）
	1、并非所有的用户都具有自行扩展功能的能力
	2、把一些常用的功能添加到产品中，可以使产品的功能更完善，也给用户更多的可选择的余地。
	
	产品既具备用户自行扩展功能的接口，还固化了一些常用的功能，这是设计产品最佳方案
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

Drag.prototype.range=function(oRange){
	//oRange={l:0,r:800,t:0,b:300};//参数oRange是一个对象格式数据，它有四个属性，oRange.l表示拖拽的左边界，r表示右边界，t表示上边界，b表示下边界
	this.oRange=oRange;
	this.on("drag",this.addRange);
	
}

Drag.prototype.addRange=function(e){
	var oRange=this.oRange;
	
	//把各方向的边界赋值给短变量，以方便书写
	var l=oRange.l,rr=oRange.r,t=oRange.t,b=oRange.b;
	//console.log(oRange.r);
	//把正常拖拽情况下水平方向的值和垂直方向的值计算出来
	var currentL=this.x+(e.pageX-this.mx);
	var currentT=this.y+(e.pageY-this.my);
	
	//以下开始做判断
	
	with(this.ele.style){//表示再操作以下变量的时候，以this.ele.style为上下文。以操作以下属性的时候，先在this.ele.style中查找有没有这个属性，如果有这个属性，则表示是在操作this.ele.style的这个属性；如果没有，则往上查找。
	//比如currentL和l,this.ele.style中没有这个属性，则往上查找是否定义了这个变量。而left是this.ele.style的属性，则这里就相当于是操作this.ele.style.left了
	//使用with是有风险的，可能会引起作用域混乱。比如把这个方法里的变量rr改成r，就会引起混乱
		if(currentL<=l){
			left=l+"px";	
		}else if(currentL>=rr){
			left=rr+"px";	
		}else{
			left=currentL+"px";
		}
		
		if(currentT<=t){
			top=t+"px";	
		}else if(currentT>=b){
			top=b+"px";
		}else{
			top=currentT+"px";
		}
	}
	
}

Drag.prototype.border=function(){
	this.on("dragstart",this.addBorder);
	this.on("dragend",this.removeBorder);
}
Drag.prototype.addBorder=function(){
	this.ele.style.border="black dashed 2px";
}
Drag.prototype.removeBorder=function(){
	this.ele.style.border="none";
}


/*var obj1=new Drag(div1);
obj1.range({});
var obj2=new Drag(div2);*/








