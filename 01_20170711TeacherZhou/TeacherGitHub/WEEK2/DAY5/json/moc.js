//->MOC数据:制造测试的假数据

var str1 = '赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨';//->0~15
var str2 = '零一二三四五六七八九';//->0~9
var ary = [];
for (var i = 1; i <= 20; i++) {
    var obj = {};
    obj.id = i;
    obj.name = str1.charAt(Math.round(Math.random() * 15)) + str2.charAt(Math.round(Math.random() * 9));
    obj.age = Math.round(Math.random() * (65 - 18) + 18);

    ary.push(obj);
}

var fs = require('fs');
fs.writeFileSync('./data.json', JSON.stringify(ary), 'utf-8');
