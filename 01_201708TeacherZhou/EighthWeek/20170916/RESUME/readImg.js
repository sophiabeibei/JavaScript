var fs = require("fs");
var res = fs.readdirSync("./img");
res = res.map(function (item, index) {
    return `img/${item}`;
});
console.log(res);



//在webStorm的下面任务栏找"Terminal"页卡;再把本文件readImg.js所在的文件夹拽到这个"Terminal"页卡中;最后在命令行执行命令"node readImg.js";即可出来列表;
/*当我们执行node readImg.js
 就会生产readImg.txt，文件里面就包含了我们想要的路径。*/

/*
[ 'img/icon.png',
    'img/music.svg',
    'img/zf_concatAddress.png',
    'img/zf_concatInfo.png',
    'img/zf_concatPhone.png',
    'img/zf_course.png',
    'img/zf_course1.png',
    'img/zf_course2.png',
    'img/zf_course3.png',
    'img/zf_course4.png',
    'img/zf_course5.png',
    'img/zf_course6.png',
    'img/zf_cube1.png',
    'img/zf_cube2.png',
    'img/zf_cube3.png',
    'img/zf_cube4.png',
    'img/zf_cube5.png',
    'img/zf_cube6.png',
    'img/zf_cubeBg.jpg',
    'img/zf_cubeTip.png',
    'img/zf_emploment.png',
    'img/zf_messageArrow1.png',
    'img/zf_messageArrow2.png',
    'img/zf_messageChat.png',
    'img/zf_messageKeyboard.png',
    'img/zf_messageLogo.png',
    'img/zf_messageStudent.png',
    'img/zf_outline.png',
    'img/zf_phoneBg.jpg',
    'img/zf_phoneDetail.png',
    'img/zf_phoneListen.png',
    'img/zf_phoneLogo.png',
    'img/zf_return.png',
    'img/zf_style1.jpg',
    'img/zf_style2.jpg',
    'img/zf_style3.jpg',
    'img/zf_styleTip1.png',
    'img/zf_styleTip2.png',
    'img/zf_teacher1.png',
    'img/zf_teacher2.png',
    'img/zf_teacher3.jpg',
    'img/zf_teacher4.png',
    'img/zf_teacher5.png',
    'img/zf_teacher6.png',
    'img/zf_teacherTip.png' ]
*/

//网上找的: NodeJS遍历文件生产文件列表
//http://www.cnblogs.com/pingfan1990/p/4706168.html