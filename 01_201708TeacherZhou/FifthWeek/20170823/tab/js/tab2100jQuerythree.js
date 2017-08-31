$(function(){
    $("#tab>.page>li").click(function () {
        $(this).addClass("select").siblings().removeClass("select").parent().siblings(".content").eq($(this).index()).addClass("select").siblings(".content").removeClass("select");
    });
});


// 选项卡
//这是jQuery版本的第三种方法: 运用强大的链式写法,一行搞定;


