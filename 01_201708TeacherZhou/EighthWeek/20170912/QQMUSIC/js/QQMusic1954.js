var musicRender = (function(){
    var $header = $(".header"),
        $main = $(".main"),
        $footer = $(".footer");

    /*
     * $.Callbacks: JQ中提供的发布订阅模式的方式
     *      $plan = $.Callbacks(): 发布了一个计划
     *      $plan.add(function...): 向计划中增加一个方法(你要做的事情)
     *      $plan.remove(function...): 从计划中移除一个方法
     *      $plan.fire([res]): 通知计划表中的方法依次执行,[res]相当于给计划表中的每一个方法传递实参值;
     */

    var $plan = $.Callbacks();

    //->计算main区的高度
    function computedMain() {
        //->当前屏幕的高度
        var winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $main.css("height",winH - $header[0].offsetHeight - $footer.offsetHeight - font * 0.8);
    }


    return {
        init: function () {
            //->1.获取main的高度
            computedMain();
            $(window).on("resize",computedMain);


            //->2.获取歌词,然后依次做后续操作;
            $.ajax({
                url: "json/lyric.json",
                method: "GET",
                dataType: "json",
                cache: false,
                success: function (result) {
                    var lyric = result["lyric"];
                    //->3.通知每一个方法依次执行,并且把获取的歌词传递给计划表中的每一个方法;
                    $plan.fire();
                }
            });
        }
    }
})();
musicRender.init();




































