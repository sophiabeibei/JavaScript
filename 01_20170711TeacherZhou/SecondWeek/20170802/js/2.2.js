    //1.改变this
    //2.把它执行
    /*Function.prototype.call = function call(context) {
        //->this: fn[当前我们需要操作的函数,也就是Function类的实例]
        //->要做两件事
            //1.把函数中的this改为第一个参数值(理解为把this中的this关键字改变为context的值);
            //2.把函数执行(把this执行)
                //this();


    };*/

    //题---------------------------------------------------------------
    function fn1() {console.log(1); console.log(this) ;console.log(fn1.call.call.call)}
    function fn2() {console.log(2);}
    fn1.call(fn2);//->call执行的时候,把fn1中的this变为fn2,让fn1执行  =>1
    fn1.call.call.call.call(fn2);//->call执行的时候,把"fn1.call.call.call."中的this变为fn2,然后让"fn1.call.call.call."执行;
    //->"fn1.call.call.call." 就是function call() { [native code] };
    //->把call执行,让call中的this变为fn2,根据call的实现源码分析得到,我们其实就是让fn2执行  ->2;
    Function.prototype.call(fn1);
    Function.prototype.call.call.call.call(fn1);//->无论有多少个call,括号里是谁,就让谁执行;(最后一个call前面的一串call是call方法本身)
    //->call方法本身: 就是function call() { [native code] }
    //call方法本身的源码 ->就是function call() { [native code] }的源码如下:
    //Function原型上的 call方法源码:
    Function.prototype.call = function (context) {
        //->this: fn1
        //->context: 1
        //1.把fn中的this变为1
        //->把this中的关键字变为this   变字符串,再替换,
        var _this = this;
        _this = eval(this.toString().replace(/this/g,context));

        //2.把fn执行
        _this();
    };





    //fn1.call.call.call是function call() { [native code] }本身





//eval把js代码变成js表达式

















