
//->strClass: 只支持传递一个样式类名
function byClass(strClass, context) {
    context = context || document;
    var ary = [],
        tagList = context.getElementsByTagName("*");
    strClass = strClass.replace(/^ +| +$/g, "").split(/ +/g);

    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i],
            curTagClass = curTag.className;
        var isMatch = true;
        for (var k = 0; k < strClass.length; k++) {
            var reg = new RegExp("(^| +)" + strClass[k] + "( +|$)");
            if(!reg.test(curTagClass)){
                isMatch = false;
                break;
            }
        }
        isMatch ?ary.push(curTag): null;
    }
    return ary;
}
console.log(byClass("w1 w2").length);

//->假设法