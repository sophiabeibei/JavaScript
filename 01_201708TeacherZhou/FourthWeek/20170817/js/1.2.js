//->我们都应用过哪些支持回调函数的方法: sort/replace/setInterval/setTimeout/forEach/map
//=>sort/replace/setInterval/setTimeout兼容(可以重写--为了熟悉原理)
//->/forEach/map不兼容(需要兼容处理--重新)

// //--------------------------------------sort
// [12,23,34,45].sort(function (a, b) {
//     return a-b;
// });


// //--------------------------------------replace
// var ary =["tom",20],
//     str = "my name is {0}, i am {1} years old";
// str = str.replace(/\{(\d+)\}/g, function () {
//     return ary[arguments[1]];
// });


// //--------------------------------------定时器 setInterval setTimeout
// setInterval(function () {
//
// });
// setTimeout(function () {
//
// });


// //------------------------------------------------forEach
// var ary = [12,23,34,45,56];
// ary.forEach(function (item, index) {
//     //->循环数组中的每一项(数组有几项,回调函数就被执行几次),每次执行都会把当前数组遍历的这一项以及它的索引传递给回调函数;
//     console.log(item, index);
// });
// //->forEach在IE6-8下不兼容


// //------------------------------------------------map
// ary.map(function (item, index) {
//     //->支持一个结果;遍历的语法和forEach相同,只不过它支持回调函数的返回值(forEach中的回调函数不支持返回值),回调函数中返回的是啥,相当于数组的当前向替换成啥...
//     return item * 10;
// });
// console.log(ary);
// //->map在IE6-8下不兼容

