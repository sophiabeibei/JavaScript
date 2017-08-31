/**
 * getCss: 获取当前元素经过浏览器计算的样式属性值
 * @parameters curEle: 当前需要操作的元素  [Object]
 * @parameters attr: 要获取样式值的属性名   [String]
 * @return: 要获取的样式属性值
 *
 */
function getCss(curEle, attr) {
    //->验证必传项
    if(typeof curEle === "undefined" || typeof attr === "undefined"){
        throw new ReferenceError("传递的参数有误,要求curEle或者attr必须传递!");
    }
    var val = null,
        reg = null;
    if ("getComputeStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr.toLowerCase() === "opacity") {
            val = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?\d+(\.\d+)?(px|em|rem)?$/i;
    val = reg.test(val) ? parseFloat(val) : val;
    return val;
}


//最终版本;
