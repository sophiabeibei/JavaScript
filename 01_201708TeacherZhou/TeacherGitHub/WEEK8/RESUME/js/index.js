/*--LOADING--*/
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
    let $message = $('.message'),
        musicAudio = $('#musicAudio')[0],
        $wrapper = $message.find('.wrapper'),
        $messageList = $wrapper.find('li'),
        $keyboard = $message.find('.keyboard'),
        $text = $keyboard.find('.text'),
        $submit = $keyboard.find('.submit');

    let autoTimer = null,
        step = -1,
        initTranslateY = 0;

    function messageMove() {
        let $cur = $messageList.eq(++step);
        //->显示每一条消息
        $cur.css({
            transform: 'translateY(0)',
            opacity: 1
        });

        //->当第三条消息完成后(TRANSITION动画完成了),展示键盘(此时停止自动出消息)
        if (step === 2) {
            clearInterval(autoTimer);
            //->我们需要操作两个样式执行过渡动画,事件被执行两次(webkitTransitionEnd:有几个样式需要执行过渡动画,事件就会被触发执行几次)
            let fn = function () {
                $cur.off('webkitTransitionEnd', fn);
                keyboard();
            };
            $cur.on('webkitTransitionEnd', fn);
        }

        //->从第五条展示开始,消息列表要整体上移了(当前这条消息高度的基础上+10是上移的距离)
        if (step >= 4) {
            initTranslateY -= $cur[0].offsetHeight + 10;
            $wrapper.css('transform', 'translateY(' + initTranslateY + 'px)');
        }

        //->结束:结束音频,干掉当前页,进入下一个页面
        if (step >= $messageList.length - 1) {
            clearInterval(autoTimer);
            musicAudio.pause();
            $(musicAudio).remove();
            setTimeout(()=> {
                $message.remove();
                cubeRender.init();
            }, 2000);
        }
    }

    function keyboard() {
        //->让键盘显示
        $keyboard.css('transform', 'translateY(0)');

        //->显示文字：文字打印机
        //JQ中的ONE也是绑定事件,只不过只绑定一次而已,触发一次后自动把绑定的方法移除
        $keyboard.one('webkitTransitionEnd', ()=> {
            let str = '都学了啊，可我还是找不到好工作！',
                textTimer = null,
                n = -1;
            textTimer = setInterval(()=> {
                if (n >= str.length - 1) {
                    clearInterval(textTimer);
                    //->显示提交按钮
                    $submit.css('display', 'block');
                    return;
                }
                let textVal = $text.html();
                textVal += str[++n];
                $text.html(textVal);
            }, 100);
        });
    }

    function submitEvent() {
        $submit.singleTap(function () {
            $text.html('');
            $keyboard.css('transform', 'translateY(3.7rem)');

            messageMove();
            autoTimer = setInterval(messageMove, 1500);
        });
    }

    return {
        init: function () {
            $message.css('display', 'block');
            musicAudio.play();
            autoTimer = setInterval(messageMove, 1500);
            submitEvent();
        }
    }
})();

/*--CUBE--*/
//=>移动端设备中的浏览器或者是微信等,当手指滑动的时候都会有一些属于自己的默认行为(浏览器滑动有切换页卡的默认行为),为了保证我们的滑动能正常,我们需要阻止这些默认行为
$(document).on('touchstart touchmove touchend', function (ev) {
    ev.preventDefault();
});

let cubeRender = (function () {
    let $cube = $('.cube'),
        $box = $cube.children('ul');

    //->记录起始的旋转角度,每一次的滑动都是在上一次角度基础上继续旋转的
    $box.attr({
        rotateX: -30,
        rotateY: 45
    });

    function start(ev) {
        let point = ev.changedTouches[0];
        $(this).attr({
            strX: point.pageX,
            strY: point.pageY,
            changeX: 0,
            changeY: 0,
            isMove: false
        });
    }

    function move(ev) {
        let point = ev.changedTouches[0];
        let changeX = point.pageX - $(this).attr('strX'),
            changeY = point.pageY - $(this).attr('strY');
        if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            $(this).attr({
                changeX: changeX,
                changeY: changeY,
                isMove: true
            });
        }
    }

    function end(ev) {
        let isMove = $(this).attr('isMove');
        if (isMove !== 'true') return;

        let changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY')),
            rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $(this).css('transform', `scale(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        $box.attr({
            rotateX: rotateX,
            rotateY: rotateY
        });
    }

    return {
        init: function () {
            $cube.css('display', 'block');
            $box.on('touchstart', start)
                .on('touchmove', move)
                .on('touchend', end)
                .find('li').tap(function () {
                //->ZP中提供了一些快捷的移动操作方法:tap、singleTap、doubleTap、longTap、swipe、swipeLeft...
                let index = $(this).index();
                swiperRender.init(index);
            });
        }
    }
})();

/*--SWIPER--*/
let swiperRender = (function () {
    let $swiperContainer = $('.swiper-container'),
        example = null;

    function change(ex) {

    }

    return {
        init: function (index) {
            index = index || 0;
            $swiperContainer.css('display', 'block');
            example = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onInit: change,
                onTransitionEnd: change
            });
            example.slideTo(index, 0);
        }
    }
})();


swiperRender.init(2);


