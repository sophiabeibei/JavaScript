var product = document.getElementById('product');
var nav = product.getElementsByClassName('nav')[0];
var spans = nav.getElementsByTagName('span');
var ul = product.getElementsByTagName('ul')[0];
var lis = ul.getElementsByTagName('li'); // []
var data = null;
//ajax
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data); //
// 绑定数据
;(function (){
    if(data && data.length){
        //data : [ { "src" : "images/phone1.jpg", "price" : 88, "comment" : 12 }  ]
        var str = '';
        for(var i = 0; i < data.length; i++){
            str += '<li price="'+ data[i].price +'" comment="'+ data[i].comment +'" >';
                str += '<div><img src="'+ data[i].src +'" ></div>';
                str += '<p class="price"><i>￥</i>'+ data[i].price + '</p>';
                str += '<p class="comment"><i>'+ data[i].comment +'</i>人评论</p>';
            str += '</li>';
        }
        ul.innerHTML = str;
    }
})();

// 绑定事件
for(var i = 0; i < spans.length; i++){
    spans[i].sortFlag = -1;
    spans[i].onclick = function(){
        // this.getAttribute('btn'); // comment 评论  price 价格
        // 排序
        this; // 就是点击的那个span
        productSort.call(this);
    }
}

function productSort(){
    //this; window => li(你正在点击的那个)
    // console.log(this); // 要根据来排序
    // var val = this.getAttribute('btn');
    var lisAry = utils.listToArray(lis);
    var that = this;
    that.sortFlag *= -1;
    lisAry.sort(function (li1,li2){
       return li1.getAttribute(that.getAttribute('btn')) - li2.getAttribute(that.getAttribute('btn')) * that.sortFlag;
    });
    var frg = document.createDocumentFragment();
    for(var i = 0; i < lisAry.length; i++){
        frg.appendChild(lisAry[i]);
    }
    ul.appendChild(frg);
    frg = null;
}








