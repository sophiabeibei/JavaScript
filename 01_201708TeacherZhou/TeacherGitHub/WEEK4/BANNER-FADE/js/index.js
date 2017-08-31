var bannerRender = (function () {
    var bannerData = null,
        banner = document.getElementById('banner'),
        imgBox = utils.byClass('imgBox', banner)[0],
        focus = utils.byClass('focus', banner)[0],
        arrowLeft = utils.byClass('arrowLeft', banner)[0],
        arrowRight = utils.byClass('arrowRight', banner)[0],
        imgList = null,
        itemList = null,
        focusList = null;

    //->获取数据
    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
        maxNum = bannerData.length;//->获取到数据后记录一下一共有多少张
    }

    //->绑定数据
    function bindHTML() {
        var str = '',
            strFocus = '';
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str += '<li>';
            str += '<a href="' + item.link + '">';
            str += '<img src="" data-src="' + item.img + '">';
            str += '</a>';
            str += '</li>';

            var cName = i === step ? 'select' : '';
            strFocus += '<li class="' + cName + '"></li>';
        }

        imgBox.innerHTML = str;
        focus.innerHTML = strFocus;
    }

    //->延迟加载
    function lazyImg(curImg) {
        if (curImg.isLoad) return;
        var tempImg = new Image;
        tempImg.onload = function () {
            curImg.src = tempImg.src;
            tempImg = null;
        };
        tempImg.src = curImg.getAttribute('data-src');
        curImg.isLoad = true;
    }

    //->默认先展示第STEP对应的张
    function show() {
        var first = itemList[step];
        utils.css(first, {zIndex: 1, opacity: 1});
        lazyImg(imgList[step]);
    }

    //-----------------------

    var step = 0,
        maxNum = 0,
        interval = 1000,
        autoTimer = null;

    //->切换图片的基础方法:以后切换图片执行这个方法即可
    function change() {
        //->控制当前层级为一其余的为零
        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            i === step ? utils.css(item, 'zIndex', 1) : utils.css(item, 'zIndex', 0);
        }

        //->控制透明度:当前透明度为变为一,动画完成其余的透明度为零
        zhufengAnimate({
            curEle: itemList[step],
            target: {opacity: 1},
            duration: 500,
            callBack: function () {
                for (var i = 0; i < itemList.length; i++) {
                    i !== step ? utils.css(itemList[i], 'opacity', 0) : null;
                }
            }
        });

        //->加载真实的图片
        lazyImg(imgList[step]);

        //->焦点对齐
        for (i = 0; i < focusList.length; i++) {
            item = focusList[i];
            i === step ? utils.addClass(item, 'select') : utils.removeClass(item, 'select');
        }
    }

    //->开启自动轮播
    function openAuto() {
        autoTimer = setInterval(function () {
            step++;
            step >= maxNum ? step = 0 : null;
            change();
        }, interval);
    }

    //->鼠标滑入滑出BANNER,控制自动轮播的暂停和开启,以及左右按钮的显示隐藏
    function mouseEvent() {
        banner.onmouseenter = function () {
            utils.css(arrowLeft, 'display', 'block');
            utils.css(arrowRight, 'display', 'block');
            clearInterval(autoTimer);
        };

        banner.onmouseleave = function () {
            utils.css(arrowLeft, 'display', 'none');
            utils.css(arrowRight, 'display', 'none');
            openAuto();
        };
    }

    //->点击焦点实现切换
    function focusEvent() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            item.index = i;
            item.onclick = function () {
                step = this.index;
                change();
            }
        }
    }

    //->点击左右按钮切换
    function arrowEvent() {
        arrowLeft.onclick = function () {
            step--;
            step < 0 ? step = maxNum - 1 : null;
            change();
        };

        arrowRight.onclick = function () {
            step++;
            step >= maxNum ? step = 0 : null;
            change();
        };
    }

    return {
        init: function () {
            queryData();
            bindHTML();

            //--------------------

            itemList = utils.children(imgBox, 'li');
            imgList = imgBox.getElementsByTagName('img');
            focusList = utils.children(focus, 'li');
            window.onload = show;

            //--------------------

            openAuto();
            mouseEvent();
            focusEvent();
            arrowEvent();
        }
    }
})();
bannerRender.init();