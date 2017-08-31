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

    function sortGoods() {
        mallList.sort(function (cur, next) {
            var curTime = cur.getAttribute('data-time');
            var nextTime = next.getAttribute('data-time');
            curTime = curTime.replace(/-/g, '');
            nextTime = nextTime.replace(/-/g, '');
            return (curTime - nextTime) * menuLink[0].getAttribute('data-sortType');
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

    //->给第一个A标签绑定点击事件：上架时间
    menuLink[0].setAttribute('data-sortType', -1);//->给当前点击的A设置自定义属性(属性值默认-1)：当前排序的方式  -1:降序  1:升序
    menuLink[0].onclick = function () {
        //->this:menuLink[0]
        //->每次点击切换自定义属性的值,实现升降序标识的切换
        var dataSortType = this.getAttribute('data-sortType');
        dataSortType *= -1;
        this.setAttribute('data-sortType', dataSortType);

        sortGoods();
    }
}();