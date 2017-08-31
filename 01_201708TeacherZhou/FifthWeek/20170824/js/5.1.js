document.body.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    //console.log(e.target);

    if (e.target.id === "center") {
        console.log("I am center");
    } else if (e.target.id === "inner") {
        console.log("I am inner");
    } else if (e.target.id === "outer") {
        console.log("I am outer");
    } else if (e.target.tagName === "body") {
        console.log("I am body");
    }
};

/*
* 事件委托(事件代理):
*   利用了事件的冒泡传播机制(当前元素的相关行为被触发,其所有父级元素的相关行为都会被触发,如果绑定了方法,对应的方法也会被执行[执行方法的时候也会把事件对象传递给对应的函数])
*
*   通过事件对象中的事件源,我们可以清楚的知道当前操作的是哪一个元素,也可以根据事件源的不同做不同的事情
*
*   利用上面的机制,如果我们一个容器中很多元素都要绑定点击事件,我们则不需要再一个个的绑定方法了,直接给最外层容器的点击事件绑定方法即可,这样不管点击的是哪一个后代元素,当前外层容器的click行为都会被触发,绑定的方法也会被执行;我们通过区分事件源来处理不同的事情即可...=>这样的处理机制所消耗的性能比一个个绑定消耗的性能减少50%左右(约等于值)
* */


//本案例重点:
//e.target事件源   e.srcElement事件源
