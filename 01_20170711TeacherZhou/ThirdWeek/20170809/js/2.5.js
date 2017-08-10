//->当前字符串中哪一个字母出现的次数最多，出现了多少次
var str = 'hello，my name is tom，i am 25 years old，i com from mars！';

//1.把所有的非字母都替换掉
str = str.replace(/[^a-zA-Z]/g, "");

//把剩下的纯字母进行排序
str = str.split("").sort(function (a, b) {
    return a.localeCompare(b);
}).join("");
// console.log(str);//->aaaacdeeefhiiilllmmmmmmmnooooorrrssstyy


// str.replace(/(.)\1*/g);
// console.log(str.match(/(.)\1*/g));//->["aaaa", "c", "d", "eee", "f", "h", "iii", "lll", "mmmmmmm", "n", "ooooo", "rrr", "sss", "t", "yy"]

//把相邻一样的字母分别的捕获到,然后按照长度排序
var ary = str.match(/(.)\1*/g);
ary.sort(function (a, b) {
    return b.length - a.length;
});
//->获取最后想要的结果
var max = ary[0].length,
    res = [];
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    if (cur.length !== max) break;
    res[res.length] = cur.substr(0, 1);
}
console.log(max + "<=>" + res);


//正则捕获: test match exec  replace...这几个都可以实现正则的捕获;
