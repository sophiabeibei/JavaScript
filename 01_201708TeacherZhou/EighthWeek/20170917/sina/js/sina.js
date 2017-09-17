let headerRender = (() => {
    //->this: window
    let $headerBox = $(".headerBox"),
        $menu = $headerBox.find(".menu"),
        $navBox = $(".navBox");

    let menuFn = () => {
        $menu.attr("isShow", false);
        $menu.tap(function () {//->zippto中的tap
            let isShow = $(this).attr("isShow");
            if (isShow === "false") {
                //->当前是隐藏的,我们让其展开
                $navBox.css({
                    height: "1.6rem",
                    padding: ".16rem 0"
                });
                return;
            }
            //->当前是展示的,我们让其隐藏
            $navBox.css({
                height: 0,
                padding: 0
            });
            $menu.attr("isShow", false);
        });
    };
    return {
        //->es6中直接init(){}即可
        init(){
            menuFn();
        }
    }
})();
headerRender.init();

/*swiper*/
let swiperRender = (() => {
    let $container = $(".swiper-container"),
        $wrapper = $container.find(".swiper-wrapper");

    let $plan = $.Callbacks();
    $plan.add((result) => {
        //->数据绑定
        let str = ``;
        $.each(result, function () {
            //->this: 当前循环的这一项
            str += `<div class="swiper-slide">
                    <a href="${this.link}">
                        <img src="${this.img}" alt="">
                        <span>${this.desc}</span>
                    </a>
                </div>`
        });
        $wrapper.html(str);
    });

    $plan.add((result) => {
        //->轮播图滑动
        new Swiper("swiper-container", {
            pagination: ".swiper-pagination",
            paginationType: "fraction",
            loop: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false//->自动轮播
        });
    });


    return {
        init(){
            $.ajax({
                url: "banner.json",
                method: "get",
                dataType: "json",
                cache: false,
                success: function (result) {
                    $plan.fire(result);
                }
            })
        }
    }
})();
swiperRender.init();

/*aside*/
let asideRender = (() => {
    let $asideBox = $(".asideBox"),
        $list = $asideBox(".list"),
        $plan = $.Callbacks();

    //->数据绑定
    $plan.add((result) => {
        let str = ``;
        $.each(result, function () {
            str += `<li><a href="${this.link}">${this.title}</a></li>`;
        });
        $list.html(str);

        //->克隆一份(第一条信息)放到末尾
        let $oList = $list.find("li");
        $list.append($oList.eq(0).clone(true));
    });

    //->实现动画
    let asideH = $asideBox[0].offsetHeight,
        step = -1,
        autoTimer = null,
        interval = 1000;
    $plan.add(()=>{
        autoTimer = setInterval(()=>{
            $list.css("transitionDuration","0.3s");
            step++;
            //->控制transiform
            $list.css(`transform`,`translateY(${-step*asideH}px)`).on("webkitTransitionEnd",function () {
                if(step===3){
                    //->已经运动到克隆的那一条信息
                    $list.css("transitionDuration","0s");
                    $list.css(`transform`,`translateY(${0})`);
                    step=0;
                }
            });
        },interval);
    });

    return {
        init(){

            $.ajax({
                url: "aside.json",
                method: "get",
                dataType: "json",
                cache: false,
                success: $plan.fire
            });
        }
    }
})();

/*news*/
let newsRender = (()=>{
    let $news=$(".news"),
        $plan=$.Callbacks();

    //->数据绑定
    let fn=(result)=>{
        let newsList=result["newsList"],
            imgList=result["imgList"];
        let str=``;
        str+=`<ul class="item">`;
        $.each(newsList,function () {
            str+=`<li>
                    <a href="${this.link}">
                        <img src="${this.img}" alt="">
                        <div>
                            <p>${this.title}</p>
                            <span>
                                <i class="icon-comment"></i>
                            </span>
                        </div>
                    </a>
                </li>`;
        });
        str+=`</ul>`;

        str+=`<div class="image">`;
        str+=`<a href="${imgList.link}">`;
        str+=`<p>${imgList.title}</p>`;
        str+=`<div class="clearfix">`;
        str+=`</div>`;
        str+=`<span>
                ${imgList.count}
                <i class="icon-comment"></i>
                </span>`;
        str+=`</a>`;
        str+=`</div>`;

        $news.append(str);
        $(window).on("scroll",loadMore);
    };
    $plan.add(fn);

    //->滚动到底部加载更多的数据
    let loadMore=()=>{
        let clientH=document.documentElement.clientWidth,
            scrollT=document.documentElement.scrollTop || document.body.scrollTop,
            winH=document.documentElement.scrollHeight || document.body.scrollHeight;
        if(clientH+scrollT+20>winH){
            //->加载更多数据
            $(window).off("scroll",loadMore);
            $.ajax({
                url: "aside.json",
                method: "get",
                dataType: "json",
                cache: false,
                success: fn
            });
        }
    };

    return {
        init(){
            $.ajax({
                url: "aside.json",
                method: "get",
                dataType: "json",
                cache: false,
                success: $plan.fire
            });
        }
    }
})();
newsRender.init();