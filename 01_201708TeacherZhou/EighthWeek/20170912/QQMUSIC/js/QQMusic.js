var musicRender = (function () {
    var $header = $(".header"),
        $main = $(".main"),
        $footer = $(".footer"),
        $wrapper = $main.find(".wrapper"),
        musicAudio = $("#musicAudio")[0],
        $musicBtn = $header.find(".musicBtn"),
        $current = $footer.find(".current"),
        $duration = $footer.find(".duration"),
        $already = $footer.find(".already");

    /*
     * $.Callbacks: JQ中提供的发布订阅模式的方式
     *      $plan = $.Callbacks(): 发布了一个计划
     *      $plan.add(function...): 向计划中增加一个方法(你要做的事情)
     *      $plan.remove(function...): 从计划中移除一个方法
     *      $plan.fire([res]): 通知计划表中的方法依次执行,[res]相当于给计划表中的每一个方法传递实参值;
     */

    var $plan = $.Callbacks(),
        autoTimer = none,
        step = 0,
        curTop = 0;

    //->绑定歌词
    $plan.add(function (lyric) {
        lyric = lyric.replace(/&#(\d+);/g, function (res, num) {
            //var num = arguments[1],
            //  res = arguments[0];//->大正则捕获的内容
            //num,res不用声明,直接用形参即可;
            switch (parseFloat(num)) {
                case 32:
                    res = " ";
                    break;
                case 40:
                    res = "(";
                    break;
                case 41:
                    res = ")";
                    break;
                case 45:
                    res = "-";
                    break;
            }
            return res;
        });
        var ary = [],
            reg = /\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#10;)?/g;
        lyric.replace(reg, function (res, minute, second, value) {
            ary.push({
                minute: minute,
                second: second,
                value: value
            });
        });
        // console.log(ary);

        var str = ``;
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];
            str += `<p data-minute="${item.minute}" data-second="${item.second}">${item.value}</p>`
        }
        $wrapper.html(str);
    });

    //->音乐播放
    $plan.add(function () {
        musicAudio.play();
        musicAudio.addEventListener("canplay", function () {
            //->音乐可以播放了
            // musicAudio.volume = 0.2;//->设置音量
            $musicBtn.css("display", "block").addClass("move");
            // console.log(musicAudio.duration);//->总时长
        }, false)
    });

    //->控制音乐的暂停或者播放
    $plan.add(function () {
        //->tap: zp为移动端专门提供的点击(解决了click的300ms延迟)
        $musicBtn.tap(function () {
            if (musicAudio.paused) {//->musicAudio.paused: 说明是暂停的
                musicAudio.play();
                $musicBtn.addClass("move");
                return;
            }
            musicAudio.pause();
            $musicBtn.removeClass("move");

        });
    });

    //->计算当前播放量
    function computedAlready() {
        //->musicAudio.currentTime: 获取已经播放的时长(秒)
        var curTime = musicAudio.currentTime,
            durTime = musicAudio.duration;
        if(curTime>=durTime){
            clearInterval(autoTimer);
            $duration.html(formatTime(duration));
            $current.html(formatTime(curTime));
            $already.css("width", "100%");
            $musicBtn.removeClass("move");
            return;
        }
        $duration.html(formatTime(duration));
        $current.html(formatTime(curTime));
        $already.css("width", curTime / durTime * 100 + "%");

        //->歌词对应
        var ary = formatTime(curTime).split(":"),
            minute = ary[0],
            second = ary[1];

        var $curLyric = $wrapper.find("p").filter("[data-minute='"+minute+"']").filter("[data-second='"+second+"']");
        if($curLyric.length>0){
            if(!$curLyric.hasClass("select")){
                $curLyric.addClass("select").siblings().removeClass("select");
                step++;
                if(step>=4){
                    curTop -= .84;
                    $wrapper.css("top",curTop + "rem");
                }
            }
        }
    }

    //->格式化事件
    function formatTime(time) {//->time: 秒
        var minute = Math.floor(time / 60),
            second = Math.ceil(time - minute * 60);
        minute < 10 ? minute = "0" + minute : null;
        second < 10 ? second = "0" + second : null;
        return minute + ":" + second;

    }

    //->计算main区的高度
    function computedMain() {
        //->当前屏幕的高度
        var winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $main.css("height", winH - $header[0].offsetHeight - $footer.offsetHeight - font * 0.8);
    }


    return {
        init: function () {
            //->1.获取main的高度
            computedMain();
            $(window).on("resize", computedMain);


            //->2.获取歌词,然后依次做后续操作;
            $.ajax({
                url: "json/lyric.json",
                method: "GET",
                dataType: "json",
                cache: false,
                success: function (result) {
                    var lyric = result["lyric"];
                    //->3.通知每一个方法依次执行,并且把获取的歌词传递给计划表中的每一个方法;
                    $plan.fire(lyric);
                }
            });
            // formatTime();
        }
    }
})();
musicRender.init();




































