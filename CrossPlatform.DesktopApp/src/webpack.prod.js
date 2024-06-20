const webpack = require('webpack');
const chalk = require('chalk');

const logger = require('../scripts/utils/logger');
const config = require('./webpack.config');

logger.info('开始构建渲染进程资源...');

webpack(
  {
    ...config,
    mode: 'production',
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.info(chalk.red('\n------------------ 【错误】 ------------------'));
      process.stdout.write(info.errors.join('\n') + '\n');
    }

    if (stats.hasWarnings()) {
      console.info(chalk.yellow('\n------------------ 【警告】 ------------------'));
      process.stdout.write(info.warnings.join('\n') + '\n');
    }

    console.info(chalk.green('\n------------------ 构建结果 ------------------'));

    process.stdout.write(info.assets.map(n => `${chalk.gray('>')} ${chalk.green(n.name)} ${chalk.yellow(Math.round((n.size * 100) / 1024) / 100 + 'K')}`).join('\n') + '\n');

    logger.lineBreak();

    logger.info('渲染进程资源构建结束');

    logger.lineBreak();
  }
);
