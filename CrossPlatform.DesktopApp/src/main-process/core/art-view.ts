import path from 'path';

import { BrowserView, BrowserViewConstructorOptions } from 'electron';
import { merge } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

import { Logger, getConnection } from '../utils';
import { IArtViewOpts, IConnection } from '../interfaces';

const superViewOpts = (opts: IArtViewOpts): BrowserViewConstructorOptions => {
  const result: BrowserViewConstructorOptions = {
    webPreferences: {
      preload: path.join(__dirname, '../preload/art-view-preload.js'),
      devTools: opts?.webPreferences?.devTools !== undefined ? opts.webPreferences.devTools : true,
      nodeIntegration: opts?.webPreferences?.nodeIntegration !== undefined ? opts.webPreferences.nodeIntegration : false,
    },
  };

  return result;
};

class ArtView {
  private name: string = '';
  private uuid: string = uuidV4();
  private logger: Logger = new Logger();
  private opts: IArtViewOpts | null = null;

  public view: BrowserView | null = null;

  public constructor(opts: IArtViewOpts) {
    const viewOpts = superViewOpts(opts);

    this.name = opts.name;
    this.opts = opts;
    this.view = new BrowserView(
      merge(viewOpts, {
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

  public getConnection(): IConnection | null {
    if (!this.view) {
      this.logger.error('ArtView has not been initialized');

      return null;
    }

    return getConnection(this.view, this.uuid);
  }

  public initEventListener() {
    // todo
  }
}

export default ArtView;
