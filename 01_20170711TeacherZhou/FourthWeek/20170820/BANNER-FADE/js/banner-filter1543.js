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
    //->记录当前展示图片的索引;(步长)
    var step = 0,
    //->记录一共有多少张图片
        maxNum = 0,
    //->控制间隔多长时间切换到下一张(时间因子)
        interval = 3000,
    //->存储自动轮播定时器的返回值
        autoTimer = null;

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
        //->获取到数据后,记录下一共有多少张图片;
        maxNum = bannerData.length;
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
    
    //->执行change方法切换到下一张图片
    function changeImg() {
        //->切换到下一张图片的思路
        //1.让当前step对应的这张图片的li(需要展示的这一张)zIndex=1;然后让其他图片的li的zIndex=0;
        //2.让当前需要展示这张的图片的li的透明度从0到1,(假设300ms事件完成动画),动画完成后,让其他图片的li的透明度为0;
        //3.不要忘记加载真实图片;


        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            //控制zIndex
            i===step?utils.css(item,"zIndex",1): utils.css(item,"zIndex",0);
            //控制opacity
            animate({
                curEle: itemList[step],
                target: {
                    opacity: 1
                },
                duration: 300,
                callBack: function () {
                    //->让其他的li透明度变为0
                    for (var j = 0; j < itemList.length; j++) {
                        i!==step?utils.css(itemList[i],"opacity",0):null;
                    }
                }
            });
            //->加载真实图片
            lazyImg(imgList[step]);

            //->焦点对齐
            autoFocus();
        }
    }

    //->自动对焦(焦点对齐)
    function autoFocus() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            i===step?utils.addClass(item,"select"):utils.removeClass(item,"select");
        }
    }





//->获取所有的li,再获取li下的img

//->所谓轮播,就是每间隔多少时间,切换到下一张



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
            };

            //->自动轮播图片
            autoTimer = setInterval(function () {
                step++;
                if(step>=maxNum){

                    //->一共有四张(maxNum=4),如果当前step已经大于等于这个值了,后面没有第五章图片,我们此时让其切换到第一张即可
                    step=0;
                }
                changeImg();
            },interval)
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