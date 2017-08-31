//->第一步：从服务器端获取数据，把获取的数据动态展示在页面中
var resultData = null;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        resultData = xhr.responseText;
    }
};
xhr.send(null);
resultData = utils.toJSON(resultData);
var htmlStr = ``;
for (var i = 0, len = resultData.length; i < len; i++) {
    var curObj = resultData[i];
    htmlStr += `<li data-time="${curObj.time}" data-price="${curObj.price}" data-hot="${curObj.hot}"><a href="javascript:;">
            <img src="${curObj.img}" alt="">
            <p>${curObj.title}</p>
            <span>￥${curObj.price}</span>
        </a></li>`;
}
var oList = document.getElementById('list');
oList.innerHTML = htmlStr;

//->第二步：点击不同的维度，让其按照对应的维度进行升降序切换
var header = document.getElementById('header'),
    linkList = header.getElementsByTagName('a');
for (var j = 0; j < linkList.length; j++) {
    var curLink = linkList[j];
    curLink.setAttribute('data-flag', -1);
    curLink.setAttribute('data-index', j);
    curLink.onclick = function () {
        tableSort.call(this);
        changeArrow.call(this);
        clearOther.call(this);
    }
}

//->排序
function tableSort() {
    var oLis = utils.toArray(oList.getElementsByTagName('li')),
        _this = this,
        dataFlag = _this.getAttribute('data-flag');
    dataFlag *= -1;
    _this.setAttribute('data-flag', dataFlag);
    oLis.sort(function (a, b) {
        var sortAttr = _this.getAttribute('sort-attr');
        var cur = a.getAttribute(sortAttr),
            nex = b.getAttribute(sortAttr);
        cur = cur.replace(/-/g, '');
        nex = nex.replace(/-/g, '');
        return (cur - nex) * dataFlag;
    });

    var frg = document.createDocumentFragment();
    for (var i = 0; i < oLis.length; i++) {
        frg.appendChild(oLis[i]);
    }
    oList.appendChild(frg);
    frg = null;
}

//->箭头切换
function changeArrow() {
    //->this:当前点击的A
    var _this = this,
        arrows = _this.getElementsByTagName('i'),
        arrowUp = arrows[0],
        arrowDown = arrows[1];
    var dataFlag = _this.getAttribute('data-flag');
    if (dataFlag > 0) {
        arrowUp.className = 'up bg';
        arrowDown.className = 'down';
        return;
    }
    arrowUp.className = 'up';
    arrowDown.className = 'down bg';
}

//->清空其它的A内容：排序的初始状态、里面I的选中样式清除问题
function clearOther() {
    for (var i = 0; i < linkList.length; i++) {
        var curLink = linkList[i];
        if (curLink === this) continue;

        //->状态初始化
        curLink.setAttribute('data-flag', -1);

        //->样式清除
        var arrows = curLink.getElementsByTagName('i');
        arrows[0].className = 'up';
        arrows[1].className = 'down';
    }
}

//->HTML
//->CSS
//->JS
//1、获取数据和绑定数据
//2、获取所有的A,绑定点击事件,点击的时候执行tableSort(别忘记把THIS指向过去)
//3、先实现任何一列的升序
//4、在实现当前列的升降序切换(乘以一个正负一)
//5、实现多列升降序排列(复杂：通过索引判断按照什么样的字段排序)
//6、第五步优化，把需要排序的字段事先规定好(自定义属性),后期排序的时候直接按照模板处理即可
//7、箭头切换
//8、让其余没有选中的A回归默认样式

