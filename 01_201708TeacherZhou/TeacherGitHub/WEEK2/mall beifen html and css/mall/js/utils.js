var utils = (function () {
    //->toArray:converts a like array into an array
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry);
        } catch (e) {
            var len = likeAry.length;
            for (var i = 0; i < len; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON：converts a string into a object (JQ)
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    return {
        toArray: toArray,
        toJSON: toJSON
    }
})();