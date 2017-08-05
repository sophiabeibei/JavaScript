function Fn() {
    this.x = 10;
    this.y = 10;
    this.minus = function () {
        console.log(this.x - this.y);
    }
}
//->给原型增加属性和方法,以下这种模式麻烦;
/*Fn.prototype.y = 200;
Fn.prototype.sum = function () {
    console.log(this.x + this.y);
};*/

//->简单的做法
//->1.起小名: 给比较冗长的原型起个比较短的"小名"
var pro = Fn.prototype;
pro.y = 200;
pro.sum = function(){};
//->2.重新给原型开辟一个内存空间,实现批量设置属性和方法
Fn.prototype = {
    y : 200,
    sum : function (){}
};

var f = new Fn;
var f2 = new Fn;

