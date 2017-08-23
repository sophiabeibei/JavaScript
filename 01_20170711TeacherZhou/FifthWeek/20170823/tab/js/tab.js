//=>我们封装的JQ插件限制结构
//1.选项卡区域中存放点击li的ul必须具备page样式类
//2.存放页卡内容的div必须具备content样式
//只要你的htm结构符合要求,不管样式和内容如何,我们都能实现选项卡的页卡切换;---这就是我们选项卡插件要做的事情;

//=>我们实现这个插件,需要用户使用的时候传递给我们两个参数
//1.想让哪个容器具备选项卡功能,就把容器这个元素[JS对象]传递过来--这个参数也可以不传;(用jQuery时候可以不传)
//2.选传: 默认让第几个展示,不传递让第一个展示

//开始封装   tabPlugin: 选项卡插件   options: 对象
~(function () {
    function tabPlugin(options) {
        options = options || {};
        var preIndex = options.index||0;

        // var $pageList = this.children(".page").children();
        var $pageList = this.find(".page>*"),
            $contentList = this.children(".content");

        //->如果传递的是多个容器,我们内置循环,一个个的处理即可
        this.each(function () {
            //->this: 当前循环的这一项;[JS对象];   each方法中的this都是[JS对象]
//->让默认的选中
            $pageList.eq(prevIndex).addClass("select").siblings().removeClass("select");
            $contentList.eq(prevIndex).addClass("select").siblings(".content").removeClass("select");
            //->点击操作
            $pageList.click(function () {
                //->this: 当前点击的li,[JS对象]
                var curIndex = $(this).index();
                if(preIndex===curIndex) return;
                $(this).addClass("select");
                $contentList.eq(curIndex).addClass("select");

                $pageList.eq(prevIndex).removeClass("select");
                $contentList.eq(prevIndex).removeClass("select");

                prevIndex=curIndex;
            });
        });
    }

    $.fn.extend({tabPlugin: tabPlugin})
})();
// $("#tab1").tabPlugin();
// $("#tab2").tabPlugin({
//     index: 2
// });
$(".tab1").tabPlugin({
    index: 2
});


/*
 JQ中提供的方法有两部分:
 1.在原型上定义的方法,供JQ实例使用(JQ实例一般都是用选择器获取的JQ元素集合)
 2.把JQ当作一个普通对象,定义的私有属性和方法(这些方法一般都是项目中的一些工具包或者常用的方法);

 JQ已经提供很多的方法了,但是也不能说就足够全了,所以为了后期开发者可以增加一些自己的方法,JQ提供了extend方法,帮助开发者在JQ原型或者对象上增加属于自己的方法;
 $.extend({AA:function(){...}}): 在JQ的对象上增加方法$.AA(),这样做一般都是增加更多的公用方法;
 $.fn.extend({BB.function(){...}}): 在JQ的原型上扩展方法$().BB(),这样做一般是给元素用的,我们也基于这个扩展JQ插件;





 */
//->这个插件,基于JQ扩展插件;
//->在jQuery中提供了俩个方法: $.extend();   $.fn.extend();

























