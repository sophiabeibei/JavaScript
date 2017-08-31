//=>回调函数：把一个函数当做实参(值)传递给另外一个正在执行的函数，在另外一个函数执行的过程中，把我们传递的这个回调函数执行

// function fn(num, callBack) {
//     //->callBack:function () {...}
//     callBack();
// }
// fn(100, function () {});


// function fn(num, callBack) {
//     //->callBack:undefined
//     //->在让回调函数执行之前,我们最好验证一下它是否是一个函数类型的值,如果是函数类型的是我们在执行,防止报错
//     // if (typeof callBack === 'function') {
//     //     callBack();
//     // }
//     callBack && callBack();//->一般来说,真实项目中,大家对于callBack只会传递函数或者不传递任何的东西
// }
// fn(100);


// function fn(num, callBack) {
//     //->传递的回调函数可以在FN中的任何一个位置执行:根据需求来规划即可
//     //->而且我们的回调函数可以根据需求被执行N次
//     for (var i = 0; i < 10; i++) {
//         callBack && callBack();
//     }
//     console.log('FN');
// }
// fn(100, function () {
//     console.log('OK');
// });


// function fn(num, callBack) {
//     //->不仅仅能执行,而且还可以把当前函数做任何想做的操作
//     //1、可以给回调函数传递参数值
//     //2、改变回调函数中的THIS
//     callBack && callBack.call(fn, 100, 200);
// }
// fn(100, function (a, b) {
//     //->a:100  b:200  this:fn
//     console.log(a, b, this, arguments);
// });

//->执行SORT方法的时候,把匿名函数做为回调函数传递给了SORT,在SORT执行的过程中,把匿名函数也执行了(被执行了N次),并且每一次执行都把数组中的当前项和下一项作为参数传递给这个匿名的回调函数
// ary.sort(function (a, b) {
//     return a-b;
// });

// function fn(num, callBack) {
//     //->在回调函数的宿主函数(回调函数在哪执行的,它的宿主函数就是谁,此时回调函数的宿主函数是FN)中，我们可以把回调函数执行，而且在宿主函数中可以接受回调函数的返回结果，以此来进行后续的一些操作
//     var res = callBack(100, 200);
//     console.log(res);//->300
// }
// fn(100, function (a, b) {
//     return a + b;
// });



















