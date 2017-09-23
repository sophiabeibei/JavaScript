let serverTime = null,
    autoTimer = null,
    timeDiv = document.getElementById('time');

//->首先获取服务端的时间
let xhr = new XMLHttpRequest;
xhr.open('get', 'temp.xml');
xhr.onreadystatechange = ()=> {
    if (xhr.readyState === 4 && xhr.status === 200) {
        serverTime = xhr.getResponseHeader('date');//->通过响应头获取的服务器时间是‘格林尼治时间 GMT’
        serverTime = new Date(serverTime);

        computedTime();
        autoTimer = setInterval(computedTime, 1000);
    }
};
xhr.send(null);

let computedTime = ()=> {
    let nowTime = serverTime,
        tarTime = new Date('2017-09-23 16:00:00'),
        spanTime = tarTime - nowTime;

    //->每间隔一秒钟,我们需要在原始服务器的时间上累加1000MS
    serverTime = new Date(serverTime.getTime() + 1000);

    if (spanTime <= 0) {
        //->已经过了抢购时间
        clearInterval(autoTimer);
        timeDiv.innerHTML = '00:00:00';
        return;
    }

    let hours = Math.floor(spanTime / (1000 * 60 * 60));
    spanTime = spanTime - (hours * 60 * 60 * 1000);
    let minutes = Math.floor(spanTime / (1000 * 60));
    spanTime = spanTime - (minutes * 60 * 1000);
    let seconds = Math.floor(spanTime / 1000);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeDiv.innerHTML = `${hours}:${minutes}:${seconds}`;
};
