// $(document).ready(function () {
//     var $tab = $('#tab'),
//         $target = $(target);//->事件源: 当前点击的这个元素
//
//
//         //->分析事件源: 标签名为li,父级元素拥有page样式类
//         if(target.tagName.toUpperCase() === "LI" && $target.parent().hasClass("page")){
//             $target.addClass("select").siblings().removeClass("select").parent().siblings(".content").eq($target.index()).addClass("select").siblings(".content").removeClass("select");
//         }
// });





//--------------------------------------------------------------
$(document).ready(function () {
    var $tab = $('#tab'),
        $target = $(target);//->事件源: 当前点击的这个元素

    //->分析事件源: 标签名为li,父级元素拥有page样式类
    if(target.tagName.toUpperCase() === "LI" && $target.parent().hasClass("page")){
        $target.addClass("select").siblings().removeClass("select").parent().siblings(".content").eq($target.index()).addClass("select").siblings(".content").removeClass("select");
    }
});




















