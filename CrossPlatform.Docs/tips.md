# Tips

> tips about developing,

## **`edge-js`** invoke **`.net core`** DLL error

1. you need to publish your **`.net core library`** as **self-contained**, because the client computer might lack **`.net core runtime`**
2. add `process.env.EDGE_USE_CORECLR = '1';` before you require **`edge-js`** or **`electron-edge-js`**

## how to create **`.icns`** icon more easily on **`macOS`**

1. prepare a **.png** image with at least **512x512** size(for example named **logo.png**)
2. use command `sips -s format icns logo.png -o app.icns`

## err_connection about downloading electron mirrors or build tools

> when you use electron-builder to build installer, it will download electron mirrors from github electron release pages
>
> it might cause network connection error
>
> you can download these resources on another pc, and use some other easy ways to send to the build machine

1. **download mirrors manually** visit `https://github.com/electron/electron/releases` to download the target version mirror
2. **(optional) download build tools manually for Windows OS** if you stuck at `Get "https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z"` or something else, copy the link and download manually
3. **cache to local** copy or move the downloaded resources
    + local mirror store directory
        + **Mac OS** : `~/Library/Caches/electron/`
        + **Windows OS** : `%localappdata%\electron\Cache`
        + **Linux** : `~/.cache/electron`
    + local build tools store directory(for me, i only face the problem on Windows OS, i need two tools: winCodeSign and nsis)
        + **Windows OS** : `%localappdata%\electron-builder\Cache`
