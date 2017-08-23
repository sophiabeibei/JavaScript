//=>当html加载完成后再触发回调函数执行
$(document).ready(function(){
    var $tab = $("#tab"),
        $pageList = $tab.find(".page>li"),
        $contentList = $tab.children(".content");
    $pageList.click(function () {
        $(this).addClass("select").siblings().removeClass("select");
        var curIndex = $(this).index();
        $contentList.each(function (index, item) {
            //->item === this: 当前遍历的这一项[JS对象][转换成JQ对象才能用]
            index === curIndex?$(item).addClass("select"): $(item).removeClass("select");
        })
    });
});




//---------------------------------
//=>使用preIndex记录上一个被选中的方式自己回去用JQ实现即可


/*
知识点:
    find: 后代筛选
    children: 子代筛选
    JQ存在内置循环机制: $pageList.click相当于给集合中的每一项分别绑定了click事件,不需要我们自己写循环,JQ内部原理中自动就循环处理了
    JQ拥有强大的链式写法,执行一个方法返回值还是JQ的一个实例,这样可以继续调取其它的JQ方法,形成一个长链;
    JQ集合中通过索引获取具体的一项有三种办法:
        1.$xxx[0]/$xxx.get(0): 得到的结果是一个JS对象;
        2.$xxx.eq(0): 得到的结果依然是一个JQ对象;
    JQ的原型上提供一个教宗each的方法: 我们通过选择器得到一个JQ元素对象集合,each方法可以循环这个集合中的每一项;


*/

// 选项卡
//这是jQuery版本的第二种方法: $contentList.each方法()


