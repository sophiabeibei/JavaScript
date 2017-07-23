/*
 * children:Gets all the element child nodes under the specified container (the compatible processing of this property of CHILDREN, and the CHILDREN method in JQ)
 * @parameters
 *   curEle:[object]To get the child element under which container, who is passed in?
 * @return
 *   [Array]:Stores all the element child nodes under the current container
 * By Team on 2017-07-23
 */
function children(curEle) {
    var nodeList = curEle.childNodes,
        ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        curNode.nodeType === 1 ? ary.push(curNode) : null;
    }
    return ary;
}

/*
 * prev：gets the last brother element node of the current element
 * @parameters
 *    curEle:[object] current element
 * @return
 *    [object / null] previous brother element node
 * by team on 2017-07-23
 */
function prev(curEle) {
    if ('previousElementSibling' in curEle) {
        return curEle.previousElementSibling;
    }
    var p = curEle.previousSibling;
    while (p && p.nodeType !== 1) {
        p = p.previousSibling;
    }
    return p;
}

/*
 * 思考题：
 *   prevAll：获取所有的哥哥元素节点
 *   next：获取下一个弟弟元素节点
 *   nextAll：获取所有的弟弟元素节点
 *   siblings：获取所有的兄弟元素节点(所有哥哥+所有弟弟)
 */