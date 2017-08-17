var dialogBg = document.getElementById('dialogBg'),
    dialog = document.getElementById('dialog'),
    dialogClose = document.getElementById('dialogClose');

document.body.onclick = function () {
    //->让弹出层显示
    utils.css(dialogBg, 'display', 'block');
    utils.css(dialog, 'display', 'block');

    //->让显示内容的提示框区域是从中间放大出来的
    animate(dialog, {
        width: 500,
        height: 400,
        marginLeft: -250,
        marginTop: -200,
        opacity: 1
    }, 200);
};

dialogClose.onclick = function (e) {
    utils.css(dialogBg, 'display', 'none');

    //->首先让弹出层先慢慢的消失
    animate(dialog, {
        width: 0,
        height: 0,
        marginLeft: 0,
        marginTop: 0,
        opacity: 0
    }, 200);
    //->问题：当我们动画结束后，应该让其display=none才可以

    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;//->阻止事件的传播
};