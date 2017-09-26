//=>一.首页的处理
let indexRender = (() => {
    let $plan = $.Callbacks(),
        limit = 10,
        page = 1,
        search = "",
        userId = 0;

    let pageNum = 1,
        total = 0;
    //->把这两个变量值处理一下(以下有)

    let userInfo = null;


    //->1.1.获取要操作的两个元素;另外"li"是动态绑定的
    let $userList = $(".userList"),
        $userItem = $userList.children("ul");

    let $tip = $userList.find(".tip");

    //->1.8.获取文本框元素和文本框里的button
    let $headerBox = $(".headerBox"),
        $search = $headerBox.find(".search"),
        $searchInp = $search.find("input"),
        $searchBtn = $search.find(".searchBtn");

    let $person = $("#person");


    //->1.6.数据绑定
    let bindData = (resultList) => {
        //->1.6.1.resultList: 从服务器获取的结果
        let str = ``;
        $.each(resultList, (index, item) => {
            //->用箭头函数,中的this: 就不是循环的那一项了

            //->1.6.2.绑定数据
            str += `<li>
                <a href="detail.html?userId=${item["id"]}">
                    <img src="${item['picture']}" alt="" class="picture">
                    <p class="title">
                        <span>${item['name']}</span>
                        |
                        <span>编号 #${item['match']}</span>
                    </p>
                    <p class="slogan">${item['slogan']}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${item['voteNum']}</span>
                    <!--这句话需要做特殊处理-->
                    ${item['isVote'] === 0 ? `<a href="javascript:;" class="voteBtn" data-id="${item["id"]}">投他一票</a>` : ``};
                </div>
            </li>`;
        });
        $userItem.append(str);
    };
    $plan.add(bindData);


    //->1.7.滚动加载更多
    let scrollEvent = () => {
        //->
        function fn() {
            //->1.7.1.获取当前屏幕的高度,卷去的高度,真实页面的高度
            let clientH = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
            let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;

            //->1.7.2.获取完数据之后,进行判断
            if (clientH + scrollT + 200 >= scrollH) {
                //->还差200px就到页面最底部了,此时我们加载更多数据
                $(window).off("scroll", fn);
                page++;
                if (page > pageNum) {
                    return;
                }
                $.ajax({
                    url: "/getMatchList",
                    type: "get",
                    dataType: "json",
                    data: {
                        limit: limit,
                        page: page,
                        search: search,
                        userId: userId
                    },
                    cache: false,
                    success: function (result) {
                        if (result["code"] === 0 && result["list"] && result["list"].length > 0) {
                            bindData(result["list"]);
                            $(window).on('scroll', fn);

                        }
                    }
                });

            }
        }

        $(window).on("scroll", fn);
    };
    $plan.add(scrollEvent);

    //->11.投票
    let vote =()=>{
        $userItem.tap(function (e) {
            let target = e.target;
            if(target.className !== "voteBtn"){
                return;
            }
            //->验证当前用户是否登录状态
            if(userId===0){
                //->说明没登录
                new Dialog("先登录才能投票");
                return;
            }
            //->已经登录,开始真正的投票
            let participantId=parseFloat(target.getAttribute("data-id"));
            $.ajax({
                url: "/bote",
                type: "get",
                dataType: "json",
                data: {
                    userId: userId,
                    participantId: participantId
                },
                cache: false,
                success: function (result) {
                    if(parseFloat(result["code"])===1){
                        //=>1说明是失败
                        new Dialog("投票失败");
                        return;
                    }
                    new Dialog("感谢您的支持!",function () {
                        let $target = $(target);
                        let $prev = $target.prev();
                        $prev.html(parseFloat($prev.html())+1);
                        $target.remove();
                    });
                }
            });
        });
    };
    $plan.add(vote);

    //->1.9.封装ajax;展示首页数据
    let sendAjax = ()=>{
        $.ajax({
            url: "/getMatchList",
            type: "get",
            dataType: "json",
            data: {
                limit: limit,
                page: page,
                search: search,
                userId: userId
            },
            cache: false,
            success: function (result) {
                //->1.3.控制有数据和没数据;
                if (result["code"] === 0 && result["list"] && result["list"].length > 0) {
                    //->1.3.1.获取到的匹配数据
                    $userItem.css("display", "block");
                    $tip.css("display", "none");


                    //->1.4.把这两个变量值处理一下
                    pageNum = parseFloat(result["pageNum"]);
                    total = parseFloat(result["total"]);

                    //->1.5.获取的lise,做数据绑定
                    $plan.fire(result["list"]);
                } else {
                    //->1.3.2没有获取的匹配数据
                    $userItem.css("display", "none");
                    $tip.css("display", "block");
                }
            }
        });
    };


    return {
        init: function () {
            //->1.10.验证登录态
            userInfo = cookie.get("userInfo");//->得到的值是字符串
            if(userInfo){
                userInfo = JSON.parse(userInfo);//->转换成json格式的对象
                userId = userInfo["id"];//->id的值存的是用户id

                $person.css("display","block").html(`HELLO ${userInfo["name"]}`).siblings().css("display","none");
            }

            //->1.2.通过ajax获取数据,展示首页数据
            sendAjax();


            //->1.8.1除了展示首页数据以外,还要展示button
            $searchBtn.tap(function () {
                //->得到它里面的value值
                search = $searchInp.val().replace(/^ +| +/g, "");
                //->还回归到第一页
                page = 1;

                //->1.8.2.点击搜索的时候,里面的内容先清空原有区域内容,然后再绑定最新获取的内容
                $userItem.html("");


                //->1.8.3.搜索完成之后,再执行sendAjax()展示首页数据;
                sendAjax();

            });
        }
    }
})();
indexRender.init();


