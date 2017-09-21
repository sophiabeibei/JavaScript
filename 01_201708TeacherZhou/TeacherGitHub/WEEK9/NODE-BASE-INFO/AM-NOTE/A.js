// module.exports = {
//     sum(){
//
//     }
// };

// module.exports = {
//     sum: (...arg)=> {
//         //->使用拓展运算符接收传递给函数的实参集合:ARG是一个数组
//         return eval(arg.join('+'));
//     }
// };

module.exports = {
    sum: (...arg)=> eval(arg.join('+'))
};