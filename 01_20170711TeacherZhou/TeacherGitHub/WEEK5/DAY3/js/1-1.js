outer.onclick = function () {
    console.log('I AM OUTER');
};

inner.onclick = function (e) {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;//=>阻止浏览器的冒泡传播机制,此时传播到INNER,就把传播链截断了
    console.log('I AM INNER');
};

center.onclick = function () {
    console.log('I AM CENTER');
};



