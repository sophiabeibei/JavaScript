//->utils：common method libraries used in projects
var utils = (function () {

    //->toArray：converts a like array into an array
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->toJSON：converts a string to a JSON object
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    return {
        toArray: toArray,
        toJSON: toJSON
    }
})();

