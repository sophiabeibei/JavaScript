/*
* 需求: 一共传递10个值,去掉一个最高分,去掉一个最低分,剩下的分数求平均分数,获取的平均分保留小数点后面两位;
*
*
* */


function queryAvg() {
    //console.log(arguments);//[9.8, 8, 9, 9.2, 9.5, 8.6, 7, 7.8, 9, 8.8, callee: function, Symbol(Symbol.iterator): function]
    //arguments 中存储了评分的10个分数值;
    //console.log(arguments instanceof Array);//false   arguments是类数组(类似数组但是不是数组的实例)不能直接使用数组中提供的方法

    //->1.把arguments转换为数组
    var ary = [];
    for (var i = 0; i < arguments.length; i++) {
        ary.push(arguments[i]);
    }
    //->2.给数组排序,去掉首尾(最大值和最小值)
    ary.sort(function (a, b) {
        return a - b;
    });
    ary.shift();//->去首
    ary.pop();//->去尾

    //->3.剩下的值求和
    var total = null;
    for (var j = 0; j < ary.length; j++) {
        total += ary[j];

    }

    //->除以数组剩下的长度,求出平均数,最后返回
    return (total/ary.length).toFixed(2);
}
var res = queryAvg(9.8,8,9,9.2,9.5,8.6,7,7.8,9,8.8);
console.log(res);//->

























