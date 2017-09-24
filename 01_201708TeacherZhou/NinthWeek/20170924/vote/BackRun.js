/*--require built module--*/
let http = require('http'),
    fs = require('fs'),
    url = require('url');

/*--require custom module--*/
let $ = require('./BACK/TOOL');


/*--create server--*/
http.createServer((req, res)=> {
    let {pathname, query}=url.parse(req.url, true);

    //->resource file request
    let suffixReg = /\.([a-zA-Z0-9]+)$/i;
    if (suffixReg.test(pathname)) {
        let suffix = suffixReg.exec(pathname)[1],
            suffixMIME = $.queryMIME(suffix);
        try {
            $.responseData(res, fs.readFileSync(`.${pathname}`), 200, suffixMIME);
        } catch (e) {
            $.responseData(res, 'NOT FOUND!', 404, 'text/plain');
        }
        return;
    }

    //->getMatchList
    if (pathname === '/getMatchList') {
        let {limit, page, search, userId}=query;
        limit = parseFloat(limit);
        page = parseFloat(page);
        userId = parseFloat(userId);
        let userAry = $.queryAllUser().reverse();

        //=>筛选出所有参加比赛的
        //=>如果用户传递了搜索记录，还需要在次基础上把与搜索信息匹配的获取到
        userAry = userAry.filter((item)=> {
            if (search.length > 0) {
                return item['name'].indexOf(search) > -1 && parseFloat(item['isMatch']) === 1;
            }
            return parseFloat(item['isMatch']) === 1;
        });

        //=>如果用户已登录,记录一下当前筛选出来的参赛者是否已经被当前登录用户投递过
        if (userId !== 0) {
            let voteAry = $.queryAllVote();
            userAry.forEach((item)=> {
                let id = parseFloat(item['id']),
                    flag = 0;
                voteAry.forEach((voteItem)=> {
                    if (parseFloat(voteItem['voterId']) === userId && parseFloat(voteItem['participantId']) === id) {
                        flag = 1;
                    }
                });
                item['isVote'] = flag;
            });
        }

        //=>计算总页数,获取出当前页面对应的数据
        let total = userAry.length,
            pageNum = Math.ceil(total / limit),
            result = [];
        if (page <= pageNum) {
            for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
                let item = userAry[i];
                if (!item) break;
                result.push({
                    id: parseFloat(item['id']),
                    name: item['name'],
                    picture: item['picture'],
                    sex: parseFloat(item['sex']),
                    matchId: parseFloat(item['matchId']),
                    slogan: item['slogan'],
                    voteNum: parseFloat(item['voteNum']),
                    isVote: parseFloat(item['isVote']) || 0
                });
            }
        }

        $.responseData(res, JSON.stringify({
            code: result.length === 0 ? 1 : 0,
            message: result.length === 0 ? '无匹配的信息' : 'OK',
            limit: limit,
            page: page,
            pageNum: pageNum,
            total: total,
            list: result
        }));
        return;
    }

    //->vote
    if (pathname === '/vote') {
        let {userId, participantId}=query;
        userId = parseFloat(userId);
        participantId = parseFloat(participantId);

        let voteAry = $.queryAllVote(),
            userAry = $.queryAllUser(),
            result = {
                code: 0,
                message: 'ok'
            };
        if (userId !== 0) {
            //=>向投票表中存放内容
            voteAry.push({
                id: voteAry.length === 0 ? 1 : parseFloat(voteAry[voteAry.length - 1]['id']) + 1,
                voterId: userId,
                participantId: participantId,
                time: new Date().getTime()
            });
            fs.writeFileSync('./BACK/JSON/VOTE.JSON', JSON.stringify(voteAry), 'utf-8');

            //=>更改USER表中的数据:被投人的投票数需要累加1
            userAry.forEach((item)=> {
                if (parseFloat(item['id']) === participantId) {
                    item['voteNum'] = parseFloat(item['voteNum']) + 1;
                }
            });
            fs.writeFileSync('./BACK/JSON/USER.JSON', JSON.stringify(userAry), 'utf-8');
        } else {
            result = {
                code: 1,
                message: '投票之前需要先登录'
            };
        }
        $.responseData(res, JSON.stringify(result));
        return;
    }

    //->getUser
    if (pathname === '/getUser') {
        let {userId}=query;
        userId = parseFloat(userId);

        let userAry = $.queryAllUser(),
            result = {
                code: 1,
                message: '没有找到该用户信息',
                data: null
            };
        userAry.forEach((item)=> {
            if (parseFloat(item['id']) === userId) {
                result = {
                    code: 0,
                    message: 'ok',
                    data: item
                };
            }
        });

        $.responseData(res, JSON.stringify(result));
        return;
    }

    //->checkUser
    if (pathname === '/checkUser') {
        let {userId, checkId}=query;
        userId = parseFloat(userId);
        checkId = parseFloat(checkId);

        let voteAry = $.queryAllVote(),
            result = {
                code: 0,
                message: 'ok',
                isVote: 0
            };
        voteAry.forEach((item)=> {
            if (parseFloat(item['voterId']) === userId && parseFloat(item['participantId']) === checkId) {
                result['isVote'] = 1;
            }
        });

        $.responseData(res, JSON.stringify(result));
        return;
    }

    //->getMyVote
    if (pathname === '/getMyVote') {
        let {userId}=query;
        userId = parseFloat(userId);

        let voteAry = $.queryAllVote(),
            userAry = $.queryAllUser(),
            result = [];
        voteAry.forEach((item)=> {
            if (parseFloat(item['voterId']) === userId) {
                userAry.forEach((userItem)=> {
                    if (parseFloat(userItem['id']) === parseFloat(item['participantId'])) {
                        result.push({
                            id: userItem['id'],
                            name: userItem['name'],
                            picture: userItem['picture'],
                            sex: userItem['sex'],
                            matchId: userItem['matchId'],
                            slogan: userItem['slogan'],
                            voteNum: userItem['voteNum'],
                            isVote: 1
                        });
                    }
                });
            }
        });

        result.reverse();
        $.responseData(res, JSON.stringify({
            code: 0,
            message: 'ok',
            total: result.length,
            list: result
        }));
        return;
    }

    //->getVoteMy
    if (pathname === '/getVoteMy') {
        let {userId}=query;
        userId = parseFloat(userId);

        let voteAry = $.queryAllVote(),
            userAry = $.queryAllUser(),
            result = [];
        voteAry.forEach((item)=> {
            if (parseFloat(item['participantId']) === userId) {
                userAry.forEach((userItem)=> {
                    if (parseFloat(userItem['id']) === parseFloat(item['voterId'])) {
                        result.push({
                            id: userItem['id'],
                            name: userItem['name'],
                            picture: userItem['picture'],
                            sex: userItem['sex'],
                            matchId: userItem['matchId'],
                            slogan: userItem['slogan'],
                            voteNum: userItem['voteNum'],
                            isVote: 0
                        });
                    }
                });
            }
        });

        result.forEach((item)=> {
            let id = parseFloat(item['id']);
            voteAry.forEach((voteItem)=> {
                if (parseFloat(voteItem['voterId']) === userId && parseFloat(voteItem['participantId']) === id) {
                    item['isVote'] = 1;
                }
            });
        });

        result.reverse();
        $.responseData(res, JSON.stringify({
            code: 0,
            message: 'ok',
            total: result.length,
            list: result
        }));
        return;
    }

    //->checkPhone
    if (pathname === '/checkPhone') {
        let phone = query['phone'],
            userAry = $.queryAllUser(),
            flag = 0;
        userAry.forEach((item)=> {
            if (item['phone'] === phone) {
                flag = 1;
            }
        });
        $.responseData(res, JSON.stringify({
            code: flag,
            message: flag === 0 ? '当前手机号未被注册' : '当前手机号已经被注册'
        }));
        return;
    }

    //->register [POST]
    if (pathname === '/register') {
        let userAry = $.queryAllUser(),
            passData = '';
        req.on('data', (chunk)=> {
            passData += chunk;
        });
        req.on('end', ()=> {
            passData = $.queryURLParameter(passData);
            let newInfo = {
                id: userAry.length === 0 ? 1 : parseFloat(userAry[userAry.length - 1]['id']) + 1,
                name: passData['name'],
                picture: passData['sex'] == 0 ? 'img/man.png' : 'img/woman.png',
                phone: passData['phone'],
                sex: passData['sex'],
                password: $.handMD5(passData['password']),
                bio: passData['bio'] || '',
                time: new Date().getTime(),
                isMatch: 0,
                matchId: '000',
                slogan: '',
                voteNum: 0
            };
            userAry.push(newInfo);
            fs.writeFileSync('./BACK/JSON/USER.JSON', JSON.stringify(userAry), 'utf-8');
            $.responseData(res, JSON.stringify({
                code: 0,
                message: 'ok',
                data: {
                    id: newInfo['id'],
                    name: newInfo['name'],
                    password: passData['password']
                }
            }));
        });
        return;
    }

    //->login [POST]
    if (pathname === '/login') {
        let userAry = $.queryAllUser(),
            passData = '';
        req.on('data', (chunk)=> {
            passData += chunk;
        });
        req.on('end', ()=> {
            passData = $.queryURLParameter(passData);
            let name = passData['name'],
                password = $.handMD5(passData['password']),
                obj = null;
            userAry.forEach((item, index)=> {
                if ((item['name'] === name || item['phone'] === name) && item['password'] === password) {
                    obj = {
                        id: item['id'],
                        name: item['name'],
                        password: password
                    };
                }
            });
            $.responseData(res, JSON.stringify({
                code: obj === null ? 1 : 0,
                message: obj === null ? '用户名密码输入错误' : 'OK',
                data: obj
            }));
        });
        return;
    }

    //->404
    $.responseData(res, 'NOT FOUND!', 404, 'text/plain');
}).listen(8888);