//->需求: 去掉一个最高分,去掉一个最低分,剩余的求平均分
function avg(){
    //->1.把arguments类数组转换为数组(借用数组原型上的slice方法实现的原理,去实现类数组转化为数组的方法)
    //->找到数组原型上的slice,然后让其执行,并且让里面的this变为arg即可"把类数组转化为数组";


    //->Array.prototype.slice
    //->[].__proto__.slice(IE下屏蔽了__proto__的使用)
    //->[].slice
    var ary = [].slice.call(arguments);

    //->2.把数组排序: 去掉第一个和最后一个
    ary.sort(function (a,b){
        return a - b;
    }).shift();
    //->执行shift的结果,是被删除的那一项,是个数字.后面就不能再跟着链式写法;
    ary.length--;

    //->3.数组中剩下的值求和 + 4.求出平均数
    return parseFloat((eval(ary.join("+"))/ary.length).toFixed(2));//->toFixed(2)的结果变成字符串了,再parseFloat变成数字


}
var res = avg(90,75,88,100,98,97);
console.log(res);

//优化代码: 1.把arguments类数组转换为数组(借用数组原型上的slice方法实现的原理,去实现类数组转化为数组的方法)
//3.(数组求和)用join方法;  合并第(数组求和)+(求平均数)





