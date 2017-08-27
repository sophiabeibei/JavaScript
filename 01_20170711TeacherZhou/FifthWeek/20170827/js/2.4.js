var ary = [];
//=>类似于JQ中的on方法: 给当前元素某个行为绑定方法
/**
 *
 * @param curEle  当前元素
 * @param type 事件类型
 * @param fn 要绑定的方法
 */
function on(curEle, type, fn) {
    if ("addEventListener" in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    if (!curEle[type + "Pool"]) {
        curEle[type + "Pool"] = [];

        //->把run方法放在内置的事件池中: 触发当前元素的事件行为的时候,浏览器会把run方法执行(而执行run方法就会把我们自己事件池中绑定的那些方法依次执行)
        // 1.我们执行on方法,只要把run放在内置事件池中一次就够了,没必要每次执行on方法都放内置的事件池一次(此处判断只会执行一次)
        // 2.当触发事件行为执行run方法的时候,run中的this是window;我们需要让run中的this是当前元素才可以;
        curEle.attachEvent("on" + type, run.bind(curEle));




        //---------------------run  DOM0绑定 忽略不看;
        // curEle["on"+type]= run;//->当然用DOM0来做这件事就很简单了,此时当run执行的时候,run中的this是当前元素;但是,这里的run没有传e;但可以用window.event;
        // 这里讲的是DOM2事件,所以不用DOM0事件绑定;


    }
    var ary = curEle[type + "Pool"];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            return;
        }
    }
    ary.push(fn);
}
//=>类似于JQ中的off方法: 移除当前元素某个行为的某个方法
function off(curEle, type, fn) {
    if ("addEventListener" in curEle) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    var ary = curEle[type + "Pool"] || [];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            ary.splice(i, 1);
            break;
        }
    }
}
//=>run: 把我们自己创建的事件池按照顺序执行
function run(e) {
    //->this: 当前元素;(在on方法里已经把run的this改变了)(并且这里有个e)
    //->e: 内置事件池中的方法执行,浏览器默认会传递e(事件对象)
    if(!e.target){
        //->如果e.target不存在,说明是IE678
        e.target = e.srcElement;
        e.pageX=e.clientX+(document.documentElement.scrollWidth||document.body.scrollWidth);
        e.pageY=e.clientY+(document.documentElement.scrollHeight||document.body.scrollHeight);
        e.preventDefault = function () {
            e.returnValue=false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }

    }


    var ary = this[e.type + "Pool"];
    if(ary){
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];//->我们自己事件池中存储的一个个的方法;
            //->我们把这些方法执行: 让方法中的this是当前元素,并且把事件对象传递给这个方法(贴合标准浏览器的机制)
            item.call(this,e);//->this: 当前元素;   e: 事件对象;
        }
    }
}




























