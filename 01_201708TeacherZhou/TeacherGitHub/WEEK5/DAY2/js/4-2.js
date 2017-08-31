String.prototype.myTrim = function myTrim() {
    return this.replace(/^ +| +$/g, '');
};

$(function () {
    var $userName = $('#userName'),
        $nameSpanInit = $('#nameSpanInit'),
        $nameSpanError = $('#nameSpanError'),
        $nameSpanSuccess = $('#nameSpanSuccess'),
        $submit = $('#submit');

    $userName.on('focus', function () {
        var value = $(this).val().myTrim();
        if (value.length === 0) {
            $nameSpanInit.css('display', 'block').siblings('span').css('display', 'none');
        }
    }).on('blur', checkUserName).on('keydown keyup keypress', checkUserName);

    $submit.click(function () {
        //->验证用户输入的内容是否正确
        var isFlag = checkUserName();
        if (isFlag) {
            alert('用户名输入正确,可以做提交了');
        }
    });


    //=>验证USER-NAME
    //->错误验证分为三个阶段:
    //1、没有内容提示“用户名不能为空,请您输入!”
    //2、有内容但是不在长度限制范围内,提示的错误信息应该是必须在范围内
    //3、长度符合但是包含了非法字符,提示“只能是哪些字符”
    function checkUserName(e) {
        var value = $userName.val().myTrim();
        if (value.length === 0) {
            $nameSpanError.css('display', 'block').siblings('span').css('display', 'none');
            $nameSpanError.html('用户名为必填项，请您输入！');
            return;
        }

        if (value.length < 4 || value.length > 20) {
            $nameSpanError.css('display', 'block').siblings('span').css('display', 'none');
            $nameSpanError.html('用户名的长度必须在4~20位之间！');
            return;
        }

        var reg = /^(\w|-|[\u4e00-\u9fa5]){4,20}$/;
        if (!reg.test(value)) {
            $nameSpanError.css('display', 'block').siblings('span').css('display', 'none');
            $nameSpanError.html('输入格式错误，必须由 中文、字母、数字、_、-组成！');
            return;
        }

        //->只有光标离开才会提示正确
        if (e && e.type === 'blur') {
            $nameSpanSuccess.css('display', 'block').siblings('span').css('display', 'none');
        }

        return true;
    }
});