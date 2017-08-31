// //->var a=5; var b=6; var c=7; (每一个都带VAR)
// var a = 5,
//     b = 6,
//     c = 7;
//
// //->var a=10; b=10; c=10; (B/C是不带VAR的)
// var a = b = c = 10;
//------------------------------------------------
/*
 * 全局作用域下的变量提升
 *   var a;  var b;  var c;
 *   fn = xxxfff000;
 */
console.log(a, b, c); //->undefined*3
var a = 5,
    b = 6,
    c = 7;
console.log(a, b, c);//->5、6、7
function fn(a) {
    /*
     * 私有作用域中的操作
     *   形参赋值：a=11
     *   变量提升: var b;
     *   ->以后再当前的作用域中a和b都是私有变量,和全局下的变量没任何的关系
     */
    console.log(a, b, c);//->11、undefined、7
    a = 12;
    var b = 13;
    c = 14;//->全局下的C=14
    console.log(a, b, c);//->12、13、14
}
c = fn(11);//->把FN执行的返回结果赋值给全局下的C(一个函数的返回值只需要看RETURN后面的值即可,没有RETURN默认返回值就是undefined) =>c=undefined
console.log(a, b, c);//->5、6、undefined


