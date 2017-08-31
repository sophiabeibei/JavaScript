var data = null;
var xhr = new XMLHttpRequest;
xhr.open('GET', 'json/data.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = utils.toJSON(xhr.responseText);
        //->按照年龄降序
        data.sort(function (a, b) {
            return b.age - a.age;
        });
    }
};
xhr.send(null);

// var ary = [
//     {
//         "id": 1,
//         "name": "珠峰培训",
//         "age": 8
//     },
//     {
//         "id": 2,
//         "name": "周啸天",
//         "age": 28
//     },
//     {
//         "id": 3,
//         "name": "任立欣",
//         "age": 82
//     }
// ];
// // ary.sort(function (a, b) {
// //     return b.age - a.age;
// // });
// ary.sort(function (a, b) {
//     return a.name.localeCompare(b.name);//->localeCompare:字符串之间比较大小(按照拼音在26个字母表中的位置计算的,靠后大)
// });
// console.log(ary);

//--------------数据绑定
var studentList = document.getElementById('studentList');
var studentBody = studentList.tBodies[0];
var str = ``;
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str += `<tr>
        <td>${cur.id}</td>
        <td>${cur.name}</td>
        <td>${cur.age}</td>
    </tr>`;
}
studentBody.innerHTML = str;







