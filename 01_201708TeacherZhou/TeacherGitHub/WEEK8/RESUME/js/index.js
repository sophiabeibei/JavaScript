let loadingRender = (function () {
    //->需要预先加载的所有图片
    let imgList = ['img/icon.png',
        'img/music.svg',
        'img/zf_concatAddress.png',
        'img/zf_concatInfo.png',
        'img/zf_concatPhone.png',
        'img/zf_course.png',
        'img/zf_course1.png',
        'img/zf_course2.png',
        'img/zf_course3.png',
        'img/zf_course4.png',
        'img/zf_course5.png',
        'img/zf_course6.png',
        'img/zf_cube1.png',
        'img/zf_cube2.png',
        'img/zf_cube3.png',
        'img/zf_cube4.png',
        'img/zf_cube5.png',
        'img/zf_cube6.png',
        'img/zf_cubeBg.jpg',
        'img/zf_cubeTip.png',
        'img/zf_emploment.png',
        'img/zf_messageArrow1.png',
        'img/zf_messageArrow2.png',
        'img/zf_messageChat.png',
        'img/zf_messageKeyboard.png',
        'img/zf_messageLogo.png',
        'img/zf_messageStudent.png',
        'img/zf_outline.png',
        'img/zf_phoneBg.jpg',
        'img/zf_phoneDetail.png',
        'img/zf_phoneListen.png',
        'img/zf_phoneLogo.png',
        'img/zf_return.png',
        'img/zf_style1.jpg',
        'img/zf_style2.jpg',
        'img/zf_style3.jpg',
        'img/zf_styleTip1.png',
        'img/zf_styleTip2.png',
        'img/zf_teacher1.png',
        'img/zf_teacher2.png',
        'img/zf_teacher3.jpg',
        'img/zf_teacher4.png',
        'img/zf_teacher5.png',
        'img/zf_teacher6.png',
        'img/zf_teacherTip.png'];

    let $loading = $('.loading'),
        $already = $loading.find('.already');

    let n = 0,
        m = imgList.length,
        timer = null,
        isEnter = false;

    //->加载图片,计算加载量
    function loadImg() {
        $.each(imgList, function (index, item) {
            let oImg = new Image;
            oImg.src = item;
            oImg.onload = function () {
                $already.css('width', (++n) / m * 100 + '%');
                if (n >= m) {
                    setTimeout(()=> {
                        //->加载完成:LOADING消失,PHONE操作(延迟2S)
                        if (isEnter) return;
                        isEnter = true;
                        clearTimeout(timer);
                        $loading.remove();
                        phoneRender.init();
                    }, 2000);
                }
            }
        });
    }

    return {
        init: function () {
            $loading.css('display', 'block');
            loadImg();
            //->给一个限定的时间(超过10S,如果有个别图片无法加载,我们也直接进入到下一个操作了)
            timer = setTimeout(()=> {
                if (n < m) {
                    if (isEnter) return;
                    isEnter = true;
                    $already.css('width', '100%');
                    setTimeout(()=> {
                        $loading.remove();
                        phoneRender.init();
                    }, 2000);
                }
            }, 10000);
        }
    }
})();

/*--PHONE--*/
let phoneRender = (function () {
    let $phone = $('.phone'),
        $listen = $phone.find('.listen'),
        $listenTouch = $listen.find('.touch'),
        $detail = $phone.find('.detail'),
        $detailTouch = $detail.find('.touch'),
        $time = $phone.find('span');

    let bellAudio = $('#bellAudio')[0],
        sayAudio = $('#sayAudio')[0];

    function listenTouch() {
        $listenTouch.singleTap(function () {
            bellAudio.pause();
            $(bellAudio).remove();

            $listen.remove();
            $detail.css('transform', 'translateY(0)')
                .on('webkitTransitionEnd', function () {
                    //->TRANSITION动画结束
                    //JS中控制CSS3属性,只写一套加前缀的即可
                    $time.css('display', 'block');
                    sayAudio.play();
                    watchTime();
                });
        });
    }

    let watchTimer = null;

    function watchTime() {
        watchTimer = setInterval(()=> {
            var curTime = sayAudio.currentTime,
                durTime = sayAudio.duration;
            if (curTime >= durTime) {
                message();
                return;
            }
            var minute = Math.floor(curTime / 60),
                second = Math.ceil(curTime - minute * 60);
            minute < 10 ? minute = '0' + minute : null;
            second < 10 ? second = '0' + second : null;
            $time.html(minute + ':' + second);
        }, 1000);
    }

    function message() {
        clearInterval(watchTimer);
        sayAudio.pause();
        $(sayAudio).remove();
        $phone.remove();
        messageRender.init();
    }

    return {
        init: function () {
            $phone.css('display', 'block');

            //->PLAY BELL
            bellAudio.play();

            //->LISTEN TOUCH
            listenTouch();

            //->DETAIL TOUCH
            $detailTouch.singleTap(message);
        }
    }
})();

/*--MESSAGE--*/
let messageRender = (function () {
    return {
        init: function () {

        }
    }
})();

messageRender.init();
