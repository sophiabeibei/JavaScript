//=>让红色的小盒子运动到右边界的位置: 需改当前元素的left样式值

//---------------------------------------------------原稿: 有bug
// var box = document.getElementById("box");
// //->获取左边界和右边界的left值
// var minL = 0,
//     maxL = utils.win("clientWidth")-box.offsetWidth;
// //->假设我们设定步长为10px,接下来我们让当前元素在现有的left基础上累加步长,就可以实现向右运动的动画了;
// window.setInterval(function () {
//     var curL = utils.css(box,"left");//->获取当前的left值
//     curL+=10;//->在现有的基础上累加步长实现当前这一步动画
//     utils.css(box,"left",curL);
// },17);//->我们设置动画的时候,时间因子一般都设置为17ms,也就是每隔17ms运动一步,17是在各个浏览器中动画效果相对流畅的一个值;



// //---------------------------------------------------优化一: 边界判断
// var box = document.getElementById("box");
// //->获取左边界和右边界的left值
// var minL = 0,
//     maxL = utils.win("clientWidth")-box.offsetWidth;
// //->假设我们设定步长为10px,接下来我们让当前元素在现有的left基础上累加步长,就可以实现向右运动的动画了;
//
// var timer = window.setInterval(function () {
//     var curL = utils.css(box,"left");//->获取当前的left值
//     //->为了防止多走一步会超过边界,少走一步到不了边界,我们JS实现动画的时候,边界判断都是加上步长来处理的(相当于模拟走一步看情况,如果模拟走一步超过了边界,我们直接让其运动到边界即可)
//
//     if(curL>=maxL){
//         utils.css(box,"left",maxL);
//         window.clearInterval(timer);
//         return;
//     }
//
//
//     curL+=10;//->在现有的基础上累加步长实现当前这一步动画
//
//     utils.css(box,"left",curL);
// },17);//->我们设置动画的时候,时间因子一般都设置为17ms,也就是每隔17ms运动一步,17是在各个浏览器中动画效果相对流畅的一个值;





// 这个是用setInterval实现需求的案例
