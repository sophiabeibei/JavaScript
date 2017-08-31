// 2、URL参数格式化
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// //->问号以后的都是`URL问号传参值`，接下里我们要把问号后面的信息拆解成为对象的键值对
// //->{name:'zxt',age:28,sex:1,type:0}


//--------------------------------------------------
// //=>方法一: 字符串拼接
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// var obj = {},
//     parameter = url.split("?")[1];//->"name=zxt&age=28&sex=1&type=0"
// if (parameter) {//->当前url种有问号参数
//     var ary = parameter.split("&");
//     for (var i = 0; i < ary.length; i++) {
//         var item = ary[i];//->"xxx=xxx"把等号左边作为对象的属性名,右边是对象的属性值
//         //->方式一:
//         // item = item.split("=");
//         // var key = item[0],
//         //     value = item[1];
//
//         //->方式二:
//         var index = item.indexOf("="),
//             key = item.substring(0, index),
//             value = item.substring(index + 1);
//         obj[key] = value;
//     }
// }
// console.log(obj);


//--------------------------------------------------
// //=>方法二: 正则处理
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// var obj = {},
//     reg = /([^?&=]+)=([^?&=]+)/g;//->当前正则匹配的是xxx=xxx
// url.replace(reg,function () {
//     obj[arguments[1]] = arguments[2];
// });
// console.log(obj);


//--------------------------------------------------
// //=>方法三: 还是正则处理
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// //->把URL问号传递的参数值格式化为一个JSON对象
// String.prototype.myQueryURLParameter = function myQueryURLParameter() {
//     //->this: url 我们需要处理的url地址
//     var obj = {},
//         reg = /([^?&=]+)=([^?&=]+)/g;
//     this.replace(reg,function () {
//         //console.log(arguments[1]);//->arguments[1] 是属性名key  arguments[2]是属性值value
//         obj[arguments[1]] = arguments[2];
//     });
//     return obj;
// };
// console.log(url.myQueryURLParameter());


//--------------------------------------------------
// //=>方法四:
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// var reg = /([\w-]+)=([\w-]+)/g;
// var obj = {};
// url.replace(reg, function (a, b, c) {
//     obj[b] = c;
// });
// console.log(obj);


//--------------------------------------------------
// //=>方法五:
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// var reg = /([^?&=]+)=([^?&=]+)/g;
// var obj = {};
// url.replace(reg, function () {
//     obj[arguments[1]] = arguments[2];
// });
// console.log(obj);

