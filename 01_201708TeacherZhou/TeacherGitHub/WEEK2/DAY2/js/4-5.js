function queryAvg() {
    //->ARG可以借用数组中的很多方法
    var arg = arguments;
    [].sort.call(arg, function (a, b) {
        return a - b;
    });
    [].shift.call(arg);
    [].pop.call(arg);

    return (eval([].join.call(arg, '+')) / arg.length).toFixed(2);
}
var res = queryAvg(9.8, 8, 9, 9.2, 9.5, 8.6, 7, 7.8, 9, 8.8);
console.log(res);











