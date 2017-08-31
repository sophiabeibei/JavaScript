//=>点击I和SPAN(不论哪一个层级中的),都让弟弟中的UL显示或者隐藏
// $(function () {
//     var $multiLevel = $('#multiLevel');
//
//     $multiLevel.click(function (e) {
//         var target = e.target;
//         //->统一事件源:当我们点击I或者SPAN做的事情相同,但是由于事件源不一样,所以编写的代码有区别,为了方便后期操作,我们统一事件源；如果当前点击的是I,我们让TARGET依然等于SPAN；
//         target.tagName === 'I' ? target = $(target).next('span')[0] : null;
//
//         var $target = $(target);
//         //->只要标签名是SPAN,就是我们需要操作的
//         if (target.tagName === 'SPAN') {
//             var $arrow = $target.prev('i'),
//                 $level = $target.next('ul');
//             //->通过JQ获取的结果如果不存在返回的是空集合(不是NULL)
//             if ($arrow.length === 0 || $level.length === 0) return;
//             $level.stop().slideToggle(200);
//             $arrow.toggleClass('show');
//         }
//     });
// });

//---------------------------------------
//=>点击I和SPAN(不论哪一个层级中的),都让弟弟中的UL显示或者隐藏
$(function () {
    var $multiLevel = $('#multiLevel');
    $multiLevel.click(function (e) {
        var target = e.target;
        target.tagName === 'I' ? target = $(target).next('span')[0] : null;
        var $target = $(target);
        if (target.tagName === 'SPAN') {
            var $arrow = $target.prev('i'),
                $level = $target.next('ul');
            if ($arrow.length === 0 || $level.length === 0) return;
            $level.stop().slideToggle(200);
            $arrow.toggleClass('show');

            //->如果当前是展开的,我们本次点击是让其隐藏,此时我们不仅仅把当前的需要隐藏掉,而且我们需要把后代中的UL也都隐藏,并且移除I的SHOW样式
            if (!$arrow.hasClass('show')) {
                $level.find('ul').stop().slideUp(200);
                $level.find('i').removeClass('show');
            }
        }
    });
});













