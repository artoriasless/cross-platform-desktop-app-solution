import { EventEmitter } from 'events';

import ArtWin from './art-win';

import { Logger } from '../utils';
import { IArtOpts, IArtWinOpts } from '../interfaces';

class Art extends EventEmitter {
  private logger: Logger = new Logger();
  private opts: IArtOpts | null = null;
  private winMap: Map<string, ArtWin> = new Map<string, ArtWin>();

  public constructor(opts: IArtOpts) {
    super();

    this.opts = opts;
  }

  public getWin(name: string): ArtWin | null {
    const targetWin = this.winMap.get(name) || null;

    if (!targetWin) {
      this.logger.warn(`Art.getWin: ${name} not found`);
    }

    return targetWin;
  }

  public addWin(addWinOpts: IArtWinOpts): ArtWin | null {
    const artWin = new ArtWin(addWinOpts);

    this.winMap.set(addWinOpts.name, artWin);

    return artWin;
  }

  public removeWin(name: string): void {
    // todo
  }
}

export default Art;
