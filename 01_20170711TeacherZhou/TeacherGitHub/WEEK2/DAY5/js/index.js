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
    function sortRows(cellIndex) {
        //->cellIndex:你想按照哪一列排序,就把当前列的索引传递进来
        var stuRowsAry = utils.toArray(stuRows);
        var _this = this;
        stuRowsAry.sort(function (a, b) {
            //->首先我们要判断，需要排序的这一列是否为数字，数字按照减法运算实现排序，汉字按照localeCompare方法实现排序
            var curInn = a.cells[cellIndex].innerHTML;
            var nextInn = b.cells[cellIndex].innerHTML;
            var curInnNum = parseFloat(curInn);
            var nextInnNum = parseFloat(nextInn);

            if (isNaN(curInnNum) || isNaN(nextInnNum)) {
                //->只要有一个不是有效的数字,就不能使用减法进行运算排序
                return (curInn.localeCompare(nextInn)) * _this.n;
            }

            return (curInnNum - nextInnNum) * _this.n;
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
            /*
             * 点击当前列，把其它列的自定义属性n的值设置为默认值-1，下一次在点击其它列才会从新的按照升序排列
             */
            this.n *= -1;
            sortRows.call(this, this.index);
        }
    }
    //
    // stuHeadList[2].n = -1;
    // stuHeadList[2].onclick = function () {
    //     this.n *= -1;
    //     sortRows.call(this, 2);
    // };
    //
    // stuHeadList[1].n = -1;
    // stuHeadList[1].onclick = function () {
    //     this.n *= -1;
    //     sortRows.call(this, 1);
    // };
    //
    // stuHeadList[0].n = -1;
    // stuHeadList[0].onclick = function () {
    //     this.n *= -1;
    //     sortRows.call(this, 0);
    // };
}();