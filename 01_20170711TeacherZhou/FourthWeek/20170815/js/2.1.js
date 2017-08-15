// 思考题:
// 1、时间字符串格式化
// var str = '2017-8-9 16:43:5';
// //->把这个字符串可以变为 'xxxx年xx月xx日 xx时xx分xx秒' / 'xx-xx xx:xx 08-09 16:43' ... 变为一切你想需要的格式


//-----------------------------------------------------------------
// //->1.方法一 李玲
// var str = '2017-8-9 16:43:5',
//     ary = [],
//     result = null;
// var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
//
// ary = reg.exec(str);
// for (var i = 0; i < ary.length; i++) {
//     if(ary[i].length<2){
//         ary[i] = "0" + ary[i]
//     }
// }
// result = ary[1]+"年"+ary[2]+"月"+ary[3]+"日"+ary[4]+"时"+ary[5]+"分"+ary[6]+"秒";
// console.log(result);

//------------------------------------------------------------------
// // 2.方式二 赵盈盈
// var str = '2017-8-9 16:43:5',
//     ary = [];
// ary = str.split(/(?:-| +|:|\/)/g);
// // var reg = /\d+/g;
// // for (var i = 0; i < str.length; i++) {
// //     if(reg.test(str[i])){
// //         ary.push(str[i]);
// //     }
// // }
// var str1 = "{0}年{1}月{2}日 {3}时{4}分{5}秒";
// str1 = str1.replace(/\{(\d+)\}/g, function () {
//     var index = arguments[1],
//         value = ary[index];
//     return value.length < 2 ? "0" + value : value;
// });
// console.log(str1);

//------------------------------------------------------------------
// // 3.方式三 周啸天
// String.prototype.myFormatTime = function myFormatTime(template) {
//     //->this: str 我们需要格式化时间的字符串
//     var ary = this.match(/\d+/g),
//         result = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
//     result = result.replace(/\{(\d+)\}/g,function(){
//         var index = arguments[1],
//             value = ary[index] || 0;
//         return value.length<2?"0"+value:value;
//     });
//     return result;
// };
//
// var str = '2017-8-9 16:43:5';
// console.log(str.myFormatTime());
// console.log(str.myFormatTime("{1}-{2} {3}:{4}"));
// console.log(str.myFormatTime("{0}年{1}月{2}日"));


//------------------------------------------------------------------
// // 4.方式四 王天明
// var str = '2017-8-9 16:43:5',
//     firstSplit = str.split(" "),
//     secSplit = firstSplit[0].split("-"),
//     thiSplit = firstSplit[1].split(":");
// function addZero(number) {
//     return number<10?"0"+number:number;
// }
// var result = secSplit[0] + '年' + addZero(secSplit[1]) + '月' + addZero(secSplit[2]) + '日 ' + addZero(thiSplit[0]) + '时' + addZero(thiSplit[1]) + '分' + addZero(thiSplit[2]) + '秒';
// console.log(result);


//------------------------------------------------------------------
// // 5.方式五 转换为标准的时间格式数据
// function addZero(number) {
//     return number<10?"0"+number:number;
// }
// var str = '2017-8-9 16:43:5',
//     time = new Date(str.replace(/-/g,"/"));//->IE下只能支持xxxx/xx/xx这种日期格式
// var year =  time.getFullYear(),
//     month =addZero(time.getMonth() + 1),
//     day = addZero(time.getDate()),
//     hours = addZero(time.getHours()),
//     minutes = addZero(time.getMinutes()),
//     seconds = addZero(time.getSeconds()),
//     result = year + '年' + month + '月' + day + '日 ' + hours + '时' + minutes + '分' + seconds + '秒';
// console.log(result);


//------------------------------------------------------------------
// // 6.方式六
// var str = '2017-8-9 16:43:5';
// var reg = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;
// str = str.replace(reg, '$1年$2月$3日 $4时$5分$6秒');
// console.log(str);


//------------------------------------------------------------------
// // 7.方式七
//  var str = '2017-8-9 16:43:5';
//  var reg = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;
// str = str.replace(reg, function (a, n1, n2, n3, n4, n5, n6) {
//     console.log(arguments); //["2017-8-9 16:43:5", "2017", "8", "9", "16", "43", "5", 0, "2017-8-9 16:43:5", callee: ƒ, Symbol(Symbol.iterator): ƒ]
//    return n1 + '年' + n2 + '月' + n3 + '日 ' + n4 + '时' + n5 + '分' + n6 + '秒'
// });
// console.log(str);

//------------------------------------------------------------------
// // 8.方式八
// var time = ['年', '月', '日', '时', '分', '秒'];
// var n = 0; // 记录索引
// var reg = /(\d+)[:-]?/g;
// var str = '2017-8-9 16:43:05';
// str = str.replace(reg, function (a, b) {
//    // 2018- 2018
//    //  console.log(b + time[n++]); // 2018 + time[0] 2018年
//    return b + time[n++];
// });
// console.log(str);

//------------------------------------------------------------------
// // 9.方式九
// var str = '2017/7/23 18:00:00';
// var time = new Date(str);
// var year = time.getFullYear();
// var month = addZero(time.getMonth() + 1);
// var day = addZero(time.getDate());
// var hours = addZero(time.getHours());
// var minutes = addZero(time.getMinutes());
// var seconds = addZero(time.getSeconds());
// var result = year + '年' + month + '月' + day + '日 ' + hours + '时' + minutes + '分' + seconds + '秒';
// console.log(result);
// //->不足十位前面补零
// function addZero(val) {
//     val = Number(val);
//     return val < 10 ? '0' + val : val;
// }

//------------------------------------------------------------------
// // 10.方式十
//   var time = ['年', '月', '日', '时', '分', '秒'];
// var n = 0; // 记录索引
// var str = '2018-05-12 18:00:40';
// //    str.split(/[- :]/) // split 支持正则
// //    console.log(str.split(/ /));
// //    console.log(str.split(/\s/));
// // console.log(str.split(/[- :]/)); // ["2018", "05", "12", "18", "00", "40"]
// var arr = str.split(/[- :]/);
// str = str.replace(/\d+[-:]?/g, function () {
//     //       2018- => arr[0]+''+time[0]   05- => arr[1]+ '' +time[1]
//     var str2 = arr[n] + '' + time[n];
//     n++;
//     return str2;
// });
// console.log(str);


//------------------------------------------------------------------
// // 11.方式十一: 模板引擎
// //需求: 2017-01-01 18:00:40 => 2017年01月01日 18时00分40秒
// var str = '2018-05-12 18:00:40';
// var tempStr = '{0}年{1}月{2}日 {3}时{4}分{5}秒'; // 模板字符串
// var arr = str.split(/[: -]/); //  ["2018", "05", "12", "18", "00", "40"]
//     //console.log(arr);
// str = tempStr.replace(/\{(\d+)\}/g, function (a, b) {
//     // arr[0] => {0} arr[1] => {1} arr[2] => {2}
//     return arr[b];
// });
// console.log(str);

