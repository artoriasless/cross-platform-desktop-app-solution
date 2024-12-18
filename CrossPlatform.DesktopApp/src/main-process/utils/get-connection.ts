import { BrowserView, BrowserWindow, ipcMain } from 'electron';

import { channelPrefix } from '../constants';
import { IConnection } from '../interfaces';

const normalizeChannel = (channel: string, webContentsId: string): string => `${channel}[${webContentsId}]`;

const getConnection = (target: BrowserWindow | BrowserView, webContentsId: string): IConnection => {
  const webContents = target.webContents;

  return {
    handle: (channel: string, listener) => {
      if (!channel.startsWith(channelPrefix)) {
        throw new Error(`Invalid channel: ${channel}, must start with ${channelPrefix}`);
      }

      const evtName = normalizeChannel(channel, webContentsId);

      ipcMain.handle(evtName, async (...args) => {
        const result = await listener(...args);

        return result;
      });
    },
    on: (channel: string, listener) => {
      if (!channel.startsWith(channelPrefix)) {
        throw new Error(`Invalid channel: ${channel}, must start with ${channelPrefix}`);
      }

      const evtName = normalizeChannel(channel, webContentsId);

      ipcMain.on(evtName, listener);
    },
    send: (channel: string, ...args: any[]) => {
      if (!channel.startsWith(channelPrefix)) {
        throw new Error(`Invalid channel: ${channel}, must start with ${channelPrefix}`);
      }

      const evtName = normalizeChannel(channel, webContentsId);

      webContents.send(evtName, ...args);
    },
  };
};

export default getConnection;
