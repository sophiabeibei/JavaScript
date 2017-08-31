/**
 * Created by duan on 2016/7/21.
 */
function on(ele,type,fn){
    if(/^self/.test(type)){//处理自定义的事件绑定：构建程序池并且把需要绑定的方法 保存到程序池中
        if(!ele['aSelf'+type]){
            ele['aSelf'+type]=[];
        }
        var a=ele['aSelf'+type];
        for(var i=0;i< a.length;i++){
            if(a[i]==fn)return;
        }
        a.push(fn);
    } else if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele['aEvent'+type]){//低级浏览器的处理
            ele['aEvent'+type]=[];
            ele.attachEvent('on'+type,function(){run.call(ele)})
        }
        var a=ele['aEvent'+type];
        for(var i=0;i< a.length;i++){
            if(a[i]==fn)return;
        }
        a.push(fn);
    }
};
//IE中专门负责按顺序执行程序池里面的方法 浏览器真绑定的是这个run方法
function run(){
    var e=window.event;
    var type= e.type;
    var a=this['aEvent'+ type];
    if(a && a.length){
        if(!e.target){
            e.target= e.srcElement;
            e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
            e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
            e.preventDefault=function(){
                e.returnValue=false;
            }
            e.stopPropagation=function(){
                e.cancelable=true;
            }
        }
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }

};
//专门处理自定义事件的通知
function selfRun(selfRun,e){
    var a=this['aSelf'+selfRun];
    if(a&&a,length){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
};
function off(ele,type,fn){
    if(/^self/.test(type)){//处理自定义上面的事件解除，
        var a=ele['aSelf'+type];
        if(a){
            for(var i=0;i< a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    return;
                }
            }
        }
    }else if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var a=ele['aEvent'+type];
        if(a){
            for(var i=0;i< a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    return;
                }
            }
        }
    }

};
function processThis(fn,obj){
    return function(e){fn.call(obj,e)};
}
function drop(){
    if(this.dropSpeed){
        this.dropSpeed+=9;
    }else{
        this.dropSpeed=9;
    }
    this.dropSpeed*=9;
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    var current=this.dropSpeed+this.offsetTop;
    if(current>=maxBottom){
        this.style.top=maxBottom+'px';
        this.dropSpeed*=-1;
        this.flag++;
    }else{
        this.style.top=current+'px';
        this.flag=0;
    }
    if(this.flag<2){
        this.dropTimer=window.setTimeout(processThis(drop,this),25);
    }
}