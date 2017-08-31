//->把父类当成普通函数执行  父类this: window
//->P
function Parent() {
    this.x = 100;
}
Parent.prototype.getX = function(){
    console.log(++this.x);
};
function Child(){
    this.y = 200;
    Parent.call(this);//->call继承
}
Child.prototype = new Parent();//->原型继承
// new Parent()
// x : 100
// __proto__: Parent.prototype

Child.prototype = Object.create(Parent.prototype);//->原型继承,只不过new;Parent创建有私有属性,Object.create()创建没有私有属性;
// Object.create(Parent.prototype);
// __proto__: Parent.prototype

Child.prototype.constructor = Child;
Child.prototype.getY = function () {
    console.log(--this.y);
};
var c = new Child();
console.log(c);
















