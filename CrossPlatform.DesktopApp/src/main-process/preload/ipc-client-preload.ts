import { contextBridge, ipcRenderer } from 'electron';

import { channelPrefix } from '../constants';

(() => {
  const webContentsId: string = ((args: string[]) => {
    for (const arg of args) {
      if (arg.startsWith('--web-contents-id=')) {
        return arg.split('=')[1];
      }
    }

    return '';
  })(process.argv);
  const normalizeChannel = (channel: string): string => `${channel}[${webContentsId}]`;

  contextBridge.exposeInMainWorld('ipcClient', {
    invoke: async (channel: string, ...args: any[]) => {
      if (!channel.startsWith(channelPrefix)) {
        throw new Error(`Invalid channel: ${channel}, must start with ${channelPrefix}`);
      }

      return new Promise((resolve, reject) => {
        const evtName = normalizeChannel(channel);

        ipcRenderer
          .invoke(evtName, ...args)
          .then(resolve)
          .catch(reject);
      });
    },

    send: (channel: string, ...args: any[]) => {
      if (!channel.startsWith(channelPrefix)) {
        throw new Error(`Invalid channel: ${channel}, must start with ${channelPrefix}`);
      }

      const evtName = normalizeChannel(channel);

      ipcRenderer.send(evtName, ...args);
    },

    on: (channel: string, listener: (...args: any[]) => void) => {
      if (!channel.startsWith(channelPrefix)) {
        throw new Error(`Invalid channel: ${channel}, must start with ${channelPrefix}`);
      }

      const evtName = normalizeChannel(channel);

      ipcRenderer.on(evtName, listener);
    },
  });
})();
