var musicRender = (function () {
    var $header = $('.header'),
        $main = $('.main'),
        $footer = $('.footer');

    /*
     *  $.Callbacks：JQ中提供的发布订阅模式的方法
     *      $plan = $.Callbacks()：发布了一个计划
     *      $plan.add(function...)：向计划中增加一个方法(你要做的事情)
     *      $plan.remove(function...)：从计划中移除一个方法
     *      $plan.fire([res])：通知计划表中的方法依次执行,[res]相当于给计划表中的每一个方法传递实参值
     */
    var $plan = $.Callbacks();

    //->计算MAIN高度
    function computedMain() {
        var winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $main.css('height', winH - $header[0].offsetHeight - $footer[0].offsetHeight - font * 0.8);
    }

    return {
        init: function () {
            computedMain();
            $(window).on('resize', computedMain);

            //->获取歌词,然后依次做后续的操作
            $.ajax({
                url: 'json/lyric.json',
                method: 'GET',
                dataType: 'json',
                cache: false,
                success: function (result) {
                    var lyric = result['lyric'];
                    $plan.fire(lyric);//->通知每一个方法依次执行,并且把获取的歌词传递给计划表中的每一个方法
                }
            });
        }
    }
})();
musicRender.init();