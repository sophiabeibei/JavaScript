let http = require('http'),
    url = require('url'),
    fs = require('fs');
http.createServer((req, res)=> {
    let {pathname, query}=url.parse(req.url, true);

    let conFile = fs.readFileSync(`.${pathname}`, 'utf-8');//=>通过FS方法获取文件中的原代码(不指定UTF-8的情况下是BUFFER格式数据,指定后获取的数据格式是字符串)

    res.end(conFile);//=>不仅是把内容返回给客户端,并且通知客户端返回操作结束(一定要通知结束,否则客户端一直会和服务器保持连接,这样就不会去渲染页面了)
}).listen(1990);