//->定义编译文件目录和目标导出目录
var dirPath = "./less/", tarPath = "./css/";
//->导入NODE中需要使用的模块
var fs = require("fs"),
    less = require("less");
//->读取dirPath中的所有文件,检查文件的类型,只有LESS文件我们才进行存储
var ary = [],
    files = fs.readdirSync(dirPath);
files.forEach(function (file, index) {
    /\.(LESS)/i.test(file) ? ary.push(file) : null;
});
//->把目录下的所有文件进行编译,把编译完成的结果保存在指定的目录中
ary.forEach(function (file) {
    var newFile = file.replace(".less", ".css"),
        conFile = fs.readFileSync(dirPath + file, "utf-8");
    less.render(conFile, {compress: true}, function (error, output) {
        fs.writeFileSync(tarPath + newFile, output.css, "utf-8");
    });
});