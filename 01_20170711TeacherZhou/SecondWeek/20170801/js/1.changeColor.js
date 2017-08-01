
var ary = ["red","orange","yellow","green","blue"];
var btnList = document.getElementsByName("color");





//return处理方式1
for (var i = 0; i < btnList.length; i++) {
    btnList[i].onclick = (function (n) {
        return function(){
            document.body.style.backgroundColor = ary[n];
        }
    })(i);
}




//闭包处理方式2
/*for (var i = 0; i < btnList.length; i++) {
    ~function(i){
        btnList.onclick = function () {
            document.body.style.backgroundColor = ary[i];
        }
    }();
}*/





//自定义属性处理方式3
/*for (var i = 0; i < btnList.length; i++) {
    btnList[i].index = i;
    btnList.onclick = function () {
        document.body.style.backgroundColor = ary[this.index];
        //->this.index: 当前点击按钮自定义属性中存储的值(按钮的索引)
    }
}*/








//以下操作不可以: 异步&&作用域链
/*for (var i = 0; i < btnList.length; i++) {
    var cur = btnList[i];
    btnList[i].onclick = function () {
        //->我们当前点击这个按钮的索引,正好是我们在ARY中获取对应颜色的索引 =>ary[索引]: 获取需要的颜色;
        //->1.异步编程: 所以的事件绑定都是异步编程,当我们点击触发形成的时候,循环已经结束了;2.作用域链: 用到变量i向上级查找,上级的i已经变成了5;
        document.body.style.backgroundColor = ary[]
    }
}*/






