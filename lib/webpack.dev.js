// 代码热更新
// sourcce-map
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        hot: true,
    },
    devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
