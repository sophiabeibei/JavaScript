//=>去除字符串的首尾空格:内置方法trim/trimLeft/trimRight也是去除空格,只是不兼容低版本的浏览器
String.prototype.myTrim = function myTrim() {
    return this.replace(/^ +| +$/g, '');
};

$(function () {
    var $userName = $('#userName'),
        $nameSpanInit = $('#nameSpanInit'),
        $nameSpanError = $('#nameSpanError'),
        $nameSpanSuccess = $('#nameSpanSuccess');

    $userName.on('focus', function () {
        var value = $(this).val();//->JQ中的VAL方法可以获取或者给文本框设置内容 $([selector]).val(xxx) / $([selector]).val()
        value = value.myTrim();

        //->光标进入,没有内容的情况下,显示提示信息
        if (value.length === 0) {
            $nameSpanInit.css('display', 'block').siblings('span').css('display', 'none');
        }

    }).on('blur', function () {
        var value = $(this).val().myTrim();
        //->光标离开如果没有内容,我们隐藏所有SPAN提示
        if (value.length === 0) {
            $nameSpanInit.add($nameSpanError).add($nameSpanSuccess).css('display', 'none');
            return;
        }
        //->离开的时候如果有内容,我们需要验证一下输入内容的准确性
        checkUserName();
    });


    //=>验证USER-NAME
    function checkUserName() {
        var value = $userName.val().myTrim();
        if (value.length > 0) {
            var reg = /^(\w|-|[\u4e00-\u9fa5]){4,20}$/;
            if (reg.test(value)) {
                $nameSpanSuccess.css('display', 'block').siblings('span').css('display', 'none');
            } else {
                $nameSpanError.css('display', 'block').siblings('span').css('display', 'none');
            }
        }
    }
});