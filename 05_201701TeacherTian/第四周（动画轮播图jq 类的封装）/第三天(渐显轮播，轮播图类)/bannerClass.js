/**
 * 轮播图封装
 * @param container 轮播图最外层的元素
 * @param url 接口  后台提供
 * @param interval  图片播放的频率
 */
(function (){
    function Banner(container, url, interval) {
        this.container = container; //传给我哪个容器我就把这个容器保存在实例的私有属性上
        this.inner = utils.getElementsByClass('inner', this.container)[0];
        this.focusList = utils.getElementsByClass('focusList', this.container)[0];
        this.left = utils.getElementsByClass('left', this.container)[0];
        this.right = utils.getElementsByClass('right', this.container)[0];
        this.imgs = this.inner.getElementsByTagName('img');
        this.lis = this.focusList.getElementsByTagName('li');
        this.data = null;
        this.url = url;
        this.interval = interval || 2000;
        this.index = 0;
        this.timer = null;
        this.init(); // 初始化
        //this.getData();
        //this.bindData();
        //...
    }
    Banner.prototype.getData = function () {
        var that = this; // 要时刻保证this是实例
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.url + '?_=' + Math.random(), false);
        xhr.onreadystatechange = function () {
            // 只要this被函数包含那么this就变了
            if (xhr.readyState == 4 && xhr.status == 200) {
                that.data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    }
    Banner.prototype.bindData = function () {
        if (this.data && this.data.length) {
            var strImg = '';
            var strLi = '';
            for (var i = 0; i < this.data.length; i++) {
                strImg += '<img src="" real="' + this.data[i].src + '">';
                strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
            }
            this.inner.innerHTML = strImg;
            this.focusList.innerHTML = strLi;
        }
    }
    Banner.prototype.checkImg = function () {
        var that = this;
        for (var i = 0; i < this.imgs.length; i++) {
            var tempImg = document.createElement('img');
            tempImg.index = i;
            tempImg.src = this.imgs[i].getAttribute('real');
            tempImg.onload = function () {
                that.imgs[this.index].src = this.src;
                if (this.index == 0) {
                    utils.css(that.imgs[0], 'zIndex', 1);
                    animate({
                        ele: that.imgs[0],
                        target: {
                            opacity: 1
                        },
                        duration: 300
                    });
                }
            }
        }
    }

    Banner.prototype.autoMove = function () {
        this.index++;
        if (this.index == this.data.length) {
            this.index = 0;
        }
        this.setImg();
    }
    Banner.prototype.setImg = function () {
        for (var i = 0; i < this.imgs.length; i++) {
            if (i == this.index) {
                utils.css(this.imgs[i], 'zIndex', 1);
                animate({
                    ele: this.imgs[i],
                    target: {
                        opacity: 1
                    },
                    duration: 300,
                    callback: function () {
                        var otherImgs = utils.siblings(this);
                        for (var i = 0; i < otherImgs.length; i++) {
                            utils.css(otherImgs[i], 'opacity', 0);
                        }
                        // canClick = true;
                    }
                });
            } else {
                utils.css(this.imgs[i], 'zIndex', 0);
            }
            this.lis[i].className = this.index == i ? 'cur' : '';
        }
    }

    Banner.prototype.bindEvent = function (){
        var that = this;
        this.container.onmouseover = function () {
            window.clearInterval(that.timer);
            that.left.style.display = that.right.style.display = 'block';
        }

        this.container.onmouseout = function () {
            // 嵌套一个匿名函数，匿名函数中的this是window也无所谓。
            that.timer = window.setInterval(function (){
                this; // window
                that.autoMove(); // 原型上方法中的this是实例
            }, that.interval);
            that.left.style.display = that.right.style.display = 'none';
        }
    }
    Banner.prototype.bindEventForBtn = function (){
        var that = this;
        this.left.onclick = function () {
            //if (canClick) {}
            that.index--;
            if (that.index == -1) {
                that.index = that.data.length - 1;
            }
            that.setImg();

            //canClick = false;
        }
        this.right.onclick = function (){
            this; // 按钮
            that.autoMove();
        }
    }
    Banner.prototype.bindEventForLis = function () {
        var that = this;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = function () {
                that.index = this.index;
                that.setImg();
            }
        }
    }

    Banner.prototype.init = function (){
        var that = this;
        this.getData(); // 获取数据
        this.bindData(); // 绑定数据 => imgs等已经出现
        this.checkImg() // 验证图片有效性
        // 轮播
        this.timer = window.setInterval(function (){ // 启动定时器
            that.autoMove();
        }, this.interval);
        //
        this.bindEvent();
        this.bindEventForBtn();
        this.bindEventForLis();
    }

    window.Banner = Banner;

})();






