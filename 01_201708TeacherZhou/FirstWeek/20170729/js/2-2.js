//->在全局作用域下
//1)声明一个全局变量,也相当于给window增加了一个对应的属性,属性值就是变量存储的值
// var num = 13;
// console.log(num);//->13  输出变量存储的值
// console.log(window);//->输出window的属性值


//2)带var和不带var的区别
// console.log(n,m);//->这里的m报错(m is not defined;不带var的不能进行变量提升(不能在定义之前使用,否则会报错,而一旦当前行代码报错,后面代码都不执行了)
// var n = 13;
// m = 14;
// console.log(n);//->既有变量的意思,也有window属性的意思
// console.log(m);//->没有创建变量的层次上的意思,仅仅是给window增加了一个叫做m的属性名,属性值14;


//3)
//->变量提升: 不管条件是否成立,判断体中的内容也要参与变量提升(但是此时不管是var/function都只是提前声明,带function不再定义;)代码执行过程当中,如果条件不成立直接跳过判断继续执行,如果条件成立,进入到判断体中的第一件事情就是给函数赋值定义;

//->"xxx" in window: IN是用来判断当前属性是否隶属于于这个对象的,属于返回true,反之是false;
var obj = {name: "周啸天", age: 28};
console.log("name" in obj);//->true
console.log("sex" in obj);//->false


//--------------------------------------------------------------------------------------------------
/**全局下的变量提升
 * var a; //->undefined
 * function fn;//->undefined
 * 在全局下声明的变量都相当于给window加了一个属性:
 *      window.a = undefined
 *      window.fn = undefined
 *
 * 当条件不成立时,判断体中的代码不执行;
 *
 */

console.log(a, fn);//->undefined    undefined
if (!("a" in window)) {//->"a" in window  =>TRUE  a取反false;条件不成立,判断体中的代码不执行;
    var a = 13;

    function fn() {
        console.log("ok");
    }
}
console.log(a, fn);//->undefined    undefined
