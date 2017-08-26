var $mark = $(".mark");
$("body").mouseover(function (e) {
    var target = e.target,
        $target = $(target),
        $parents = $target.parents();//->祖先元素
    $parents = $target.add($parents);//->把自己也增加进来

    //->menu对应的li
    if(checkParents($parents,"item")){
        var val = $parents.filter("[class='item']").html();
        $mark.stop().show(100).html(val);
        return;
    }
    //->menu对应的ul
    if($target.hasClass("menu")){
        return;
    }
    //->mark(或者mark的后代元素)也是啥都不做
    if(checkParents($parents,"mark")){
        return;
    }
    $mark.stop().hide(100);
});
function checkParents($parents, className) {
    var isFlag = false;
    $parents.each(function () {
        if($(this).hasClass(className)){
            isFlag = true;
            return false;
        }
    });
    return isFlag;
}


//本案例
// 鼠标滑入滑出案例用到的方法: return