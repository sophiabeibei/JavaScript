let fs = require('fs');

module.exports = {
    //->服务器端返回给客户端信息
    responseData(res, content, status = 200, suffixMIME = 'application/json'){
        res.writeHead(status, {
            'content-type': `${suffixMIME};charset=utf-8;`
        });
        res.end(content);
    },

    //->根据文件的后缀名返回MIME
    queryMIME(suffix){
        suffix = suffix.toUpperCase();
        let suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'LESS':
            case 'SASS':
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
            case 'JSON':
                suffixMIME = 'application/json';
                break;
            case 'GIF':
                suffixMIME = 'image/gif';
                break;
            case 'PNG':
                suffixMIME = 'image/png';
                break;
            case 'JPG':
            case 'JPEG':
                suffixMIME = 'image/jpeg';
                break;
            case 'SVG':
                suffixMIME = 'image/svg-xml';
                break;
        }
        return suffixMIME;
    },

    //->获取所有的用户信息
    queryAllUser(){
        let userInfo = fs.readFileSync('./BACK/JSON/USER.JSON') || '[]',
            userAry = JSON.parse(userInfo);
        return userAry;
    },

    //->获取所有的投票信息
    queryAllVote(){
        let voteInfo = fs.readFileSync('./BACK/JSON/VOTE.JSON') || '[]',
            voteAry = JSON.parse(voteInfo);
        return voteAry;
    },

    //->二次加密
    handMD5(str){
        str = str.substring(4, str.length - 4);
        str = str.split('').reverse();
        return str.join('');
    },

    //->把POST发送的数据变为JSON对象
    queryURLParameter(str){
        let obj = {};
        str.replace(/([^?=&]+)=([^?=&]+)/g, (...arg)=> {
            obj[arg[1]] = decodeURIComponent(arg[2]);
        });
        return obj;
    }
};