var tab = document.getElementById('tab'),
    page = utils.byClass('page', tab)[0],
    pageList = utils.children(page, 'li'),
    contentList = utils.byClass('content', tab);

function changeTab(curIndex) {
    //->让当前点击的LI增加选中样式
    //pageList[curIndex].className = 'select';
    //contentList[curIndex].className = 'select'; 这样操作会把原有的CSS样式类都覆盖掉,样式就乱了
    utils.addClass(pageList[curIndex], 'select');
    utils.addClass(contentList[curIndex], 'select');

    //->让它的兄弟们移除选中样式
    var siblingsLi = utils.siblings(pageList[curIndex]);
    for (var i = 0; i < siblingsLi.length; i++) {
        utils.removeClass(siblingsLi[i], 'select');
        //->获取当前移除样式LI的索引
        var index = utils.index(siblingsLi[i]);
        utils.removeClass(contentList[index], 'select');
    }
}

for (var i = 0; i < pageList.length; i++) {
    var item = pageList[i];
    item.index = i;
    item.onclick = function () {
        changeTab(this.index);
    }
}