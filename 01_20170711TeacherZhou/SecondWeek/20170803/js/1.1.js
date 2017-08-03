var allTagList = document.getElementsByName("*");
//->* 通配符: 获取当前页面中所有的元素标签
// var ary = [].slice();
var ary = Array.prototype.slice(allTagList);
console.log(ary instanceof Array, ary);

















































