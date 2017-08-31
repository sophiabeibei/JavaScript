//=>点击i和span(不论哪一个层级中的),都让弟弟中的ul显示或者隐藏

//
// $(function () {
//     var $multilevel = $("multilevel");
//
//     $multilevel.click(function (e) {
//         e = e || window.event;
//         var target = e.target;
//
//         //->统一事件源: 当我们点击i  或者span都做同样的事情,但是由于事件源不一样,所以编写的代码有所区别;为了方便后期操作,我们统一事件源;如果当前点击的是i,我们让target依然等于span;
//
//         //->判断事件源i  根据标签名
//         target.tagName === "I" ? target = $(target).next("span")[0] : null;
//         var $target = $(target);
//         //->只要标签名是span,就是我们需要操作的
//         if (target.tagName === "SPAN") {
//             var $arrow = $target.prev("i"),
//                 $level = $target.next("ul");
//             //->通过JQ获取的结果,如果不存在,返回的是一个空集合;不是null;
//             if ($arrow.length === 0 || $level.length === 0) return;
//
//             $level.stop().slideToggle(200);
//             $arrow.toggleClass("show");
//         }
//     });
// });




//-----------------------------------------------

$(function () {
    var $multilevel = $("multilevel");
    $multilevel.click(function (e) {
        e = e || window.event;
        var target = e.target;
        target.tagName === "I" ? target = $(target).next("span")[0] : null;
        var $target = $(target);
        if (target.tagName === "SPAN") {
            var $arrow = $target.prev("i"),
                $level = $target.next("ul");
            if ($arrow.length === 0 || $level.length === 0) return;
            //->如果当前是展示的,我们本次点击是让其隐藏,此时我们不仅仅把当前的需要隐藏掉,而且我们需要把后代中的ul也都隐藏,并且移除i的shouw样式
            if($arrow.hasClass("show")){
                $level.find("ul").stop.slideUp(200);
                $level.find("i").removeClass("show");
            }
            $level.stop().slideToggle(200);
            $arrow.toggleClass("show");
        }
    });
});


























