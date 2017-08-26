var box = document.getElementById("boc"),
    mark = document.getElementById("mark");

//=>计算mark盒子的位置
function computedPosition(e) {
    //->this: box    e: 传递的事件对象
    e = e || window.event;
    var l = e.clientX - this.offsetLeft,
        t = e.clientY - this.offsetTop;
    mark.style.left = l + +10 + "px";
    mark.style.top = t + +10 + "px";
}


box.onmouseover = function (e) {
    mark.style.display = "block";
    //->让mark紧挨着鼠标
    computedPosition.call(this, e);
};
box.mousemove = computedPosition;
box.onmouseleave = function () {
    mark.style.display = 'none';
};

