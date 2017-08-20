// (function () {
//     /**
//      *
//      * @param selector: jQuery的选择器
//      * @param context: 当前获取元素的上下文(限定了获取的范围),如果不传递的话,默认是document;
//      * @return {jQuery.init}
//      */
//     var jQuery = function( selector, context ) {
//         // The jQuery object is actually just the init constructor 'enhanced'
//         // Need init if jQuery is called (just allow error to be thrown if not included)
//         return new jQuery.fn.init( selector, context );
//     };
//
//
//     jQuery.fn = jQuery.prototype = {
//         constructor : jQuery,
//         init: function () {}
//     };
//     window.jQuery = window.$ = jQuery;
// })();
//jQuery([selector],[context]) <=> $([selector],[context])//->其实就是获得一个类的实例
//---------------------------------jQuery 原理

//->$(): 执行后,获取的结果是 jQuery 这个类的一个实例(它可以使用JQ原型上的所有方法),它的结果是一个类数组集合;

//jQuery 是基于构造函数模式创建的;jQuery 就是一个类;在 jQuery 的原型上,提供了很多的方法;这些方法可以供JQ的实例使用;

//$符执行就是创建了jQuery的实例;

//------------------------jQuery

//=>$([selector]): selector的类型有三种,三种分别代表不同的意思;
    //->第一种: string: 字符串类ing
    //->第二种: 元素节点(其他节点也可以);所谓的节点,通俗讲是JS原生对象(通过JS内置的方法获取到的结果就被成作为JS原生对象);
    //->第三种: 函数;


/*
分别传的字符串,元素节点,函数:
1.字符串
    JQ选择器,和CSS选择器一样,我们可以通过一系列的规则获取到我们需要的元素或者元素集合(JQ对象[类数组]);
        举例:
        格式:





2.元素节点(JS原生对象)

    1.JS原生对象: 可以调取JS中的内置属性和方法;(JS原生对象不能用JQ原型上的方法,只有 jQuery 的实例才能用JQ原型上的方法);
        举例:
        box.addClass(): Uncaught TypeError: box.addClass is not a function;报错的原因: 因为addClass是JQ的方法,原生的JS对象是不能用;
    2.JQ对象(JQ实例就是JQ对象): 它可以使用JQ上的方法,但是不能直接调取原生JS提供的方法

 jQuery不能用用原生JS方法
 原生JS不能用用jQuery方法

    3.把原生JS对象转换成jQuery对象;
        格式: $([JS对象]);   =>jQuery对象
        举例:
            $(box);
    4.把jQuery转换成原生JS对象
        索引为0的是
        $(): 获取的是JQ对象;这是一个类数组;我们获取某个索引对应的值,这个值就是原生JS对象;
        格式: $("#box")[0];   =>原生JS对象






 3.函数
 当页面中的html结构加载完成,就会执行对应的回调函数;(window.onload: 当页面中的html结构,图片,文字等所有资源都加载完成才会执行),这个操作在页面中可以使用多次,互相之间是不冲突的(因为它采用的是DOM2事件绑定)

 这是源码解析:
 //rootjQuery.ready(selector)
 //roootjQuery = jQuery(document)



 //$(function(){});//->function(){}就是回调函数
 //<==>
 //$(document).ready(function(){});
 $(document).ready只要结果加载完成就执行;跟window.onload有区别的(上面一句话解释);


等加载完再执行,可以这么写$(document).ready(function(){})


//=>通过此操作可以防止JS在html结构加载前加载(假设我们把引用JS放在head中了),而且这样写还可以形成一个私有的作用域;(写jQuery的时候,很少有人在jQuery里写闭包)
$(function(){
    console.log(document.getElementById("box"));
});




jQuery也有三种角色:
    1.类
    2.函数
    3.对象

jQuery的方法一共有两部分:
    1.把jQuery作为类;在jQuery的原型上有很多的属性和方法,这些是供实例使用的;(这里的方法一般都和DOM有些关系)
        $()中第一个传一个字符串,是选择器;
        $("#box").addClass("select");//->增加样式类名;  获取的是一个集合,为啥可以用addClass方法呢?一会儿讲;














 Callbacks():
 each():
 filter():
 getJSON: 就是toJSON
 isArray: 检测是不是一个数组
 isEmptyObject:






 isArray
 isEmptyObject
 isFunction
 isNumeric: 是不是一个纯对象







 makeArray: 创建一个类数组



 noConflict
 parseJSON
 parseXML
 post
 trim
 unique



//----------------------
data:
each: 遍历JQ类数组集合中的每一项
extend: 向JQ的原型上扩展方法







 操作集合的
 add
 each
 data
 exted
 find


 eq: 根据索引筛选(依然是JQ对象)
 not: 不包含什么的
 contents: 根据包含的内容的筛选
 get: 根据索引筛选(是个JS对象)











 操作DOM的
 addClass
 append(把子元素添加到父元素)/appendTo(向容器的末尾追加元素)
 attr(设置,批量设置,获取元素的自定义属性)
 clone: 把原有的元素克隆一份;
 children:
 css: 设置样式
 empty:
 fadeIn:
 fadeOut:
 fadeTo:
 fadeToggle(如果当前隐藏,就渐现,如果当前显示就隐藏)



 animate(实现JS动画的
 用法:
 $("#box").animate({xxx:xxx...},1000,[effect],[callBack]))
 delay




 bind(绑定事件)
 blur
 change
 click
 delegate
 detach


 width
 height:
 innerHeight
 innerWidth
 outerHeight
 outerWidth


 offset: 当前元素距离body的上/左偏移
 offsetParent
 position: 当前元素距离其父级参照物的上/左偏移
 scrollLeft
 scrollTop: 滚动到具体的scroll  top的位置;




 //-----------动画的
 animate: 实现动画
 stop: 结束当前正在运行的动画执行下一个动画
 delay: 延迟一段时间执行动画
 finish: 把上一个动画立即运动到目标位置后再执行后续的动画
 fadeIn
 fadeOut
 fadeToggle
 show
 hide
 toggle
 slideDown
 slideUp
 slideToggle

 //----------------事件的
 on: 绑定事件
 off: 移除事件绑定
 one: 事件绑定只一次,执行一次自动解绑
 bind: 绑定事件
 unbind






 blur
 load
 unload


 //---------------表单序列化
 add: 向一个JQ类数组集合中增加新内容
 sort: 把类数组集合排序
 splice: 删除类数组集合中的某一项
 toArray: 把类数组集合转化为数组




    2.把jQuery作为一个普通的对象,在它本身上提供一些属性和方法,这些方法一般都是一些常用的工具包;往往和DOM元素没太多关系;
        $点直接使用;
        $.ajax()


































 */






















