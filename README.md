##基于react+webpack的快速生产前端框子##

###目前有三个模板可以选择###

- 移动端的模板，所用的UI框架是antd-mobile
- PC端的模板，所用的UI框架是element-react
- 纯的react+webpack项目

开始安装
首先你得安装有node.js（当前稳定版）
全局安装yeoman

	npm install -g yo  

然后安装脚手架

	npm install -g generator-reacthcl   


在自己的空项目中运行

	yo reacthcl   

控制台会有输出命令
``

	第一步：需要选择创建的模板，就是上面提示的三个 pc mobile 还是纯洁版，

	第二步：输入需要创建的工程名称（项目的文件夹名称）

	第三步：输入打包后存放打包文件的文件夹名字

	第三步：输入开发者名字

	第四步：输入项目版本号

	第五步：输入项目描述


然后在创建的目录下执行如下命令
	
	npm install
	npm run dev

当编译完成后再浏览器中打开 http://localhost:8888,就可以看到页面了

pc和mobile打包分为测试 uat 和生产的打包配置文件
 
测试：
	
	npm run test
uat:

	npm run uat
生产：

	npm run build

会输出一个在控制台你输入的第二步输入的文件，该文件里面就包含了打包的所有文件




