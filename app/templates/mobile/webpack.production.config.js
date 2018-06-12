const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css代码单独打包
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: false,
    entry: {
        bundle: __dirname + '/index.jsx',
        vendor: ["react", "react-dom"] //单独打包第三方库
    },
    output: {
        path: path.resolve(__dirname, './' + outFileName ? outFileName : "build"), //打包后的js文件存放的地方
        filename: '[name].[chunkhash:8].js', //打包后输出的js的文件名
        publicPath: '/UniversalPayment/', //公共路径在页面或者css引入图片需要这个路劲
        chunkFilename: '[name].[chunkhash:8].chunk.js' //配合代码中require.ensure()来动态加载文件
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '/node_modules')],
        extensions: ['.web.js', '.js', '.jsx', '.json'],
    },
    module: {
        loaders: [{
            test: /\.(js[x])$/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }, {
            test: /\.(less)$/,
            loader: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        // 定义为生产环境，编译 React 时压缩到最小
        new CleanWebpackPlugin([outFileName ? outFileName : "build"]), //清理WebShop文件夹下无用的文件
        new HtmlWebpackPlugin({ //创建一个index.html文件，直接引用打包的文件
            filename: 'index.html',
            template: "dev/template.html"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                },
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(), //合并块
        new ExtractTextPlugin('style.[chunkhash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }), //第三方库打包到vendor.js文件里面，在html中引用就可以
    ],
}