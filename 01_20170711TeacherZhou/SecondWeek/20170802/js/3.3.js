
var ary = [12,23,24,25,35,14,16];
/*
* 字符串拼接:
*   把我们的数组拼接成使用Math.max处理的代码字符串,最后使用eval把其转换为js表达式即可
*
* */







//以下都是一步步的尝试--------------------------------------
//方法   不行
// var maxNum = Math.max(ary);
// //->Math.max([12,23,24,25,35,14,16])  =>NaN;
// //->Math.max(12,23,24,25,35,14,16)  =>35
// console.log(maxNum);


//方法二 一 直接放ary;要求一个个的传参,不能放一个数组;   不行
// var maxNum = Math.max(ary);
// //->Math.max("12,23,24,25,35,14,16")  =>NaN;


//方法三  toString()方法,也是传的一个数值;    不行
// var maxNum = Math.max(eval(ary.toString()));
// console.log(maxNum);//->16
// eval(ary.toString("12,23,24,25,35,14,16"));  //->16

//方法四: 新知识(今天学的)
//括号表达式: 一个括号中有多项,我们能够获取到的永远是最后一项的值
//(12,23)->23
// function fn() {console.log(this);}
// var obj = {fn: fn,name: "obj"};
// (obj.fn)();//->this: obj;
// (12,fn,13,obj.fn)();//->this: window 括号表达式中,如果有多项,我们获取到的最后一项如果执行的话,方法中的this是window;如果有一项,加不加括号无所谓;


















































