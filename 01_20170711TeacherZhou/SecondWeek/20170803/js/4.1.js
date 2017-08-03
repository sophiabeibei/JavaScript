var ary = [12,23,14,25,23];
ary.sort(function (a, b) {
    //console.log(a, b);
    //->a: 当前项
    //->b: 后一项
    //return a - b;//->return的结果大于零,交换位置;结果不大于零,不交换位置;
    return 1;//->RETURN后面不一定非要写a-b,它的原理是: 如果返回的是一个大于零的数,当前项后一项交换位置,如果是小雨等于零的值,不做任何处理;
});
console.log(ary);

















































