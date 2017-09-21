let temp = require('./A');
module.exports = {
    avg: (...arg)=> temp.sum(...arg) / arg.length
};

// let ary = [12, 23, 13, 14, 25, 34, 12];
// console.log(Math.max.apply(undefined, ary));
// console.log(Math.max(...ary)); //=>原理等同于上面的操作