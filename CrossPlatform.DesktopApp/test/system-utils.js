const logger = require('./logger');

const dllPath = 'CrossPlatform.Library.dll';
const className = 'CrossPlatform.Library.SystemUtils4Node';
const methodName = 'WhatIsTime';

module.exports = async () => {
  // 有可能用户还未构建，测试还没有 main-process 目录
  const dllBridgeInvoke = require('../main-process/dll-bridge-invoke');

  //#region 1. WhatIsTime
  const paramsIn_WhatIsTime = 'test params in';

  logger.info('【SystemUtils.WhatIsTime】');
  logger.info('<params>');
  logger.info(JSON.stringify(paramsIn_WhatIsTime, null, 2));

  try {
    const result = await dllBridgeInvoke(dllPath, className, methodName, paramsIn_WhatIsTime);

    logger.info('<result>');
    logger.info(JSON.stringify(result, null, 2));
  } catch (err) {
    logger.error('<error>');
    logger.error(err);
  }
  //#endregion
};
