//=>快速创建12个FN,每个FN中输出对应的数字
for (var i = 1; i <= 12; i++) {
    eval('function fn' + i + '(){console.log(' + i + ')}');
}
function fn13(e) {
    console.log(13, this, e);
}

document.body.attachEvent('onclick', fn1);
document.body.attachEvent('onclick', fn1);
document.body.attachEvent('onclick', fn1);
document.body.attachEvent('onclick', fn2);
document.body.attachEvent('onclick', fn3);
document.body.attachEvent('onclick', fn4);
document.body.attachEvent('onclick', fn5);
document.body.attachEvent('onclick', fn6);
document.body.attachEvent('onclick', fn7);
document.body.attachEvent('onclick', fn8);
document.body.attachEvent('onclick', fn9);
document.body.attachEvent('onclick', fn10);
document.body.attachEvent('onclick', fn11);
document.body.attachEvent('onclick', fn12);
document.body.attachEvent('onclick', fn13);

//=>标准浏览器
//1、如果我们绑定的方法重复了，浏览器不会把重复的方法添加到事件池中（自我去重的机制）
//2、执行的顺序是按照绑定的顺序（事件池中方法排列的顺序：标准浏览器中会把后面绑定的方法放在事件池的末尾）依次执行的
//3、执行事件池中绑定的方法，方法中的THIS是当前操作的元素；会给方法传递事件对象进来；

//=>IE6~8低版本浏览器
//1、浏览器不会自动去重，如果我们给当前元素的某个行为绑定多个重复的方法，那么绑定的所有重复方法都会被执行（在向事件池中存储方法的时候，低版本浏览器没有检测是否重复，所以导致这个结果）
//2、而且低版本浏览器中在绑定的方法过多的时候，不知道是由于向事件池中增加的时候顺序混乱了，还是执行的时候顺序混乱了，总之执行的顺序和绑定的顺序是没关系的
//3、执行方法的时候，方法中的THIS是WINDOW而不是当前元素；事件对象也传递进来了，但是传递进来的值和window.event一样（和标准浏览器中的事件对象是有区别的）