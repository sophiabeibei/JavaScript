//->获取数据
//->绑定数据
//->图片延迟加载

//->单利模式
var bannerRender = (function () {
    //->因为这个变量在很多方法中要用,就要提出来,如果写在queryData内,外面访问不到;
    var bannerData = null,
        banner = document.getElementById("banner"),
        imgBox = utils.byClass("imgBox", banner)[0],
        focus = utils.byClass("focus", banner)[0],
        imgList = null,
        itemList = null,
        focusList = null;

    //->AJAX获取JSON数据
    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", "json/banner.json", false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //->数据绑定(普通字符串拼接)
    function bindData() {
        var str = "",
            strFocus = "";
        for (var i = 0; i < bannerData.length; i++) {
            var curData = bannerData[i];
            str += '<li>';
            str += '<a href="' + curData.link + '" target="_blank">';//->注意: 这里的单双引号的区别;
            str += '<span>'+curData.desc+'</span>';
            str += '<img src="" data-src="' + curData.img + '" alt="">';
            str += '</a>';
            str += '</li>';
            var cName = i === 0 ? 'select' : null;
            strFocus += '<li class="' + cName + '"></li>';
        }
        imgBox.innerHTML = str;
        focus.innerHTML = strFocus;

    }

    //->图片延迟加载
    function lazyImg(curImg) {
        if (curImg.isLoad) return;
        var tempImg = new Image;
        tempImg.onload = function () {
            curImg.src = this.src;
            tempImg = null;
        };
        tempImg.src = curImg.getAttribute("data-src");//->先绑事件,再赋值真实地址;
        curImg.isLoad = true;
    }





//->获取所有的li,再获取li下的img





    return {
        //->单利模式+命名模式=超级单利模式
        //->这种模式: 基于单利模式的命名模式;
        //->init: 整个单利模式的指挥官,在这里我们协调哪些方法先去执行;哪些事情现在执行,哪些事情后续处理;所有的事情都在init里完成;以后想实现轮播图,直接调用init就可以了;
        init: function () {
            queryData();
            bindData();
            //->绑定完成数据后,我们获取需要的li和img;
            itemList = utils.children(imgBox,"li");
            imgList = imgBox.getElementsByTagName("img");
            focusList = utils.children(focus,"li");

            //->window.onload当页面加载成功之后,做两件事情
            // 1.首先让第一个li显示(zIndex=1 opacity=1);
            // 2.再给第一张图片做延迟加载(其他暂时不做),当切换到下一张的时候再做;
            window.onload = function () {
                //->先让第一个li显示
                var first = itemList[0];
                utils.css(first,{
                    zIndex: 1,
                    opacity : 1
                });
                //->再给第一张图片做延迟加载
                lazyImg(imgList[0]);
            }
        }
    }
})();
bannerRender.init();

//render: 处理的意思
//基于单利模式完成轮播图(bannerRender就是我们的命名空间,轮播图中所有需要做的事情都要写在这个命名空间下)
//->单利模式的技巧:
// 1.每一个要实现的功能,我们都封装为单独的方法;
// 2.把那种需要在多个方法中都要使用的变量,提取到外面;
//因为要兼容所有的浏览器,所以用普通的字符串拼接;不能用es6;es6不兼容;