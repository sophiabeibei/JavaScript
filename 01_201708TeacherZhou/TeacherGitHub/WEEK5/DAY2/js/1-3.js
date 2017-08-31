// document.body.onkeyup = function (e) {
//     //->KeyboardEvent：键盘事件对象
//     //1、相对于MouseEvent来说,没有clientX/clientY/pageX/pageY这些属性,其它的属性是存在的(type/target/preventDefault/stopPropagation...)
//     //2、key
//     //存储的是当前按下的是哪一个键(例如:'Enter')
//     //3、keyCode
//     //存储的是当前按键的编码(标准浏览器中也可以使用which)
//
//     e = e || window.event;
//     var keyNum = e.which || e.keyCode;
//     console.log(keyNum);
//
//     /*
//      SPACE：32
//      ENTER：13
//      BACK-SPACE：8
//      DEL：46
//      SHIFT：16
//      ALT：18
//      CTRL：17
//      ALT+TAB：9 (切换窗口)
//
//      LEFT：37
//      UP：38
//      RIGHT：39
//      DOWN：40
//
//      PAGE-UP:33
//      PAGE-DOWN:34
//
//      字母键：65~90 (a-z)
//      数字键：48~57 (0-9)
//
//      F5：116 (刷新页面)
//
//      ...
//      */
// };

//=>阻止页面按F5刷新页面(默认行为)
// document.onkeydown = document.onkeyup = document.onkeypress = function (e) {
//     e = e || window.event;
//     var keyNum = e.which || e.keyCode;
//     if (keyNum === 116) {
//         e.keyCode = 0;//->IE下想要禁止F5,还需要让KEY-CODE为零
//         e.preventDefault ? e.preventDefault() : e.returnValue = false;
//     }
// };


//=>推盒子
var minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - box.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - box.offsetHeight;

document.onkeydown = document.onkeypress = document.onkeyup = function (e) {
    e = e || window.event;
    var keyNum = e.which || e.keyCode,
        curL = utils.css(box, 'left'),
        curT = utils.css(box, 'top');
    switch (keyNum) {
        case 37:
            curL -= 100;
            break;
        case 38:
            curT -= 100;
            break;
        case 39:
            curL += 100;
            break;
        case 40:
            curT += 100;
            break;
    }
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

    zhufengAnimate({
        curEle: box,
        target: {
            left: curL,
            top: curT
        },
        duration: 300
    });


    //->按SPACE键蹦一下
    if (keyNum === 32) {
        zhufengAnimate({
            curEle: box,
            target: {top: curT - 100},
            duration: 200,
            effect: zhufengEffect.Back.easeOut,
            callBack: function () {
                zhufengAnimate({
                    curEle: box,
                    target: {top: curT + 100},
                    duration: 200,
                    effect: zhufengEffect.Bounce.easeOut
                });
            }
        });
    }
};
















