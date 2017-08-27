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
    //->IE低版本浏览器
    // 1.如果之前没有创建过虚拟的事件池,我们需要创建一个: 需要给当前元素的某个事件类型创建一个独立的事件池(容器)

    //->curEle[type+"Pool"]元素的每一个事件类型应该有自己单独的事件池
    //
    if(!curEle[type + "Pool"]){
        //->之前没有创建过事件池,我们就创建一个
        curEle[type + "Pool"] = [];
    }
    var ary = curEle[type + "Pool"];

    //->去重: 在每次新增加之前还需要验证是否重复了: 已经存在了就不要增加了;
    for (var i = 0; i < ary.length; i++) {
        if(ary[i]===fn){
            return;
        }
    }

    ary.push(fn);//->把当前需要给元素绑定的方法增加到自己创建的事件池中;
}
//=>类似于JQ中的off方法: 移除当前元素某个行为的某个方法
function off(curEle, type, fn) {
    if ("addEventListener" in curEle) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //=>IE低版本浏览器
    var ary = curEle[type+"Pool"]||[];//->防止事件池从来没创建过,没创建过我们让其等于空数组;
    for (var i = 0; i < ary.length; i++) {
        if(ary[i]===fn){
            //->如果找到和传递这个方法相同的这一项,在自己开辟的事件池中把这个方法移除即可;
            ary.splice(i,1);
            break;
        }
    }
}








































//------------------------------------------------------作废
//=>快速创建12个fn,每个fn中输出对用的数字
for (var i = 1; i <= 12; i++) {
    //eval("function fn " + i + "(){console.log(" + i + ")}");
    console.log(i);
}
function fn13(e) {
    console.log(13, this, e);
}

// function fn1() {
//     console.log(1);
// }


// document.body.removeEventListener("click",fn1,false);


// document.body.addEventListener("click",fn1,false);
// document.body.addEventListener("click",fn2,false);
// document.body.addEventListener("click",fn3,false);
// document.body.addEventListener("click",fn4,false);
// document.body.addEventListener("click",fn5,false);
// document.body.addEventListener("click",fn6,false);
// document.body.addEventListener("click",fn7,false);
// document.body.addEventListener("click",fn8,false);
// document.body.addEventListener("click",fn9,false);
// document.body.addEventListener("click",fn10,false);
// document.body.addEventListener("click",fn11,false);
// document.body.addEventListener("click",fn12,false);
// document.body.addEventListener("click",fn13,false);


// document.body.attachEvent("onclick",fn1);
// document.body.attachEvent("onclick",fn2);
// document.body.attachEvent("onclick",fn3);
// document.body.attachEvent("onclick",fn4);
// document.body.attachEvent("onclick",fn5);
// document.body.attachEvent("onclick",fn6);
// document.body.attachEvent("onclick",fn7);
// document.body.attachEvent("onclick",fn8);
// document.body.attachEvent("onclick",fn9);
// document.body.attachEvent("onclick",fn10);
// document.body.attachEvent("onclick",fn11);
// document.body.attachEvent("onclick",fn12);
// document.body.attachEvent("onclick",fn13);


//=>attachEvent
//->标准浏览器中
// 1.如果我们绑定的方法重复了,浏览器不会把重复的方法添加到事件池中;
// 2.执行的顺序是按照绑定的顺序(事件池中方法排列的顺序: 标准浏览器中会把后面绑定的方法放在事件池的末尾)依次执行的
// 3.执行事件池中绑定的方法,方法中的this是当前操作的元素;会给方法传递事件对象进来

//=>IE678低版浏览器
// 1.不自动去重
//      浏览器不会自动去重,如果我们给当前元素的某个行为绑定多个重复的方法,那么绑定的所有重复方法都会被执行(在向事件池中存储方法的时候,低版本浏览器没有检测是否重复,所以导致这个结果)
// 2.顺序错乱
//      而且低版本浏览器中在绑定的方法过多的时候,不知道是由于向事件池中增加的时候顺序混乱了,还是执行的时候顺序混乱了,总之执行的顺序和绑定的顺序是没关系的;
// 3.this是window
//      执行方法的时候,方法中的this是window而不是当前元素;事件对象也传递捡来了,但是传递进来的值和window.event一样(和标准浏览器中的事件对象是有区别的);













