function getSpeed(e){
		if(this.prevPosi){
			this.speedfly = e.pageX - this.prevPosi;
			this.prevPosi = e.pageX;
		}else{
			this.prevPosi = e.pageX;
		}
	}
	function fly(){
		this.speedfly*=0.97;
		var current=this.speedfly+this.ele.offsetLeft;
		var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;
		if(current<0){
			this.ele.style.left=0;
			this.speedfly*=-1;
		}else if(current>maxRight){
			this.ele.style.left=maxRight+'px';
			this.speedfly*=-1;
			}else{
				this.ele.style.left=current+'px';
				}
		 this.flyTimer=window.setTimeout(processThis(fly,this),25)	
			if(Math.abs(this.speedfly)<0.5){
				clearTimeout(this.flyTimer)
				}
		}
		
		function drop(){
			if(this.dropSpeed){
				this.dropSpeed += 9.8;	
			}else{
				this.dropSpeed = 1;	
			}
			this.dropSpeed *= 0.98;
			var curSpeed = this.ele.offsetTop + this.dropSpeed ;
			var maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight;
			if(curSpeed > maxT){
				curSpeed = maxT;
				this.dropSpeed *= -1;
				this.flag ++;
			}else{
				this.flag = 0;	
			}
			this.ele.style.top = curSpeed + "px";
			if(this.flag < 2){
				this.dropTimer = window.setTimeout(processThis(drop,this),17);
			}
		}
	var zIndex=0
	function dex(){
		this.ele.style.zIndex =++zIndex;
		}
	function clearTimer(){
		window.clearTimeout(this.flyTimer);
		window.clearTimeout(this.dropTimer);
	}