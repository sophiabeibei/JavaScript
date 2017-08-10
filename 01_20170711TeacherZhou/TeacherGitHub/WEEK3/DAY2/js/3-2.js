var oBox = document.getElementById('box');

/*
 * [元素].style.xxx：获取元素具体的样式属性值
 * =>只能获取到写在元素行内上的样式属性的值(所以这种方式几乎不用:因为我们很少会把样式写在元素的行内上)
 */

/*
 * 获取当前元素所有经过浏览器计算的样式
 * ->只要当前元数能在页面中展示,那么它的样式都是经过浏览器计算的,不管是是行内编写的样式,还是在样式表中编写,再或者你没有编写这些样式,浏览器也会默认为元素设置一些默认样式,这些样式都可以理解为经过浏览器计算的
 *
 * [标准浏览器]
 * -> window.getComputedStyle([元素],[样式伪类,一般都用NULL]) 获取的结果是一个对象,存储了所有经过计算的样式
 *
 * [IE6~8]
 * -> [元素].currentStyle 获取的结果也是一个对象,存储了所有经过计算的样式
 */

/*
 * getCss：获取当前元素经过浏览器计算的某一个样式(兼容所有的浏览器)
 *
 * @parameters
 *   curEle：当前需要操作的元素[object]
 *   attr：需要获取的样式属性名[string],例如:'paddingLeft'...
 *
 * @return
 *   获取的样式属性值
 */
function getCss(curEle, attr) {
    var val = null;
    if ('getComputedStyle' in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        val = curEle.currentStyle[attr];
    }
    return val;
}
console.log(getCss(oBox, 'marginTop'));

//->获取的结果是带着单位的,不带会更好,我们最好把单位去掉
//=>不是所有获取的样式属性值都要去单位的，类似于 float、position等样式属性值都不是数字，无单位可去，还有 '50px 40px'这种复合样式属性值也是没必要去单位的

//->有些样式属性值不同浏览器用的不一样，例如透明度
//=>标准：opacity  获取的结果就是一个数字
//=>IE低版本：filter  获取的结果是 'alpha(opacity=xxx)'