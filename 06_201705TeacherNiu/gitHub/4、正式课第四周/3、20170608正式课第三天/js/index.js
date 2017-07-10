// 获取元素
var outer  = document.getElementById("outer");
var swiper = document.getElementById("swiper");
var oDiv = swiper.getElementsByTagName("div");
var length = oDiv.length;
// 焦点
var oUl = document.getElementById("focus");
var oLis = oUl.getElementsByTagName("li");
//左右切换
var left = document.getElementById("left");
var right = document.getElementById("right");
var width = oDiv[0].offsetWidth;
var timer = setInterval(autoMove,3000);//等待3000毫秒执行一次autoMove
var step = null;// 记录当前轮播的位置（第几张图片）
// 图片轮播的方法
function autoMove(n) {// n = 0 1 2 3
    step++;
    typeof n!=="undefined"?step = n:null;
    if(step > length-1){
        utils.css(swiper,"left",0)
        step = 1;
    }
    zfAnimate(swiper,{
        left : step*-width
    },300)// 一张图片从右侧轮播到左侧的时间
    changeTip(step);
};
// 思路 ： 选中的li ,跟随图片进行轮播
// 新增class，删除其他li class
// 用step 把图片和li 进行关联
// 2、焦点跟随
//  当step =0 ； 是第一张图片，那么i是0 时候，那么第一个li
//  当step =1 ； 是第二张图片，那么i是1时候，那么第二个li
function changeTip(n) {
    for(var i=0;i<oLis.length;i++){
        var cur = oLis[i];
         i === n ?utils.addClass(cur,"selected"):utils.removeClass(cur,"selected");
        if(n === 4){
            utils.addClass(oLis[0],"selected");
        }
    }
}
// 点击焦点，实现图片切换

for(var i=0;i<oLis.length;i++){
    var curLi = oLis[i];
    curLi.index= i;
    curLi.onclick = function () {
        autoMove(this.index);
    }
}
// 鼠标划入让轮播停止，并且让左右切换按钮显示出来
outer.onmousemove = function () {
    // console.log(1)
    // debugger
    left.style.display = "block";
    right.style.display = "block";
    clearInterval(timer);
}
// 鼠标划出，轮播继续，让左右切换按钮隐藏
outer.onmouseout = function () {
    left.style.display = "none";
    right.style.display = "none";
    timer = setInterval(autoMove,3000)
};

// 实现左右切换
// 右侧按钮，让轮播图切换到下一张
right.onclick = function () {
    autoMove();
}
// 点击左侧按钮，让图片轮播到上一张
left.onclick = function () {
    step--;
    if(step === -1){// 当前页面是第一张显示时，点击左侧切换按钮，让当前显示的图片变成最后一张图片，让step变成第四张图片对应的索引
        utils.css(swiper,"left",(length-1)*-width);
        step = length-2;
    }
    zfAnimate(swiper,{
        left: step * -width
    },300)
    changeTip(step);
}










