let http = require("http"),
    url = require("url"),
    fs = require("fs");

//->1.服务;2.端口号
http.createServer((req, res) => {
    //->3.req.url: 得到地址
    //console.log(req.url);
    // let urlObj = url.parse(req.url,true),
    //     pathname=urlObj.pathname,
    //     query = urlObj.query;

    let {pathname, query} = url.parse(req.url, true);//->pathname: 请求的文件路径;query: 传参的值;
    //console.log(pathname, query);
    //console.log(pathname);

    let conFile = fs.readFileSync(`.${pathname}`,"utf-8");//->通过fs方法获取文件中的原代码(不指定utf-8的情况下,是buffer格式数据,指定后获取的数据格式是字符串)
    //console.log(conFile);

    res.end(conFile);//->不仅是把内容返回给客户端,并且通知客户端返回操作结束(一定要通知结束,否则客户端一直会和服务器保持连接,这样就不会去渲染页面了)


    //=>关于http连接通道的问题,http事务: http传输这件事儿;
}).listen(1990);
