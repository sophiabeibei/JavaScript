//高级单利模式
var bannerRender = (function () {
    //->使用JQ选择器获取的JQ对象(类数组),我们变量命名的时候一般都加$;
    var $banner = $("#banner"),
        $imgBox = $banner.find(".imgBox"),//->在banner中,通过find方法(JQ的方法)查找后代元素中具有imgBox样式类名的元素;(后代查找)
        $focus = $banner.children(".focus"),//->在banner中,通过children方法(JQ的方法)查找儿子中具有focus样式类名的元素;(子代查找)
        $arrowL = $banner.children(".arrowL"),
        $arrowR = $banner.children(".arrowR"),
        $imgBoxList = null,
        $imgList = null,
        $focusList = null;

    var bannerData = null,
        maxNum = 0;

    function queryData() {
        //->JQ中提供了AJAX获取数据的方法
        $.ajax({
            url: "json/banner.json",
            method: "GET",
            async: false,
            dataType: "json",//->设置返回的数据类型   写json就是得到的结果是json对象,不用toJSON转       json字符串
            success: function (res) {
                //->如果dataType设置为JSON,我们获得的结果res会自动转换为JSON格式的对象,success就是我们成功获取数据后执行的方法;
                bannerData = res;
            }
        });
    }

    function bindData() {
        var str = "",
            strFocus = "";
        //->JQ中提供了一个叫做each的方法,可以遍历数组,类数组,对象等
        $.each(bannerData, function (index, item) {
            //->跟数组的forEach方法的参数想法;forEach的参数是三个(item,index,input)
            //->JQ中的参数是相反的,并且只有俩参数;(index,item)
            str += "<li>";
            str += "<a href='" + item.link + "'>";
            str += "<img data-src='" + item.img + "'/>";
            str += "</a>";
            str += "</li>";

            strFocus += "<li></li>";
        });
        //->把第一张放在末尾在一份
        str += "<li>";
        str += "<a href='" + bannerData[0].link + "'>";
        str += "<img data-src='" + bannerData[0].img + "'/>";
        str += "</a>";
        str += "</li>";
//美好的东西从来不会寻求关注

        //->JQ中提供了一个html方法,等价于原生JS中的innerHTML
        $imgBox.html(str);
        $focus.html(strFocus);

        $imgBoxList = $imgBox.children("li");
        $imgList = $imgBox.find("img");
        $focusList = $focus.children("li");

        // var $clone = $imgBoxList.eq(0).clone(true);
        // console.log($clone);
        // $imgBox.append($clone);
        //->通过JQ方法获取的JQ元素集合不存在DOM映射的机制,增加完成后,原有集合的长度是不改变的,原有集合还需要重新的的获取一遍;
        // $imgBoxList = $imgBox.children("li");
        // $imgList = $imgBox.find("img");

        maxNum = $imgBoxList.length;
        $imgBox.css("width", maxNum * 800);
    }

    function lazyImg(oImg) {
        var isLoad = $(oImg).attr("isLoad");//->通过attr获取的自定义属性值都是字符串(存的时候存储的是布尔true,获取的结果是字符串"true")
        if (isLoad === "true") return;
        var tempImg = new Image;
        tempImg.onload = function () {
            $(oImg).attr("src", tempImg.src);//->attr还可以设置自定义属性(部分内置的属性也可以设置)
            tempImg = null;
        };
        tempImg.src = $(oImg).attr("data-src");//->oImg 原生JS的对象
        //->首先把传递的JS对象转换为JQ对象,然后九可以使用JQ提供的attr方法获取对应的自定义属性值了
        $(oImg).attr({
            isLoad: true
        });//->批量设置自定义属性
    }

    function initLoad() {
        //->使用JQ的on绑定事件,采用的是DOM2事件绑定;(好处: 可以绑定多个方法)
        $(window).on("load", function () {
            // $focusList[0]/$focusList.get(0): 获取到集合中的第一个,但是返回的结果是一个原生JS对象,不能使用JQ方法
            // $focusList.eq(0): 获取到的结果依然是JQ对象,可以继续调取JQ原型上提供的方法
            $focusList.eq(0).addClass("select");

            //->each方法不仅仅在JQ对象上右,在它的原型上也有,使用方法类似
            $imgList.each(function (index, item) {
                //->item是要给原生JS对象(回调函数中的this就是item)
                lazyImg(item);
            });
        });
    }

    var step = 0,
        interval = 1000,
        autoTimer = null;

    function changeImg() {
        //->JQ动画
        //->step: 结束当前正在运行的动画,继续执行下一个动画,不加step,上一个动画JQ默认是不停止的,所以我们每一个都基本上自己加一下
        //->支持4个参数: 1.[target];2.[duration];3.[effect];4.[callBack]
        $imgBox.stop().animate({left: -step * 800}, 300);

        //->JQ超牛X最强大的地方是链式写法(链式写法(原理: )
        //->JQ自带内置循环机制,通过siblings获取的JQ集合中有多个元素,直接执行removeClass方法,JQ内部做了一个循环,给每一个都移除了样式...不仅这个方法,其它的方法也是一样的;
        var temp = step;
        temp === maxNum - 1 ? temp = 0 : null;
        $focusList.eq(temp).addClass("select").siblings().removeClass("select");
        //->链式写法翻译成以下;
        // $focusList.each(function (index, item) {
        //     index===step?$(item).addClass("select"):$(item).removeClass("select");
        // })
    }

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

    function bindMouseEvent() {
        $banner.on("mouseenter", function () {
            //->先通过JQ的add方法把两个JQ对象集合合并成一个,利用JQ的内置循环机制,相当于每一个都设置了css样式
            $arrowL.add($arrowR).css("display", "block");
            clearInterval(autoTimer);
        }).on("mouseleave", function () {
            $arrowL.add($arrowR).css("display", "none");
            autoMove();
        });
    }

    function bindFocusEvent() {
        $focusList.on("click", function () {
            //->this: 当前点击的这个li
            // index: 就是JQ中获取当前li索引的方法
            step = $(this).index();
            changeImg();
        });
    }

    function bindArrowEvent() {
        //->和on("click")一样
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
        init: function () {
            queryData();
            bindData();
            initLoad();
            autoMove();
            bindMouseEvent();
            bindFocusEvent();
            bindArrowEvent();
        }
    }
})();
bannerRender.init();
