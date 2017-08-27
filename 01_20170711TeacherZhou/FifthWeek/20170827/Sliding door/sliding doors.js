window.onload = function()
{
    var box = document.getElementById("container");  //获得容器对象  
    var imgs = box.getElementsByTagName("img");  //获得图片对象数组  
    imgWidth = imgs[0].offsetWidth;  //图片宽度  
    var exposeWidth = 100;  //每张图片露出的宽度  
    var boxWidth = imgWidth + exposeWidth * (imgs.length - 1);
    box.style.width = boxWidth + "px";

    //初始化图片位置  
    function reset()
    {
        for(var i = 1; i < imgs.length; i ++)
        {
            imgs[i].style.left = imgWidth + (i - 1) * exposeWidth + "px";
        }
    }
    reset();

    //开门时候每个图片应该左移的距离  
    var translate = imgWidth - exposeWidth;
    //为每个图片添加事件  
    for(var i = 0; i < imgs.length; i ++)
    {

        //自动执行函数  
        (function(i){
            imgs[i].onmouseover = function()
            {
                //重置图片位置  
                reset();
                for(var j = 1; j <= i; j ++)
                {
                    imgs[j].style.left = parseInt(imgs[j].style.left, 10) - translate + "px";

                }
            };

        })(i);
    }
};  