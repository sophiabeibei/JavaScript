function on(ele,type,handler){
	//比如说把increaseIndex和clearEffect绑定在"selfdragstart"事件上，其实就是把前两个方法保存下来
	if(/^self/.test(type)){
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];	
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==handler)return;	
		}
		a.push(handler);
		return;
	}
	if(ele.addEventListener){
		ele.addEventListener(type,handler)
		}else{
			if(!ele['handler'+type]){
				ele['handler'+type]=[];
				ele.attachEvent('on'+type,function(){run.call(ele);})
				}
				var a=ele['handler'+type];
				for(var i=0;i<a.length;i++){
					if(a[i]===handler){
						return;
						}
					}
					a.push(handler);
			}
}

function run(){
	var e=window.event;
	e.target=e.srcElement;
	e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
	e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
	e.preventDefault=function(){e.returnValue=false; }
	e.stopPropagation=function(){e.cancelBubble=true;}
	var a=this['handler'+e.type];
	if(a&&a.length)
		for(var i=0;i<a.length;i++){
			if(typeof a[i]==='function'){
				a[i].call(this,e);
			}else{
				a.splice(i,1);
				i--;
			}
		}
}

function selfRun(selfType,event){/*需要两个参数：selfType是自定义的事件类型，event是系统的事件对象  */
//selfType的值类似是：selfdragstart,selfdragging,selfdragend
	var a=this["aSelf"+selfType];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
				if(typeof a[i]=="function"){
					a[i].call(this,event);	
				}else{
					a.splice(i,1);
					i--;
				}
		}
			
	}

	
}
function off(ele,type,handler){
	if(ele.removeEventListener){
		ele.removeEventListener(type,handler);
		}else{
			var a=ele["handler"+type];
			if(a && a.length){
				for(var i=0;i<a.length;i++){
					if(a[i]==handler){
						a[i]=null;
						break;
						}
					}
				}
			}
}
function processThis(fn,context){
	return function(e){
		fn.call(context,e);	
	}
}