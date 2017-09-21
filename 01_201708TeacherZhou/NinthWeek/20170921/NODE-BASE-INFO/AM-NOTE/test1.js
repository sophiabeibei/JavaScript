let fn=()=>{
    console.log("text1");
};

let sum = (a,b)=> {
    console.log(a + b);
};

//->把test模块中的sum方法导出,自定义一个名字sumFn,导出的目的: 提供给其它的模块使用;
module.exports.sumFn= sum;
module.exports.fn = fn;

//->合并一起,一下导出两个(多个)
module.exports = {
    sum: sum,
    fn: fn
};

//->合并一起,一下导出两个(多个): module可以省略;但个人习惯不省略;
// exports = {
//     sum: sum,
//     fn: fn
// };