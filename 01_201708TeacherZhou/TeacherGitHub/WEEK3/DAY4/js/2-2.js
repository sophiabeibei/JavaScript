//优化一:自动补充单位
// -> 传递进来的VALUE如果是一个数字,我们自动补充PX单位；如果传递进来的有单位，我们不管
// -> 不是所有的样式属性都需要加单位，例如：position、float等传递进来的都是字母，不需要加，而且也不是传递的是数字就一定要加，在比如opacity、zIndex、fontWeight传递的都是数字，但是不需要单位

// function setCss(curEle, attr, value) {
//     //->加单位:纯数字并且不是opacity、zIndex、fontWeight这三个,我们加单位
//     var unitReg = /^(opacity|zIndex|fontWeight)$/i;
//     if (!isNaN(value) && !unitReg.test(attr)) {
//         value += 'px';
//     }
//     curEle['style'][attr] = value;
// }

//----------------------
//优化二：如果ATTR是OPACITY,我们需要设置两套,一套用FILTER来兼容IE
function setCss(curEle, attr, value) {
    if (attr.toLowerCase() === 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = 'alpha(opacity=' + (value * 100) + ')';
        return;
    }

    var unitReg = /^(zIndex|fontWeight)$/i;
    if (!isNaN(value) && !unitReg.test(attr)) {
        value += 'px';
    }
    curEle['style'][attr] = value;
}










