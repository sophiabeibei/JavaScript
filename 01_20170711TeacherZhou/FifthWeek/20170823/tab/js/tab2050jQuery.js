//=>当html加载完成后再触发回调函数执行
// $(function(){});<=>$(document).ready(function(){});他俩一样
$(document).ready(function(){
    var $tab = $("#tab"),
        $pageList = $tab.find(".page>li"),
        $contentList = $tab.children(".content");
    $pageList.click(function () {
        //->this: 当前点击的这个li,[JS对象][不能用JQ的方法,要转]
        //->this: 当前点击的这个li,[JS对象][不能用JQ的方法,要转]
        $(this).addClass("select").siblings().removeClass("select");
        var curIndex = $(this).index();//->当前点击li的索引
        $contentList.eq(curIndex).addClass("select").siblings(".content").removeClass("select");

    });
    //这个绑定$pageList.on("click")<=>$pageList.click(function () {});他俩意思一样
});



/*
知识点:
    find: 后代筛选
    children: 子代筛选
    JQ存在内置循环机制: $pageList.click相当于给集合中的每一项分别绑定了click事件,不需要我们自己写循环,JQ内部原理中自动就循环处理了
    JQ拥有强大的链式写法,执行一个方法返回值还是JQ的一个实例,这样可以继续调取其它的JQ方法,形成一个长链;
    JQ集合中通过索引获取具体的一项有三种办法:
        1.$xxx[0]/$xxx.get(0): 得到的结果是一个JS对象;
        2.$xxx.eq(0): 得到的结果依然是一个JQ对象;



*/

// 选项卡
//这是jQuery版本第一种方法: $contentList.eq()


