
(function (){
    function banner(/*$banner,*/url,interval){
        //var $banner = $('.banner');
        var $banner = this;
        interval = interval || 2000; // 给参数一个默认值
        var $inner = $banner.find('.inner');
        var $ul = $banner.find('ul');
        var $left = $banner.children('.left');
        var $right = $banner.children('.right');
// 以上元素都是存在的
        var $imgs = null; //$inner.find('img'); // 不存在
        var $lis = null;  //$ul.find('li');  // 不存在
// 获取数据
        var data = null;
        $.ajax({
            type : 'get',
            url  : /*'data.txt'*/url,
            async : false,
            cache : false,
            dataType : 'json',
            success : function (res){
                data = res;
            }
        });
        console.log(data);

// 绑定数据
        if(data && data.length){
            var strImg = ''; //图片
            var strLi = ''; //焦点
            $.each(data,function (index,item){ // item : data[i]
                strImg += '<img src="" real="'+ item.src +'">';
                strLi +=  index == 0 ? '<li class="cur"></li>' : '<li></li>'; // 单独处理选中的li
            });
            $inner.html(strImg);
            $ul.html(strLi);
        }

// 图片有效性验证 => 遍历每一张图片，只要资源real没有问题，那么就把real的值赋值给src属性
        $imgs = $inner.find('img'); // jq对于不存在的dom元素的获取没有映射关系
        $lis = $ul.find('li'); // 对于不存在的元素不用提前获取
        $imgs.each(function (index,item){
            // 循环要操作   item就是每一张真实图片 index每张图片的索引
            var $tempImg = $('<img>'); // 创建
            // attr prop
            $tempImg.prop('src',$(item).attr('real'));
            $tempImg.on('load',function (){
                $(item).prop('src', $(this).prop('src'));
                if(index == 0){
                    $(item).css('zIndex',1).stop().animate({opacity : 1},300);
                }
            });
        });

// 轮播图开始
        var index = 0; // 默认第一张
        var timer = window.setInterval(autoMove,/*2000*/interval);
        function autoMove(){ // 执行一次，下一张图片显示
            index++; // 累加之后的index的值就是下一次那一张图片出现的索引
            if(index == /*4*/data.length){
                index = 0;
            }
            setImg(); // 根据index的值来显示对应的图片
        }
        function setImg(){ // 负责让哪一张图片出现的 => imgs的索引和index相同的那一张
            // 循环所有的图片，索引值和全局index相等
            $imgs.each(function (imgIndex,img){
                if(imgIndex == index){
                    $(img).css('zIndex',1).stop().animate({opacity : 1},300,function (){
                        // 当前和index相等的这一张图片提高层级并且动画到1之后，还要让除了当前这一张的其他所有图片的透明度都设置成0，保证下一次动画仍然是有淡入效果
                        $(this).siblings().css('opacity',0);
                    });
                }else{
                    $(img).css('zIndex',0);
                }
            });

            // 焦点
            $lis.each(function (liIndex,li){
                liIndex == index ? $(this).addClass('cur') : $(li).removeClass('cur');
            });

        }

        $banner.mouseover(function (){
            window.clearInterval(timer);
            $left.css('display','block');
            $right.css('display','block');
        }).mouseout(function (){
            timer = window.setInterval(autoMove,interval);
            $left.css('display','none');
            $right.css('display','none');
        });


        $left.on('click',function (){
            index--;
            if(index == -1){
                index = data.length-1;
            }
            setImg();
        });

        $right.on('click',autoMove);

        $lis.each(function (liIndex,li){
            $(li).on('click',function (){
                index = $(this).index(); // 把当前点击的li的索引值赋值给index，然后setImg方法根据index的值显示对应的图片
                setImg();
            });
        });

    }
// $.extend({
//     banner : banner
// });
    $.fn.extend({
        banner : banner
    });


})();







