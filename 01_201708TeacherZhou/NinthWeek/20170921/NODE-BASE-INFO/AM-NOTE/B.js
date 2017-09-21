let temp = require('./A');
module.exports = {
    avg: (...arg)=> temp.sum(...arg) / arg.length
};
