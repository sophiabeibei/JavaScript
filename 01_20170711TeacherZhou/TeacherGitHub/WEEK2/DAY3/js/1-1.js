var allTagList = document.getElementsByTagName('*');//->*通配符：获取当前页面中所有的元素标签
var ary = Array.prototype.slice.call(allTagList);
console.log(ary instanceof Array, ary);

function fn() {
    console.log([].slice.call(arguments));
}
fn(12, 2, 33);