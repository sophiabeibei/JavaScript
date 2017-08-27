####DOM事件模型
> 在之前的学习中，我们想要给一个元素的某个行为绑定方法，我们都是 `xxx.onxxx=function...` 来操作的，除了这种绑定方式外，我们还有其它的绑定方式
#####DOM0级事件绑定
> document.body.onclick=function(){}
> 原理：给当前元素的某一个私有属性(事件对应的私有属性)赋值的操作，赋的值是一个函数，当后期我们触发相关行为后，浏览器自己会把之前赋值的那个函数执行(传递事件对象)

1、只有在当前元素私有属性中出现的事件属性，我们才可以绑定方法，没出现的绑定不了(例如：DOMContentLoaded事件在元素的私有属性中不存在，所以不能使用DOM0为其绑定方法)
```javascript
document.body.onclick = function(){
	//->可以的
}
document.body.onDOMContentLoaded = function(){
	//->这样写没有用,因为私有属性中没有这个事件属性
}
```

2、为其私有属性赋值，只能赋值一个，也就是说，DOM0事件绑定，只能给当前元素的某一个事件行为绑定一个方法，绑定多个方法，最后绑定的会把前面的都替换掉，只有最后一个绑定的方法有用
```javascript
window.onload=function(){
	console.log('ok');
}
window.onload=function(){
	console.log('no');
}
//->当页面中的资源文件都加载完成后，触发load事件，此时只能把最后一次绑定的方法执行，所以window.onload在同一个页面中我们最好使用一次
```

#####DOM2级事件绑定
> EventTarget.prototype
> [标准]
> addEventListener / removeEventListener
> 绑定和移除绑定的方法
> [IE6~8]
> attachEvent / detachEvent
> 绑定和移除绑定的方法
```javascript
//=>addEventListener:标准浏览器中的DOM2事件绑定
//->[event type]:事件类型
//->[callBack]:当事件被触发的时候执行回调函数(也会传递事件对象进来)
//->[phase]:方法在哪个阶段执行 FALSE:冒泡阶段(最常用) TRUE:(捕获阶段)
document.body.addEventListener('click', function (e) {

}, false);

//=>attachEvent:IE低版本浏览器中的DOM2事件绑定
//->[event type]:事件类型(相对于标准来说需要加ON)
//->[callBack]:当事件被触发的时候执行回调函数(不会传递事件对象,需要使用window.event获取事件对象信息,和标准下还是有很多的兼容问题)
//->没有第三个参数,只能在冒泡阶段被触发执行
document.body.attachEvent('onclick', function (e) {
    e = window.event;
});


//=>ON:DOM2事件绑定兼容处理
function on(curEle, type, fn) {
    if ('addEventListener' in curEle) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    curEle.attachEvent('on' + type, fn);
}
```

> 原理：DOM2和DOM0不一样，用它做事件绑定，是给当前元素的某一个事件行为开辟了一个`事件池(事件队列)` [ 浏览器会自动开辟一个容器,把通过DOM2绑定的方法依次存储在事件池中 ]，所以依托DOM2方式可以`给当前元素的某一个事情行为绑定多个不同的方法`，当行为触发的时候，浏览器会把事件池中的方法`按照绑定的顺序依次执行`，而且`方法中的this是当前操作的元素`

1、DOM2可以给当前元素的某个行为绑定很多个不同的方法
2、很多事件行为DOM0不能绑定的，DOM2都可以绑定，例如：DOMContentLoaded...
```javascript
//=>JQ中的READY
//->READY使用的是DOMContentLoaded事件:当DOM(HTML)结构加载完成就会被触发执行
//->页面中可以使用多次:因为它是基于DOM2事件绑定来实现的,此时可以绑定多个方法,执行一次READY相当于绑定一个方法
$(document).ready(function(){});

//=>window.onload
//->onload事件本身就是所有资源都加载完成才会执行
//->我们此处使用的是DOM0事件绑定,所以只能绑定一次，如果我们改为：
window.addEventListener('load',function(){},false)
//这种方式，也可以在页面中使用多次

//=>DOMContentLoaded事件不支持IE低版本attachEvent方法的绑定，JQ中的READY方法，在IE低版本浏览器中使用的是：document.onreadystatechange事件，当document.readyState === "complete"时候触发回调函数执行
```
> JQ中提供的事件方法都是基于DOM2级事件绑定来完成的
> on
> click
> hover
> delegate
> ...