~function () {
    var obj = {
        isNumber: 'Number',
        isString: 'String',
        isBoolean: 'Boolean',
        isNull: 'Null',
        isUndefined: 'Undefined',
        isPlanObject: 'Object',
        isArray: 'Array',
        isRegExp: 'RegExp',
        isDate: 'Date',
        isFunction: 'Function'
    };
    var checkType = {};
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        checkType[key] = (function () {
            var className = obj[key];
            return function (val) {
                var reg = new RegExp('\\[object ' + className + '\\]');
                return reg.test(Object.prototype.toString.call(val));
            }
        })();
    }
    window.checkType = checkType;
}();


//->setCss：给某个元素的某一个样式属性设置一个值
/*
 * curEle['style'][attr] = value
 * =>我们在JS中设置元素的样式值,都只能把样式写在元素的行内样式上
 */
// function setCss(curEle, attr, value) {
//     curEle['style'][attr] = value;
// }
//=>完善：在执行这个方法的时候,如过传递的VALUE值没有设置单位,我们根据情况手动的加单位PX
/*
 * ->如果传递进来的是 width|height|margin|padding|margin(Top|Left|Right|Bottom)|padding(Top|Left|Right|Bottom)|top|left|right|bottom...
 * ->传递进来的值是纯数字
 *
 * 符合这两个的条件的,我们默认就把单位给加上即可
 */
//------------
// function setCss(curEle, attr, value) {
//     //->给VALUE设置单位
//     var reg = /^(width|height|((margin|padding)?(top|left|right|bottom)?))$/i;
//     if (reg.test(attr)) {
//         if (!isNaN(value)) {
//             value += 'px';
//         }
//     }
//     curEle['style'][attr] = value;
// }
//=>完善：我们对于一些不兼容的样式属性,在设置的时候,需要把所有的兼容情况考虑到
//---------------
function setCss(curEle, attr, value) {
    //->FLOAT
    if (attr.toLowerCase() === 'float') {
        curEle['style']['cssFloat'] = value;
        curEle['style']['styleFloat'] = value;
        return;
    }

    //->OPACITY
    if (attr.toLowerCase() === 'opacity') {
        curEle['style']['opacity'] = value;
        curEle['style']['filter'] = 'alpha(opacity=' + value * 100 + ')';
        return;
    }

    //->ADD PX
    var reg = /^(width|height|((margin|padding)?(top|left|right|bottom)?))$/i;
    if (reg.test(attr)) {
        if (!isNaN(value)) {
            value += 'px';
        }
    }
    curEle['style'][attr] = value;
}

/*
 * setGroupCss：批量设置一个元素的样式属性
 *
 * ->curEle：当前要操作的元素
 * ->options：[object] 对象中包含需要设置的样式属性
 * {
 *   width:100,
 *   height:200,
 *   ...
 * }
 */
function setGroupCss(curEle, options) {
    //->必须保证options是一个大括号包起来的对象(纯粹的对象)
    // if (Object.prototype.toString.call(options) !== '[object Object]') {
    //     return;
    // }
    if (!checkType.isPlanObject(options)) return;

    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            var value = options[attr];
            setCss(curEle, attr, value);
        }
    }
}

setGroupCss(box, {
    width: 200,
    height: 200,
    margin: 50,
    background: 'red',
    border: '10px solid green'
});

















