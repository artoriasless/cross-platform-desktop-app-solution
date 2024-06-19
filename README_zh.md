# 跨端桌面端解决方案

> [README en](./README.md)
>
> 本仓库已锁定主要依赖版本：*`electron@22.3.25`*、*`node@16.17.1`*，以便您尽可能保持 **开发环境** 和 **运行环境** 一致

综合多方因素（代码开发能力、应用开发周期、代码维护成本），得到的最佳实践，用于开发跨端桌面端应用

## 仓库内容

+ **CrossPlatform.DesktopApp**

	+ 主项目为 *`桌面应用`*
	+ 发布为 *`Mac OS 的 .dmg 安装包`*、*`Windows OS 的 .exe 安装包`*、*`基于 Linux 的 OS 的 .deb 安装包`*
	+ 基于 *`electron@22.3.25`*
	+ 使用 *`electron-edge-js`* 调用 **CrossPlatform.Library** 发布的 *`.dll`*，以便您以非常低的成本利用系统级 API 或功能

+ **CrossPlatform.Library**

	+ 用于开发 *`类库`* 的项目
	+ 发布为 *`.dll`* 以在 *`electron nodejs 运行时环境`* 中使用，由 *`electron-edge-js`* 调用
	+ 基于 *`.net 8`*

+ **CrossPlatform.LibTest**
	
	+ 用于测试 **CrossPlatform.Library** 的项目
	+ 一个控制台应用程序，支持 *`Windows OS`*、*`Mac OS`*、*`基于 Linux 的 OS`*
	+ 基于 *`.net 8`*

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