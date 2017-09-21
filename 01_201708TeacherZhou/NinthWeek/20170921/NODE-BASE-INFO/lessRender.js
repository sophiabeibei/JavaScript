let lessc = require("less"),
    //->读取某个文件夹中的文件
    fs = require("fs");

//->读取less文件夹中的文件,把后缀名是less的都找到
let fieAry = fs.readdirSync("./less");//->结果是个数组
//->遍历出后缀名是less的文件
fileAry = fileAry.filter((item,index)=>{
    return /\.less/i.test(item);
});

//第二步要做的事情: 循环获取的less文件,文件一个个的进行处理
fileAry.forEach((item,index)=>{
    //=>读取循环这个less文件中的内容(需要设置utf-8,只有这样获取的才是要给字符串否则是)
    let con=fs.readFileSync(`./less/${item}`,"utf-8");

    //->把获取的内容编译成css
    less.render(con,{compress:true},(error,value)=>{
        //->把编译好的css写入指定的文件中(css目录下和之前less文件名相同的css文件下);之前叫1.less  变成1.min.css;
        let newFileName = item.replace(/\.less/ig,".min.css");

        fs.writeFileSync(`./css/${newFileName}`,value.css);
    })

});//->在node中步需要考虑兼容,v8引擎的;没有IE







//=>调取less模块中的render方法,实现把less代码编译成css;compress:true设置编译压缩;
less.render("@W: 100px;@H: 100px;.box{width: @W;height: @H;background: red;}",{compress:true},(error,value)=>{
    //->value: 是一个对象,其中css属性中存储的就是编译后的css代码(经过压缩后的)
    console.log(value.css);
});

