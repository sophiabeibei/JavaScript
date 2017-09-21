let fn=()=>{
    console.log("text2");
};
//->需求: 在test2模块中调用test1模块中的某一个方法  (后台没有html页面一说;后台也不叫test1.js,叫test1模块);
//->导入test1模块,用require,定义一个变量接收它的返回值;存储的是test1模块的对象;
let temp = require("./test1");

//->导入"内置模块"和导入"已经安装的第三方模块"不用加./(点杠目录)
//require("less");
temp.sum(1,200);

