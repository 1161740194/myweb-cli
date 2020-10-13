const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function (env, argv) {
    env = env || {
        development: true
    }
    options = {
        entry: { // 多页面配置
            index: './src/js/index.js',
            login: './src/js/login.js',
        },
        module: {
            rules: [{
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', { // 配置css
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }]
                },
                {
                    test: /\.(js|jsx)/i,
                    use: [{ // 配置js文件
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }]
                },
                { // 文件处理
                    test: /\.(png|jpg|jpeg|gif)/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            outputPath: 'img/',
                            limit: 4 * 1024
                        }
                    }]
                }, { // sass处理
                    test: /\.(sass|scss)/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']

                }
            ]
        },
        plugins: [ // 处理html
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html',
                chunks: ['index']
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/pages/login.html'),
                filename: 'pages/login.html',
                chunks: ['login']
            })
        ],
        ...env.production ? require('./config/webpack.production') : require('./config/webpack.development')
    }
    return options
}