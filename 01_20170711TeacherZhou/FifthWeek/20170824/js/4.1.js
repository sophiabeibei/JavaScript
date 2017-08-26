$(function () {
    //->把需要操作的元素获取到(smallBox/mark/bigBox/bigBox-img)
    var $smallBox = $(".smallBox"),
        $mark = $smallBox.children(".mark"),
        $bigBox = $(".bigBox"),
        $bigBoxImg = $bigBox.children("img");

    //->鼠标进入small-box,控制mark的显示,同时计算mark的位置;鼠标移动过程中也随时计算mark的位置;鼠标离开隐藏mark;

    //->计算mark的位置
    function curPosition(e) {
        //->JQ中的outerWidth()<=>JS中的offsetWidth
        //->JQ中的innerWidth()<=>JS中的clientWidth
        var markW = $mark.outerWidth(),
            markH = $mark.outerHeight();
        var smallBoxOffset = $smallBox.offset();

        //->计算鼠标处于mark中间的时候,mark的坐标位置
        var l = e.pageX - smallBoxOffset.left - markW / 2,
            t = e.pageY - smallBoxOffset.top - markH / 2;

        //->边界判断(mark不可以超过smallBox的边界)
        var maxT = $smallBox.outerHeight() - markH,
            maxL = $smallBox.outerWidth() - markW;
        l = l < 0 ? 0 : (l > maxL ? maxL : l);
        t = t < 0 ? 0 : (t > maxT ? maxT : t);
        $mark.css({
            left: l,
            tip: t
        });
        //->控制大图再bigBox的位置是mark再smallBox中位置的三倍(横竖都是三倍,但是方向是相反的)
        $bigBoxImg.css({
            left: -l * 3,
            top: -t * 3
        });
    }

    $smallBox.on("mouseenter", function (e) {
        $mark.css("display", "block");
        $bigBox.css("display", "block");
        curPosition.call(this, e);
    }).on("mousemove", curPosition).on("mouseout", function (e) {
        $mark.css("display", "none");
        $bigBox.css("display", "none");
    });
});
