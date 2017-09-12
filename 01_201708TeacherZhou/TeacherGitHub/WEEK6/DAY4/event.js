function on(curEle, type,fn) {
       if(/^self/.test(type)){
           if(!curEle[type+"Pool"]){
               curEle[type+"Pool"] = [];
           }
           var ary = curEle[type+"Pool"];
           for(var i=0;i<ary.length;i++){
               if(ary[i]===fn){
                   return;
               }
           }
           ary.push(fn);
           return;
       }
       if('addEventListener' in curEle){
           // 内置的事件池
           curEle.addEventListener(type,fn,false);
           return;
       }
       // 自定义事件池
       if(!curEle[type+'pool']){
           curEle[type+'pool']=[];

           curEle.attachEvent('on'+type,function (e) {
               run.call(curEle,e)
           });
       }
       // 查一下方法在自定义事件池是否已经存在
       var ary = curEle[type+'pool'];
        for (var i = 0; i < ary.length; i++) {
            var obj = ary[i];
            if(fn===obj){
                return;
            }
        }
        ary.push(fn);
}
// 让自定义的事件池中的方法执行
//
function run(e) {
    e = window.event;
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY = (document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.stopPropagation = function () {
        e.cancelBubble = true;
    }
    e.preventDefault = function () {
        e.returnValue = false;
    }
    var ary = this[e.type+'pool'];
    if(ary){
        for (var i = 0; i < ary.length; i++) {
            var fn = ary[i];
            if(fn==null) {
                ary.splice(i, 1);
                i--;
                continue;
            }
            fn.call(this,e);
        }
    }
}
function off(curEle,type,fn) {
    if(!/^self/.test(type)){
        // 传进来的type一定是一个内置的事件行为
        if ('removeEventListener' in curEle){
            curEle.removeEventListener(type,fn,false);
            return;
        }
    }
    var ary=curEle[type+'pool'];
    if(ary){
        for (var i = 0; i < ary.length; i++) {
            if(ary[i]==fn){
                // ary.splice(i,1);// 防止数组塌陷
                ary[i] =null;
                break;
            }
        }
    }
}
function selfrun(type) {
    var ary = this[type+"Pool"];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(typeof ary[i]==="function"){
                ary[i].call(this);
            }
        }
    }
}
