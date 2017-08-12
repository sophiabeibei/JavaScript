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

function setGroupCss(curEle, options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') return;
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            setCss(curEle, attr, options[attr]);
        }
    }
}

//=>把上述三个方法综合到一个CSS方法中
// function css() {
//     var arg = arguments,
//         len = arg.length;
//     if (len >= 3) {
//         //setCss(arg[0], arg[1], arg[2]);
//         setCss.apply(null, arg);
//         return;
//     }
//     if (len === 2 && typeof arg[1] === 'object') {
//         setGroupCss.apply(null, arg);
//         return;
//     }
//     return getCss.apply(null, arg);
// }

function css() {
    var arg = arguments,
        len = arg.length,
        fn = getCss;
    if (len >= 3) fn = setCss;
    if (len === 2 && typeof arg[1] === 'object') fn = setGroupCss;
    return fn.apply(null, arg);
}