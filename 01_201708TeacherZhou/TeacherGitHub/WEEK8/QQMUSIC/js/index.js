var musicRender = (function () {
    var $header = $('.header'),
        $main = $('.main'),
        $footer = $('.footer'),
        $wrapper = $main.find('.wrapper'),
        musicAudio = $('#musicAudio')[0],
        $musicBtn = $header.find('.musicBtn'),
        $current = $footer.find('.current'),
        $duration = $footer.find('.duration'),
        $already = $footer.find('.already');

    var $plan = $.Callbacks(),
        autoTimer = null,
        step = 0,
        curTop = 0;

    //->绑定歌词
    $plan.add(function (lyric) {
        lyric = lyric.replace(/&#(\d+);/g, function (res, num) {
            switch (parseFloat(num)) {
                case 32:
                    res = ' ';
                    break;
                case 40:
                    res = '(';
                    break;
                case 41:
                    res = ')';
                    break;
                case 45:
                    res = '-';
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

        var str = ``;
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];
            str += `<p data-minute="${item.minute}" data-second="${item.second}">${item.value}</p>`;
        }
        $wrapper.html(str);
    });

    //->音乐播放
    $plan.add(function () {
        musicAudio.play();
        musicAudio.addEventListener('canplay', function () {
            $musicBtn.css('display', 'block')
                .addClass('move');

            //->计算播放量
            computedAlready();
            autoTimer = setInterval(computedAlready, 1000);
        }, false);
    });

    //->控制音乐的暂停或者播放
    $plan.add(function () {
        $musicBtn.tap(function () {
            if (musicAudio.paused) {
                musicAudio.play();
                $musicBtn.addClass('move');
                autoTimer = setInterval(computedAlready, 1000);
                return;
            }
            musicAudio.pause();
            $musicBtn.removeClass('move');
            clearInterval(autoTimer);
        });
    });

    //->计算当前播放量
    function computedAlready() {
        //musicAudio.currentTime:获取已经播放的时长(秒)
        var curTime = musicAudio.currentTime,
            durTime = musicAudio.duration;
        if (curTime >= durTime) {
            clearInterval(autoTimer);
            $duration.html(formatTime(durTime));
            $current.html(formatTime(durTime));
            $already.css('width', '100%');
            $musicBtn.removeClass('move');
            return;
        }
        $duration.html(formatTime(durTime));
        $current.html(formatTime(curTime));
        $already.css('width', curTime / durTime * 100 + '%');

        //->歌词对应
        var ary = formatTime(curTime).split(':'),
            minute = ary[0],
            second = ary[1];
        var $curLyric = $wrapper.find('p')
            .filter('[data-minute="' + minute + '"]')
            .filter('[data-second="' + second + '"]');
        if ($curLyric.length > 0) {
            if (!$curLyric.hasClass('select')) {
                $curLyric.addClass('select')
                    .siblings().removeClass('select');
                step++;
                if (step >= 4) {
                    curTop -= .84;
                    $wrapper.css('top', curTop + 'rem');
                }
            }
        }
    }

    //->格式化时间
    function formatTime(time) {
        var minute = Math.floor(time / 60),
            second = Math.ceil(time - minute * 60);
        minute < 10 ? minute = '0' + minute : null;
        second < 10 ? second = '0' + second : null;
        return minute + ':' + second;
    }

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
                    $plan.fire(lyric);
                }
            });
        }
    }
})();
musicRender.init();