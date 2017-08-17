/*
 * 定时器可以分为两个阶段
 * 1、设置一个定时器(setInterval/setTimeout),然后再设置一个等待时间(interval时间因子),接下来等待即可
 *
 * 2、当到达等待的时间后,执行定时器规划的任务(设置定时器,第一个参数传递的函数就是我们规划的任务)
 */
var obj = {name: 'zhufeng'};
// setInterval(function () {
//     //->this：window
// }, 1000);

// setInterval(function () {
//     //->this：obj
//     console.log(this);
// }.call(obj), 1000);//->设置定时器的时候,就把函数执行了(虽然改变了函数中的HIS),把函数执行的返回值(UNDEFINED)设置为定时器的第一个参数,1000MS后执行的是UNDEFINED  <=> setInterval(undefined,1000) 定时器到达时间执行undefined并没有报错,因为定时器本身屏蔽掉了错误

// setInterval(function () {
//     //->this：obj
//     console.log(this);
// }.bind(obj), 1000);//->bind：预先把函数中的THIS修改为OBJ,当定时器到达指定的时间后,执行这个函数,THIS也就是OBJ了 (IE6~8下不兼容)


//->setTimeout:到达指定时间执行一次函数,执行完成后,当前的定时器就没用了
//->setInterval:到达指定的时间先把函数执行一次,但是此时定时器并没有失去它的作用,以后每间隔这么长的时间,当前的函数都会重新执行一次,除非手动清除当前的定时器
// setTimeout(function () {
//     //->this:window
//     console.log(this);
// }, 1000);














