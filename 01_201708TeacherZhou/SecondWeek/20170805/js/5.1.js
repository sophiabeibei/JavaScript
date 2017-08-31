var data = null;

var xhr = new XMLHttpRequest;
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText);
        console.log(utils.toJSON(xhr.responseText));
    }
};
xhr.send(null);

//---------------------数据动态绑定
var studentList = document.getElementById("studentList");
// studentList.tHead =>获取唯一的<thead>标签
// studentList.tBodies[0] =>获取所有的<tbody>标签,一个表格中可以有多个tbody,想获取第一个需要加索引
var studentBody = studentList.tBodies[0];
// studentBody.rows =>获取tbody中所有的<tr>标签(行)
// studentBody.rows[0].cells =>获取第一行中的所有列(<td>或者<th>)



//动态创建DOM(弊端: 1.开发效率低,麻烦;2.DOM回流)
/*
* DOM回流:
*   当页面中的html结构发生改变,浏览器会把所有的结构进行重新的计算和渲染 =>非常消耗性能;从性能优化角度来讲,我们应该减少DOM回流
*
* DOM重绘
*   当页面中某一个元素的样式(颜色等)发生改变,浏览器会把这个元素的样式重新绘制以下 =>对想能没有太大的影响;
*
* */

for (var i = 0; i < data.length; i++) {
    var cur = data[i];

    var oTr = document.createElement("tr");
    //->除了创建tr,还要创建三个td;
    var oTd1 = document.createElement("td");
    oTd1.innerHTML = cur["id"];
    oTr.appendChild(oTd1);

    var oTd2 = document.createElement("td");
    oTd2.innerHTML = cur["id"];
    oTr.appendChild(oTd2);

    var oTd3 = document.createElement("td");
    oTd3.innerHTML = cur["id"];
    oTr.appendChild(oTd3);

    //->把tr放在tbody中
    studentList.appendChild(oTr);
}

