Function.prototype.call = function (context) {
    //->this:fn2
    //->context:1
    //1、把fn中的“this关键字字符”变为1
    var _this = this;
    _this = eval(this.toString().replace(/this/g, context));

    //2、把fn执行
    _this();
};