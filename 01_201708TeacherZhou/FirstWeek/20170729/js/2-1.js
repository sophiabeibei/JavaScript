//->var a = 5; var b = 6; var c = 7;(每一个都带VAR)
// var a = 5,
//     b = 6,
//     c = 7;
//->var a = 5;  var b = 6;   var c = 7;(B/C是不带VAR的)
//->var a = b=c=10;
//------------------------------------------------------------------
console.log((a, b, c));
var a = 5,
    b = 6,
    c = 7;
console.log((a, b, c));
function fn(a) {
    console.log((a, b, c));
    a = 12;
    var b = 13;
    c = 14;
    console.log((a, b, c));
}
c = fn(11);//->把FN
console.log((a, b, c));




















