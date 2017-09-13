let loadingRender = (function () {

    //->需要预先加载的所有图片;
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
        'img/zf_teacher100.png',/*没有这张图片,无法加载完成,loading不会消失,已经做了相关的处理;*/
        'img/zf_teacher2.png',
        'img/zf_teacher3.jpg',
        'img/zf_teacher4.png',
        'img/zf_teacher5.png',
        'img/zf_teacher6.png',
        'img/zf_teacherTip.png'];

    //->两个元素
    let $loading = $(".loading"),
        $already = $loading.find(".already");

    let n = 0,
        m = imgList.length,
        timer = null,
        isEnter = false;

    //->加载图片,计算加载量
    function loadImg() {
        $.each(imgList, function (index, item) {
            //->this: 当前循环的这一项;每张图片的地址
            let oImg = new Image;
            oImg.src = item;
            oImg.onload = function () {
                ++n;
                $already.css("width", n / m * 100 + "%");
                if (n >= m) {
                    setTimeout(() => {
                        //->加载完成,loading消失,phone操作;
                        if(isEnter) return;
                        isEnter = true;
                        clearTimeout(timer);
                        $loading.remove();
                        phoneRender.init();
                    }, 2000);//所有操作都延迟2s再消失
                }
            };
        });
    }


    return {
        init: function () {
            $loading.css("display","block");
            loadImg();
            /*无法加载完成,loading不会消失的相关处理如下*/
            //->给一个限定的时间(超过10s,如果有个别图片无法加载(已经加载一半以上了),我们也直接进入到下一个操作了)
            timer = setTimeout(() => {
                if (n < m && n >= m / 2) {
                    if(isEnter) return;
                    isEnter = true;
                    $already.css("width", "100%");
                    setTimeout(()=>{
                        $loading.remove();
                        phoneRender.init();
                    },2000);
                }
            }, 10000);//10s
        }
    }
})();

/*--phone--*/
//以后phone做什么事情就写到这里来;
let phoneRender = (function () {
    let $phone=$(".phone"),
        $listen=$phone.find(".listen"),
        $listenTouch=$listen.find(".touch"),
        $detail=$phone.find(".detail"),
        $detailTouch=$detail.find(".touch"),
        $time=$phone.find("span");

    let bellAudio=$("#bellAudio")[0],
        sayAudio=$("#sayAudio")[0];

    function listenTouch() {
        $listenTouch.singleTap(function () {//singleTap: 单击
            bellAudio.pause();
            $(bellAudio).remove();

            $listen.remove();
            $detail.css("transform","translateY(0)");

            //->让面板出来之后,
            $detail.on("webkitTransitionEnd",function () {
                //->transition动画结束的时候(JS中控制css3,只写一套加前缀的即可);
                //->让time显示
                $time.css("display","block");

                //->播放say音乐;
                sayAudio.play();
                watchTime();//监听
            });
        });
    }

    let watchTimer = null;

    function watchTime() {
        watchTimer = setInterval(()=>{
            //->this: 上级作用域中的this是谁,箭头函数中的this就是谁;
            var curTime = sayAudio.currentTime,
                durTime = sayAudio.duration;
            if(curTime>=durTime){
                //->已经播放的时间大于等于总时间,说明播放完成,播放完成之后执行以下
                message();
                return;
            }
            var minute=Math.floor(curTime/60),
                second=Math.ceil(curTime-minute*60);
            minute<10?minute="0"+minute:null;
            second<10?second="0"+second:null;
            $time.html(minute+":"+second);
        },1000);
    }

    function message() {
        clearInterval(watchTime);
        sayAudio.pause();
        $(sayAudio).remove();
        $phone.remove();
        messageRender.init();
    }

    return {
        init: function () {
            $phone.css("display","block");

            //->paly bell
            bellAudio.play();

            //->listen touch
            listenTouch();

            //->detail touch
            $detailTouch.singleTap(message);//singleTap: 单击;

        }
    }
})();


/*--message--*/
let messageRender = (function () {

    return {
        init: function () {

        }
    }
})();



loadingRender.init();

phoneRender.init();

messageRender.init();



