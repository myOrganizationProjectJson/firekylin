node-git-firekylin\www\development.js ->

node_modules\thinkjs\lib\index.js 




dbconfig ----app\common\config\db.js



develop log



执行 node www\development.js
20160927遇到问题
[2016-09-27 16:40:37] [Error] Error: template not found: D:\SOFT\eclipse\workspc
e\node-git-firekylin\www\theme\firekylin\index.html

解决方法cd 到项目目录下 npm install 就特么好了


201601007
cd 到对应项目目录下 node development.js （乖～～～）

20161015
thinkjs类似thinkphp 通过入口找controller model 然后this.displayView('index')显示页面
前台 
    controller \node-git-firekylin\app\home\controller
    model  \node-git-firekylin\app\home\model
    view  \node-git-firekylin\www\theme\firekylin
    


