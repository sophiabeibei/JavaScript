var utils = {
    listToArray : function (list){
        try{
            return Array.prototype.slice.call(list,0);
        }catch(e){
            var ary = [];
            for(var i = 0; i < list.length; i++){
                ary.push(list[i]);
            }
            return ary;
        }
    }
};

