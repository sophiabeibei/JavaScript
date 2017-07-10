## react

@(react学习)

- 给虚拟DOM增加样式 className
- 遍历对象
```
var app=document.querySelector('#app')
var names=['大毛','二毛','没毛']
ReactDom.render(<ul>
    {
        names.map(function(name,index){
        //key属性，是为了标示唯一的DOM元素
            return <li key={index}>{name}</li>
        })
    }
</ul>,app);
```
- component 定义自定义组件
```
//自定义组件首字母必须大写，小写开头会被react当做内置组件来处理;
var Message=React.createClass({
    //标示此组件将会被如何渲染；
    render(){
        //有且只能返回一个顶级元素
        return (
            <div>hello</div>
        )
    };
})
ReactDOM.render(<Message/>,app);
```
- component复合组件和单项数据流（通过属性来传递）this.props.xxx
```

let Panel=React.createClass({
   render(){
        //得到属性this.props{head:xx,body:xxxx}： this指向实例
        return(
            <div>
                <h2>{this.props.children}</h2>//针对ReactDOM.render(<Panel head="头"><span>lalala<Panel/>,app);//如果这里嵌套多个span，那么this.props.children就是数组
                <div className="panel panel-default">
                   <PanelHead content={this.props.head}></PanelHead>
                   <PanelBody content={this.props.body}></PanelBody>
                   <PanelFooter  content={this.props.footer}></PanelFooter>
               </div>
            </div>
        )
   }
})
let PanelHead=let Panel=React.createClass({
    render(){
            return(
                <div className="panel-heading">
                    {this.props.head}
                </div>
            )
       }
})
let PanelBody=let Panel=React.createClass({
    render(){
            return(
                <div className="panel-bodying">
                    面板体
                </div>
            )
       }
})
ReactDOM.render(<Panel head="头"/>,app);
```
- status 状态
***状态只能由内部初始化，只能由组件内部改变
```
var Counter=React.createClass({
    //内部初始化状态
    getInitialState(){
        return {
            count:0;
        };
    }
    handleClick(){
    //修改状态：this.setState; 掉完此方法,react会自动调用render方法重新绘制界面
        this.setState({
            count:this.state.count+1
        })
    }
    render(){
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick}>加1</button>
            </div>
        )
    }
})
```
- react操作DOM元素 this.refs.xxxx
```
var Focus=React.createClass({
    handleClick(event){
    //refs是个对象，key是myTxt，值是此myTxt对应的DOM元素
        this.refs.myTxt.focus();
    }，
    render(){
        return (
            <div>
                <input type='text' ref="myTxt">
                <button onclick={this.handleClick}>焦点</button>
            </div>
        )
    }
});
```
- 综合实例:百度搜索框