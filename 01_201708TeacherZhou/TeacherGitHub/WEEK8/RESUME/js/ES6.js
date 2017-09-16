/*
 * 箭头函数
 * 1、写法简单,可以给形参设置默认值
 * 2、不支持ARGUMENTS,我们可以使用拓展运算符处理(而且拓展运算符获取的结果还是一个数组)
 * 3、箭头函数中的THIS是和所在宿主环境中的THIS保持一致的(没有独立的执行主体)
 *
 * 箭头函数不要乱用(合适的时候再用)
 */
// let fn = ()=> {};
// let fn = (a, b)=> {return a + b;};
// let fn = (a, b)=>a + b;
// let fn = (a = 0, b = 0)=>a + b;

// let fn = ()=> {
//     console.log(arguments);//->Uncaught ReferenceError: arguments is not defined
// };
// fn(100, 200, 300);

// let fn = (...arg)=> {
//     console.log(arg);->[100,200,300]
// };
// fn(100, 200, 300);

// let fn = (a, ...arg)=> {
//     console.log(arg);//->[200,300] 拓展运算符是获取除了前面形参以外的其它参数的值
// };
// fn(100, 200, 300);


//->这种情况是不建议使用箭头函数的
// box.onclick = ()=> {
//     this->window (不是box)
// };

// function sortTab() {
//     //->this:oTh
//     var _this=this;
//     ary.sort(function () {
//         this->window
//         _this->oTh
//     });
// }
// function sortTab() {
//     //->this:oTh
//     ary.sort((a,b)=>{
//         this->oTh
//     });
// }
// sortTab.call(oTh);