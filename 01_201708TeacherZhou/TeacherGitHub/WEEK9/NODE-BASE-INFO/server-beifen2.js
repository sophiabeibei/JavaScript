let http = require('http'),
    url = require('url'),
    fs = require('fs');
http.createServer((req, res)=> {
    let {pathname, query}=url.parse(req.url, true);

    //->获取请求文件的后缀名，通过后缀名获取到它的MIME
    let suffixReg = /\.([0-9a-zA-Z]+)$/i,
        suffix = suffixReg.exec(pathname)[1].toUpperCase(),
        suffixMIME = 'text/plain';
    switch (suffix) {
        case 'HTML':
            suffixMIME = 'text/html';
            break;
        case 'CSS':
            suffixMIME = 'text/css';
            break;
    }

    let conFile = '';
    try {
        conFile = fs.readFileSync(`.${pathname}`, 'utf-8');
    } catch (e) {
        conFile = 'NOT FOUND!';
    }
    //->重写响应头信息：指定返回内容的MIME类型
    //res.writeHead([status],[options])
    res.writeHead(200, {
        'content-type': `${suffixMIME}`
    });
    res.end(conFile);

    /*
     * 问题：我们通过FS读取到的内容都是字符串，返回给客户端的也都是字符串(HTML字符串、CSS字符串...)；谷歌这些浏览器比较智能，在渲染解析代码的时候可以自动识别出是什么样格式的，但是部分IE浏览器比较弱智，识别不了，导致CSS样式无法渲染；
     *
     * 解决：在返回给客户端内容的时候，我们需要告诉客户端，返回内容的MIME格式
     * 文件     MIME
     * html  text/html
     * css   text/css
     * js    text/javascript
     * txt   text/plain
     * json  application/json
     * gif   image/gif
     * ...
     * 每一种格式的文件都有自己的MIME类型
     */
}).listen(1990);