var utils = (function () {
    /*
     * toArray：Converts an array of classes to an array
     * @parameter：
     *   likeAry[object]：Class array to convert
     * @return：
     *   ary[Array]：Convert completed array
     * By Team on 2017-04-16 12:44
     */
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0, len = likeAry.length; i < len; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    /*
     * toJSON：Convert JSON string to JSON object
     * @parameter：
     *   str[String]：JSON string
     * @return：
     *   obj[Object]：JSON object
     * By Team on 2017-04-16 12:48
     */
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    /*
     * getCss：Gets the value of the specific style property for the current element
     * @parameter：
     *   curEle[object]：current element
     *   attr[string]：style properties of elements
     * @return：
     *   Style attribute values for elements
     * By Team on 2017-04-23 12:29
     */
    function getCss(curEle, attr) {
        var val = null,
            reg = null;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            //->IE6~8
            switch (attr) {
                case 'filter':
                case 'opacity':
                    val = curEle.currentStyle['filter'];
                    reg = /alpha\(opacity=(.+)\)/i;
                    val = reg.test(val) ? RegExp.$1 / 100 : 1;
                    break;
                default:
                    val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)$/i;
        val = reg.test(val) ? parseFloat(val) : val;
        return val;
    }

    /*
     * getCss：Set the style property value for an element，Setting inline styles for elements
     * @parameter：
     *   curEle[object]：current element
     *   attr[string]：style properties of elements
     *   value：set style property value
     * By Team on 2017-04-23 15:36
     */
    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle['style']['cssFloat'] = value;
            curEle['style']['styleFloat'] = value;
            return;
        }
        if (attr === 'opacity') {
            curEle['style']['opacity'] = value;
            curEle['style']['filter'] = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /^(?:width|height|(?:(?:margin|padding)?(?:top|left|right|bottom)))$/i;
        if (reg.test(attr)) {
            !isNaN(value) ? value += 'px' : null;
        }
        curEle['style'][attr] = value;
    }

    /*
     * setGroupCss：Set the style attribute value for the batch
     * @parameter：
     *   curEle[object]：current element
     *   styleCollection[object]：style collection
     * By Team on 2017-04-23 15:36
     */
    function setGroupCss(curEle, styleCollection) {
        for (var key in styleCollection) {
            if (styleCollection.hasOwnProperty(key)) {
                setCss(curEle, key, styleCollection[key]);
            }
        }
    }

    /*
     * css：The style properties of the operating element, including the capture style, the individual settings style, and the batch settings style
     * @parameter：
     *   curEle[object]：current element
     * By Team on 2017-04-23 15:36
     */
    function css() {
        var arg = arguments;
        if (arg.length >= 3) {
            //->SET CSS
            setCss.apply(this, arg);
            return;
        }
        if (arg.length === 2 && typeof arg[1] === 'object') {
            //->SET GROUP CSS
            setGroupCss.apply(this, arg);
            return;
        }
        return getCss.apply(this, arg);
    }

    /*
     * offset：Gets the offset of the current element distance BODY
     * @parameter：
     *   curEle[object]：current element
     * @return：
     *   [object]：{top:xxx,left:xxx}
     * By Team on 2017-04-23 16:43
     */
    function offset(curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf('MSIE 8') === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        css: css,
        offset: offset,
        win: win
    }
})();
