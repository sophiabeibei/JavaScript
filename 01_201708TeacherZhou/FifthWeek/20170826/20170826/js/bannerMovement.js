var bannerRender = (function () {
    var banner = document.getElementById("banner"),
        imgBox = utils.byClass("imgBox", banner)[0],
        imgBoxList = null,
        imgList = null,
        focus = utils.byClass("focus", banner)[0],
        focusList = null,
        arrow = utils.byClass("arrow", banner),
        arrowL = arrow[0],
        arrowR = arrow[1];
    var bannerData = null,
        maxNum = 0;

    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", "json/banner.json", false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    function bindData() {
        var str = "",
            strFocus = "";
        for (var i = 0; i < bannerData.length; i++) {
            var cur = bannerData[i];
            str += "<li>";
            str += "<a href='" + cur.link + "'>";
            str += "<img src='' data-src='" + cur.img + "' alt=''/>";
            str += "</a>";
            str += "</li>";
            strFocus += "<li></li>";
        }
        imgBox.innerHTML = str;
        focus.innerHTML = strFocus;
        imgBoxList = imgBox.getElementsByTagName("li");
        imgList = imgBox.getElementsByTagName("img");
        focusList = focus.getElementsByTagName("li");
        var cloneEle = imgBoxList[0].cloneNode();
        utils.css(cloneEle, "width", imgBoxList.length * 800)
    }

    function lazyImg(oImg) {
        if (oImg.isLoad) return;
        var tempImg = new Image;
        tempImg.onload = function () {
            oImg.src = this.src;
            tempImg = null;
            animate({
                curEle: oImg,
                target: {
                    opacity: 1
                },
                duration: 300
            });
        };
        tempImg.src = oImg.getAttribute("data-src");
        oImg.isLoad = true;
    }

    function initLoad() {
        window.onload = function (e) {
            e = e || window.event;
            for (var i = 0; i < imgList.length; i++) {
                lazyImg(imgList[i]);
            }
        };
    }

    var step = null,
        autoTimer = null,
        interval = 1000;

    function autoMOve() {
        autoTimer = setInterval(function () {
            animate({
                curEle: imgBox,
                target: {
                    left: -step * 800
                },
                duration: 300
            });
        }, interval);
        step++;
    }

    function bindMouseEvent() {

    }

    function bindFocusEvent() {

    }

    function bindArrowEvent() {
        banner.onmouseenter = function () {
            arrowL.style.display = "block";
            arrowR.style.display = "block";
            clearInterval(autoTimer);
        };
        banner.onmouseleave = function () {
            arrowL.style.display = "none";
            arrowR.style.display = "none";
            autoMOve();
        };
    }

    return {
        init: function () {
            queryData();
            bindData();
            initLoad();
        }
    }
})();
bannerRender.init();
