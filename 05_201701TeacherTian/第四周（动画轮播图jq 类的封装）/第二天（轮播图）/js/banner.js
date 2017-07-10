// 获取元素
var wrap = utils.getElementsByClass('wrap')[0];

var inner = utils.getElementsByClass('inner', wrap)[0];
var focusList = utils.getElementsByClass('focusList', wrap)[0];
var left = utils.children(wrap, 'a')[0];
var right = utils.children(wrap, 'a')[1];

var imgs = inner.getElementsByTagName('img'); // [????]
var lis = focusList.getElementsByTagName('li');

// 获取数据
var data = null;
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);

// 绑定数据
;(function () {
    if (data && data.length) {
        var str = '';
        var str1 = '';
        for (var i = 0; i < data.length; i++) {
            //
            str += '<div><img src="" real="' + data[i].src + '"></div>'; // imgs
            str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>'; // lis
        }
        str += '<div><img src="" real="' + data[0].src + '"></div>'; // 为了保证无缝轮播在末尾增加第一张图片。
        var winWidth = utils.win('clientWidth'); // 窗口宽度
        utils.css(inner,'width',winWidth*(data.length+1)); // 修改包含所有图片的inner的宽度
        inner.innerHTML = str;
        focusList.innerHTML = str1;
        // 重新设置每一张图片的宽度
        for(var i = 0; i < imgs.length; i++){
            utils.css(imgs[i].parentNode,'width',winWidth);
        }
    }
})();

// 验证图片有效性
;(function () {
    for (var i = 0; i < imgs.length; i++) {
        (function (i) {
            var curImg = imgs[i];
            var tempImg = document.createElement('img');
            tempImg.src = curImg.getAttribute('real');
            tempImg.onload = function () {
                curImg.src = this.src;
                animate({
                    ele: curImg,
                    target: {
                        opacity: 1
                    },
                    duration: 300
                });
            }
        })(i);
    }
})();

// 开始轮播
var index = 0; // index的值就是哪一张图片应该出现的索引
var timer = window.setInterval(autoMove,2000);
function autoMove() {
    var winWidth = utils.win('clientWidth'); // 浏览器的宽度 => 一张图片的宽度
    index++; // index++之后的值就是我立刻要运动到的终点
    if(index == /*5*/data.length+1){ // 视觉上看到已经是第一张了,下一次应该是第二张
        utils.css(inner,'left',0);
        index = 1;
    }
    animate({
        ele: inner,
        target: {
            left: -index * winWidth
        },
        duration: 500
    });
    focusAlign();
}
// 负责焦点和轮播图对应
function focusAlign(){
    // index;  0 1 2 3 4
    // 如果index（当前播放到第几张）的值是最后一张，那么焦点图应该选中第一个
    var tempIndex = index == /*4*/data.length ? 0 : index;
    for(var i = 0; i < lis.length; i++){
        // 每次轮播一张图之后，都要遍历每个li，和index的值对应的li添加cur否则移除
        lis[i].className = i == tempIndex ? 'cur' : '';
    }
}

// 绑定鼠标悬停事件

wrap.onmouseover = function (){ // 停止播放 显示左右按钮
    window.clearInterval(timer);
    left.style.display = right.style.display = 'block';
}

wrap.onmouseout = function (){
    timer = window.setInterval(autoMove,2000);
    left.style.display = right.style.display = 'none';
}

// 给左右按钮绑定点击事件

left.onclick = function (){
    var winWidth = utils.win('clientWidth');
    index--; // 即将要运动到的目的地
    if(index == -1){
        utils.css(inner,{ left : -/*4*/data.length* winWidth});
        index = /*3*/data.length-1;
    }

    animate({
        ele : inner,
        target : {
            left : -index*winWidth
        },
        duration : 500
    });
    focusAlign();
}
right.onclick = autoMove;

// 给每一个焦点图绑定点击事件

;(function (){
    for(var i = 0; i < lis.length; i++){
        lis[i].index = i; // 保存每个焦点的索引
        lis[i].onclick = function (){
            var winWidth = utils.win('clientWidth');
            index = this.index;
            // 先修改点击时刻index的值，然后再动画
            animate({
                ele : inner,
                target : {
                    left : -this.index*winWidth
                },
                duration : 500
            });
            focusAlign();
        }
    }
})();




