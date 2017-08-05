function Fn() {
    this.x = 10;
    this.y = 10;
    this.minus = function () {
        console.log(this.x - this.y);
    }
}
//->给原型增加属性和方法,以下这种模式麻烦;
Fn.prototype.y = 200;
Fn.prototype.sum = function () {
    console.log(this.x + this.y);
};
var f = new Fn;

