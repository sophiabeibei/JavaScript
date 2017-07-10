/**
 * author : tianxi   qq : 121170784
 */
var newsList = document.querySelectorAll('.newsList')[0];
var imgs = newsList.getElementsByTagName('img'); //此刻没有

// get data
var data = null;
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','js/data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);

// bind data
;(function (){
    if(data && data.length){
        var str = '';
        for(var i = 0; i < data.length; i++){
            var curData = data[i]; // { src, title, desc  }
            str += '<li>';
            str += '<div><img src="" real="' + curData.src + '"></div>';
            str += '<div><h3>'+ curData.title +'</h3><p>'+ curData.desc +'</p></div>'
            str += '</li>';
        }
        newsList.innerHTML = str;
    }
})();

// 延迟加载
function imgsDelayLoad(){ // dz
    for(var i = 0; i < imgs.length; i++){
        imgs[i]; // 每一张
        //imgs[i].index = i;
        if(imgs[i].isLoaded){
            continue; // 当前图片如果加载过可以不加载，但是下一次要继续
        }
        var _a = utils.win('clientHeight') + utils.win('scrollTop');
        var _b = imgs[i].parentNode.offsetHeight + utils.offset(imgs[i].parentNode).top;
        if(_a > _b){ // 说明当前正在循环的这个图片已经进入到窗口内
            // 自定义属性一般配合绑定事件的元素
            var tempImg = new Image(); // 创建一个图片元素
            tempImg.index = i;
            tempImg.src = imgs[i].getAttribute('real');// 加载对应真实图片资源
            tempImg.onload = function (){
                imgs[this.index].src = this.src; // this.index
                // 让图片的透明度从0动画到1
                fadeIn(imgs[this.index]);
            }
            imgs[i].isLoaded = true;
        }
    }
}
imgsDelayLoad(); // 默认已经进入到窗口内的
window.onscroll = imgsDelayLoad; // 滚动条滚动要继续执行这个函数

function fadeIn(ele){
    ele.timer && window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function (){
        var opa = utils.css(ele,'opacity'); // 获取当前透明度
        if(opa >= 1){
            window.clearInterval(ele.timer);
            return;
        }
        opa += 0.01;
        utils.css(ele,'opacity',opa);
    },10);
}



