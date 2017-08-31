//=>除了SLICE,其它数组方法,ARG一般也能借用
function avg() {
    var arg = arguments;
    [].sort.call(arg, function (a, b) {
        return a - b;
    });
    [].shift.call(arg);
    [].pop.call(arg);
    return parseFloat((eval([].join.call(arg, '+')) / arg.length).toFixed(2));
}
var res = avg(90, 75, 88, 100, 98, 97);
console.log(res);