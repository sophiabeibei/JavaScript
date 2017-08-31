var oBox = document.getElementById('box');
//->JS中常用的盒子模型属性：获取元素的样式

//1、clientWidth / clientHeight：可视区域的宽度和高度
//-> clientWidth：width + padding(left&right)
//-> clientHeight：height + padding(top&bottom)
//=>和内容是否溢出以及是否设置了OVERFLOW没有关系,所谓的可视区域指的是一屏幕的区域,不含溢出的部分
// console.log(oBox.clientWidth, oBox.clientHeight);

//->获取当前浏览器可视窗口的宽度和高度(可视窗口:一屏幕的宽度或者高度)
// document.documentElement.clientWidth||document.body.clientWidth
// document.documentElement.clientHeight||document.body.clientHeight
//->操作当前浏览器的盒子模型属性,我们需要写两套
//=> document.documentElement.xxx 兼容大部分浏览器
//=> document.body.xxx 对于不兼容上述操作的浏览器使用这种办法获取


/*
 * 2、clientTop / clientLeft ：上边框或者左边框的宽度(BORDER-WIDTH值)
 * -> 没有clientRight和clientBottom这两个属性
 *
 * -> JS盒子模型属性获取的结果都是不带单位的
 * -> 获取的结果都是整数(会自动的把获取的结果四舍五入)
 */

/*
 * 3、offsetWidth / offsetHeight：在clientWidth&clientHeight的基础上加上边框即可
 *
 * -> 和内容是否溢出等没有任何的关系
 */

/*
 * 4、scrollWidth / scrollHeight
 *
 * -> 没有内容溢出的情况下
 *  scrollWidth = clientWidth
 *  scrollHeight = clientHeight
 *
 * -> 有内容溢出的情况下
 *  scrollHeight = paddingTop + 真实内容的高度(包含溢出的内容)
 *  scrollWidth = paddingLeft + 真实内容的宽度(包含溢出的内容)
 *
 *  是否设置OVERFLOW:HIDDEN对获取的结果是产生影响的,而且每个浏览器获取的结果也还都不太一样，所以我们的这两个属性值，在有内容溢出的情况下，我们获取的值都是约等于的值
 */
//->获取HTML页面的真实宽高(包含溢出的内容) '约等于的值'
// document.documentElement.scrollWidth||document.body.scrollWidth
// document.documentElement.scrollHeight||document.body.scrollHeight

//----------------------------------
/*以上的JS属性都是在特定的情况下使用(他们获取的是复合值)，如果想获取元素具体某一个样式属性的值，上述的属性就不合适了*/






