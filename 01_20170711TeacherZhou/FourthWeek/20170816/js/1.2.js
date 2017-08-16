//->定时器返回值:
//->定时器的返回值是是一个数字(从数字1开始,到(1+),代表当前定时器是页面中的第几个定时器;(按照去银行办业务领取的排队号理解)

var timer1 = setInterval(function () {
    console.log("Ok");
},10000);

var timer2 = setTimeout(function () {
    console.log("No");
},20000);


//->清除定时器:
//->clearInterval/clearTimeout([NUM]): 通过定时器的排队号清除指定的定时器,而且不管用哪个定时器设置的,任意一个清除方法,只要把排队号指定好,都可以把定时器清除掉,比如: 用setInterval设置的的定时器,使用clearTimeout也可以把其清除掉(不推荐这样用);





















