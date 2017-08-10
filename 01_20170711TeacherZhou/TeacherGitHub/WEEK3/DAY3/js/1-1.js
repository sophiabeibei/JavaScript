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
// console.log(checkType.isPlanObject({}));
console.log(checkType);