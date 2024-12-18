import { Event } from 'electron';

export interface IArtViewOpts {
  name: string;

  webPreferences?: {
    nodeIntegration?: boolean;
    devTools?: boolean;
  };
}

export interface IArtWinOpts {
  name: string;

  title: string;
  icon: string;
  frame?: boolean;
  show?: boolean;
  center?: boolean;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  webPreferences?: {
    nodeIntegration?: boolean;
    devTools?: boolean;
  };
}

export interface IArtOpts {}

export interface IConnection {
  /**
   * 事件监听，基于 ipcMain.handle 封装，对应 ipcRenderer.invoke
   * 会将事件加工，监听渲染进程发送的事件，在原事件名后加上 webContents id
   *
   * @param channel
   * @param listener
   * @returns
   */
  handle: (channel: string, listener: (evt: Event, ...args: any[]) => void) => void;

  /**
   * 事件监听，基于 ipcMain.on 封装，对应 ipcRenderer.send
   * 会将事件加工，监听渲染进程发送的事件，在原事件名后加上 webContents id
   *
   * @param channel
   * @param listener
   * @returns
   */
  on: (channel: string, listener: (evt: Event, ...args: any[]) => void) => void;

  /**
   * 事件发送，基于 webContents.send 封装，对应 ipcRenderer.on
   * 会将事件加工，发送到渲染进程，在原事件名后加上 webContents id
   *
   * @param channel
   * @param args
   * @returns
   */
  send: (channel: string, ...args: any[]) => void;
}
