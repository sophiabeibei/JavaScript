
//->utils: 整个项目的公共方法库(使用单利模式封装)
var utils = (function (){

    //->toArray: converts a like array into an array(把类数组转换成数组)
    function toArray(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry);
        }catch(e){
            var len = likeAry.length;
            for (var i = 0; i < len; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON: converts a string into a object (把JSON字符串转化为对象)
    function toJSON(str) {
        //->传一个字符串过来,最终转化成对象;
        return "JSON" in window ? JSON.parse(str) : eval('('+str+')');
    }




















    return {
        toArray: toArray,
        toJSON: toJSON
    }
})();
















































