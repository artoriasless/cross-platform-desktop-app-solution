const fs = require('fs');
const path = require('path');

const logger = require('./utils/logger');

// 获取 cli 传入的参数
const args = process.argv.slice(2);
const isCleanRender = args.includes('--render');
const isCleanMain = args.includes('--main');
const isCleanDist = args.includes('--dist');

const baseDir = path.join(__dirname, '..') + path.sep;
const renderDir = path.join(__dirname, '../render-process');
const mainDir = path.join(__dirname, '../main-process');
const distDir = path.join(__dirname, '../dist');

const cleanRender = () => {
  logger.info(`渲染进程资源目录: ${renderDir.replace(baseDir, '')}`);
  logger.info('开始清理渲染进程资源...');

  if (fs.existsSync(renderDir)) {
    fs.rmSync(renderDir, { recursive: true });
  }

  logger.info('清理完成');

  logger.lineBreak();
};
const cleanMain = () => {
  logger.info(`主进程资源目录: ${mainDir.replace(baseDir, '')}`);
  logger.info('开始清理主进程资源...');

  if (fs.existsSync(mainDir)) {
    fs.rmSync(mainDir, { recursive: true });
  }

  logger.info('清理完成');

  logger.lineBreak();
};
const cleanDist = () => {
  logger.info(`应用构建目录: ${distDir.replace(baseDir, '')}`);
  logger.info('开始清理应用构建资源...');

  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
  }

  logger.info('清理完成');

  logger.lineBreak();
};

logger.clearConsole();

if (isCleanRender || isCleanMain || isCleanDist) {
  if (isCleanRender) {
    cleanRender();
  }

  if (isCleanMain) {
    cleanMain();
  }

  if (isCleanDist) {
    cleanDist();
  }
} else {
  // 默认不指定，则全部清理
  cleanRender();
  cleanMain();
  cleanDist();
}
