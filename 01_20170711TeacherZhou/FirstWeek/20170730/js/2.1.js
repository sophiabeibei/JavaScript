/*
function Person() { }
Person();//->(普通)函数执行: Person不是类,它仅仅是一个普通的函数*/

//---------------------------------------------
function Person() {
    /*当Person函数执行的时候,做了以下事情(这不叫规律,这叫核心)
    * 1.形成一个私有作用域
    * 2.形参赋值和变量提升
    * 3.(构造)浏览器会默认的在这个作用域中开辟一个堆内存(对象数据类型的值),然后把这个对象作为函数的执行主体(THIS)=>这个对象就是当前这个类的一个实例p1;
    * 4.代码从上到下执行
    * 5.(构造)即使我们不写return,浏览器也会默认返回一个结果,返回的结果就是第三步创建的那个堆内存(对象;也就是所谓的THIS);=>把浏览器默认创建的实例(p1)返回;
    *
    * */

}
new Person();//->构造函数执行: 此时的PERSON不是一个普普通通的函数,而是一个自定义类;
            //->执行的时候,是用new执行;Person就属于自定义类;
var p1 = new Person();//->而P1接收到的返回结果就是当前这个类的一个实例

/*
* 1.把Person变为一个类: 类都是函数数据类型的(包括内置类,也是函数数据类型);
* 2.把Person当作一个普通的方法来执行;
* 3.此处的p1就是当前类的实例: 实例都是对象数据类型的
* */
/*
 实例,都是对象数据类型      typeof p1//->"object"
 类,都是函数数据类型       typeof Person//->"function"
 */
console.log(typeof p1);//->"object"
console.log(typeof Person);//->"function"
//基本数据类型的变态性!!!!









//普通函数: 看一个函数的返回结果,就要看函数中有没有return;
//构造函数:


//---------------------------------------------



































