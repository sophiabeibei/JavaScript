//->使用AJAX从服务器获取数据(JSON对象)
~function(){
    var xhr = new XMLHttpRequest;
    xhr.open("GET","json/product.json",false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            window.productData = utils.toJSON(xhr.responseText);//->window.productData:
            // 在全局下暴露一个变量productData
        }
    };
    xhr.send(null);
}();

//->把数据绑定在页面中(用ES6的模板字符串)
~function(){
    var str = ``;//->tab上的``
    for (var i = 0; i < productData.length; i++) {
        var cur = productData[i];
        str += `<li>
            <a href="javascript:;">
                <img src="${cur.img}" alt="耳机">
                <span class="title">${cur.title}</span>
                <span class="price">$${cur.price}</span>
            </a>
        </li>`
    }
    document.getElementById("mallItem").innerHTML = str;
}();



























