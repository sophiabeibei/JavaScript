var ary = [12, 23, 14, 25, 23, 14, 12, 15];

//->假设法：假设第一个是最大值或者最小值，然后从第二项开始和假设值进行比较，如果比假设的还要大，说明假设是错误的，我们把假设的值设置为当前的最大值
var max = ary[0],
    min = ary[0];
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    cur > max ? max = cur : null;
    cur < min ? min = cur : null;
}
console.log(max, min);
