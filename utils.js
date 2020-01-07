const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const readDirAsync = util.promisify(fs.readdir);
const existsAsync = util.promisify(fs.exists);

module.exports.readFileAsync = readFileAsync;
module.exports.writeFileAsync = writeFileAsync;
module.exports.readDirAsync = readDirAsync;
module.exports.existsAsync = existsAsync;
