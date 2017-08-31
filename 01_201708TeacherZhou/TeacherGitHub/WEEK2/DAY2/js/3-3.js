var ary = [12, 23, 24, 25, 35, 14, 16];
/*
 * 字符串拼接：把我们的数组拼接成使用Math.max处理的代码字符串，最后使用eval把其转换为JS表达式执行即可
 */
//'Math.max('+ary.toString()+')' //->'Math.max(12,23,24,25,35,14,16)'
var max = eval('Math.max(' + ary.toString() + ')');
console.log(max);//->35


//[以下都是一步步的尝试]------------------------------

// var maxNum = Math.max(ary);
// //-> Math.max([12, 23, 24, 25, 35, 14, 16]) =>NaN
// //-> Math.max(12, 23, 24, 25, 35, 14, 16) =>35
// console.log(maxNum);//->NaN

// var maxNum = Math.max(ary.toString());
// //-> Math.max("12,23,24,25,35,14,16") =>NaN

// var maxNum = Math.max(eval(ary.toString()));
// console.log(maxNum);//->16
// eval("12,23,24,25,35,14,16") ->16

// [括号表达式]
// 一个括号中有多项，我们能够获取到的永远是最后一项的值
// (12,23) ->23
// function fn() {console.log(this);}
// var obj={fn:fn,name:'obj'};
// (obj.fn)();//->this:obj
// (12,fn,13,obj.fn)();//->this:window 括号表达式中,如果有多项,我们获取到的最后一项如果执行的话,方法中的this是window


