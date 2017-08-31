var n = 10;
function fn() {
    var n = 100;
    return function () {
        console.log(n);
    }
}
var f = fn();
f();

~function () {
    var n = 1000;
    f();
}();