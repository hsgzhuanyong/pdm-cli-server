#!/usr/bin/env node
const packages = require('../package/index');
const argv = require('minimist')(process.argv.slice(2));

let project = argv._[0];
let projectName = argv._[1];

// 创建项目工程
if (packages.hasOwnProperty(project)) {
  packages[project](projectName);
} else {
  console.log('没有找到该包');
}
