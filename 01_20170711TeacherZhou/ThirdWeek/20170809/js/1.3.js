//->把父类当成普通函数执行  父类this: window
//->P
function Parent() {
    this.x = 100;
}
Parent.prototype.getX = function(){
    console.log(++this.x);
};
function Child(){
    this.y = 200;
    var obj = new Parent;
    /*
    * obj
    *   x = 100;
    *   __proto__:
    *       getX : function....
    *       constructor: Parent
    *       __proto__ : Object
    * */

    //->知识点: 1.for...in循环既可以遍历私有的属性和方法,也可以遍历[部分: 可枚举的都可以,不可枚举的不可以遍历]原型链上的属性和方法;=>一般内置的属性和方法是不能枚举出来的;
    //->枚举: 拿出来,看; 枚举,就是遍历的意思;en
    for(var key in obj){
        console.log(key);
        //console.log(Object.getOwnPropertyNames(obj, key));
        //->1.
        this[key] = obj[key];//->把父类私有的和公有的都变为子类私有的属性和方法(这方法属于遗传式继承: 把父类东西克隆一份过来的,继承后子类和父类没啥关系);不但要继承,还可以实现重新,现在没关系,就无法实现重写,所以这种方式不常用;
        //Child.prototype[key] = obj[key];//->都变为子类公有的

        //->2.还可以 私有的是私有的,公有的是公有的
        if(obj.hasOwnProperty(key)){
            this[key] = obj[key];
        }else{
            Child.prototype[key] = obj[key];
        }
    }

}
Child.prototype.getY = function () {
    console.log(--this.y);
};
var c = new Child();
console.log(c);
















