function Parent() {
    this.x = 100;
}
Parent.prototype.getX = function () {
    console.log(++this.x);
};
function Child() {
    this.y = 200;
    Parent.call(this);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.getY = function () {
    console.log(--this.y);
};
var c = new Child();
console.log(c);