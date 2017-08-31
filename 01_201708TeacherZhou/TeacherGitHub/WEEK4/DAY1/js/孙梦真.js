function children(curEle, tag) {
    var nodeList = curEle.childNodes,
        result = [];
    for (var i = 0; i < nodeList.length; i++) {
        var cur = nodeList[i];
        if (cur.nodeType === 1) {
            if (typeof tag !== "undefined") {
                cur.tagName.toUpperCase() === tag.toUpperCase() ? result.push(cur) : null;
                continue;
            }
            result.push(cur);
        }
    }
    return result;
}