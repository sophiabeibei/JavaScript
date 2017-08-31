
var ary = [12,23,24,25,35,14,16];
/*
* 借用Math.max方法,利用apply传参是一个数组的原理,实现获取数组中的最大值;
* */
var max = Math.max.apply(null,ary);//->apply: 虽然写的时候传递的是一个数组,但是也相当于在给Math.max方法一个个传递参数;此处不需要操作this,所以this改为谁都无所谓;
var min = Math.min.apply(null, ary);
console.log(max, min);//


//->如果以后面试的时候,求数组中的最大值: 先不要写这个方法;  想问的是排序法和假设法
//再问,如果不用sort,还有什么方法? 可以答插入和冒泡
//->写个排序,再写个Math.max和apply这个方法;


















































