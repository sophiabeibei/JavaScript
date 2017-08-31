// (function () {
//
//     var jQuery = function (selector, context) {
//         return new jQuery.fn.init(selector, context);
//     };
//
//     jQuery.fn = jQuery.prototype = {
//         constructor: jQuery,
//         init:function....
//     };
//
//     window.jQuery = window.$ = jQuery;
// })();

//----------------------------
//=>JQ是基于构造函数模式创建的,jQuery就是一个类,在它的原型上提供了很多的方法,这些方法可以供JQ的实例使用
// jQuery() <==> $([selector], [context])
//->selector:JQ的选择器
//->context:当前获取元素的上下文(限定了获取的范围),如果不传递的话默认是DOCUMENT
//->$()获取的结果是jQuery这个类的一个实例（它可以使用JQ原型上的所有方法），它的结果是一个类数组集合
//->dir(jQuery.prototype)：可以查看JQ原型上的方法

//----------------------------
//=>$([selector])：SELECTOR的类型有三种,三种分别代表不同的意思
//1、STRING字符串类型
//=>JQ选择器,和CSS选择器一样,我们可以通过一系列的规则获取到我们需要的元素或者元素集合(JQ对象[类数组])

//2、元素节点(其它节点也可以)<=>JS原生对象(通过JS内置的方法获取到的结果就被称作为JS原生对象)
//=>把原生JS对象转换为JQ对象( $([JS对象]) => JQ对象 )
//=>$()获取的是JQ对象,它是一个类数组,我们获取某个索引对应的值,这个值就是原生JS对象( $('#box')[0] =>原生JS对象   $('#box').get(0) =>原生JS对象 )

//->JS原生对象:可以调取JS中的内置属性和方法,但是不能使用JQ原型中提供的方法
//box.addClass() //Uncaught TypeError: box.addClass is not a function  addClass是JQ的方法,原生的JS对象不能用
//->JQ对象(JQ实例):它可以使用JQ上的方法,但是不能直接调取原生JS提供的方法

//3、函数
//=>当页面的中的HTML结构加载完成就会执行对应的回调函数（window.onload:当页面中的HTML结构、图片、文字等所有资源都加载完成才会执行），这个操作在一个页面中可以使用多次，互相之间是不冲突的(因为它采用的是DOM2事件绑定)
// $(function () {});
// <==>
// $(document).ready(function () {});
//=>通过此操作可以防止JS在HTML结构加载前加载(假设我们把引用JS放在HEAD中了),而且这样写还可以形成一个私有的作用域

//----------------------------
//=>JQ的方法一共分为两大部分
//1、把JQ作为类,在它原型上有很多的属性和方法,这些是供实例使用的(这里的方法一般都和DOM有些关系) $('#box').addClass('select');
/*
 data
 each：遍历JQ类数组集合中的每一项
 extend：向JQ的原型上扩展方法

 //-----------------------------
 addClass
 hasClass
 removeClass
 toggleClass：所有TOGGLE的都是之前有就是删除,之前没有就是增加
 css

 append / appendTo：向容器的末尾追加元素
 prepend / prependTo：向容器的开头追加元素
 insertAfter
 insertBefore
 clone：把原有的元素克隆一份
 remove
 replaceAll

 attr：设置、批量设置、获取元素的自定义属性的
 removeAttr
 prop：设置、批量设置、获取元素的内置属性的
 removeProp

 children：子级查找(获取当前容器所有的元素子节点)
 find：后代查找(获取当前容器子子孙孙中的元素节点)
 filter：同级查找

 eq：根据索引筛选(JQ对象)
 get：根据索引筛选(JS对象)
 not：非
 contents：根据包含的内容的筛选
 first
 last
 has

 width
 height
 innerHeight
 innerWidth
 outerHeight
 outerWidth
 offset：当前元素距离BODY的上/左偏移
 offsetParent
 position：当前元素距离其父级参照物的上/左偏移
 scrollLeft
 scrollTop：滚动到具体的SCROLL TOP的位置

 html:innerHTML
 text:innerText
 val:value

 prev
 prevAll
 next
 nextAll
 siblings
 index
 parent
 parents

 //-----------------------------
 animate：实现JS动画的  $('#box').stop().animate([target],[duration],[effect],[callBack])
 stop：结束当前正在运行的动画执行下一个动画
 delay：延迟一段时间执行动画
 finish：把上一个动画立即运动到目标位置后在执行后续的动画

 fadeIn
 fadeOut
 fadeToggle
 show
 hide
 toggle
 slideDown
 slideUp
 slideToggle

 //-------------------------------------
 on：绑定事件
 off：移除事件绑定
 one：事件绑定一次，执行一次自动解绑
 bind
 unbind
 trigger
 delegate
 undelegate

 blur
 change
 click
 dblclick
 focus
 hover
 keydown
 keypress
 keyup
 mousedown
 mouseenter
 mouseleave
 mousemove
 mouseout
 mouseover
 mouseup
 resize
 scroll
 select
 load
 unload

 //----------------------------
 serialize：表单序列化
 serializeArray

 //---------------------------
 add：向一个JQ类数组集合中增加新内容
 sort：把类数组集合排序
 splice：删除类数组集合中的某一项
 toArray：把类数组集合转换为数组
 */


//2、把JQ作为一个普通的对象,在它本身上提供一些属性和方法,这些方法一般都是一些常用的工具包,往往和DOM元素没太大的关系  $.ajax()
/*
 $.Callbacks

 $.ajax
 $.getJSON
 $.post

 $.extend

 $.isArray
 $.isEmptyObject
 $.isFunction
 $.isNumeric
 $.isPlainObject
 $.isWindow
 $.isXMLDoc

 $.makeArray

 $.each
 $.map
 $.unique

 $.noConflict

 $.parseJSON
 $.parseXML
 $.trim

 ...
 */