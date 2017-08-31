//=>事件: 它就是一件事情或者一个行为(元素天生自带的行为),即使我们没有编写xxx.onclick = function(){...}这样的代码,元素也有点击事件,当我们点击该元素,也同样会触发事件,只不过什么事都不做而已;

//=>xxx.onclick = function(){...}
//1.事件行为本身
/*
//->[PC]
1.click
2.dblclick
3.mouseover(mouseenter)
4.mouseout(mouseleave)
5.mousemove
6.mousedown
7.mouseup
8.mousewheel: 鼠标滚轮滚动事件

9.keydown
10.keypress
11.keyup

12.load: 加载完成事件 oImg.onload/window.onload...
13.unload / beforeunload
14.error: 加载失败事件
15.scroll: 当滚动条滚动触发事件执行
16.resize: 当窗口大小改变的时候,window.onresize=function(){}当浏览器窗口大小发生改变的时候触发这个事件执行

17.change: 表单内容发生改变
18.focus: 表单获取到焦点(光标)
19.blur: 表单失去焦点
20.select: 表单被选中(下拉框)
21.checked: 表单被选中(单选或者复选按钮)

//->[移动端]
1.input: 等价于PC的keydown/keyup,表单内容输入过程中触发这个事件
2.touchstart / touchmove / touched / touchcancel: 单手指事件
3.gesturestart / gesturechange / gestureend: 多手指事件
....
*/


//2.绑定方法(事件绑定)
//->给事件绑定方法,当事件触发的时候我们能做一些事情(DOM0级事件绑定/DOM2级事件绑定)

//=>DOM0事件绑定: 给元素的某些事件私有属性(onclick: null)赋值的操作,当以后我们触发事件的时候,浏览器会自动找到元素的事件私有属性,然后把后面赋的值执行(赋值一般都是函数)
//->不能给当前元素的某个事件绑定多个方法,只能绑定一个,绑定多个,最后的也会把前面绑定的都覆盖掉;
//->如果私有属性中没有这事件属性,那么我们则无法进行绑定(例如DOMContentLoaded)
document.body.onclick = function () {
    console.log(1);
};
document.body.onclick = function () {
    console.log(2);//->点击的时候只能输出2
};


//->当事件触发的时候,不仅执行了对应绑定的方法,而且还给这个方法默认传递了参数值(事件对象)






//------------------------------------------------------------------------
// //IE下可以: 当关闭浏览器时,会弹出一个提示;
// window.onbeforeunload = function () {
//     alert("NO");
// };


// //window.location.href = "http://www.baidu.com";
// window.onunload = function () {
//     alert("No");
// };


// window.onresize = function () {
//     console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
// };