var obj = {name: 'obj'};
function fn(num) {
    console.log(this, num);
}

// window.setInterval(fn, 1000);//->1S:this->window  num->undefined

// window.setInterval(fn.call(obj, 100), 1000);//->创建定时器的时候就把函数执行了,当1S后,定时器执行的是函数的返回值(undefined)

// window.setInterval(fn.bind(obj, 100), 1000);//->1S:this->obj  num->100

// document.body.onclick = fn;//->this:document.body
// document.body.onclick = fn.call(obj);//->document.body.onclick=undefined
// document.body.onclick = fn.bind(obj);//->this:document.obj

/*
 * BIND方法总结
 *  ->语法: [函数].bind([context],para1,para2...) 语法上和CALL一模一样(IE6~8下不兼容)
 *
 *  ->作用:
 *   提前把函数中的THIS修改为第一个实参的值，但是和CALL以及APPLY的区别在于，此时的函数并没有执行；也就是说，BIND只是提前修改THIS的指向，我们把这种预先处理的思想，称之为“柯理化函数思想”
 */