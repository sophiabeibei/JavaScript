function on(curEle,type,fn) {
    if(/^self/.test(type)){
        if(!curEle[type]){
            curEle[type] = []
        };
        var ary = curEle[type];
        for(var i=0;i<ary.length;i++){
            if(ary[i] === fn)return;
        }
        ary.push(fn)
        return;
    }

    if('addEventListener' in curEle){
        curEle.addEventListener(type,fn,false);
        return;
    }
    if(!curEle[type+'Pool']){
        curEle[type+'Pool']=[];
        curEle.attachEvent("on"+type,function (event) {

            run.call(curEle,event)
        })
    }
    var ary = curEle[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(ary[i]===fn){
            return;
        }
    }
    ary.push(fn);

}
//让自定义事件池中的方法执行
function run(e){
    // 获取对应元素的自定义事件池
    //想让run中的this指向curEle
    e = window.event;
    e.target = e.srcElement;
    e.pageX = e.clientX + (document.documentElement.scrollLeft ||document.body.scrollLeft)
    e.pageY = e.clientY +(document.documentElement.scrollTop ||document.body.scrollTop);
    e.preventDefault = function () {
        e.returnValue = false;
    }
    e.stopPropagation = function () {
        e.cancelBubble = true;
    }
    var ary = this[e.type+"Pool"];
    for(var i=0;i<ary.length;i++){
        var cur =ary[i]
        if(!cur){
            ary.splice(i,1);
            i--;
            continue;
        }
        cur.call(this,e);
    }
}
// 移出事件的方法
function off(curEle,type,fn) {
    if('removeEventListener' in curEle){
        curEle.removeEventListener(type,fn,false)
        return;
    }
    // 首先拿到自定义事件池
    var ary = curEle[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(ary[i] === fn){
            ary[i] = null;
        }
    }
}
// 发布 执行方法
function selfrun(type) {
    var ary=this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(!ary[i]){
                ary.splice(i,1);
                i--;
                continue;
            }
            ary[i].call(this)
        }
    }
}
var zIndex=1;
function processThis(fn,obj) {
    return function (e) {
        fn.call(obj,e)
    }
}
function increaseIndex() {
    this.ele.style.zIndex=++zIndex;
}
