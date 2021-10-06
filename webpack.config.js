// 引入一个包
const path = require("path");

//引入html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// webpack中所有的配置信息都应该卸载module.exports中
module.exports = {
  mode: "development",
  // mode:"production",
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, "dist"),
    // 打包后的文件
    filename: "bundle.js",
    clean: true,
    // 是否使用箭头函数
    // environment:{
    //     arrowFunction:false,
    // }
  },

  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            //  设置babel
            options: {
              //  指定预定义的环境
              presets: [
                [
                  //  指定环境的插件
                  "@babel/preset-env",
                  //  配置信息
                  {
                    //  要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    //  指定corejs的版本
                    corejs: "3",
                    //  使用corejs的方式 "usage" 表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },

      //  设置less文件处理

      {
        test: /\.less$/,
        use: ["style-loader", "css-loader",
        
        //  引入postcss
        {
          loader:"postcss-loader",
          options:{
            postcssOptions:{
              plugins:[
                [
                  "postcss-preset-env",
                  {
                    browsers:'last 2 versions'
                  }
                ]
              ]
            }
          }
        }
        ,"less-loader"],
      },
    ],
  },

  //配置webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      //自定义网页标题
      // title:'hello world'
      template: "./src/index.html",
    }),
  ],

  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
