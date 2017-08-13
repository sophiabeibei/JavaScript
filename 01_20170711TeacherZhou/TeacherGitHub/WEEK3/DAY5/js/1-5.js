// function byClass(strClass, context) {
//     context = context || document;
//     var ary = [],
//         tagList = context.getElementsByTagName('*');
//
//     //->去除字符串的首尾空格
//     strClass = strClass.replace(/^\s+|\s+$/g, '');
//
//     //->如果传递进来的样式类名有多个,我们需要把它拆分成一个个的
//     strClass = strClass.split(/\s+/g);//->假设:['w2','w1','w3']
//
//     for (var i = 0; i < tagList.length; i++) {
//         var curTag = tagList[i],
//             curTagClass = curTag.className;
//         //->拿当前获取的标签以及它的样式类的值，去和传递进来的strClass中的每一项进行逐一的比较,我们首先假设当前标签和传递的样式都匹配,在比较过程中如果遇到一个不匹配的,结束比较即可,当前标签就不是我想要的,反之比较完成后,确实都匹配,把当前标签存储起来即可
//         var isMatch = true;//->假设都匹配,然后循环传递进来的样式类,一个个的去验证,证明假设的真假
//         for (var k = 0; k < strClass.length; k++) {
//             var reg = new RegExp('(^| +)' + strClass[k] + '( +|$)');
//             if (!reg.test(curTagClass)) {
//                 isMatch = false;//->发现了一个不匹配的,假设的是错的,也没有必要在向后比较其他的了
//                 break;
//             }
//         }
//         //->循环结束后,我们看isMatch的真假,如果是真,则当前的元素是我们想要的
//         isMatch ? ary.push(curTag) : null;
//     }
//     return ary;
// }
function byClass(strClass, context) {
    context = context || document;
    var ary = [],
        tagList = context.getElementsByTagName('*');
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i],
            curTagClass = curTag.className;
        var isMatch = true;
        for (var k = 0; k < strClass.length; k++) {
            var reg = new RegExp('(^| +)' + strClass[k] + '( +|$)');
            if (!reg.test(curTagClass)) {
                isMatch = false;
                break;
            }
        }
        isMatch ? ary.push(curTag) : null;
    }
    return ary;
}