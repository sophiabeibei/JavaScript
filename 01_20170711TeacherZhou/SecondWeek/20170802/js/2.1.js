var obj = {
    total : 0

};

function sum(num1, num2) {
    this.total = num1 + num2;
}
sum(10,20);//->this: window    =>window.total = 30
    //obj(10,20);//Uncaught TypeError: obj is not a function =>OBJ不具备sum这个属性,所以不可以通过这种方式把方法中的this修改为obj;
    //->sum.call: sum这个实例通过原型链的查找机制,找到Function.prototype的call方法;
    //->sum.call(): 把找到的方法执行(执行的是call这个方法)

    //->call的作用:
        //->1.把需要操作函数中的this变为第一个实参的值;
            //[非严格模式下]
                //第一个实参为空或者写null或者undefined,this都是window,剩下的第一个实参是谁,this就是谁;
            //[严格模式下]
                //第一个实参为空,this是undefined,其余的写谁this就是谁;
        //->2.改变为this后,把需要操作的元素执行即可;

//----以上20170802 上午的课程-------------------------------------------------------





























