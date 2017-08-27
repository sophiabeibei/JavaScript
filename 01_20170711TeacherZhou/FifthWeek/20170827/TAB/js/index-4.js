//=>我们封装的JQ插件限制结构
//1、选项卡区域中存放点击LI的UL必须具备PAGE样式类
//2、存放页卡内容的DIV必须具备CONTENT
//只要你的HTML结构符合要求,不管样式和内容如何,我们都能实现选项卡的页卡切换

//=>我们实现这个插件,需要用户使用的时候传递给我们两个参数
//1、想让哪个容器具备选项卡功能,就把容器这个元素[JS对象]传递过来 (在JQ中可以不传递)
//2、选传:默认让第几个展示,不传递就让第一个展示

// ~function () {
//     function tabPlugin(options) {
//         var _default = {index: 0};
//         $.each(options, function (key, value) {
//             _default[key] = value;
//         });
//         var index = _default.index;
//         //->THIS:当前要操作的那个容器[JQ对象](可能包含多个容器)
//     }
//     $.fn.extend({tabPlugin: tabPlugin});
// }();
// $('.tab').tabPlugin();

//---------------------------------------
~function () {
    function tabPlugin(options) {
        options = options || {};
        var preIndex = options.index || 0;

        //->THIS:当前要操作的那个容器[JQ对象](可能包含多个容器)
        //->如果传递的是多个容器,我们内置循环,一个个的处理即可
        this.each(function () {
            //->THIS:当前循环的这一项 [JS对象]
            var $pageList = $(this).find('.page>*'),
                $contentList = $(this).children('.content');

            //->让默认的选中
            $pageList.eq(preIndex).addClass('select').siblings().removeClass('select');
            $contentList.eq(preIndex).addClass('select').siblings('.content').removeClass('select');

            //->点击操作
            $pageList.click(function () {
                //->THIS:当前点击的LI[JS对象]
                var curIn = $(this).index();
                if (preIndex === curIn) return;

                $(this).addClass('select');
                $contentList.eq(curIn).addClass('select');

                $pageList.eq(preIndex).removeClass('select');
                $contentList.eq(preIndex).removeClass('select');

                preIndex = curIn;
            });
        });
    }

    $.fn.extend({tabPlugin: tabPlugin});
}();

// $('#tab1').tabPlugin();
//
// $('#tab2').tabPlugin({
//     index: 2
// });

$('.tab').tabPlugin({
    index: 1
});

/*
 JQ中提供的方法有两部分
 1、在原型上定义的方法,供JQ实例使用(JQ实例一般都是用选择器获取的JQ元素集合)
 2、把JQ当做一个普通对象,定义的私有属性和方法(这些方法一般都是项目中的一些工具包或者常用的方法)

 JQ已经提供很多的方法了,但是也不能说就足够全了,所以为了后期开发者可以增加一些自己的方法,JQ提供了EXTEND方法,帮助开发者在JQ的原型或者对象上增加属于自己的方法
 $.extend({AA:function...})：在JQ的对象上增加方法$.AA()，这样做一般都是增加更多的公用方法
 $.fn.extend({BB:function...})：在JQ的原型上扩展方法$().BB()，这样做一般是给元素用的，我们也基于这个扩展JQ插件
 */






















