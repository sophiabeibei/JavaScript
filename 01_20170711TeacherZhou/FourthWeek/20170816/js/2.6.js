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



//-----------------------------------------------源码
// //->写一个动画库: 让当前元素的一些样式在一定时间内发生改变(只支持三个的animate动画效果的方法)
// //=>简易的动画库
// /**
//  *
//  * @param curEle: 当前元素
//  * @param target: Object 目标位置{left: 100,top: 200...}
//  * @param duration: 要运动的总时间(默认时间1000ms)
//  */
// function animate(curEle,target,duration) {
//     duration = duration || 1000;
//
//     //实现匀速运动要准备t,b,c,d的值;
//     var time=0;
//
//     //->传递的target中包含了需要运动方向的目标位置;此时我们需要根据传递的这些方向,计算出对应的begin(各方向起始位置)以及change(总距离);
//     var begin = {},
//         change = {};
//     for (var key in target) {
//         if (target.hasOwnProperty(key)) {//->key: 就是top/left...
//             //->获得当前元素curEle的属性key对应的起始位置;
//             begin[key] = utils.css(curEle,key);
//             //->获取总距离
//             change[key] = target[key]-begin[key];
//         }
//     }
//     //->实现动画
//     window.clearInterval(curEle.animateTimer);//->设置一个动画之前
//     //->animateTimer: 专门给animate用的timer
//     curEle.animateTimer = window.setInterval(move,17);
//
//     function move() {
//         time+=17;
//
//         //->当运动的时间已经超过总时间的时候,结束当前正在运行的动画,让元素运动到目标位置
//         if(time >= duration){
//             utils.css(curEle,target);
//             clearInterval(curEle.animateTimer);
//             return
//         }
//         //->通过公式计算当前的位置;根据传递的target中的不同方向,我们计算每一个方向的当前位置;然后 设置给当前的元素curEle
//         for (var key in target) {
//             if (target.hasOwnProperty(key)) {
//                 var cur = animationEffect.Back.easeOut(time, begin[key], change[key], duration);
//                 utils.css(curEle,key,cur);
//             }
//         }
//     }
// }



// //-----------------------------------------------裸码 --这个有问题存在,看最下面一行
// //->写一个动画库: 让当前元素的哪些样式在多长时间内发生改变(只支持三个的animate动画效果的方法)
// //=>简易的动画库
// /**
//  *
//  * @param curEle: 当前元素
//  * @param target: {Object} 目标位置是各个对象{left: 100,top: 200...}
//  * @param duration: 要运动的总时间(默认时间1000ms)
//  */
// function animate(curEle, target, duration) {
//     duration = duration || 1000;
//     var time = 0;
//     var begin = {},
//         change = {};
//     for (var key in target) {
//         if (target.hasOwnProperty(key)) {
//             begin[key] = utils.css(curEle, key);
//             change[key] = target[key] - begin[key];
//         }
//     }
//     curEle.animateTimer = window.setInterval(move, 17);
//     function move() {
//         time += 17;
//         if (time >= duration) {
//             utils.css(curEle, target);
//             clearInterval(curEle.animateTimer);
//             return
//         }
//         for (var key in target) {
//             if (target.hasOwnProperty(key)) {
//                 var cur = animationEffect.Back.easeOut(time, begin[key], change[key], duration);
//                 utils.css(curEle, key, cur);
//             }
//         }
//     }
// }
// animate(box, {top: 300,left: 400,width: 10,height: 10,opacity: 0.2}, 50000);
// animate(box, {top: 400,left: 100,width: 50,height: 50,opacity: 0.5}, 40000);
// //->问题: 当有两个动画的时候,会闪;!!!!!!!!!!!!下面是优化




//-----------------------------------------------优化一: 一个元素两个动画,防止两个动画冲突
//->写一个动画库: 让当前元素的哪些样式在多长时间内发生改变(只支持三个的animate动画效果的方法)
//=>简易的动画库
/**
 *
 * @param curEle: 当前元素
 * @param target: {Object} 目标位置是各个对象{left: 100,top: 200...}
 * @param duration: 要运动的总时间(默认时间1000ms)
 */
function animate(curEle, target, duration) {
    duration = duration || 1000;
    var time = 0;
    var begin = {},
        change = {};
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            begin[key] = utils.css(curEle, key);
            change[key] = target[key] - begin[key];
        }
    }
    window.clearInterval(curEle.animateTimer);//->优化一: 一个元素两个动画,防止两个动画冲突
    curEle.animateTimer = window.setInterval(move, 17);
    function move() {
        time += 17;
        if (time >= duration) {
            utils.css(curEle, target);
            clearInterval(curEle.animateTimer);
            return
        }
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                var cur = animationEffect.Back.easeOut(time, begin[key], change[key], duration);
                utils.css(curEle, key, cur);
            }
        }
    }
}
animate(box, {top: 400,left: 100,width: 50,height: 50,opacity: 0.5}, 40000);
animate(box, {top: 300,left: 400,width: 10,height: 10,opacity: 0.2}, 50000);


















