function on(ele,type,fn){
	if(/^self/.test(type)){
		//处理自定义的事件绑定：构建程序池并且把需要绑定的方法保存到程序池中
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];	
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
	}else if(ele.addEventListener){
		//处理标准浏览器的事件绑定
		ele.addEventListener(type,fn,false);
	}else{//以下是处理IE浏览器的事件绑定
		if(!ele["aEvent"+type]){
			ele["aEvent"+type]=[];
			ele.attachEvent("on"+type,function(){run.call(ele)});	
		}
		
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
	}
	
}

function run(){//IE中专门负责按顺序执行程序池里的方法的，浏览器事件中真正绑定的是这个run方法
	var e=window.event;
	var type=e.type;
	var a=this["aEvent"+type];
	if(a&&a.length){
		if(!e.target){
			e.target=e.srcElement;
			e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
			e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
			e.preventDefault=function(){e.returnValue=false;}
			e.stopPropagation=function(){e.cancelBubble=true;};
				
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


function selfRun(selfRun,e){//负责通知，专门处理自定义事件通知
	var a=this["aSelf"+selfRun];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);
					//a[i]();
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
		if(a){
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
		if(a){
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




