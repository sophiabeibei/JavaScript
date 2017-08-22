var bannerRender = (function () {
    //=>想要操作哪些元素,就先获取这些元素
    //注意：对于暂时没有的元素,预先留出变量即可
    var banner = document.getElementById('banner'),
        imgBox = utils.byClass('imgBox', banner)[0],
        focus = utils.byClass('focus', banner)[0],
        arrow = utils.byClass('arrow', banner),
        arrowLeft = arrow[0],
        arrowRight = arrow[1],
        imgBoxList = null,
        imgList = null,
        focusList = null;
    var bannerData = null,//->存储我们获取的数据信息
        maxNum = 0;//->存储一共有多少张图片(IMG-BOX中LI的个数)

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
        };
        tempImg.src = curImg.getAttribute('data-src');
        curImg.isLoad = true;
    }

    //=>刚开始加载页面完成的时候我们初始一些操作
    function initLoad() {
        window.onload = function () {
            //->把STEP对应焦点的LI有选中的样式
            utils.addClass(focusList[step], 'select');

            //->把STEP对应LI中的图片进行延迟加载
            lazyImg(imgList[step]);
        }
    }

    //----------------------------
    var step = 0,
        interval = 1000,
        autoTimer = null;

    //=>切换当前的图片(切换到STEP对应的这一张)
    function change() {
        zhufengAnimate({
            curEle: imgBox,
            target: {left: -step * 1000},
            duration: 300
        });

        //->让当前的图片加载
        lazyImg(imgList[step]);

        //->焦点对齐
        //在实现无缝衔接滚动后,我们发现切换到克隆的最后一张,STEP=4,但是所有焦点LI最大索引才是3,此时没有被选中的(此时我们应该让焦点展示第一个)
        var tempStep = step;
        tempStep === maxNum - 1 ? tempStep = 0 : null;
        for (var i = 0; i < focusList.length; i++) {
            i === tempStep ? utils.addClass(focusList[i], 'select') : utils.removeClass(focusList[i], 'select');
        }
    }

    //=>设置定时器,每间隔INTERVAL时间切换到下一张
    function autoMove() {
        autoTimer = setInterval(function () {
            //->当INTERVAL时间过去后,我们在下一次切换之前,首先判断一下上一次是否已经到达克隆的最后一张了,如果上一次就已经到达了,那么这一次
            //1、首先让IMG-BOX立即回到真实第一张的位置(我们从克隆的第一张立即回到真实的第一张,由于图片是一样的,视觉差导致用户区分不出来我们跳转了)
            //2、让当前STEP为0(这样在执行STEP++后,STEP为1,接下来切换到第二张即可)
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
            //->和自动轮播思路一致
            if (step === maxNum - 1) {
                step = 0;
                utils.css(imgBox, 'left', 0);
            }
            step++;
            change();
        };

        arrowLeft.onclick = function () {
            if (step === 0) {
                //->上一次已经展示第一张了,在切换应该看到的是真实图片的第四张,此时我们应该做以下的事情
                //2、让当前的STEP为克隆这一张的索引(这样下一次减减的时候,切换到的是真实图片的最后一张)
                step = maxNum - 1;

                //2、让IMG-BOX立即跳转到克隆的那一张位置
                utils.css(imgBox, 'left', -step * 1000);
            }
            step--;
            change();
        };
    }

    return {
        //=>当前模块的大脑或者神经中枢:在INIT方法中,我们去规划与协调方法的执行步骤以及顺序,从而控制整个轮播图的运转(也是唯一的入口)
        init: function () {
            queryData();
            bindHTML();
            initLoad();

            //------------

            autoMove();
            bindMouseEvent();
            bindFocusEvent();
            bindArrowEvent();
        }
    }
})();

bannerRender.init();