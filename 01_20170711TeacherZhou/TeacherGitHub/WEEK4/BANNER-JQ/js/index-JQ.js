var bannerRender = (function () {
    //->使用JQ选择器获取的JQ对象(类数组),我们变量命名一般都加$
    var $banner = $("#banner"),
        $imgBox = $banner.find('.imgBox'),//->在BANNER中,通过FIND方法查找后代元素中具有imgBox样式类名的元素(后代查找)
        $focus = $banner.children('.focus'),//->在BANNER中,通过CHILDREN方法查找儿子中具有focus样式类名的元素(子代查找)
        $arrowLeft = $banner.children('.arrowLeft'),
        $arrowRight = $banner.children('.arrowRight'),
        $imgBoxList = null,
        $imgList = null,
        $focusList = null;
    var bannerData = null,
        maxNum = 0;

    function queryData() {
        //->JQ中提供了AJAX获取数据的方法
        $.ajax({
            url: 'json/banner.json',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (res) {
                //->如果DATA-TYPE设置为JSON,我们获取的结果RES会自动转换为JSON格式的对象,SUCCESS就是我们成功获取数据后执行的方法
                bannerData = res;
            }
        });
    }

    function bindHTML() {
        var str = '',
            strFocus = '';
        //->JQ中提供了一个叫做EACH的方法,可以遍历数组、类数组、对象等
        //ary.forEach(function(item,index){})
        $.each(bannerData, function (index, item) {
            str += '<li><a href="' + item.link + '">';
            str += '<img data-src="' + item.img + '">';
            str += '</a></li>';

            strFocus += '<li></li>';
        });
        //->把第一张放在末尾在一份(无缝滚动)
        str += '<li><a href="' + bannerData[0].link + '">';
        str += '<img data-src="' + bannerData[1].img + '">';
        str += '</a></li>';

        //->JQ中提供了一个HTML方法,等价于原生JS中的innerHTML
        $imgBox.html(str);
        $focus.html(strFocus);

        $imgBoxList = $imgBox.children('li');
        $imgList = $imgBox.find('img');
        $focusList = $focus.children('li');

        // var $clone = $imgBoxList.eq(0).clone(true);
        // $imgBox.append($clone);
        // //->通过JQ方法获取的JQ元素集合不存在DOM映射的机制,增加完成后,原有集合的长度是不改变的,原有集合还需要重新的获取一遍
        // $imgBoxList = $imgBox.children('li');
        // $imgList = $imgBox.find('img');

        maxNum = $imgBoxList.length;
        $imgBox.css('width', maxNum * 1000);
    }

    function lazyImg(curImg) {
        var isLoad = $(curImg).attr('isLoad');//->通过ATTR获取的自定义属性值都是一个字符串(存的时候存储的是TRUE,获取的结果是'TRUE')
        if (isLoad === 'true') return;

        var temp = new Image;
        temp.onload = function () {
            $(curImg).attr('src', temp.src);//->ATTR还可以设置自定义属性(部分内置的属性也可以设置)
            temp = null;
        };
        temp.src = $(curImg).attr('data-src');//->首先把传递的JS对象转换为JQ对象,然后就可以使用JQ提供的ATTR方法获取对应的自定义属性值了
        $(curImg).attr({
            isLoad: true
        });//->批量设置自定义属性
    }

    function initLoad() {
        //->使用JQ的ON绑定事件,采用的是DOM2事件绑定(可以绑定多个方法)
        $(window).on('load', function () {
            //$focusList[0] / $focusList.get(0)：获取到集合中的第一个,但是返回的结果是一个原生JS对象,不能使用JQ方法
            //$focusList.eq(0)：获取到的结果依然是JQ对象,可以继续调取JQ原型上提供的方法
            $focusList.eq(0).addClass('select');

            //->EACH方法不仅仅在JQ对象上有,在它的原型上也有,使用方法类似
            $imgList.each(function (index, item) {
                //->ITEM是一个原生JS对象（回调函数中的THIS就是ITEM）
                lazyImg(item);
            });
        });
    }

    //-------------

    var step = 0,
        interval = 3000,
        autoTimer = null;

    function change() {
        //->JQ动画
        //STOP：结束当前正在运行的动画,继续执行下一个动画,不加STOP,上一个动画JQ默认是不停止的,所以我们每一次都基本上自己加一下
        //ANIMATE：[TARGET]、[DURATION]、[EFFECT]、[CALLBACK]
        $imgBox.stop().animate({left: -step * 1000}, 300);

        //->JQ超牛X的链式写法
        //->JQ自带内置循环机制,通过SIBLINGS获取的JQ集合中有多个元素,直接执行REMOVE CLASS方法,JQ内部做了一个循环,给每一个都移除了样式...
        var temp = step;
        temp === maxNum - 1 ? temp = 0 : null;
        $focusList.eq(temp).addClass('select').siblings().removeClass('select');
        // $focusList.each(function (index, item) {
        //     index === step ? $(item).addClass('select') : $(item).removeClass('select');
        // });
    }

    function autoMove() {
        autoTimer = setInterval(function () {
            if (step === maxNum - 1) {
                $imgBox.css('left', 0);
                step = 0;
            }
            step++;
            change();
        }, interval);
    }

    function bindMouseEvent() {
        $banner.on('mouseenter', function () {
            //->先通过JQ的ADD方法把两个JQ对象集合合并成一个,利用JQ的内置循环机制,相当于每一个都设置了CSS样式
            $arrowLeft.add($arrowRight).css('display', 'block');
            clearInterval(autoTimer);
        }).on('mouseleave', function () {
            $arrowLeft.add($arrowRight).css('display', 'none');
            autoMove();
        });
    }

    function bindFocusEvent() {
        $focusList.on('click', function () {
            //->this:当前点击的这个LI
            //index就是JQ中获取当前LI索引的方法
            step = $(this).index();
            change();
        });
    }

    function bindArrowEvent() {
        //->和 on('click') 一样
        $arrowLeft.click(function () {
            if (step === 0) {
                step = maxNum - 1;
                $imgBox.css('left', -step * 1000);
            }
            step--;
            change();
        });

        $arrowRight.click(function () {
            if (step === maxNum - 1) {
                $imgBox.css('left', 0);
                step = 0;
            }
            step++;
            change();
        });
    }

    return {
        init: function () {
            queryData();
            bindHTML();
            initLoad();

            autoMove();
            bindMouseEvent();
            bindFocusEvent();
            bindArrowEvent();
        }
    }
})();
bannerRender.init();