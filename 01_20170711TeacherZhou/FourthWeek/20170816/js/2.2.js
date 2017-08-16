//匀速动画二: [时间固定,步长不固定]: 轮播图案例;所以时间固定动画是最常用的


// //==========================================匀速动画二: 原稿
// //->求出当前元素的位置
// //->公式t/d*c+b: 通过这个公式,可以计算出当前元素的位置;
// function linear(t, b, c, d) {
//     //->t: time 当前已经走的时间
//     //->b: begin 起始的位置
//     //->c: change 总距离 (起始位置距离目标位置之间的距离)
//     //->d: duration 总时间
//     return t/d*c+b;//->t/d自己走的时间占据全程时间的百分之多少;t/d*c: 走了多远,乘以总共要运动的位置;t/d*c+b: 已经到哪;
// }
// var begin = utils.css(box,"left"),//->begin起始位置
//     target = utils.win("clientWidth")-box.offsetWidth;//->target目标值
// var change = target-begin,//->change总距离
//     duration = 1000,//->时间固定: 总时间
//     time = 0;//->已经走过的时间
//
//     /*// 这还是步长的一套;所以时间因子和速度都不用;不用这个方法;
//     // var interval= 17;//->时间因子
//     // var speed = change/duration*interval;//->speed速度*/
//
// box.timer = setInterval(function () {
//     time+=17;
//     //->如果已经走的时间time大于等于总时间duration,应该结束动画;
//     if(time>=duration){
//         utils.css(box,"left",target);//->让元素它运动到目标位置(target是目标位置)
//         clearInterval(box.timer);
//         return;
//     }
//     var curL = linear(time,begin,change,duration);//->当前元素curL的位置
//     utils.css(box,"left",curL);
// },17);




//==========================================匀速动画二: 裸码
function linear(t, b, c, d) {
    return t/d*c+b;
}
var begin = utils.css(box,"left"),
    target = utils.win("clientWidth")-box.offsetWidth;
var change = target-begin,
    duration = 1000,
    time = 0;
box.timer = setInterval(function () {
    time+=17;
    if(time>=duration){
        utils.css(box,"left",target);
        clearInterval(box.timer);
        return;
    }
    var curL = linear(time,begin,change,duration);
    utils.css(box,"left",curL);
},17);











































