//->定时器的返回值是一个数字（1+），代表当前定时器是页面中的第几个定时器(可以按照去银行办业务领取的排队号理解)

//->clearInterval/clearTimeout([NUM])：通过定时器的排队号清除指定的定时器,而且不管是用哪个定时器设置的,任意一个清除方法,只要把排队号指定好,都可以把定时器清除掉,比如：用setInterval设置的定时器，使用clearTimeout也可以把其清除掉(不推荐这样用)

var timer1 = setInterval(function () {
    console.log('ok');
}, 10000);

var timer2 = setTimeout(function () {
    console.log('NO');
}, 20000);