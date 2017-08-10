//->想把字符串变为 '壹陆伍贰肆' : 把所有的阿拉伯数字变为中文大写的汉字
var str = '每月工资：16524';
var ary = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
str = str.replace(/\d/g, function () {
    //->arguments[0]：1 6 5 2 4
    return ary[arguments[0]];
});
console.log(str);


//->利用传统的字符串循环
// for (var i = 0; i < str.length; i++) {
//     var cur = str[i];
//     str = str.replace(cur, ary[cur]);
// }
// console.log(str);




