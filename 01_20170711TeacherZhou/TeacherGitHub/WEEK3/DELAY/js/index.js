/*
 * 第一步：获取服务器端的JSON数据，然后实现数据的动态绑定
 * 1、通过AJAX先获取需要的数据
 * 2、使用ES6的模板字符串绑定数据
 */
var newsData = null,
    xhr = new XMLHttpRequest();
xhr.open('GET', 'json/newList.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        newsData = utils.toJSON(xhr.responseText);
    }
};
xhr.send(null);

//->图片延迟加载的原理：开始绑定数据的时候，IMG图片不加载真实的图片，所以开始SRC为空，而且图片是隐藏的(图片区域的背景图是默认图片)；我们开始的时候把真实图片的地址存储在自定义属性DATA-SRC中，当符合条件后，从这个自定义属性中获取到地址，赋值给IMG的SRC即可；
var tempHTML = ``;
for (var i = 0; i < newsData.length; i++) {
    var cur = newsData[i];
    tempHTML += `<li>
        <div><img src="" data-src="${cur.img}"/></div>
        <div>
            <h2>${cur.title}</h2>
            <p>${cur.desc}</p>
        </div>
    </li>`;
}
var newsItem = document.getElementById('news');
newsItem.innerHTML = tempHTML;

/*
 * 第二步：图片延迟加载
 */

//->delayImg：实现单张图片的延迟加载
function delayImg() {
    //->THIS:当前要操作的图片
    var _this = this;
    if (_this.isLoad) return;//->已经加载过一次,不管是否成功都不会在重新加载

    var A = _this.parentNode.offsetHeight + utils.offset(_this.parentNode)['top'];//->_this.parentNode:当前图片所在的盒子,我们获取的是盒子距离BODY的偏移(因为此时图片还没有展示呢,无法获取相关的样式)

    var B = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop);

    if (A <= B) {
        _this.src = _this.getAttribute('data-src');
        _this.isLoad = true;//->设置一个自定义属性，代表当前的图片已经加载了
        _this.onload = function () {
            utils.css(_this, 'display', 'block');
            fadeIn.call(_this);
        }
    }
}
function fadeIn() {
    //->THIS:当前要操作的图片
    var n = 0,
        timer = null,
        _this = this;
    timer = window.setInterval(function () {
        n += 0.05;
        if (n >= 1) {
            utils.css(_this, 'opacity', 1);
            window.clearInterval(timer);
            return;
        }
        utils.css(_this, 'opacity', n);
    }, 17);
}

//->loadAll：实现所有图片都按照单张的机制进行判断和加载
function loadAll() {
    var imgList = newsItem.getElementsByTagName('img');
    for (var i = 0; i < imgList.length; i++) {
        var curImg = imgList[i];
        delayImg.call(curImg);
    }
}
loadAll();
window.onscroll = loadAll;