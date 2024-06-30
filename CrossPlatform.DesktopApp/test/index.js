const logger = require('./logger');
const checkBuildReady = require('./check-build-ready');

const sepLine = '----- ----- ----- ----- ----- ----- -----';

logger.clearConsole();

// #region Check Build Ready
logger.info(sepLine);
logger.info('检查 build 工作是否已经完成...');
checkBuildReady();
// #endregion

(async () => {
  // #region System Utils
  logger.info(sepLine);
  logger.info('【System Utils】');

  const systemUtilsTest = require('./system-utils');

  await systemUtilsTest();

  logger.info(sepLine);
  // #endregion
})();
