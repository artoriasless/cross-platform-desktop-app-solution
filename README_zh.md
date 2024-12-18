# 跨端桌面端解决方案

> [README en](./README.md)
>
> 本仓库已锁定主要依赖版本：_`electron@29.4.6`_、_`node@20.9.0`_，以便您尽可能保持 **开发环境** 和 **运行环境** 一致

综合多方因素（代码开发能力、应用开发周期、代码维护成本），得到的最佳实践，用于开发跨端桌面端应用

## 使用

### 本地开发

1. 构建、发布 dotnet 类库
    ```shell
    cd CrossPlatform.DesktopApp
    npm run build:dll
    ```
2. 安装 electron 应用依赖
    ```shell
    cd CrossPlatform.DesktopApp
    npm install
    ```
3. 在 electron 应用中启动 webpack dev server 实时构建渲染进程资源
    ```shell
    cd CrossPlatform.DesktopApp
    npm run watch:render
    ```
4. 在 electron 应用中启动 tsc watch 实时构建主进程资源
    ```shell
    cd CrossPlatform.DesktopApp
    npm run watch:main
    ```
5. 启动 electron 应用
    ```shell
    cd CrossPlatform.DesktopApp
    npm run dev
    ```

### 在 Electron 中编写、调用 C# 方法

> 以下为推荐写法

1. 常规写法定义类和静态方法（非 async/await 写法）

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

2. 定义一个类和 async 方法，来调用 **`第一步中定义的方法`** ，专门用于 **`node`** 中调用

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

3. 使用 **`electron-edge-js`** 调用（你也可以直接使用 **`main-process/dll-bridge-invoke`** 封装过的方法）

    ```typescript
    // 相对路径，移除 【dotnet-dll】及之前的路径，使用剩下的路径
    const assemblyPath = 'CrossPlatform.Library.dll';
    // 建议包含命名空间
    const className = 'CrossPlatform.Library.SystemUtils4Node';
    const methodName = 'WhatIsTime';

    dllBridgeInvoke(assemblyPath, className, methodName)
        .then((res) => console.info('res', res)) // res 2024-12-10 17:09:45.082
        .catch((err) => console.error('err', err));
    ```

### 主进程 - 渲染进程通信

> 为了简化逻辑，本项目封装并精简了几个 ipc 通信 API。
>
> 避免了广播带来的影响，即 window 或 view 和加载的视图之间是 **`一一绑定的关系`**。
>
> 1. invoke / handle -> 对应 **`ipcRenderer.invoke`** 和 **`ipcMain.handle`**
>
> 2. on / send -> 对应 **`ipcMain.on`** 、**`ipcRenderer.on`** 和 **`ipcMain.send`** 、 **`ipcRenderer.send`**
>
> 项目中定义了 **`Art`** 、**`ArtWin`** 、**`ArtView`** 的概念。
>
> 其中 **`Art`** 和 **`ArtView`** 会加载视图，所以具体的事件通信在这两个上。
>
> 1. **`Art`** -> 应用基类，管理 **`ArtWin`** ，即管理应用主窗口
>
> 2. **`Art`** -> 主窗口类，里面会包含 **`BrowserWindow`** 实例，并且用于管理 **`ArtView`**
>
> 3. **`ArtView`** -> 视图类，里面会包含 **`BrowserView`** 实例，在非窗口的场景下使用

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

## 仓库内容

-   **CrossPlatform.DesktopApp**

    -   主项目为 _`桌面应用`_
    -   发布为 _`Mac OS 的 .dmg 安装包`_、_`Windows OS 的 .exe 安装包`_、_`基于 Linux 的 OS 的 .deb 安装包`_
    -   基于 _`electron@29.4.6`_
    -   使用 _`electron-edge-js`_ 调用 **CrossPlatform.Library** 发布的 _`.dll`_，以便您以非常低的成本利用系统级 API 或功能

