/*用到的知识点:
 1.oList[i].curIndex = i / oList[curIndex] / oDivList[curIndex]: 自定义属性
 2.changeTab(this.curIndex): this关键字
 3.changeTab(this.curIndex): 普通函数执行 / 实参
 4.function changeTab(curIndex) {}: 形参.实参;
 5.getElementById / getElementsByTagName: DOM获取元素的方法
 6.for (var i = 0; i < oList.length; i++) {}: for循环遍历元素对

 */


var oTab = document.getElementById("tabBox");
var oList = oTab.getElementsByTagName("li");
var oDivList = oTab.getElementsByTagName("div");


function changeTab(curIndex) {
    for (var i = 0; i < oList.length; i++) {
        oList[i].className = null;
        oDivList[i].className = null;
    }
    oList[curIndex].className = "select";
    oDivList[curIndex].className = "select";
}
//方法一: 自定义属性的一套方式: 用异步编程和自定义属性的原理,来解决这个问题;
/*for (var i = 0; i < oList.length; i++) {
    oList[i].curIndex = i;
    //事件绑定属于js的异步编程;当点击的时候,其实循环已经结束了;所以我们用到变量i的值就是3;
    oList[i].onclick = function () {
        changeTab(this.curIndex);
    }
}*/


/**js当中的同步编程和异步编程
 *  同步:
 *     自上而下依次执行,上面的事情没有处理完,下面的事情一直在等待;
 *  异步:
 *     当上面的事情在等待执行的时候,我们不等,继续执行下面的事情;
 *
 *     先简单理解,第九周会讲同步和异步;
 *
 *     js中只有这四个是异步编程: 事件绑定,定时器,回调函数,ajax;
 *     剩下的都是同步;
 *
 */




//方法二: 作用域来分析      耗性能,每次执行都形成了一个不销毁的作用域;    还是用自定义属性比较好;
/*for (var i = 0; i < oList.length; i++) {
    ~function (i) {
        oList[i].onclick = function () {
            changeTab(i);
        }
    }(i);//->每一次循环把全局作用域下的i变量存储的值,当作实参传递给形参i(私有变量);
}*/

//方法三: return 返回值的方法
for (var i = 0; i < oList.length; i++) {
    oList[i].onclick = (function () {
        return function (i) {
            changeTab(i);
        };
    })();
}