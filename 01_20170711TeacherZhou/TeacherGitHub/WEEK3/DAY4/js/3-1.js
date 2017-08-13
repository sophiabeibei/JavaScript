function offset(curEle) {
    //->获取当前元素本身的左(上)偏移量以及它的父级参照物
    var l = curEle.offsetLeft,
        t = curEle.offsetTop,
        p = curEle.offsetParent;

    //->如果找到的父级参照物存在,并且还不是BODY呢,我们就要一直的向上查找
    while (p && p !== document.body) {
        //->我们需要在原有的左(上)偏移量的基础上,加上父级参照物的以下两部分值
        //->1)加上父级参照物的边框(但是在纯正的IE8下,偏移量已经包含边框了,我们不需要再重复的累加边框)
        //=>navigator.userAgent:获取当前浏览器的版本信息(IE8浏览器包含特定的字符:MSIE 8)
        if (!/MSIE 8/i.test(navigator.userAgent)) {
            l += p.clientLeft;
            t += p.clientTop;
        }

        //->2)加上父级参照物的偏移量
        l += p.offsetLeft;
        t += p.offsetTop;

        p = p.offsetParent;
    }

    //->把我们最后获取的L和T返回
    return {left: l, top: t};
}