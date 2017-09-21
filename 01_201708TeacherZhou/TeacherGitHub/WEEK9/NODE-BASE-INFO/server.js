let http = require('http'),
    url = require('url'),
    fs = require('fs');
http.createServer((req, res)=> {
    let {pathname, query}=url.parse(req.url, true);

    //=>静态资源文件(HTML/CSS/JS/IMG...)的请求处理
    let suffixReg = /\.([0-9a-zA-Z]+)$/i;
    if (suffixReg.test(pathname)) {
        let suffix = suffixReg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
            case 'GIF':
                suffixMIME = 'image/gif';
                break;
            case 'JPG':
            case 'JPEG':
                suffixMIME = 'image/jpeg';
                break;
            case 'PNG':
                suffixMIME = 'image/png';
                break;
            case 'SVG':
                suffixMIME = 'image/svg+xml';
                break;
        }

        let status = 200,
            conFile = '';
        try {
            if (/(GIF|PNG|JPG|JPEG|SVG|ICO)/i.test(suffix)) {
                conFile = fs.readFileSync(`.${pathname}`);
            } else {
                conFile = fs.readFileSync(`.${pathname}`, 'utf-8');
            }
        } catch (e) {
            status = 404;
            conFile = 'NOT FOUND!';
            suffixMIME = 'text/plain';
        }

        res.writeHead(status, {'content-type': suffixMIME});
        res.end(conFile);
    }

}).listen(1990);