//->

var n = 10;
function fn() {
    var n = 100;
    return function () {
        console.log(n);
    }
}
var f = fn();
f();
~function sum() {
    var n = 1000;
    f();
}();





//return一个函数,函数是引用数据类型的;所以相当于返回的是一个地址;





















































