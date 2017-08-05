var ary = [12, 23, 14, 25, 23];
ary.sort(function (a, b) {
    //console.log(a, b);
    //->a:当前项
    //->b:后一项
    return 1;//->RETURN后面不一定非要写A-B,它的原理是:如果返回的是一个大于零的数,当前项后一项交换位置,如果是小于等于零的值,不做任何的处理
});
// console.log(ary);