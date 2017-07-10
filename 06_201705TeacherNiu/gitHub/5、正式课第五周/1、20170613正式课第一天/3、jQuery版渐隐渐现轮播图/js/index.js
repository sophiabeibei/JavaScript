var $outer = $("#outer");
var outer = $("#outer")[0];// 原生对象
var $swip = $("#swip");
var $oUl = $("#focus");
var $oImgs;
var maxLength;
//  1、拉取数据
$.ajax({
    url : "./data.json",// 请求的地址
    type: "get",  // 请求类型
    async : false,
    success : function (data) { //请求成功后，执行function中的代码
        //console.log(data)
        bindData(data);
    }
})

// 2、绑定数据,拼接
function bindData(data) {
    var imgStr = "";
    var liStr = "";
    $.each(data,function (index) {
        //{"img":"./images/1.jpg"}
        var cur = data[index];
        imgStr+='<img data-src='+ cur.img +'>'// data-src  : 自定义属性
        liStr+='<li></li>';
    });
    $swip.html(imgStr);// 把拼接好的字符串放进页面盒子
    $oUl.html(liStr);
    $("ul li").eq(0).addClass("selected");
    $oImgs = $("#outer img");// 需要等到页面img拼接到页面中，开始获取
    maxLength = $oImgs.length-1;
    delayImg();
};
// 3、图片延迟加载
function delayImg() {
    $oImgs.each(function (index) {
        // this 代表每一个img
        // console.log(this)
        var that = $(this);
        var  newImg = new Image;// 原生创建的
        var trueSrc = $(this).attr("data-src")
        newImg.src = trueSrc;// attr  获取元素的自定义属性
        $(newImg).load(function () {// 当newImg能够成功找到图片时，执行load中回调函数
            that.attr("src",trueSrc);
            index === 0?that.fadeIn(300):that.fadeOut();
            newImg = null;
        })
    });
    outer.step = 0;
    outer.timer =setInterval(autoMove,2000);

}
// 4、实现渐隐渐现的效果
function autoMove(n) {
    // debugger
    outer.step ++;
    typeof n!=="undefined"?outer.step = n:null;
    // 当显示最后一张，下一次让outer.step变成0
    outer.step > maxLength?outer.step = 0 : null;
    $oImgs.eq(outer.step).stop().fadeIn(300).siblings().fadeOut();
    $("ul li").eq(outer.step).addClass("selected").siblings().removeClass("selected");
}
//5、划入划出
$outer.hover(function () {
    $(this).children("a").show();
    clearInterval(outer.timer)// 划入移除定时器
},function () {
    $(this).children("a").hide();
    outer.timer = setInterval(autoMove,2000)// 重新设置定时器
});
// 6、给每一个li 绑定划入划出
$("ul li").each(function () {
    $(this).mouseover(function(){
        autoMove($(this).index())
    })
})
// 7、左右切换
$("#right").click(function(){
    autoMove();
})
$("#left").click(function(){
    // 3 step =2     2 : 0
    outer.step-=2;
    // 当显示第一张，
    if(outer.step<-1){
        outer.step = maxLength-1;
    }
    autoMove();
});




