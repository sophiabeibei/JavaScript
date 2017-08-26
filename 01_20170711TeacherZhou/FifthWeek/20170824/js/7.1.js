// var $menu = $('.menu'),
//     $shop = $menu.children('.shop');
// $menu.mouseenter(function () {
//     $shop.stop().slideDown(100);
// }).mouseleave(function () {
//     $shop.stop().slideUp(100);
// });


//html的中把A标签换成了span,使用了.children(),.stop(),.slideDown(),.slideUp();


//第二种方法
    $('.menu').hover(function () {
 $(this).children('.shop').stop().slideToggle(100);
 });