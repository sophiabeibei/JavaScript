let fs = require('fs');

let random = (n, m)=> {
    return Math.round(Math.random() * (m - n) + n);
};

//->MOC USER 数据
~function () {
    let ary = [],
        xing = '赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏唐江',
        ming = '一二三四五六七八九';
    let matchId = 0;
    for (let i = 1; i <= 587; i++) {
        let sex = random(0, 10) % 2,
            isMatch = random(0, 10) % 2,
            phone = '1';
        for (let j = 1; j <= 10; j++) {
            phone += random(0, 9);
        }
        if (isMatch === 1) {
            matchId++;
            if (matchId < 10) {
                matchId = '00' + matchId;
            } else if (matchId < 100) {
                matchId = '0' + matchId;
            } else {
                matchId = '' + matchId;
            }
        }
        let obj = {
            "id": i,
            "name": `${xing[random(0, 31)]}${ming[random(0, 8)]}`,
            "picture": sex === 0 ? 'img/man.png' : 'img/woman.png',
            "phone": phone,
            "sex": sex,
            "password": "4af22e23abcea2099da82741",
            "bio": "将来的你一定会感激现在拼命的自己",
            "time": 1506090072369,
            "isMatch": isMatch,
            "matchId": isMatch === 1 ? matchId : '000',
            "slogan": "同一个世界同一个梦想",
            "voteNum": 0
        };
        ary.push(obj);
    }
    fs.writeFileSync('./USER.JSON', JSON.stringify(ary), 'utf-8');
}();