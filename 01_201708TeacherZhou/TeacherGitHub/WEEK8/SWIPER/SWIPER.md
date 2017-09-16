##SWIPER
> swiper是一款移动端的JS插件：实现页面或者区域滑动的插件
> - 轮播图
> - H5场景应用
> - ...
>  
> http://www.swiper.com.cn/

###开始使用
**1、导入需要的CSS和JS**
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>珠峰培训-swiper</title>

    <!--IMPORT CSS-->
    <link rel="stylesheet" href="css/reset.min.css">
    <link rel="stylesheet" href="css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="css/banner.css">
</head>
<body>


<!--IMPORT JS-->
<script src="js/zepto.min.js"></script>
<script src="js/swiper-3.4.2.jquery.min.js"></script>
<script src="js/banner.js"></script>
</body>
</html>
```

**2、严格按照SWIPER的结构要求搭建页面结构**
```
<!--实现滑动区域的最外层一定是:SWIPER-CONTAINER-->
<section class="swiper-container">
    <!--把需要切换的内容放在SWIPER-WRAPPER-->
    <div class="swiper-wrapper">
        <!--每一个需要切换的内容都放在SWIPER-SLIDE中(具体内容自行处理)-->
        <div class="swiper-slide">
            <img src="img/1.jpg" alt="">
        </div>
        <div class="swiper-slide">
            <img src="img/2.jpg" alt="">
        </div>
        <div class="swiper-slide">
            <img src="img/3.jpg" alt="">
        </div>
    </div>

    <!--分页器:焦点、百分比、进度条，需要分页器就需要加上这个结构-->
    <div class="swiper-pagination"></div>
</section>
```

**3、为滑动区域设置一些简单的样式**
```css
.swiper-container {
    height: 2.86rem;
}

.swiper-container .swiper-slide {
    height: 2.86rem;
}

...
```

**4、写JS实现效果**
```javascript
//=>let [实例]=new Swiper([selector], [options]);
let swiperExample = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',//->分页器
    paginationType: 'bullets',//->分页类型：bullets(圆点默认值)、fraction(分式)、progress(进度条)、custom(自定义)

    loop: true,//->开启循环模式,默认是FALSE(它是真实第一张克隆一份放在了末尾,把真实最后一张克隆一份放在了开头 `3(0) 1(1) 2(2) 3(3) 1(4)`)
    // direction: 'vertical',//->设置滑动方向：vertical竖向  horizontal横向(默认值)
    initialSlide: 2,//->初始索引：默认展示的是哪一张(初始的时候不受LOOP影响，此处依然是展示真实图片第3张)
    autoplay: 3000,//->设置该属性后可以实现自动切换：属性值是间隔时间
    autoplayDisableOnInteraction: false,//->用户操作swiper之后，是否禁止autoplay，默认是true禁止的

    effect: 'slide',//->切换效果：默认值slide左右切换，fade、cube、coverflow、flip (BUG:在cube、coverflow、flip 3D切换效果的时候,如果出现loop模式，有些时候会卡在切换过程中不动了)

    onInit: function (example) {
        //=>初始化完成触发的回调函数:example是当前类的一个实例
    },
    onTransitionEnd: function (example) {
        //=>当切换页面动画完成后触发

        //->example.activeIndex:返回当前活动块(激活块)的索引,loop模式下注意该值会被加上复制的slide数
        //->example.slides:获取Swiper的slides对象数组,通过example.slides[1]获取特定的slide
    }
});

//->切换到指定slide
//swiperExample.slideTo([index], [speed], [runCallbacks]);
```
