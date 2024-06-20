import path from 'path';
import { EventEmitter } from 'events';

import { app, BrowserWindow } from 'electron';
import { cloneDeep, merge } from 'lodash';

import { IAppConfig } from './interfaces';
import { defaultAppConfig, mainWindowUrl } from './constants';

const baseDir = process.cwd();
const runtimeConfig = require(path.join(baseDir, 'config/config.runtime.js')) as IAppConfig;

export class AppBase extends EventEmitter {
  private isDev: boolean = false;
  private config: IAppConfig = cloneDeep(defaultAppConfig);

  constructor(appConf?: IAppConfig) {
    super();

    if (appConf) {
      this.config = merge(this.config, appConf, runtimeConfig);
    } else {
      this.config = merge(this.config, runtimeConfig);
    }

    this.isDev = process.env.NODE_ENV === 'development';

    this.init();
  }

  init() {
    //#region 应用设置
    app.setName(this.config.name || '');
    //#endregion

    //#region 事件监听
    app.on('ready', () => {
      this.createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    //#endregion
  }

  createWindow() {
    const mainWindow = new BrowserWindow({
      title: this.config.name,
      icon: this.config.icon,
      center: true,
      width: 800,
      height: 600,
      minWidth: 400,
      minHeight: 300,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    console.info(this.config);

    // 移除窗口菜单
    mainWindow.setMenu(null);

    // 如果是开发模式，加载调试工具
    if (this.isDev) {
      mainWindow.webContents.openDevTools({
        mode: 'detach',
      });
    }

    // 加载主页
    mainWindow.loadURL(mainWindowUrl);
  }
}

export default {
  AppBase,
};
