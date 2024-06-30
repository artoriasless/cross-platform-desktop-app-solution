const fs = require('fs');
const path = require('path');

const logger = require('./logger');

const checkBuildReady = () => {
  // 检查 dotnet-dll 是否构建完
  const dllDir = path.join(process.cwd(), 'dotnet-dll');
  const dllIsReady = fs.existsSync(dllDir);

  // 检查 ts 是否构建完
  const mainProcessDir = path.join(process.cwd(), 'main-process');
  const mainProcessIsReady = fs.existsSync(mainProcessDir);

  if (!dllIsReady) {
    logger.error('dotnet-dll 未构建完成，请先执行 npm run build:dll');
  }

  if (!mainProcessIsReady) {
    logger.error('主进程未构建完成，请先执行 npm run build:main');
  }

  if (!dllIsReady || !mainProcessIsReady) {
    process.exit(1);
  } else {
    logger.info('开始执行 tester...');
  }
};

module.exports = checkBuildReady;
