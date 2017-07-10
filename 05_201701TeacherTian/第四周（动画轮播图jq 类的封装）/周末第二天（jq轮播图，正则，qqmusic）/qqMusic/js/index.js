;(function (){
    var $music = $('.music');
    var $play = $music.find('.play');
    var $pause = $music.find('.pause');
    var $main = $music.find('.main');
    var $lyric = $main.find('.lyric');
    var $ps = null; // 歌词
    var $totalTime = $music.find('.totalTime');
    var $curTime = $music.find('.curTime');
    var $progressBar = $music.find('.bar span');
// main的高度
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var headHeight =  $music.find('.header')[0].offsetHeight;
    var footHeight = $music.find('.footer')[0].offsetHeight;

    $main.css({
        height : winHeight - headHeight -  footHeight - 0.8*htmlFontSize
    });

    var audio = $music.find('audio')[0]; // 原生对象 => 方法

    var data = null;
    function getData(){
        $.ajax({
            type : 'get',
            url : 'lyric1.json',
            cache : false,
            async : false,
            dataType : 'json',
            success : function (res){
                //  如果成功获取那么就直接把数据赋值给全局变量
                res.code == 0  ? data = res.lyric : void 0;
            }
        })
    }

    function bindData(){
        if(data && data.length){
            // 绑定数据
            // console.log(data);
            var str = ''; // p , p , p
            $.each(data, function (index,item){
                str += '<p id="'+ item.id +'" sec="'+ item.second +'"  min="'+ item.minute +'" >'+ item.content +'</p>';
            });
            $lyric.html(str);
        }
    }

    function autoPlay(){
        audio.play(); // 播放
        $(audio).on('canplay',function (){ // canplay事件一定是在播放之后触发
            //console.log(audio.duration); // 获取当前媒体文件的时长 s
            $totalTime.html(formatTime(audio.duration)); //格式化的字符串赋值给总时间
            $play.css('display','none');
            $pause.css('display','block');
        });
    }
    function formatTime(s){
        // 306.7241
        var min = Math.floor(s/60);
        var sec = Math.floor(s - min*60);
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return min + ':' + sec;
    }

    function bindEvent(){
        $play.on('click',clickHandler);
        $pause.on('click',clickHandler);
    }

    function clickHandler(){
        if(audio.paused){ // 暂停
            // audio.paused   audio.play() audio.pause() audio.duration
            audio.play();
            $pause.css('display','block');
            $play.css('display','none');
        }else{ // 播放
            audio.pause();
            $pause.css('display','none');
            $play.css('display','block');
        }
    }



    function progress(){
        $ps = $lyric.find('p'); // 重新获取所有的歌词行
        var timer = window.setInterval(function (){
            if(audio.currentTime >= audio.duration){
                window.clearInterval(timer); // 如果当前时间大于总时间清空定时器
                return;
            }
            $curTime.html(formatTime(audio.currentTime));
            var widthVal = audio.currentTime/audio.duration*100 + '%';
            $progressBar.css({
                width : widthVal // 只要修改了宽度值，transition就会动画
            });
            // 从所有歌词行p中，挑选出分钟和秒都能和当前播放的时间对应上的那个p。添加cur样式
            var min = $curTime.html().split(':')[0]; // 获取当前播放的分
            var sec = $curTime.html().split(':')[1]; // 获取当前播放的秒
            var $curP =  $ps.filter('[min="'+ min +'"][sec="'+ sec +'"]');

            $curP.addClass('cur').siblings().removeClass('cur');

            var $cupId = $curP.index() + 1;

            if($cupId >= 4){
                console.log(1);
                $lyric.css({
                    top :  - ($cupId - 3)*0.84 + 'rem'
                });
            }
        },1000);
    }


    window.init = function (){
        getData(); // 获取数据
        bindData(); // 绑定数据
        autoPlay(); // 播放，刚开始播放那一刻完成总时间和默认按钮显示
        bindEvent(); // 给按钮绑定点击事件
        progress(); // 每1s更新当前的播放时间，进度条，歌词
    }

})();


init(); // 入口

