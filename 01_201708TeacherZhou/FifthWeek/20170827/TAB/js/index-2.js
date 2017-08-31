var tab = document.getElementById('tab'),
    page = utils.byClass('page', tab)[0],
    pageList = utils.children(page, 'li'),
    contentList = utils.byClass('content', tab);
var prevIndex = 0;//->记录上一个选中的索引

for (var i = 0; i < pageList.length; i++) {
    var item = pageList[i];
    item.onclick = function () {
        var index = utils.index(this);
        if (index === prevIndex) return;

        //->让当前点击的这个有选中的样式
        utils.addClass(pageList[index], 'select');
        utils.addClass(contentList[index], 'select');

        //->让上一个选中的样式移除
        utils.removeClass(pageList[prevIndex], 'select');
        utils.removeClass(contentList[prevIndex], 'select');

        //->本次点击的索引将成为下一次操作的上一个索引
        prevIndex = index;
    }
}