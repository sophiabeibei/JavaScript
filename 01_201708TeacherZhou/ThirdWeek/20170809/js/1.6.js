class Parent{
    constructor(){
        this.x = 100
    }
    getX(){
        //console.log(++this);
    }
}
class Child extends Parent{
    constructor(){
        //this.y = 200;
        super();//->写个super()就是call继承
    }
    getY(){
        //console.log(--this);
    }
}
var c = new Child();


//ES6中的继承












