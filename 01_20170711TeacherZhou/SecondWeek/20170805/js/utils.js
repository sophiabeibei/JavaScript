utils = function(){
    //toArray: Convert a like array into an array
    function toArray(likeAry) {
        var ary = [];
        try{
            ary = [].slice.call(likeAry);
        }catch(e){
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];

            }
        }
        return ary;
    }

    //toJSONObject: Converting JSONStrings into JSONObjects
    function toJSON(str) {
        return "JSON" in window ?JSON.parse(str) : eval("("+str+")");
    }
    return {
        toArray : toArray,
        toJSON: toJSON

    }
};



