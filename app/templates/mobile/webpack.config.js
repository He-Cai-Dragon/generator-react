var webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.join(__dirname, '/index.jsx'),
    output: {
        path: path.join(__dirname, '/build'),
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
        loaders: [{
            test: /\.(js[x])$/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192',
            query: {
                name: 'img/[name]_[hash:7].[ext]'
            }
        }, {
            test: /\.(less|css)$/,
            loader: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    devServer: {
        hot: true, // 开启服务器的模块热替换（HMR）
        contentBase: path.resolve(__dirname, './dev'), // 输出文件的路径
        publicPath: '/', // 和上文output的"publicPath"值保持一致
        port: 6611, //设置默认监听端口，如果省略，默认为"8080"
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