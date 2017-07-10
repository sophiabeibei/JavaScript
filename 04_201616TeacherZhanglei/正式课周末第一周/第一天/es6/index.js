/*var aBtn=document.getElementsByTagName('input');
/!*for(var i=0; i<aBtn.length; i++){
    aBtn[i].index=i;
    aBtn[i].onclick=function(){
        console.log(this)
        alert(this.index)
    }
}*!/
for(let i=0; i<aBtn.length; i++){
    aBtn[i].onclick=function(){
        alert(i)
    }
}*/
let gril='tangtang';
gril=123;
console.log(gril)
//默认赋值
/*function sum(a=3,b=4){
    alert(a+b);
}
sum(10,20);*/
//参数不确定
/*function sum(a,...ary){
    console.log(...ary)
}
sum(2,3,'lala','b',123,{a:123})*/
//扩展运算符
/*var ary=[1,2,3,4,45];
var ary2=[...ary,'dudu'];
console.log(ary2)*/
//解构赋值
/*var obj={a:10,b:20,fn:function(){alert('abc')}};
var obj1={a:1.1,b:2.1,fn:function(){alert('abc123')}};
var objFather={aa:obj,bb:obj1};
var {aa,bb}=objFather;
aa.fn();
bb.fn();*/
/*import {Component} from react;
{List,Text,Image}=reactNative;*/

//模板字符串：
/*var color='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';*/
/*var str='我是字符串';
var str3='要放假了'
var str2=`啦啦啦啦${str}${str3}`;//
alert(str2)*/




//对象字面量：1）写法简化 2)可以继承
/*var a=1;
var b='2';
var obj={a:a,b:b}
alert(obj.a)*/
/*let a=10;
let b='2';
let fn=()=>'新年红包多多';
let obj={a,b};
let obj2={fn,__proto__:obj}
//alert(obj.a)
alert(obj2.a);*/


/*//类及类的继承
function Fn(){//构造函数中的this都是实例；构造函数中存放的都是私有属性；
    this.x=100;
    this.y=200;
}
//prototype:公共的属性和方法；
Fn.prototype.getX=function(){
    alert(this.x)
}

function Sun(){

}
Sun.prototype=new Fn;
var f=new Fn();
var s=new Sun();
s.getX();*/
/*//体验es6构造函数的写法
class Father{
    constructor(){//构造函数中存放的都是私有的属性和方法；
        this.x=100;
        this.y=300;
    }
    //以下都是共有属性和方法
    getX(){
        alert('我能活到'+this.x+'岁')
    }
    //给类添加私有的方法；静态属性和方法，跟实例没有任何关系，他们都是类的私有属性
    static getY(){
        alert('我是静态方法，实例不能使用'+Father.y)
    }
}
Father.y=800;
class Son extends Father{
    constructor(){
        super();
        this.str='新年快乐';
    }
    //以下都是子类自己公有的属性和方法
    happyNewYear(){
        alert('祝大家新年快乐，吃的多多，体重多多')
    }
}
var f=new Father();
var s=new Son;
Father.getY();*/
/*console.log(ary)
console.log(ary1)*/
/*f.getX();
s.getX();*/
/*alert(s.str);
s.happyNewYear();*/


//表达式的写法
/*let fn=(a,b)=>{
    console.log(a+b)
}
let fn2=()=>{
    console.log('我没有传参')
}
fn(10,20);
fn2();*/
//普通函数
/*function fn(a){
 return a;
 }*/
/*
let fn=a=>a;
let fn1=(a,b)=>console.log(a+b);
let fn2=()=>console.log('我没有传参')
//alert(fn(10))
fn1(2,3)
fn2()*/
