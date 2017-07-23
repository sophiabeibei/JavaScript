function getByClass(strClass, context) {
    context = context || document;
    if ('getElementsByClassName' in document) {
        return context.getElementsByClassName(strClass);
    }
    //->IE6~8
    var allNode = context.getElementsByTagName('*'),
        classList = strClass.replace(/^ +| +$/g, '').split(/ +/g),
        ary = [];
    for (var i = 0; i < allNode.length; i++) {
        var curNode = allNode[i],
            curName = curNode.className,
            flag = true;
        for (var j = 0; j < classList.length; j++) {
            var reg = new RegExp('\\b' + classList[j] + '\\b');
            if (!reg.test(curName)) {
                flag = false;
                break;
            }
        }
        flag ? ary.push(curNode) : null;
    }
    return ary;
}