// //=>addEventListener:标准浏览器中的DOM2事件绑定
// //->[event type]:事件类型
// //->[callBack]:当事件被触发的时候执行回调函数(也会传递事件对象进来)
// //->[phase]:方法在哪个阶段执行 FALSE:冒泡阶段(最常用) TRUE:(捕获阶段)
// document.body.addEventListener('click', function (e) {
//
// }, false);
//
// //=>attachEvent:IE低版本浏览器中的DOM2事件绑定
// //->[event type]:事件类型(相对于标准来说需要加ON)
// //->[callBack]:当事件被触发的时候执行回调函数(不会传递事件对象,需要使用window.event获取事件对象信息,和标准下还是有很多的兼容问题)
// //->没有第三个参数,只能在冒泡阶段被触发执行
// document.body.attachEvent('onclick', function (e) {
//     e = window.event;
// });

//-------------------------------
//=>ON:DOM2事件绑定兼容处理
function on(curEle, type, fn) {
    if ('addEventListener' in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    curEle.attachEvent('on' + type, fn);
}




