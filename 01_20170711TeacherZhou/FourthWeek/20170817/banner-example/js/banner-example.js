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

    //->为了实现无缝滚动,我们把第一张克隆一份放在容器的末尾
    var imgBoxLis = imgBox.getElementsByTagName("li"),
        cloneLi = imgBoxLis[0].cloneNode(true);
    imgBox.appendChild(cloneLi);

    //->动态设置oImg的宽度
    utils.css(imgBox,"width",(bannerDate.length+1)*500);
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
        if(step===4){//->过了3000ms再次执行定时器,此时step=4,说明上一次已经切换到最末尾的一张,而且那一张是经过克隆的;此时我们让容器立即回到第一张的位置;让其step=0;
            utils.css(imgBox,"left",0);
            step=0;
        }
        step++;
        //->用300ms完成从当前图片切换到下一张图片延迟的效果
        animate({
            curEle: imgBox,
            target: {
                left: -step*500
            },
            duration: 500
        });
        //->切换到下一张图片需要把下一张图片做以下延迟加载
        lazyImg(imgList[step]);
    },interval);
}();

/*
* 实现轮播图无缝滚动的原理:
*   1.数据绑定的时候我们就把第一张克隆一模一样的,放在最末尾的位置,真实图片如果有四个,此时容器中存储的就是五个了;
*   2.当运动的时候,我们依然步长step++,当我们再次运动的时候,看一下上一次是否已经是最后一张了(克隆的那一张),如果是的话,说明再往后走不了了,我们此时让容器立马回到left=0的位置(真实第一张的位置),并且让step=0;
*   3.然后继续step++,运动到第二张的位置,实现了无缝衔接;
*
* */



//左右运动版的轮播图