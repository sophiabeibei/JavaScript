//->让存储img的容器再轮播图区域中整体向左右移动即可
var banner = document.querySelector(".banner"),
    imgBox = banner.querySelector(".imgBox"),
    imgList = imgBox.getElementsByTagName("img"),
    //->querySelector和querySelectorAll不存在DOM映射机制,下面绑定数据后,不能自动的填充到当前的集合中;所以我们应该使用getElementsByTagName;getElementsByTagName有DOM映射机制;
    focus = banner.querySelector(".focus"),
    focustList = focus.getElementsByTagName("li"),
    changeLeft = banner.querySelector(".changeL"),
    changeRight = banner.querySelector(".changeL");

//->数据绑定
~function () {
    var bannerDate = null;
    var xhr = new XMLHttpRequest;
    xhr.open("GET", "json/banner.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            bannerDate = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);

    //->需要数据绑定的: focus的li a标签
    var str = ``,
        strFocus = ``;
    for (var i = 0; i < bannerDate.length; i++) {
        var item = bannerDate[i];
        str += `<li><a href="${item.link}"><img src="" alt="" data-src="${item.img}"></a></li>`;
        strFocus += `<li class="${i===0?'select':''}"></li>`;
    }
    imgBox.innerHTML = str;
    focus.innerHTML = strFocus;
    //->动态设置oImg的宽度
    utils.css(imgBox,"width",bannerDate.length*1000);
}();


//->图片延迟加载
window.onload = function () {
    lazyImg(imgList[0]);//->当页面加载成功,我们首先把第一张图片做延迟加载;
};
function lazyImg(oImg) {
    if(oImg.isLoad)return;
    oImg.isLoad = true;
    //->开始进来只给第一张做延迟加载
    var tempImg = new Image;
    tempImg.onload = function () {
        oImg.src = this.src;
        oImg.style.display = "block";
        tempImg = null;

    };
    //->部分浏览器需要把src赋值操作放在onload事件的下面;这样加载成功之后才会触发onload事件;
    tempImg.src = oImg.getAttribute("data-src");
}


//->轮播图运动
~function(){
    var step = 0,//->步长: 记录当前展示图片的索引
        interval = 3000;//->时间因子: 控制每隔多少ms切换到下一张图片
    var autoTimet = window.setInterval(function () {
        step++;
        if(step>=4){
            step=0;
        }
        //->用300ms完成从当前图片切换到下一张图片延迟的效果
        animate({
            curEle: imgBox,
            target: {
                left: -step*1000
            },
            duration: 500
        });
        //->切换到下一张图片需要把下一张图片做以下延迟加载
        lazyImg(imgList[step]);
    },interval);
}();



































































