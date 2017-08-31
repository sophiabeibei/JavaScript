/*
Function.prototype.call = function call(context) {
    //->this:fn[当前我们需要操作的函数,也就是Function类的实例]
    //1、把函数中的THIS改为第一个参数值(理解为把this中的this关键字改变为context的值)

    //2、把函数执行(把this执行)
    // this();
};
*/
function fn1() {console.log(1);}
function fn2() {console.log(2);}
fn1.call(fn2);//->call执行的时候,把fn1中的this变为fn2,让fn1执行 =>1

fn1.call.call.call.call(fn2);//->call执行的时候，把“fn1.call.call.call” 中的this变为fn2，然后让“fn1.call.call.call”执行
//-> fn1.call.call.call
//   = function call() { [native code] } 就是call这个方法
//-> 把call执行，让call中的this变为fn2，根据call的实现源码分析得到，我们其实就是让fn2在执行
//-> 2

Function.prototype.call(fn1);//->Function.prototype是一个匿名函数(anonymous),它是函数数据类型的,不是对象类型的(但是操作起来和其它类的原型一模一样)
Function.prototype.call.call.call.call(fn1);
//->Function.prototype.call.call.call
//-> =
//->function call(){[native code]}

// function call(){[native code]}.call(fn1)
//->function call(){[native code]} =>A
//-> A.call(fn1)
//-> A中的this:fn1
//-> A执行