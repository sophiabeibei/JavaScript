//new Drag(div1);
//new Drag(div2); => 就能拖拽 => new Drag过程中MOUSEDOWN事件已经绑定
// 永远要保证原型上方法中的this是实例

//  用公有方法去操作私有属性

function Drag(ele,range){
    // range : {left : 300, top : 300}

    this.ele = ele;
    this.l = null; // 当鼠标mousedown的那一刻才会赋值
    this.t = null;
    this.range = range; // 把范围这个参数添加到私有属性上
    var that = this;

    this.DOWN = function (e){
        //that.down.call(that);
        that.down(e); // 保证原型上方法中的this是实例
    }
    this.MOVE = function (e){
        // THIS => ELE  DOCUMENT
        that.move(e);
    }
    this.UP = function (e){
        that.up(e);
    }
    this.ele.onmousedown = this.DOWN;
    //this.ele.onmousedown = this.down.bind(this);
    // div1.onmousedown = function (){ this }
}
Drag.prototype.down = function (e){ // mousedown事件绑定
    // 这个事件对象e是this.DOWN中产生的
    this;// div1 => 实例
    e = e || window.event;

    this.l =  e.clientX - this.ele.offsetLeft;
    this.t = e.clientY - this.ele.offsetTop;

    if(this.ele.setCapture){ // ie   绑定给dom元素
        this.ele.setCapture();
        this.ele.onmousemove = this.MOVE;
        this.ele.onmouseup = this.UP;
    }else{ // document
        document.onmousemove = this.MOVE;
        document.onmouseup = this.UP;
    }
}
Drag.prototype.move = function (e){// mousemove事件绑定
    e = e || window.event;
    var l = e.clientX - this.l;
    var t = e.clientY - this.t;
    // 范围 => 如果存在就用自己的，默认
    var minL = 0, minT = 0;
    var maxL = this.range ? this.range.left : (document.documentElement.clientWidth || document.body.clientWidth) - this.ele.offsetWidth;
    var maxT = this.range ? this.range.top : (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight;
    l = l < minL ? minL : l > maxL ? maxL : l;
    t = t < minT ? minT : t > maxT ? maxT : t;

    this.ele./*div1*/style.left = l + 'px';
    this.ele.style.top = t + 'px';
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
}
Drag.prototype.up = function (e){ // mouseu事件绑定
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        this.ele.onmousemove = null;
        this.ele.onmouseup = null;
    }else{
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

//

