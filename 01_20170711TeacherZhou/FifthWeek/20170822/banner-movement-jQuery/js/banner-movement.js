var bannerRender = (function () {
    var $banner = $("#banner"),
        $imgBox = $banner.find(".imgBox"),
        $focus = $banner.children(".focus"),
        $arrowL = $banner.children(".arrowL"),
        $arrowR = $banner.children(".arrowR"),
        $imgBoxList = null,
        $imgList = null,
        $focusList = null;
    var maxNum = 0,
        $bannerPlan = $.Callbacks();
    var step = 0,
        interval = 1000,
        autoTimer = null;
    $bannerPlan.add(bindData);
    function bindData() {
        var callBack = function(bannerData){
            var str = "",
                strFocus = "";
            $.each(bannerData, function (index, item) {
                str += "<li>";
                str += "<a href='" + item.link + "'>";
                str += "<img data-src='" + item.img + "'/>";
                str += "</a>";
                str += "</li>";
                strFocus += "<li></li>";
            });
            str += "<li>";
            str += "<a href='" + bannerData[0].link + "'>";
            str += "<img data-src='" + bannerData[0].img + "'/>";
            str += "</a>";
            str += "</li>";
            $imgBox.html(str);
            $focus.html(strFocus);
            $imgBoxList = $imgBox.children("li");
            $imgList = $imgBox.find("img");
            $focusList = $focus.children("li");
            maxNum = $imgBoxList.length;
            $imgBox.css("width", maxNum * 800);
        };
        $.ajax({
            url: "json/banner.json",
            method: "GET",
            async: false,
            dataType: "json",
            success: callBack
        });
    }
    $bannerPlan.add(function () {
        $(window).on("load", function () {
            $focusList.eq(0).addClass("select");
            $imgList.each(function (index, item) {
                lazyImg(item);
            });
        });
    });
    function lazyImg(oImg) {
        var isLoad = $(oImg).attr("isLoad");
        if (isLoad === "true") return;
        var tempImg = new Image;
        tempImg.onload = function () {
            $(oImg).attr("src", tempImg.src);
            tempImg = null;
        };
        tempImg.src = $(oImg).attr("data-src");
        $(oImg).attr({
            isLoad: true
        });
    }
    function changeImg() {
        $imgBox.stop().animate({left: -step * 800}, 300);
        var temp = step;
        temp === maxNum - 1 ? temp = 0 : null;
        $focusList.eq(temp).addClass("select").siblings().removeClass("select");
    }

    $bannerPlan.add(autoMove);
    function autoMove() {
        autoTimer = setInterval(function () {
            if (step === maxNum - 1) {
                $imgBox.css("left", 0);
                step = 0
            }
            step++;
            changeImg();
        }, interval)
    }
    $bannerPlan.add(bindMouseEvent);
    function bindMouseEvent() {
        $banner.on("mouseenter", function () {
            $arrowL.add($arrowR).css("display", "block");
            clearInterval(autoTimer);
        }).on("mouseleave", function () {
            $arrowL.add($arrowR).css("display", "none");
            autoMove();
        });
    }
    $bannerPlan.add(bindFocusEvent);
    function bindFocusEvent() {
        $focusList.on("click", function () {
            step = $(this).index();
            changeImg();
        });
    }
    $bannerPlan.add(bindArrowEvent);
    function bindArrowEvent() {
        $arrowL.click(function () {
            if (step === 0) {
                step = maxNum - 1;
                $imgBox.css("left", -step * 800);
            }
            step--;
            changeImg();
        });
        $arrowR.click(function () {
            if (step === maxNum - 1) {
                $imgBox.css("left", 0);
                step = 0;
            }
            step++;
            changeImg();
        });
    }
    return {
        init: $bannerPlan.fire
    }
})();
bannerRender.init();
