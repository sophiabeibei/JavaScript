//=>事件对象
//当事件触发的时候,会把绑定的方法执行,不仅执行,而且浏览器还会给这个方法传递一个实参值(真实项目中我们会定义“e/ev”的形参变量接收)

// document.body.onclick = function (e) {
//     console.dir(e);
//     //->MouseEvent：鼠标事件对象(MouseEvent这个类的一个实例)
//     //对象->MouseEvent.prototype->UIEvent.prototype->Event.prototype->Object.prototype
//
//     //Event.prototype
//     //->CAPTURING_PHASE:1 (捕获阶段)
//     //->AT_TARGET:2 (目标位置)
//     //->BUBBLING_PHASE:3 (冒泡阶段)
//
//     //->鼠标事件对象中常用的一些属性
//     //1、clientX / clientY
//     //当前鼠标触发点距离当前窗口(不是BODY:第一屏幕左上角)左上角的X/Y坐标
//
//     //2、pageX / pageY
//     //当前鼠标触发点距离BODY左上角的X/Y坐标
//
//     //3、type
//     //当前触发事件的类型(例如:'click')
//
//     //4、target
//     //事件源(当前鼠标在哪个元素上触发的,那么事件源就是谁,事件的源头)
//     //在IE6~8中没有TARGET只有SRCELEMENT
//
//     //5、preventDefault
//     //阻止事件的默认行为(例如:A标签点击有跳转的行为,表单元素输入的时候有记录前面输入内容的行为,这些都是浏览器的默认行为)
//
//     //6、stopPropagation
//     //阻止事件的冒泡传播
// };

//->在IE6~8中并不像标准浏览器一样,执行方法的时候传递一个事件对象,IE6~8下什么都没传递,事件对象无法通过形参获取
// document.body.onclick = function (e) {
//     //console.log(arguments.length);//->IE6~8：0
//     //=>window.event：IE6~8中,把我们需要的事件对象存储在全局的EVENT属性中了,获取的时候到这个属性中去读取
//
//     e = e || window.event;
//
//     //->由于获取的方式不一样,我们最后获取的结果中兼容性也不一样
//     // clientX / clientY / type ：这些都是兼容的
//
//     //1、target
//     //IE6~8下没有TARGET只有SRCELEMENT，所以说我们如果想获取事件源，我们需要按照如下的写法获取
//     var target = e.target || e.srcElement;
//
//     //2、pageX / pageY
//     //IE6~8没有这两个属性
//     e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
//     e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
//
//     //3、阻止默认行为
//     //IE6~8下没有preventDefault这个方法
//     e.preventDefault ? e.preventDefault() : e.returnValue = false;
//
//     //4、阻止冒泡传播
//     //IE6~8下没有stopPropagation这个方法
//     e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
// };