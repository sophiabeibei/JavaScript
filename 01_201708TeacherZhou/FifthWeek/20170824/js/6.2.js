//=>购物车案例-需求:
//1.开始购物车列表是隐藏的,点击购物车按钮,可以控制列表的显示和隐藏;
//2.点击列表中的每一项,不进行任何操作(真实项目中可能有其它操作,但是列表一般都不消失)
//3.点击除上述元素之外,点击其它任意的元素或者空白处,当前的列表都隐藏;
var $shop = $(".menu>.shop");
$("body").click(function (e) {
    var target = e.target,
        $target = $(target);//->把JS对象转换为JQ对象

    //如果点击的是A(购物车按钮),控制列表的显示和隐藏
    //判断class中是否包含menuLink
    if (target.tagName.toUpperCase() === "A" && $target.hasClass("menuLink")) {
        $shop.stop().slideToggle(100);
        return;
    }
    $shop.stop().slideUp(100);
});
$shop.children("li").click(function (e) {
    //->阻止冒泡传播: 不让其执行body上的那一套
    e.stopPropagation();
});

//这个案例:
// 是用JQ的第二种方法: e.stopPropagation()实现的;
//on方法的实现原理  周日带着学生封装;