//->闭包: 避免全局变量的污染


/*//->A
var num = 12;
function fn() {
    num++;
    console.log(num);
}
fn();

//->B
var num = 130;

//->A
fn();*/


//->A

/*var obj =function () {
    var num = 12;
    function fn() {
        num++;
        console.log(num);
    }
    fn();
    return {
        fn: fn
    };//->使用return把在外面需要的返回,外面设置一个变量接收即可,这样在外面就可以使用里面的东西了;为什么返回一个对象: 对象中可以存储很多的信息,我们可以把很多东西都返回给外面用,如果只是return,只能返回一次,只能给外面用一个东西,太单一了;
}();

//->B
~function() {
    var num = 130;
}();

//->A
fn();//fn是私有的函数,
obj.fn();
obj.fn();*/

~function () {
    var num = 12;
    function fn() {
        num++;
        console.log(num);
    }
    fn();
    window.fn = fn;//->给window增加属性,可以在函数外面使用函数里面的内容
}();

//->B
~function() {
    var num = 130;
}();

//->A
fn();//fn是私有的函数,
fn();








//变量提升
//函数的声明周期
//闭包
//作用域链

//函数的释放与不释放



























