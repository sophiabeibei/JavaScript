'use strict';
~function () {
    /*--Tool Library--*/
    var tool = (function () {
        var flag = 'getComputedStyle' in window;

        //->GET CSS
        function getCss(curEle, attr) {
            var val = null,
                reg = null;
            //->get value
            if (flag) {
                val = window.getComputedStyle(curEle, null)[attr];
            } else {
                //->IE6~8
                if (attr === 'opacity') {
                    val = curEle.currentStyle['filter'];
                    reg = /^alpha\(opacity=(.+)\)$/i;
                    val = reg.test(val) ? RegExp.$1 / 100 : 1;
                } else {
                    val = curEle.currentStyle[attr];
                }
            }
            //->remove unit
            reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i;
            reg.test(val) ? val = parseFloat(val) : null;
            return val;
        }

        //->SET CSS
        function setCss(curEle, attr, value) {
            //->opacity handle
            if (attr === 'opacity') {
                curEle.style.opacity = value;
                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            }

            //->add unit
            var reg = /^(width|height|((margin|padding)?(top|left|right|bottom)?))$/i;
            reg.test(attr) ? (!isNaN(value) ? value = value + 'px' : null) : null;
            curEle['style'][attr] = value;
        }

        //->SET GROUP CSS
        function setGroupCss(curEle, options) {
            for (var attr in options) {
                if (options.hasOwnProperty(attr)) {
                    setCss.call(this, curEle, attr, options[attr]);
                }
            }
        }

        return {
            css: function () {
                //->set css
                if (arguments.length >= 3) {
                    setCss.apply(this, arguments);
                    return;
                }
                //->set group css
                if (arguments.length === 2 && typeof arguments[1] === 'object') {
                    setGroupCss.apply(this, arguments);
                    return;
                }
                //->get css
                return getCss.apply(this, arguments);
            },
            each: function (option, callBack) {
                if (typeof option === 'object' && 'length' in option) {
                    for (var i = 0; i < option.length; i++) {
                        var cur = option[i];
                        callBack && callBack.call(option, cur, i);
                    }
                    return;
                }
                for (var attr in option) {
                    if (option.hasOwnProperty(attr)) {
                        callBack && callBack.call(option, option[attr], attr);
                    }
                }
            }
        }
    })();

    //->http://old.zhufengpeixun.cn/tween/
    var tweenEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - tweenEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return tweenEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return tweenEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };

    /*
     * animate：animation library
     * @para：
     *   curEle[HTMLElement]：current element
     *   target[object]：target location set
     *   duration[number]：total time of movement (milliseconds)
     *   effect[string]：current animation formula
     *   callBack[function]：callback function that executes this method when the animation is over
     *
     * By Team on 2017/04/30 11:17:00
     */
    function animate(curEle, target, duration, effect, callBack) {
        //->init parameter
        if (typeof effect === 'undefined') {
            effect = tweenEffect.Linear;
        } else if (typeof effect === 'string') {
            effect = eval('tweenEffect.' + effect);
        } else if (typeof effect === 'function') {
            callBack = effect;
            effect = tweenEffect.Linear;
        }

        //->init options
        var times = null,
            begin = {},
            change = {};
        tool.each(target, function (value, attr) {
            begin[attr] = tool.css(curEle, attr);
            change[attr] = value - begin[attr];
        });

        //->moving
        window.clearInterval(curEle.animateTimer);
        curEle.animateTimer = window.setInterval(function () {
            times += 17;
            if (times >= duration) {
                window.clearInterval(curEle.animateTimer);
                tool.css(curEle, target);
                callBack && callBack.call(curEle);
                return;
            }
            tool.each(target, function (value, attr) {
                var curP = effect(times, begin[attr], change[attr], duration);
                tool.css(curEle, attr, curP);
            });
        }, 17);
    }

    window.zhufengAnimate = animate;
}();