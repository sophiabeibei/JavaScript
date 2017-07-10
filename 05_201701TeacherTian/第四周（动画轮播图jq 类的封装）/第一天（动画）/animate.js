;(function (){
    function animate(opt){ // option 选项
        // ele : 运动元素  target : 到哪  duration : 多长时间  callback : 回调
        // time  begin  change
        var ele = opt.ele; // 必选
        var target = opt.target;
        var duration = opt.duration || 1000; // => 哪些参数可以有默认值
        var callback = opt.callback;
        var time = 0;
        var begin = {};
        var change = {};
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        var effect = { // 匀速运动只作为所有运动效果中的一款
            Linear : function (t,b,c,d){
                return t/d*c+b;
            }
            // ...
        };
        window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function (){
            time += 10;
            if(time >= duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback == 'function'){
                    callback.call(ele);
                }
                return;
            }
            for(var key in change){
                if(change[key]){
                    var val = effect.Linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },10);
    }
    window.animate = animate;
})();



