String.prototype.myQueryURLParameter = function myQueryURLParameter() {
    let obj = {},
        reg = /([^?=&]+)=([^?=&]+)/g;
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};

let detailRender = (()=> {
    let userId = 0,
        lookMe = true,
        userInfo = null,
        isVote = false;

    let $headerBox = $('.headerBox'),
        $myVote = $('#myVote'),
        $voteMy = $('#voteMy');

    //=>展示基础信息
    let showBaseInfo = (result)=> {
        let str = ``;
        str += `<div class="userInfo">
            <img src="${result['picture']}" alt="" class="picture">
            <p class="info">
                <span>${result['name']}</span>
                ${result['isMatch'] == 1 ? ` | <span>编号#${result['matchId']}</span>` : ``}
            </p>
            <p class="bio">${result['bio']}</p>
            <div class="vote">${result['voteNum']}</div>
        </div>
        ${result['isMatch'] == 1 ? `<div class="slogan">${result['slogan']}</div>` : ``}
        
        ${isVote === false ? `<a href="javascript:;" class="voteBtn">投他一票</a>` : ``}`;

        $headerBox.html(str);
    };

    //=>投递信息列表
    let bindVoteList = (result, flag)=> {
        let str = ``,
            title = '';
        if (flag === 0) {
            title = lookMe ? '我投递的人员' : '他投递的人员';
        } else {
            title = lookMe ? '投递我的人员' : '投递他的人员';
        }
        if (result.length > 0) {
            str += `<div class="title clearfix">
                <div class="left">
                    <span></span>
                    <span></span>
                </div>
                <div class="center">${title}</div>
                <div class="right">
                    <span></span>
                    <span></span>
                </div>
            </div>`;
        }

        str += `<ul class="list">`;
        $.each(result, function (index, item) {
            str += `<li>
                <a href="detail.html?userId=${item['id']}">
                    <img src="${item['picture']}" alt="" class="picture">
                    <p class="title">${item['name']}</p>
                    <p class="bio">${item['slogan']}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${item['voteNum']}</span>
                    
                    ${item['isVote'] == 0 ? `<a href="javascript:;" class="voteBtn" data-id="${item['id']}">投他一票</a>` : ``}
                </div>
            </li>`;
        });
        str += `</ul>`;

        flag === 0 ? $myVote.html(str) : $voteMy.html(str);
    };
    let sendVoteListAjax = (flag)=> {
        //=>FLAG=0：我投递的谁  FLAG=1：谁投递的我
        let url = flag === 0 ? '/getMyVote' : '/getVoteMy';
        $.ajax({
            url: `${url}?userId=${userId}`,
            dataType: 'json',
            cache: false,
            success: function (result) {
                if (result['code'] == 0) {
                    bindVoteList(result['list'], flag);
                }
            }
        });
    };

    return {
        init(){
            //->解析传递进来的参数值
            let obj = window.location.href.myQueryURLParameter();
            if (typeof obj['userId'] !== 'undefined') {
                userId = parseFloat(obj['userId']);
            }

            //->验证一下是否是看自己
            userInfo = cookie.get('userInfo');
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                if (userId !== 0 && userId != userInfo['id']) {
                    lookMe = false;
                } else {
                    lookMe = true;
                    userId = parseFloat(userInfo['id']);
                }
            }

            //->验证当前用户是否已经被我们投递过
            $.ajax({
                url: `/checkUser?userId=${userInfo['id']}&checkId=${userId}`,
                dataType: 'json',
                cache: false,
                success: function (result) {
                    if (result['code'] == 0) {
                        result['isVote'] == 1 ? isVote = true : null;
                    }
                }
            });

            //->不管是看别人的还是看自己的,都要先获取基础的信息
            $.ajax({
                url: `/getUser?userId=${userId}`
                ,
                dataType: 'json',
                cache: false,
                success: function (result) {
                    if (result['code'] == 0) {
                        showBaseInfo(result['data']);
                        sendVoteListAjax(0);
                        sendVoteListAjax(1);
                    }
                }
            });
        }
    }
})();
detailRender.init();