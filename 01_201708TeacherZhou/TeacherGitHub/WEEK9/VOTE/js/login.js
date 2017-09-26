let loginRender = (()=> {
    let $userName = $('#userName'),
        $userPass = $('#userPass'),
        $submit = $('#submit');

    let submitFn = ()=> {
        let success = (result)=> {
            if (parseFloat(result['code']) === 1) {
                new Dialog('登录失败，请您重试！', function () {
                    let curURL = window.location.href;
                    window.location.href = curURL;
                });
                return;
            }
            cookie.set({
                name: 'userInfo',
                value: JSON.stringify(result['data'])
            });
            window.location.href = 'index.html';
        };
        $.ajax({
            url: '/login',
            type: 'post',
            data: {
                name: $userName.val().trim(),
                password: hex_md5($userPass.val().trim())
            },
            dataType: 'json',
            success: success
        });
    };

    return {
        init(){
            $submit.tap(submitFn);
        }
    }
})();
loginRender.init();