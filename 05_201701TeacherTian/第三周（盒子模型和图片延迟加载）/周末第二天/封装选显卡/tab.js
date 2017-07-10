function tabChange(tab,defaultSelIndex){
    defaultSelIndex = defaultSelIndex || 0;
    //var tab = utils.getElesByClass('tab')[2];
    var lis = tab.getElementsByTagName('li');
    lis[defaultSelIndex].className = 'active';
    var divs = tab.getElementsByTagName('div');
    divs[defaultSelIndex].className = 'active';
    for(var i = 0; i < lis.length; i++){
        lis[i].onmouseover = function (){
            utils.addClass(this,'active');
            var siblings = utils.siblings(this);
            for(var i = 0; i < siblings.length; i++){
                utils.removeClass(siblings[i],'active');
            }
            var index = utils.index(this);
            var divs = utils.nextAll(this.parentNode);
            for(var i = 0; i < divs.length; i++){
                utils.removeClass(divs[i],"active");
            }
            utils.addClass(divs[index],'active');
        }
    }
}

