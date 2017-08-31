/*
 1、scrollTop 和 scrollLeft：当前容器(一般都是当前页面)卷去的高度和宽度
 ->学习的13个JS盒子模型属性，只有这两个属性是‘可读写’的(可以获取也可以设置)，而其余的11个属性都是‘只读’的
 ->为了兼容浏览器，我们设置或者获取页面的盒子模型属性值的时候，都要写两套
 ->有最小值，最小值是零，设置的值小于零也没用
 ->有最大值，真实页面的高度(document.documentElement.scrollHeight||document.body.scrollHeight) - 可是窗口的高度(document.documentElement.clientHeight||document.body.clientHeight)
 */

// var goLink = document.getElementById('goLink');
// goLink.onclick = function () {
//     //->让浏览器卷去的高度设置为零<=>回到顶部
//     utils.win('scrollTop', 0);
// };
//----太生硬了,我们想实现点击回到顶部,页面慢慢滚回到顶部的效果


var goLink = document.getElementById('goLink');
goLink.onclick = function () {
    //->设置一个定时器,让其每隔一段时间,在现有的SCROLLTOP基础上减去我们的步长,一直减到小于等于零为止
    var timer = setInterval(function () {
        //->ST:scrollTop
        //->获取现有的ST的值
        var curTop = utils.win('scrollTop');
        //->如果现有的ST的值,已经小于等于零了,说明已经回到顶部了,那么操作这个动画的定时器应该停止,结束当前的动画
        if (curTop <= 0) {
            clearInterval(timer);
            return;
        }
        //->在现有基础上减去步长(步长越大走的越快,反之步长越小走的越慢)
        curTop -= 1000;
        //->让浏览器运动到最新步长的位置
        utils.win('scrollTop', curTop);
    }, 17);
};

//-----需要完善的
//1、开始的时候,回到顶部的按钮并不会展示,只有当卷去的内容高度超过一屏幕高度的时候,按钮才会展示
// window.onscroll=function () {} 当浏览器的滚动条发生滚动(鼠标滚轮、JS代码、手动拖动滚动条、键盘的某些按键 都可能会触发滚动条滚动)，触发onscroll事件执行

//2、当第一次点击回到顶部,开始我们的动画,接下再来在点击这个按钮应该不会有任何的操作才可以,直到当前的动画完成(回到顶部了),再次点击这个按钮才会有作用 =>'动画运动期间，防止按钮的重复点击'

//3、当回到顶部的动画正在运行中，但是我们滚动了鼠标的滚轮，此时应该立即结束当前正在运行的动画，以用户接下来的手动操作为准 (京东淘宝等都没有实现这个功能,功能实现起来比较的复杂)