function byClass(strClass, context) {
    context = context || document;
    var ary = [],
        tagList = context.getElementsByTagName('*');
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i],
            curTagClass = curTag.className;
        //->排除法：不管当前标签是否符合,我们先放在ARY容器中,然后再循环strClass,把不符合的在数组中排除掉即可
        ary.push(curTag);
        for (var k = 0; k < strClass.length; k++) {
            var reg = new RegExp('(^| +)' + strClass[k] + '( +|$)');
            if (!reg.test(curTagClass)) {
                ary.length--;
                break;
            }
        }
    }
    return ary;
}