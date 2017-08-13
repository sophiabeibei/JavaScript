//->通过元素的样式类名来获取一组元素
//=>strClass：[string]你想通过哪个样式类名来获取,就传递谁
//1、'w1' 获取所有拥有w1样式类名的元素
//2、'w3 w2' 获取所有即拥有w3也拥有w2样式类名的元素
//=>context：[object]上下文,限定在哪一个容器中获取,如果不传递默认document
function byClass(strClass, context) {
    /*
     * 主体思路：
     * 1、首先获取当前上下文中的所有元素标签
     * 2、循环这些标签,获取每一个标签的class样式值
     * 3、把包含strClass的元素过滤出来
     */
    //->如果没有传递上下文,我们让其默认值是DOCUMENT
    // typeof context === 'undefined' ? context = document : null;
    context = context || document;

    //->通过通配符*获取当前上下文中的所有元素标签
    var tagList = context.getElementsByTagName('*');
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i],
            curTagClass = curTag.className;
        //->需要在curTagClass中验证一下,是否包含传递进来的strClass值
        //=>当前的验证是不能使用字符串的indexOf处理的:indexOf是只要包含对应的字符即可,我们需要的不仅仅是包含对应的字符,而且是必须只能是这个名字才可以,比如:curTagClass='w100 w2 w3'  strClass='w1'  curTagClass.indexOf(strClass)=>0(包含) 但是我们需要验证的是样式类中有一个是w1而不是包含w1这个字符就可以的

        //=>使用正则,假设传递进来的样式类名是'w1',想验证样式类名中有一个是w1,我们把正则写成 var reg=/\bw1\b/;   reg.test('w1 w2')=>true   reg.test('w100 w2')=>false   reg.test('w1-1 w2')=>true  发现了一个问题,我们的样式类名中可以包含-,但是正则的\b元字符代表边界,它把-的左右两边也做为边界了,最后一个例子,我们字符串中没有w1这个样式类,但是结果却是true,所以正则不能这样写

        //=>经过分析,假设传递的是w1,那么我们的正则应该这样写
        // var reg = /(^| +)w1( +|$)/;
        // reg.test('w1 w2 w3') ->true
        // reg.test('w100 w2 w3') ->false
        // reg.test('w2 w1 w3') ->true
        // reg.test('w2 w3 w1') ->true
        // reg.test('w1-qq w2 w3') ->false

        //==>如果strClass只传递一个值
        // var reg=/(^| +)'+strClass+'( +|$)/;//->这里不是字符串拼接,它是让'出现一到多次...  如果想把一个变量的值作为正则的一部分,我们需要使用实例创建的方式来处理
        var reg = new RegExp('(^| +)' + strClass + '( +|$)');
    }
}