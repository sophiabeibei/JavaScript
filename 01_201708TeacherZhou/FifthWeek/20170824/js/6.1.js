//=>购物车案例-需求:
//1.开始购物车列表是隐藏的,点击购物车按钮可以控制列表的显示和隐藏;
//2.点击列表中的每一项,不进行任何操作(真实项目中可能有其它操作,但是列表一般都不消失)
//3.点击除上述元素之外,点击其它任意的元素或者空白处,当前的列表都隐藏;
var $shop = $(".menu>.shop");
$("body").click(function (e) {
    var target = e.target,
        $target = $(target);//->把JS对象转换为JQ对象

    //如果点击的是A,控制列表的显示和隐藏
    //如果点击的是A(购物车按钮: class中包含menuLink)
    if (target.tagName.toUpperCase() === "A" && $target.hasClass("menuLink")) {//.hasClass: JQ的方法,判断是否有这个类名
        $shop.stop().slideToggle(100);//->100ms
        return;
    }

    //->如果点击的是shop中的li,什么事情暂时都不做
    //标签名是li,父级元素包含shop样式类
    if (target.tagName.toUpperCase() === "LI" && $target.parent().hasClass("shop")) {
        return;
    }

    //=>以上两个条件都不成立,说明点击的是其它元素或者空白处,我们隐藏列表
    $shop.stop().slideUp(10);
});


//用JQ来做;