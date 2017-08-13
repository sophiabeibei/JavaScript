//->strClass：只支持传递一个样式类名
function byClass(strClass, context) {
    context = context || document;
    var ary = [],
        tagList = context.getElementsByTagName('*');

    //->如果传递进来的strClass左右两边存在空格,导致最后的匹配不准确
    // strClass=' w2 '
    // var reg=/(^| +) w2 ( +|$)/;  =>w2的左右两边要不然是开头和结尾,要不然至少拥有两个空格
    // var str="w1 w2 w3";
    // reg.test(str); ->false
    //->我们首先需要把传递进来的strClass的左右空格(首尾)去掉 =>`去除字符串的首尾空格`
    strClass = strClass.replace(/^\s+|\s+$/g, '');

    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i],
            curTagClass = curTag.className;
        //->验证某一个字符串中是否包含我们传递进来的这个样式类名
        var reg = new RegExp('(^| +)' + strClass + '( +|$)');

        //->如果当前标签的样式类名中包含传递进来的样式类,那么这个标签就是我们想要的,我们把其添加到数组的末尾
        reg.test(curTagClass) ? ary.push(curTag) : null;
    }
    return ary;
}