var utils = (function () {
    /*
     * toArray：Converts an array of classes to an array
     * @parameter：
     *   likeAry[object]：Class array to convert
     * @return：
     *   ary[Array]：Convert completed array
     * By Team on 2017-04-16 12:44
     */
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0, len = likeAry.length; i < len; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    /*
     * toJSON：Convert JSON string to JSON object
     * @parameter：
     *   str[String]：JSON string
     * @return：
     *   obj[Object]：JSON object
     * By Team on 2017-04-16 12:48
     */
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    return {
        toArray: toArray,
        toJSON: toJSON
    }
})();
