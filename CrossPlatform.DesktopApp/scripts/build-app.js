const logger = require('./utils/logger');

logger.info('开始构建 application installer...');

//#region 输出一些基础操作系统信息
const os = require('os');
const osAliasMap = {
  darwin: 'Mac OS',
  win32: 'Windows OS',
  linux: 'Linux-based OS',
};

logger.info(`操作系统：${osAliasMap[os.platform()] || os.platform()}`);
logger.info(`系统版本：${os.release()}`);
logger.info(`系统位数：${os.arch()}`);
//#endregion

logger.info('构建 application installer 结束');
