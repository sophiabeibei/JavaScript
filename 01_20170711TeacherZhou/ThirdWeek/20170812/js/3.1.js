function offset(curEle) {
    //->1.先获得自己本身的左偏移和上偏移,以及自己的父级参照物;
    var l = curEle.offsetLeft,
        t = curEle.offsetTop,
        p = curEle.offsetParent;
    //->2.如果找到的父级参照物存在,并且还不是body,我们就要一直的向上查找.用while循环;
    while(p && p !== document.body){
        //->3.我们需要在原有的左(上)偏移量的基础上,加上父级参照物的以下两部分值:1.父级参照物的边框;2.加上父级参照物的偏移量;
        //->(1)加父级参照物的边框(但是在纯正的IE8下(模拟器的不算)偏移量已经包含边框了,我们不需要再重复的加边框)
            //->判断IE8的方法: window.navigator.userAgent(获取当前浏览器的版本信息,IE8浏览器包含特定的字符: MSIE 8)
        if(!/MSIE 8/i.test(navigator.userAgent)){
            l += p.clientLeft;
            t += p.clientTop;
        }
        //->(2)加上父级参照物的偏移量
        l += p.offsetLeft;
        t += p.offsetTop;
        p = p.offsetParent;
    }
    //->把我们最后获取的L和T返回(一个对象)
    return {left: l,top: t};
}

//->offset: 获取当前元素距离body的偏移量