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

    var $plan = $.Callbacks();

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
            //->音乐可以播放了
            //musicAudio.volume = 0.2; 设置音量
            //musicAudio.duration 获取音乐总时长(S)
            $musicBtn.css('display', 'block').addClass('move');
            $duration.html(formatTime(musicAudio.duration));
        }, false);
    });

    //->控制音乐的暂停或者播放
    $plan.add(function () {
        //->ZP为移动端专门提供的点击(解决CLICK的300MS延迟)
        $musicBtn.tap(function () {
            if (musicAudio.paused) {//->暂停的
                musicAudio.play();
                $musicBtn.addClass('move');
                return;
            }
            musicAudio.pause();
            $musicBtn.removeClass('move');
        });
    });

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