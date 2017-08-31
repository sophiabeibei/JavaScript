// function getCss(curEle, attr) {
//     var val = null;
//     if ('getComputedStyle' in window) {
//         //->兼容
//         val = window.getComputedStyle(curEle, null)[attr];
//     } else {
//         //->不兼容
//         val = curEle.currentStyle[attr];
//     }
//     return val;
// }
//---------------------------
//优化一：去掉获取样式值的单位
//-> 并不是所有的样式都能去单位,例如:display、position、float这些样式值都是字母,不能去单位；只有`数字+单位`这样的才有必要去单位
//-> 12.5px 去单位 parseFloat('12.5px')

// function getCss(curEle, attr) {
//     var val = null,
//         reg = null;
//     if ('getComputedStyle' in window) {
//         val = window.getComputedStyle(curEle, null)[attr];
//     } else {
//         val = curEle.currentStyle[attr];
//     }
//     //->去单位:只有符合‘数字+单位’这样格式的才去除单位
//     //reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/i;
//     reg = /^-?\d+(\.\d+)?([a-z]+)?$/i;
//     reg.test(val) ? val = parseFloat(val) : null;
//     return val;
// }

// function getCss(curEle, attr) {
//     var val = null;
//     if ('getComputedStyle' in window) {
//         val = window.getComputedStyle(curEle, null)[attr];
//     } else {
//         val = curEle.currentStyle[attr];
//     }
//     //->去单位:使用parseFloat转换后不是NaN的我们就去掉单位,否则不去
//     var temp = parseFloat(val);
//     val = isNaN(temp) ? val : temp;
//     return val;
// }

//----------------------------
//优化二：某些CSS样式在IE低版本浏览器中是不兼容的,我们获取样式的时候,在IE低版本下也要经过特殊的处理才可以
// -> opacity = xxx   [0~1]
// -> filter：alpha(opacity=(xxx*100))

// function getCss(curEle, attr) {
//     var val = null;
//     if ('getComputedStyle' in window) {
//         val = window.getComputedStyle(curEle, null)[attr];
//     } else {
//         //->如果传递进来的ATTR是OPACITY,说明用户想获取的是当前元素的透明度,那么在IE低版本下,我们需要使用FILTER获取,而且要在获取的结果中分析出对应的数值,最后把其除以100变为和OPACITY一模一样的结果
//         if (attr.toLowerCase() === 'opacity') {
//             val = curEle.currentStyle['filter'];
//             //->'alpha(opacity=[val])'
//             reg = /^alpha\(opacity=(.+)\)$/i;
//             val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
//         } else {
//             val = curEle.currentStyle[attr];
//         }
//     }
//     var temp = parseFloat(val);
//     val = isNaN(temp) ? val : temp;
//     return val;
// }

//------------------------------------
function getCss(curEle, attr) {
    var val = null;
    if ('getComputedStyle' in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr.toLowerCase() === 'opacity') {
            val = curEle.currentStyle['filter'];
            reg = /^alpha\(opacity=(.+)\)$/i;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    var temp = parseFloat(val);
    val = isNaN(temp) ? val : temp;
    return val;
}


console.log(getCss(box, 'opacity'));






