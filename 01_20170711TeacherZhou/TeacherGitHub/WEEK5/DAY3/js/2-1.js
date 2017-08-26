var box = document.getElementById('box'),
    mark = document.getElementById('mark');

//=>计算MARK盒子的位置
function computedPosition(e) {
    //->THIS:BOX  E:传递的事件对象
    e = e || window.event;
    var l = e.clientX - this.offsetLeft,
        t = e.clientY - this.offsetTop;
    mark.style.left = l + 10 + 'px';
    mark.style.top = t + 10 + 'px';
}

box.onmouseenter = function (e) {
    mark.style.display = 'block';
    //->让MARK紧挨着鼠标
    computedPosition.call(this, e);
};

box.onmousemove = computedPosition;

box.onmouseleave = function () {
    mark.style.display = 'none';
};