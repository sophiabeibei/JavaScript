// var goLink = document.getElementById("goLink");
// goLink.onclick = function () {
//     //->让浏览器卷去的高度设置为零 <=> 回到顶部
//     utils.win("scrollTop",0);
// };
//->以上效果太生硬了,我们想实现点击回到顶部,页面慢慢滚动回到顶部的效果;
//->每隔一段时间重复做一件事情  --->用定时器

var goLink = document.getElementById("goLink");
goLink.onclick = function () {
    //->设置一个定时器,让其每隔第一段时间在现有的scrollTop基础上减去我们的步长,一直减到小于等于0为止;
    var timer = window.setInterval(function () {//->window.setInterval中,window.可以省略
        //->获取当前scrollTop值
        var curTop = utils.win("scrollTop");
        //->如果现有的st的值,已经小于等于0,说明已经回到顶部了,那么操作这个动画的定时器应该停止,结束当前的动画;
        if(curTop <=0){
            clearInterval(timer);
        }
        //->步长就是1000,在现有的scrollTop基础上减去我们的步长(步长越大走的越快,反之步长越小走的越慢)
        curTop -= 10;
        //->让浏览器运动到最新步长的位置
        utils.win("scrollTop",curTop);

    },17);//->一般都写17毫秒
};


//--------------需要完善的
//1.开始的时候,回到顶部的按钮并不会展示,只有卷去的内容高度超过一屏幕高度的时候,按钮才会展示
//window.onscroll = function(){}当浏览器的滚动条发生滚动(鼠标滚轮,JS代码,手动拖动滚动条,键盘的某些按键都可能会触发滚动条滚动),触发onscroll事件执行

//2.当第一次点击回到顶部,开始我们的动画,接下来再来再点击这个按钮应该不会有任何的操作才可以,直到当前的动画完成(回到顶部了),再次点击这个按钮才会有作用=>"动画运动期间,防止按钮的重复点击"

//3.当回到顶部的动画正在运行中,但是我们滚动了鼠标的滚轮,此时应该立即结束当前正在运行的动画,以用户接下来的手动操作为准(京东淘宝等都没有实现这个功能,功能实现起来比较复杂)




