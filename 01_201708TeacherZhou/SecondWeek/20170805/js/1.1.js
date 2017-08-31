function Fn() {
    /*
    * new Fn:
    * 1.像普通函数执行一样: 形成的一个私有的作用域
    * 2.形参复制 && 变量提升
    * 3.浏览器会在当前作用域中开辟一个新的对象(当前类的一个实例),并且让当前作用域的上下文(THIS)变为这个实例对象
    * 4.代码自上而下执行
    *
    * */
    this.x = 10;
    this.y = 10;
    this.minus = function () {
        console.log(this.x - this.y);
    }
}
Fn.prototype.y = 200;
Fn.prototype.sum = function () {
    console.log(this.x + this.y);
};
var f = new Fn;
var f2 = new Fn;
console.log(f.sum === Fn.prototype.sum);//->true
f.sum();//->f首先通过原型链找到原型上sum这个公有方法,然后让这个方法执行;   this: f <=> f.x + f.y <=> 30
Fn.prototype.sum();//->this: Fn;   Fn.prototype <=> Fn.prototype.x + Fn.prototype.y <=> 300
console.log(f.constructor);//->Fn

