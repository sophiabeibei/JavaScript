//=>事件：他就是一件事情或者一个行为(元素天生自带的行为)，即使我们没有编写 xxx.onclick=function(){...}这样的代码，元素也有点击事件，当我们点击该元素，也同样会触发事件，只不过什么事都不做而已

//=>xxx.onclick=function(){...}
//1、事件行为本身
//->[PC]
// click
// dblclick
// mouseover(mouseenter)
// mouseout(mouseleave)
// mousemove
// mousedown
// mouseup
// mousewheel：鼠标滚轮滚动事件

// keydown
// keypress
// keyup

// load：加载完成事件 oImg.onload / window.onload ...
// unload / beforeunload
// error：加载失败事件
// scroll：当滚动条滚动触发事件执行
// resize：当窗口大小发生改变的时候  window.onresize=function(){}当浏览器窗口大小发生改变的时候触发这个事件执行

// change：表单内容发生改变
// focus：表单获取到焦点(光标)
// blur：表单失去焦点
// select：表单被选中(下拉框)
// checked：表单被选中(单选或者复选按钮)

//->[移动端]
// input：等价于PC的keydown/keyup，表单内容输入过程中触发这个事件
// touchstart / touchmove / touchend / touchcancel：单手指事件
// gesturestart / gesturechange / gestureend ：多手指事件
// ...

//2、绑定方法(事件绑定)
//->给事件绑定方法，当事件触发的时候我们能做一些事情（DOM0级事件绑定 / DOM2级事件绑定）

//=>DOM0事件绑定：给元素的某些事件私有属性(onclick:null)赋值的操作，当以后我们触发事件的时候，浏览器会自动找到元素的事件私有属性，然后把后面赋的值执行(赋值一般都是函数)
//->不能给当前元素的某一个事件绑定多个方法，只能绑定一个，绑定多个，最后的也会把前面绑定的都覆盖掉
//->如果私有属性中没有这事件属性，那么我们则无法进行绑定(例如:DOMContentLoaded)
// document.body.onclick = function () {
//     console.log(1);
// };
// document.body.onclick = function () {
//     console.log(2);//->点击的时候只能输出2
// };

//->当事件触发的时候不仅执行了对应绑定的方法，而且还给这个方法默认传递了参数值(事件对象)