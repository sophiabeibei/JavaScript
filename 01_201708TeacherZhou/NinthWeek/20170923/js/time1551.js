//->首先获取服务器端时间(以服务器时间为准,不能以客户端时间为准)
//->向服务器端发送请求,用ajax
let serverTime = null;
let autoTimer = null;
let timeDiv = document.getElementById("time");


let xhr = new XMLHttpRequest;
xhr.open("get", "temp.xml");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        //->通过响应头获取的服务器时间是"格林尼治时间GMT";"北京时间GMT+8"
        serverTime = xhr.getResponseHeader("date");

        //->这样转以下就变成北京时间
        serverTime = new Date(serverTime);

        computedTime();
        autoTimer = setInterval(computedTime, 1000);
    }
};
xhr.send(null);


let computedTime = () => {
    //->获取当前客户端本机的时间(这样是不对的,不应该获取当前客户端时间,要获取服务器时间)
    // let nowTime = new Date();

    //->获取服务器时间
    let nowTime = serverTime;
    //->获取目标时间
    let tarTime = new Date("2017-09-23 16:00:00");
    //->算出两者之间的差值时间
    let spanTime = tarTime - nowTime;


    //->每间隔一秒钟,我们需要在原始服务器的时间上累加1000ms
    //serverTime.getTime();//->获取当前时间举例1970年1月1日...的毫秒差;再new Date一下;
    serverTime = new Date(serverTime.getTime() + 1000);


    if (spanTime <= 0) {
        //->已经过了抢购时间
        clearInterval(autoTimer);
        timeDiv.innerHTML = "00:00:00";
        return;
    }

    let hours = Math.floor(spanTime / (1000 * 60 * 60));
    spanTime = spanTime - (hours * 60 * 60 * 1000);
    let minutes = Math.floor(spanTime / (1000 * 60));
    spanTime = spanTime - (minutes * 60 * 1000);
    let seconds = Math.floor(spanTime / 1000);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDiv.innerHTML = `${hours}:${minutes}:${seconds}`;
};

