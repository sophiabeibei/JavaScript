// //---------------------------------------------------replace: 实现替换  (replace兼容)  replace重写(为了了解原理)
//
// var str = "my name is {0}, i am {1} years old, i will succeed in ths end";
// var ary =["tom",20];
// str = str.replace(/\{(\d+)\}/g, function () {
//     /*
//     * 1.首先拿正则去字符串中进行匹配捕获,匹配一次就会把当前的回调函数执行一次;
//     * 2.而且会把当前捕获的结果传递给回调函数: 大正则捕获的内容,小分组捕获的内容,匹配查找开始字符的索引位置,原始操作的字符串...(和执行exec的结果相同);
//     * 3.回到函数中如果加一个返回值,返回的是啥,相当于把原始字符串中匹配的结果替换成啥;
//     * */
// });


// //---------------------------------------------------replace 第一个必须传正则,第二个必须加g---源码
//
// var str = "my name is {0}, i am {1} years old, i will succeed in ths end";
// var ary =["tom",20];
// String.prototype.myReplace = function myReplace() {
//     //->假设传递的i第一个参数是一个正则(并且正则已经加g);
//     //->第二个参数就是一个函数;
//     //->myReplace中的this: str(这是需要处理的字符串)
//     var reg = arguments[0],
//         callBack = arguments[1],
//         _this = this;
//     var result = reg.exec(_this);
//     //->如果result存在,继续捕获,一直到捕获不到,直到null
//     while (result){
//         var strIn = result.index;//->起始索引
//         var endIn = strIn + result[0].length;//->结束索引
//         //--------------------------------
//         //->每次捕获到结果后,都需要把回调函数执行;回调函数是callBack;
//         //callBack();
//         //--------------------------------
//         //callBack.apply(undefined,result);//->这样只能是把索引是数字的那些项的值分别的传递给callBack,对于index和input这些我们无法传递给回调函数;
//         var returnVal = callBack.apply(undefined,[].concat(result,strIn,this));//->result中的第一项result[0]: 是大正则捕获的结果;
//         //->result.index: 大正则捕获的索引;
//         //->result.input: 要处理的原始字符串
//         //->实现替换: 先从字符串开始截取到result.index,再从结束字符索引的下一个截取到字符串的末尾,用第一部分截取的内容加上return返回的结果(returnVal)+第二部分截取的内容,就相当于把大正则捕获的这部分替换为返回的结果了;
//         //=>得到结果: 大正则捕获结果结束字符的索引: result.index+result[0].length-1;
//
//         _this = this.substring(0,strIn)+returnVal+_this.substr(endIn);
//         result = reg.exec(_this);
//
//         //result = reg.exec(this);//->returnVal: 回调函数执行的返回结果,我们要把这个结果替换原始字符串中大正则捕获的内容;
//     }
//     return _this;
// };
// str.myReplace(/\{(\d+)\}/g,function () {
//     // console.log(arguments);
//     return "@";
// });
// str.myReplace();


//---------------------------------------------------replace 第一个必须传正则,第二个必须加g---裸码

var str = "my name is {0}, i am {1} years old, i will succeed in ths end";
var ary = ["tom", 20];
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
str.myReplace(/\{(\d+)\}/g, function () {
    return "@";
});


//有问题;没打印出来;
