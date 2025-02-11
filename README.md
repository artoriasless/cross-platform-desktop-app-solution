# cross-platform-desktop-app-solution

> [README 中文](./README_zh.md)
>
> this repo has locked the main deps version: _`electron@29.4.6`_, _`node@20.9.0`_, so that you can keep the **dev-env** and **runtime-env** consistent as much as possible.

after considering various factors(capability in code development, app develop time, cost of code maintenance), have derived the best practices for developing cross-platform desktop applications.

## Usage

### Develop In Local

1. build and publish dotnet library
    ```shell
    cd CrossPlatform.DesktopApp
    npm run build:dll
    ```
2. install electron app deps
    ```shell
    cd CrossPlatform.DesktopApp
    npm install
    ```
3. start webpack dev server in electron app
    ```shell
    cd CrossPlatform.DesktopApp
    npm run watch:render
    ```
4. start tsc watch in electron app
    ```shell
    cd CrossPlatform.DesktopApp
    npm run watch:main
    ```
5. start electron app
    ```shell
    cd CrossPlatform.DesktopApp
    npm run dev
    ```

### Write a C# method and Invoke it in Electron

> recommend ways below

1. define a class and static method in usual sync syntax(not async/await)

    ```csharp
    using System;
    using System.Runtime;

    namespace CrossPlatform.Library
    {
        public class SystemUtils
        {
            public static string WhatIsTime()
            {
                string now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");

                return now;
            }
        }
    }
    ```

2. define a class and async method to call **`the method in the step 1`** for **`node`**

    ```csharp
    using System;
    using System.Runtime;
    using System.Threading.Tasks;

    namespace CrossPlatform.Library
    {
        public class SystemUtils4Node
        {
            // WARN! WARN! WARN!
            // suggest define the parameter, even you don't need
            // just to avoid invoke Error
            public async Task<object> WhatIsTime(dynamic input)
            {
                string result = SystemUtils.WhatIsTime();

                return result;
            }
        }
    }
    ```

3. use **`electron-edge-js`** to invoke(you can use **`main-process/dll-bridge-invoke`** directly)

    ```typescript
    // relative path , split 【dotnet-dll】 directory and use the rest
    const assemblyPath = 'CrossPlatform.Library.dll';
    // suggest to include namespace
    const className = 'CrossPlatform.Library.SystemUtils4Node';
    const methodName = 'WhatIsTime';

    dllBridgeInvoke(assemblyPath, className, methodName)
        .then((res) => console.info('res', res)) // res 2024-12-10 17:09:45.082
        .catch((err) => console.error('err', err));
    ```

### Main Process - Renderer Process Communication

> To simplify the logic, this project has encapsulated and streamlined several IPC communication APIs.
>
> The APIs avoid the impact of broadcasting, meaning the relationship between window or view and their respective loaded views is **`one-to-one binding`**.
>
> 1. invoke / handle -> Corresponds to **`ipcRenderer.invoke`** and **`ipcMain`**.handle.
>
> 2. on / send -> Corresponds to **`ipcMain.on`** 、**`ipcRenderer.on`** and **`ipcMain.send`** 、 **`ipcRenderer.send`**
>
> The project introduces the concepts of **`Art`**, **`ArtWin`**, and **`ArtView`**.
>
> Among these, **`ArtWin`** and **`ArtView`** can load views, so specific event communication exists on these two concepts.
>
> 1. **`Art`** -> Base class of the application, responsible for managing **`ArtWin`**, i.e., managing the application’s main window.
>
> 2. **`ArtWin`** -> Main window class, containing the **`BrowserWindow`** instance, and is used to manage **`ArtView`**.
>
> 3. **`ArtView`** -> View class, containing the **`BrowserView`** instance, used in scenarios without an independent window.

```typescript
// main-process
const mainWin: ArtWin = new ArtWin({
    ···
});
const connection: IConnection = mainWin.getConnection();

connection.on('art-ipc-evt-1', (evt, payload) => {
    // payload = 'evt-1-from-render'
    ···
});
connection.send('art-ipc-evt-2', 'evt-2-from-main');
connection.handle('art-ipc-evt-3', async (evt, payload) => {
    // payload = 'evt-2-from-render'
    ···

    return 'evt-3-from-main';
});

// render-process
window.ipcClient.send('art-ipc-evt-1', 'evt-1-from-render');
window.ipcClient.on('art-ipc-evt-2', (evt, payload) => {
    // payload = 'evt-2-from-main'
    ···
});
window.ipcClient
    .invoke('art-ipc-evt-3', 'evt-3-from-render')
    .then(res => {
        // res = 'evt-3-from-main'
        ···
    })
    .catch(console.error)
```

## Repo Contents

-   **CrossPlatform.DesktopApp**

    -   main project as _`desktop application`_
    -   published to _`.dmg installer for Mac OS`_, _`.exe installer for Windows OS`_, _`.deb installer for Linux-based OS`_
    -   based on _`electron@29.4.6`_
    -   use _`electron-edge-js`_ to invoke _`.dll`_ published by **CrossPlatform.Library**, so that you can leverage system-level APIs or capabilities at a very low cost

-   **CrossPlatform.Library**

    -   project used to develop _`class library`_
    -   published to _`.dll`_ to be used in _`electron nodejs runtime environment`_ invoked by _`electron-edge-js`_
    -   based on _`.net 8`_
    -   due to using _`.net core`_, so need to publish **self-contained library** for desktop app to use as expected in any platform

-   **CrossPlatform.LibTest**

    -   project used to test **CrossPlatform.Library**
    -   a console application, supported _`Windows OS`_, _`Mac OS`_, _`Linux-based OS`_
    -   based on _`.net 8`_

## Test

### DLL Library

1. (recommended in Windows) test in **CrossPlatform.LibTest** under **Visual Studio IDE**

    ```shell
    # no need for shell, just open the solution file in Visual Studio IDE, then run the CrossPlatform.LibTest project
    ```

2. (any platform) test in **CrossPlatform.LibTest** under **Terminal**

    ```shell
    cd CrossPlatform.LibTest
    dotnet run
    ```

3. (any platform) test in **CrossPlatform.DesktopApp** under **nodejs runtime (not electron)**

    ```shell
    cd CrossPlatform.DesktopApp
    npm run test
    ```

### Unit Test in Desktop App

> **TODO**

## How To Fork And Extend

1. **`fork`**
2. replace **`electron version`** for your favorite
3. replace **`.net version`** for your favorite
4. replace **`app name`**、**`app icon`** etc. in **CrossPlatform.DesktopApp**
5. add class library if needed, then publish in **CrossPlatform.Library**
6. build and publish **CrossPlatform.DesktopApp**

## Tips

1. [tips](./CrossPlatform.Docs/tips.md)
2. [electron config detail need pay attention](./CrossPlatform.Docs/electron-config-need-pay-attention.md)

## Q&A

1. sutck the step when install **`electron-edge-js`** and **`electron`**

    - make sure you've install **`node-gyp`** and **`node-pre-gyp`**
    - BTW, use **`@mapbox/node-pre-gyp`**

2. stuck the step when install **`node-gyp`** and **`node-pre-gyp`** : **idealTree buildDeps**
    - try to run cmd `npm set strict-ssl false` to disable ipv6
