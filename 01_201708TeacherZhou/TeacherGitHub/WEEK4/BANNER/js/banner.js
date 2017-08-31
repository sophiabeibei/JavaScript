var banner = document.querySelector('.banner'),
    imgBox = banner.querySelector('.imgBox'),
    imgList = imgBox.getElementsByTagName('img'),//->querySelectorAll:不存在DOM映射机制,下面绑定数据后,不能自动的填充到当前这个集合中,所以我们应该使用getElementsByTagName,它有DOM映射机制
    focus = banner.querySelector('.focus'),
    focusList = focus.getElementsByTagName('li'),
    changeLeft = banner.querySelector('.changeLeft'),
    changeRight = banner.querySelector('.changeRight');

//=>数据绑定
~function () {
    var bannerData = null,
        xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/banner.json', false);
    xhr.onreadystatechange = function () {
        xhr.readyState === 4 && xhr.status === 200 ? bannerData = utils.toJSON(xhr.responseText) : null;
    };
    xhr.send(null);

    var str = ``,
        strFocus = ``;
    for (var i = 0; i < bannerData.length; i++) {
        var item = bannerData[i];
        str += `<li><a href="${item.link}">
            <img src="" alt="" data-src="${item.img}">
        </a></li>`;

        strFocus += `<li class="${i === 0 ? 'select' : ''}"></li>`;
    }
    imgBox.innerHTML = str;
    focus.innerHTML = strFocus;

    //->为了实现无缝滚动,我们把第一张克隆一份放在容器的末尾
    var imgBoxLis = imgBox.getElementsByTagName('li'),
        cloneLI = imgBoxLis[0].cloneNode(true);
    imgBox.appendChild(cloneLI);

    //->动态设置一下imgBox的宽度
    utils.css(imgBox, 'width', (bannerData.length + 1) * 1000);
}();

//=>图片延迟加载
window.onload = function () {
    lazyImg(imgList[0]);//->当页面加载成功后,我们首先把第一张图片做延迟加载
};
function lazyImg(oImg) {
    if (oImg.isLoad) return;
    oImg.isLoad = true;//->isLoad:自定义属性
    var tempImg = new Image;
    tempImg.onload = function () {
        oImg.src = this.src;
        oImg.style.display = 'block';
        tempImg = null;
    };
    tempImg.src = oImg.getAttribute('data-src');//->部分IE浏览器需要把SRC赋值操作放在ONLOAD事件的下面,这样加载成功后才会触发ONLOAD事件
}

//=>轮播图运动
~function () {
    var step = 0,//->步长:记录当前展示图片的索引
        interval = 3000;//->时间因子:控制每隔多少MS切换到下一张图片

    var autoTimer = window.setInterval(function () {
        if (step === 4) {//->过了3000MS再次执行定时器,此时STEP=4,说明上一次已经切换到最末尾的那一张了(经过克隆的),此时我们让容器立即回到第一张的位置,让其STEP=0
            utils.css(imgBox, 'left', 0);
            step = 0;
        }
        step++;
        zhufengAnimate({
            curEle: imgBox,
            target: {
                left: -step * 1000
            },
            duration: 500
        });
        lazyImg(imgList[step]);
    }, interval);
}();

/*
 * 实现轮播图无缝滚动的原理
 * 1、数据绑定的时候，我们就把第一张克隆一份一模一样的，放在最末尾的位置（真实图片如果有四个，此时容器中存储的就是五个了）
 *
 * 2、当运动的时候，我们依然STEP++，当我们再次运动的时候，看一下上一次是否已经是最后一张了(克隆的那一张)，如果是的话，说明在往后走不了了，我们此时让容器立马回到LEFT=0的位置(真实第一张的位置)，并且让STEP=0
 *
 * 3、然后继续STEP++，运动到第二张的位置，实现了无缝衔接
 */












