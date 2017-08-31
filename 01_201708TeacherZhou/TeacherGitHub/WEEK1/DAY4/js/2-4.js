// window.fn=函数地址
// window.fn=13;
// 不管是函数名还是变量名，其实都是一样的，都可以叫做变量名，如果名字一样了，也算是重复的

//->在变量提升的阶段,如果当前的这个名字已经被声明过了,没必要在重复声明,只需要给它赋值定义即可
//------------------------------
/*
 * 变量提升
 *  fn = xxxfff111
 *     = xxxfff222
 */
// fn();//->2
// function fn() {console.log(1);}
// fn();//->2
// var fn=13;//->fn=13
// fn();//->13():Uncaught TypeError: fn is not a function
// function fn() {console.log(2);}
// fn();
// var fn=function(){console.log(3);}
// fn();