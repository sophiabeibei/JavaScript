// //---------------------------------------------------优化二: 避免全局变量的污染
// var box = document.getElementById("box");
// //->获取左边界和右边界的left值
// var minL = 0,
//     maxL = utils.win("clientWidth")-box.offsetWidth;
// //->假设我们设定步长为10px,接下来我们让当前元素在现有的left基础上累加步长,就可以实现向右运动的动画了;
//
// //->真实项目当中为了避免全局变量的污染: 我们定时器的返回值不要定义在全局变量,而是设定在当前元素的自定义属性上;(而且在任何的作用域中或者任何的位置,如果有需要我们都可以通过自定义属性的方式获取到这个结果)
// box.timer = window.setInterval(function () {
//     var curL = utils.css(box,"left");//->获取当前的left值
//     //->为了防止多走一步会超过边界,少走一步到不了边界,我们JS实现动画的时候,边界判断都是加上步长来处理的(相当于模拟走一步看情况,如果模拟走一步超过了边界,我们直接让其运动到边界即可)
//
//     if(curL>=maxL){
//         utils.css(box,"left",maxL);
//         window.clearInterval(box.timer);
//         return;
//     }
//     curL+=10;//->在现有的基础上累加步长实现当前这一步动画
//
//     utils.css(box,"left",curL);
// },17);//->我们设置动画的时候,时间因子一般都设置为17ms,也就是每隔17ms运动一步,17是在各个浏览器中动画效果相对流畅的一个值;




//----------------------------------------------裸码
var box = document.getElementById("box");
var minL = 0,
    maxL = utils.win("clientWidth")-box.offsetWidth;
box.timer = window.setInterval(function () {
    var curL = utils.css(box,"left");
    if(curL>=maxL){
        utils.css(box,"left",maxL);
        window.clearInterval(box.timer);
        return;
    }
    curL+=10;

    utils.css(box,"left",curL);
},17);

