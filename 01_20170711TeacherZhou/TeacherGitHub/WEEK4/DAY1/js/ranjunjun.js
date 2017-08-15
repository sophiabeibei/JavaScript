function getCss(curEle, attr) {
    var val, opaReg;
    if ('getComputedStyle' in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr.toLowerCase() === "opacity") {
            val = curEle.currentStyle["filter"];
            opaReg = /\d+(\.\d+)?/;
            val = opaReg.test(val) ? opaReg.exec(val)[0] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    return isNaN(parseFloat(val)) ? val : parseFloat(val);
}

function setCss(curEle, attr, value) {
    if (attr.toLowerCase() === 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
        return;
    }
    !isNaN(value) && !/^(zIndex|fontWeight)$/i.test(attr) ? value += 'px' : null;
    curEle["style"][attr] = value;
}

