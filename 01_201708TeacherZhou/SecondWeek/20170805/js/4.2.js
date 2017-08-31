//->需求: 去掉一个最高分,去掉一个最低分,剩余的求平均分
function avg(){
    //->1.把arguments类数组转换为数组
    var ary = [];
    for (var i = 0; i < arguments.length; i++) {
        ///->添加到数组末尾的俩方法
        //1.ary.push(arguments[i]);
        //->2.
        ary[ary.length] = arguments[i];

    }

    //->2.把数组排序: 去掉第一个和最后一个
    ary.sort(function (a,b){
        return a - b;
    }).shift();
    //->执行shift的结果,是被删除的那一项,是个数字.后面就不能再跟着链式写法;
    ary.length--;

    //->3.数组中剩下的值求和
    var total = eval(ary.join("+"));

    //->4.求出平均数
    return parseFloat((total/ary.length).toFixed(2));//->toFixed(2)的结果变成字符串了,再parseFloat变成数字


}
var res = avg(90,75,88,100,98,97);
console.log(res);


//(数组求和)用join方法;  合并第(数组求和)+(求平均数),看4.3.js




