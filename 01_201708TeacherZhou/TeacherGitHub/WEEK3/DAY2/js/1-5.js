function Parent() {
    this.x = 100;
}
Parent.prototype.getX = function () {
    console.log(++this.x);
};
function Child() {
    this.y = 200;
    Parent.call(this);//->call继承
}
Child.prototype = Object.create(Parent.prototype);
// new Parent()
//   x : 100
//   __proto__:Parent.prototype

// Object.create(Parent.prototype)
//
//     __proto__:Parent.prototype

Child.prototype.constructor = Child;
Child.prototype.getY = function () {
    console.log(--this.y);
};
var c = new Child();
console.log(c);function Parent() {
    this.x = 100;
}
Parent.prototype.getX = function () {
    console.log(++this.x);
};
function Child() {
    this.y = 200;
    Parent.call(this);//->call继承
}
Child.prototype = Object.create(Parent.prototype);
// new Parent()
//   x : 100
//   __proto__:Parent.prototype

// Object.create(Parent.prototype)
//
//     __proto__:Parent.prototype

Child.prototype.constructor = Child;
Child.prototype.getY = function () {
    console.log(--this.y);
};
var c = new Child();
console.log(c);