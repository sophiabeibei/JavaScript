var stuList = document.getElementById("stuList"),
    stuHead = stuList.tHead,
    stuBody = stuList.tBodies[0],
    stuHeadList = stuHead.getElementsByTagName("th"),
    stuRows = stuBody.rows;


//->AJAX获取数据然后做数据绑定
~function () {
    //->1.getData获取数据
    var stuDate = null;
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            stuDate = utils.toJSON(xhr.responseText);
        }
    };
    xhr.send(null);

    //->bindData绑定数据
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


//->让所有的行按照年龄由小到大排序
~function () {
    function sortRows() {
        //->1.把存储所有行的类数组转换为数组(只有数组才能用sort方法进行排序)
        var stuRowsAry = utils.toArray(stuRows);

        //->2.让所有的行按照年龄这一列由小到大排序
        stuRowsAry.sort(function (a, b) {
           var curAge = parseFloat(a.cells[2].innerHTML);
           var nextAge = parseFloat(b.cells[2].innerHTML);
           return curAge - nextAge;

        });
        //->按照数据拍好的顺序,我们把每一行重新的放入到页面中,让页面中的结构也跟着排序
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











//需要绑定点击事件(下一个)










