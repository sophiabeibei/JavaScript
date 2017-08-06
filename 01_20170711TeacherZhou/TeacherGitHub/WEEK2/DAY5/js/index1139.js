var stuList = document.getElementById('stuList'),
    stuHead = stuList.tHead,
    stuBody = stuList.tBodies[0],
    stuHeadList = stuHead.getElementsByTagName('th'),
    stuRows = stuBody.rows;

//->AJAX获取数据然后做数据绑定
~function () {
    //->GET DATA
    var stuData = null;
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            stuData = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);

    //->BIND DATA
    var str = ``;
    for (var i = 0; i < stuData.length; i++) {
        var cur = stuData[i];
        str += `<tr>
            <td>${cur.id}</td>
            <td>${cur.name}</td>
            <td>${cur.age}</td>
        </tr>`;
    }
    stuBody.innerHTML = str;
}();

//->让所有的行按照年龄由小到大排序
~function () {
    function sortRows() {
        //->this:stuHeadList[2]
        var stuRowsAry = utils.toArray(stuRows);

        var _this = this;
        stuRowsAry.sort(function (a, b) {
            //->this:window
            var curAge = parseFloat(a.cells[2].innerHTML);
            var nextAge = parseFloat(b.cells[2].innerHTML);
            return (curAge - nextAge) * _this.n;
        });
        var frg = document.createDocumentFragment();
        for (var i = 0; i < stuRowsAry.length; i++) {
            var curRow = stuRowsAry[i];
            frg.appendChild(curRow);
        }
        stuBody.appendChild(frg);
        frg = null;
    }

    stuHeadList[2].n = -1;
    stuHeadList[2].onclick = function () {
        //->this:stuHeadList[2]
        this.n *= -1;
        //sortRows();//->this:window
        sortRows.call(this);//->this:stuHeadList[2]
    };
}();