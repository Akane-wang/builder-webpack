const assert = require('assert');
describe('webpack.base.js test case', () => {
    // eslint-disable-next-line global-require
    const baseConfig = require('../../lib/webpack.base');
    it('entry', () => {
        assert.equal(baseConfig.entry.index, './src/page/index/index.js');
        assert.equal(baseConfig.entry.search, './src/page/search/index.js');
    });
});
