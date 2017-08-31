$(function () {
    var $smallBox = $('.smallBox'),
        $mark = $smallBox.children('.mark'),
        $bigBox = $('.bigBox'),
        $bigBoxImg = $bigBox.children('img');

    //=>计算MARK位置
    function curPosition(e) {
        var markW = $mark.outerWidth(),
            markH = $mark.outerHeight();
        var smallBoxOffset = $smallBox.offset();
        var l = e.pageX - smallBoxOffset.left - markW / 2,
            t = e.pageY - smallBoxOffset.top - markH / 2;
        var maxT = $smallBox.outerHeight() - markH,
            maxL = $smallBox.outerWidth() - markW;
        l = l < 0 ? 0 : (l > maxL ? maxL : l);
        t = t < 0 ? 0 : (t > maxT ? maxT : t);
        $mark.css({
            left: l,
            top: t
        });

        //->控制大图在BIG-BOX中的位置是MARK在SMALL-BOX中位置的三倍(横竖都是三倍,但是方向是相反的)
        $bigBoxImg.css({
            left: -l * 3,
            top: -t * 3
        });
    }

    $smallBox.on('mouseenter', function (e) {
        $mark.css('display', 'block');
        $bigBox.css('display', 'block');
        curPosition.call(this, e)
    }).on('mousemove', curPosition).on('mouseleave', function (e) {
        $mark.css('display', 'none');
        $bigBox.css('display', 'none');
    });
});

