var bannerRender = (function () {
    var banner = document.getElementById('banner'),
        imgBox = utils.byClass('imgBox', banner)[0],
        focus = utils.byClass('focus', banner)[0],
        arrow = utils.byClass('arrow', banner),
        arrowLeft = arrow[0],
        arrowRight = arrow[1],
        imgBoxList = null,
        imgList = null,
        focusList = null;
    var bannerData = null,
        maxNum = 0;

    //=>获取需要展示的数据
    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //=>数据绑定(普通字符串拼接)
    function bindHTML() {
        var str = '',
            strFocus = '';
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str += '<li><a href="' + item.link + '">';
            str += '<img data-src="' + item.img + '">';
            str += '</a></li>';

            strFocus += '<li></li>';
        }
        focus.innerHTML = strFocus;
        imgBox.innerHTML = str;

        //->数据绑定完成后,获取里面的LI以及IMG
        imgBoxList = imgBox.getElementsByTagName('li');
        imgList = imgBox.getElementsByTagName('img');
        focusList = focus.getElementsByTagName('li');

        //->为了实现无缝滚动，我们在绑定数据完成后，把真实的第一张图片克隆一份一模一样的，放在IMG-BOX的末尾
        var cloneEle = imgBoxList[0].cloneNode(true);
        imgBox.appendChild(cloneEle);

        //->修改IMG-BOX的宽度
        utils.css(imgBox, 'width', imgBoxList.length * 1000);
        maxNum = imgBoxList.length;
    }

    //=>图片延迟加载
    function lazyImg(curImg) {
        if (curImg.isLoad) return;
        var tempImg = new Image;
        tempImg.onload = function () {
            curImg.src = tempImg.src;
            tempImg = null;

            zhufengAnimate({
                curEle: curImg,
                target: {opacity: 1},
                duration: 300
            });
        };
        tempImg.src = curImg.getAttribute('data-src');
        curImg.isLoad = true;
    }

    //=>刚开始加载页面完成的时候我们初始一些操作
    function initLoad() {
        window.onload = function () {
            utils.addClass(focusList[step], 'select');

            //->把所有的图片进行延迟加载
            for (var i = 0; i < imgList.length; i++) {
                lazyImg(imgList[i]);
            }
        }
    }

    //----------------------------
    var step = 0,
        interval = 3000,
        autoTimer = null;

    //=>切换当前的图片(切换到STEP对应的这一张)
    function change() {
        zhufengAnimate({
            curEle: imgBox,
            target: {left: -step * 1000},
            duration: 300
        });

        //->焦点对齐
        var tempStep = step;
        tempStep === maxNum - 1 ? tempStep = 0 : null;
        for (var i = 0; i < focusList.length; i++) {
            i === tempStep ? utils.addClass(focusList[i], 'select') : utils.removeClass(focusList[i], 'select');
        }
    }

    //=>设置定时器,每间隔INTERVAL时间切换到下一张
    function autoMove() {
        autoTimer = setInterval(function () {
            if (step === maxNum - 1) {
                step = 0;
                utils.css(imgBox, 'left', 0);
            }
            step++;
            change();
        }, interval);
    }

    //=>实现鼠标进入和离开的操作
    function bindMouseEvent() {
        banner.onmouseenter = function () {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'block';
            clearInterval(autoTimer);
        };

        banner.onmouseleave = function () {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'none';
            autoMove();
        };
    }

    //=>实现点击焦点切换
    function bindFocusEvent() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            item.index = i;
            item.onclick = function () {
                step = this.index;
                change();
            }
        }
    }

    //=>点击左右按钮实现切换
    function bindArrowEvent() {
        arrowRight.onclick = function () {
            if (step === maxNum - 1) {
                step = 0;
                utils.css(imgBox, 'left', 0);
            }
            step++;
            change();
        };

        arrowLeft.onclick = function () {
            if (step === 0) {
                step = maxNum - 1;
                utils.css(imgBox, 'left', -step * 1000);
            }
            step--;
            change();
        };
    }

    //=>事件委托的方式改写左右切换和焦点对齐
    function bindDelegation() {
        banner.onclick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                tarTagName = target.tagName;//->常见浏览器中都是大写

            //->焦点:标签名LI,父元素有FOCUS样式
            if (tarTagName === 'LI' && utils.hasClass(target.parentNode, 'focus')) {
                step = utils.index(target);
                utils.addClass(target, 'select');
                var siblings = utils.siblings(target);
                for (var i = 0; i < siblings.length; i++) {
                    utils.removeClass(siblings[i], 'select');
                }
                change();
                return;
            }

            //->左按钮
            if (tarTagName === 'A' && utils.hasClass(target, 'arrowLeft')) {
                if (step === 0) {
                    step = maxNum - 1;
                    utils.css(imgBox, 'left', -step * 1000);
                }
                step--;
                change();
                return;
            }

            if (tarTagName === 'A' && utils.hasClass(target, 'arrowRight')) {
                if (step === maxNum - 1) {
                    step = 0;
                    utils.css(imgBox, 'left', 0);
                }
                step++;
                change();
            }
        }
    }

    return {
        init: function () {
            queryData();
            bindHTML();
            initLoad();

            autoMove();
            bindMouseEvent();
            // bindFocusEvent();
            // bindArrowEvent();
            bindDelegation();
        }
    }
})();

bannerRender.init();