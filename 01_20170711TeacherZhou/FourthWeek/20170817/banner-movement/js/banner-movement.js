var banner = document.getElementById("banner"),
    imgBox = document.getElementById("imgBox"),
    imgList = imgBox.getElementsByTagName("img"),
    focus = document.getElementById("focus"),
    focusList = focus.getElementsByTagName("li"),
    changeL = document.getElementById("changeL"),
    changeR = document.getElementById("changeR");
~(function(){
    var bannerData = null;
    var xhr = new XMLHttpRequest;
    xhr.open("GET","./json/banner.json",false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            bannerData = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);
    var str = "",
        strFocus = "";
    for (var i = 0; i < bannerData.length; i++) {
        var cur = bannerData[i];
        str+="<li>";
        str+="<a href='"+cur.link+"'>";
        str+="<img src='' data-src='"+cur.img+"' alt=''/>";
        str+="</a>";
        str+="</li>";
        var cName = i === 0 ? "select" : "";
        strFocus+="<li class='"+cName+"'></li>";
    }
    imgBox.innerHTML = str;
    focus.innerHTML = strFocus;
    var imgBoxList = imgBox.getElementsByTagName("li"),
        cloneLi = imgBoxList[0].cloneNode(true);
    imgBox.appendChild(cloneLi);
    utils.css(imgBox,"width",(bannerData.length+1)*800);
})();
window.onload = function () {
    lazyImg(imgList[0]);
};
function lazyImg(oImg){
    if(oImg.isLoad) return;
    oImg.isLoad = true;
    var tempImg = new Image;
    tempImg.onload = function () {
        oImg.src = this.src;
        oImg.style.display = "block";
        tempImg = null;
    };
    tempImg.src = oImg.getAttribute("data-src");
}
~function(){
    var step = 0,
        interval = 1000;
    var autoTimer = window.setInterval(function(){
        if(step===4){
            utils.css(imgBox,"left",0);
            step = 0;
        }
        step++;
        animate({
            curEle: imgBox,
            target: {
                left: -step*800
            },
            duration: 500
        });
        lazyImg(imgList[step]);
    },interval);
}();