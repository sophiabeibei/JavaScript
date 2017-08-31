
function setCss(curEle, attr, value) {
    if(attr.toLowerCase() === "opacity"){
        curEle.style.opacity = value;
        curEle.style.filter = "alpha(opacity = "+ (value*100)+")"
        return;
    }
    var unitReg = /^(opancity|zIndex|fontWeight)$/i;
    if(!isNaN(value) && !unitReg.test(attr)){
        value += "px";
    }
    curEle["style"][attr] = value;
}


// ------------------------------------------------------
//批量设置元素的样式
function setGroupCss(curEle,options) {
    //->检测数据类型
    //->把大括号包起来的对象,理解为纯对象;说明options是个纯对象;
    if(Object.prototype.toString.call(options) !== "[Object Object]") return;//条件成立,说明不是纯对象
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            setCss(curEle,attr,options[attr]);
        }
    }
}
/*setGroupCss(box,{
    width: 300,
    opacity: 0.5,
    height: 200,
    overflow: "hidden",
    margin: "20px auto"
});*/






//setGroupCss