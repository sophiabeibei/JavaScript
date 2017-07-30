function Person(name, age) {
    //->this:当做构造函数执行的时候,函数体中出现的THIS是当前类的一个实例
    this.name = name;//->给当前的实例对象增加一个NAME的属性
    this.age = age;
    this.say = function () {
        console.log('my name is ' + this.name + '，i am ' + this.age + ' years old！');
    }
}
var p1 = new Person('樊献锋', 28);
var p2 = new Person('宋涵', 29);

//console.log('say' in p1);//->TRUE
//console.log(p1.say === p2.say);//->FALSE 构造函数体中出现的THIS.XXX=XXX,都是给当前的实例增加一些私有的属性
// p1.say();//->this:p1
// p2.say();//->this:p2

//---------------------------
//=>instanceof：检测当前对象(实例)是否属于这个类的运算符
// console.log(p1 instanceof Person);//->TRUE
// console.log(p1 instanceof Array);//->FALSE
//
// var a = /^$/;
// console.log(a instanceof Array);
// console.log(a instanceof RegExp);

//----------------------------
//=> in：检测某一个属性是否隶属于某一个对象
// console.log('say' in p1);//->TRUE

//=> hasOwnProperty：检测某一个属性是否为当前对象的私有属性
// console.log(p1.hasOwnProperty('say'));//->TRUE

/*
 * hasPublicProperty：detects whether the current property is the public attribute of the instance
 * @parameters
 *   key：[string] properties to be detected
 *   obj：[object] object to be detected
 * @return
 *   true or false
 * by team on 2017-07-30
 */
function hasPublicProperty(key, obj) {
    return (key in obj) && !obj.hasOwnProperty(key);
}
console.log(hasPublicProperty('say', p1));//->FALSE
console.log(hasPublicProperty('toString', p1));//->TRUE






