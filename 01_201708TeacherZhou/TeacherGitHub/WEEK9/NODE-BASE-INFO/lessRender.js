let less = require('less'),
    fs = require('fs');

//->获取LESS文件夹中的文件,筛选出所有后缀名是less的,这些文件就是我们接下来要处理的
let fileAry = fs.readdirSync('./less');
fileAry = fileAry.filter((item, index)=> {
    return /\.less/i.test(item);
});

//->循环获取的less文件，一个文件一个文件的进行处理
fileAry.forEach((item, index)=> {
    //->读取循环这个LESS文件中的内容(需要设置UTF-8，只有这样获取的才是一个字符串，否则是BUFFER数据)
    let con = fs.readFileSync(`./less/${item}`, 'utf-8');

    //->把获取的内容编译为css
    less.render(con, {compress: true}, (error, value)=> {
        //->把编译好的CSS写入到指定的文件中（CSS目录下和之前LESS文件名相同的CSS文件下）
        let newFileName = item.replace(/\.less/ig, '.min.css');

        fs.writeFileSync(`./css/${newFileName}`, value.css);
    });
});


//=>调取LESS模块中的RENDER方法,实现把LESS代码编译成CSS；compress:true设置编译的时候压缩
// less.render('@W: 100px;       @H: 100px;.box {width: @W;height: @H;        background: red;}', {compress: true}, (error, value)=> {
//     //->value:是一个对象,其中的css属性中存储的就是编译后的css代码(经过压缩的)
//     console.log(value.css);
// });
