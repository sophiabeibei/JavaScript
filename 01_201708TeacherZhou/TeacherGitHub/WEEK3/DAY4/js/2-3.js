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

//->批量设置元素的样式
function setGroupCss(curEle, options) {
    //->说明OPTIONS不是个纯对象(用大括号包起来的对象)
    if (Object.prototype.toString.call(options) !== '[object Object]') return;
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            setCss(curEle, attr, options[attr]);
        }
    }
}

setGroupCss(box, {
    width: 300,
    opacity: 0.5,
    height: 200,
    overflow: 'hidden',
    margin: '20px auto'
});