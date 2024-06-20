const { execSync } = require('child_process');

const logger = require('./utils/logger');

const baseDir = process.cwd();
const tscCmd = 'npx tsc -p tsconfig.main.json --diagnostics';

logger.info('开始构建主进程资源...');

execSync(tscCmd, {
  cwd: baseDir,
  stdio: 'inherit',
});

logger.info('主进程资源构建结束');

logger.lineBreak();
