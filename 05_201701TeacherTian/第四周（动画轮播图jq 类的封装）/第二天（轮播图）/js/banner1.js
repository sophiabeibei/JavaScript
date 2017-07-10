var wrap = utils.getElementsByClass('wrap')[0];
var inner = utils.getElementsByClass('inner',wrap)[0];
var focusList = utils.getElementsByClass('focusList',wrap)[0];
var left = utils.getElementsByClass('left',wrap)[0];
var right = utils.getElementsByClass('right',wrap)[0];

var imgs = inner.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');

//
var data = null;
var xhr = new XMLHttpRequest();
// data.txt ? sex=1 & age=30 & _=0.123123123
xhr.open('get','data.txt' + '?_=' + Math.random(), false);
xhr.onreadystatechange = function (){
    if(xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();

//bind Data
if(data && data.length){
    var str = ''; // imgs
    var str1 = ''; // lis
    for(var i = 0; i < data.length; i++){
        str += '<div><img src="" real="'+ data[i].src +'"></div>';
        str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>';
    }
    str += '<div><img src="" real="'+ data[0].src +'"></div>';
    var winWidth = utils.win('clientWidth');
    utils.css(inner,'width', (data.length+1)*winWidth );
    inner.innerHTML = str;
    focusList.innerHTML = str1;
    for(var i = 0; i < imgs.length; i++){
        utils.css(imgs[i].parentNode,'width',winWidth);
    }
}

// 图片有效性验证
for(var i = 0; i < imgs.length; i++){
    (function (i){
        var tempImg = document.createElement('img');
        tempImg.src = imgs[i].getAttribute('real');
        tempImg.onload = function (){
            imgs[i].src = this.src;
            animate({
                ele : imgs[i],
                target : {
                    opacity : 1
                },
                duration : 300
            });
        }
    })(i)
}

//
var index = 0;
var timer = window.setInterval(autoMove,2000);
function autoMove(){
    var winWidth = utils.win('clientWidth');
    index++;
    if(index == data.length + 1){
        utils.css(inner,'left',0);
        index = 1;
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

function focusAlign(){
    var tempIndex = index == data.length ? 0 : index;
    for(var i = 0; i < lis.length; i++){
        lis[i].className = tempIndex == i ? 'cur' : '';
    }
}
wrap.onmouseover = function (){ // onmouseenter
    window.clearInterval(timer);
    left.style.display = right.style.display = 'block';
}
wrap.onmouseout = function (){ // onmouseleave
    timer = window.setInterval(autoMove,2000);
    left.style.display = right.style.display = 'none';
}


left.onclick = function (){
    var winWidth = utils.win('clientWidth');
    index--;
    if(index == -1){
        utils.css(inner,'left',-data.length*winWidth);
        index = data.length-1;
    }
    animate({
        ele : inner,
        target : {
            left : -index*winWidth
        }
    });
    focusAlign();
}
right.onclick = autoMove;

//
for(var i = 0; i < lis.length; i++){
    lis[i].index = i;
    lis[i].onclick = function (){
        var winWidth = utils.win('clientWidth');
        index = this.index;
        animate({
            ele : inner,
            target : {
                left : -index*winWidth
            },
            duration : 500
        });
        focusAlign();
    }
}

