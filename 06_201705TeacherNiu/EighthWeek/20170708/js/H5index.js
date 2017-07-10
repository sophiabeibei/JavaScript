//rem: 动态计算根元素html的rem字体大小
/**
 * 750       375
 * 100       ?=375/750*100
 *
 */
function refreshRem() {
    var dewS = 750,
        winW = document.documentElement.clientWidth,
        ratio = winW/dewS;
    document.documentElement.style.fontSize = ratio * 100 + "px";
}
refreshRem();
//监听事件: 监听浏览器窗口的拉伸/缩小 (以后写项目,这条语句可以通用)
window.addEventListener("resize",refreshRem,false);



//时间戳整理 从年月日时分里取几月几号的时间;
function changeTime(time){
    if(time){
        var str=time,
            str1 =str.substr(5,2),
            str2 =str.substr(8,2);
        return str=str1+'-'+str2;
    }
}




//中间内容第二步: $.ajax()通过Ajax获取数据,动态的绑定到页面中(详细看html文件中的"中间内容第三步: 造模版");
$.ajax({
    //url: 数据接口及地址(老师给的地址,在)
    url: "http://api.iclient.ifeng.com/ClientNews?id=SYLB10,SYDT10&gv=5.4.0&os=ios&uid=8jWzrXDWQeep2Nw4AZYzmHxkbneHy4Fj",
    type: "get",
    dataType: "jsonp",
    callback: "jsonp",
    //调用方法用
    success: bindHtml
});
function bindHtml(data) {
    console.log(data);//list   focus
    for (var i = 0; i < data.length; i++) {
        if(data[i].type == "list"){
            listData = data[i].item;
        }else{
            focusData = data[i].item;
        }
    }
    console.log(focusData);
    console.log(listData);//打印listData的长度

    /*
    //ejs第三步: 造好模板数据之后,模板数据怎样与Ajax产生关联???
    */


    //ejs第四步: ejs.render把模板的html结构模板的数据以及aiax获取到的数据渲染到页面中
    var focusHTML = $("#focusTemplate").html();
    var result = ejs.render(focusHTML,{data:focusData});
    console.log(result);
    $(".swiper-wrapper").html(result);

    //中间内容的第四步    ejs.render(模板的html结构,{模板的数据名称: ajax获取到内容部分的数据}).html();
    //通过ejs.render渲染到页面中;
    var listHTML = $("#listTemplate").html();
    var listResult = ejs.render(listHTML,{dataList: listData});
    console.log(listResult);
    $(".col").html(listResult);







    /*banner图划不动的问题:
    * swiper: 这个swiper一定要放在(result)获取结构之后的下面
    *
    * */


//swiper: swiper插件提供的,初始化代码配置
    var mySwiper = new Swiper(".swiper-container",{
        //.swiper-pagination: 分页器(默认是小圆点1.20)
        pagination: ".swiper-pagination",
        //fraction: 把小圆点变成分式(几分之几1/20)
        paginationType: "fraction",
        //无缝滚动
        loop: true,
        //autoplay: 自动切换可以放true,也可以放具体的时间值
        autoplay: 800,
        //autoplayDisableOnInteraction: 用户操作之后,会导致autoplay失效,这是重新开启自动轮播的方法;
        autoplayDisableOnInteraction: false,
        //touchMoveStopPropagation: 组织touch的冒泡事件,解决与iscroll冲突导致直接跳转链接问题
        touchMoveStopPropagation : false
    });

}



//上拉刷新,下拉加载
var myScroll,
    pullDownEl,
    pullDownOffset,
    pullUpEl,
    pullUpOffset;
function pullDownAction() {
    console.log("我是向下拉加载的数据");
}
function pullUpAction() {
    console.log("我是向sHang拉加载的数据");
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    /**
     * 初始化iScroll控件
     */
    myScroll = new iScroll('wrapper', {
        vScrollbar: false,
        topOffset: pullDownOffset,
        //checkDOMChanges: true;(监测数据的更新)
        checkDOMChanges: true,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction();
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction();
            }
        }
    });
}



