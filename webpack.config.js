const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: path.join(__dirname, './src/main.js'),   // 入口文件
    output: {                                       // 出口文件
        path: path.join(__dirname, './dist'),       // 出口文件夹
        filename: 'bundle.js'                       // 输出文件名
    },
    plugins: [                                      // 所有插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'                  // 生成的内存页面
        }),
        new VueLoaderPlugin()
    ],
    module: {                                       // 配置第三方模块
        rules: [                                    // 匹配规则
            // css
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // less
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 图片(传入参数和url一样)
            { test: /\.(jpg)|(png)|(gif)|(jpeg)$/, use: 'url-loader'},
            // 字体组件
            { test: /\.(ttf)|(eot)|(svg)|(woff)|(woff2)$/, use: 'url-loader'},
            // babel exclude: /node_modules/排除node_modules下的js文件
            // 转换高级的ES6语法
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // vue
            { test: /\.vue/, use: 'vue-loader' }
        ]
    }
};