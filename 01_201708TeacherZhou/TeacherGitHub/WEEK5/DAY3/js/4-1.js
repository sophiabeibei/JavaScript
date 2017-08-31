$(function () {
    //->把需要操作的元素获取到(smallBox/mark/bigBox/bigBox-img)
    var $smallBox = $('.smallBox'),
        $mark = $smallBox.children('.mark'),//<=>$('.mark',$smallBox[0])
        $bigBox = $('.bigBox'),
        $bigBoxImg = $bigBox.children('img');

    //->鼠标进入SMALL-BOX,控制MARK的显示,同时计算MARK的位置；鼠标移动过程中也随时计算MARK的位置；鼠标离开隐藏MARK；
    function curPosition(e) {
        //->JQ:outerWidth()  JS:offsetWidth
        //->JQ:innerWidth()  JS:clientWidth
        var markW = $mark.outerWidth(),
            markH = $mark.outerHeight();
        var smallBoxOffset = $smallBox.offset();

        //->计算鼠标处于MARK中间的时候,MARK的坐标位置
        var l = e.pageX - smallBoxOffset.left - markW / 2,
            t = e.pageY - smallBoxOffset.top - markH / 2;

        //->边界判断(MARK不可以超过SMALL-BOX的边界)
        var maxT = $smallBox.outerHeight() - markH,
            maxL = $smallBox.outerWidth() - markW;
        l = l < 0 ? 0 : (l > maxL ? maxL : l);
        t = t < 0 ? 0 : (t > maxT ? maxT : t);

        //->设置MARK的位置
        $mark.css({
            left: l,
            top: t
        });
    }

    $smallBox.on('mouseenter', function (e) {
        $mark.css('display', 'block');
        curPosition.call(this, e)
    }).on('mousemove', function (e) {
        curPosition.call(this, e)
    }).on('mouseleave', function (e) {
        $mark.css('display', 'none');
    });
});