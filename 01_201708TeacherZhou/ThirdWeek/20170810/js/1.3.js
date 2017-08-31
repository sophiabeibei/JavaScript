/**
 * setCss: 给某个元素的某一个样式属性设置一个值
 * 这个方法不需要有返回值;只设置就可以了;
 */
/*
* curEle["style"][attr] = value; 在JS中,我们设置元素的样式值,都只能把样式写在行内样式上;
*
* */


//=>完善: 在执行这个方法的时候,如果传递的value值没有设置单位,我们根据情况手动加单位px;
/*
* 如果传递进来的是 width|height|margin|padding|margin(top|left|right|bottom)|top|left|right|bottom....
* 传递进来的是纯数字
*
* 符合这两个的条件的,我们默认就把单位加上即可
* */
//-------------------------------------------
function setCss(curEle, attr, value) {
    //->float(处理或不处理都无所谓)
    if (attr.toLocaleLowerCase() === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
        return;
    }

    //->opacity兼容处理
    if (attr.toLocaleLowerCase() === "opacity") {
        curEle["style"]["opacity"] = value;
        curEle["style"]["filter"] = 'alpha(opacity=' + value * 100 + ')';
        return;
    }

    //->给value设置单位
    var reg = /^(width|height|((margin|padding)?(top|right|bottom|left)?))$/i;
    if (reg.test(attr)) {
        if (!isNaN(value)) {
            value += "px";
        }
    }
    curEle['style'][attr] = value;
}
console.log(setCss(document.body, "opacity", 0.2));

/**
 * setGroupCss: 批量设置一个元素的样式属性
 * @param curEle: 当前要操作的元素
 * @param options: 对象中包含需要设置的样式属性
 * {
 *   width: 100,
 *   height: 200,
 *   ....
 * }
 *
 */


function setGroupCss(curEle, options) {
    //->必须保证options是一个大括号包起来的对象
    //if(!checkType.isPlanObject(options)) return;
    if(({}).toString.call(options) !== "[Object Object]"){//({}).toString.call(options)
        // <=>Object.toString.call(options)
        return;
    }
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            var value = options[attr];
            setCss(curEle,attr,value);
        }
    }
}

setGroupCss(box,{
    width: 100,
    height: 100,
    backgroundColor: red
});






