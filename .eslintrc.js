module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb-base',
    env: {
        browser: true,
        node: true,
    },
    rules: {
        semi: 'error',
        indent: ['error', 4],
    },
};
