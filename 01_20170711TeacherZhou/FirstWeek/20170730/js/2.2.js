function Person(name, age) {
    //->this 当作构造函数执行的时候,函数体中出现的this是当前类的一个实例;
    this.name = name;//->给当前的实例对象增加一个name的属性       (给p1增加的)
    this.age = age;//->this就是实例              (给p1增加的)
    this.say = function () {//->给当前的实例对象增加一个属性say,属性值是方法;        (给p1增加的)
        console.log("my name is "+ this.name + ", I am " + this.age + "years old!");
    }
}
var p1 = new Person("AAA",28);
console.log(p1);

var p2 = new Person("BBB",30);
console.log(p2);
//console.log("name" in p1);//->true

//console.log(p1.say === p2.say);//->false  =>结果为false说明在构造函数体中出现的this.xxx = xxx,都是给当前的实例增加一些私有属性;
p1.say();//->this: p1;
p2.say();//->this: p2;

//---------------------------------------------
//->instanceof: 检测当前对象(实例)是否属于这个类的运算符
// 检测p1是不是Person的实例
// console.log(p1 instanceof Person);//true
// console.log(p1 instanceof Array);//false
//
// var a = /^$/;
// console.log(a instanceof Array);//->false
// console.log(a instanceof RegExp);//true
//---------------------------------------------
//->in: 检测某一个属性是否隶属于某一个对象
console.log("say" in p1);//->true

//->hsaOwnProperty: 检测某一个属性是否为当前对象的私有属性
console.log(p1.hasOwnProperty("say"));//->true  验证了say是p1的私有属性




/**
 * hasPublicProperty: 检测当前的这个属性是否为实例的公有属性
 * @param key: [string] properties to be detected
 * @param obj: [object] object to be detected
 * @return true or false
 * by iBei on 2017-07-30
 */
function hasPublicProperty(key, obj) {
    return (key in obj) && !obj.hasOwnProperty(key);
}
console.log(hasPublicProperty("say", p1));//->false
console.log(hasPublicProperty("toString", p1));//->true

//公有属性都在原型上;



