//思路 ：１）获取所有要操作的对象
       // 2)拉取数据，ajax
        // 3) 绑定数据（循环->创建元素标签tr -> 创建四个td->td赋值->放到tr中 ->tr放到文档碎片中->frg放进tbody中）
        // 4) 隔行变色 （奇偶行->取模%->改变类名）
        // 5)给表头th绑定点击事件，点击的时候执行sortList（参数）方法
       // 6)sortList 方法  （类数组转数组-》数组排序->数字和汉字区分-> 重新添加到页面中）

//tHead  : 获取表头
// rows  : 获取行
// cells  : 获取表格中某一行的列
// tBodies[0]  : 获取表格中第一个tBody
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var rows = tBody.rows;// 获取tbody中的所有行
var data = null;

// 获取数据 ajax    async Javascript and xml

// 1、 创建一个ajax的对象
// var xhr = new XMLHttpRequest();
// //2、打开文件
// xhr.open("get","./data.txt",false);
// //3 、监听
// xhr.onreadystatechange = function () {
//     if(xhr.readyState == 4 && xhr.status == 200){
//         data =utils.toJSON(xhr.responseText);
//     }
// };

// 4、发送请求
// xhr.send();
var data=[
    {"name":"武松","age":35,"hurt":105,"sex":1},
    {"name":"李逵","age":32,"hurt":125,"sex":1},
    {"name":"林冲","age":30,"hurt":149,"sex":1},
    {"name":"鲁智深","age":31,"hurt":120,"sex":1},
    {"name":"孙二娘","age":26,"hurt":110,"sex":0}
];
function bindData(){
    var frg = document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var cur = data[i];//{"name":"武松","age":35,"hurt":105,"sex":1}
        var oTr = document.createElement("tr");
        for(var key in cur){
            var oTd = document.createElement("td");
            if(key == "sex"){
                if(cur[key]== 1){
                    oTd.innerHTML = "男";
                }else{
                    oTd.innerHTML ="女";
                }
            }else{
                oTd.innerHTML = cur[key];
            }
            oTr.appendChild(oTd);
        };
        frg.appendChild(oTr)
    };
    tBody.appendChild(frg);
    frg =null;
};
bindData();
function changeBg() {
    for(var i=0;i<rows.length;i++){
        // rows[i].className = null;
        i%2 == 0 ? rows[i].className = "even" : rows[i].className = null;
    }
}
changeBg();
// 通过点击列的索引进行排序
function sortList(index) {
    var _this = this;
    for(var j =0;j<oThs.length;j++){
        j!==index ?oThs[j].flag =-1:null;
    };
    // debugger
    _this.flag *=-1;
    var ary = utils.toArray(rows);
    ary.sort(function (a,b) {
        var aContent = a.cells[index].innerHTML;
        var bContent = b.cells[index].innerHTML;
         if(index !==0){
             var cur = parseFloat(aContent);
             var nexCur = parseFloat(bContent);
             return (cur -nexCur)*_this.flag;
         }else{
             return (aContent.localeCompare(bContent))*_this.flag;
         }
    });
    // if(this.flag == "asc"){
    //     ary.reverse();
    //     this.flag = "desc"
    // }else{
    //     this.flag = "asc";
    // };
    // console.log(ary)
    for(var i=0;i<ary.length;i++){
        tBody.appendChild(ary[i])
    }
    changeBg();
}
// debugger
// 给表头绑定点击排序事件
for(var i=0;i<oThs.length;i++){
    oThs[i].index = i;
    oThs[i].flag= -1;
    if(oThs[i].className == "cursor"){
        oThs[i].onclick = function () {
            sortList.call(this,this.index);
        }
    }
}





