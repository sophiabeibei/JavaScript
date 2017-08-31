var oBox = document.getElementById('box'),
    boxImg = oBox.getElementsByTagName('img')[0];

//->当浏览器滚动条滚动的时候（鼠标滚轮、键盘按键、鼠标拖动滚动条、使用JS代码...），触发以下事件执行
window.onscroll = function () {
    var A = utils.win('clientHeight') + utils.win('scrollTop'),
        B = oBox.offsetHeight + utils.offset(oBox)['top'];
    if (A >= B) {
        //->验证当前的图片是否已经处理过了(isLoad自定义属性会存储这个值)
        if (boxImg.isLoad) return;//->isLoad已经为TRUE说明已经处理过了,下面的代码就没有必要在执行了
        
        //->当前图片已经完成展示在屏幕中了,我们开始加载真实的图片
        var trueImg = boxImg.getAttribute('data-src');//->通过自定义属性获取真实图片的地址
        boxImg.src = trueImg;//->把真实地址赋值给图片的SRC
        //->onload：图片加载成功触发这个事件执行,成功后我们让图片显示即可
        boxImg.onload = function () {
            //->this:boxImg
            utils.css(this, {
                display: 'block'
            });
        };
        //->如果当前操作已经处理一次了(不管图片是否加载出来,哪怕加载出来,你执行一百遍它也加载不出来啊),我们后续再符合A>=B这个条件的时候,就不要在重复玩这些代码了
        boxImg.isLoad = true;//->设置一个自定义属性,证明已经处理过一次了
    }
};