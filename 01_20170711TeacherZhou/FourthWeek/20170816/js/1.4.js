

//---------------------------------------------------------------定时器setInterval和定时器setTimeout的区别

//=======================================setInterval案例:
// //->案例: 定时器的计数功能
// var n = 0;
// var timer = setInterval(function () {
//     n++;
//     console.log(n);
//     if(n>=5){
//         clearInterval(timer);
//     }
// },1000);


// //->案例: 刚开始进来就输入1
// //打印1  2  3  4  5
// var n = 0;
// function fn() {
//         n++;
//         console.log(n);
//         if(n>=5){
//             clearInterval(timer);
//         }
// }
// fn();
// var timer = setInterval(fn,1000);


// //->用setTimeout实现上述功能: 不成功;
// var n = 0;
// function fn() {
//     n++;
//     console.log(n);
//     if(n>=5){
//         clearInterval(timer);
//     }
// }
// fn();
// var timer = setTimeout(fn,1000);//->setTimeout只能执行一次  打印1  2;


//============================================setTimeout案例: setTimeout 模拟出setInterval的效果方法: 递归实现需求
// //->递归: 函数执行的时候,再调用自己执行;
// var n = 0,
//     timer = null;
// function fn() {
//     n++;
//     console.log(n);
//     if(n>=5){
//         clearInterval(timer);
//         return;
//     }
//     //->arguments.callee: 当前函数本身(JS严格模式下不允许使用,所以真正项目中我们基本不使用这个属性)
//     //timer = setTimeout(arguments.callee,1000);//->arguments.callee和fn一样;但别试用;因为arguments.callee在严格模式下不兼容,不允许使用;
//
//     timer = setTimeout(fn,1000);//->每隔1s钟,执行fn,这叫递归;   arguments.callee和fn一样;但别试用;因为arguments.callee在严格模式下不兼容,不允许使用;
// }
// fn();
// //->总结: 想实现这个需求,还是用setInterval简单;setTimeout在这个案例中,麻烦;
// //->总结: 在这个案例中,设置了4个定时器;条件判断中(n>=5)大于等于5的时候,就return不创建了;


//============================================setTimeout案例: 解决定时器占内存的问题
// //->解决定时器占内存的问题,提高性能
// var n = 0,
//     timer = null;
// function fn() {
//     //->执行fn的时候,上一次常见的那个定时器已经没用了,为了节约内存的性能,我们最好把没有的这个没用的定时器给清除掉;
//     clearTimeout(timer);//->清除上一次设置的定时器
//     //->第一次执行fn,timer是null,清除null没用,也不会报错;什么也不清除;
//     //->第一次执行fn之后,设置了定时器,第二次执行fn,先清除第一次设置的定时器...
//     //->第二次执行fn之后,又设置了定时器,第三次执行fn,又清除第二次设置的定时器...
//     //->第三次执行fn之后,又设置了定时器,第四次执行fn,又清除第三次设置的定时器...
//     //->第四次执行fn之后,又设置了定时器,第五次执行fn,又清除第四次设置的定时器...所以,在if条件判断中,不用再清除定时器;
//     n++;
//     console.log(n);
//     if (n >= 5) {
//         //->所以,在if条件判断中,不用再清除定时器;'
//         return;
//     }
//     //->设置定时器
//     timer = setTimeout(fn, 1000);
// }
// fn();


