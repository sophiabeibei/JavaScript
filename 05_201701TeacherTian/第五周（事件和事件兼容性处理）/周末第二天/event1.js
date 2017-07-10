;(function (){
    function on(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn);
        }else{
            if(!ele['AAA'+type]){
                ele['AAA'+type] = [];
                ele.attachEvent('on'+type,bind(run,ele));
            }
            var a = ele['AAA'+type];
            for(var i = 0; i < a.length; i++){
                if(a[i] === fn){
                    return;
                }
            }
            a.push(fn);
        }
    }
    function run(e){
        e = window.event;
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function (){ e.returnValue = false; }
        e.stopPropagation = function (){ e.cancelBubble = true; }

        var a = this['AAA'+e.type];
        if(a){
            for(var i = 0; i < a.length; i++){
                if( typeof a[i] == 'function'){
                    a[i].call(this,e);
                }else{ // null 如果不是函数就是null，那么在执行的时候就可以删除掉
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    function off(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else{
            var a = ele['AAA'+type];
            if(a && a.length){
                // 遍历数组中的没一个函数，只要和当前要移除的函数相同那么就从数组中删除
                for(var i = 0; i < a.length; i++){
                    if(a[i] === fn){
                        //a.splice(i,1);
                        a[i] = null;
                        break;
                    }
                }
            }
        }
    }

    //bind(run,ele);

    function bind(fn,context){ // 处理this
        return function (e){
            fn.call(context,e);
        }
    }

    // function (){ // bind
    //     run.call(ele); // run的this处理成ele => 把run方法包装一个匿名函数，真正绑定的是匿名函数。
    // }

    window.on = on;
    window.off = off;
})();



Element.prototype.on = function (type,fn){
    // this => ele div1


    return this; // 链式写法  函数执行结束之后留下当前类实例
}

// HTMLDivElement => HTMLElement => Element => Node

//div1.on('click',fn1)/*这个on方法执行结束仍然留下div1*/.on('click',fn2)