-   **CrossPlatform.Library**

    -   用于开发 _`类库`_ 的项目
    -   发布为 _`.dll`_ 以在 _`electron nodejs 运行时环境`_ 中使用，由 _`electron-edge-js`_ 调用
    -   基于 _`.net 8`_
    -   由于使用 _`.net core`_ 的缘故，为了保证桌面端应用可以在任意平台正常，最终会执行发布逻辑，生成可用的 dll 库

-   **CrossPlatform.LibTest**

    -   用于测试 **CrossPlatform.Library** 的项目
    -   一个控制台应用程序，支持 _`Windows OS`_、_`Mac OS`_、_`基于 Linux 的 OS`_
    -   基于 _`.net 8`_

## 测试

### DLL 库

1. (Windows 下推荐方案) 在 **Visual Studio IDE** 里，在 **CrossPlatform.LibTest** 项目中测试

    ```shell
    # 无命令行相关操作，直接在 IDE 里运行 CrossPlatform.LibTest 项目
    ```

2. (任意平台) 在 **命令行环境** 里，在 **CrossPlatform.LibTest** 项目中测试

    ```shell
    cd CrossPlatform.LibTest
    dotnet run
    ```

3. (任意平台) 在 **nodejs 环境（非 electron）** 里，在 **CrossPlatform.DesktopApp** 项目中测试

    ```shell
    cd CrossPlatform.DesktopApp
    npm run test
    ```

### 编写一个 C# DLL 方法，并在 electron 中调用

> 以下是建议的方案

1. 使用常规同步写法定义一个类和静态方法（非 async/await 写法）

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

2. 定义一个类以及 async 方法来调用 **`第一步中定义的方法`**

    ```csharp
    using System;
    using System.Runtime;
    using System.Threading.Tasks;

    namespace CrossPlatform.Library
    {
        public class SystemUtils4Node
        {
            // 注意！ 注意！ 注意！
            // 建议定义入参，即使你用不到
            // 主要是为了避免调用报错
            public async Task<object> WhatIsTime(dynamic input)
            {
                string result = SystemUtils.WhatIsTime();

                return result;
            }
        }
    }
    ```

3. 使用 **`electron-edge-js`** 来调用（可以直接使用封装好的 **`main-process/dll-bridge-invoke`**）

    ```typescript
    // 相对路径，去掉 【dotnet-dll】 及之前的目录，使用剩下的路径
    const assemblyPath = 'CrossPlatform.Library.dll';
    // 建议包含命名空间
    const className = 'CrossPlatform.Library.SystemUtils4Node';
    const methodName = 'WhatIsTime';

    dllBridgeInvoke(assemblyPath, className, methodName)
        .then((res) => console.info('res', res)) // res 2024-12-10 17:09:45.082
        .catch((err) => console.error('err', err));
    ```

### 桌面端应用单测

> **TODO**

## 如何 fork 并扩展

1. **`fork`**
2. 替换 **`electron 版本`** 为您喜欢的版本
3. 替换 **`.net 版本`** 为您喜欢的版本
4. 在 **CrossPlatform.DesktopApp** 中替换 **`应用名称`**、**`应用图标`** 等
5. 如有需要，添加类库，然后在 **CrossPlatform.Library** 中发布
6. 构建并发布 **CrossPlatform.DesktopApp**

## 小技巧

1. [需要注意的 electron 配置详细](./CrossPlatform.Docs/electron-config-need-pay-attention_zh.md)
2. [**Windows OS** 的开发环境](./CrossPlatform.Docs/develop-env-for-win_zh.md)
3. [**Mac OS** 的开发环境](./CrossPlatform.Docs/develop-env-for-mac_zh.md)
4. [**基于 Linux 的 OS** 的开发环境](./CrossPlatform.Docs/develop-env-for-linux_zh.md)

## Q&A

1. 安装依赖的时候卡在 **`electron-edge-js`** 和 **`electron`**

    - 确保已安装 **`node-gyp`** 和 **`node-pre-gyp`**
    - BTW，使用 **`@mapbox/node-pre-gyp`**

2. 安装 **`electron-edge-js`** 和 **`electron`** 卡在 **idealTree buildDeps**
    - 命令行执行 `npm set strict-ssl false` 关闭 ipv6
