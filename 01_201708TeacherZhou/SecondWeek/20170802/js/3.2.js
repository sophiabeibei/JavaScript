
var ary = [12,23,24,25,35,14,16];
/*
* 假设法:
*   假设第一个是最大的,然后和第二项及以后的值进行比较;
*   如果遇到一个比假设还要大的值,替换当前假设值;
* */
var maxNum = ary[0];
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    cur > maxNum ? maxNum = cur : null;
}
console.log(maxNum);

































































