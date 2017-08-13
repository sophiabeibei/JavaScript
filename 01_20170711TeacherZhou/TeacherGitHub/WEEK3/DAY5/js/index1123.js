//->获取数据 && 绑定数据
~function () {
    var newsData = null,
        xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/newList.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            newsData = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);

    var str = ``;
    for (var i = 0; i < newsData.length; i++) {
        var cur = newsData[i];
        /*
         延迟加载
         1-> DIV的背景图是默认的占位图
         2-> IMG开始不显示,只有加载成功才显示
         3-> IMG的SRC开始是空,DATA-SRC存储真实图片的地址
         4-> JS中完成懒加载的处理
         */
        str += `<li>
            <div><img src="" data-src="${cur.img}" alt=""></div>
            <h3>${cur.title}</h3>
            <p>${cur.desc}</p>
        </li>`;
    }
    document.getElementById('newsItem').innerHTML = str;
}();

//->延迟加载
~function () {
    //->实现单张图片的延迟加载
    //=>oImg:要懒加载的图片对象
    function lazyImg(oImg) {
        //->开始处理的时候,标记一个标识,代表当前的图片已经加载过了,当条件在符合的时候,我们也不会在重新的处理了
        if (oImg.isLoad) return;

        //->A:浏览器底边框距离BODY的上偏移
        //->B:图片所在盒子的底部距离BODY的上偏移
        //->B<=A 图片完全出现在当前屏幕内(用户视野中了),此时开始加载图片
        var A = utils.win('clientHeight') + utils.win('scrollTop'),
            oImgP = oImg.parentNode,
            B = oImgP.offsetHeight + utils.offset(oImgP)['top'];
        if (B <= A) {
            oImg.isLoad = true;

            //->开始加载图片
            var tempImg = new Image;
            tempImg.src = oImg.getAttribute('data-src');
            tempImg.onload = function () {
                //->this:tempImg
                oImg.src = this.src;
                utils.css(oImg, 'display', 'block');
            }
        }
    }

    //->所谓的多张图片延迟加载,其实就是获取所有的图片,然后一张张的加载
    var newsItem = document.getElementById('newsItem'),
        imgList = newsItem.getElementsByTagName('img');

    function handleAllImg() {
        for (var i = 0; i < imgList.length; i++) {
            var curImg = imgList[i];
            //->执行单张延迟加载的方法,每一次循环都把当前这张图片处理一下
            lazyImg(curImg);
        }
    }

    //->当页面中所有内容都加载完成才会触发图片的延迟加载 以及 当浏览器滚动条滚动的时候也会把对应区域的图片做延迟加载
    window.onload = window.onscroll = handleAllImg;
}();