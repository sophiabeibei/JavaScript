let fn = ()=> {
    console.log('TEST1');
};

let sum = (a, b)=> {
    console.log(a + b);
};

// module.exports.sumFn = sum;
// module.exports.fn = fn;
module.exports = {
    sum: sum,
    fn: fn
};