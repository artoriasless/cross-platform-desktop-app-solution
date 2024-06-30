# cross-platform-desktop-app-solution

> [README 中文](./README_zh.md)
>
> this repo has locked the main deps version: _`electron@22.3.25`_, _`node@16.17.1`_, so that you can keep the **dev-env** and **runtime-env** consistent as much as possible.

after considering various factors(capability in code development, app develop time, cost of code maintenance), have derived the best practices for developing cross-platform desktop applications.

## Usage

### Develop In Local

1. build dotnet library
   ```shell
   cd CrossPlatform.Library
   dotnet build
   ```
2. install electron app deps
   ```shell
   cd CrossPlatform.DesktopApp
   yarn install
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
   npm dev
   ```

### Build In Local

1. build dotnet library
   ```shell
   cd CrossPlatform.Library
   dotnet build
   ```
2. install electron deps
   ```shell
   cd CrossPlatform.DesktopApp
   yarn install
   ```
3. build electron app
   ```shell
   cd CrossPlatform.DesktopApp
   npm run build
   ```

## Repo Contents

- **CrossPlatform.DesktopApp**

  - main project as _`desktop application`_
  - published to _`.dmg installer for Mac OS`_, _`.exe installer for Windows OS`_, _`.deb installer for Linux-based OS`_
  - based on _`electron@22.3.25`_
  - use _`electron-edge-js`_ to invoke _`.dll`_ published by **CrossPlatform.Library**, so that you can leverage system-level APIs or capabilities at a very low cost

- **CrossPlatform.Library**

  - project used to develop _`class library`_
  - published to _`.dll`_ to be used in _`electron nodejs runtime environment`_ invoked by _`electron-edge-js`_
  - based on _`.net 8`_
  - due to using _`.net core`_, so need to publish **self-contained library** for desktop app to use as expected in any platform

- **CrossPlatform.LibTest**

  - project used to test **CrossPlatform.Library**
  - a console application, supported _`Windows OS`_, _`Mac OS`_, _`Linux-based OS`_
  - based on _`.net 8`_

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

1. [electron config detail need pay attention](./CrossPlatform.Docs/electron-config-need-pay-attention.md))
2. [develop environment for **Windows OS**](./CrossPlatform.Docs/develop-env-for-win.md)
3. [develop environment for **Mac OS**](./CrossPlatform.Docs/develop-env-for-mac.md)
4. [develop environment for **Linux-based OS**](./CrossPlatform.Docs/develop-env-for-linux.md)
