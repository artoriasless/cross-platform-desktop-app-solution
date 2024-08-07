# Tips

> 开发过程中遇到的一些小问题，记录一下

## Electron -> Nodejs 版本匹配列表

> 由于本项目使用的是 electron@22.3.25， 所以表格中展示的 electron 版本只考虑从 22.x 之后的

| Electron        | Node.Js          |
| --------------- | ---------------- |
| Electron 22.x   | v16.17.1         |
| Electron 23.x   | v18.12.1         |
| Electron 24.x   | v18.14.0         |
| Electron 25.x   | v18.15.0         |
| Electron 26.x   | v18.16.1         |
| Electron 27.x   | v18.17.1         |
| Electron 28.x   | v18.18.2         |
| Electron 29.x   | v20.9.0          |
| Electron 30.1.x | v20.14.0         |
| Electron 31.x   | v20.14.0         |

## electron-edge-js 版本

> 此项目中使用 electron@22.3.25， 所以对应的 electron-edge-js 使用版本 ^29.0.0
> 
> **`如果你需要使用 electron@23.x 或更高版本， 升级 electron-edge-js 的版本至少到 30.x`**

## **`edge-js`** 调用 **`.net core`** DLL 报错

1. 由于部分客户端电脑缺少 **`.net core 运行时`**，所以你需要把你的 **`.net core 库`** 发布为 **独立** 版本
2. 在你引入 **`edge-js`** 或者 **`electron-edge-js`** 之前，添加一句 `process.env.EDGE_USE_CORECLR = '1';`

## 在 **`macOS`** 上更简单地创建 **`.icns`** 图标

1. 准备一张至少 **512x512** 大小的 **.png** 图像(命名任意，比如 **logo.png**)
2. 使用命令 `sips -s format icns logo.png -o app.icns`

## 构建应用时遇到下载失败的问题

> 当你使用 electron-builder 构建安装包时，builder 会从 github 上的 electron 发布记录中下载对应版本的镜像
>
> 由于网络原因，可能会导致下载失败
>
> 不过你可以从另一台机器上手动下载在这资源，然后用简单的办法（优盘、内网传输）将资源发送到构建机器上

1. **手动下载镜像** 访问 `https://github.com/electron/electron/releases` 下载对应版本的 electron 镜像
2. **（可选） Windows 下下载构建工具** 如果你卡在 `Get "https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z"` 或其他资源的下载问题上，复制链接，然后手动下载
3. **缓存到本地** 复制，或移动下载后的资源
    + 本地镜像缓存目录
        + **Mac OS** : `~/Library/Caches/electron/`
        + **Windows OS** : `%localappdata%\electron\Cache`
        + **Linux** : `~/.cache/electron`
    + 本地构建工具缓存目录（对我来说，我只在 Windows 下遇到这个问题，涉及两个构建工具：winCodeSign 和 nsis）
        + **Windows OS** : `%localappdata%\electron-builder\Cache`
