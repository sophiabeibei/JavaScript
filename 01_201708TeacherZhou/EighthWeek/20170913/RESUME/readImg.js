var fs = require("fs");
var res = fs.readdirSync("./img");
res = res.map(function (item, index) {
    return `img/${item}`;
});
