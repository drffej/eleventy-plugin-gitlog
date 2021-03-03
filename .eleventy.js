const gitLog = require('./index.js');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(gitLog);
}