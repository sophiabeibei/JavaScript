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
        var stuRowsAry = utils.toArray(stuRows);
        var _this = this;
        stuRowsAry.sort(function (a, b) {
            var curInn = a.cells[cellIndex].innerHTML;
            var nextInn = b.cells[cellIndex].innerHTML;
            var curInnNum = parseFloat(curInn);
            var nextInnNum = parseFloat(nextInn);
            if(isNaN(curInnNum) || isNaN(nextInnNum)){
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
    for (var i = 0; i < stuHeadList.length; i++) {
        stuHeadList[i].n = -1;
        stuHeadList[i].index = i;
        stuHeadList[i].onclick = function () {
            this.n *=-1;
            sortRows.call(this,this.index);
        };
    }
}();


//需要绑定点击事件(下一个)
//这个是绑定了点击事件
//这里优化this
//这里优化按年龄,按id...排序;(for循环的排)