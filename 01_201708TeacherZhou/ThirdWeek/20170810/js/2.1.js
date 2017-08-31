/*
* offsetLeft / offsetTop  /  offsetParent
* //=>获取当前元素的  左偏移 / 上偏移  / 父级参照物
* */

//1.offsetParent: 获取当前元素的父级参照物
//->在默认的情况下,body中出现的所有元素的父级参照物都是body(因为在同一个平面上),body本身的父级参照物是null
//->我们通过设置position定位,可以让元素脱离文档流,从而改变元素的父级参照物
var outer = document.getElementById("outer"),
    inner = document.getElementById("inner"),
    center = document.getElementById("center");







console.log(offset(center));