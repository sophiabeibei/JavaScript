//->在全局作用域下
//1)声明一个全局变量,也相当于给WINDOW增加了一个对应的属性,属性值就是变量存储的值
// var num = 13;
// console.log(num);//->13 输出变量存储的值
// console.log(window.num);//->13 输出WINDOW的属性值

// console.log(n, m);//->Uncaught ReferenceError: m is not defined 不带VAR的不能进行变量提升(不能再定义之前使用,否则会报错,而一旦当前行代码报错,后面代码都不执行了)
// var n = 13;//->既有变量的意思,也有WINDOW属性的意思
// m = 14;//->没有创建变量层次上的意思,仅仅是给WINDOW增加了一个叫做M的属性名,属性值14

//->变量提升：不管条件是否成立,判断体中的内容也要参与变量提升(但是此时不管是VAR/FUNCTION都只是提前声明不在定义了)；在代码执行过程中，如果条件不成立直接跳过判断继续执行，如果条件成立，进入到判断体中的第一件事情就是给函数赋值定义

//-> 'xxx' in window：IN是用来判断当前属性是否隶属于这个对象的,属于返回TRUE,反之FALSE
// var obj = {name: '周啸天', age: 28};
// console.log('name' in obj);//->TRUE
// console.log('sex' in obj);//->FALSE

//-------------------------------------------
/*
 * 全局下的变量提升
 *   var a;        =>undefined
 *   function fn;  =>undefined
 *
 * 在全局下声明的变量都相当于给window加了一个属性
 *   window.a=undefined
 *   window.fn=undefined
 */
console.log(a, fn);
if (!('a' in window)) {//->'a' in window =>TRUE 条件不成立,判断体中的代码不执行
    var a = 13;
    function fn() {console.log('ok');}
}
console.log(a, fn);