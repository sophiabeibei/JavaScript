//->检测当前元素是否包含某些样式类名
function hasClass(curEle, strClass) {
    var curEleClass = curEle.className,
        isMatch = true;
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    for (var i = 0; i < strClass.length; i++) {
        var reg = new RegExp('(^| +)' + strClass[i] + '( +|$)');
        if (!reg.test(curEleClass)) {
            isMatch = false;
            break;
        }
    }
    return isMatch;
}

//->给当前元素增加样式类名

// function addClass(curEle, strClass) {
//     curEle.className += ' ' + strClass;//->不要忘记多拼接一个空格,让新增的样式类名和原有样式类名之间有点间距
//     //->优化
//     //1、如果当前的样式类名已经存在,我们就没必要在增加了
//     //2、增加完成之后,最好让元素的样式类名之间只间隔一个空格
// }

function addClass(curEle, strClass) {
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
    for (var i = 0; i < strClass.length; i++) {
        var curClass = strClass[i];
        if (hasClass(curEle, curClass)) continue;//->已经存在就没有必要继续增加了,不存在我们在新增
        curEle.className += ' ' + curClass;//->不要忘记手动增加一个空格,让新增的样式类名和原有的样式类名之间有间隙
    }
    //->让当前元素所有样式类名之间只间隔一个空格
    curEle.className = curEle.className.replace(/\s+/g, ' ');
}


//->移除当前元素的某一个样式类名
function removeClass(curEle, strClass) {
    strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);

    //->获取原有的class值:把多个空格都替换为两个空格(防止正则捕获共享一个字符的问题),把字符串的首尾空格也去掉
    var originalClass = curEle.className.replace(/\s+/g, '  ');

    //->循环传递的strClass,在原始样式中删除符合规则的
    for (var i = 0; i < strClass.length; i++) {
        var curClass = strClass[i];
        if (hasClass(curEle, curClass)) {
            //->当前要删除的样式在原有的样式中存在,我们在删除
            var reg = new RegExp('(^| )' + curClass + '( |$)', 'g');
            originalClass = originalClass.replace(reg, '');
        }
    }

    //->把最新的字符串变为中间只间隔一个空格的模式,最后赋值给元素
    originalClass = originalClass.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    curEle.className = originalClass;
}