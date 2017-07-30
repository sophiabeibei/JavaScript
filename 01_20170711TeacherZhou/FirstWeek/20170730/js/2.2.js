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































