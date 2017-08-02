var ary = [12, 23, 24, 25, 35, 14, 16];
/*
 * 先由大到小排序，取第一个就是最大值(张继伟思想)
 */
ary.sort(function (a, b) {
    return b - a;
});
console.log(ary[0]);