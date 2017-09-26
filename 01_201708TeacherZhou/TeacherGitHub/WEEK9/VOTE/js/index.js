/*--INDEX RENDER--*/
let indexRender = (()=> {
    let $plan = $.Callbacks(),
        limit = 10,
        page = 1,
        search = '',
        userId = 0,
        pageNum = 1,
        total = 0,
        userInfo = null;

    let $userList = $('.userList'),
        $userItem = $userList.children('ul'),
        $tip = $userList.find('.tip'),
        $headerBox = $('.headerBox'),
        $search = $headerBox.find('.search'),
        $searchInp = $search.find('input'),
        $searchBtn = $search.find('.searchBtn'),
        $person = $('#person');

    //->数据绑定
    let bindData = (resultList)=> {
        let str = ``;
        $.each(resultList, (index, item)=> {
            str += `<li>
                <a href="detail.html?userId=${item['id']}">
                    <img src="${item['picture']}" alt="" class="picture">
                    <p class="title">
                        <span>${item['name']}</span>
                        |
                        <span>编号#${item['matchId']}</span>
                    </p>
                    <p class="slogan">${item['slogan']}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${item['voteNum']}</span>
                    ${item['isVote'] === 0 ? `<a href="javascript:;" class="voteBtn" data-id="${item['id']}">投他一票</a>` : ``}
                </div>
            </li>`;
        });
        $userItem.append(str);
    };
    $plan.add(bindData);

    //->滚动加载更多
    let scrollEvent = ()=> {
        let fn = ()=> {
            let clientH = document.documentElement.clientHeight || document.body.clientHeight,
                scrollT = document.documentElement.scrollTop || document.body.scrollTop,
                scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;

            if (clientH + scrollT + 200 >= scrollH) {
                //=>还差200PX就到页面最底部了:此时我们加载更多数据
                $(window).off('scroll', fn);
                page++;
                if (page > pageNum) {
                    return;
                }
                $.ajax({
                    url: '/getMatchList',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        limit: limit,
                        page: page,
                        search: search,
                        userId: userId
                    },
                    cache: false,
                    success: function (result) {
                        if (result['code'] == 0 && result['list'] && result['list'].length > 0) {
                            bindData(result['list']);
                            $(window).on('scroll', fn);
                        }
                    }
                });
            }
        };
        $(window).on('scroll', fn);
    };
    $plan.add(scrollEvent);

    //->投票
    let vote = ()=> {
        $userItem.tap(function (e) {
            let target = e.target;
            if (target.className !== 'voteBtn') return;

            //->验证是否为登录状态
            if (userId == 0) {
                new Dialog('先登录才能投票!');
                return;
            }

            //->投票
            let participantId = parseFloat(target.getAttribute('data-id'));
            $.ajax({
                url: '/vote',
                dataType: 'json',
                data: {
                    userId: userId,
                    participantId: participantId
                },
                cache: false,
                success: function (result) {
                    if (result['code'] == 1) {
                        new Dialog('投票失败!');
                        return;
                    }
                    new Dialog('感谢您的支持!', function () {
                        let $target = $(target),
                            $prev = $target.prev();
                        $prev.html(parseFloat($prev.html()) + 1);
                        $target.remove();
                    });
                }
            });
        });
    };
    $plan.add(vote);

    //->send ajax
    let sendAjax = ()=> {
        $.ajax({
            url: '/getMatchList',
            type: 'get',
            dataType: 'json',
            data: {
                limit: limit,
                page: page,
                search: search,
                userId: userId
            },
            cache: false,
            success: function (result) {
                if (result['code'] == 0 && result['list'] && result['list'].length > 0) {
                    //=>获取到匹配的数据
                    $userItem.css('display', 'block');
                    $tip.css('display', 'none');

                    pageNum = parseFloat(result['pageNum']);
                    total = parseFloat(result['total']);

                    $plan.fire(result['list']);
                } else {
                    //=>没有获取到匹配的数据
                    $userItem.css('display', 'none');
                    $tip.css('display', 'block');
                }
            }
        });
    };

    return {
        init(){
            //=>验证登录态
            userInfo = cookie.get('userInfo');
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                userId = userInfo['id'];

                $person.css('display', 'block').html(`HELLO ${userInfo['name']}`).siblings().css('display', 'none');
            }

            //=>展示首页数据
            sendAjax();

            //=>搜索
            $searchBtn.tap(function () {
                search = $searchInp.val().replace(/^ +| +$/g, '');
                page = 1;
                $userItem.html('');//=>点击搜索的时候先清空原有区域中的内容,然后再绑定最新获取的内容
                sendAjax();
            });
        }
    }
})();
indexRender.init();