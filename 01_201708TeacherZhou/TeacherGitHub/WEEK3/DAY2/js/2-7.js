var str = 'hello，my name is tom，i am 25 years old，i com from mars！';
str = str.replace(/\b([a-z])[a-z]*\b/ig, function () {
    var arg = arguments;
    return arg[1].toUpperCase() + arg[0].substr(1);
});
console.log(str);
