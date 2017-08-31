Object.prototype.x = 100;
function Fn() {
    this.x = 10;
    this.y = 20;
    this.minus = function () {
        console.log(this.x - this.y);
    }
}

//->给原型上增加属性和方法,以下这种模式有点麻烦
// Fn.prototype.y = 200;
// Fn.prototype.sum = function () {
//     console.log(this.x + this.y);
// };

//->给比较冗长的原型起一个比较短的“小名”
// var pro = Fn.prototype;
// pro.y = 200;
// pro.sum = function () {}

//->重新给原型开辟一个内存空间,实现批量设置属性和方法
/*
 * 问题:
 *  自己开辟的新对象中是没有constructor属性的(浏览器默认给原型开辟的那个空间是有这个属性的) ->这样会让现有f.constructor=Object而不是之前的Fn了 ->改变constructor不好
 *
 * 解决:
 *  在新开辟的对象中手动增加constructor
 */
//->当前这种模式对内置类无效,因为此赋值方法如果对内置类有效,这样会导致内置类的原型遭到毁灭性修改
Fn.prototype = {
    constructor: Fn,
    y: 200,
    sum: function () {
        console.log(this.x + this.y);
    }
};

var f = new Fn;
var f2 = new Fn;