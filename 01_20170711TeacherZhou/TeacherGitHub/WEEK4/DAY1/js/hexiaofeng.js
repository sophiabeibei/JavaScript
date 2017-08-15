function hasClass(ele, strClass) {
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    var isMatch = true,
        originalClass = ele.className;
    for (var i = 0; i < strClass.length; i++) {
        var item = strClass[i];
        var reg = new RegExp('(^| +)' + item + '( +|$)');
        if (!reg.test(originalClass)) {
            isMatch = false;
            break;
        }
    }
    return isMatch;
}


function addClass(ele, strClass) {
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    for (var i = 0; i < strClass.length; i++) {
        var item = strClass[i];
        if (hasClass(ele, item)) continue;
        ele.className = ' ' + item;
    }
    ele.className = ele.className.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}

function removeClass(ele, strClass) {
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    var originalClass = ele.className.replace(/\s+/g, '  ');//->替换成两个空格,防止捕获的时候,两次匹配的结果公用一个位置
    for (var i = 0; i < strClass.length; i++) {
        var item = strClass[i],
            reg = new RegExp('(^| )' + item + '( |$)', 'g');
        reg.test(originalClass) ? originalClass = originalClass.replace(reg, ' ') : null;
    }
    ele.className = originalClass.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}