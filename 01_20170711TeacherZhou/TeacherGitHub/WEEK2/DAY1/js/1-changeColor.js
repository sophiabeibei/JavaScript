var ary = ['red', 'orange', 'yellow', 'green', 'blue'];
var btnList = document.getElementsByName('color');

//=>闭包处理
// for (var i = 0; i < btnList.length; i++) {
//     ~function (i) {
//         btnList[i].onclick = function () {
//             document.body.style.backgroundColor = ary[i];
//         }
//     }(i);
// }

for (var i = 0; i < btnList.length; i++) {
    btnList[i].onclick = (function (n) {
        return function () {
            document.body.style.backgroundColor = ary[n];
        }
    })(i);
}
//---------------------------------------------
//=>自定义属性方法
// for (var i = 0; i < btnList.length; i++) {
//     btnList[i].index = i;
//     btnList[i].onclick = function () {
//         document.body.style.backgroundColor = ary[this.index];
//         //->this.index:当前点击按钮自定义属性中存储的值(按钮的索引)
//     }
// }

//----------------------------------------------
//->以下操作不可以:异步&&作用域链
// for (var i = 0; i < btnList.length; i++) {
//     btnList[i].onclick = function () {
//         //->我们当前点击这个按钮的索引,正好是我们在ARY中获取对应颜色的索引 =>ARY[索引]:获取需要的颜色
//         document.body.style.backgroundColor = ary[i];
//     }
// }