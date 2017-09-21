let fn = ()=> {
    console.log('TEST2');
};

//->需求：在TEST2模块中调用TEST1模块中的某一个方法
//TEMP存储的内容就是TEST1模块导出的对象
let temp = require('./TEST1');
temp.sum(1, 2);