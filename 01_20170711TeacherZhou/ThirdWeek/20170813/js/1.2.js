//->获取容器所有的元素子节点;
//=>children: 它在IE6-8下会把注释也当作元素节点来处理
//=>childNodes: 获取所有的子节点
//=>思路: 先获取所有的子节点,遍历集合,把所有的nodeType===1的保存起来;
// function children(curEle) {
//     //->先获取所有的子节点
//     var ary = [],
//         nodeList = curEle.childNodes;
//     for (var i = 0; i < nodeList.length; i++) {
//         var cur = nodeList[i];
//         if(cur.nodeType ===1){
//             ary.push(cur);
//         }
//     }
//     return ary;
// }




// ================================
//->需求升级: 我们不仅要获取元素子节点,而且还想能够通过指定标签名来获取到指定标签元素子节点
//=>例如: 当前案例中,我们想获取list中的所有div
// function children(curEle,tag) {
//     var ary = [],//->存的所有元素子节点
//         nodeList = curEle.childNodes;
//     for (var i = 0; i < nodeList.length; i++) {
//         var cur = nodeList[i];
//         if(cur.nodeType ===1){
//             ary.push(cur);
//         }
//     }
//     //->如果指定了标签名,在所有元素子节点(ary)中进行二次筛选(通过标签名筛选);
//     if(typeof  tag !== "undefined"){
//         for (var k = 0; k < ary.length; k++) {
//             //->如果传递的标签名和当前循环这一项的标签名不相同,我们在数组中把它干掉即可
//             var curAry = ary[k],
//                 curTagName = curAry.tagName.toUpperCase();//->tagName: 获得标签名;nodeName: 也是获取标签名;toUpperCase(): 转大写;
//             //->拿curTagName和传进来的tag进行判断
//             if(curTagName !== tag.toUpperCase()){
//                 //->如果不相等,说明不是我们想要的,在数组中干掉它
//                 ary.splice(k,1);
//                 k--;//->防止数组塌陷;
//             }
//         }
//     }
//
//     return ary;//->存的所有元素子节点
// }


// ================================
//->需求再次升级:
//=>传tag和不传tag的区别
function children(curEle,tag) {
    var ary = [],
        nodeList = curEle.childNodes;
    for (var i = 0; i < nodeList.length; i++) {
        var cur = nodeList[i];

        //->不仅仅nodeType===1是我们想要的,如果传递了tag,我们还需要验证一下标签名是否一致,当然如果标签名没有传递,直接存储即可;

        if(cur.nodeType ===1){
            if(typeof tag !== "undefined"){
                //->如果传了tag,直接continue,就不走ary.push(cur);
                cur.tagName.toUpperCase() === tag.toUpperCase() ? ary.push(cur) : null;
                continue;
            }
            //->如果没传
            ary.push(cur);
        }
    }
    return ary;
}
//->获取容器所有的元素子节点;