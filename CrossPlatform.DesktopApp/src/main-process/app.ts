import path from 'path';

import { app, BrowserWindow } from 'electron';
import { cloneDeep, merge } from 'lodash';

import { IAppConfig, IArtOpts } from './interfaces';
import { defaultAppConfig } from './constants';

import { Art, ArtWin } from './core';

const baseDir = process.cwd();
const runtimeConfig = require(path.join(baseDir, 'config/config.runtime.js')) as IAppConfig;

const superArtOpts = (appConf?: IAppConfig): IArtOpts => {
  return {};
};

class AppBase extends Art {
  private mainArtWin: ArtWin | null = null;
  private isDev: boolean = false;
  private config: IAppConfig = cloneDeep(defaultAppConfig);

  public constructor(appConf?: IAppConfig) {
    const artOpts = superArtOpts(appConf);

    super(artOpts);

    if (appConf) {
      this.config = merge(this.config, appConf, runtimeConfig);
    } else {
      this.config = merge(this.config, runtimeConfig);
    }

    this.isDev = process.env.NODE_ENV === 'development';

    this.init();
  }

  private init = () => {
    //#region 应用设置
    app.setName(this.config.name || '');
    //#endregion

    //#region 事件监听
    app.on('ready', this.afterReady);

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    //#endregion
  };

  private afterReady = () => {
    this.mainArtWin = this.addWin({
      name: 'main',
      title: this.config.name || '',
      icon: this.config.icon || '',
      center: true,
      webPreferences: {
        nodeIntegration: true,
        devTools: this.isDev,
      },
      ...this.config.size,
    });

    // 移除窗口菜单
    this.mainArtWin?.win?.setMenu(null);

    // 加载主页
    this.mainArtWin?.win?.loadURL('http://localhost:3000/home.html');

    setTimeout(() => {
      const secondWin = this.addWin({
        name: 'secondWin',
        title: this.config.name || '',
        icon: this.config.icon || '',
        center: true,
        webPreferences: {
          nodeIntegration: true,
          devTools: this.isDev,
        },
        ...this.config.size,
      });

      // 移除窗口菜单
      secondWin?.win?.setMenu(null);

      // 加载主页
      secondWin?.win?.loadURL('http://localhost:3000/home.html');
    }, 5000);
  };
}

module.exports = AppBase;

export default AppBase;
