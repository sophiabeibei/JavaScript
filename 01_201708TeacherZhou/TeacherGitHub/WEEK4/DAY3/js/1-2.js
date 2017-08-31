//->我们都应用过哪些支持回调函数的方法
// [12, 23, 34, 45].sort(function (a, b) {
//     return a - b;
// });

// var ary = ['tom', 20],
//     str = 'my name is {0},i am {1} years old';
// str = str.replace(/\{(\d+)\}/g, function () {
//     return ary[arguments[1]];
// });

// setInterval(function () {
//
// }, 1000);
// setTimeout(function () {
//
// }, 1000);

//->IE6~8下不兼容
// var ary = [12, 23, 34, 45, 56];
// ary.forEach(function (item, index) {
//     //->循环数组中的每一项(数组有几项,回调函数就被执行几次),每一次执行都会把当前数组遍历的这一项以及它的索引传递给回调函数
//     console.log(item, index);
// });
// ary = ary.map(function (item, index) {
//     //->遍历的语法和forEach相同,只不过它支持回调函数的返回值(forEach中的回调函数不支持返回值),回调函数中返回的是啥,相当于把数组的当前项替换成啥...
//     return item * 10;
// });
// console.log(ary);