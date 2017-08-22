//高级单利模式
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
    var bannerData = null,//->存储获取的数据信息
        maxNum = 0;//->存储一共有多少张图片(imgBox中li的个数)

    //=>获取数据
    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", "./json/banner.json", false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //=>数据绑定(兼容所有浏览器-普通字符串拼接)
    function bindData() {
        var str = "",
            strFocus = "";
        for (var i = 0; i < bannerData.length; i++) {
            var cur = bannerData[i];
            str += "<li>";
            str += "<a href='" + cur.link + "'>";
            str += "<img src='' data-src='" + cur.img + "'/>";
            str += "</a>";
            str += "</li>";
            /*var cName = i === 0 ? "select" : "";
             strFocus+="<li class='"+cName+"'></li>";*/
            strFocus += "<li></li>";
        }
        focus.innerHTML = strFocus;
        imgBox.innerHTML = str;
        //->数据绑定完成后,获取里面的li和img
        imgBoxList = imgBox.getElementsByTagName("li");
        imgList = imgBox.getElementsByTagName("img");
        focusList = focus.getElementsByTagName("li");

        //->为了实现无缝滚动衔接,把真实的第一张图片,克隆一份一模一样的,放到imgBox末尾;
        var cloneEle = imgBoxList[0].cloneNode(true);//->把子子孙孙都克隆(深度克隆)
        imgBox.appendChild(cloneEle);

        //->修改imgBox(ul)的宽度,需要动态计算;
        utils.css(imgBox, "width", imgBoxList.length * 800);
        maxNum = imgBoxList.length;
    }

    //=>图片延迟加载
    function lazyImg(oImg) {
        if (oImg.isLoad) return;
        var tempImg = new Image;
        //->IE下,onload放在之前才管用
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

    //=>页面加载完成的时候,初始一些操作
    function initLoad() {
        window.onload = function () {
            //->把step对应焦点的li有选中的样式
            utils.addClass(focusList[step], "select");
            //->把所有的图片进行延迟加载
            for (var i = 0; i < imgList.length; i++) {
                lazyImg(imgList[i]);
            }
        }
    }

    //=>轮播图自动轮播
    var step = 0,
        interval = 1000,
        autoTimer = null;

    //=>切换当前的图片(step对应的这一张)
    function changeImg() {
        animate({
            curEle: imgBox,
            target: {
                left: -step * 800
            },
            duration: 300
        });

        //=>焦点对齐                  (同时让当前的焦点跟着对齐)
        //在实现无缝衔接滚动后,我们发现切换到克隆的最后一张,step=4,但是所有焦点li最大索引才是3,此时没有被选中的(此时我们应该让焦点展示第一个)
        var tempStep = step;
        tempStep === maxNum - 1 ? tempStep = 0 : null;
        for (var i = 0; i < focusList.length; i++) {
            i === tempStep ? utils.addClass(focusList[i], "select") : utils.removeClass(focusList[i], "select");
        }
    }

    //=>设置定时器,每间隔interval时间切换下一张
    function autoMove() {
        autoTimer = setInterval(function () {
            //=>无缝滚动的实现原理:
            //->当interval时间过去之后,我们在下一次切换之前,首先判断一下上一次是否到达克隆最后一张了,如果上一次九已经到达了,那么这一次做两件事情:
            //1.首先让imgBox立即回到真实第一张的位置(我们从克隆的第一张立即回到真实的第一张,由于图片是一样的,视觉差导致用户区分不出来我们跳转了)
            //2.让当前的step为0(这样在执行step++后,step为1,接下来切换到第二张即可)
            if (step === maxNum - 1) {//maxNum-1: 最后一张图片的索引;
                step = 0;
                utils.css(imgBox, "left", 0);
            }
            step++;
            //->切换到下一张,执行changeImg();
            changeImg();
        }, interval);
    }

    //=>鼠标进入和离开的操作
    function bindMouseEvent() {
        banner.onmouseenter = function () {
            arrowL.style.display = "block";
            arrowR.style.display = "block";
            clearInterval(autoTimer);
        };
        banner.onmouseleave = function () {
            arrowL.style.display = "none";
            arrowR.style.display = "none";
            autoMove();
        };
    }

    //=>点击焦点切换
    function bindFocusEvent() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            item.index = i;
            item.onclick = function () {
                step = this.index;
                changeImg();
            }
        }
    }

    //=>点击左右按钮实现切换
    function bindArrowEvent() {
        arrowR.onclick = function () {
            if (step === maxNum - 1) {
                step = 0;
                utils.css(imgBox, "left", 0);
            }
            step++;
            changeImg();
        };
        arrowL.onclick = function () {
            if (step === 0) {
                //->说明上一次已经展示第一张了,再切换应该看到的是真实图片的第四张,此时我们两步操作:
                //2.让当前的step为克隆这一张的索引(这样下一次step--的时候,切换到的是真实图片的最后一张)
                step = maxNum - 1;
                //1.让imgBox立即跳转到克隆的那一张位置
                utils.css(imgBox, "left", -step * 800);
            }
            step--;
            changeImg();
        }
    }

    return {
        //=>当前模块的大脑或者神经中枢: 在init方法中,我们去规划与协调方法的执行步骤以及顺序,从而控制整个轮播图的运转;
        init: function () {
            queryData();
            bindData();
            initLoad();
            autoMove();
            bindMouseEvent();
            bindFocusEvent();
            bindArrowEvent();


            //->接下来,浏览器打开的时候,让第一张图片加载显示,让第一个焦点被选中
            //lazyImg();
        }
    }
})();
bannerRender.init();
//基于惰性思想,命令模式,最终封装到一起的是超级模块模式;
