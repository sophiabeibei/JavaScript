//->获取容器所有的元素子节点
//=>children:它在IE6~8下会把注释也当做元素节点来处理
//=>childNodes:获取所有的子节点
//=>思路:先获取所有的子节点,遍历集合,把所有NODETYPE===1的保存起来即可
// function children(curEle) {
//     var ary = [],
//         nodeList = curEle.childNodes;
//     for (var i = 0; i < nodeList.length; i++) {
//         var cur = nodeList[i];
//         if (cur.nodeType === 1) {
//             ary.push(cur);
//         }
//     }
//     return ary;
// }

//=======================================
//->需求升级：我们不仅要获取元素子节点,而且还想能够通过指定标签名来获取到指定标签元素子节点
//=>例如：当前案例中,我们想获取LIST中的所有DIV
// function children(curEle, tag) {
//     var ary = [],
//         nodeList = curEle.childNodes;
//     for (var i = 0; i < nodeList.length; i++) {
//         var cur = nodeList[i];
//         if (cur.nodeType === 1) {
//             ary.push(cur);
//         }
//     }
//
//     //->如果指定了标签名,在所有元素子节点(ARY)中进行二次筛选
//     if (typeof tag !== 'undefined') {
//         for (var k = 0; k < ary.length; k++) {
//             //->如果传递的标签名和当前循环这一项的标签名不相同,我们在数组中把它干掉即可
//             var curAry = ary[k],
//                 curTagName = curAry.tagName.toUpperCase();//->xxx.tagName:获取当前元素的标签名,一般都是大写,有时候也是小写
//             if (curTagName !== tag.toUpperCase()) {
//                 //->不是我们想要的,在数组中干掉它(防止数组塌陷)
//                 ary.splice(k, 1);
//                 k--;
//             }
//         }
//     }
//     return ary;
// }

function children(curEle, tag) {
    var ary = [],
        nodeList = curEle.childNodes;
    for (var i = 0; i < nodeList.length; i++) {
        var cur = nodeList[i];
        //->不仅仅NODETYPE===1是我们想要的了,如果传递了TAG,我们还需要验证一下标签名是否一致；当然如果标签名没有传递,直接存储即可
        if (cur.nodeType === 1) {
            if (typeof tag !== 'undefined') {
                cur.tagName.toUpperCase() === tag.toUpperCase() ? ary.push(cur) : null;
                continue;
            }
            ary.push(cur);
        }
    }
    return ary;
}