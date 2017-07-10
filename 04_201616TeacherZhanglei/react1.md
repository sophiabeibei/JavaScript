##react1-- react环境搭建

@(react学习)

### 项目初始化和文件的创建
- git init & npm init --y
- touch .gitignore README.md
- touch webpack.config.js
- mkdir src
- cd src && touch index.js index.html
- touch webpack.config.js 并进行基本配置
```
module.exports={
    //入口文件地址
    entry:path.resolve(__dirname,'./src/index.js'),
    //出口文件地址
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'bundle.js'
    }
}
```
### 安装依赖模块并配置
1.  使用webpack需要安装：npm install webpack webpack-dev-server --save-dev
2. 使用ES6语法，需要安装：npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev
分别下载babel-loader依赖的babel-core 和 解析es2015和react-jsx语法的对应loader；
3. 把index.html做为一个模版文件去输出，还需下载html-webpack-plugin插件;同时配置webpack.config.js
- 插件对模版的解析配置：
```
plugins:[
        //创建htmlWebpackPlugin实例，并传入参数--插件对模版的解析
        new htmlWebpackPlugin({
            title:'react 学习',
            //解析哪个模版
            template:path.resolve(__dirname,'./src/index.html'),
        })
    ]
```
4. 在index.js中写react组建,并渲染到#app节点上；记得安装react react-dom
```
//倒入react组建，继承组建并渲染自定义组建
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
class App extends Component{
    render(){
        return(
            <h1>hello</h1>
        )
    }
}
render(<App/>,document.getElementById('app'));
```
5. 在webpack-config.js中配置对es6和react.js的加载规则，不包含node_modules的js文件
```
//配置es6和react语法;module是个对象,
    module:{
        loaders:[
            {//匹配所有js文件，并使用babel-loader进行处理；不包含node_module中的js文件
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            }
        ]
    }
```
6. 创建.babelrc设置解析规则；
```
{
    "presets":["es2015","react"]
}
```
7. 配置package.json的命令
```
//起服务，以dist目录下为准
"dev":"webpack-dev-server --progress --colors --content-base dist",
//通过webpack看到实际产出的资源
"build":"webpack --progress --colors"
//通过webpack -p 一次打包出产品
"production":"webpack -p"
```
- 运行服务`npm run dev`
- 运行`npm run build`将src文件下的解析到dist目录下，并可以看到
**** 端口号占用的问题
1. 查看哪些地方占用端口号 `sudo lsof -i :8080`
2. 杀掉 `sudo kill -9 xxx`