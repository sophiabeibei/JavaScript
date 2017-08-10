var str = 'my name is {0}，i am {1} years old，i can {2}。';
var ary = ['zxt', 28, 'js'];
str = str.replace(/\{(\d+)\}/g, function () {
    //->arguments[0]:本次大正则捕获的内容
    //->arguments[1]:本次第一个小分组捕获的内容
    return ary[arguments[1]]
});
console.log(str);