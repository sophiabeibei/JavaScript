
    //Function原型上的 call方法源码:
    Function.prototype.call = function (context) {
        //->this: fn
        //->context: 1
        //1.把fn中的this变为1
        //->把this中的关键字变为this   变字符串,再替换,
        var _this = this;
        _this = eval(this.toString().replace(/this/g,context));

        //2.把fn执行
        _this();
    };


    //function的原型是一个匿名空函数       Function.prototype是一个匿名函数(anonymous),它是函数数据类型的,不是对象类型的(但是操作起来和其它类的原型一模一样)












































