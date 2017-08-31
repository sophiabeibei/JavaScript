function Person(name, age) {
    this.name = "珠峰";
    this.age = 8;
    this.say = function () {
        console.log("my name is "+ this.name + ", I am " + this.age + "years old!");
    };
    //return 1;//->return返回的1,没用;
    return {h: "haha"};//->{h: "haha"}
}
var p1 = new Person();
var p2 = new Person;//->如果不需要传递实参,我们是可以省略小括号的;

//->我们不写return默认返回的是当前类的实例,如果我们手动编写了return,根据返回值的不一样,有不同的结果;
//->1.return 基本数据类型;   对最后结果不产生任何影响,返回的还是当前类的实例;
//->2.return 引用数据类型;   自己设置返回的内容会覆盖默认返回的内容,返回的结果将不再是当前类的实例了;
console.log(p1);//->{h: "haha"}
console.log(p1 instanceof Person);//->false


//->--------------------------------------------------------------------
//console.log(new Date());//->创建Date类的一个实例: 当前客户端的时间;  Sun Jul 30 2017 15:53:16 GMT+0800 (中国标准时间)
//console.log(new Date);//->创建Date类的一个实例: 当前客户端的时间;  Sun Jul 30 2017 15:53:16 GMT+0800 (中国标准时间)
//->加不加小括号都可以

//->--------------------------------------------------------------------


