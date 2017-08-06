var stuList = document.getElementById("stuList"),
    stuHead = stuList.tHead,
    stuBody = stuList.tBodies[0],
    stuHeadList = stuHead.getElementsByTagName("th"),
    stuRows = stuBody.rows;
~function () {
    var stuDate = null;
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            stuDate = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);
    var str = ``;
    for (var i = 0; i < stuDate.length; i++) {
        var cur = stuDate[i];
        str += `<tr>
            <td>${cur.id}</td>
            <td>${cur.name}</td>
            <td>${cur.age}</td>
        </tr>`;
    }
    stuBody.innerHTML = str;
}();
~function () {
    function sortRows(cellIndex) {
        //->cellIndex: 你想按照哪一列排序,就把当前的索引传递进来
        var stuRowsAry = utils.toArray(stuRows);
        var _this = this;
        stuRowsAry.sort(function (a, b) {
            //->首先我们要判断,需要排列的这一列是否为数字,数组按照减法运算实现排序,汉子按照'localCompare'方法实现排序
            var curInn = a.cells[cellIndex].innerHTML;
            var nextInn = b.cells[cellIndex].innerHTML;
            var curInnNum = parseFloat(curInn);
            var nextInnNum = parseFloat(nextInn);
            if(isNaN(curInnNum) || isNaN(nextInnNum)){
                //->只要有一个不是有效数字,就不能使用减法进行运算就排序
                return (curInn.localeCompare(nextInn))*_this.n;
            }
            return (curInnNum - nextInnNum)*_this.n;
        });
        var frg = document.createDocumentFragment();
        for (var i = 0; i < stuRowsAry.length; i++) {
            var curRow = stuRowsAry[i];
            frg.appendChild(curRow);
        }
        stuBody.appendChild(frg);
        frg = null;
    }
    //->一个个的绑定事件
    /*stuHeadList[2].n = -1;
    stuHeadList[2].onclick = function () {
        this.n *=-1;
        sortRows.call(this,2);
    };


    stuHeadList[1].n = -1;
    stuHeadList[1].onclick = function () {
        this.n *=-1;
        sortRows.call(this,1);
    };

    stuHeadList[0].n = -1;
    stuHeadList[0].onclick = function () {
        this.n *=-1;
        sortRows.call(this,0);
    }*/

    //->for循环
    for (var i = 0; i < stuHeadList.length; i++) {
        stuHeadList[i].n = -1;
        stuHeadList[i].index = i;
        stuHeadList[i].onclick = function () {
            /*
            * 点击当前列,把其它列的自定义属性n的值设置为默认值-1,下一次再点击其它列才会重新的按照升学排列
            *
            * */
            this.n *=-1;
            sortRows.call(this,this.index);
        };
    }
}();



//这里优化按年龄,按id...排序;(一个个的排/for循环的排)