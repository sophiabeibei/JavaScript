// 先获取到可能要操作到的元素
var product = document.getElementById('product'); // 最外层
var nav = product.getElementsByClassName('nav')[0]; //
var btns = nav.getElementsByTagName('span'); // 评论和价格按钮

var productList = product.getElementsByTagName('ul')[0]; // 获取商品列表
var lis = productList.getElementsByTagName('li'); // 要排序的这些li
console.log(lis); // [] => 需要去后台获取数据然后把获取回来的数据添加到页面中
var data = null;

;(function (){
    // ajax
    var xhr = new XMLHttpRequest(); // 创建一个异步对象
    xhr.open('get','data.txt',false); // get方式/post，接口,同步异步  false : 同步
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            // 404  不存在 前端
            // 500  服务端错误
            // 304  本地缓存
            // 200   成功
            /*window.*/data = JSON.parse(xhr.responseText); // 这个属性保存着从接口获取回来的数据 响应文本
        }
    }
    xhr.send(null);
})();
///////////////////////////////////////////////
console.log(data); // 我们已经成功获取到我们自己mock的假数据data了
/*
*   ajax :
*       1 new XMLHttpRequest()
*       2 xhr.open(get/post,url,true/false)
*              get/post : 请求方式
*              url : 接口  (后台提供)
*              true/false : 同步/异步  同步原地死等  异步多任何
*       3 xhr.onreadystatechange = function  当readystate改变触发
*              xhr.readyState == 4  代表xhr回来了
*              xhr.status == 200    代表成功获取到数据
*              xhr.responseText     属性存放获取回来的数据
*       4 xhr.send(null)
*
*
* */

// 把获取到的数据添加到页面中 => 1 动态  2 innerHTML  数据绑定
;(function bindData(){
    if(data && data.length){ // 如果data存在并且data.length也存在
        var str = '';
        // data : [{src : "images/phone1.jpg", price : 8888, comment : 23  }...]
        for(var i = 0; i < data.length; i++){ //
            var curData = data[i]; // 每次循环的当前对象
            str += '<li>'
            str += '<div><img src="'+ curData.src +'" ></div>';
            str += '<p class="price"><i>￥</i>'+ curData['price'] +'</p>';
            str += '<p class="comment"><i>'+ curData['comment'] +'</i>人评论</p>';
            str += '</li>';
        }
        productList.innerHTML = str;
    }

})();

console.log(lis); //





















