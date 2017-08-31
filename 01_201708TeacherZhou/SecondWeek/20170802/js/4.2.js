/*
* 需求: 一共传递10个值,去掉一个最高分,去掉一个最低分,剩下的分数求平均分数,获取的平均分保留小数点后面两位;
* */

function queryAvg() {

    //->1.把arguments转换为数组
    var ary = [];
    for (var i = 0; i < arguments.length; i++) {
        ary.push(arguments[i]);
    }
    //->2.给数组排序,去掉首尾(最大值和最小值)
    ary.sort(function (a, b) {
        return a - b;
    }).shift();//->1.用链式写法
    ary.length--;//->2.能用原生写法,就不用内置方法

    //->3.剩下的值求和,除以数组剩下的长度,求出平均数,最后返回
    return (eval(ary.join("+"))/ary.length).toFixed(2);
}
var res = queryAvg(9.8,8,9,9.2,9.5,8.6,7,7.8,9,8.8);
console.log(res);//->

