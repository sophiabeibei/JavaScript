var utils = (function(){
    //->toArray
    function toArray(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry);//->把[].slice上的this改成likeAry,再执行slice方法
        }catch(e){
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON
    function toJSON(str){
        return "JSON" in window ? JSON.parse(str) : eval("("+str+")");

        /*if("JSON" in window){
            return JSON.parse(str);
        }else{
            return eval("("+str+")");
        }*/
    }

    return {
        toArray : toArray,
        toJSON : toJSON
    }
})();







