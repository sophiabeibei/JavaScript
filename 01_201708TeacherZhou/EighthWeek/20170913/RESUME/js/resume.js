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
    return {
        init: function () {

        }
    }
})();


loadingRender.init();



