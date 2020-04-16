const git = require('simple-git/promise');
const ora = require('ora'); // 加载动画
const shell = require('shelljs');

const REMOTE = 'https://github.com/hsgzhuanyong/cli-h5.git';

const DEFAULT_NAME = 'pdm-h5';

const spinner = ora();

function install() {
  return new Promise((resolve, reject) => {
    // 进入到对应文件夹
    shell.cd(DEFAULT_NAME);
    // 删除git仓库
    shell.rm('-rf', '.git');
    // 安装依赖
    shell.exec('yarn install');
    resolve();
  });
}

function download () {
  return new Promise((resolve, reject) => {
    git()
      .clone(REMOTE, DEFAULT_NAME)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      })
  })
}

module.exports = async (name) => {
  if (name) DEFAULT_NAME = name;
  spinner.start(`正在下载文件\n\n`);
  await download();
  spinner.succeed(`文件下载成功\n\n`);
  spinner.start(`正在初始化项目\n\n`);
  await install();
  spinner.succeed(`项目初始化成功\n\n`);
  spinner.stop();
  console.log(`
    cd ${DEFAULT_NAME}
    yarn dev
  `);
}
