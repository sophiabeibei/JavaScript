// 思考题:
// 2、URL参数格式化
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// //->问号以后的都是`URL问号传参值`，接下里我们要把问号后面的信息拆解成为对象的键值对
// //->{name:'zxt',age:28,sex:1,type:0}

var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';

//==>字符串拼接

// var obj = {},
//     parameter = url.split('?')[1];//->'name=zxt&age=28&sex=1&type=0'
// if (parameter) {//->当前URL中有问号传参
//     var ary = parameter.split('&');
//     for (var i = 0; i < ary.length; i++) {
//         var item = ary[i];//->'xxx=xxx' 把等号左边作为对象的属性名,右边是对象的属性值
//         // item = item.split('=');
//         // var key = item[0],
//         //     value = item[1];
//
//         var index = item.indexOf('='),
//             key = item.substring(0, index),
//             value = item.substring(index + 1);
//         obj[key] = value;
//     }
// }
// console.log(obj);

//==>正则处理
// var obj = {};
// var reg = /([^?&=]+)=([^?&=]+)/g;//->当前正则匹配的是 xxx=xxx
// url.replace(reg, function () {
//     // arguments[1] -> key  第一个分组内容
//     // arguments[2] -> value 第二个分组内容
//     obj[arguments[1]] = arguments[2];
// });
// console.log(obj);


//->把URL问号传递的参数值格式化为一个JSON对象
String.prototype.myQueryURLParameter = function myQueryURLParameter() {
    //->this:url 我们需要处理的URL地址
    var obj = {},
        reg = /([^?&=]+)=([^?&=]+)/g;
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};
console.log(url.myQueryURLParameter());