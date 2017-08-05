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


var str = ``;//->``  是tab键上面的两个撇;不是单引号

for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str+=`<tr>
            <th>${cur.id}</th>
            <th>${cur.name}</th>
            <th>${cur.age}</th>
        </tr>`

}

studentBody.innerHTML = str;


