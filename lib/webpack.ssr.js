const merge = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // webpack@5压缩
const baseConfig = require('./webpack.base');

const ssrConfig = {
    mode: 'production', // 'development' | 'production', wds需要在开发环境而非生产环境下; production默认开启tree-shaking
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'ignore-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'ignore-loader',
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                    ],
                },
            }),
        ],

        // 资源分离
        splitChunks: {
            chunks: 'all', // async(异步引入的库分离，默认) | initial （同步引入的库分离） | all（所有引入的库分离，推荐）
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                },
            },
        },
    },
};

module.exports = merge(baseConfig, ssrConfig);
