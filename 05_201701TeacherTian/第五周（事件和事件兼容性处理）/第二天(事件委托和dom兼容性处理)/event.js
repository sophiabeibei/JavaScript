function on(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn);
    } else {
        // for ie8-
        if (!ele['AAA' + type]) {
            ele['AAA' + type] = [];
            ele.attachEvent('on' + type, /*run*/function () {
                this; // window
                run.call(ele);
            });
        }
        var a = ele['AAA' + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                return;
            }
        }
        a.push(fn);
    }
}

function run(e) {
    this; // ele : e.target  this => 把run中的this修改成ele
    e = window.event;
    e.target = e.srcElement;
    //div1.AAAclick
    var a = /*e.target*/this['AAA' + e.type]; //
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == 'function') {
                a[i].call(/*e.target*/this);
            }else{ // null
                a.splice(i,1);
                i--;
            }
        }
    }
}


function off(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn);
    } else {
        // for ie8-    div1.AAAclick = [fn1,fn2,fn3 ...]
        var a = ele['AAA' + type];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === fn) {
                    /* a.splice(i,1);*/
                    a[i] = null; //
                    break;
                }
            }
        }
    }
}


//

//div1.on('click',fn1); // HTMLDivElement  HTMLElement Element

Element.prototype.on = function (/*ele,*/type,fn){
    this; // div1
    // ......
}



