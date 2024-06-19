# cross-platform-desktop-app-solution

> [README 中文](./README_zh.md)
>
> this repo has locked the main deps version: *`electron@22.3.25`*, *`node@16.17.1`*, so that you can keep the **dev-env** and **runtime-env** consistent as much as possible.

after considering various factors(capability in code development, app develop time, cost of code maintenance), have derived the best practices for developing cross-platform desktop applications.

## Repo Contents

+ **CrossPlatform.DesktopApp**

	+ main project as *`desktop application`*
	+ published to *`.dmg installer for Mac OS`*, *`.exe installer for Windows OS`*, *`.deb installer for Linux-based OS`*
	+ based on *`electron@22.3.25`*
	+ use *`electron-edge-js`* to invoke *`.dll`* published by **CrossPlatform.Library**, so that you can leverage system-level APIs or capabilities at a very low cost

+ **CrossPlatform.Library**

	+ project used to develop *`class library`*
	+ published to *`.dll`* to be used in *`electron nodejs runtime environment`* invoked by *`electron-edge-js`*
	+ based on *`.net 8`*

+ **CrossPlatform.LibTest**

	+ project used to test **CrossPlatform.Library**
	+ a console application, supported *`Windows OS`*, *`Mac OS`*, *`Linux-based OS`*
	+ based on *`.net 8`*

## How To Fork And Extend
1. **`fork`**
2. replace **`electron version`** for your favorite
3. replace **`.net version`** for your favorite
4. replace **`app name`**、**`app icon`** etc. in **CrossPlatform.DesktopApp**
5. add class library if needed, then publish in **CrossPlatform.Library**
6. build and publish **CrossPlatform.DesktopApp**

## Tips
1. [electron config detail need pay attention](./CrossPlatform.Docs/electron-config-need-pay-attention.md))
2. [develop environment for **Windows OS**](./CrossPlatform.Docs/develop-env-for-win.md)
3. [develop environment for **Mac OS**](./CrossPlatform.Docs/develop-env-for-mac.md)
4. [develop environment for **Linux-based OS**](./CrossPlatform.Docs/develop-env-for-linux.md)