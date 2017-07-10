/**
 * Created by iBei on 2017/6/8.
 */
var outer = document.getElementById("outer");
var swiper = document.getElementById("swiper");
var oDiv = swiper.getElementsByTagName("div");
var oUl = document.getElementById("focus");
var oLis = oUl.getElementsByTagName("li");
var left = document.getElementById("left");
var right = document.getElementById("right");
var width = oDiv[0].offsetWidth;
var timer = setInterval(AutoMove,2000);
var step = null;
function AutoMove(n) {//n=1\2\3...
    step++;
    typeof n !== "undefined" ? step = n : null;
    if(step > oDiv.length-1){
        utils.css(swiper,"left",0);
        step = 1;
    }
    zfAnimate(swiper,{
        left: step * -width
    },1000);
    ChangeTip(step);
}
//焦点自动跟随图片轮播
//需求: 选中的li,跟随图片进行轮播
//新增class,删除其他li的class
//用step把图片和li进行关联
function ChangeTip(n) {
    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i];
        //外面变量跟当前函数的关系-->参数
        i === n ? utils.addClass(cur,"selected") : utils.removeClass(cur,"selected");
        if(n === 4){
            utils.addClass(oLis[0],"selected");
        }
    }
}
for (var i = 0; i < oLis.length; i++) {
    var cur = oLis[i];
    cur.index = i;
    cur.onclick = function () {
        AutoMove(this.index);
    }
}
outer.onmousemove = function (){
    left.style.display = "block";
    right.style.display = "block";
    clearInterval(timer);
};
outer.onmouseout = function () {
    left.style.display = "none";
    right.style.display = "none";
    timer = setInterval(AutoMove,3000);
};
right.onclick = function () {
    AutoMove();
};
left.onclick = function () {
    step--;
    if(step === -1){
        utils.css(swiper,"left",(oDiv.length-1) * -width);
        step = oDiv.length - 2;
    }
    zfAnimate(swiper,{
        left: step * -width
    },1000);
    ChangeTip(step);
};


