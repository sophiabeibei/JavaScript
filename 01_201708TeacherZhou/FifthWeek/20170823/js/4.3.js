//=>去除字符串的首尾空格: 内置方法有trim/trimLeft/trimRight也是去除空格,只是不兼容低版本浏览器;
//->自己写myTrim,去除字符串的首尾空格,实现兼容浏览器
String.prototype.myTrim = function myTrim() {
    return this.replace(/^ +| +$/g, '');
};
$(function () {
    var $userName = $("#userName"),
        $nameSpanInit = $("#nameSpanInit"),
        $nameSpanError = $("#nameSpanError"),
        $nameSpanSuccess = $("#nameSpanSuccess"),
        $submit = $("#submit");
    $userName.on("focus", function () {
        var value = $(this).val();
        value = value.myTrim();
        if (value.length === 0) {
            $nameSpanInit.css("display", "block").siblings("span").css("display", "none");
        }
    }).on("blur", checkUserName).on("keydown keyup keypress", checkUserName);

    $submit.click(function () {
        var isFlag = checkUserName();
        if (isFlag) {

        }
    });
    function checkUserName(e) {
        var value = $userName.val().myTrim();
        if (value.length === 0) {
            $nameSpanError.css("display", "block").siblings("span").css("display", "none");
            $nameSpanError.html("用户名不能为空,请您输入");
            return;
        }
        //->禁止输入
        // if (value.length >= 20) {
        //     if (e && e.type.indexOf("key") > -1 && e.keyCode !== 46 && e.keyCode !== 8) {
        //         return false;
        //     }
        // }


        //->禁止输入简写
        if (value.length >= 20 && e && e.type.indexOf("key") > -1 && e.keyCode !== 46 && e.keyCode !== 8) {
            return false;
        }

        if (value.length < 4 || value.length > 20) {
            $nameSpanError.css("display", "block").siblings("span").css("display", "none");
            $nameSpanError.html("用户名的长度范围必须在4~20位之间");
            return;
        }

        var reg = /^(\w|-|[\u4e00-\u9fa5]){4,20}$/;
        if (!reg.test(value)) {
            $nameSpanError.css("display", "block").siblings("span").css("display", "none");
            $nameSpanError.html("格式错误,必须由中文,字母,数字,_,-组成");
            return;
        }

        if (e.type === "blur") {
            $nameSpanSuccess.css("display", "block").siblings("span").css("display", "none");
        }
        return true;
    }
});

























