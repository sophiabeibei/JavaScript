//->需求: 去掉一个最高分,去掉一个最低分,剩余的求平均分
function avg(){
    //->找到原型上的sort方法,让sort执行的时候转化arguments
    var arg = arguments;
    [].sort.call(arg,function (a, b) {
        return a - b;
    });
    [].shift.call(arg);
    [].pop.call(arg);


    return parseFloat((eval([].join.call(arg,"+"))/arg.length).toFixed(2));//->toFixed(2)的结果变成字符串了,再parseFloat变成数字


}
var res = avg(90,75,88,100,98,97);
console.log(res);


//优化: 除了slice方法,其它数组方法arguments也能借用
//方法: 找到原型上的sort方法,让sort执行的时候转化arguments



