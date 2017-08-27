// $(document).ready(function () {
//     var $tab = $('#tab');
//
//     //=>事件代理:把所有的点击行为操作都委托给外层TAB容器
//     $tab.click(function (e) {
//         //->JQ已经完成了E的兼容处理,我们按照标准的使用即可
//         var target = e.target,
//             $target = $(target);//->事件源:当前点击的这个元素
//
//         //->分析事件源：标签名为LI、父级元素拥有PAGE样式类
//         if (target.tagName.toUpperCase() === 'LI' && $target.parent().hasClass('page')) {
//             $target.addClass('select')
//                 .siblings().removeClass('select')
//                 .parent().siblings('.content')
//                 .eq($target.index()).addClass('select')
//                 .siblings('.content').removeClass('select');
//             return;
//         }
//
//         if (target.tagName.toUpperCase() === 'LI' && $target.parent().parent().hasClass('content')) {
//             $target.css('color', 'lightblue');
//         }
//     });
// });

//----------------------
$(document).ready(function () {
    var $tab = $('#tab');

    //=>把点击行为委托给TAB,如果触发的是TAB后代中 ‘.page>li’ 这个选择器匹配的元素,就执行后面绑定的方法
    $tab.delegate('.page>li', 'click', function () {
        //->THIS:事件源
        $(this).addClass('select')
            .siblings().removeClass('select')
            .parent().siblings('.content')
            .eq($(this).index()).addClass('select')
            .siblings('.content').removeClass('select');
    });
});
