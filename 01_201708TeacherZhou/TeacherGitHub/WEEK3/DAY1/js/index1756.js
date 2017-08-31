//->AJAX获取数据,动态绑定在页面中
~function () {
    var proData = null;
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = function () {
        xhr.readyState === 4 && xhr.status === 200 ? proData = utils.toJSON(xhr.responseText) : null;
    };
    xhr.send(null);

    var str = ``;
    for (var i = 0; i < proData.length; i++) {
        var cur = proData[i];
        /*
         * 自定义属性编程思维(编程思想)
         *  ->是整个JS中最伟大的编程思想之一
         *  ->当我们在后续的某一些操作中,需要用到当前元素的某些信息值,此时我们就可以把这些值实现存储在元素的身上(自定义属性存储),后期用的时候直接的获取它的自定义属性值即可
         *
         *  例如当前的案例，我们初期绑定的时候，可以把产品的价格、上货时间、热度等信息存储在元素的自定义属性上，以后排序的时候，如果需要用到这几个值，我们直接获取元素的自定义属性值即可
         *
         *  data-xxx=xxx 一般都是给元素设置的自定义属性
         */
        str += `<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}"><a href="#">
            <img src="${cur.img}" alt="">
            <span class="title">${cur.title}</span>
            <span class="title">${cur.time}</span>
            <span class="title">${cur.hot}</span>
            <span class="price">￥${cur.price}</span>
        </a></li>`;
    }
    document.getElementById('mallItem').innerHTML = str;
}();

//->实现商品排序：按照 “上架时间”、“热度”、“价格” 实现升降序的排列
~function () {
    var mallItem = document.getElementById('mallItem'),
        mallList = mallItem.getElementsByTagName('li');
    mallList = utils.toArray(mallList);

    function sortGoods(curIndex) {
        //->当前点击A对应的索引:根据索引我们来区分按照哪一项排序即可 0->时间  1->价格  2->热度
        var _this = this;
        mallList.sort(function (cur, next) {
            var attr = '';
            switch (curIndex) {
                case 0:
                    attr = 'data-time';
                    break;
                case 1:
                    attr = 'data-price';
                    break;
                case 2:
                    attr = 'data-hot';
                    break;
            }
            var curTime = cur.getAttribute(attr);
            var nextTime = next.getAttribute(attr);
            curTime = curTime.replace(/-/g, '');
            nextTime = nextTime.replace(/-/g, '');
            return (curTime - nextTime) * _this.n;
        });

        var frg = document.createDocumentFragment();
        for (var i = 0; i < mallList.length; i++) {
            frg.appendChild(mallList[i]);
        }
        mallItem.appendChild(frg);
        frg = null;
    }

    //->绑定点击事件,点击的时候进行排序
    var menu = document.getElementById('menu'),
        menuLink = menu.getElementsByTagName('a');
    for (var i = 0; i < menuLink.length; i++) {
        var curLink = menuLink[i];
        curLink.n = -1;
        curLink.index = i;
        curLink.onclick = function () {
            this.n *= -1;
            sortGoods.call(this, this.index);
        }
    }
}();
