//->需求：让小球从当前位置运动到右边边界的位置(修改小球的LEFT值即可)

//[步长固定，时间不固定]---------------------
// var box = document.getElementById('box'),
//     maxLeft = utils.win('clientWidth') - box.offsetWidth,//->计算出运动目标位置的LEFT值
//     step = 20,//->步长:每一次走多少距离
//     interval = 17;//->时间因子:多长时间执行一次运动(频率)
//
// var timer = setInterval(function () {
//     var curL = utils.css(box, 'left');
//     curL += step;
//     utils.css(box, 'left', curL);
//     if (curL >= maxLeft) {
//         clearInterval(timer);
//     }
// }, interval);

//---------
//优化一：尽量少用全局的变量
// var box = document.getElementById('box'),
//     maxLeft = utils.win('clientWidth') - box.offsetWidth;
//
// //->真正项目中我们一般很少会把TIMER设置为全局变量(这样会导致变量冲突:可能一个TIMER代表的是另外的定时器了),我们一般都会把它设置在当前需要运动元素的自定义属性上,这样不仅仅防止了冲突,而且在任何时候如果需要,都可以通过自定义属性的方式获取到(不受闭包循环等干扰)
// box.timer = setInterval(function () {
//     var curL = utils.css(box, 'left');
//     curL += 20;
//     utils.css(box, 'left', curL);
//     if (curL >= maxLeft) {
//         clearInterval(box.timer);
//     }
// }, 17);

//-----------------------
//->优化二
//->边界判断:真正项目中我们做边界判断,都是首先拿当前位置加上步长,验证一下累加的值是否那会超过边界,如果已经超过边界了,我们就不要在加步长了,而是让元素直接运动到边界的位置即可...
var box = document.getElementById('box'),
    maxLeft = utils.win('clientWidth') - box.offsetWidth;
box.timer = setInterval(function () {
    var curL = utils.css(box, 'left');
    //->边界判断:如果我在按照现有步长走一步,就已经超过边界了,此时的我们直接让元素运动到边界位置即可(结束动画)
    if (curL + 20 >= maxLeft) {
        utils.css(box, 'left', maxLeft);
        clearInterval(box.timer);
        return;
    }
    utils.css(box, 'left', curL + 20);
}, 17);










