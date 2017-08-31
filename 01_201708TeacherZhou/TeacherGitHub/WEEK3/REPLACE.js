// var str = '  zhufeng    ';
// str = str.replace(/^ +| +$/g, '');
// console.log(str);

// var str = 'zhufeng2017zhufeng2018';
// // str = str.replace('zhufeng', 'zhufengpeixun');
// // str = str.replace('zhufeng', 'zhufengpeixun');
// str = str.replace(/zhufeng/g, 'zhufengpeixun');
// console.log(str);

// var str = 'zhufeng2017zhufeng2018';
// //->当REPLACE的第一项是个正则,第二项是个函数的时候,正则能在处理的字符串中匹配捕获几次,我们的函数就会被触发执行几次
// str = str.replace(/zhufeng/g, function () {
//     //->不仅仅会把函数执行,而且把每一次捕获的内容作为实参传递给当前函数,在函数的ARG(ARGUMENTS)中我们可以获取到 =>传递的内容和执行EXEC捕获的内容非常的相似
//
//     return '@';//->在函数中返回的是啥,相当于把正则本次捕获的结果替换成啥
// });
// console.log(str);

//--------------------------------------
//=>把所有单词的首字母大写
// var str = 'my name is zhou xiao tian，i am 28 years old!';
// var reg = /\b[a-zA-Z]+\b/g; =>处理不了‘-’
// var reg = /(^| )[a-zA-Z]+( |$)/g; =>需要把之前字符串中的一个空格替换成两个
// str = str.replace(/ /g, '  ');
// var reg = /(?:^| )([a-zA-Z]+)(?: |$)/g;
// str = str.replace(reg, function () {
//     console.log(arguments[1]);//->每一次捕获的时候,第一个小分组单独捕获的内容(所有加上了?:的分组,不在分组序号计算之内)
// });

// var reg = /[a-z]+/ig;
// str = str.replace(reg, function (res) {
//     //->arguments[0]:当前本次正则捕获的结果 <=> 形参RES存储的也是这个东西
//     var a = res.substr(0, 1).toUpperCase();//->第一个字母大写
//     var b = res.substr(1);//->除了第一个以外的其余字母
//     return a + b;
// });
// console.log(str);

// var reg = /([a-z])([a-z]*)/ig;
// str = str.replace(reg, function (bigVal, firVal, twoVal) {
//     //->bigVal:arguments[0]
//     //->firVal:arguments[1]
//     //...
//     return firVal.toUpperCase() + twoVal;
// });
// console.log(str);

//-----------------------------------------
// var str = 'my name is {0},i am {1} years old,i can {2}';
// var ary = ['TOM', 25, 'JS'];
// //=>{0} : ATY[0] TOM
// //=>{1} : ARY[1] 25
// //...
// str = str.replace(/\{(\d+)\}/g, function (val, fir) {
//     return ary[fir];
// });
// console.log(str);

//------------------------------------------
//=>时间字符串格式化：在一个时间字符串中获取到具体的日期,然后拼凑成我们所需要的时间格式
// var str = '2017/8/13 20:11:5';//=>'2017年08月13日 20时11分05秒'、'08-13 20:11'...
//
// //->获取到需要的数字,存储在一个数组中
// // console.log('2017-8-13 20:11:5'.split(/(?:-|\s+|:|\/)/g)); =>可以实现,但是不好的地方是以后自付串中的分隔符变了,正则也要跟着改一下
// var ary = str.match(/\d+/g);
//
// //->设定一个我们自己需要展示的模板,按照模板字符串渲染的原理把最后的结果输出
// var template = '{0}年{1}月{2}日 {3}时{4}分{5}秒';
// template = template.replace(/\{(\d+)\}/g, function () {
//     var index = arguments[1],
//         val = ary[index] || 0;//->通过索引到数组中获取到对应的内容,如果没有对应的内容,让其默认值为零
//     return val < 10 ? '0' + val : val;//->如果VAL不足十位,我们在前面补零
// });
// console.log(template);

String.prototype.myFormatTime = function myFormatTime(template) {
    //->this:str
    var ary = this.match(/\d+/g);
    template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
    template = template.replace(/\{(\d+)\}/g, function () {
        var val = ary[arguments[1]] || 0;
        return val.length < 2 ? '0' + val : val;
    });
    return template;
};

var str = '2017/8/13 00:12:13';
console.log(str.myFormatTime());
console.log(str.myFormatTime('{1}-{2} {3}:{4}'));
console.log(str.myFormatTime('{0}年{1}月{2}日'));