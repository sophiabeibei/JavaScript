/*
* toArray: converts a like array into an array (jQuery)把类数组转换成数组
* @
*
* */
/**
 * toArray: converts a like array into an array (jQuery)
 * @parameters likeAry: [object] like array
 * @return [Array] an array
 * by iBei on 2017-08-03
 */

function toArray(likeAry) {
    var ary = [];
    try{
        //->如果不报错说明兼容
        ary = Array.prototype.slice.call(likeAry);
    }catch (e){
        //->报错进入catch,说明(IE6-8: 不兼容)
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
}













































