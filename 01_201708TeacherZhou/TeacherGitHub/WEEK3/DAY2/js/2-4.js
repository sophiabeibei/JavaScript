//->当前字符串中哪一个字母出现的次数最多，出现了多少次
var str = 'hello，my name is tom，i am 25 years old，i com from mars！';

//1、获取每一个字母出现的次数
var obj = {};
str.replace(/[a-zA-Z]/g, function () {
    var val = arguments[0];//->每一次捕获到的字母
    if (obj.hasOwnProperty(val)) {
        //->当前这个字母已经存储过了
        //->我们让其出现的次数累加一即可
        obj[val]++;
        return;
    }
    //->当前字母还没有存储过,我们赋值为一,代表只出现一次
    obj[val] = 1;
});
//console.log(obj);//->{h: 1, e: 3, m: 7…}

//2、获取最多出现的次数
var max = 1;//->假设出现次数最多一次
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        obj[key] > max ? max = obj[key] : null;//->如果当前字母出现的次数比假设的还要大,修改假设的值
    }
}

//3、根据最多出现的次数获取对应的字母
var ary = [];
for (key in obj) {
    if (obj.hasOwnProperty(key)) {
        obj[key] === max ? ary.push(key) : null;
    }
}
console.log('最多出现：' + max + '次，对应的字母分别为：' + ary.join('|'));


