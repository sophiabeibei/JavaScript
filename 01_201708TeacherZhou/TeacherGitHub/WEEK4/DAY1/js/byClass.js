//->byClass：getElementsByClassName的兼容处理，在指定上下文中，通过传递的样式类名，获取拥有这些样式类的元素
function byClass(strClass, context) {
    context = context || document;
    if ('getElementsByClassName' in document) {
        return [].slice.call(context.getElementsByClassName(strClass));
    }

    //=>IE6~8不兼容的情况下我们按照如下的方式处理
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    var tagList = context.getElementsByTagName('*'),
        result = [];
    for (var i = 0; i < tagList.length; i++) {
        var item = tagList[i],
            itemClass = item.className;
        //->拿当前的标签和传递的样式类一个个的比较,看看当前的标签是否包含传递的所有样式类,如果都包含,ITEM就是我想要的,只要有一个不包含,则不是我们想要的
        var isMatch = true;
        for (var k = 0; k < strClass.length; k++) {
            var reg = new RegExp('(^| +)' + strClass[k] + '( +|$)');
            if (!reg.test(itemClass)) {
                isMatch = false;
                break;
            }
        }
        isMatch ? result.push(item) : null;
    }
    return result;
}