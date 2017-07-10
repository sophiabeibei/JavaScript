/**
 * 轮播图封装
 * @param container 轮播图最外层的元素
 * @param url 接口  后台提供
 * @param interval  图片播放的频率
 */
function banner(container,url,interval){

}

var wrap = utils.getElementsByClass('wrap')[0];
var inner = utils.getElementsByClass('inner', wrap)[0];
var focusList = utils.getElementsByClass('focusList', wrap)[0];
var left = utils.getElementsByClass('left', wrap)[0];
var right = utils.getElementsByClass('right', wrap)[0];
var imgs = inner.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');
//
var data = null;
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);
//
;(function (){
    if(data && data.length){
        var strImg = '';
        var strLi = '';
        for(var i = 0; i < data.length; i++){
            strImg += '<img src="" real="'+ data[i].src +'">';
            strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        }
        inner.innerHTML = strImg;
        focusList.innerHTML = strLi;
    }
})();

//  验证图片有效性 => 让第一张图片层级关系提高，并且透明度从0动画到1
;(function (){
    for(var i = 0; i < imgs.length; i++){
        var tempImg = document.createElement('img');
        tempImg.index = i; // 事件绑定给哪个元素属性就添加给这个元素
        tempImg.src = imgs[i].getAttribute('real');
        tempImg.onload = function (){
            imgs[this.index].src = this.src;
            // 这个onload事件会被触发很多次（如果资源没有问题，那么有多少张图片就会对应触发多少次），只有索引值为0的才是第一张。那么就开始让第一张的层级关系提高，并且立刻把透明度从0动画到1
            if(this.index == 0){
                utils.css(imgs[0],'zIndex', 1);
                animate({
                    ele : imgs[0],
                    target : {
                        opacity : 1
                    },
                    duration : 300
                });
            }
        }
    }
})();

//
var index = 0; // 默认第一张  1
var timer = window.setInterval(autoMove,2000);
function autoMove(){
    index++;
    if(index == data.length){
        index = 0;
    }
    setImg();
}
// 负责让哪一张图片提高层级并且渐显
function setImg(){
    for(var i = 0; i < imgs.length; i++){
        if(i == index){
            utils.css(imgs[i],'zIndex',1);
            animate({
                ele : imgs[i],
                target : {
                    opacity : 1
                },
                duration : 300,
                callback : function (){
                    // 当动画到1之后然后要把除了当前刚动画结束的这一张图片的其他所有图片的透明度设置到0
                    var otherImgs = utils.siblings(this); // 除了当前正在最高层级的这一张
                    for(var i = 0; i < otherImgs.length; i++){
                        utils.css(otherImgs[i],'opacity',0);
                    }
                    canClick = true;
                }
            });
        }else{
            utils.css(imgs[i],'zIndex',0);
        }
        // 焦点对齐
        lis[i].className = index == i ? 'cur' : '';
    }
}

wrap.onmouseover = function (){
    window.clearInterval(timer);
    left.style.display = right.style.display = 'block';
}

wrap.onmouseout = function (){
    timer = window.setInterval(autoMove,2000);
    left.style.display = right.style.display = 'none';
}
var canClick = true;
left.onclick = function (){
    if(canClick){
        index--;
        if(index == -1){
            index = data.length-1;
        }
        setImg();
    }
    //canClick = false;
}
right.onclick = autoMove;

;(function (){
    for(var i = 0; i < lis.length; i++){
        lis[i].index = i;
        lis[i].onclick = function (){
            index = this.index;
            setImg();
        }
    }
})();

//
