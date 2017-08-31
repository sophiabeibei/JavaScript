function on(ele,type,fn){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);	
	}else {
		//以下的代码，是专门为解决IE6/7/8而写的
		if(!ele["aEvent"+type]){//如果不存在此事件程序池
			ele["aEvent"+type]=[];//则构造一个事件程序池
			//下面是把run方法绑定到ele的type事件上一次（只能一次）
			ele.attachEvent("on"+type,function(){run.call(ele)});	
		}
		
		var a=ele["aEvent"+type];//把长属性名的数组赋给一个短变量名，为了方便操作
		
		for(var i=0;i<a.length;i++){//防止方法被重复保存到这个数组里
			if(a[i]==fn)return;			
		}
		
		a.push(fn);//最重要的是把fn保存到数组中
		
	}
	
}

function run(){
	var e=window.event;
	var type=e.type;
	var a=this["aEvent"+type];
	if(a&&a.length){
		if(!e.target){
			e.target=e.srcElement;
			e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
			e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
			e.stopPropagation=function(){e.cancelBubble=true;}
			e.preventDefault=function(){e.returnValue=false};		
		}
		
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


function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);		
	}else{
		var a=ele["aEvent"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					return;	
				}
			}
		}
	}
}

//这个方法就是专门用来处理方法在运行的时候的this指向问题的
//它可以让fn方法在运行的时候，功能不变，但强制使this关键字指向第二个参数obj

function processThis(fn,obj){
	return function(e){fn.call(obj,e)}	
}