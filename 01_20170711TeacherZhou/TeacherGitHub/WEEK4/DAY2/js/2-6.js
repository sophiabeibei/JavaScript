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

//=>简易的动画库
//->curEle：当前要运动的元素
//->target：当前元素要运动的目标位置 {left:100,top:200...}
//->duration：运动的总时间(默认1000MS)
function animate(curEle, target, duration) {
    duration = duration || 1000;

    //->准备需要的T/B/C/D
    var time = 0;

    //->传递的TARGET中包含了需要运动方向的目标位置，此时我们需要根据传递的这些方向，计算出对应的BEGIN/CHANGE(各方向的起始位置和总距离)
    var begin = {},
        change = {};
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            //->key:top、left...存储就是需要改变的样式属性名
            begin[key] = utils.css(curEle, key);
            change[key] = target[key] - begin[key];
        }
    }

    //->实现动画
    window.clearInterval(curEle.animateTimer);//->当前元素的新动画运行之前,我们先结束现有正在执行的动画,防止两个动画冲突
    curEle.animateTimer = window.setInterval(move, 17);
    function move() {
        time += 17;

        //->当运动的时间已经超过总时间的时候,结束当前正在运行的动画,让元素运动到目标位置
        if (time >= duration) {
            utils.css(curEle, target);
            window.clearInterval(curEle.animateTimer);
            return;
        }

        //->通过公式计算当前的位置(根据传递的TARGET中的不同方向,我们计算每一个方向的当前位置),然后设置给当前的元素
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                var cur = animationEffect.Linear(time, begin[key], change[key], duration);
                utils.css(curEle, key, cur);
            }
        }
    }
}


//=>应用

animate(box, {
    top: 0,
    left: 0,
    width: 150,
    height: 150
}, 5000);

animate(box, {
    top: 300,
    left: 600,
    width: 50,
    height: 50
}, 5000);