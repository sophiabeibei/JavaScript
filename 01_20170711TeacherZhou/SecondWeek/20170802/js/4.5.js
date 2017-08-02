/*
* 需求: 一共传递10个值,去掉一个最高分,去掉一个最低分,剩下的分数求平均分数,获取的平均分保留小数点后面两位;
* */

function queryAvg() {
    //->arguments可以借用类数组中的很多方法;
    var arg = arguments;
    [].sort.call(arg,function(a, b){
        return a - b;
    });
    [].shift.call(arg);
    [].pop.call(arg);

    return (eval([].join.call(arg,"+"))/arg.length).toFixed(2);


}
var res = queryAvg(9.8,8,9,9.2,9.5,8.6,7,7.8,9,8.8);
console.log(res);//->


//->需求: 重写slice方法,实现一个数组克隆即可(内置的slice实现克隆的时候的源码也应该是这么做的:)
// Array.prototype.slice = function slice() {
//     //->this: ary;
//     var aryNew = [];
//     for (var i = 0; i < this.length; i++) {
//         aryNew.push(this[i]);
//     }
//     //->通过对比,我们发现,我们实现的把arguments变为数组的代码和内置的slice克隆代码很相近(arguments的结构和数组一样),唯一的区别是,内置的slice用的是this,我们用的是arguments;
//     //->如上得出,如果我们能把内置的slice方法执行,并且让方法中的this变为我们的arguments,那么这样就相当于把我们的arguments变为数组;这样就不需要我们自己辛苦写循环了;
//     //->如上得出,我们的这种思想是: 让类数组借用数组原型的方法,方法执行的时候让this变为类数组,实现将类数组转为数组;
//
//     return aryNew;
// };
// var ary = [12,23,34];
// var newAry = ary.slice();
// console.log(newAry);





















