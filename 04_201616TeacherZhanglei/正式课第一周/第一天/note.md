1. git是否安装成功：git --version
2. git的配置
```
git config --global user.name "github的用户名"
git config --global user.email "github的邮箱"
```
3. git的工作流
    1. 先创建一个本地的git仓库：
        - 创建一个文件夹
        - 把这个文件夹变成一个git可以管理的仓库 git init
    2. 创建一个远程仓库：登录[github的官网](github.com);右上角有个+号来创建新的仓库
    3. 给本地仓库添加一个远程通道；
        - 添加远程通过`git remote add 通道名称`
        ```
        git remote add origin https://github.com/leilei1238/test111111.git
        ```
        - 查看链接了哪些远程通`git remote -v`
    4. 把本地仓库的内容推送到远程仓库有3步：
        1. git add .; git add -A（这里只是在暂存区）
        2. git commit -m"这里是用来写注释的"（这里只是在历史区）
        3. git push origin master(把我本地仓库的内容，推送到origin这个远程仓库的master分支上去)
4. 如何更新老师的讲义：
    1. 把老师发送到群里的github的远程地址，复制到github的地址栏，回车；
    2. 到了老师的远程仓库后，点击fork
    3. fork之后就自动到了自己的远程仓库，复制地址,使用git clone 地址
    `git clone https://github.com/你自己的github的用户名/Javascript201616.git`
    - git clone自动的让本地仓库和自己的远程仓库，添加了联系；
    - 进入某个文件夹：`cd 文件夹的名称`
    - 返回上一级文件夹：`cd ..`
    4. 当老师讲义更新的时候，学生如果想更新自己的课件：
        1. 建立学生本地仓库跟老师远程仓库的联系：
        `git remote add teacher https://github.com/zhufengpeixun/Javascript201616.git`
        2. 远程更新：`git remote update teacher`
        3. down到本地：`git pull teacher master`

5. 常用的命令：
- git是否安装成功 git --version
- 添加远程仓库 git remote add 通道名称（origin:自己远程 xxxx:别人远程）
- 查看本地连接了哪些远程 git remote -v
- 删除远程通道： git remote rm 通道名称
- 把远程仓库的内容更新到本地：
    1. git remote add teacher 远程通道地址
    2. git remote update teacher
    3. git pull teacher master
- 把本地仓库内容推送到自己远程仓库
    1. git add .
    2. git commit -m"注释"
    3. git push origin master
- ls 查看当前文件夹下有哪些子文件；（有的电脑是dir）
- cd 文件夹名:进入某个文件夹
- 创建一个文件夹：mkdir 文件夹名字
- 创建多个文件：touch app.js index.html
- 进入文件夹并创建文件可以合并：cd leilei && touch app.js index.html;
- 返回上一次 cd ..
- 返回根目录 cd/
- git配置：
    `git config --global user.name "github的用户名"`
    `git config --global user.email "github的邮箱"`
- 思考：删除文件夹的命令   删除文件的命令
