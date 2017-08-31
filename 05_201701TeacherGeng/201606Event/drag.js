function down(e){//准备拖拽
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);	
	}else{
		this.MOVE=move.bind(this);
		this.UP=up.bind(this);
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);	
	}
	e.preventDefault();
	
	selfRun.call(this,"selfabcd1",e);
	
}

function move(e){
	//盒子的新位置=盒子原来的位置+（鼠标移动的距离=鼠标现在的位置-鼠标原来的位置）
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	selfRun.call(this,"selfabcd2",e);
}


function up(e){
	
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mouseup",up);
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}	
	
	//发布事件
	selfRun.call(this,"selfabcd3",e);
	//EventTarget.prototype.run,
}