
function EventFire() { // 发射类

}
EventFire.prototype.on = function (type,fn) {
    // 把自定义的事件池放在当前实例上 --> this
    if(!this[type+"Pool"]){
        this[type+"Pool"] = [];
    }
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        var cur = ary[i];
        if(fn === cur)return;
    }
    ary.push(fn);
    return this;
};
// 发布
EventFire.prototype.fire= function (type) {
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){
            // 指向当前的实例
            ary[i].call(this)
        }
    }
}
//取消订阅 ： 把方法从自定义事件池中移出
EventFire.prototype.off = function (type,fn) {
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(ary[i] === fn){
            ary[i] =null;
            break;
        }
    }
}
Drag.prototype = new EventFire();

function Drag(ele) {

    // ele 是元素对象
    // this --> 当前的实例  this.down
    //把元素对象给当前实例的一个自定义属性
    this.ele = ele;
    // debugger
    // 处理实例上的down方法中的this关键字，让他指向实例

    this.DOWN = handThis(this,this.down);
    this.MOVE = handThis(this,this.move);
    this.UP = handThis(this,this.up);
    on(this.ele,"mousedown",this.DOWN);
};
//    Array.prototype.slice = function () {
//        this->[1,2]
//    }
//    [1,2].slice()
Drag.prototype.down = function (e) {
    console.log(1)

    // this --> 实例
    this.x = e.pageX;
    this.y = e.pageY;
    this.mx = this.ele.offsetLeft;
    this.my = this.ele.offsetTop;
    on(document,"mousemove",this.MOVE)
    on(document,"mouseup",this.UP)
    e.preventDefault();
    this.fire("dragStart")
}
Drag.prototype.move = function (e) {
    var changeX = e.pageX-this.x;
    var changeY = e.pageY -this.y;
    this.ele.style.left = this.mx + changeX + "px";
    this.ele.style.top = this.my + changeY+ "px";
    this.fire("dragStarting")
}
Drag.prototype.up = function (e) {
    off(document,"mousemove",this.MOVE)
    off(document,"mouseup",this.UP)
    this.fire("dragEnd");
}
function handThis(obj,fn) {
    // debugger
    return function (e) {
        return fn.call(obj,e)
    }
}
var zIndex = 1;
function inceaseIndex() {
    this.ele.style.zIndex = ++zIndex;
}
