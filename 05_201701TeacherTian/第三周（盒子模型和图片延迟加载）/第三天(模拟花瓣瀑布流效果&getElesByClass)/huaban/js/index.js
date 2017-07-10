var main = utils.getElesByClass('main')[0];
var uls = main.getElementsByTagName('ul'); // [ul,ul,ul,ul,ul]
var imgs = main.getElementsByTagName('img'); // 所有的img
var ulsAry = utils.listToArray(uls); // 数组
// 获取数据
var data = null;
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false); // 在接口ulr的末尾添加一个随机数是为了避免缓存问题
    xhr.onreadystatechange = function (){
        // 以2开头的状态码都是成功
        if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);

// 绑定数据
bindData();
function bindData(){
    if(data && data.length){
        for(var i = 0; i < /*data.length*/50; i++){
            var ran = Math.round(Math.random()*8);
            var curData = data[/*i*/ran]; // { src : url,  title : 标题 }
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.setAttribute('real',curData.src); // 给图片添加real自定义属性，用来图片延迟加载
            // 160 - 350 之间的随机高度
            img.style.height = Math.round(Math.random()*(350-160)+160) + 'px';
            //img.src = curData.src; // 看样式用的 => 删除 => 图片延迟加载

            li.appendChild(img);
            var p = document.createElement('P');
            p.innerHTML = curData.title;
            li.appendChild(p);
            var a = document.createElement('a');
            a.innerHTML = '采集';
            a.href = 'javascript:void 0';
            li.appendChild(a);
            // 要把这个li连带里面的子元素添加给高度最小的ul
            // 先找到高度最小的ul => 排序 => 按照高度排序
            ulsAry.sort(function (ul1,ul2){
                // 如果盒子的display属性是none，那么和盒子的offsetHeight是0
                return ul1.offsetHeight - ul2.offsetHeight;
            });
            ulsAry[0].appendChild(li);
        }
    }
}

// 图片延迟加载 => 淡入 =>  多个单张图片延迟加载
window.onscroll = function (){
    // 滚动论滚动需要重新循环每一张图片，重新判断是否进入到窗口内
    imgsDelayLoad();
    // 在距离到达底部还有1000px的时候然后再添加50个li
    var winScrollTop = utils.win('scrollTop');
    var pageHeight = document.body.scrollHeight; // 整个页面的高度
    // 当滚出去的高度大于页面的高度-1000的时刻在添加50个图片
    if(winScrollTop > pageHeight - 1000){
        bindData();
    }
    // 当滚动出去的高度 > 一个屏幕高度的时候让top按钮出现
}
imgsDelayLoad();
function imgsDelayLoad(){
    for(var i = 0; i < imgs.length; i++){
        var curImg = imgs[i]; // 立刻要做判断这个curImg是否完全进入到窗口内
        //if(curImg.isLoaded){ continue; }
        var _a = utils.win('clientHeight') + utils.win('scrollTop');
        var _b = curImg.offsetHeight + utils.offset(curImg).top;
        if(_a > _b){ // 条件成立说明这个图片已经完全进入到窗口内
            // 我需要把real的值赋值给src，但是在赋值之前检查资源有效性
            checkImg(curImg); // 符合进入窗口条件的图片做有效性验证
        }
    }
}

function checkImg(img){ // 验证资源有效性
    if(img.isLoaded){
        return;
    }
    // 形参img就是等待验证的图片 => 页面内所有图片中imgs中的一个imgs[i]
    var tempImg = document.createElement('img'); // new Image()
    tempImg.src = img.getAttribute('real'); // 加载真是图片资源
    tempImg.onload = function (){ // 临时图片加载真实图片资源成功
        img.src = this.src; // 把real的值赋值给src属性
        fadeIn(img); // 真实图片淡入
    }
    img.isLoaded = true; // 只要加载过那么这个图片无论成功还是失败都会增加一个isLoaded属性
}

function fadeIn(ele){ // opacity =>  0-1
    ele.timer && window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function (){
        var opacity = utils.getCss(ele,'opacity');
        if(opacity >= 1){
            window.clearInterval(ele.timer);
            return;
        }
        opacity = opacity + 0.01;
        utils.setCss(ele,'opacity',opacity);
    },10);
}


