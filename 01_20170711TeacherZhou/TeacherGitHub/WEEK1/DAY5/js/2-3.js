function Person() {
    this.name = '珠峰';
    this.age = 8;
    this.say = function () {
        console.log('my name is ' + this.name + '，i am ' + this.age + ' years old！');
    };
    return {h: '哈哈'};
}
var p1 = new Person();

//--------------------------------
//=>我们不写RETURN默认返回的是当前类的实例,如果我们手动编写了RETURN,根据返回值的不一样,有不同的结果
//1、RETURN 基本数据类型;  对最后结果不产生任何影响,返回的还是当前类的实例
//2、RETURN 引用数据类型;  自己设置返回的内容会覆盖默认返回的内容,返回的结果将不再是当前类的实例了

// console.log(p1);//->{h:'哈哈'}
// console.log(p1 instanceof Person);//->FALSE

//----------------------------------
// var p2 = new Person;//->如果不需要传递实参,我们是可以省略小括号的
// console.log(new Date);//->创建Date类的一个实例:当前客户端的时间

















