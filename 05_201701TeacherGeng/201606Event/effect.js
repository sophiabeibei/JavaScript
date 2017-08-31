function clearEffect(){
	clearTimeout(this.flyTimer);
	clearTimeout(this.dropTimer);	
}
function getSpeed(e){
	if(this.prevPosi){
		this.speed=e.pageX-this.prevPosi;
		this.prevPosi=e.pageX;
	}else{
		this.prevPosi=e.pageX;
	}
}
function fly(){
	this.speed*=.98;
	var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
	var current=this.speed+this.offsetLeft;
	if(current<=0){
		this.style.left=0;
		this.speed*=-1;
			
	}else if(current>=maxRight){
		this.style.left=maxRight+"px";
		this.speed*=-1;	
	}else{
		this.style.left=current+"px";	
	}
	
	if(Math.abs(this.speed)>=.5){
		this.flyTimer=window.setTimeout(processThis(fly,this),20);	
	}
}

function drop(){
	if(this.dropSpeed){
		this.dropSpeed+=9;	
	}else{
		this.dropSpeed=9;	
	}
	
	this.dropSpeed*=.97;
	var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
	var current=this.dropSpeed+this.offsetTop;
	
	if(current>=maxBottom){
		this.style.top=maxBottom+"px";
		this.dropSpeed*=-1;
		this.flag++;//这句代码的用途是判断盒子是否连续到达了边界	
	}else{
		this.style.top=current+"px";
		this.flag=0;
	}
	
	if(this.flag<2){
		this.dropTimer=window.setTimeout(processThis(drop,this),20);	
	}
}
