function Person() {
    var num = 100;//->num仅仅是当前Person作为普通函数执行的时候声明的一个私有变量而已,只有THIS.XXX=XXX的操作才和当前的实例有关系,私有变量这些和实例是没有必然的关系的

    this.name = '珠峰';
    this.age = 8;
    this.say = function () {
        console.log('my name is ' + this.name + '，i am ' + this.age + ' years old！');
    };
}
var p1 = new Person;
console.log(p1.num);//->undefined P1没有NUM这个属性,所以结果为UNDEFINED

















