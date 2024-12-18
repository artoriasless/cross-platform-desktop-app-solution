import { Event } from 'electron';

declare global {
  interface Window {
    ipcClient: {
      /**
       * 事件发送，基于 ipcRenderer.invoke 封装，对应 ipcMain.handle
       * 会将事件加工，发送到主进程，在原事件名后加上 webContents id
       *
       * @param channel
       * @param args
       * @returns
       */
      invoke: (channel: string, ...args: any[]) => Promise<any>;

      /**
       * 事件发送，基于 ipcRenderer.send 封装，对应 ipcMain.on
       * 会将事件加工，发送到主进程，在原事件名后加上 webContents id
       *
       * @param channel
       * @param args
       * @returns
       */
      send: (channel: string, ...args: any[]) => void;

      /**
       * 事件监听，基于 ipcRenderer.on 封装，对应 ipcMain.send
       * 会将事件加工，监听主进程发送的事件，在原事件名后加上 webContents id
       *
       * @param channel
       * @param listener
       * @returns
       */
      on: (channel: string, listener: (evt: Event, ...args: any[]) => void) => void;
    };
  }
}
