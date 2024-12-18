import path from 'path';

import fs from 'fs-extra';
import { app } from 'electron';
import * as log4js from 'log4js';

class Logger {
  // 日志过期时间
  private static expiredDays: number = 7;
  // 日志清理逻辑
  private static clearExpiredLogs(logsDir: string): void {
    const logFileList = fs.readdirSync(logsDir);

    logFileList.forEach(logFile => {
      const logFilePath = path.join(logsDir, logFile);
      const stat = fs.statSync(logFilePath);
      const expiredTime = new Date().getTime() - Logger.expiredDays * 24 * 60 * 60 * 1000;

      if (stat.isFile() && stat.mtimeMs < expiredTime) {
        // 异步删除过期日志，确保不阻塞、不报错
        try {
          if (fs.existsSync(logFilePath)) {
            fs.unlink(logFilePath, () => null);
          }
        } catch (err: any) {
          // do nothing
        }
      }
    });
  }

  private logger: log4js.Logger;

  public constructor() {
    // 获取 Electron 应用的 appData 目录
    const appDataDir = app.getPath('appData');
    const logsDir = path.join(appDataDir, 'logs');

    // 确保日志目录存在
    fs.ensureDirSync(logsDir);

    // 清理过期日志
    Logger.clearExpiredLogs(logsDir);
    // 配置 log4js
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        file: {
          type: 'dateFile',
          filename: path.join(logsDir, 'app.log'),
          pattern: 'yyyy-MM-dd',
          alwaysIncludePattern: true,
          keepFileExt: true,
        },
      },
      categories: {
        default: { appenders: ['console', 'file'], level: 'trace' },
      },
    });

    // 获取 logger 实例
    this.logger = log4js.getLogger();
  }

  public info(...msgList: any[]): void {
    const [msg, ...args] = msgList;

    this.logger.info(msg, ...args);
  }

  public warn(...msgList: any[]): void {
    const [msg, ...args] = msgList;

    this.logger.warn(msg, ...args);
  }

  public error(...msgList: any[]): void {
    const [msg, ...args] = msgList;

    this.logger.error(msg, ...args);
  }

  public trace(...msgList: any[]): void {
    const [msg, ...args] = msgList;

    this.logger.trace(msg, ...args);
  }

  public debug(...msgList: any[]): void {
    const [msg, ...args] = msgList;

    this.logger.debug(msg, ...args);
  }
}

export default Logger;
