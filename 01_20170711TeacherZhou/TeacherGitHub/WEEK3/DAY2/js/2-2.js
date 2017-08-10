var str = 'zhu2017feng2018pei2019xun2020';
var reg = /\d+/g;
str = str.replace(reg, function () {
    //console.log('ok');//->'ok'*4
    //=>正则匹配了四次,我们传递的函数也执行了四次

    //console.log(arguments);
    //->第一次 ['2017'...]
    //->第二次 ['2018'...]
    //->第三次 ['2019'...]
    //->第四次 ['2020'...]
    // arguments[0] ->当前本次大正则捕获的内容
    //=>每当执行这个方法的时候，浏览器都会把使用exec捕获到的结果作为实参传递给这个函数

    return '@';
});
console.log(str);//->'zhu@feng@pei@xun@' 函数中返回的是啥,当前大正则匹配的那个字符串,就被替换成啥了
