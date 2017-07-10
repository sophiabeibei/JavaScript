
;(function (){
    function addWheelEventListener(ele,fn){
        var handler = function (e){
            e = e || window.event;
            var isDown;
            if(e.wheelDelta){ // chrome ie
                isDown = e.wheelDelta < 0;
            }else{
                isDown  = e.detail > 0;
            }
            fn.call(ele,isDown,e);
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        };
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox') == -1){
            ele.onmousewheel = handler;
        }else{ // firefox
            ele.addEventListener('DOMMouseScroll',handler);
        }
    }
    window.addWheelEventListener = addWheelEventListener;
})();

