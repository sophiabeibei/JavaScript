## ES6: 语法+babel编译
### 箭头函数
- 表达式的写法：
```
let fn=a=>a;
let fn1=(a,b)=>console.log(a+b);
let fn2=()=>console.log('我没有传参')
```
-函数体的写法（显示写法）：
```
let fn=(a,b)=>{
    console.log(a+b)
}
let fn2=()=>{
    console.log('我没有传参')
}
```
### 复习数据类型检测
- typeof  判断数据类型，主要用于基本数据类型的检测
- instanceOf: ary instanceOf Array 判断前面这个**实例**是否属于后面的**类**
- constructor:可以打印出当前实例所属的类；
- Object.prototype.tostring.call(xxx);'[object 类名]'
### 类及类的继承
- 创建一个类：
```
class Father{
    //实例的私有属性和方法
    constructor(){
    }
    //实例公有的属性和方法
    getX(){
    }
    //静态属性和方法：类自身的私有方法
    static getClass(){
    }
}
Father.xx=xx;
```
- 子类继承父类
```
class Son extends Father{
    //私有属性和方法的继承
    constructor(){
        super();//这里一定不能省略
        //子类私有的属性和方法写在下面
        this.xxx=xxx;
    }
    //子类自己公有的属性和方法写在下面
    getY(){
    }
}
```
### 对象字面量
- 写法简化了
```
let a=10;
let b='2';
let obj={a,b};
```
- 方便继承
```
let fn=()=>'新年红包多多';
let obj2={fn,__proto__:obj}
```
### 模板字符串
```
var str='我是字符串';
var str3='要放假了'
var str2=`啦啦啦啦${str}${str3}`;
```
### 对象的解构赋值
```
var obj={a:10,b:20,fn:function(){alert('abc')}};
var obj1={a:1.1,b:2.1,fn:function(){alert('abc123')}};
var objFather={aa:obj,bb:obj1};
var {aa,bb}=objFather;
//未来框架肯定会用到；
import {Component} from react;
{List,Text,Image}=reactNative;
```
### 默认参数，不确定参数，扩展运算符
- 默认参数
```
function sum(a=3,b=4){
    alert(a+b);
}
sum(10,20);
```
- 不确定参数
```
function sum(a,...ary){
}
```
- 扩展运算符
```
var ary=[1,2,3,4,45];
var ary2=[...ary,'dudu'];
console.log(ary2)
```
### let 和 const
- let解读
    + 不能进行预解释
    + 会形成块级作用域
    + let中的this，指的是上级作用域中的this；
- const解读：
    + 不能进行预解释
    + 只能赋值一次；
