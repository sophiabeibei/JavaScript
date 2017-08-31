//=>JS高阶编程技巧：惰性思想
/*
 * 第一次加载页面,在给utils赋值的时候,执行一个自执行函数,形成一个不销毁的私有作用域,在这个作用域中定义一个变量来存储当前的浏览器是否兼容某个属性或者方法
 *
 * 以后在getCss等其他的方法中,如果再需要判断是否兼容,就没必要在检测一次了,直接使用这个变量的值即可
 *
 * =>能够执行一次就解决的,绝对不执行多次,这种`懒思想`就是惰性思想,基于这个思想构造的单例模式是“高级单例模式”
 */
// var utils = (function () {
//     var isCompatible = 'getComputedStyle' in window;
//
//     function getCss(curEle, attr) {
//         if (isCompatible) {
//             return window.getComputedStyle(curEle, null)[attr];
//         } else {
//             return curEle.currentStyle[attr];
//         }
//     }
//
//     return {
//         getCss: getCss
//     }
// })();
//
// utils.getCss();
// utils.getCss();
// utils.getCss();
// utils.getCss();

//->JS的惰性思想：重构函数
//=>第一次执行函数,我们判断兼容哪一个,然后把方法进行重新赋值,让其只等于兼容的哪一个即可,第二次及以后再执行的时候,直接的运行重构后的方法,告别了复杂的判断
function getCss(curEle, attr) {
    if ('getComputedStyle' in window) {
        getCss = function (curEle, attr) {
            return window.getComputedStyle(curEle, null)[attr];
        };
    } else {
        getCss = function (curEle, attr) {
            return curEle.currentStyle[attr];
        };
    }
    return getCss(curEle, attr);
}

console.log(getCss(document.body, 'background'));













