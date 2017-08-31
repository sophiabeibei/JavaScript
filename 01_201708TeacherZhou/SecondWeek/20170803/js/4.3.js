var ary = [{
    name: "任立欣",
    age: 28,
    score: 80
},{
    name: "单里斯",
    age: 29,
    score: 90
},{
    name: "叶祥磊",
    age: 27,
    score: 92
}];
ary.sort(function (a, b) {
    //return b.age -a.age;//->按照年龄排序
    //return a.score -b.score;//->按照分数排序
    return a.name.localeCompare(b.name);//->按照名字排序

});

console.log(ary);








































