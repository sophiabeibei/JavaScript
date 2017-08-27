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
//->[callBack]:当事件被触发的时候执行回调函数(也会传递事件对象，但是和标准下的不一样，这里使用的是window.event，有很多的兼容问题)
//->没有第三个参数,只能在冒泡阶段被触发执行
document.body.attachEvent('onclick', function (e) {
    
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

#####DOM2移除事件绑定
> DOM2绑定是把方法放在指定的事件池中，移除绑定也是把方法从事件池中移除掉，移除的时候需要指定具体要移除哪个方法，所以在绑定的时候我们一般都是绑定实名函数而不是匿名函数
```javascript
function fn(){}
document.body.addEventListener('click',fn,false);
//->移除
document.body.removeEventListener('click',fn,false);
```
> DOM0不需要这样处理，因为它要移除事件绑定只需要赋值为null即可
> `document.body.onclick=null`

#####DOM2的兼容处理
> DOM2事件绑定，标准浏览器和IE低版本浏览器中除了语法上的区别，还有其它方面的区别

`THIS问题`
[标准]
执行事件池中绑定的方法，方法中的THIS是当前操作的元素；会给方法传递事件对象进来，事件对象中存在TARGET等属性；
[IE低版本]
执行方法的时候，方法中的THIS是WINDOW而不是当前元素；事件对象也传递进来了，但是传递进来的值和window.event一样（和标准浏览器中的事件对象是有区别的）

`重复问题`
[标准]
如果我们绑定的方法重复了，浏览器不会把重复的方法添加到事件池中
[IE低版本]
如果我们绑定的方法重复了，浏览器没有内置识别重复的机制，导致事件中有重复的方法，执行的时候，一个方法可能会被执行多次

`顺序问题`
[标准]
执行的顺序是按照绑定的顺序（事件池中方法排列的顺序：标准浏览器中会把后面绑定的方法放在事件池的末尾）依次执行的
[IE低版本]
绑定的方法过多的时候，不知道是由于向事件池中增加的时候顺序混乱了，还是执行的时候顺序混乱了，总之执行的顺序和绑定的顺序是没关系的

> 我们DOM2事件兼容处理，其实就是想把IE低版本浏览器中的机制，改变成为和标准浏览器一模一样的机制（只需要处理IE低版本浏览器即可，高版本或者标准浏览器不去做任何特殊处理，按照浏览器默认的机制来运行即可）

IE低版本浏览器之所以出现这些问题，都是内置的事件池机制惹得祸，如果我们想让他和标准的机制一样，我们无法修改内置的东西，只能自己虚造出一个事件池，让虚造的事件池和标准一样，让IE低版本浏览器走我们自己虚造的事件池


