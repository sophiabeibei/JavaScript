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
    function sortRows() {
        var stuRowsAry = utils.toArray(stuRows);
        stuRowsAry.sort(function (a, b) {
            var curAge = parseFloat(a.cells[2].innerHTML);
            var nextAge = parseFloat(b.cells[2].innerHTML);
            return (curAge - nextAge)*stuHeadList[2].n;
        });
        var frg = document.createDocumentFragment();
        for (var i = 0; i < stuRowsAry.length; i++) {
            var curRow = stuRowsAry[i];
            frg.appendChild(curRow);
        }
        stuBody.appendChild(frg);
        frg = null;
    }
    //->
    stuHeadList[2].n = -1;//->n这个自定义属性,控制升降序排列;
    stuHeadList[2].onclick = function () {
        //->this: 元素本身
        this.n *=-1;
        sortRows();
    }
}();




//这个是绑定了点击事件

















