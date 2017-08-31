//->检测当前元素是否包含某些样式类名
function hasClass(curEle, strClass) {
    //->获取当前元素本身的样式类名
    var curEleClass = curEle.className,
        isMatch = true;//->假设是包含的
    strClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
    for (var i = 0; i < strClass.length; i++) {
        var reg = new RegExp("(^| +)"+strClass[i]+"( +|$)");
        if(!reg.test(curEleClass)){
            isMatch = false;
            break;
        }
    }
    return isMatch;
}


//->给当前元素增加样式类名

//->优化
//1.如果当前的样式类名已经存在,我们就没必要再增加了
//2.增加完成之后,最好让元素的样式类名之间只间隔一个空格

//->给当前元素增加样式类名
function addClass(curEle, strClass) {
    //curEle.className += " " + strClass;//->不要忘记多拼接一个空格,让新增的样式类名和原有的样式类名之间有点距离
    strClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
    for (var i = 0; i < strClass.length; i++) {
        var curClass = strClass[i];
        if(hasClass(curEle,curClass)){
            continue;//->已经存在就没有必要继续增加了,不存在我们再新增
        }
        curEle.className += "" + curClass;//->不要忘记手动增加一个空格,让新增的样式类名和原有的样式类名之间有间隙
    }
    //->让当前所有样式类名之间只间隔一个空格
    curEle.className = curEle.className.replace(/ +/g," ");
}

//->移除当前元素的某一个样式类名
function removeClass(curEle, strClass) {
    strClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
    //->original: 原有的
    //->获取原有的calss值: 把多个空格都替换为两(防止正则捕获共享一个字符的问题)个空格,把字符串的首尾空格也去掉
    var originalClass = curEle.className.replace(/ +/g,"  ");//->(/ +/g,"  ")两空格;(/^ +| +$/g,"")把这里的加号去掉

    //->循环传递的strClass,在原有样式中删除符合规则的
    for (var i = 0; i < strClass.length; i++) {
        var curClass = strClass[i];
        if(hasClass(curEle,curClass)){
            //->当前要删除的样式在原有的样式中存在,我们再删除
            var reg = new RegExp("(^| )"+curClass+"( |$)","g");
            originalClass = originalClass.replace(reg,"");
        }
    }
    //->把最新的字符串变为中间只间隔一个空格的模式,最后赋值给元素
    originalClass = originalClass.replace(/ +/g," ").replace(/^ +| +$/g,"");
    curEle.className = originalClass;
}























