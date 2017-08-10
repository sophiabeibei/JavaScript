var str = "16524";
//->把字符串变为"壹陆伍贰肆": 把所有的阿拉伯数字变为中文大写的汉字
var ary = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];


//利用了replace的特点
str = str.replace(/\d/g,function(){
    return ary[arguments[0]];
});
console.log(str);


//利用传统的字符串循环
// for (var i = 0; i < str.length; i++) {
//     var cur = str[i];
//     console.log(cur);
//     str = str.replace(cur,ary[cur]);
// }
// console.log(str);




//正则捕获: test match exec  replace...这几个都可以实现正则的捕获;








