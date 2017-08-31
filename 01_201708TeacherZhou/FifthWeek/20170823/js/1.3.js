document.body.onkeyup = function () {

};






//=>推盒子
var minL=0,
    minT=0,
    maxL=(document.documentElement.clientWidth || document.body.clientWidth)-box.offsetWidth;
    maxT=(document.documentElement.clientHeight || document.body.clientHeight)-box.offsetHeight;
document.onkeydown = document.onkeyup = document.onkeypress = function(e){
    //->事件对象兼容处理
    e = e || window.event;

    //=>按四个(上下左右)键实现操作
    var keyNum = e.which || e.keyCode,
        curL = utils.css(box,"left"),
        curT = utils.css(box,"top");

    switch (keyNum){
        case 37:
            curL-=100;
            break;
        case 38:
            curT-=100;
            break;
        case 39:
            curL+=100;
            break;
        case 40:
            curT+=100;
            break;
    }
    curL=curL<minL?minL:(curL>maxL?maxL:curL);
    curT=curT<minT?minT:(curT>maxT?maxT:curT);
    animate({
        curEle: box,
        target: {
            left: curL,
            top: curT
        },
        duration: 300
    });

    //->按space键蹦一下
    if(keyNum === 32){
        animate({
            curEle: box,
            target: {
                top: curT - 100
            },
            duration: 200,
            effect: animationEffect.Back.easeOut,
            callBack: function () {
                animate({
                    curEle: box,
                    target: {
                        top: curT
                    },
                    duration: 200,
                    effect: animationEffect.Bounce.easeOut
                });
            }
        });
    }

};














