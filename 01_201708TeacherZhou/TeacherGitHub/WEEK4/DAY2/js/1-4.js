//->需求：开始进来输出1，以后每隔1S钟都累加1，到5结束
// var n = 0;
// function fn() {
//     n++;
//     console.log(n);
//     if (n >= 5) {
//         clearInterval(timer);
//     }
// }
// fn();
// var timer = setInterval(fn, 1000);

//------
//->使用递归实现当前的需求:setTimeout模拟出setInterval的效果
//->递归：函数执行的时候,在调用自己执行
var n = 0,
    timer = null;
function fn() {
    //->执行FN的时候,上一次创建的那个定时器已经没用了,为了节约内存和性能,我们最好把没用的这个定时器给清除掉
    clearTimeout(timer);//->清除上一次设置的定时器

    console.log(++n);
    if (n >= 5) {
        return;
    }
    //->arguments.callee:当前函数本身(JS严格模式下不允许使用,所以真正项目中我们基本上不用这个属性)
    timer = setTimeout(fn, 1000);
}
fn();













