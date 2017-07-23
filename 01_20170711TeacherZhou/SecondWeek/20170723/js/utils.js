/**
 * children: 获取指定容器下的所有元素子节点(CHILDREN这个属性的兼容处理,jQuery中CHILDREN方法也是这样实现的);
 * @parameters curEle: [Object]元素对象;标签元素: 想要获取哪一个容器下的子元素,就把谁传进来;
 * @returns {Array}: 存放的是当前容器下的所有元素子节点;
 * By iBei on 2017-07-23
 */

//parameters(参数的意思)
//returns(返回值)  Array: 返回值是数组

function children(curEle) {//current   element
    var nodeList = curEle.childNodes,
        ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        curNode.nodeType === 1 ? ary.push(curNode) : null;
    }
    return ary;
}


/**
 * prev: 获取当前元素的上一个哥哥元素节点;
 * @parameters curEle: [object]  current  element
 * @returns [object/null]: 上一个哥哥节点
 * By iBei on 2017-07-23
 */

function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var par = curEle.previousSibling;
    while (par && par.nodeType !== 1) {
        par = par.previousSibling;
    }
    return par;
}
//腾讯里,项目中注释都用英文;中文有可能会出现乱码;公司的规范,每一个方法必须要有注释;

/*思考题:
* prevAll: 获取所有的哥哥元素节点
* next: 获取下一个弟弟元素节点
* nextAll: 获取所有的弟弟元素节点
* siblings: 获取所有的兄弟元素节点(所有哥哥+所有弟弟)
*
* 动态创建DOM  克隆DOM,目前项目中使用少了,没太大用,都用es6;
*
* */






