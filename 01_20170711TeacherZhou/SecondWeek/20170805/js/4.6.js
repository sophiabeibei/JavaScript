//->需求: 去掉一个最高分,去掉一个最低分,剩余的求平均分
function avg(){
    //->1.把arguments类数组转换为数组(借用数组原型上的slice方法实现的原理,去实现类数组转化为数组的方法)
    //->找到数组原型上的slice,然后让其执行,并且让里面的this变为arg即可"把类数组转化为数组";
    //->JS中的元素集合(HTMLCollection)和节点集合(NodeList)也都是类数组,在IE9以上浏览器中也可以这样操作,把其转换为数组,但是在IE6-8下这样执行就会报错,不兼容(arguments这样操作兼容所有的浏览器) =>对于元素和节点集合在IE6-8下只能是用最笨的循环操作了;

    /*
    * 如果像实现一个将类数组转化为数组的方法,需要使用两种方式,先使用[].slice.call(),如果报错了,再使用循环即可;
    * ->既能检测出代码报错,还不会抛出异常信息,不会终止下面的代码执行: 用try...catch...finally浏览器异常信息捕获(finally代码块不常用)
    *
    * */


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





