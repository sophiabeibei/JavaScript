// 思考题:
// 1、时间字符串格式化
// var str = '2017-8-9 16:43:5';
// //->把这个字符串可以变为 'xxxx年xx月xx日 xx时xx分xx秒' / 'xx-xx xx:xx 08-09 16:43' ... 变为一切你想需要的格式

//===>李玲思想

// var str = '2017-8-9 16:43:5',
//     ary = [],
//     result = null;
// var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
// ary = reg.exec(str);
// for (var i = 2; i < ary.length; i++) {
//     if (ary[i].length < 2) ary[i] = '0' + ary[i];
// }
// result = ary[1] + '年' + ary[2] + '月' + ary[3] + '日 ' + ary[4] + '时' + ary[5] + '分' + ary[6] + '秒';
// console.log(result);

//===>赵盈盈思想
//->按照指定的分隔符,把字符串中的数字都拆成数组的每一项
/*var str = '2017-8-9 16:43:5';
 str = str.split(/(-| +|:|\/)/g);
 console.log(str);
 var ary = [];
 var reg = /\d+/g;
 for (var i = 0; i < str.length; i++) {
 if (reg.test(str[i])) {
 ary.push(str[i]);
 }
 }
 console.log(ary);*/
// var str = '2017-8-9 16:43:5',
//     ary = str.split(/(?:-| +|:|\/)/g);
// // console.log(ary);//->["2017", "8", "9", "16", "43", "5"]
//
// var str1 = '{0}年{1}月{2}日 {3}时{4}分{5}秒';
// // {0} -> ary[0]
// // {1} -> ary[1]
// // ...
// // {n} -> ary[n]
// str1 = str1.replace(/\{(\d+)\}/g, function () {
//     //console.log(arguments);
//     //->arguments[0]：本次大正则匹配的结果
//     //->arguments[1]：本次第一个小分组匹配的结果(数字)
//     var index = arguments[1],
//         value = ary[index] || 0;
//     return value.length < 2 ? '0' + value : value;
// });
// console.log(str1);

//==>周啸天思想

// String.prototype.myFormatTime = function myFormatTime(template) {
//     //->this:str 我们需要格式化时间的字符串
//     var ary = this.match(/\d+/g),
//         result = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
//     result = result.replace(/\{(\d+)\}/g, function () {
//         var index = arguments[1],
//             value = ary[index] || '0';
//         return value.length < 2 ? '0' + value : value;
//     });
//     return result;
// };
// var str = '2017-8-9';
// console.log(str.myFormatTime());
// console.log(str.myFormatTime('{1}-{2} {3}:{4}'));
// console.log(str.myFormatTime('{0}年{1}月{2}日'));

//==>王天明思想(字符串拆分)

// var str = '2017-8-9 17:20:5';
// var firstSplit = str.split(' ');
// var secSplit = firstSplit[0].split('-');
// var thiSplit = firstSplit[1].split(':');
// console.log(secSplit[0] + '年' + addZero(secSplit[1]) + '月' + addZero(secSplit[2]) + '日 ' + addZero(thiSplit[0]) + '时' + addZero(thiSplit[1]) + '分' + addZero(thiSplit[2]) + '秒');
//
// function addZero(number) {
//     return number < 10 ? '0' + number : number;
// }

//==>转换为标准的时间格式数据

// function addZero(number) {
//     return number < 10 ? '0' + number : number;
// }
// var str = '2017-8-9 16:43:5',
//     time = new Date(str.replace(/-/g, '/'));//->IE下只能支持xxxx/xx/xx这种日期格式
// var year = time.getFullYear(),
//     month = addZero(time.getMonth() + 1),//->0~11 代表 1~12月
//     day = addZero(time.getDate()),
//     hours = addZero(time.getHours()),
//     minutes = addZero(time.getMinutes()),
//     seconds = addZero(time.getSeconds());
// console.log(`${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`);//->ES6模板字符串代替传统的字符串拼接






