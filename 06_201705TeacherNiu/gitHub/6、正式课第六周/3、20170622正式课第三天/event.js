// 自己创建一个事件池
// 解决顺序问题  重复绑定  this问题
// on 方法解决事件存储问题
function on(curEle,evenType,evenFn){
    if(/^self/.test(evenType)){
        if(!curEle["self"+evenType]){
            curEle["self"+evenType] = []
        };
        var ary = curEle["self"+evenType];
        for(var i=0;i<ary.length;i++){
            if(ary[i] === evenFn)return;
        }
        ary.push(evenFn);
        return;
    }
    // 在标准浏览器下
    if(curEle.addEventListener){
        curEle.addEventListener(evenType,evenFn,false);
        return;
    }
    //curEle["myBind"+evenType] 新增自定义属性
            if(!curEle["myBind"+evenType]){
                curEle["myBind"+evenType] = [];
                // 这个地方的代码执行一次，针对于一个事件行为（click、mouseover）
                curEle.attachEvent("on"+evenType,function () {
                    run.call(curEle);
        });
    }
    var ary = curEle["myBind"+evenType];
    for(var i=0;i<ary.length;i++){
        var cur = ary[i];
        if(cur === evenFn){
            return;
        }
    }
    ary.push(evenFn);
}
//curEle
// bind 在IE678 下是不兼容的
// run 方法解决自定义事件池方法挨个执行
function run(e) {
    // this-->curEle
    e = window.event;
    e.target = e.srcElement;
    e.pageX = e.clientX + (document.documentElement.scrollLeft||document.body.scrollLeft);
    e.pageY = e.clientY + (document.documentElement.scrollTop||document.body.scrollTop);
    e.stopPropagation = function () {
        e.cancelBubble = true;
    }
    e.preventDefault = function () {
        e.returnValue = false;
    }

    var ary = this["myBind"+e.type];
    for(var i=0;i<ary.length;i++){
       if(typeof ary[i] == "function"){
           ary[i].call(this,e);
           // fn3() i=2  fn(5) i=3
       }else{
           ary.splice(i,1);
           i--;
       }
    }
};
function off(curEle,evenType,evenFn) {
    if(curEle.removeEventListener){
        curEle.removeEventListener(evenType,evenFn,false);
        return;
    }
    var ary = curEle["myBind"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i] === evenFn){
            //ary.splice(i,1);// 会导致数组塌陷
            ary[i] = null;
            break;
        }
    }
}
function handThis(obj,fn){
    return function (e) {
        fn.call(obj,e)
    }
}
// 所谓的通知，当拖拽模块执行的时候，去和事件标识符去匹配对应的数组，让当前这个数组中的方法执行；
function selfrun(selfType) {  // 自定义的事件
    var ary = this["self"+selfType];
    for(var i=0;i<ary.length;i++){
        ary[i].call(this);
    }
}