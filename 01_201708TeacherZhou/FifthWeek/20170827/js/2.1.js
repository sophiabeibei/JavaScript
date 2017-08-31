

//----------------------------------------------基础知识

// //=>addEventListener: 标准浏览器中的DOM2级事件绑定
// /**
//  * [event type]: 事件类型
//  * [callBack]: 回调函数;当事件被触发的时候,执行这个回调函数(e也会传递事件对象进来)
//  * [phase]: 方法在哪个阶段执行(传播的方式;控制在哪个阶段执行);false: 冒泡阶段(最常用);true(捕获阶段)
//  */
// document.body.addEventListener("click",function (e) {
//     e=e||window.event;
// },false);
// //捕获阶段基本上没有什么需求;项目中一般不用;所以第三个参数是false;
//
//
// //=>attachEvent: IE低版本浏览器中的DOM2事件绑定
// /**
//  * [event type]: 事件类型(相对于标准来说,需要加on)
//  * [callBack]: 当事件被触发的时候执行回调函数(不会传递事件对象,需要使用window.event获取事件对象信息,和标准下还是有很多的兼容问题)
//  * 没有第三个参数,只能在冒泡阶段被触发执行;
//  */
// document.body.attachEvent("onclick",function (e) {
//     e = window.event;
// });





//----------------------------------------DOM2事件绑定兼容处理 on方法
function on(curEle,type,fn) {
    if(curEle.addEventListener){
        curEle.addEventListener(type,fn,false);
        return;
    }
    //->IE678
    curEle.attachEvent("on"+type,fn);
}



















/**
 * Created by iBei on 2017/8/27.
 */
