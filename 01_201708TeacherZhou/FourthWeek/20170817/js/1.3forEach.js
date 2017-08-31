//=>forEach的作用: 1.遍历数组中的每一项;2.第二个参数的实际意义;3.forEach的this;4.forEach的return;
//->forEach的兼容处理: 1.myForEach;2.模拟Array.prototype原型上的方法的写法


// var ary = [12,23,34,45,56];
// ary.forEach(function (item, index, input) {
//     /*
//     * 1.遍历数组中的每一项(数组中有几项,我们回调函数就要被执行几次);
//     * 2.每次执行都会给回调函数传递三个实参
//     *   //->item: 当前遍历这一项的值
//     *   //->index: 当前遍历这一项的索引
//     *   //->input: 原始遍历的数组 input === ary:true 和原始白努力的数组是同一个数组(用的同一个空间),修改input原始的ary也会修改;
//     * 3.forEach中的this: ary;
//     *   //->forEach回调函数中的this: window(严格模式下是undefined,也就是不知道执行的主体);
//     * */
//     console.log(input === ary);//->true
//     console.log(this);
// });



// //-----------------------------------------------------forEach的第二个参数: 12
// var ary = [12,23,34,45,56];
// ary.forEach(function (item, index, input) {
//     /*
//      * 1.数组中有几项,我们回调函数就要被执行几次;
//      * 2.每次执行都会给回调函数传递三个实参
//      *   //->item: 当前遍历这一项的值
//      *   //->index: 当前遍历这一项的索引
//      *   //->input: 原始遍历的数组 input === ary:true 和原始白努力的数组是同一个数组(用的同一个空间),修改input原始的ary也会修改;
//      * 3.forEach中的this: ary;
//      *   //->forEach回调函数中的this: window(严格模式下是undefined,也就是不知道执行的主体);
//      * */
//     console.log(input === ary);//->true
//     console.log(this);
// },12);



// //-----------------------------------------------------forEach的第二个参数: ary
// var ary = [12,23,34,45,56];
// ary.forEach(function (item, index, input) {
//     /*
//      * 1.数组中有几项,我们回调函数就要被执行几次;
//      * 2.每次执行都会给回调函数传递三个实参
//      *   //->item: 当前遍历这一项的值
//      *   //->index: 当前遍历这一项的索引
//      *   //->input: 原始遍历的数组 input === ary:true 和原始白努力的数组是同一个数组(用的同一个空间),修改input原始的ary也会修改;
//      * 3.forEach中的this: ary;
//      *   //->forEach回调函数中的this: window(严格模式下是undefined,也就是不知道执行的主体);
//      *
//      *   如果forEach方法再传第二个实参,第二个实参是谁,相当于把回调函数中的this修改成谁
//      * */
//     console.log(input === ary);//->true
//     console.log(this);
// },ary);


// //-----------------------------------------------------forEach 不支持return
// var ary = [12,23,34,45,56];
// ary = ary.forEach(function (item, index, input) {
//     /*
//      * 1.数组中有几项,我们回调函数就要被执行几次;
//      * 2.每次执行都会给回调函数传递三个实参
//      *   //->item: 当前遍历这一项的值
//      *   //->index: 当前遍历这一项的索引
//      *   //->input: 原始遍历的数组 input === ary:true 和原始白努力的数组是同一个数组(用的同一个空间),修改input原始的ary也会修改;
//      * 3.forEach中的this: ary;
//      *   //->forEach回调函数中的this: window(严格模式下是undefined,也就是不知道执行的主体);
//      *
//      *   如果forEach方法再传第二个实参,第二个实参是谁,相当于把回调函数中的this修改成谁
//      *
//      * 4.forEach 这个函数本身以及它的回调函数中都不支持return返回值(map是支持的,这就是forEach和map两者之间的唯一区别)
//      * */
//     //return "@";//->写return没用;
// },ary);




// //-----------------------------------------------------forEach 的兼容处理: 兼容IE6-8 (myForEach)
// Array.prototype.myForEach = function myForEach(callBack,context) {
//     //->context不传是undefined
//     //->this: 我们需要遍历的数组
//     //->兼容IE6-8
//     for (var i = 0; i < this.length; i++) {
//         var item = this[i],//->当前的值
//             index = i,//->索引
//             input = this;//->当前的数组
//         //->1.循环数组中的每一项,都把回调函数执行一次
//         //->1.需要给回调函数传递三个形参值: item,index,input
//         //->2.需要把回调函数中的this指向传递的context
//         callBack && callBack(context,item,index,input);
//     }
// };
// var ary = [12,23,34,45,56];
// ary.forEach(function () {
//     console.log(arguments, this);
// },1);




//-----------------------------------------------------myForEach: 模拟Array.prototype原型上的方法的写法
//->
Array.prototype.myForEach = function myForEach() {
    var arg = arguments,
        callBack = arg[0],
        context = arg[1];
    if("forEach" in Array.prototype){
        this.forEach(callBack,context);
        return;
    }
    //->IE6-8
    for (var i = 0; i < this.length; i++) {
        callBack && callBack(context,this[i],i,this);
    }
};
var ary = [12,23,34,45,56];
ary.forEach(function () {
    console.log(arguments, this);
},1);



























