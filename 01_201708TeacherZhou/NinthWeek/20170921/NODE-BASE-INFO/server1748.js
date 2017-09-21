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

    //=>获取请求文件的后缀名,通过后缀名获取它的MIME;
    // 得到这两个文件的后缀名(    /index.html      /css/1.min.css),用正则
    // let suffixReg = /\.([^.]+)$/i;
    let suffixReg = /\.([0-9a-zA-Z]+)$/i,
        suffix = suffixReg.exec(pathname)[1].toUpperCase(),
        suffixMIME = "text/plain";
        switch (suffix){
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
        }

    let conFile = "";
    try{
        conFile = fs.readFileSync(`.${pathname}`,"utf-8");//->通过fs方法获取文件中的原代码(不指定utf-8的情况下,是buffer格式数据,指定后获取的数据格式是字符串)
    }catch (e){
        conFile = "NOT FOUND!";
    }
    //console.log(conFile);
    res.end(conFile);//->不仅是把内容返回给客户端,并且通知客户端返回操作结束(一定要通知结束,否则客户端一直会和服务器保持连接,这样就不会去渲染页面了)

    //=>关于http连接通道的问题,http事务: http传输这件事儿;

    /*
    * 问题: 我们通过fs读取到的内容都是字符串,返回给客户端的也都是字符串(HTML字符串,CSS字符串....);google浏览器比较智能,在渲染解析代码的时候可以自动识别出是什么样格式的;但是部分浏览器(IE)是比较弱智,导致CSS样式无法渲染;
    * 解决方法
    *   在返回给客户端内容的时候,我们需要告诉客户端返回内容类型的MIME格式;
    *       MIME
    *       html    text/html
    *       css     text/css
    *       js     text/javascript
    *       txt     text/plain
    *       json     spplication/json
    *       gif     image/gif
    *       ....
    *       每一种格式的文件都有自己的MIME类型
    *       (回家后百度搜"MIME",打开之后....百科中的"类型大全",大概有小1000多个)
    *
    * */
    //->重写响应头信息: 指定返回内容的MIME类型
    //->语法中有以下几个值:  res.writeHead([status],[options]);
    res.writeHead(200,{
        "content-type": `${suffixMIME}`
    });
    res.end(conFile);
}).listen(1990);


//server.js模块必须放在当前项目的根目录下;
