outer.onclick = function () {
    console.log("I am outer");
};
inner.onclick = function (e) {
    e = e||window.event;
    e.stopPropagation?e.stopPropagation():e.cancelBubble = true;//=>阻止浏览器的冒泡传播机制,此时传播到inner,就把传播链截断了
    console.log("I am inner");
};
center.onclick = function () {
    console.log("I am center");
};


//->e: MouseEvent {isTrusted: true, screenX: 344, screenY: 189, clientX: 344, clientY: 99…}
/*传播的三种机制:
AT_TARGET:2
BUBBLING_PHASE:3
CAPTURING_PHASE:1
*/



/*
本案例重点掌握:
   阻止浏览器的冒泡传播机制 e.stopPropagation
        此时传播到inner,就把传播链截断了

*/