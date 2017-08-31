//->需求: 让小球从当前位置运动到右边的边界位置;(修改小球的left值即可)
//匀速动画有两种方式可以实现:
    //->匀速动画一: [步长固定,时间不固定]
    //->匀速动画二: [时间固定,步长不固定]


// //匀速动画一: [步长固定,时间不固定]--------------------------------原稿: 能实现,有bug
// //->计算出运动目标的left值
// var box = document.getElementById("box"),
//     maxLeft = utils.win("clientWidth") - box.offsetWidth,
//     step = 10,//->步长: 每次走的距离
//     interval = 17;//->时间因子: 多长时间执行一次运动
//
// //->运动多次(不知道执行多少次时),使用setInterval
// var timer = setInterval(function () {
//     //->获取当前盒子的left值
//     var curL = utils.css(box,"left");
//
//     //->让当前left值在原有基础上加步长
//     curL += step;
//
//     //->经过加步长之后的结果
//     utils.css(box,"left",curL);
//
//     //->如果当前的值大于等于maxLeft,清除定时器;
//     if(curL >= maxLeft){
//         clearInterval(timer);
//     }
//
// },17);



// //匀速动画一: [步长固定,时间不固定]---------------------优化一: 优化全局变量,设置在当前需要运动元素的自定义属性上box.timer
// //=>优化一
// //->计算出运动目标的left值
// var box = document.getElementById("box"),
//     maxLeft = utils.win("clientWidth") - box.offsetWidth;
//
// //->运动多次(不知道执行多少次时),使用setInterval
// //->真正项目中我们一般很少把timer设置为全局变量;(这样会导致变量冲突: 可能一个timer代表的时另外的定时器了),我们一般都会把它设置在当前需要运动元素的自定义属性上,这样不仅防止了冲突,而且在任何时候如果需要,都可以通过自定义属性的方式获取到(不受闭包,不受循环等干扰);
// box.timer = setInterval(function () {
//     //->获取当前盒子的left值
//     var curL = utils.css(box,"left");
//
//     //->让当前left值在原有基础上加步长
//     curL += 20;
//
//     //->经过加步长之后的结果
//     utils.css(box,"left",curL);
//
//     //->如果当前的值大于等于maxLeft,清除定时器;
//     if(curL >= maxLeft){
//         clearInterval(box.timer);
//     }
// },17);




// //匀速动画一: [步长固定,时间不固定]----------------------优化二: 优化边界判断: 让元素直接运动到边界的位置
// //=>优化二 边界判断: 真正项目中我们做边界判断,都是首先拿当前位置加上步长,验证以下累加的值是否会超过边界,如果已经超过边界了,我们就不要再加步长了,而是让元素直接运动到边界的位置即可;
// //->计算出运动目标的left值
// var box = document.getElementById("box"),
//     maxLeft = utils.win("clientWidth") - box.offsetWidth;
//
// //->运动多次(不知道执行多少次时),使用setInterval
// //->真正项目中我们一般很少把timer设置为全局变量;(这样会导致变量冲突: 可能一个timer代表的是另外的定时器了),我们一般都会把它设置在当前需要运动元素的自定义属性上,这样不仅防止了冲突,而且在任何时候如果需要,都可以通过自定义属性的方式获取到(不受闭包,不受循环等干扰);
// box.timer = setInterval(function () {
//     //->获取当前盒子的left值
//     var curL = utils.css(box, "left");
//
//     //->做边界判断: 如果curL加步长20已经大于等于maxLeft,到达边界,结束当前动画
//     if (curL + 20 >= maxLeft) {
//         utils.css(box, "left", maxLeft);
//
//         //->结束动画
//         clearInterval(box.timer);
//         return;
//     }
//     //->经过加步长之后的结果
//     utils.css(box, "left", curL + 20);
// }, 17);




//匀速动画一: [步长固定,时间不固定]----------------------两个优化之后的裸码
var box = document.getElementById("box"),
    maxLeft = utils.win("clientWidth") - box.offsetWidth;
box.timer = setInterval(function () {
    var curL = utils.css(box, "left");
    if (curL + 20 >= maxLeft) {
        utils.css(box, "left", maxLeft);
        clearInterval(box.timer);
        return;
    }
    utils.css(box, "left", curL + 20);
}, 17);