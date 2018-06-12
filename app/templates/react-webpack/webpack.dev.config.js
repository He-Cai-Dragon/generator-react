var webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, './src/index.jsx'),
    output: {
        path: path.join(__dirname, '/dev'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.json']
    },
    devServer: {
        contentBase: __dirname + "/dev",
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.(less|css)$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/,
            use: ['url-loader']
        }, ],
    },
    devServer: {
        hot: true, // 开启服务器的模块热替换（HMR）
        contentBase: path.resolve(__dirname, './dev'), // 输出文件的路径
        publicPath: '/', // 和上文output的"publicPath"值保持一致
        port: 8888, //设置默认监听端口，如果省略，默认为"8080"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 开启全局的模块热替换（HMR）
        new webpack.NamedModulesPlugin(), // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
        // 定义为开发环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
}