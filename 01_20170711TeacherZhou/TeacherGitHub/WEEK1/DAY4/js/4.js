var submit = document.getElementById('submit'),
    countBox = document.getElementById('countBox');

// submit.onclick = function () {
//     /*
//      * 变量提升: var n;
//      */
//     var n = 0;
//     countBox.innerHTML = ++n;
//     /*
//      * 代码执行完成后：栈内存销毁
//      */
// };

//->利用了全局作用域不销毁的原理，把我们需要累加的值存储在全局变量中，每一次点击执行函数，在形成的私有作用域中，把全局变量的值进行累加，这样就可以实现我们的需求了
//=>弊端：如果都遵循这个思路,会导致全局变量过多(全局变量可能出现污染的问题),所以在某些正规的小团队中,是命令规定禁止使用全局变量的
// var n = 0;
// submit.onclick = function () {
//     countBox.innerHTML = ++n;
// };

//->给ONCLICK赋值的时候:形成一个不销毁的私有作用域(私有变量N也不销毁了)
//->ONCLICK=XXXFFF111
//->弊端：不利于性能优化
// submit.onclick = (function () {
//     var n = 0;
//     return function () {//->xxxfff111
//         countBox.innerHTML = ++n;
//     }
// })();

// ~function () {
//     var n = 0;
//     submit.onclick = function () {
//         countBox.innerHTML = ++n;
//     }
// }();

/*
 * 思路三：自定义属性
 *  把值存储在自定义属性上也可以实现保存的作用
 */
// submit.zhufengN = 0;
// submit.onclick = function () {
//     //->this:submit
//     countBox.innerHTML = ++this.zhufengN;
// };

/*
 * 思路四：利用innerHTML的设置内容的机制
 */
submit.onclick = function () {
    countBox.innerHTML++;
    //->countBox.innerHTML = parseInt(countBox.innerHTML) + 1;
};

//->思考题：回去后把反对的按钮也加上