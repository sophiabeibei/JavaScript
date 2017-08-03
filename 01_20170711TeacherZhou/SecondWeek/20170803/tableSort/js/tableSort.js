/*
* 一.数据绑定
*   从服务器端使用AJAX获取到需要的数据,然后绑定在页面中
*
* */
//->一.1.首先从服务器端获取数据(AJAX)
var productData = null;
var xhr = new XMLHttpRequest;
xhr.open("GET","json/product.json",false);
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
        //console.log(xhr.responseText);//->是JSON格式的字符串
        var res = xhr.responseText;//->res是一个JSON字符串,需要把JSON字符串转化为JSON对象,这样才方便我们后续操作
        productData = utils.toJSON(res);
    }
};
xhr.send(null);
//->一.2.把我们得到的数据绑定到页面上即可;
    /*目前市场上绑定数据常用的办法:
    * 1.字符串拼接: 把HTML标签及需要暂时的数据在JS中都以字符串的形式拼接起来,最后使用innerHTML插入到页面中;(已经成为过去式)
    * 2.ES6中提供的模板字符串(原理也是字符串拼接)
    * 3.数据绑定的模板引擎: kTemplate,EJS,d3,REACT中的虚拟DOM渲染,VUE中的MVVM模式等等;
    * */

    //->ES6中模板的字符串
var htmlStr = ``;//->tab键上面的点``//->让ES5环境变成ES6
for (var i = 0; i < productData.length; i++) {
    //->每当循环一次,都应该创建一个li
    var curItem = productData[i];
    //console.log(curItem);
    //->每当循环一次都应该创建一个li,还需要把curItem中存储的内容分别的绑定在每一个li的身上;
    htmlStr += ` <li>
            <a href="javascript:;">
                <img src="${curItem.img}" alt="耳机">
                <span class="title">${curItem.title}</span>
                <span class="price">$${curItem.price}</span>
            </a>
        </li>`
}
//->循环完成后,htmlStr 存储的东西就是我们最后需要展示内容的全部字符串,我们把这堆字符串
var mallItem = document.getElementById("mallItem");
mallItem.innerHTML = htmlStr;































