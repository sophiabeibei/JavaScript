function Fn(num){
    this.x = this.y = num;
}
Fn.prototype = {
    x: 20,
    sum: function(){
        console.log(this.x + this.y);
    }
};
var f = new Fn(10);
console.log(f.sum === Fn.prototype.sum);//->true
f.sum();//->
Fn.prototype.sum();//->
console.log(f.constructor);//->


var a = document.getElementsByTagName("a")[0];
console.log(a);