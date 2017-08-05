//求数组中的最大值最小值的方法一
var ary = [12, 23, 14, 25, 23, 14, 12, 15];
ary.sort(function (a, b) {
    return a - b;
});

