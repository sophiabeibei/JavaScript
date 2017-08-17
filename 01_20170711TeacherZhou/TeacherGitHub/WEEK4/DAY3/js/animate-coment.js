//=>珠峰培训TWEEN算法动画公式
var animationEffect = {
    //->匀速运动
    Linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    //->指数衰减的反弹缓动
    Bounce: {
        easeIn: function (t, b, c, d) {
            return c - animationEffect.Bounce.easeOut(d - t, 0, c, d) + b;
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
                return animationEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            }
            return animationEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    },
    //->二次方的缓动
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
    //->三次方的缓动
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
    //->四次方的缓动
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
    //->五次方的缓动
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
    //->正弦曲线的缓动
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
    //->指数曲线的缓动
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
    //->圆形曲线的缓动
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
    //->超过范围的三次方缓动
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
    //->指数衰减的正弦曲线缓动
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


//=>随着我们的动画库需要传递的实参越来越多的时候,我们发现定义形参变量接收传递内容的方式已经不好去操控了
//1、传递的时候需要按照顺序依次传递,如果顺序混乱,接收的值也乱了
//2、轻易不能出现不传参给默认的情况,因为其中一个不传,拿后面传递的值会整体都向前靠一位
//...

//=>真正项目中如果一个方法需要传递的实参很多的话,我们都会告别形参的时代,开启对象统一处理参数的时代
//options：对象,对象中存储了我们需要传递给函数的内容
// {
//     curEle:你传递的需要操作的元素,
//     target:目标位置的样式值,
//     duration:总运动时间,
//     effect:运动的动画效果,
//     callBack:动画完成后执行的回调函数
// }
//->这五个属性我们先给它一些默认值,传递的时候有些属性值可以不传递,我们把传递进来的属性值替换默认的值
//1、我们在传递的时候不一定要按照顺序了,只要指定好对应的属性名即可
//2、不想传递的也可以不传递了,不传递的走默认值即可
function animate(options) {
    //->参数初始化
    var _default = {
        curEle: null,
        target: null,
        duration: 1000,
        effect: animationEffect.Linear,
        callBack: null
    };
    //->循环传递的options,让传递的值覆盖默认值
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            _default[attr] = options[attr];
        }
    }
    //->以后操作都使用_default.xxx(麻烦),我们最好在把其每一项都设置为私有的变量
    var curEle = _default.curEle,
        target = _default.target,
        duration = _default.duration,
        effect = _default.effect,
        callBack = _default.callBack;
    // for (attr in _default) {
    //     if (_default.hasOwnProperty(attr)) {
    //         eval('var ' + attr + '=_default["' + attr + '"]');
    //     }
    // }


    var time = 0,
        begin = {},
        change = {};
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            begin[key] = utils.css(curEle, key);
            change[key] = target[key] - begin[key];
        }
    }

    window.clearInterval(curEle.animateTimer);
    curEle.animateTimer = window.setInterval(function () {
        time += 17;
        if (time >= duration) {
            utils.css(curEle, target);
            window.clearInterval(curEle.animateTimer);

            //->动画完成后执行回调函数:让回调函数中的THIS是当前需要操作的元素
            callBack && callBack.call(curEle);
            return;
        }
        var current = {};
        for (var key in target) {
            if (!target.hasOwnProperty(key)) continue;
            current[key] = effect(time, begin[key], change[key], duration);
        }
        utils.css(curEle, current);
    }, 17);
}