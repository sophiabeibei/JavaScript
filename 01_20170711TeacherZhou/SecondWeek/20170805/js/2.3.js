obj = {name: "obj",fn: fn};
var ary = [12,23];
function fn(num1,num2){
    console.log(this,num1,num2);
}
fn.bind(obj,1,20);

/*
* bind方法总结
*   1.语法: [函数].bind([context],[para1,para2...])
*       语法上和call一模一样
*   2.作用:
*       提前把函数中的this修改为第一个参数的值,但是和apply的区别在于,此时的函数并没有执行;也就是说,bind只是提前修改this的指向,我们把这种预先处理的思想,称之为"柯里化函数思想";
*       fn.apply(ary);//->[12, 23]
*       fn.apply(obj);//->Object {name: "obj", fn: function}
*       fn.apply();//->不写,this: window
*       fn.apply(null,[12]);//->this: window
*       fn.apply(undefined,[12,23]);//->this: window
* */



window.setInterval(fn.call(obj,100), 1000);
    //->



    //1s: this ->window   num->undefined























fn();//->this: window
obj.fn();//->this: obj     Object {name: "obj", fn: function}

//->让fn执行,并且让里面的this变为ary
fn.call(ary);//->[12, 23]
fn.call(obj);//->Object {name: "obj", fn: function}
fn.call();//->不写,this: window
fn.call(null);//->window
fn.call(undefined,[12,23]);//->this: window
fn.apply([100,200]);//->this: [100,200]  num1 = undefined    num2 = undefined












