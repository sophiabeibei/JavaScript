//以下是动画的算法
var zhufengEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}
////////////////////以上都是算法
/*
	animate的参数：当effect参数是数字的情况
	effect：是指定的动画效果，它可以由一个简单数字来快捷表示某种常用的动画效果，也可以以数组的方式来指定某个不常用的动画效果。还可以不给effect参数传值，则动画使用默认的效果（我们指定减速的效果为默认效果）
	如果用数字来快捷表示某种常用效果效，则
	0：减速效果Expo
	1:匀速效果:linear
	2:弹性:Elastic
	3:返回：Back
	4：反弹：Bounce

*/

/*
	effect参数的第二情况：当它是一个数组的情况
animate(ele,{left:600},1500,['zfBounce','easeInOut'],callback)

zhufengEffect.zfBounce.easeInOut
zhufengEffect["zfBounce"]["easeInOut"];
var a=['zfBounce','easeInOut'];
zhufengEffect[a[0]][a[1]];//要明白这一行和161，162是一样的

*/
/*
animate(ele,{left:600},1500,callback)
当第四个参数是function的时候（按理说第五个参数才应该是回调函数呢，现在由于第四个参数没有传，但是回调函数传进来了，则会出现回调函数成为第四个参数的可能）
	现在则需要把这个方法当成回调方法来执行。在这种情况下，则认为没指定动画效果，而是把第四个参数按成第五个参数：回调方法去执行

*/

/*

方法重载和方法重写，是面向对象的“多态”中的概念。面向对象有三大基本特征：封装、继承、多态（一个方法有多种形态，方法重载）
JS中是不支持方法重载的，但是可以使用判断参数的类型或参数个数来模拟实现方法重载
我们的animate方法就是这样

方法重写是指写义在子类上的方法覆盖了父类上的方法，比如Array.prototype.toString覆盖了Object.prototype.toString，在Array类的实例上再使用toString方法，就访问不到Object类上的toString方法了
*/
function animate(ele,obj,duration,effect,callback){
	var fnEffect=zhufengEffect.Expo.easeOut;
	
	if(typeof effect == "number"){
		switch(effect){
			case 0:
				break;
			case 1:
				fnEffect=zhufengEffect.zfLinear;
				break;
			case 2:
				fnEffect=zhufengEffect.Elastic.easeOut;
				break;
			case 3:
				fnEffect=zhufengEffect.Back.easeOut;
				break;
			case 4:
				fnEffect=zhufengEffect.zfBounce.easeOut;
				break;	
			
			
		}
	}else if(effect instanceof Array){
		if(effect.length==2)
			fnEffect=zhufengEffect[effect[0]][effect[1]];
	}else if(typeof effect =="function"){
		callback=effect;	
	}
	
	
	var oBegin={};//用来保存多个方向begin；
	var oChange={};//用来保存多个方向的change;
	
	var flag=0;//用来记录各个方向的距离是否有效
	for(var attr in obj){
		var target=obj[attr]
		var begin=animate.getCss(ele,attr);
		var change=target-begin;
		
		if(change){//判断一下此方向的运动距离有效，不为0		
			oBegin[attr]=begin;
			oChange[attr]=change;
			flag++;
		}
	}//for in 循环结束
	if(!flag)return;//如果各个方向的运动距离都是0，则结束动画的执行
	var interval=15;
	var times=0;
	
	clearInterval(ele.timer);
	
	function step(){
		
		times+=interval;
		if(times<duration){
			for(var attr in oChange){
				var change=oChange[attr];
				var begin=oBegin[attr];
				//var val=times/duration*change+begin;
				var val=fnEffect(times,begin,change,duration);
				animate.setCss(ele,attr,val);
			}
		}else{
			for(var attr in oChange){
				var target=obj[attr];
				animate.setCss(ele,attr,target);	
			}
			clearInterval(ele.timer);
			ele.timer=null;
			if(typeof callback == "function"){
				callback.call(ele);	
			}
		}
		
	}
	ele.timer=setInterval(step,interval);
};

animate.getCss=function(ele,attr){
	if(window.getComputedStyle){
		return parseFloat(window.getComputedStyle(ele,null)[attr]);	
	}else{
		if(attr=="opacity"){
			var val=ele.currentStyle.filter;
			//"alpha(opacity=50)";//匹配到这样的一个字符串，然后把这个字符串中的数字部分拿到
			var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
			if(reg.test(val)){
				return RegExp.$1/100;
			}else{
				//如果没有给IE中的不透明度赋值，则上边的正则为false
				return 1;//如果没有给不透明度赋值，则应该把默认值1返回
			}
			//方法没有返回值，则此方法执行结束后留下一个undefined。即：没有返回值的方法返回的是undefined
		}else{
			return parseFloat(ele.currentStyle[attr]);
		}		
	}
}

animate.setCss=function(ele,attr,val){
		if(attr=="opacity"){
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+")";
		}else{
			ele.style[attr]=val+"px";
		}
}