# 跨端桌面端解决方案

> [README en](./README.md)
>
> 本仓库已锁定主要依赖版本：_`electron@22.3.25`_、_`node@16.17.1`_，以便您尽可能保持 **开发环境** 和 **运行环境** 一致

综合多方因素（代码开发能力、应用开发周期、代码维护成本），得到的最佳实践，用于开发跨端桌面端应用

## 使用

### 本地开发

1. 构建 dotnet 类库
   ```shell
   cd CrossPlatform.Library
   dotnet build
   ```
2. 安装 electron 应用依赖
   ```shell
   cd CrossPlatform.DesktopApp
   yarn install
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
   npm dev
   ```

### 本地构建

1. 构建 dotnet 类库
   ```shell
   cd CrossPlatform.Library
   dotnet build
   ```
2. 安装 electron 依赖
   ```shell
   cd CrossPlatform.DesktopApp
   yarn install
   ```
3. 构建 electron 应用
   ```shell
   cd CrossPlatform.DesktopApp
   npm run build
   ```

## 仓库内容

- **CrossPlatform.DesktopApp**

  - 主项目为 _`桌面应用`_
  - 发布为 _`Mac OS 的 .dmg 安装包`_、_`Windows OS 的 .exe 安装包`_、_`基于 Linux 的 OS 的 .deb 安装包`_
  - 基于 _`electron@22.3.25`_
  - 使用 _`electron-edge-js`_ 调用 **CrossPlatform.Library** 发布的 _`.dll`_，以便您以非常低的成本利用系统级 API 或功能

- **CrossPlatform.Library**

  - 用于开发 _`类库`_ 的项目
  - 发布为 _`.dll`_ 以在 _`electron nodejs 运行时环境`_ 中使用，由 _`electron-edge-js`_ 调用
  - 基于 _`.net 8`_
  - 由于使用 _`.net core`_ 的缘故，为了保证桌面端应用可以在任意平台正常，最终会执行发布逻辑，生成可用的 dll 库

- **CrossPlatform.LibTest**

  - 用于测试 **CrossPlatform.Library** 的项目
  - 一个控制台应用程序，支持 _`Windows OS`_、_`Mac OS`_、_`基于 Linux 的 OS`_
  - 基于 _`.net 8`_

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

### 桌面端应用单测

> **TODO**

### 如何 fork 并扩展

1. **`fork`**
2. 替换 **`electron 版本`** 为您喜欢的版本
3. 替换 **`.net 版本`** 为您喜欢的版本
4. 在 **CrossPlatform.DesktopApp** 中替换 **`应用名称`**、**`应用图标`** 等
5. 如有需要，添加类库，然后在 **CrossPlatform.Library** 中发布
6. 构建并发布 **CrossPlatform.DesktopApp**

### 小技巧

1. [需要注意的 electron 配置详细](./CrossPlatform.Docs/electron-config-need-pay-attention_zh.md)
2. [**Windows OS** 的开发环境](./CrossPlatform.Docs/develop-env-for-win_zh.md)
3. [**Mac OS** 的开发环境](./CrossPlatform.Docs/develop-env-for-mac_zh.md)
4. [**基于 Linux 的 OS** 的开发环境](./CrossPlatform.Docs/develop-env-for-linux_zh.md)
