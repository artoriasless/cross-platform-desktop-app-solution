const os = require('os');

const logger = require('./utils/logger');

const osAliasMap = {
  darwin: 'Mac OS',
  win32: 'Windows OS',
  linux: 'Linux-based OS',
};

logger.info('开始构建 application installer...');

//#region 输出一些基础操作系统信息
logger.info(`操作系统：${osAliasMap[os.platform()] || os.platform()}`);
logger.info(`系统版本：${os.release()}`);
logger.info(`系统位数：${os.arch()}`);
//#endregion

//#region 根据当前操作系统，执行不同的构建任务
logger.lineBreak();

switch (os.platform()) {
  case 'win32':
    const buildPrework_win = require('./build-prework/win');
    const preCompile_win = require('./pre-compile/win');
    const afterCompile_win = require('./after-compile/win');

    buildPrework_win();
    preCompile_win();
    afterCompile_win();
    break;

  case 'darwin':
    const buildPrework_mac = require('./build-prework/mac');
    const preCompile_mac = require('./pre-compile/mac');
    const afterCompile_mac = require('./after-compile/mac');

    buildPrework_mac();
    preCompile_mac();
    afterCompile_mac();
    break;

  case 'linux':
    const buildPrework_linux = require('./build-prework/linux');
    const preCompile_linux = require('./pre-compile/linux');
    const afterCompile_linux = require('./after-compile/linux');

    buildPrework_linux();
    preCompile_linux();
    afterCompile_linux();
    break;

  default:
    logger.error(`未预设的操作系统 ${os.platform()}，无法构建 application installer`);

    logger.lineBreak();

    break;
}
//#endregion

logger.info('构建 application installer 结束');
