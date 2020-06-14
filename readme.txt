项目创建步骤:

---webpack手动打包
1、初始化项目:                          npm init -y
2、创建src、dist文件夹, 在src目录下创建index.html、main.js文件作为程序入口
3、安装webpack到本地:                   npm i webpack
4、手动使用webpack创建bundle.js文件:     webpack ./src/main.js -o ./dist/bundle.js

---webpack自动打包
5、安装webpack-dev-server               npm i webpack-dev-server
6、在项目根目录下创建webpack.config.js配置文件, 并添加配置:
    const path = require('path');
    module.exports = {
        entry: path.join(__dirname, './src/main.js'),   // 入口文件
        output: {                                       // 出口文件
            path: path.join(__dirname, './dist'),       // 出口文件夹
            filename: 'bundle.js'                       // 出口文件名称
        }
    };
7、在package.json中的scripts节点下添加启动命令
    "dev": "webpack-dev-server --open --port 3000 --hot"
8、使用命令行启动                          npm run dev 

---去除bundle引用, 生成内存页面
9、安装html-webpack-plugin                npm i html-webpack-plugin
10、在webpack.config.js中添加引入html-webpack-plugin模块, 创建一个与output同级的节点plugins用于配置插件, 并完成配置:
    const htmlWebpackPlugin = require('html-webpack-plugin');
    plugins:[                                       // 插件配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'                  // 生成的虚拟页面名称
        })
    ]
11、去除掉index.html文件中的bundle.js的引用

---解析样式文件(实现可以在main.js中引入样式文件)
12、安装style-loader、css-loader(解析css文件)     npm i style-loader css-loader
13、安装less-loader(解析less文件)                 npm i less-loader
14、安装url-loader、file-loader(解析url)          npm i url-loader file-loader
15、在webpack.config.js中创建与plugin同级的节点module, 并完成配置
    module: {
        rules: [
            // 解析css文件
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 解析less文件
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            // 解析图片
            { test: /\.(jpg)|(png)|(gif)|(jpeg)$/, use: 'url-loader' },
            // 解析字体
            { test: /\.(ttf)|(eot)|(svg)|(woff)|(woff2)$/, use: 'url-loader' }
        ]
    }

---ES6高级语法的使用(webpack只支持部分ES6高级语法, 所以需要降级处理)
16、安装babel-core、babel-loader、babel-plugin-transform-runtime
    注意babel-core与babel-loader有版本限制, babel-loader 8与babel-core 7配套使用
    最好使用以下版本
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
17、安装babel-preset-env、babel-preset-stage-0
18、在webpack.config.js中的module下的rules中添加    
    // 转换高级的ES6语法
    { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
19、在项目根目录下创建.babelrc文件, 并配置:
    {
        "presets": ["env", "stage-0"],
        "plugins": ["transform-runtime"]
    }

