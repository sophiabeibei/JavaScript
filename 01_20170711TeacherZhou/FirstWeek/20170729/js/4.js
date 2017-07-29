var submit = document.getElementById("submit"),
    countBox = document.getElementById("countBox");

//1.这样写,每次的n值都是从0开始;++n始终是1;
// submit.onclick = function () {
//     /*
//     * 变量提升: var n;
//     *
//     * */
//     var n = 0;
//     countBox.innerHTML = ++n;
//     /*
//     * 代码执行完成后: 栈内存销毁
//     * */
// };


/*思路一: 利用全局
 * 这样写,利用了全局作用域不销毁的原理,把我们需要累加的值存储在全局变量中;每次点击执行函数,在形成的私用作用域中,把全局变量的值进行累加,这样就可以实现我们的需求了;
 * ->弊端: 导致全局变量有很多很多,总有一天全局变量会冲突;所以在某些正规的小团队当中,是明令规定禁止使用全局变量的;
 */
var n = 0;
submit.onclick = function () {
    countBox.innerHTML = ++n;//->让全局作用域的n累加
};




//二.利用不销毁的私有作用域(弊端: 不利于性能优化)
//3.形成一个不销毁的私有作用域,这种机制叫闭包   (性能和功能 , 妥协功能)
//->给onclick赋值的时候: 形成一个不销毁的私有作用域(私有变量N也不销毁了)
submit.onclick = (function () {//=>onclick= return后面的function(){}  =xxxfff111
    var n = 0;
    return function () {//->xxxfff111
        countBox.innerHTML = ++n;
    }
})();


//4.形成一个不销毁的私有作用域,不一定有return;以下这样就是给submit增加了属性onclick;
~function(){
    var n = 0;
    submit.onclick = function () {//->被外面的submit.onclick占用,这个函数不被销毁;
        countBox.innerHTML = ++n;
    }
}();



/*思路三: 自定义属性(自定义属性思想在编程思想里,是最伟大的编程思想之一)
* 把值存储在自定义属性上也可以实现保存的作用
*
* */
submit.zhufengN = 0;
submit.onclick = function () {
    //->this: submit
     countBox.innerHTML = ++this.zhufengN;

};


/*思路四: 利用内置属性(利用innerHTML的设置的内容机制)
 * 注意一点: 别让成为字符串拼接;
 *
 * */
submit.onclick = function () {
    //->this: submit
    countBox.innerHTML++;
    //countBox.innerHTML = countBox.innerHTML +1;(但是这种方式是字符串拼接)
    //countBox.innerHTML = parseInt(countBox.innerHTML) +1;(转数字类型之后,可以使用)
};

//页面中有两个按钮,控制同一个元素的加与减;   +1   -1;









