//->当前字符串中哪一个字母出现的次数最多，出现了多少次
var str = 'hello，my name is tom，i am 25 years old，i com from mars！';

str = str.replace(/[^a-zA-Z]/g, "");
str = str.split("").sort(function (a, b) {
    return a.localeCompare(b);
}).join("");
var ary = str.match(/(.)\1*/g);
ary.sort(function (a, b) {
    return b.length - a.length;
});
var max = ary[0].length,
    res = [];
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    if (cur.length !== max) break;
    res[res.length] = cur.substr(0, 1);
}
console.log(max + "<=>" + res);

