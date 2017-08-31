function on(ele,type,fn){
	//self开头，就是为了避免自定义事件和冲突
	//selfdragstart,selfdrag,selfdragend
	
	if(/^self/.test(type)){//处理自定义事件
		//专门开辟一个数组，来保存自定义事件中的方法
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];	
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		return;//相当于else if
	}
	
	
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];//创建事件池
		ele.attachEvent("on"+type,function (){run.call(ele)});
	}
	
	var a=ele["aEvent"+type];
	
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	//确保方法不会被重复的“绑定”到事件池里
	}
	
	a.push(fn);//核心代码：就是将fn保存到事件池中（相当于绑定上了）
	
	//按理说：通知的工作是在主行为发生的时候，在主行为里执行run，但是主行为（click,mousemove,mouseup）是浏览器已经封装好的方法，我们改变不了，那怎么能让run执行呢，那就要借助浏览器的事件绑定的模型，把run绑定在这儿，以实现事件触发的时候，执行run
	//bind(ele,type,run);
	//ele.attachEvent("on"+type,function (){run.call(ele)});
	
}


function run(){
	var e=window.event;
	var type=e.type;
	var a=this["aEvent"+type];//this是指绑定run方法的那个元素
	if(a)
		if(!e.target){
			e.target=e.srcElement;
			e.preventDefault=function(){e.returnValue=false;};
			e.stopPropagation=function(){e.cancelBubble=true};
			e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
			e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
				
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

//通知绑定在自定义事件上的方法来执行

//作用：去对应的数组里把方法遍历执行
function selfRun(selfType,e){//第一个参数是自定义的事件类型，第二个参数e是指浏览器的事件对象（可选的）
	var a=this["aSelf"+selfType];
	if(a){
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
	//使off方法具备移除自定义事件的功能
	if(/^self/.test(type)){
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;
			}	
		}
	}
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["aEvent"+type]
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				break;	
			}
		}
		
	}
	
}

function processThis(fn,context){
	return function(e){fn.call(context,e)}	;//参数e是预留的用来：当此方法被绑定到事件上的时候，得到事件对象的参数。e未必每次都会用到，只是一个预留的接口
}
