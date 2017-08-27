//=>类似于JQ中的ON方法:给当前元素的某个行为绑定方法
function on(curEle, type, fn) {
    if ('addEventListener' in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE低版本浏览器
    //1、如果之前没有创建过虚拟的事件池,我们需要创建一个:需要给当前元素的某一个事件类型创建一个独立的事件池(容器)
    //curEle[type + 'Pool'] 元素的每一个事件类型应该有自己单独的事件池
    if (!curEle[type + 'Pool']) {
        //->之前没有创建过事件池,我们就创建一个
        curEle[type + 'Pool'] = [];
    }
    var ary = curEle[type + 'Pool'];
    //->在每一次新增加之前还需要验证一下是否重复:已经存在了就不要在增加了
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            return;
        }
    }
    ary.push(fn);//->把当前需要给元素绑定的方法增加到自己创建的事件池中
}

//=>类似于JQ中的OFF方法:移除当前元素某个行为的某个绑定方法
function off(curEle, type, fn) {
    if ('removeEventListener' in curEle) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //->IE低版本浏览器
    var ary = curEle[type + 'Pool'] || [];//->防止事件池从来没创建过,没创建过我们让其等于空数组
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {//->找到和传递这个方法相同的这一项,在自己开辟的事件池中把这个方法移除即可
            ary.splice(i, 1);
            break;
        }
    }
}
