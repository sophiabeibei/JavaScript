var obj = {
    total: 0
};
function sum(num1, num2) {
    //console.log(this);
    this.total = num1 + num2;
}

// sum(10, 20);//->this:window  =>window.total=30
// obj.sum(10, 20);//->Uncaught TypeError: obj.sum is not a function =>OBJ不具备SUM这个属性,所有不可以通过这种方式把方法中的THIS修改为OBJ

//=> sum.call：sum这个实例通过原型链的查找机制,找到Function.prototype的call方法
//=> sum.call()：把找到的方法执行(执行的是的CALL这个方法)
/*
 * call的作用:
 *  ->把需要操作函数中的this变为第一个实参的值
 *   [非严格模式下]
 *      第一个实参为空或者写null或者undefined,this都是window,剩下的第一个实参是谁,this就是谁
 *
 *   [严格模式下]
 *      第一个实参为空,this是undefined,其余的写谁this就是谁
 *
 *  ->改变为this后，把需要操作的函数执行即可
 */

// sum.call(obj, 10, 20);//->call执行的时候，首先让sum中的this变为obj，然后执行sum，把10和20传给sum
// sum.call();//->this:window  严格:undefined
// sum.call(null);//->this:window 严格:null
// sum.call(undefined);//->this:window 严格:undefined
// sum.call(1);//->this:1

/*
 * apply：它的语法等同于call，唯一的区别在于apply在给操作的函数传递实参的时候，不是一个个传递的，而是放在一个数组中一起传递的(但是也相当于在一个个的传参)
 */

sum.call(obj, 10, 20);
sum.apply(obj, [10, 20]);

/*
 * bind：它的语法和call一样,但是作用不一样
 *  ->bind只是提前把函数中的this改变了，但是并没有立即把函数执行，它属于预先改变THIS（柯理化函数思想）
 */
var obj2 = {name: '张三'};
function fn() {

}
// window.setInterval(fn, 1000);//->每隔1S执行一次FN
// window.setInterval(fn(), 1000);//->创建一个定时器,每隔1S中执行的是FN执行的返回结果=>undefined

// window.setInterval(fn.call(obj2), 1000);//->创建定时器的时候就把FN执行了,虽然改变了THIS,但是1S后执行的是FN的返回结果
// window.setInterval(fn.bind(obj2), 1000);//->创建定时器的时候，提前把FN中的this设置为obj2,1S后执行的是fn