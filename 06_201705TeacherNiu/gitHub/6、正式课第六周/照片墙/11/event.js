/**
 * Created by yuany on 2017/6/22.
 */

function on(curEle,evenType,evenFn) {
    var reg=/^self/;
    if(reg.test(evenType)){
        if(!curEle["myself"+evenType]){
            curEle["myself"+evenType]=[];
        }
        var ary=curEle["myself"+evenType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===evenFn){return}
        }
        ary.push(evenFn);
        return;
    }
    if(!curEle["mybind"+evenType]){
        curEle["mybind"+evenType]=[];
    }
    var ary=curEle["mybind"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]===evenFn){return}
    }
    ary.push(evenFn);
    curEle['on'+evenType]=function (e) {
        run.call(this,e)
    }
}

function selfrun(curEle,evenType) {
    if(!curEle["myself"+evenType]){
        return
    }
    var ary=curEle["myself"+evenType];
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){ary[i].call(curEle)}
        else{
            ary.splice(i,1);
            i--;
        }
    }
}

function run(e) {
    e=e||event;
    e.target=e.target||e.srcElement;
    e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
    e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
    var ary=this["mybind"+e.type];
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){ary[i].call(this,e)}
        else{
            ary.splice(i,1);
            i--;
        }

    }
}
function off(curEle,evenType,evenFn) {
    var reg=/^self/;
    if(reg.test(evenType)) {
        var ary=curEle["self"+evenType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===evenFn){
                ary[i]=null;
                return
            }
    }
    return;
    }
    var ary=curEle["mybind"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]===evenFn){
            ary[i]=null;
            break;
        }
    }
}