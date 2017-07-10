/**
 * Created by iBei on 2017/6/13.
 */
var $outer = $("#outer");
var outer = $("#outer");
var $swip = $("#swip");
var $oUl = $("#focus");
var $oImg;
var maxLength;
$.ajax({
    url: "./data.json",//请求接口
    type: "get",//请求类型
    async : false,//现在是同步;默认不加这个属性是异步;
    success: function (data) {//请求成功后,执行function中的代码
        console.log(data);
        bindDate(data);
    }
});
function bindDate(data) {
    var imgStr = '';
    var liStr = '';
    $.each(data,function (index){//$.each循环data数据
        //console.log(data);
        var cur = data[index];
        imgStr+='<img data-src='+cur.img+'>';// data-src : 自定义属性
        liStr+='<li></li>';
        console.log(liStr);
    });
    $swip.html(imgStr);//把拼接好的字符串放进页面的盒子;
    $oUl.html(liStr);
    $("ul li").eq(0).addClass("selected");
    $oImg = $("#outer img");//需要等到页面img拼接到页面中,开始获取
    maxLength = $oImg.last().index();
    delayImg();
}
function delayImg() {
    $oImg.each(function (index) {// each就是for循环;
        //each方法中  this是每个img
        var that = $(this);
        var newImg = new Image;//原生创建
        var trueSrc = $(this).attr("data-src");
        newImg.src = $(this).attr("data-src");//attr 获取元素的自定义属性
        $(newImg).load(function () {// 当new成功找到图片时,执行load中回调函数
            that.attr("src",trueSrc);
            index === 0 ? that.fadeIn(300) : that.fadeOut();
            newImg = null
        })
    });
    outer.step = 0;
    outer.timer = setInterval(autoMove,2000);
}
function autoMove(n) {
    outer.step ++;
    //如果当前的n不是undefined,那么n就是outer.step
    typeof n !== "undefined" ? outer.step = n : null;
    //当显示最后一张,下次让outer.step变成0
    outer.step > maxLength ? outer.step = 0 : null;
    $oImg.eq(outer.step).stop().fadeIn().siblings().fadeOut();
    $("ul li").eq(outer.step).addClass("selected").siblings().removeClass("selected");
}
$outer.hover(function () {//可以传参两个function
    $(this).children("a").show();//划入显示效果
    clearInterval(outer.timer);//划入移除定时器
},function () {
    $(this).children("a").hide();//划出隐藏
    outer.timer = setInterval(autoMove,2000);//重新设置定时器
});
$("ul li").each(function () {//each遍历每个li
    console.log(this);
    $(this).mouseover(function () {//this->每一个li
        autoMove($(this).index());//划入,执行autoMove
    })
});
$("#right").click(function () {
    autoMove();
});
$("#left").click(function () {
    outer.step -= 2;
    if(outer.step < -1){
        outer.step = maxLength - 1;
    }
    autoMove();
});






