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
        //->把存储所有行的类数组转换为数组(只有数组才能用SORT方法进行排序)
        var stuRowsAry = utils.toArray(stuRows);

        //->让所有的行按照年龄这一列由小到大排序
        stuRowsAry.sort(function (a, b) {
            var curAge = parseFloat(a.cells[2].innerHTML);
            var nextAge = parseFloat(b.cells[2].innerHTML);
            return curAge - nextAge;
        });

        //->按照数组排好的顺序,我们把每一行重新的放入到页面中,让页面中的结构也跟着排序
        var frg = document.createDocumentFragment();
        for (var i = 0; i < stuRowsAry.length; i++) {
            var curRow = stuRowsAry[i];
            frg.appendChild(curRow);
        }
        stuBody.appendChild(frg);
        frg = null;
    }

    sortRows();


}();