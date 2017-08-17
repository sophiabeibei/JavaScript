//---------------------------------------
// var ary = [12, 23, 34, 45];
// ary.forEach(function (item, index, input) {
//     /*
//      * 1、数组中有几项,我们回调函数就要被执行几次
//      * 2、每一次执行都会给回调函数传递三个实参
//      *  -> item:当前遍历这一项的值
//      *  -> index:当前遍历这一项的索引
//      *  -> input:原始遍历的数组  input === ary:TRUE 和原始遍历的数组是同一个数组(用的同一个空间地址),修改INPUT原始的ARY也会修改
//      *
//      * 3、forEach中的this:ary
//      *   forEach回调函数中的this:window(严格模式下是undefined,也就是不知道执行的主体)
//      *
//      *   如果forEach方法在传递第二个实参,第二个实参是谁,相当于把回调函数中的this修改成为谁
//      *
//      * 4、FOREACH这个函数本身以及它的回调函数中都不支持RETURN返回值(MAP是支持的,这也是两者之前的唯一区别)
//      */
// }, 1);

//---------------------------------------
//=>在数组的原型上扩展一个myForEach方法,实现和forEach一模一样的功能(兼容所有的浏览器)
// Array.prototype.myForEach = function myForEach(callBack, context) {
//     //->this:我们需要遍历的数组
//     for (var i = 0; i < this.length; i++) {
//         var item = this[i],
//             index = i,
//             input = this;
//         //->循环数组中的每一项,都要把回调函数执行一次
//         //1、需要给回调函数传递三个形参值:item、index、input
//         //2、需要把回调函数中的THIS指向传递的CONTEXT
//         callBack && callBack.call(context, item, index, input);
//     }
// };


Array.prototype.myForEach = function myForEach() {
    var arg = arguments,
        callBack = arg[0],
        context = arg[1];
    if ('forEach' in Array.prototype) {
        this.forEach(callBack, context);
        return;
    }
    //->IE6~8
    for (var i = 0; i < this.length; i++) {
        callBack && callBack.call(context, this[i], i, this);
    }
};

var ary = [12, 23, 34, 45, 56];
ary.myForEach(function () {
    console.log(arguments, this);
});