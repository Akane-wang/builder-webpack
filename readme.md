# 学习webpack功能模块和目录结构设计
- 主要目的是整理较为完备的webpack包，后续可以一劳永逸，引用到其他项目里
- 初始化
  - git init
  - npm init
- 构建目录
  ```js
    /test
    /lib
    -/webpack.dev.js
    -/webpack.prod.js
    -/webpack.ssr.js
    -/webpack.base.js
    - readme.md
    - changelog.md
    - .eslintrc.js
    - package.json
    - index.js
  ```
- 安装package.json的包
  ```js
   // "html-inline-css-webpack-plugin": "^1.2.1",
  // "html-loader": "^0.5.5",
  // "html-webpack-inline-source-plugin": "0.0.10",
  // "node-notifier": "^5.4.0",
  
  // "postcss-preset-env": "^6.6.0",
  
  // "uglifyjs-webpack-plugin": "^2.1.2",

  "assert": "^2.0.0",
    "chai": "^4.2.0",
    "glob-all": "^3.1.0",
    "istanbul": "^0.4.5",
    "mocha": "^6.1.4",
    "rimraf": "^2.6.3"
  ```