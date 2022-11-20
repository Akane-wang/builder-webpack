const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 不用手动添加打包结果到index.html,webpack自动添加其置。
// const projectRoot = process.cwd()当前目录已经通过test/index进入了，不用再获取projectRoot去根据当前文件位置获取template/src的位置
module.exports = {
    setMPA: (isServer = false) => {
        const entry = {};
        const htmlWebpackPlugins = [];

        const entryFiles = glob.sync(`./src/page/*/index${isServer ? '-server' : ''}.js`);

        Object.keys(entryFiles).map((index) => {
            const entryFile = entryFiles[index];

            const matchResIndex = `index${isServer ? '-server' : ''}`;
            const matchRes = entryFile.match(new RegExp(`src/page/(.*)/${matchResIndex}.js`));

            const pageName = matchRes && matchRes[1];

            if (pageName) {
                entry[pageName] = entryFile;
                htmlWebpackPlugins.push(
                    new HTMLWebpackPlugin({
                        inlineSource: '.css$',
                        template: `./src/page/${pageName}/index.html`,
                        filename: `${pageName}.html`,
                        chunks: ['vendors', pageName],
                        inject: true,
                        minify: {
                            html5: true,
                            collapseWhitespace: true,
                            preserveLineBreaks: false,
                            minifyCSS: true,
                            minifyJS: true,
                            removeComments: false,
                        },
                    }),
                );
            }

            return htmlWebpackPlugins;
        });

        return {
            entry,
            htmlWebpackPlugins,
        };
    },
};
