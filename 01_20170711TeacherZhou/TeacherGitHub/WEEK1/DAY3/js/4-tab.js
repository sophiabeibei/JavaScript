var tabBox = document.getElementById('tabBox'),
    oList = tabBox.getElementsByTagName('li'),
    oDivList = tabBox.getElementsByTagName('div');

function tabChange(curIndex) {
    for (var i = 0; i < oList.length; i++) {
        oList[i].className = oDivList[i].className = null;
    }
    oList[curIndex].className = oDivList[curIndex].className = 'select';
}

// for (var i = 0; i < oList.length; i++) {
//     oList[i].index = i;
//     oList[i].onclick = function () {
//         tabChange(this.index);
//     }
// }

/*
 * JS中的同步编程和异步编程
 *  同步：
 *    自上而下依次执行,上面的事情没有处理完,下面事情一直在等待
 *  异步:
 *    当上面的事情在等待执行的时候,我们不等,继续执行下面的事情，JS中的事件绑定属于异步编程
 */

// for (var i = 0; i < oList.length; i++) {
//     ~function (i) {
//         oList[i].onclick = function () {
//             tabChange(i);
//         }
//     }(i);//->每一次循环把全局作用域下的i变量存储的值,当做实参传递给形参i(私有变量)
// }

for (var i = 0; i < oList.length; i++) {
    oList[i].onclick = (function (i) {
        return function () {
            tabChange(i);
        }
    })(i);
}










