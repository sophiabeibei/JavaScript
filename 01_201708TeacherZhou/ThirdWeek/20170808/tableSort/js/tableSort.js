var mallItem = document.getElementById("mallTeam"),
    mallList = mallItem.getElementsByTagName("li"),
    menu = document.getElementById("menu"),
    menuLink = menu.getElementsByTagName("a");
~function(){
    var proData = null;
    var xhr = new XMLHttpRequest;
    xhr.open("GET","json/product.json",false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status === 200){
            proData = utils.toJSON(xhr.responseText);
            console.log(utils.toJSON(xhr.responseText));
        }
    };
    xhr.send(null);
    var str = ``;
    for (var i = 0; i < proData.length; i++) {
        var cur = proData[i];
        str += `<li data-time="${cur.time}" data-price="${cur.price}" data-hot="${cur.hot}">
            <img src="${cur.img}" alt="">
            <p>${cur.title}</p>
            <p>${cur.time}</p>
            <p>${cur.hot}</p>
            <p>$${cur.price}</p>
        </li>`
    }
    mallItem.innerHTML = str;
}();
~function(){
    mallList = utils.toArray(mallList);
    function sortGoods(){
        var _this = this;
        var ary = ["data-time","data-price","data-hot"];
        mallList.sort(function(cur,next){
            var attr = ary[_this.index],
                curTime = cur.getAttribute(attr),
                nextTime = next.getAttribute(attr);
            curTime = curTime.replace(/-/g,"");
            nextTime = nextTime.replace(/-/g,"");
            return (curTime - nextTime)*_this.n;
        });
        var frg = document.createDocumentFragment();
        for (var i = 0; i < mallList.length; i++) {
            frg.appendChild(mallList[i]);
        }
        mallItem.appendChild(frg);
        frg = null;
    }
    for (var i = 0; i < menuLink.length; i++) {
        var curLink = menuLink[i];
        curLink.n = -1;
        curLink.index = i;
        curLink.onclick = function (){
            for (var j = 0; j < menuLink.length; j++) {
                var cur = menuLink[j];
                if(cur !== this){
                    cur = -1;
                }
            }
            this.n*=-1;
            sortGoods.call(this);
        };
    }
}();









