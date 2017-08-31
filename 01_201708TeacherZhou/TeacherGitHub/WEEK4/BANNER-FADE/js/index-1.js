//=>基于单例模式完成轮播图(BANNER RENDER就是我们的命名空间,轮播图中所有需要做的事情都要写在这个命名空间下)
/*
 * 每一个需要实现的功能,我们都封装为一个单独的方法
 * 把那种需要在多个方法中都要使用的变量提取到外面来
 */
var bannerRender = (function () {
    var bannerData = null,
        banner = document.getElementById('banner'),
        imgBox = utils.byClass('imgBox', banner)[0],
        focus = utils.byClass('focus', banner)[0],
        imgList = null,
        itemList = null,
        focusList = null;

    //->AJAX获取JSON数据
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

    //->数据绑定(普通字符串拼接)
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

    //->图片延迟加载
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

    return {
        //->整个单例模式的指挥官:在这里我们协调哪些方法先去执行,哪些事情现在做,哪些事情后续处理,以后想实现轮播图,直接调用INIT即可
        init: function () {
            queryData();
            bindHTML();

            //->绑定完成数据后,我们获取需要的LI和IMG
            itemList = utils.children(imgBox, 'li');
            imgList = imgBox.getElementsByTagName('img');
            focusList = utils.children(focus, 'li');

            //->当页面加载成功后
            //1、让第一个LI显示(zIndex=1 opacity=1)
            //2、给第一张图片做延迟加载(其它暂时不做)
            window.onload = function () {
                var first = itemList[0];
                utils.css(first, {
                    zIndex: 1,
                    opacity: 1
                });
                lazyImg(imgList[0]);
            };
        }
    }
})();

bannerRender.init();