//->重写SLICE,实现数组克隆即可
Array.prototype.slice = function slice() {
    //->this:ary
    var aryNew = [];
    for (var i = 0; i < this.length; i++) {
        aryNew.push(this[i]);
    }

    //->arguments克隆成为数组
    var ary = [];
    for (var i = 0; i < arguments.length; i++) {
        ary.push(arguments[i]);
    }

    //=>通过对比，我们发现，我们实现的把ARG变为数组的代码和内置的SLICE克隆代码很相近(ARG的结构和数组一样)，唯一的区别是，内置SLICE用的是THIS，我们用的是ARG
    //=>> 如果我们能把内置的SLICE方法执行，并且让方法中的THIS变为我们的ARG，那么这样不就相当于把我们的ARG克隆成为一个新数组，这样不需要我们自己的辛辛苦苦写循环了
    //=>>> 我们的这种思想是：借用数组原型上的方法，方法执行的时候让THIS变为类数组，实现将类数组转换为数组

    return aryNew;
};
var ary = [12, 23, 34];
var newAry = ary.slice();