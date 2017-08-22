var bannerRender = (function () {
    var $banner = $("#banner"),
        $imgBox = $banner.find('.imgBox'),
        $focus = $banner.children('.focus'),
        $arrowLeft = $banner.children('.arrowLeft'),
        $arrowRight = $banner.children('.arrowRight'),
        $imgBoxList = null,
        $imgList = null,
        $focusList = null;
    var maxNum = 0,
        $bannerPlan = $.Callbacks();
    var step = 0,
        interval = 3000,
        autoTimer = null;

    $bannerPlan.add(bindData);
    function bindData() {
        var callBack = function (bannerData) {
            var str = '',
                strFocus = '';
            $.each(bannerData, function (index, item) {
                str += '<li><a href="' + item.link + '">';
                str += '<img data-src="' + item.img + '">';
                str += '</a></li>';
                strFocus += '<li></li>';
            });
            str += '<li><a href="' + bannerData[0].link + '">';
            str += '<img data-src="' + bannerData[0].img + '">';
            str += '</a></li>';
            $imgBox.html(str);
            $focus.html(strFocus);

            $imgBoxList = $imgBox.children('li');
            $imgList = $imgBox.find('img');
            $focusList = $focus.children('li');

            maxNum = $imgBoxList.length;
            $imgBox.css('width', maxNum * 1000);
        };
        $.ajax({
            url: 'json/banner.json',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: callBack
        });
    }

    $bannerPlan.add(function () {
        $(window).on('load', function () {
            $focusList.eq(0).addClass('select');
            $imgList.each(function (index, item) {
                lazyImg(item);
            });
        });
    });
    function lazyImg(curImg) {
        var isLoad = $(curImg).attr('isLoad');
        if (isLoad === 'true') return;
        var temp = new Image;
        temp.onload = function () {
            $(curImg).attr('src', temp.src);
            temp = null;
        };
        temp.src = $(curImg).attr('data-src');
        $(curImg).attr({
            isLoad: true
        });
    }

    function change() {
        $imgBox.stop().animate({left: -step * 1000}, 300);
        var temp = step;
        temp === maxNum - 1 ? temp = 0 : null;
        $focusList.eq(temp).addClass('select').siblings().removeClass('select');
    }

    $bannerPlan.add(autoMove);
    function autoMove() {
        autoTimer = setInterval(function () {
            if (step === maxNum - 1) {
                $imgBox.css('left', 0);
                step = 0;
            }
            step++;
            change();
        }, interval);
    }

    $bannerPlan.add(bindMouseEvent);
    function bindMouseEvent() {
        $banner.on('mouseenter', function () {
            $arrowLeft.add($arrowRight).css('display', 'block');
            clearInterval(autoTimer);
        }).on('mouseleave', function () {
            $arrowLeft.add($arrowRight).css('display', 'none');
            autoMove();
        });
    }

    $bannerPlan.add(bindFocusEvent);
    function bindFocusEvent() {
        $focusList.on('click', function () {
            step = $(this).index();
            change();
        });
    }

    $bannerPlan.add(bindArrowEvent);
    function bindArrowEvent() {
        $arrowLeft.click(function () {
            if (step === 0) {
                step = maxNum - 1;
                $imgBox.css('left', -step * 1000);
            }
            step--;
            change();
        });

        $arrowRight.click(function () {
            if (step === maxNum - 1) {
                $imgBox.css('left', 0);
                step = 0;
            }
            step++;
            change();
        });
    }

    return {
        init: $bannerPlan.fire
    }
})();
bannerRender.init();