const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const logger = require('./utils/logger');

const platform = os.platform();
const libProjectFolder = path.join(__dirname, '../../CrossPlatform.Library');
const options = {
  cwd: libProjectFolder,
  stdio: ['pipe', 'pipe', 'pipe'],
};
let output;

logger.lineBreak();

switch (platform) {
  // #region windows 下只考虑 x64 和 x86
  case 'win32':
    try {
      logger.info('开始清理临时文件...');
      logger.lineBreak();

      output = execSync('dotnet clean', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始还原项目...');
      logger.lineBreak();

      output = execSync('dotnet restore', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始构建 Windows x64 版本...');
      logger.lineBreak();

      output = execSync('dotnet publish -p:PublishProfile=Properties\\win.x64.pubxml', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始构建 Windows x86 版本...');
      logger.lineBreak();

      output = execSync('dotnet publish -p:PublishProfile=Properties\\win.x86.pubxml', options);

      logger.info(output.toString());
    } catch (err) {}

    break;
  // #endregion

  //#region linux 下只考虑 x64 和 arm64
  case 'linux':
    try {
      logger.info('开始清理临时文件...');
      logger.lineBreak();

      output = execSync('dotnet clean', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始还原项目...');
      logger.lineBreak();

      output = execSync('dotnet restore', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始构建 Linux x64 版本...');
      logger.lineBreak();

      output = execSync('dotnet publish -p:PublishProfile=Properties/linux.x64.pubxml', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始构建 Linux arm64 版本...');
      logger.lineBreak();

      output = execSync('dotnet publish -p:PublishProfile=Properties/linux.arm64.pubxml', options);

      logger.info(output.toString());
    } catch (err) {}

    break;
  //#endregion

  //#region macOS 下只考虑 x64 和 arm64
  case 'darwin':
    try {
      logger.info('开始清理临时文件...');
      logger.lineBreak();

      output = execSync('dotnet clean', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始还原项目...');
      logger.lineBreak();

      output = execSync('dotnet restore', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始构建 macOS x64 版本...');
      logger.lineBreak();

      output = execSync('dotnet publish -p:PublishProfile=Properties/mac.x64.pubxml', options);

      logger.info(output.toString());
    } catch (err) {}

    try {
      logger.info('开始构建 macOS arm64 版本...');
      logger.lineBreak();

      output = execSync('dotnet publish -p:PublishProfile=Properties/mac.arm64.pubxml', options);

      logger.info(output.toString());
    } catch (err) {}

    break;
  //#endregion

  default:
    console.error('无法识别的操作系统平台，构建 dll 失败');
}
