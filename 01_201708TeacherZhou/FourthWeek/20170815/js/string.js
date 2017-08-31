/*    //1、时间字符串格式化
    var str = '2017-8-9 16:43:5';
    //->把这个字符串可以变为 'xxxx年xx月xx日 xx时xx分xx秒' / 'xx-xx xx:xx 08-09 16:43' ... 变为一切你想需要的格式

    // 1.方式一
    var str = '2017-8-9 16:43:5';
    var reg = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;
    str = str.replace(reg, function (a, n1, n2, n3, n4, n5, n6) {
        console.log(arguments);//["2017-8-9 16:43:5", "2017", "8", "9", "16", "43", "5", 0, "2017-8-9 16:43:5", callee: ƒ, Symbol(Symbol.iterator): ƒ]
        return n1 + '年' + n2 + '月' + n3 + '日 ' + n4 + '时' + n5 + '分' + n6 + '秒'
    });
    console.log(str);
    str = str.replace(reg, '$1年$2月$3日 $4时$5分$6秒');
    console.log(str);*/










//方式二
//        var time = ['年', '月', '日', '时', '分', '秒'];
//        var n = 0; // 记录索引
//        var reg = /(\d+)[:-]?/g;
//        var str = '2018-05-12 18:00:40';
//        str = str.replace(reg, function (a, b) {
//            // 2018- 2018
//            //  console.log(b + time[n++]); // 2018 + time[0] 2018年
//            return b + time[n++];
//        });
//        console.log(str);




// 2、URL参数格式化
// var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
// //->问号以后的都是`URL问号传参值`，接下里我们要把问号后面的信息拆解成为对象的键值对
// //->{name:'zxt',age:28,sex:1,type:0}




var url = request("url");

//获取url参数
function request(paras) {
    var url = 'http://www.zhufengpeixun.com/index.html?name=zxt&age=28&sex=1&type=0';
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");//->paraString 数组["name=zxt","age=28","sex=1","type=0"]
    var paraObj = {};
    var j;
    for (var i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    console.log(paraObj);
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}