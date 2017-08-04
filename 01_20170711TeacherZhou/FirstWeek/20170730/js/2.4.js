function Person() {
    var num = 100;//->num仅仅是当前函数Person作为普通函数执行的时候声明的一个私有变量而已,只有this.xxx = xxx的操作才和当前的实例有关系,私有变量这些和实例是没有必然的关系的;
    this.name = "珠峰";
    this.age = 8;
    this.say = function () {
        console.log("my name is "+ this.name + ", I am " + this.age + "years old!");
    };
}
var p1 = new Person();//->把Person当普通函数执行了         Person两个角色,既是类,又是一个函数;
console.log(p1.num);//->undefined   P1没有num这个属性,所以结果为undefined;

//->Person三个角色,既是类,又是一个函数;又是一个对象;       (三种角色之间没有必然关系)
//->num是Person作为普通函数执行的时候声明的一个私有变量
//->this.xxx = xxx的操作才和当前的实例p1有关系




//2.4是原型链的第一阶段


