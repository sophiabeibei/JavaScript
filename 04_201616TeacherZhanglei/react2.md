## react2-- jsx语法
### react中需要注意的小细节知识点
- 渲染时，所有的jsx标签必须放在一个大容器下
- 注释问题
```
render(){
        //定义一个name
        const name="蕾蕾1123";
        return(
            <h1>hello,加油吧{name}，你的能力超乎你想象
                {/*此处添加注释的方式*/}
            </h1>
        )
    }
```
- class=>className ; for=>htmlfor `<label htmlfor="name"/>`
## 引入css样式
## 通过外链引入的方式
1. 创建index.css样式表，通过import './index.css'倒入，`<div className='container'>`
2. 安装对应的插件 npm install style-loader css-loader --save-dev
3. 在webpack.config.js中设置
```
{
    test:/\.css$/,//匹配css文件
    loader:'style!css'//两个loader通过!号连接，注意顺序问题
}
```
## jsx语法：行内样式
- 定义样式，并通过style引入
```
render(){
    //定义一个name
    const name="蕾蕾1123";
    const styles={
        background:'green',
        color:'red',
    }
    return(
        <div style={styles}>
            <h1>hello,加油吧{name}，你的能力超乎你想象
                {/*此处添加注释的方式*/}
            </h1>
        </div>
    )
}
```
### 组建创建的三种方式
### 1.有状态组建：es6 和 es5两种创建方式
- es6创建
```
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
class App extends Component{
    render(){
        return(
            <div style={styles}>HI,WORLD!</div>
        )
    }
}
render(<App/>,document.getElementById('app'));
```
- ES5创建
```
var React=require('react');
var ReactDOM=require('react-dom');
var App=React.createClass({
    render:function(){
        return (
            <h1>hello,world!</h1>
        )
    }
})
ReactDOM.render(<App/>,document.getElementById('app'))
```
#### 2.无状态创建组建
`const App=()=><h1>hello</h1>`;
`render(<App/>,document.getElementById('app'))`
### 组建的属性
####数据流动：
`props：组件间的数据传递` VS `state：管理组件自己内部的数据`
- 属性的传递 props：父组件到子组件单向流数据传递；
```
//index中
return <Profile name={data.name} id={data.id} url={data.avatar_url}/>
```
```
//自定义组件中
var data=this.props;
```
- 组件字段类型的设置 PropTypes
```
import React,{Component,PropTypes} from 'react';
Profile.propTypes={
    name:PropTypes.string,
    url:PropTypes.string,
    id:PropTypes.number.isRequired

}
```
- 容错处理 defaultProps
```
Profile.defaultProps={
    name:'xx',
    id:'xx'
}
```
### 组件状态 state
- state初始值的设置
```
constructor(){
        super();
        //初始的state； 跟之前定义的defaultProps性质一样；
        this.state={
            name:'leilei'
        }
    }
```
- 设置state:`this.setState()`
- 获取state:`this.state.name`
### 关于this指向问题：
1. 在调用函数的时候，通过bind传this；`<input type="text" onChange={this.update.bind(this)}/>`
2. 在constructor中通过bind修改this后，重新赋值；
```
constructor(){
    super();
    //初始的state； 跟之前定义的defaultProps性质一样；
    this.update=this.update.bind(this);//更改update的this指向；
    this.state={
        name:'leilei'
    }
}
```
3. 使用箭头函数=》必须安装插件 babel-preset-stage-0 (他是为使用箭头函数而安装的); 并在presets中设置；
```
update=(e)=>{
    //改变state的值
    this.setState({
        name:e.target.value
    })
}
```
### DOM虚拟操作：
1. 使用findDOMNode拿到真实的DOM元素：`import ReactDOM, {render,findDOMNode} from 'react-dom';`
2. this.refs.one 拿到DOM元素
3. 在子元素中操作父级
```
const {update}=this.props;
        return (
            <input
                type="range"
                min="0"
                max="100"
                onChange={update}
                />
        )
```
4. react中以下那些属性可以操纵DOM节点?
    - findDOMNode
    - ummountComponentAtNode
### 获取子组件
- this.props.children 拿到DOM传进来的元素
```
class App extends Component{
    render(){
        return (
            <List>
                <h1>hello</h1>
                <h2>react</h2>
            </List>
        )
    }
}
class List extends Component{
    render(){
        return <div>{this.props.children}</div>
    }
}
```
- React.Children->API 可以提供一些封装好的方法，供我们使用children；
```
//父组件
<List>
    <a href="https:www.baidu.com">百度搜索</a>
    <a href="https:www.zhufeng.cn">珠峰培训</a>
</List>
```
```
//子组件：注意=》必须先引入Children通过react
import React,{Component,Children} from 'react';
render(){
    let node=Children.map(this.props.children,(item)=>{
        return <li>{item}</li>;
    })
    return (
        <ul>
            {node}
        </ul>
    )
}
```
### react的生命周期
- 移除组件有两种方式：
    1. 从根元素移除整个DOM节点：导入`import reactDOM,{unmountComponentAtNode,render} from 'react-dom'`
 通过`ReactDOM.unmountComponentAtNode(document.getElementById('app'))`进行直接删除组件
    2. 设置布尔值，但为移除为true的时候，不执行渲染； if(true) return null;也可以移除
### 进行代码测试时我们会下载那些插件
    - karma-chrome-launcher
    - karma-mocha
### 在浏览器端进行源码调试的插件：cheap-source-map