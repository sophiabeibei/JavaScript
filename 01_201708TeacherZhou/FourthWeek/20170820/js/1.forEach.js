Array.prototype.myForEach = function myForEach() {
    var callBack = arguments[0],
        //->|| undefined可以不写,毕竟不传也是undefined
        context = arguments[1] || undefined;
    //->兼容不需要处理,直接执行下面方法
    if("forEach" in window){
        this.forEach(callBack,context);
    }
    //->myForEach this: 需要处理的数组
    //->不兼容,这样处理;
    //->数组中有多少箱,就遍历多少次
    for (var i = 0; i < this.length; i++) {
        callBack && callBack.call(context,this[i],i,this);//->给callBack传三个值
    }
};

var obj = {name: "zhufeng"};
[12,23,34,45].myForEach(function (item, index, input) {//->数组中有多少箱,回调函数就会执行多少次
    console.log(item, index, input);
},obj);














