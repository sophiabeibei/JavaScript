function on(ele,type,fn){
	if(/^self/.test(type)){
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];	
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		
	}else if(ele.addEventListener){
		ele.addEventListener(type,fn,false);	
	}else{
		if(!ele["aEvent"+type]){
			ele["aEvent"+type]=[];
			ele.attachEvent("on"+type,function(){run.call(ele)})
			
		}
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);                           
	}
	
}

function selfon(){
	
}
function run(){
	
	var e=window.event;
	e.target=e.srcElement;
	e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
	e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	e.stopPropagation=function(){e.cancelBubble=true;};
	e.preventDefault=function(){e.returnValue=false;};
	var type=e.type;
	var a=this["aEvent"+type];
	
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i] == "function"){
				a[i].call(this,e);
				
			//a[i]();
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
	
}
//selfRun方法是用来执行绑定在自定义事件上的那些方法的
//两个参数：
//selfType是指自定义的事件类型 ，e是指系统的事件类型
//最难的一个问题是：这个selfRun方法在那儿执行，什么时候执行
function selfRun(selfType,e){
	 var a=this["aSelf"+selfType];
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
function off(ele,type,fn){
	if(/^self/.test(type)){
		var a=ele["aSelf"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					return;	
				}
			}
		}
	}else if(ele.removeEventListener){
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

function processThis(fn,obj){
	
	return function(e){fn.call(obj,e);}	
}