    var obj = {
        total : 0

    };

    function sum(num1, num2) {
        this.total = num1 + num2;
    }
    sum(10,20);//->this: window    =>window.total = 30
        /*
        * obj(10,20);//Uncaught TypeError: obj is not a function =>OBJ不具备sum这个属性,所以不可以通过这种方式把方法中的this修改为obj;
        * sum.call: sum这个实例通过原型链的查找机制,找到Function.prototype的call方法;
        * sum.call(): 把找到的方法执行(执行的是call这个方法)
        * call的作用:
        *    1.把需要操作函数中的this变为第一个实参的值;
        *       [非严格模式下]
        *           第一个实参为空或者写null或者undefined,this都是window,剩下的第一个实参是谁,this就是谁;
        *       [严格模式下]
        *           第一个实参为空,this是undefined,其余的写谁this就是谁;
        *    2.改变为this后,把需要操作的元素执行即可;
        *
        * */
    //----以上20170802 上午的课程-------------------------------------------------------
    sum.call(obj, 10,20);//->call执行的时候,首先让sum中的this变为obj,然后执行sum,把10和20传给call

    //非严格模式下:
    sum.call();//->this: window          严格模式下this: undefined
    sum.call(null);//->this: window             严格模式下this: null
    sum.call(undefined);//->this: window     严格模式下: undefined
    sum.call(1);//->this: Number(1)


    /*
    * apply: 它的语法等同于call,唯一的区别在于apply在给操作的函数传递实参的时候,不是一个个传递的,而是放在一个数组中一起传递的(但是也相当于在一个个的传参)
    *
    *
    * */

    sum.call(obj,10,20);//->一个个传
    sum.apply(obj,[10,20]);//->传俩参数


    /*
    * bind: 它的语法和call的语法是一样,但是作用不一样,比call少做一件事;call是改完this之后直接执行;bind只是改变了this;
    *   //->bind只是提前把函数中的this改变了,但是并没有立即把函数执行,它属于预先改变this(柯里化函数思想);
    *
    * */
    var obj2 = {name: "张三"};
    function fn() {

    }
    //window.setInterval(fn,1000);//->每隔一秒执行一次fn
    //window.setInterval(fn(),1000);//->创建一个定时器,每隔1s钟执行的是fn执行的返回结果=>undefined;
    //window.setInterval(fn.call(obj2),1000);//->创建定时器的时候,就把fn执行了,虽然改变了this,但是1s后执行的是fn的返回结果;
    //window.setInterval(fn.bind(obj2),1000);//->创建定时器的时候,提前把fn中的this设置为obj2,1s后执行的是fn;
    //定时器里应该放的是一个方法,不是方法执行后的结果;




























