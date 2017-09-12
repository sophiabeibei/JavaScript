function on(curEle,type,fn) {
    if(!curEle[type+"Pool"]){
        curEle[type+"Pool"] = [];
    }
    var ary = curEle[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(ary[i] === fn)return;
    }
    ary.push(fn)

};
// 发布过程 ： 让函数执行的过程
function fire(type) {
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(!ary[i]){
            ary.splice(i,1);
            i--;
            continue;
        }
        ary[i]();
    }
};
// 取消订阅
function off(curEle,type,fn) {
    var ary = curEle[type+"Pool"];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]===fn){
                ary[i] = null;
                break;
            }
        }
    }
}
