function queryAvg() {
    //->执行内置的SLICE方法,让THIS变为ARG,可以实现把类数组转化为数组
    //=>执行内置的SLICE
    // Array.prototype.slice()
    // [].__proto__.slice()
    // [].slice()
    var ary = Array.prototype.slice.call(arguments);
    
    ary.sort(function (a, b) {
        return a - b;
    }).shift();
    ary.length--;

    return (eval(ary.join('+')) / ary.length).toFixed(2);
}
var res = queryAvg(9.8, 8, 9, 9.2, 9.5, 8.6, 7, 7.8, 9, 8.8);
console.log(res);











