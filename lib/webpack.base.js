// 资源解析
// es6: babel-loader,
// react, css: css-loader, style-loader, less: less-loader, image: file-loader/url-loader, font
// 样式增强：css前缀补齐postcss-loader，css pxIntorem
// 目录清理: output.clean: true
// 多页面打包: { entry, htmlWebpackPlugins } = setMPA();
// 命令行信息显示优化: stats: 'errors-only'
// 错误捕获和处理
// css提取成一个单独的文件
const autoprefixer = require('autoprefixer');
const path = require('path');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { setMPA } = require('./utils');

const projectRoot = process.cwd();
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
    entry,
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name]_[chunkhash:8].js',
        clean: true, // 打包时自动清理dist目录
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 保证不把打包的注释单独提出作为一个txt文件
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                    // 'eslint-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    // options: {
                    //     insert: 'head', // 样式插入到<head>
                    //     injectType: 'singletonStyleTag', // 将所有的style标签合并成一个
                    // }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    // loader: 'style-loader',
                    // options: {
                    //     insert: 'head', // 样式插入到<head>
                    //     injectType: 'singletonStyleTag', // 将所有的style标签合并成一个
                    // }
                    // },
                    // 'style-loader'与mini-css-extract-plugin不能共存, 因此替换成MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'], // 指定需要兼容的浏览器版本 browser 替换成overrideBrowserslist；否则会报错
                                    }),
                                ],
                            },
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 1rem = 75px
                            remPrecision: 8, // px转成rem时小数点的位数
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]', // ext: 后缀
                        outputPath: 'img',
                        esModule: false, // 服务端渲染时，不应该使用es模块语法，因此需要关闭掉
                    },
                }],
            },
            // 字体资源
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //             name: '[name]_[hash:8][ext]',
            //             }
            //         }
            //     ]
            // }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ // 提取css成独立的文件
            filename: '[name]_[contenthash:8].css',
        }),
        // new FriendlyErrorsWebpackPlugin(), // 原本与stats:errors-only共用，但是webpack@5搜不到
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (
                    stats.compilation.errors
                    && stats.compilation.errors.length
                    && process.argv.indexOf('--watch') === -1
                ) {
                    process.exit(1);
                }
            });
        },
        new BundleAnalyzerPlugin(),
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
