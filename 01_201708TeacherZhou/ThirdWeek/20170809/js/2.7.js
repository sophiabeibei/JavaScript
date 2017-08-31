//需求: 所有单词的首字母大写
var str = "hello,my name is tom, i am 25 years old,i come from mars!";
str = str.replace(/\b([a-z])[a-z]*\b/ig, function () {
    var ary = arguments;

    return ary[1].toUpperCase() + ary[0].substr(1);
});
console.log(str);






