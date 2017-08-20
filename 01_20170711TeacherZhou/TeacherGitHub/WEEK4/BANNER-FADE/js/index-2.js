var bannerRender = (function () {
    var bannerData = null,
        banner = document.getElementById('banner'),
        imgBox = utils.byClass('imgBox', banner)[0],
        focus = utils.byClass('focus', banner)[0],
        imgList = null,
        itemList = null,
        focusList = null;

    var step = 0,//->记录当前展示图片的索引(步长)
        maxNum = 0,//->记录一共有多少张图片
        interval = 3000,//->控制间隔多长时间切换到下一张(时间因子)
        autoTimer = null;//->存储自动轮播定时器的返回值

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

            var cName = i === 0 ? 'select' : '';
            strFocus += '<li class="' + cName + '"></li>';
        }

        imgBox.innerHTML = str;
        focus.innerHTML = strFocus;
    }

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

    //->change：切换到下一张图片
    /*
     * 让当前STEP对应的这张图片的LI(需要展示的这一张)zIndex=1，然后让其它图片的LI的zIndex=0
     * 让当前需要展示这张图片的LI的透明度从0~1(300MS)，动画完成后让其它图片的LI的透明度为零
     * 不要忘记加载真实的图片
     */
    function change() {
        //->控制zIndex
        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            i === step ? utils.css(item, 'zIndex', 1) : utils.css(item, 'zIndex', 0);
        }

        //->控制透明度
        zhufengAnimate({
            curEle: itemList[step],
            target: {opacity: 1},
            duration: 500,
            callBack: function () {
                //->让其它的LI透明度变为0
                for (var i = 0; i < itemList.length; i++) {
                    i !== step ? utils.css(itemList[i], 'opacity', 0) : null;
                }
            }
        });

        //->加载真实的图片
        lazyImg(imgList[step]);

        //->焦点对齐
        autoFocus();
    }

    //->焦点对齐
    function autoFocus() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            i === step ? utils.addClass(item, 'select') : utils.removeClass(item, 'select');
        }
    }

    return {
        init: function () {
            queryData();
            bindHTML();

            itemList = utils.children(imgBox, 'li');
            imgList = imgBox.getElementsByTagName('img');
            focusList = utils.children(focus, 'li');

            window.onload = function () {
                var first = itemList[0];
                utils.css(first, {
                    zIndex: 1,
                    opacity: 1
                });
                lazyImg(imgList[0]);
            };

            //->自动轮播
            autoTimer = setInterval(function () {
                step++;
                if (step >= maxNum) {
                    step = 0;//->一共有四张(maxNum=4),如果当前step已经大于等于这个值了,后面没有第五张图片,我们此时让其切换到第一张即可
                }
                change();
            }, interval);
        }
    }
})();

bannerRender.init();