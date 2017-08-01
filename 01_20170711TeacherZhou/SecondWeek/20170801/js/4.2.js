"use strict";//->当前整个js都开启了严格模式
var a = 12;
function fn() {
    "use strict";//->只有在这个私有作用域中才会开启严格模式
}
fn();
c = 10;
console.log(c);//->不允许出现不带var的变量  报错: Uncaught ReferenceError: c is not defined
//->把自己代码写严谨,写个自执行函数~function(){"use strict"}();
































