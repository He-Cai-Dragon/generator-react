const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css代码单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outFileName = 'prod';


module.exports = {
    devtool: false,
    entry: {
        bundle: __dirname + '/src/index.jsx',
        vendor: ["antd-mobile", "react", "react-dom", "react-router-dom"] //单独打包第三方库
    },
    output: {
        path: path.resolve(__dirname, './' + outFileName), //打包后的js文件存放的地方
        filename: '[name].[chunkhash:8].js', //打包后输出的js的文件名
        publicPath: '/' + outFileName + '/', //公共路径在页面或者css引入图片需要这个路劲
        chunkFilename: '[name].[chunkhash:8].chunk.js' //配合代码中require.ensure()来动态加载文件
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '/node_modules')],
        extensions: ['.web.js', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-2', 'react'],
                    plugins: [
                        ["import", {
                            libraryName: "antd-mobile",
                            style: "css"
                        }] // `style: true` 会加载 less 文件
                    ]
                }
            }],
            exclude: /node_modules/
        }, {　　
            test: /\.css$/,
            　　use: [MiniCssExtractPlugin.loader, "css-loader"]　　
        }, {
            test: /\.less$/,
            use: ['style-loader', 'less-loader']
        }, {
            test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/,
            use: ['url-loader']
        }, ],
    },
    plugins: [
        // 定义为生产环境，编译 React 时压缩到最小
        new CleanWebpackPlugin([outFileName]), //清理WebShop文件夹下无用的文件
        new HtmlWebpackPlugin({ //创建一个index.html文件，直接引用打包的文件
            filename: 'index.html',
            template: "dev/template.html"
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify("prod"),
            PROJECT_PATH: JSON.stringify("/" + outFileName + "/index.html")
        }),
        new webpack.optimize.AggressiveMergingPlugin(), //合并块
        new MiniCssExtractPlugin({
            chunkFilename: 'styles.[chunkhash:8].css'
        })
    ]
}