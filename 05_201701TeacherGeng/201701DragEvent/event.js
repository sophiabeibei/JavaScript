function on(ele,type,handler){
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
	e.pageX=e.clientX+(document.documentElement.srcollLeft||document.body.srcollLeft);
	e.pageY=e.clientY+(document.documentElement.srcollTop||document.body.srcollTop);
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