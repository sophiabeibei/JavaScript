//=>让红色的小盒子运动到右边界的位置:修改当前元素的LEFT样式值
var minL = 0,
    maxL = utils.win('clientWidth') - box.offsetWidth;

//->真实项目中为了避免全局变量的污染:我们定时器的返回值不要定义为全局的变量,而是设定在当前元素的自定义属性上(而且在任何的作用域中或者任何的位置,如果有需要我们都可以通过自定义属性的方式获取到这个结果)
box.timer = window.setInterval(function () {
    var curL = utils.css(box, 'left');
    if (curL + 10 >= maxL) {
        utils.css(box, 'left', maxL);
        window.clearInterval(box.timer);
        return;
    }
    curL += 10;
    utils.css(box, 'left', curL);
}, 17);