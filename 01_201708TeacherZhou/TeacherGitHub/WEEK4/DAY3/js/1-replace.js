var str = 'my name is {0}，i am {1} years old，I will succeed in the end！';
var ary = ['TOM', 20];

// str = str.replace(/\{(\d+)\}/g, function () {
//     /*
//      * 1、首先拿正则去字符串中进行匹配捕获,匹配一次就会把当前的回调函数执行一次
//      * 2、而且会把当前捕获的结果传递给回调函数：大正则捕获的内容、小分组捕获的内容、匹配查找开始字符的索引位置、原始操作的字符串...(和执行EXEC的结果相同)
//      * 3、回调函数中如果加一个返回值,返回的是啥,相当于把原始字符串中匹配的结果替换成啥
//      */
// });

// String.prototype.myReplace = function myReplace() {
//     //->假设传递的第一个参数是一个正则(并且正则已经加G了)
//     //->第二个参数就是一个函数
//     //->THIS:需要处理的字符串STR
//     var reg = arguments[0],
//         callBack = arguments[1],
//         newStr = this;
//     var result = reg.exec(this);//->["{0}", "0", index: 11, input: "..."]
//     while (result) {
//         //->每一次捕获到结果后,都需要把回调函数执行
//         //callBack.apply(undefined, result);
//         //->这样只能是把索引是数字的那些项的值分别的传递给CALLBACK,对于INDEX和INPUT这些我们无法传递给回调函数
//         var returnVal = callBack.apply(undefined, [].concat(result, result.index, result.input));
//         //->returnVal:回调函数执行的返回结果,我们要把这个结果替换原始字符串中当前大正则捕获的内容
//         //=>result[0] 大正则捕获的结果
//         //=>result.index 当前大正则捕获开始字符的索引
//         //=>大正则捕获结果结束字符的索引：result.index+result[0].length-1
//         //=>实现替换:先从字符串开始截取到result.index，在从结束字符索引的下一个截取到字符串的末尾，用第一部分截取的内容+回调返回的结果(returnVal)+第二部分截取的内容，就相当于把大正则捕获的这部分替换为返回的结果了
//         var strIn = result.index,
//             endIn = strIn + result[0].length - 1;
//         newStr = newStr.substring(0, strIn) + returnVal + newStr.substr(endIn + 1);
//         result = reg.exec(newStr);
//     }
//     return newStr;
// };

String.prototype.myReplace = function myReplace() {
    var reg = arguments[0],
        callBack = arguments[1],
        _this = this;
    var result = reg.exec(_this);
    while (result) {
        var strIn = result.index,
            endIn = strIn + result[0].length;

        var returnVal = callBack.apply(undefined, [].concat(result, strIn, this));
        _this = _this.substring(0, strIn) + returnVal + _this.substr(endIn);
        result = reg.exec(_this);
    }
    return _this;
};

str = str.myReplace(/\{(\d+)\}/g, function () {
    return ary[arguments[1]];
});
console.log(str);








