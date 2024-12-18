import path from 'path';

import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { merge } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

import { getConnection, Logger } from '../utils';
import { IArtWinOpts, IConnection } from '../interfaces';

import ArtView from './art-view';

const superWinOpts = (opts: IArtWinOpts): BrowserWindowConstructorOptions => {
  const result: BrowserWindowConstructorOptions = {
    title: opts.title,
    icon: opts.icon,
    width: opts.width,
    height: opts.height,
    minWidth: opts.minWidth,
    minHeight: opts.minHeight,
    maxWidth: opts.maxWidth,
    maxHeight: opts.maxHeight,
    center: opts.center !== undefined ? opts.center : true,
    show: opts.show !== undefined ? opts.show : true,
    frame: opts.frame !== undefined ? opts.frame : true,

    webPreferences: {
      preload: path.join(__dirname, '../preload/art-win-preload.js'),
      devTools: opts?.webPreferences?.devTools !== undefined ? opts.webPreferences.devTools : true,
      nodeIntegration: opts?.webPreferences?.nodeIntegration !== undefined ? opts.webPreferences.nodeIntegration : false,
    },
  };

  return result;
};

class ArtWin {
  private name: string = '';
  private uuid: string = uuidV4();
  private logger: Logger = new Logger();
  private opts: IArtWinOpts | null = null;
  private viewMap: Map<string, ArtView> = new Map<string, ArtView>();

  public win: BrowserWindow | null = null;

  public constructor(opts: IArtWinOpts) {
    const winOpts = superWinOpts(opts);

    this.name = opts.name;
    this.opts = opts;
    this.win = new BrowserWindow(
      merge(winOpts, {
        webPreferences: {
          additionalArguments: [`--web-contents-id=${this.uuid}`],
        },
      })
    );

    // win 创建完成后，触发 initEventListener
    this.initEventListener();
  }

  public toggleVisible(visible: boolean): void {
    // todo
  }

  public dispose(): void {
    // todo
  }

  public getView(name: string): ArtView | null {
    const targetView = this.viewMap.get(name) || null;

    if (!targetView) {
      this.logger.warn(`ArtWin.getView: ${name} not found`);
    }

    return targetView;
  }

  public addView(addViewOpts: IArtWinOpts): ArtView | null {
    // todo
    return null;
  }

  public removeView(name: string): void {
    // todo
  }

  public getConnection(): IConnection | null {
    if (!this.win) {
      this.logger.error('ArtWin has not been initialized');

      return null;
    }

    return getConnection(this.win, this.uuid);
  }

  public initEventListener() {
    const connection = this.getConnection();

    connection?.on('art-ipc-test-on', (evt, payload) => {
      this.logger.info('on', this.name, payload);
    });
    connection?.handle('art-ipc-test-handle', async (evt, payload) => {
      this.logger.info('handle', this.name, payload);

      return {
        winName: this.name,
      };
    });

    setTimeout(() => {
      connection?.send('art-ipc-test-send', {
        winName: this.name,
      });
    }, 10000);
  }
}

export default ArtWin;
