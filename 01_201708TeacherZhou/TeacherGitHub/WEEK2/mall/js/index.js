//->使用AJAX从服务器获取数据(JSON对象)
~function () {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.productData = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);
}();

//->把数据绑定在页面中(ES6模板字符串)
~function () {
    var str = ``;
    for (var i = 0; i < productData.length; i++) {
        var cur = productData[i];
        str += `<li><a href="#">
            <img src="${cur.img}" alt="">
            <span class="title">${cur.title}</span>
            <span class="price">￥${cur.price}</span>
        </a></li>`;
    }
    document.getElementById('mallItem').innerHTML = str;
}();



