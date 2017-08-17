//->utils：common method libraries used in projects
var utils = (function () {
    var isHighVersion = 'getComputedStyle' in window;

    //->toArray：converts a like array into an array
    function toArray(likeAry) {
        var ary = [];
        if (isHighVersion) {
            ary = [].slice.call(likeAry);
        } else {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON：converts a string to a JSON object
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    //->getCss：gets the style property value of the element
    function getCss(curEle, attr) {
        var val = null;
        if (isHighVersion) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr.toLowerCase() === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity=(.+)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        var temp = parseFloat(val);
        val = isNaN(temp) ? val : temp;
        return val;
    }

    //->setCss：sets the style property value of an element
    function setCss(curEle, attr, value) {
        if (attr.toLowerCase() === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + (value * 100) + ')';
            return;
        }

        var unitReg = /^(zIndex|fontWeight)$/i;
        if (!isNaN(value) && !unitReg.test(attr)) {
            value += 'px';
        }
        curEle['style'][attr] = value;
    }

    //->setGroupCss：sets the style attribute values of elements in batch settings
    function setGroupCss(curEle, options) {
        if (Object.prototype.toString.call(options) !== '[object Object]') return;
        for (var attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(curEle, attr, options[attr]);
            }
        }
    }

    //->css：the style attributes of the operation element include settings individually, batch settings, access styles, and so on
    function css() {
        var arg = arguments,
            len = arg.length,
            fn = getCss;
        if (len >= 3) fn = setCss;
        if (len === 2 && typeof arg[1] === 'object') fn = setGroupCss;
        return fn.apply(null, arg);
    }

    //->offset：gets the offset of the current element distance BODY => {left:xxx,top:xxx}
    function offset(curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while (p && p !== document.body) {
            if (!/MSIE 8/i.test(navigator.userAgent)) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t};
    }

    //->win：operate the box model properties about the browser
    function win(attr, value) {
        if (typeof value !== 'undefined') {
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    //->prev：gets the last brother element node
    function prev(curEle) {
        if (isHighVersion) {
            return curEle.previousElementSibling;
        }
        var p = curEle.previousSibling;
        while (p && p.nodeType !== 1) {
            p = p.previousSibling;
        }
        return p;
    }

    //->next：gets the next brother element node
    function next(curEle) {
        if (isHighVersion) return curEle.nextElementSibling;
        var n = curEle.nextSibling;
        while (n && n.nodeType !== 1) {
            n = n.nextSibling;
        }
        return n;
    }

    //->prevAll：gets all brother element nodes
    function prevAll(curEle) {
        var ary = [],
            p = curEle.previousSibling;
        while (p) {
            if (p.nodeType === 1) {
                ary.unshift(p);
            }
            p = p.previousSibling;
        }
        return ary;
    }

    //->nextAll：gets all the brother element nodes
    function nextAll(curEle) {
        var ary = [],
            n = curEle.nextSibling;
        while (n) {
            if (n.nodeType === 1) {
                ary.push(n);
            }
            n = n.nextSibling;
        }
        return ary;
    }

    //->siblings：gets all sibling element nodes
    function siblings(curEle) {
        return prevAll(curEle).concat(nextAll(curEle));
    }

    //->index：gets the index of the current element
    function index(curEle) {
        return prevAll(curEle).length;
    }

    //->firstChild：gets the first element child node of the current container
    function firstChild(curEle) {
        if (isHighVersion) return curEle.firstElementChild;
        var f = curEle.firstChild;
        while (f && f.nodeType !== 1) {
            f = f.nextSibling;
        }
        return f;
    }

    //->lastChild：gets the last element child node of the current container
    function lastChild(curEle) {
        if (isHighVersion) return curEle.lastElementChild;
        var l = curEle.lastChild;
        while (l && l.nodeType !== 1) {
            l = l.previousSibling;
        }
        return l;
    }

    //->children：gets all element child nodes of the container
    function children(curEle, tag) {
        var ary = [],
            nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            if (cur.nodeType === 1) {
                if (typeof tag !== 'undefined') {
                    cur.tagName.toUpperCase() === tag.toUpperCase() ? ary.push(cur) : null;
                    continue;
                }
                ary.push(cur);
            }
        }
        return ary;
    }

    //->byClass：getElementsByClassName compliant processing, in the specified context, gets the elements that have these style classes by passing the style name class name
    function byClass(strClass, context) {
        context = context || document;
        if (isHighVersion) return [].slice.call(context.getElementsByClassName(strClass));

        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        var tagList = context.getElementsByTagName('*'),
            result = [];
        for (var i = 0; i < tagList.length; i++) {
            var item = tagList[i],
                itemClass = item.className;
            var isMatch = true;
            for (var k = 0; k < strClass.length; k++) {
                var reg = new RegExp('(^| +)' + strClass[k] + '( +|$)');
                if (!reg.test(itemClass)) {
                    isMatch = false;
                    break;
                }
            }
            isMatch ? result.push(item) : null;
        }
        return result;
    }

    //->hasClass：verify that the current element has a style name
    function hasClass(curEle, strClass) {
        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        var isMatch = true,
            originalClass = curEle.className;
        for (var i = 0; i < strClass.length; i++) {
            var item = strClass[i];
            var reg = new RegExp('(^| +)' + item + '( +|$)');
            if (!reg.test(originalClass)) {
                isMatch = false;
                break;
            }
        }
        return isMatch;
    }

    //->addClass：increase the element's style name class name
    function addClass(curEle, strClass) {
        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        for (var i = 0; i < strClass.length; i++) {
            var item = strClass[i];
            if (hasClass(curEle, item)) continue;
            curEle.className += ' ' + item;
        }
        curEle.className = curEle.className.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    }

    //->removeClass：removes the name of the element's style class name
    function removeClass(curEle, strClass) {
        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        var originalClass = curEle.className.replace(/\s+/g, '  ');
        for (var i = 0; i < strClass.length; i++) {
            var item = strClass[i],
                reg = new RegExp('(^| )' + item + '( |$)', 'g');
            reg.test(originalClass) ? originalClass = originalClass.replace(reg, ' ') : null;
        }
        curEle.className = originalClass.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    }

    //->append：appends elements at the end of the container
    function append(curEle, parent) {
        parent.appendChild(curEle);
    }

    //->prepend：appends elements to the beginning of the container
    function prepend(curEle, parent) {
        var first = firstChild(parent);
        first ? parent.insertBefore(curEle, first) : parent.appendChild(curEle);
    }

    //->insertBefore：before appending to the specified element
    function insertBefore(curEle, oldEle) {
        oldEle.parentNode.insertBefore(curEle, oldEle);
    }

    //->insertAfter：after appending to the specified element
    function insertAfter(curEle, oldEle) {
        var nex = next(oldEle),
            p = oldEle.parentNode;
        nex ? p.insertBefore(curEle, nex) : p.appendChild(curEle);
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        css: css,
        offset: offset,
        win: win,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        children: children,
        byClass: byClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter
    }
})();
