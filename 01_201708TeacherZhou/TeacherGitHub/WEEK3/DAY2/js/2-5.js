var str = 'hello，my name is tom，i am 25 years old，i com from mars！';

//->把所有的非字母都替换掉
str = str.replace(/[^a-zA-Z]/g, '');

//->把剩下的纯字母进行排序
str = str.split('').sort(function (a, b) {
    return a.localeCompare(b);
}).join('');
//->str:'aaaacdeeefhii...'

//->把相邻一样的字母分别的捕获到,然后按照长度排序
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
console.log(max + '<=>' + res);