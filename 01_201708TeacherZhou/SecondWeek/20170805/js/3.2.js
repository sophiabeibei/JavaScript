
var ary = [12, 23, 14, 25, 23, 14, 12, 15];

//-----------失败
// var max = Math.max(ary);
// //->Math.max([12, 23, 14, 25, 23, 14, 12, 15]),应该是Math.max(12, 23, 14, 25, 23, 14, 12, 15)
// console.log(max);//->NaN

//-----------失败
// var max = Math.max(ary.toString());
// //->Math.max("12, 23, 14, 25, 23, 14, 12, 15")

//-----------失败
// var max = Math.max(eval(ary.toString()));
// //->Math.max(15) ->15
// console.log(max);

//->括号表达式: 一个小括号中出现多项(用逗号隔开),我们获取的最后结果是最后一项的值
//(12,13)->13

// (function(){
//     console.log(this);//->this: window
// })();

// var obj = {
//     fn: function(){
//         console.log(this);
//     }
// };
// (obj.fn)();//->this: Object
// (12,obj.fn)();//->this: window   括号表达式中获取的值是把obj.fn的属性值克隆来一份拿来用的,相当于执行了一个自执行函数;



//求数组中的最大值最小值的方法二: 利用apply的特点

//-----成功: 利用apply的特点: 在传递给Math.max方法参数的时候,应该放一个数组(相当于在一个个的给方法传递实参)的特点;
// var max = Math.max.apply(null,ary);
// var min = Math.min.apply(null,ary);
// console.log(max);
// console.log(min);



//求数组中的最大值最小值的方法三: 利用字符串拼接eval转换成字符串表达式

//-----成功
// // ary.toString() =>"12,23,14,25,23,14,12,15"
// // "Math.max("+ary.toString()+")" =>"Math.max(12,23,14,25,23,14,12,15)"
// var max = eval("Math.max(" + ary.toString() + ")");
// var min = eval("Math.min(" + ary.toString() + ")");
// console.log(max,min);
























