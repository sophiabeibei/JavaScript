//=>二.注册
let registerRender = (() => {
    //->1.1获取一堆要操作的元素
    let $userName = $("#userName"),
        $spanName = $("#spanName"),
        $userPhone = $("#userPhone"),
        $spanPhone = $("#spanPhone"),
        $userPass = $("#userPass"),
        $spanPass = $("#spanPass"),
        $userPassConfirm = $("#userPassConfirm"),
        $spanPassConfirm = $("#spanPassConfirm"),
        $userBio = $("#userBio"),
        $spanBio = $("#spanBio"),
        $man = $("#man"),
        $woman = $("#woman"),
        $submit = $("#submit");

    //=>1.2验证用户名
    let checkName = () => {
        //=>trim(): 去除字符串首尾空格
        let val = $userName.val().trim();
        let reg = /^[\u4E00-\u9FA5]{2,5}(·[\u4E00-\u9FA5]{2,5})?$/;
        if (val.length === 0) {
            //->增加一个error的样式
            $spanName.html("用户名不能为空").addClass("error");
            return false;
        }
        //->2.如果val.length!==0的时候
        if (!reg.test(val)) {
            $spanName.html("输入的真实姓名不正确").addClass("error");
            return false;
        }
        $spanName.html("").removeClass("error");
        return true;
    };


    //->1.3.验证手机号码
    let checkPhone = () => {
        let val = $userPhone.val().trim();
        let reg = /^1\d{10}$/;
        //->电话号码也不能为空
        if (val.length === 0) {
            $spanPhone.html("电话号码不能为空").addClass("error");
            return false;
        }
        //->2.如果val.length!==0的时候
        if (!reg.test(val)) {
            $spanPhone.html("请输入正确的电话号码").addClass("error");
            return false;
        }

        //->重复验证
        let code = 0;
        $.ajax({
            url: "/checkPhone",
            type: "get",
            data: {
                phone: val
            },
            dataType: "json",
            cache: false,
            async: false,
            success: function (result) {
                code = parseFloat(result["code"]);
            }
        });

        if (code === 1) {
            $spanPhone.html("当前手机号已经被注册").addClass("error");
            return false;
        }

        $spanPhone.html("").removeClass("error");
        return true;
    };


    //->1.3.验证密码
    let checkPass = () => {
        let val = $userPass.val().trim();
        let reg = /^[0-9a-zA-Z]{6,12}$/;
        //->电话号码也不能为空
        if (val.length === 0) {
            $spanPass.html("密码不能为空").addClass("error");
            return false;
        }
        //->2.如果val.length!==0的时候
        if (!reg.test(val)) {
            $spanPass.html("密码格式是6-12位数字和字母组成").addClass("error");
            return false;
        }
        $spanPass.html("").removeClass("error");
        return true;
    };


    //->1.3.确认密码
    let checkPassConfirm = () => {
        let val = $userPass.val().trim();
        let val2 = $userPassConfirm.val().trim();
        if (val !== val2) {
            $spanPassConfirm.html("密码不能为空").addClass("error");
            return false;
        }
        //->2.如果val.length!==0的时候
        if (!reg.test(val)) {
            $spanPassConfirm.html("密码格式是6-12位数字和字母组成").addClass("error");
            return false;
        }
        $spanPassConfirm.html("").removeClass("error");
        return true;
    };


    //->1.3.自我描述
    let checkBio = () => {
        let val = $userBio.val().trim();
        if (val.length < 10) {
            $spanBio.html("不要太懒哦,至少留下10个字以上的描述吧!").addClass("error");
            return false;
        }
        if (val.length > 100) {
            $spanBio.html("您太勤快了,但是我们只能让输入100个字").addClass("error");
            return false;
        }
        $spanPassConfirm.html("").removeClass("error");
        return true;
    };

    //->发送ajax请求
    let sendAjax = () =>{
        let success = (result)=>{
            if(parseFloat(result["code"])===0){
                //=>设置本地登录态
                cookie.set({
                    name: "userInfo",
                    value: JSON.stringify(result["data"])
                });
                window.location.href = "index.html";
            }else{
                new Dialog("注册失败,请您重试!",function () {
                    let curURL = window.location.href;
                });

                //->刷新当前页面
                window.location.href=window.location.href;
            }
        };

        $.ajax({
            url: "/register",
            type: "post",
            data: {
                name: $userName.val().trim(),
                //->hex_md5()加密后的信息
                password: hex_md5($userPass.val().trim()),
                phone: $userPhone.val().trim(),
                bio: $userBio.val().trim(),
                sex: $man[0].checked ? 0 : 1
            },
            dataType: "json",
            success: success
        });
    };




    return {
        init: function () {
            //->失去焦点格式验证
            $userName.on("blur", checkName);
            $userPhone.on("blur", checkPhone);
            $userPass.on("blur", checkPass);
            $userPassConfirm.on("blur", checkPassConfirm);
            $userBio.on("blur", checkBio);


            //->提交按钮: 绑定点击事件
            $submit.tap(sendAjax);
        }
    }
})();
registerRender.init();




//->密码:
/*]
* 真实项目中用户的密码是非常敏感的内容,需要高度加密(不能解密/不可逆转的加密);
* md5: 实现不可逆转的加密;
* hex_md5([需要加密的密码字符串])  =>
*
* */


/*
* window.location.href
* 1.let url = window.location.href;获取当前页面的url地址
* 2.window.location.href="http://www.baidu.com"跳转到百度(在本窗口跳转)
*
* window.open("http://www.baidu.com")在新窗口打开页面;和a标签中的target="_blank"效果类似
*
* 3.window.location.href = window.location.href;跳转到当前页面(刷新页面)
*
* */





//->三.登录