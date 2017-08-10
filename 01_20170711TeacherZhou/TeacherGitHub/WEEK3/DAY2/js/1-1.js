function Parent() {
    this.x = 100;
}
Parent.prototype.getX = function () {
    console.log(++this.x);
};

function Child() {
    //->this:c
    this.y = 200;
    //Parent();//->this:window
    Parent.call(this);//->this:c  c.x=100
}
Child.prototype.getY = function () {
    console.log(--this.y);
};
var c = new Child();
console.log(c);