Array.prototype.myForEach = function myForEach() {
    //->this:需要处理的数组
    var callBack = arguments[0],
        context = arguments[1];
    //->兼容
    if ('forEach' in Array.prototype) {
        this.forEach(callBack, context);
        return;
    }

    //->不兼容(IE6~8)
    for (var i = 0; i < this.length; i++) {
        callBack && callBack.call(context, this[i], i, this);
    }
};

var obj = {name: 'zhufeng'};
[12, 23, 34, 45].myForEach(function (item, index, input) {
    console.log(item, index, input);
}, obj);