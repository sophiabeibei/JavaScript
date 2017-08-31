//=>回调函数: 把一个函数当作实参(值)传递给另外一个正在执行的函数,在另外一个函数执行的过程中,把我们传递的这个回调函数执行;

// function fn(num, callBack) {
//     //->callBack: function(){...}
//     callBack();
// }
// fn(100,function () { });


// //-----------------------------------------------------callBack中的逻辑与
// function fn(num, callBack) {
//     //->callBack: undefined
//     //->在让回调函数执行之前,我们最好验证以下他是否是一个函数类型的值,如果是函数类型的值我们再执行,防止报错;
//     // if(typeof callBack === "function"){
//     //     callBack();
//     // }
//     callBack && callBack();//->&&逻辑与: 看逻辑与的概念;(但这个不如上面的if判断严谨);一般来说,真实项目中,大家对于callBack只会传递函数或者不传递任何的东西;(所以也可以使用这个逻辑与"callBack && callBack()"判断)
// }
// fn(100);


// //------------------------------------------------callBack执行的先后顺序: 后执行
// function fn(num, callBack) {
//     console.log("FN");
//     callBack && callBack();
// }
// fn(100,function () {
//     console.log("Ok");
// });


// //----------------------------------------------callBack执行的先后顺序: 前执行
// function fn(num, callBack) {
//     //->传递的回调函数可以在FN中的任何一个位置执行: 根据需求来规划即可
//     callBack && callBack();
//     console.log("FN");
// }
// fn(100,function () {
//     console.log("Ok");
// });
// //->总结: 回调函数也是异步编程(有争议;也对,也不对)


// //----------------------------------------callBack执行细节: 根据需求被执行N次;
// function fn(num, callBack) {
//     //->传递的回调函数可以在FN中的任何一个位置执行: 根据需求来规划即可
//     //->而且我们的回调函数可以根据需求被执行N次;
//     for (var i = 0; i < 10; i++) {
//         callBack && callBack();
//     }
//     console.log("FN");
// }
// fn(100,function () {
//     console.log("Ok");
// });


//----------------------------------------------callBack 的传值(形参);      相似ary.sort(a,b)  可改this(宿主的概念)
// function fn(num, callBack) {
//     //->不仅仅能执行,而且还可以能把当前函数做任何想做的操作
//     //->1.可以给回调函数传递参数值
//     //->2.还可以改变回调函数中的this
//     callBack && callBack.call(arguments.callee,100,200);//->arguments.callee: 函数本身fn
// }
// fn(100,function (a,b) {
//     //->a:100   b:200  this:fn   宿主
//     console.log(a,b,this,arguments);
// });


// //--------------------------------------关于ary.sort(a,b)的概念
// //->执行sort方法的时候,把匿名函数作为回调函数传递给了sort,在sort执行的过程中,把匿名函数也执行了(被执行了N次),并且每次执行都把数组中的当前项和后一项作为参数传递给这个匿名的回调函数;--回调函数的原理
// ary.sort(function (a, b) {
//     return a-b;
// });
// //总结: sort是回调函数的精华;


//----------------------------------------------回调函数返回值 return
function fn(num, callBack) {
    //->在回调函数的宿主函数(回调函数在哪执行的,它的宿主函数就是谁,此时回调函数的岁主函数是fn)中,我们可以把回调函数执行,而且在宿主函数中可以接受回调函数的返回结果,以此来进行后续的一些操作
    var res = callBack(100, 200);
    console.log(res);//->
}
fn(100, function (a, b) {
    return a + b;
});


