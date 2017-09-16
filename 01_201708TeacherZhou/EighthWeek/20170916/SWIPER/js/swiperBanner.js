// let[实例]=new Swiper([selector],[options])=>Swiper的基本语法
let swiperExample=new Swiper(".swiper-container",{
    pagination:".swiper-pagination",//->分页器
    paginationType:"bullets",//->分页器类型: bullets(圆点默认值),fraction(分式),progress()

    loop: true,//->loop: 开启循环模式;默认是false不循环
    // direction: "vertical",//->direction: 开启轮播方向-竖向vertical;默认是横向horizontal;
    initialize: 2,//->initialize: 初始索引(默认展示的第几张);初始的时候不受loop影响;此处依然是展示真实图片的第三张;
    autoplay: 3000,//->autoplay: 时间值;3000=>3s 设置该属性后可以实现自动切换,属性值是间隔时间;
    autoplayDisableOnInteraction: false,//->用户操作之后是否禁止autoplay;默认是true;  false是不禁止;

    effect: "slide",//->effect: 效果切换;默认是slide(左右切换);还支持fade(渐隐渐现),cube(百年城魔方切换),coverflow(3d切换),flip(翻拍);

    //->Swiper无缝衔接: 把真实第一张克隆一份放在末尾,把真实最后一张克隆一份放在开头;     3(0)  1(1)   2(2)   3(3)  1(4)     第几张(索引值)
    //->Swiper有个bug: 在"cube(百年城魔方切换),coverflow(3d切换),flip(翻拍)"这些几个3d切换效果的时候,如果切换loop模式,有些时候会卡在切换过程中不动了;

    onInit:function (example) {
        //=>初始化完成触发的回调函数: example是当前类的一个实例
    },

    onTransitionEnd:function (example) {
        //=>当切换页面动画完成后触发
        //=>example.activeIndex: 返回当前活动块(激活块)的索引,loop模式下注意该值会被加上赋值的slide数
        //->example.slides: 获取Swiper的slides对象数组,通过example.slides[1]获取特定的slide
    }
});

//=>切换到指定的slide
// swiperExample.slideTo([index],[speed],[runCallback]);

