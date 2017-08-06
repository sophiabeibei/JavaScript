var data = null;
var xhr = new XMLHttpRequest;
xhr.open('GET', 'json/data.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText);
    }
};
xhr.send(null);

//--------------数据绑定
//->动态创建DOM元素
//->字符串拼接(ES6中模板字符串)
//->模板引擎(REACT/VUE/EJS/TEMPLATE...)

var studentList = document.getElementById('studentList');
var studentBody = studentList.tBodies[0];

var frg = document.createDocumentFragment();//->创建一个文档碎片：临时的容器
for (var i = 0; i < data.length; i++) {
    var cur = data[i];

    var oTr = document.createElement('tr');
    //->创建3TD
    var oTd1 = document.createElement('td');
    oTd1.innerHTML = cur['id'];
    oTr.appendChild(oTd1);

    var oTd2 = document.createElement('td');
    oTd2.innerHTML = cur['name'];
    oTr.appendChild(oTd2);

    var oTd3 = document.createElement('td');
    oTd3.innerHTML = cur['age'];
    oTr.appendChild(oTd3);

    //->把TR放在FRG（文档碎片）中
    frg.appendChild(oTr);
}

studentBody.appendChild(frg);//->最后统一把文档碎片中的内容放入到页面中（引发一次DOM回流）
frg = null;









