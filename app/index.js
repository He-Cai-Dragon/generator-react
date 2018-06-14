/**
 * this.fs  :"https://github.com/sboudrias/mem-fs-editor"
 * @type {[type]}
 */
const path = require('path');
const chalk = require('chalk'); //不同颜色的info
const Generator = require('yeoman-generator');
// const askName = require('inquirer-npm-name');
const yosay = require('yosay'); //yeoman弹出框
const _ = require('lodash');
// const extend = require('deep-extend');
var EOL = require('os').EOL;
// const mkdirp = require('mkdirp');


function makeGeneratorName(name) {
    name = _.kebabCase(name);
    name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
    return name;
}

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    prompting() { //和用户交互的时候（命令行问答之类的）调用
        this.appname = "template-react"
        var questions = [{
            name: 'projectAssets',
            type: 'list',
            message: '请选择模板:',
            choices: [{
                name: 'pc端',
                value: 'pc',
                checked: true
            }, {
                name: 'mobile端',
                value: 'mobile'
            }, {
                name: 'react+webpack纯洁版',
                value: 'pure'
            }]
        }, {
            type: 'input',
            name: 'projectName',
            message: '输入项目名称',
            default: this.appname
        }, {
            type: 'input',
            name: 'buildName',
            message: '打包输出文件名字',
            default: "build"
        }, {
            type: 'input',
            name: 'projectAuthor',
            message: '项目开发者',
            store: true,
            default: 'hcl'
        }, {
            type: 'input',
            name: 'projectVersion',
            message: '项目版本号',
            default: '0.0.1'
        }, {
            type: 'input',
            name: 'projectDescription',
            message: '项目描述',
            store: true,
            default: 'hcl'
        }]
        return this.prompt(questions).then(
            function(answers) {

                for (var item in answers) {
                    // 把answers里的内容绑定到外层的this，便于后面的调用
                    answers.hasOwnProperty(item) && (this[item] = answers[item]);
                }
            }.bind(this));
    }
    info() {
        this.log(chalk.green(
            'I am going to build your app!'
        ));
    }
    default () {

    }

    writing() {
        let addField = "const outFileName = '" + this.buildName + "';"; //往webpack.config.json添加的字段信息
        if (this.projectAssets == "mobile") { //如果选择的是移动端的模板
            this.fs.copy(
                this.templatePath('mobile'),
                this.destinationPath(this.projectName)
            );
            //往测试的配置文件添加字段
            let testConfig = this.fs.read(this.destinationPath(this.projectName + '/webpack.test.config.js'));
            this.fs.write(this.destinationPath(this.projectName + '/webpack.test.config.js'), addField + EOL + testConfig);
            //往uat添加字段
            let uatConfig = this.fs.read(this.destinationPath(this.projectName + '/webpack.uat.config.js'));
            this.fs.write(this.destinationPath(this.projectName + '/webpack.uat.config.js'), addField + EOL + uatConfig);
            //往生产配置添加字段
            let prodConfig = this.fs.read(this.destinationPath(this.projectName + '/webpack.prod.config.js'));
            this.fs.write(this.destinationPath(this.projectName + '/webpack.prod.config.js'), addField + EOL + prodConfig);


        } else if (this.projectAssets == "pc") { //如果选择pcweb端模板
            this.fs.copy(
                this.templatePath('pc'),
                this.destinationPath(this.projectName)
            );
            //往测试的配置文件添加字段
            let testConfig = this.fs.read(this.destinationPath(this.projectName + '/webpack.test.config.js'));
            this.fs.write(this.destinationPath(this.projectName + '/webpack.test.config.js'), addField + EOL + testConfig);
            //往uat添加字段
            let uatConfig = this.fs.read(this.destinationPath(this.projectName + '/webpack.uat.config.js'));
            this.fs.write(this.destinationPath(this.projectName + '/webpack.uat.config.js'), addField + EOL + uatConfig);
            //往生产配置添加字段
            let prodConfig = this.fs.read(this.destinationPath(this.projectName + '/webpack.prod.config.js'));
            this.fs.write(this.destinationPath(this.projectName + '/webpack.prod.config.js'), addField + EOL + prodConfig);

        } else if (this.projectAssets == "pure") { //react+webpack构建的纯洁版项目
            this.fs.copy(
                this.templatePath('react-webpack'),
                this.destinationPath(this.projectName)
            );
        }

        const currPackage = this.fs.readJSON(this.destinationPath(this.projectName + '/package.json'), {});
        currPackage.name = this.projectName;
        currPackage.version = this.projectVersion;
        currPackage.author = this.projectAuthor;
        currPackage.description = this.projectDescription;
        this.fs.writeJSON(this.destinationPath(this.projectName + '/package.json'), currPackage);
        // const generatorGeneratorPkg = require('../package.json');
        // extend(pkg, {
        //     dependencies: {
        //         'yeoman-generator': generatorGeneratorPkg.dependencies['yeoman-generator'],
        //         chalk: generatorGeneratorPkg.dependencies.chalk,
        //         yosay: generatorGeneratorPkg.dependencies.yosay
        //     },
        //     devDependencies: {
        //         'yeoman-test': generatorGeneratorPkg.devDependencies['yeoman-test'],
        //         'yeoman-assert': generatorGeneratorPkg.devDependencies['yeoman-assert']
        //     },
        //     jest: {
        //         testPathIgnorePatterns: ['templates']
        //     }
        // });
        // pkg.keywords = pkg.keywords || [];
        // pkg.keywords.push('yeoman-generator');


    }

    conflicts() {
        // this.fs.append(this.destinationPath('.eslintignore'), '**/templates\n');
    }

    install() {
        // this.installDependencies({
        //     bower: false,
        //     npm: true,
        //     skipInstall: this.options['skip-install']
        // });
        // this.npmInstall(this.destinationPath(this.projectName))
        // this.installDependencies({
        //     bower: false,
        //     npm: true
        // }).then(() => console.log('Everything is ready!'));
        // this.runInstall("npm", this.destinationPath(this.projectName));
    }
    end() {
        this.fs.delete(".yo-rc.json") //删除无用的文件
    }
}