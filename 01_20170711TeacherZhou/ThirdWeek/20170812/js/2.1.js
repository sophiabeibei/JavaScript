// var box = document.getElementById("box");
// function getCss(curEle,attr){
//     var val = null;
//     if("getComputedStyle" in window){
//         //->兼容
//         val = window.getComputedStyle(curEle,null)[attr];
//     }else{
//         //->不兼容
//         val = curEle.currentStyle[attr];
//     }
//     return val;
// }
// console.log(getCss(box, "paddingLeft"));

//=============================
//优化一: 获取样式值的单位
//并不是所有的样式都能去单位,例如: display,position,float这些样式值都是字母,不能去单位;只有"数字+单位"这样的才有必要去大呢我i;
//->12.5px 去单位 parseFloat("12.5px")
// function getCss(curEle,attr){
//     var val = null;
//     if("getComputedStyle" in window){
//         val = window.getComputedStyle(curEle,null)[attr];
//     }else{
//         val = curEle.currentStyle[attr];
//     }
//     //->去单位: 使用parseFloat转换后不是NaN的我们就去掉单位,否则不去;(去单位的第一种方式,这种方式最好的(粗暴: 能去就去,不能去就不去;))
//     var temp = parseFloat(val);
//     val = isNaN(temp) ? val : temp;
//     return val;
// }
// console.log(getCss(box, "paddingLeft"));//->50px
// console.log(getCss(box, "display"));//->block
//parseFloat("block")//->NaN




//去单位的第二种方式,不建议使用
// function getCss(curEle,attr){
//     var val = null;
//     if("getComputedStyle" in window){
//         val = window.getComputedStyle(curEle,null)[attr];
//     }else{
//         val = curEle.currentStyle[attr];
//     }
//     //->去单位: 只有符合"数字+单位"这样格式的才去单位;(去单位的第二种方式,不建议使用)
//     //reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/i;//->正则匹配的第一种方式
//     reg = /^-?\d+(\.\d+)?([a-z]+)?$/i;//->正则匹配的第二种方式
//     reg.test(val) ? val = parseFloat(val) : null;
//
//     var temp = parseFloat(val);
//     val = isNaN(temp) ? val : temp;
//     return val;
// }
//margin: 标准和不标准浏览器的区别(标准是0;不标准是auto),所以要用reset.css;


//=============================
//优化二: 某些CSS样式在IE低版本浏览器中是不兼容的,我们获取样式的时候,在IE低版本下也要经过特殊的处理才可以;
//->opacity = xxx;
//->filter: alpha(opacity = (xxx*100))
// function getCss(curEle,attr){
//     var val = null;
//     if("getComputedStyle" in window){
//         val = window.getComputedStyle(curEle,null)[attr];
//     }else{
//         //->如果传递进来的attr是opacity,说明用户想获取的是当前元素的透明度;那么在IE低版本下,我们需要使用filter获取,而且要在获取的结果中分析出对应的数值,最后把结果值除以100变为和opacity一模一样的结果;
//         if(attr.toLowerCase() === "opacity"){
//             val = curEle.currentStyle["filter"];
//             //->"alpha(opacity=[val])"
//             reg = /^alpha\(opacity=(.+)\)$/i;
//             val = reg.test(val)?reg.exec(val)[1]/100 : 1;//->1代表没设置透明度
//         }else{
//             val = curEle.currentStyle[attr];
//         }
//     }
//     var temp = parseFloat(val);
//     val = isNaN(temp) ? val : temp;
//     return val;
// }
// console.log(getCss(box, "opacity"));//->block

// ------------------------------------------------------------------
// 无注释版
// function getCss(curEle,attr){
//     var val = null;
//     if("getComputedStyle" in window){
//         val = window.getComputedStyle(curEle,null)[attr];
//     }else{
//         if(attr.toLowerCase() === "opacity"){
//             val = curEle.currentStyle["filter"];
//             reg = /^alpha\(opacity=(.+)\)$/i;
//             val = reg.test(val)?reg.exec(val)[1]/100 : 1;
//         }else{
//             val = curEle.currentStyle[attr];
//         }
//     }
//     var temp = parseFloat(val);
//     val = isNaN(temp) ? val : temp;
//     return val;
// }






//getCss