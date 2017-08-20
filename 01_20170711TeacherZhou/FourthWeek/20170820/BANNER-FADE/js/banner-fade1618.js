//->获取数据
//->绑定数据
//->图片延迟加载

//->单利模式
var bannerRender = (function () {
    var bannerData = null,
        banner = document.getElementById("banner"),
        imgBox = utils.byClass("imgBox", banner)[0],
        focus = utils.byClass("focus", banner)[0],
        imgList = null,
        itemList = null,
        focusList = null,
        arrowLeft = utils.byClass("arrowLeft",banner)[0],
        arrowRight = utils.byClass("arrowRight",banner)[0];

        //->out划出    over划过    enter划入   live离开

    //->AJAX获取JSON数据
    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", "json/banner.json", false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
        maxNum = bannerData.length;
    }

    //->数据绑定(普通字符串拼接)
    function bindData() {
        var str = "",
            strFocus = "";
        for (var i = 0; i < bannerData.length; i++) {
            var curData = bannerData[i];
            str += '<li>';
            str += '<a href="' + curData.link + '" target="_blank">';
            str += '<span>'+curData.desc+'</span>';
            str += '<img src="" data-src="' + curData.img + '" alt="">';
            str += '</a>';
            str += '</li>';
            var cName = i === step ? 'select' : '';
            strFocus += '<li class="' + cName + '"></li>';
        }
        imgBox.innerHTML = str;
        focus.innerHTML = strFocus;

    }

    var step = 0,
        maxNum = 0,
        interval = 3000,
        autoTimer = null;

    //->图片延迟加载
    function lazyImg(curImg) {
        if (curImg.isLoad) return;
        var tempImg = new Image;
        tempImg.onload = function () {
            curImg.src = this.src;
            tempImg = null;
        };
        tempImg.src = curImg.getAttribute("data-src");
        curImg.isLoad = true;
    }
    
    //->执行change方法切换到下一张图片
    function changeImg() {
        //控制当前zIndex层级为一其余为零
        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            i===step?utils.css(item,"zIndex",1): utils.css(item,"zIndex",0);
        }

        //控制opacity透明度: 当前透明度变为一,动画完成其余的透明度为零
        animate({
            curEle: itemList[step],
            target: {
                opacity: 1
            },
            duration: 300,
            callBack: function () {
                //->让其他的li透明度变为0
                for (var i = 0; i < itemList.length; i++) {
                    i!==step?utils.css(itemList[i],"opacity",0):null;

                }
            }
        });

        //->加载真实图片
        lazyImg(imgList[step]);

        //->焦点对齐
        autoFocus();
    }

    //->自动对焦(焦点对齐)
    function autoFocus() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            i===step?utils.addClass(item,"select"):utils.removeClass(item,"select");
        }
    }

    //->开启自动轮播
    function openAuto() {
        autoTimer = setInterval(function () {
            step++;
            if(step>=maxNum){

                //->一共有四张(maxNum=4),如果当前step已经大于等于这个值了,后面没有第五章图片,我们此时让其切换到第一张即可
                step=0;
            }
            changeImg();
        },interval)
    }

    //->鼠标滑入画出banner,控制自动轮播的暂停和开启,以及左右按钮的显示隐藏;
    function mouseEvent() {
        banner.onmouseenter = function () {
            utils.css(arrowLeft,"display","block");
            utils.css(arrowRight,"display","block");
            clearInterval(autoTimer);
        };

        banner.onmouseleave = function () {
            utils.css(arrowLeft,"display","none");
            utils.css(arrowRight,"display","none");
            openAuto();
        }


    }
    
    //->点击焦点实现切换
    function focusEvent() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            item.index = i;
            item.onclick = function () {
                step = this.index;
                changeImg();
            }
        }
    }

    //->点击左右按钮切换
    function arrowEvent() {
        arrowLeft.onclick = function () {
            step--;
            step<0?step=maxNum-1:null;
            changeImg();
        };
        arrowRight.onclick = function () {
            step++;
            step>=maxNum?step=0:null;
            changeImg();
        };
    }



//->获取所有的li,再获取li下的img

//->所谓轮播,就是每间隔多少时间,切换到下一张



    return {
        //->单利模式+命名模式=超级单利模式
        //->这种模式: 基于单利模式的命名模式;
        //->init: 整个单利模式的指挥官,在这里我们协调哪些方法先去执行;哪些事情现在执行,哪些事情后续处理;所有的事情都在init里完成;以后想实现轮播图,直接调用init就可以了;
        init: function () {
            queryData();
            bindData();
            //->绑定完成数据后,我们获取需要的li和img;
            itemList = utils.children(imgBox,"li");
            imgList = imgBox.getElementsByTagName("img");
            focusList = utils.children(focus,"li");

            //->当页面加载(window.onload)成功之后,做两件事情
            // 1.首先让第一个li显示(zIndex=1 opacity=1);
            // 2.再给第一张图片做延迟加载(其他暂时不做),当切换到下一张的时候再做;
            window.onload = function () {
                //->先让第一个li显示
                var first = itemList[step];
                utils.css(first,{
                    zIndex: 1,
                    opacity : 1
                });
                //->再给第一张图片做延迟加载
                lazyImg(imgList[step]);
            };

            //->自动轮播图片
            openAuto();
            //->鼠标滑入画出banner
            mouseEvent();
            //->点击焦点实现切换
            focusEvent();
            //->点击左右按钮切换
            arrowEvent()
        }
    }
})();
bannerRender.init();

//render: 处理的意思
//基于单利模式完成轮播图(bannerRender就是我们的命名空间,轮播图中所有需要做的事情都要写在这个命名空间下)
//->单利模式的技巧:
// 1.每一个要实现的功能,我们都封装为单独的方法;
// 2.把那种需要在多个方法中都要使用的变量,提取到外面;
//因为要兼容所有的浏览器,所以用普通的字符串拼接;不能用es6;es6不兼容;